const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/client'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS for dev
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Include API Routes
require('./src/routes')(app);

app.get('*', function(req, res) {
  //res.send("<h1>Hello World!</h1>");
  res.render('index', {
    title: "Skilltree",
    options: {
      description: ""
    }
  });
});

module.exports = app;