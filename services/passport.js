const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: process.env.NODE_ENV
        ? "https://limitless-ocean-56071.herokuapp.com/auth/google/callback"
        : "http://localhost:5000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      proxy: true,
    },
    async (accessToken, refreshtoken, profile, done) => {
      const user = await User.findOne({googleId: profile.id});

      if (user) {
        done(null, user);
      } else {
        const newUser = new User({googleId: profile.id});
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);
