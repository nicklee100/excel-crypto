
module.exports = {
  users: function(sequelize,type){
    return sequelize.define('user', {
      googleId: {
        type: type.STRING
      },
      displayName: {
        type: type.STRING
      }
    });
  }
}
