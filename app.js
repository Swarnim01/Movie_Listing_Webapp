var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var SignUpRouter = require('./routes/signup');
var SignInRouter = require('./routes/signin');
const Users = require('./models/user');
const ProtectedRouter = require('./routes/protected');
const LogoutRouter = require('./routes/logout');
const FavouriteRouter = require('./routes/favourite');

const connect = mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log('ERROR in connecting to DATABASE', err);
  });
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(
  cors({
    origin: [/localhost/, /127\.0\.0\.1/, /0\.0\.0\.0/],
    credentials: true,
  })
);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', SignUpRouter);
app.use('/signin', SignInRouter);
app.use('/logout', LogoutRouter);
app.use('/protected', ProtectedRouter);
app.use(FavouriteRouter);

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
