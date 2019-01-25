const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passport.js"); //load so it's aware

const { signIn } = require("./controllers/users.js");

const port = process.env.PORT || 3000;
require("dotenv").config();

const app = express();

if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json()); //required in parse incoming request
app.use(passport.initialize());
/* Temparary Imports Brlow */
const GoogleStrategy = require("passport-google-oauth20");
const { JWT_SECRET } = require("./configuration/index.js");
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:3000/oauth/google/getToken/redirect",
      clientID:
        "44043094992-tsmmdkf8hjs0j5f10eapp5q6g5ncf2pp.apps.googleusercontent.com",
      clientSecret: process.env.GoogleClientSecret,
      access_type: "offline"
    },
    (accessToken, rereshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  console.log("**** User: ", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.get(
  "/oauth/google/getToken",
  passport.authenticate("google", {
    //returns access code
    session: false,
    scope: ["profile"]
  })
);
app.get(
  "/oauth/google/getToken/redirect",
  function(req,res,next){console.log('redirec hit'); next();},
  passport.authenticate("google"),
  signIn
);

app.use("/users", require("./routes/users"));
app.use("/authenticated", require("./routes/authentication"))

app.listen(port, function() {
  console.log(`App running on port: ${port}`);
});
