const router = require("express-promise-router")(); // try catch included
const UserController = require("../controllers/users.js");
const passport = require("passport");
require("../passport.js"); //load so it's aware

const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/signup").get(function(req, res) {
  res.send(200);
});

router.route("/secret").get(passportJWT, UserController.secret); //passportJWT refrences JwtStrategy in passport.js and user gets put on res.user

router
  .route("/oauth/google")
  .post(
    passport.authenticate("googleToken", { session: false }),
    UserController.signIn
  );

module.exports = router;
