const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration')

signToken = user => {
  return JWT.sign({
    iss: 'NickLee',
    sub: user.id,
    iat: new Date().getTime(),
    expr: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET)
}

module.exports = {
  signIn: function(req, res, next) { // expecting an authorized user
    const token = signToken(req.user);
    res.status(200).json({token});
  }
}
