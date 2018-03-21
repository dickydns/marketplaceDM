var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');

/* GET home page. */
router.get('/',  function(req, res, next) {
    if(req.session.id_user > 0){
        req.flash('message', ' ');
        
        res.render('detailCart', { userdata:req.userdata ,totalPurchase:req.totalPurchase,  results: req.product, user: req.session, cart: req.cart, total: req.total,  category:req.category });
        
    }
    else{
        req.flash('message', ' ');
        res.redirect('/');
    }
});



module.exports = router;
