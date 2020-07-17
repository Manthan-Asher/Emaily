const keys = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 10000,
      currency: "inr",
      source: req.body.id,
      description: "Pay ₹100 for 5 email credits",
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
