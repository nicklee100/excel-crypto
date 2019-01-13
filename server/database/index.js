const Sequelize = require("sequelize");
const { users } = require("./models.js");

const sequelize = new Sequelize({
  database: "googlesheetstracker",
  username: "postgres",
  password: null,
  dialect: "postgres",
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connnection success");
  })
  .catch(e => {
    console.log("error", e);
  });

User = users(sequelize, Sequelize);
// User.sync({force: true})

module.exports = {
  User
};
