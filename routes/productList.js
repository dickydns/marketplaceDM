var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');

/* GET home page. */
router.get('/:id',  function(req, res, next) {
    req.flash('message', ' ');
    connection.query("SELECT * FROM product WHERE category_id='"+req.params.id+"' AND statusProduct='1'",  function(err, products){
        connection.query("SELECT * FROM category WHERE category_id='"+req.params.id+"'", function(err, categoryPage){
            res.render('productList', { userdata:req.userdata, totalPurchase:req.totalPurchase, results: products, categoryPage:categoryPage[0], user: req.session, cart: req.cart, total: req.total,  category:req.category });
        })
        
    })
    
});



module.exports = router;
