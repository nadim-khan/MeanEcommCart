const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('../middleware/passport');

const routes = require('../routes');


//get App
const app = express();

//logger (debug logs and others)
if (config.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

//get dist folder
const distDir = path.join(__dirname, '../../dist');
console.log(distDir);

//Use dist folder as hosting folder by express
app.use(express.static(distDir));

//Parsing from api - bodyparse middleware for req and response with extended property
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//secure  apps http
app.use(helmet());

//Use cors
app.use(cors());


//authenticate or intercept
app.use(passport.initialize());
//api router

app.use('/api/', routes);

//if not api path then serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
});

module.exports = app;