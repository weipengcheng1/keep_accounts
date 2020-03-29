//依赖
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mysql=require('mysql');

//路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//端口
app.listen(8002);
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//配置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//配置中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log('我开始运行了，被迫营业。。。。。。');
module.exports = app;
