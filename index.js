const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");
const {initialize} = require("passport");
require("./models/User");
require("./services/passport");

const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
