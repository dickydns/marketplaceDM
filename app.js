var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var connection    = require('./config');
var session       = require('express-session');
var flash         = require('express-flash');
var router        = express.Router();
var middleware    = require('./routes/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');


//config session
app.use(session({
  secret : 'AES-AES-PEW-PEW-XX1',
  saveUninitialized: true,
  resave: true,
  cookie: { expires : new Date(Date.now() + 360000000) }
}))
app.use(flash());
app.use(middleware);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'ico.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//route
var index = require('./routes/index');

var registerProcess = require('./routes/auth/registerProcess');
var loginProcess    = require('./routes/auth/loginProcess');
var logout   = require('./routes/auth/logout');
var add_cart   = require('./routes/cart');
var adminIndex   = require('./routes/adminIndex');
var detailCart    = require('./routes/detailCart');
var productList    = require('./routes/productList');
var profileUser    = require('./routes/profileUser');
var checkout    = require('./routes/checkout');


app.use('/', index);
app.use('/registerProcess',registerProcess);
app.use('/loginProcess', loginProcess);
app.use('/logout', logout);
app.use('/add_cart', add_cart);
app.use('/admin', adminIndex);
app.use('/detailCart', detailCart);
app.use('/productList', productList);
app.use('/profileUser', profileUser);
app.use('/checkout', checkout);



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
