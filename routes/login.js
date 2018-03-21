var express = require('express');
var router = express.Router();
var flash   = require('express-flash');
var session     = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.id_user > 0){
    req.flash('message', ' ');
    
  }
  else{
    req.flash('message', ' ');
    
  }

});

module.exports = router;
