const mongoose = require('mongoose');
const config = require('../config/index');

require('dotenv').config(); //{path: '../.env'}

const host = config.get('database').host;
const port = config.get('database').port;
const username = config.get('database').username;
const password = config.get('database').password;
const dbname = config.get('database').dbname;
// const host = config.get('DB_HOST');
// const port = config.get('DB_PORT');
// const username = config.get('DB_USERNAME');
// const password = config.get('DB_PASSWORD');
// const dbname = config.get('DB_NAME');

let DSN = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

// mongoose.set('useFindAndModify', false); // Deprecation warning-Global level

mongoose.connect(
  DSN,
  {
    useFindAndModify: false, // Deprecation warning-query level 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, err => {
    if (err) {
      return console.log('Could not connect to DB: ', err);
    }
    console.log('Successfully connected to database...');
  });