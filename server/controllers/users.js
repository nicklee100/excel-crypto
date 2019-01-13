const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");
const { User } = require("../database/index.js");

signToken = user => {
  return JWT.sign(
    {
      iss: "NickLee",
      sub: user.id,             // subject: Identifies the subject of the JWT
      iat: new Date().getTime(),
      expr: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};

module.exports = {
  signIn: function(req, res, next) {
    // expecting an authorized user
    User.findOrCreate({
      where: { googleId: req.user.id },
      defaults: {
        displayName: req.user.displayName
      }
    }).spread((user, created) => {
      if (created) {
        console.log("created: ", created);
      } else {
        console.log("not created");
      }
    });
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: function(req, res) {
    console.log("resquest: ", req);
    res.send({ secret: "Secret resource" });
  }
};
