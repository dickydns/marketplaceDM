var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var session     = require('express-session');
var connection = require('../config');


/* GET home page. */
router.get('/:id', function(req, res, next) {
    var sql = "SELECT * FROM cart WHERE id_product='"+req.params.id+"' AND status='1'";
    connection.query(sql, function(err, result){
        if(result.length  > 0 ){
            var total = parseInt(result[0].total) + 1;
            var sql = "UPDATE cart  SET total='"+total+"' WHERE id_product='"+req.params.id+"'";
            connection.query(sql, function(err, rows){
                res.redirect('/');
            });
        }
        else{
            var sql = "INSERT INTO cart (id_product, id_user, total, status) VALUES('"+req.params.id+"', '"+req.session.id_user+"','1','1')";
            connection.query(sql, function(err, rows){
                res.redirect('/');
            });
       
            
        }
    })


    
});


router.get('/deleteCart/:id', function(req, res) {
  var sql = "DELETE FROM cart WHERE id_cart ='"+req.params.id+"'";
    connection.query(sql, function(err, rows){
      res.redirect('/');
    })
});
module.exports = router;
