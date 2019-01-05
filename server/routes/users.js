const router = require('express-promise-router')() // try catch included

router.route('/signup')
  .get(function(req, res){
    res.send(200);
  })

  module.exports = router;
