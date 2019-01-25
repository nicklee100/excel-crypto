const router = require("express-promise-router")(); // try catch included
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");



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

router.route("/:googleId").get(function(req, res){
  console.log("hit auth route: ",req.params.googleId);
  const token = signToken(req.params.googleId);
  console.log("token: ", token);
  res.status(200).json({token});
})

module.exports = router;



// app.get(
//   "/oauth/google/getToken",
//   passport.authenticate("google", {
//     //returns access code
//     session: false,
//     scope: ["profile"]
//   })
// );
// app.get(
//   "/oauth/google/getToken/redirect",
//   function(req,res,next){console.log('redirec hit'); next();},
//   passport.authenticate("google"),
//   signIn
// );
