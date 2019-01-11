const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "44043094992-tsmmdkf8hjs0j5f10eapp5q6g5ncf2pp.apps.googleusercontent.com",
      clientSecret: process.env.GoogleClientSecret
    },
    async (accessToken, rereshToken, profile, done) => {
      done(null, profile);
    }
  )
);
