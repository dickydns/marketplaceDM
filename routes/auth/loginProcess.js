var express     = require('express');
var router      = express.Router();
var session     = require('express-session');
var connection  = require('../../config');
var sha1        = require('sha1');


/* GET users listing. */
router.post('/', function(req, res, next) {
    var post  = req.body;
    var username = post.username;
    var password = sha1(post.password);
    var sess     = req.session;


    //check to db
    var sql       = "SELECT * FROM user WHERE username='"+username+"' AND password='"+password+"'";
    connection.query(sql, function(err, results){
      if(results.length){
        req.flash('message', 'Login Success');
        sess.id_user = results[0].id_user;        
        sess.username = results[0].username;
        sess.role = results[0].role;
        sess.numberPhone = results[0].numberPhone;
        sess.address  = results[0].address;   
        
        
        res.redirect('/');       

        res.end();
      
      }
      else{
        req.flash('message', 'Login Fail');
        res.redirect('/');
        //check 
        console.log(err);
        res.end();        
      }  
    });
});

module.exports = router;
