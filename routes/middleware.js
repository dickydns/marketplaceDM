var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');
var app = express();
/* GET home page. */
//middleware
app.use(function (req, res, next) {
    connection.query("SELECT * FROM cart, product, category WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND id_user ='"+req.session.id_user+"' AND cart.status='1' AND statusProduct='1'",  function(err, cart){
      req.cart = cart;
      
      return next();
    })
});

app.use(function (req, res, next) {
    connection.query("SELECT SUM(price * total) as totalPrice FROM product, cart WHERE cart.id_product = product.id_product AND id_user ='"+req.session.id_user+"' AND cart.status='1' AND statusProduct='1'",  function(err, total){
      req.total = total;
      return next();  
    })
});
  
app.use(function (req, res, next){
    connection.query("SELECT * FROM product, category WHERE product.category_id = category.category_id AND statusProduct='1'",  function(err, product){
      req.product = product;
      return next();
    })
})

app.use(function (req, res, next){
    connection.query("SELECT * FROM category",  function(err, category){
      req.category = category;
      return next();
    })
})

app.use(function(req, res, next){
  connection.query("SELECT * FROM user WHERE id_user='"+req.session.id_user+"'",  function(err, userdata){
    req.userdata = userdata;
    return next();
  })
});

app.use(function(req, res, next){
  connection.query("SELECT * FROM orderProduct WHERE id_user='"+req.session.id_user+"' ORDER BY createdAt DESC",  function(err, checkout){
    req.checkout = checkout;
    return next();
  })
});


app.use(function(req, res, next){
  connection.query("SELECT * FROM orderProduct WHERE id_user='"+req.session.id_user+"' AND status='1'  ORDER BY createdAt DESC",  function(err, totalPurchase){
    req.totalPurchase = totalPurchase;
    return next();
  })
});

app.use(function (req, res, next) {
  connection.query("SELECT * FROM cart, product, category,orderProduct WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND cart.status='0' AND orderProduct.id_user='"+req.session.id_user+"' AND statusProduct='1' GROUP BY orderProduct.id_order ",  function(err, productBuy){
    req.productBuy = productBuy;
    
    return next();
  })
});

app.use(function (req, res, next) {
  connection.query("SELECT * FROM cart, product, category,orderProduct WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND cart.status='0' AND orderProduct.id_user='"+req.session.id_user+"' AND statusProduct='1' AND statusPayment='0' GROUP BY orderProduct.id_order ",  function(err, productBuyUnpaid){
    req.productBuyUnpaid = productBuyUnpaid;
    return next();
  })
});

app.use(function (req, res, next) {
  connection.query("SELECT * FROM cart, product, category,orderProduct WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND cart.status='0' AND orderProduct.id_user='"+req.session.id_user+"' AND statusProduct='1' AND statusPayment='1' GROUP BY orderProduct.id_order ",  function(err, productBuyPaid){
    req.productBuyPaid = productBuyPaid;
    return next();
  })
});

app.use(function (req, res, next) {
  connection.query("SELECT * FROM cart, product, category,orderProduct WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND cart.status='0' AND orderProduct.id_user='"+req.session.id_user+"' AND statusProduct='1' AND statusPayment='2                                                                                                                                                              ' GROUP BY orderProduct.id_order ",  function(err, productBuySuccess  ){
    req.productBuySuccess = productBuySuccess;
    return next();
  })
});


// admin

app.use(function(req, res, next){
  connection.query("SELECT * FROM orderProduct  ORDER BY createdAt DESC",  function(err, orderProduct){
    req.orderProduct = orderProduct;
    return next();
  })
});

app.use(function(req, res, next){
  connection.query("SELECT * FROM user, province, city WHERE user.idProvince = province.idProvince AND user.idCity = city.idCity AND id_user='1' GROUP BY id_user= '"+req.session.id_user+"'", function(err, cityUser){
    req.cityUser = cityUser;
    return next();   
  });
});

app.use(function(req, res, next){
  connection.query("SELECT * FROM province, city WHERE province.idProvince = city.idProvince", function(err, cityChoose){
    req.cityChoose = cityChoose;
    return next();   
  });
});



module.exports = app


