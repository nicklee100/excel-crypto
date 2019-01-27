const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passport.js"); //load so it's aware
const cookieParser = require("cookie-parser");
var cors = require('cors');

var sessions = require("client-sessions");

const port = process.env.PORT || 3000;
require("dotenv").config();

const app = express();
app.use(cors());

if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json()); //required in parse incoming request
app.use(passport.initialize());
 app.use(cookieParser())
app.use(sessions({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));
/* Temparary Imports Brlow */


passport.serializeUser(function(user, done) {
  console.log("**** User: ", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use("/users", require("./routes/users"));
app.use("/authentication", require("./routes/authentication"))

app.listen(port, function() {
  console.log(`App running on port: ${port}`);
});
