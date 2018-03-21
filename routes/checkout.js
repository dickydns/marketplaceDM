var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');
var dateTime = require('node-datetime');

/* GET home page. */
router.get('/',  function(req, res, next) {
    if(req.session.id_user > 0){
        req.flash('message', ' ');
       
        res.render('checkout', { userdata: req.userdata, totalPurchase:req.totalPurchase, results: req.product, user: req.session, cart: req.cart, total: req.total,  category:req.category, userdata:req.userdata[0] });
       
    }
    else{
        res.redirect('/');
    }
    
});

router.get('/toCheckout/:id', function(req, res, next) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');

    var tr1 = dt.format('mdH');;
    var tr2 = req.session.id_user;
    var tr3 = getRandomInt(9999899);
    var uname = "DM";
    var booth = uname+tr1+tr2+tr3;

    if(req.session.id_user > 0){
        connection.query("SELECT SUM(price * total) as totalPrice FROM product, cart WHERE cart.id_product = product.id_product AND id_user ='"+req.session.id_user+"' AND cart.status='1' AND statusProduct='1'", function(err, result){
            connection.query("SELECT * FROM ShippingCost WHERE idCity='"+req.params.id+"'", function(err, cost){
                var totalAll = parseInt(cost[0].cost) + parseInt(result[0].totalPrice);
                var sql = "INSERT INTO orderProduct (id_user, total, numOrder, createdAt, status, statusPayment) VALUES('"+req.session.id_user+"','"+totalAll+"', '"+booth+"', '"+formatted+"', '1', '0')";        
                connection.query(sql, function(err, rows){
                    connection.query("UPDATE cart SET numOrder='"+booth+"' WHERE id_user='"+req.session.id_user+"' AND status='1'", function(err, results){
                        connection.query("UPDATE cart SET status='0' WHERE id_user='"+req.session.id_user+"'", function(err, results){
                            res.redirect('/checkout/toCheckDetail/'+req.params.id);
                        })
                    })
                });
                
            })
        });
    }
    else{
        res.redirect('/');
    }
});

router.get('/toCheckDetail/:id', function(req, res){
    
   if(req.session.id_user > 0){
        connection.query("SELECT * FROM ShippingCost WHERE idCity='"+req.params.id+"'", function(err, costPay){
            res.render('toCheckout', {costPay: costPay[0], totalPurchase:req.totalPurchase, checkout:req.checkout ,results: req.product, user: req.session, cart: req.cart, total: req.total, category:req.category });
        })
    }
    else{
        res.redirect('/');
    }
});

module.exports = router;
