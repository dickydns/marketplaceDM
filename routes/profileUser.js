var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');
var sha1        = require('sha1');

var fs = require('fs');
var multer = require('multer');
var path          = require('path');
var htmlspecialchars = require('htmlspecialchars');
var dateTime = require('node-datetime');


//set storage engine
const storage = multer.diskStorage({
  destination : path.join(__dirname + './../public/images/payment/'),
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() +
    path.extname(file.originalname));
  }
});

const upload = multer({
    storage : storage
}).single('paymentSlip');
  
function checkAuth(req, res, next) {
    if (!req.session.id_user) {
      res.redirect('/')
    } else {
      next();
    }
}


/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
    req.flash('message', ' ');
    res.render('profileUser', { userdata:req.userdata ,productBuySuccess:req.productBuySuccess, productBuyPaid:req.productBuyPaid, productBuyUnpaid:req.productBuyUnpaid, cityChoose:req.cityChoose, cityUser:req.cityUser, productBuy:req.productBuy, totalPurchase:req.totalPurchase, results: req.product, user: req.session, cart: req.cart, total: req.total,  category:req.category, userdata:req.userdata });
});

router.post('/updateUser', function(req, res){
    var post = req.body;
    var province= req.body.province;
    var city = req.body.city;
    var name = htmlspecialchars(req.body.name);
    var address  = htmlspecialchars(req.body.address);
    var numberPhone = req.body.numberPhone;
    var sql ="UPDATE user SET name='"+name+"', address='"+address+"', numberPhone='"+numberPhone+"', idCity='"+city+"', idProvince='"+province+"' WHERE id_user='"+req.session.id_user+"'";
    connection.query(sql, function(err, results){
        req.flash('message', 'Success Change Profile');
        res.redirect('/profileUser');
    })
    
    
   
});
router.post('/updatePassword', function(req, res){
    var password = sha1(req.body.password);
    var sql ="UPDATE user SET password='"+password+"' WHERE id_user='1'";
    connection.query(sql, function(err, results){
        if(err) throw err
        req.flash('message', 'Success change password');
        res.redirect('/profileUser');
        
    })

    
});

router.get('/dataInvoice/:id', checkAuth, function(req, res, next){
    

    connection.query("SELECT * FROM cart, product, category WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND id_user ='"+req.session.id_user+"' AND numOrder='"+req.params.id+"' AND statusProduct='1'", function(err, detailConfirm){
        connection.query("SELECT * FROM orderProduct WHERE numOrder='"+req.params.id+"'",  function(err, totalPaymentAll){
            connection.query("SELECT * FROM orderProduct  WHERE  id_user ='"+req.session.id_user+"' AND numOrder='"+req.params.id+"'",  function(err, statusPayment){
                connection.query("SELECT * FROM orderProduct WHERE numOrder='"+req.params.id+"'",  function(err, orderData){
                    connection.query("SELECT * FROM shippingInfo WHERE numOrder='"+req.params.id+"'", function(err, shippingInfo){
                        req.flash('message', ' ');
                        res.render('userConfirm', {  shippingInfo:shippingInfo, orderData:orderData, totalPaymentAll:totalPaymentAll, invoiceNumber:req.params.id , statusPayment:statusPayment[0], detailConfirm:detailConfirm, productBuy:req.productBuy, totalPurchase:req.totalPurchase, results: req.product, user: req.session, cart: req.cart, total: req.total,  category:req.category, userdata:req.userdata });
                    })
                });
                
            })
        });
    })
});

router.post('/uploadPaymentSlip/:id', function(req, res){
    
    upload(req, res, err => {
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');

        var sql = "UPDATE orderProduct SET paymentSlip='"+req.file.filename+"', lastUpdate='"+formatted+"' WHERE numOrder='"+req.params.id+"'";
        connection.query(sql, function(err, results){
          if(err){
            throw err
          }
          else{
            req.flash('message', 'Success Upload Picture');
            res.redirect('/profileUser/dataInvoice/'+req.params.id);
          }
        })
       
    });
});


router.post('/receivedOrder/:id', function(req, res){
    var sql = "UPDATE orderProduct SET statusPayment='2' WHERE numOrder='"+req.params.id+"'";
    connection.query(sql, function(err, results){
        if(err){
        throw err
        }
        else{
        req.flash('message', 'Success Upload Picture');
        res.redirect('/profileUser/dataInvoice/'+req.params.id);
        }
    })
})


module.exports = router;

