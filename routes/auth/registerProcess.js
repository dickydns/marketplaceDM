var express     = require('express');
var router      = express.Router();
var session     = require('express-session');
var connection  = require('../../config');
var sha1        = require('sha1');

/* GET users listing. */
router.post('/', function(req, res, next) {
    var post = req.body;
    var name = post.name;
    var username = post.username;
    var password = sha1(post.password);
    var sql = "INSERT INTO user (name,username,password, role) VALUES('"+name+"', '"+username+"', '"+password+"','2')"
    
    connection.query(sql, function(err, results){
        req.flash('message', "Register Success");
        res.redirect('/');        
              
        
    });
});

module.exports = router;