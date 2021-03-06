const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./models/User");
require("./models/Survey");
require("./services/passport");

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKeys],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require("./routes/auth")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static("client/build"));

  // express will serve the index.html file
  // if it doesnt recognize the route

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
