var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var apiAuth = require('./routes/api/apiAuth');
var apiUsers = require('./routes/api/apiUsers');
var apiTournaments = require('./routes/api/apiTournaments');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiAuth);
app.use('/api', apiUsers);
app.use('/api', apiTournaments);

module.exports = app;
