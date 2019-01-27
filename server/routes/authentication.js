const router = require("express-promise-router")(); // try catch included
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");
const { signIn } = require("../controllers/users.js");
const passport = require("passport");
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
}

passport.serializeUser(function(user, done) {
  console.log("**** User: ", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
const GoogleStrategy = require("passport-google-oauth20");
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:3000/authentication/google/getToken/redirect",
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

signToken = googleId => {
  return JWT.sign(
    {
      iss: "NickLee",
      sub: googleId,             // subject: Identifies the subject of the JWT
      iat: new Date().getTime(),
      expr: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};

router.route("/:googleId")
  .get(cors(corsOptions),function(req, res){
    const token = signToken(req.params.googleId);
    res.cookie('crypto',token, { expires: new Date(Date.now() + 900000), httpOnly: false }).send()
    //req.mySession.userid = token;
    //res.sendStatus(200)
})

router.route("/google/getToken")
  .get(
    passport.authenticate("google", {
      //returns access code
      session: false,
      scope: ["profile"]
    })
  )

router.route("/google/getToken/redirect")
    .get(function(req,res,next){console.log('redirec hit'); next();},
    passport.authenticate("google"),
    signIn)

module.exports = router;
