const router = require("express-promise-router")(); // try catch included
const UserController = require("../controllers/users.js");
const passport = require("passport");
require("../passport.js"); //load so it's aware

var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
}

const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/authenticated/:id").get(function(req,res){
  console.log('!Request: ', req.params);
  res.send(200)
})

router.route("/signup").get(function(req, res) {
  console.log("here");
  res.send(200);
});

router.route("/secret").get(cors(corsOptions),function(req,res,next){
  console.log('reg: ',req.cookies)
  next();
},passportJWT, UserController.secret); //passportJWT refrences JwtStrategy in passport.js and user gets put on res.user

router
  .route("/oauth/google")
  .post(
    passport.authenticate("googleToken", { session: false }),
    UserController.signIn
  );

module.exports = router;
