var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//추가1
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var memberRouter = require('./routes/member');
var chatserverRouter = require('./routes/chatserver');
var brokerserverRouter = require('./routes/brokerserver');

var jsonRouter = require('./routes/json');

var tmp1Router = require('./routes/tmp1'); // 프로젝트

//npm install cors --save
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//추가
app.use(cors());

app.use('/', indexRouter); //127.0.0.1:3000/board
app.use('/users', usersRouter); //127.0.0.1:3000/users/xxxx
app.use('/brd', boardRouter); //127.0.0.1:3000/brd/boardlist.do
app.use('/mem', memberRouter);

app.use('/json', jsonRouter);

app.use('/tmp1', tmp1Router); // 프로젝트

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
