var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var connection = require('../config');
var session     = require('express-session');
var fs = require('fs');
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
    req.flash('message', ' ');
   
    res.render('index', { userdata:req.userdata, totalPurchase:req.totalPurchase, results: req.product, user: req.session, cart: req.cart, total: req.total, category:req.category });
   
});

router.get('/detail/:id', function(req, res, next) {
  var sql = "SELECT * FROM product, category WHERE product.category_id = category.category_id AND  id_product ='"+req.params.id+"'";
  connection.query(sql, function(err, rows){
      res.render('detail', {userdata:req.userdata, totalPurchase:req.totalPurchase, results: rows[0], user:req.session, cart: req.cart, total: req.total, category:req.category  });
    })
});


router.post('/addProduct', function(req, res){
  
  
  upload(req, res, err => {
    
    var name        = htmlspecialchars(req.body.name);
    var price       = req.body.price;
    var description = htmlspecialchars(req.body.description);
    var category    = req.body.category;
    var stock       = req.body.stock;
    

    var sql = "INSERT INTO product (name, description, price, category_id, picture, stock, statusProduct) VALUES('"+name+"', '"+description+"', '"+price+"', '"+category+"', '"+req.file.filename+"', '"+stock+"', '1')";
    connection.query(sql, function(err, results){
      if(err){
        throw err
      }
      else{
        req.flash('message', 'Success Add Product');
        res.redirect('/admin/product');
      }
     
      
    })
   
  });

  
});

module.exports = router;
