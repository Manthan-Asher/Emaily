const mongoose = require("mongoose");
const _ = require("lodash");
const {Path} = require("path-parser");
const {URL} = require("url");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const surveyTemplates = require("../services/emailTemplates/surveyTemplates");
const Mailer = require("../services/Mailer");

const Survey = mongoose.model("Survey");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({_user: req.user.id}).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({url, email, sg_event_id}) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
            sg_event_id,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId", "sg_event_id")
      .each(({surveyId, email, choice}) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {email, responded: false},
            },
          },
          {
            $inc: {[choice]: 1},
            $set: {"recipients.$.responded": true},
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplates(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};