const express  = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

if(!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json()); //required in parse incoming request

app.use('/users', require('./routes/users'));

module.exports = app;
