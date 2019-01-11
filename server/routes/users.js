const router = require("express-promise-router")(); // try catch included
const UserController = require("../controllers/users.js");
const passport = require("passport");
require("../passport.js"); //load so it's aware

router.route("/signup").get(function (req, res) {
  res.send(200);
});

router.route("/oauth/google").post(
  passport.authenticate("googleToken", { session: false }),
  UserController.signIn
);

module.exports = router;
