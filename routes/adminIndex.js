var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');
var fs  = require('fs');
var multer = require('multer');
var path          = require('path');
var htmlspecialchars = require('htmlspecialchars');

//set storage engine
const storage = multer.diskStorage({
  destination : path.join(__dirname + './../public/images/'),
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() +
    path.extname(file.originalname));
  }
});

//init upload
const upload = multer({
  storage : storage
}).single('picture');

/* GET home page. */
router.get('/',  function(req, res, next) {
    connection.query("SELECT * FROM productTmp", function(err, totalSale){
        req.flash('message', ' ');
        res.render('adminIndex', { totalSale:totalSale[0] });
    })
});


router.get('/product', function(req, res){
    req.flash('message', ' ');
    res.render('adminProduct', { results: req.product, user: req.session, category: req.category });
});

router.get('/productOrder', function(req, res){
    req.flash('message', ' ');
    res.render('adminProductOrder', { orderProduct: req.orderProduct, user: req.session });
})

router.get('/productDetail/:id', function(req, res){
    var sql = "SELECT * FROM product, category WHERE product.category_id = category.category_id AND id_product='"+req.params.id+"' AND statusProduct='1'";
    connection.query(sql, function(err, results){
        req.flash('message', ' ');
        res.render('adminDetailProduct', { orderProduct: results, user: req.session, category:req.category });
    });    
})


router.post('/updatePrduct/:id', function(req, res){
    upload(req, res, err => {
        var name        = htmlspecialchars(req.body.name);
        var price       = req.body.price;
        var description = htmlspecialchars(req.body.description);
        var category    = req.body.category;
        var stock       = req.body.stock;
        var picture     = req.body.picture;
       
        if(req.file === undefined || req.file === null || req.file === false){
            var sql ="UPDATE product SET name='"+name+"', description='"+description+"', price='"+price+"', category_id='"+category+"', stock='"+stock+"' WHERE id_product ='"+req.params.id+"'";
        }
        else{
            var sql ="UPDATE product SET name='"+name+"', description='"+description+"', price='"+price+"', category_id='"+category+"', stock='"+stock+"', picture='"+req.file.filename+"' WHERE id_product ='"+req.params.id+"'";            
        }
        
        connection.query(sql, function(err, results){
          if(err){
            throw err
          }
          else{
            req.flash('message', 'Success update Product');
            res.redirect('/admin/productDetail/'+req.params.id);
          }
         
          
        })
    });
});

router.get('/delete/:id', function(req, res){
    var sql = "UPDATE product SET statusProduct='0' WHERE id_product='"+req.params.id+"'";
    connection.query(sql, function(err, results){
        req.flash('message', 'Success delete Product');
        res.redirect('/admin/product');
    });
})

router.get('/adminConfirm/:numOrder/:id', function(req, res){
    connection.query("SELECT * FROM cart, product, category WHERE cart.id_product = product.id_product AND product.category_id = category.category_id AND id_user ='"+req.params.id+"' AND numOrder='"+req.params.numOrder+"' AND statusProduct='1'", function(err, detailConfirm){
        connection.query("SELECT * FROM orderProduct WHERE numOrder='"+req.params.numOrder+"'",  function(err, totalPaymentAll){
            connection.query("SELECT * FROM orderProduct  WHERE  id_user ='"+req.params.id+"' AND numOrder='"+req.params.numOrder+"'",  function(err, statusPayment){
                connection.query("SELECT * FROM orderProduct WHERE numOrder='"+req.params.numOrder+"'",  function(err, orderData){
                    connection.query("SELECT SUM(total) as totalBuy FROM cart WHERE numOrder='"+req.params.numOrder+"'",  function(err, totalBuying){
                        connection.query("SELECT * FROM shippingInfo WHERE numOrder='"+req.params.numOrder+"'", function(err, shippingInfo){
                            
                            req.flash('message', ' ');
                            res.render('adminConfirm', { shippingInfo:shippingInfo, totalBuy: totalBuying, orderData:orderData, totalPaymentAll:totalPaymentAll, invoiceNumber:req.params.numOrder , statusPayment:statusPayment[0], detailConfirm:detailConfirm, productBuy:req.productBuy, totalPurchase:req.totalPurchase, results: req.product, user: req.session, cart: req.cart, total: req.total,  category:req.category, userdata:req.userdata });
                        });
                    });
                });
                
            })
        });
    })
});

router.post('/confirmOrder/:numOrder/:id/:total', function(req, res){
    connection.query("INSERT INTO productTmp (totalSale) VALUES('"+req.params.total+"')", function(err, results){
        connection.query("UPDATE orderProduct SET statusPayment='1' WHERE numOrder='"+req.params.numOrder+"'", function(err, results){
            req.flash('message', 'Success Confirm Order');        
            res.redirect('/admin/adminConfirm/'+req.params.numOrder+'/'+req.params.id);
        });
    });
    
});

router.post('/servicesAdd/:numOrder/:id', function(req, res){
    connection.query("INSERT INTO shippingInfo (services, servicesNum, numOrder)  VALUES('"+req.body.services+"', '"+req.body.deliveryNum+"', '"+req.params.numOrder+"')", function(err, results){
        req.flash('message', 'Success Input service Delivery Number');        
        res.redirect('/admin/adminConfirm/'+req.params.numOrder+'/'+req.params.id);
    })
});




module.exports = router;
