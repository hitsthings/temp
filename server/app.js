var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var lessMiddleware = require('less-middleware');
var session = require('express-session');
var cors = require('cors');

var web = require('./routes/web');
var login = require('./routes/login');
var quotes = require('./routes/quotes');
var account = require('./routes/account');


var PUBLIC_DIR = path.join(__dirname, '..', 'client', 'build');
var serveWeb = !process.env.SERVE_WEB || process.env.SERVE_WEB === 'true';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors({
  origin: process.env.HOST ? process.env.HOST : ['http://localhost:3000', 'http://localhost:3001']
}));
serveWeb && app.use(favicon(path.join(PUBLIC_DIR, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(lessMiddleware(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'zkeyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

if (serveWeb) {
  app.use('/', web);
  app.use('/login', web);
}

app.use('/api/login', login);
app.use('/api/account', login);
app.use('/api/quote', quotes);
app.use('/api/account', account);

serveWeb && app.use(express.static(PUBLIC_DIR));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
