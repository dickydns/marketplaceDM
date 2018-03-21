var express = require('express');
var router  = express.Router();
var connection  = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
    req.flash('message', ' ');
    
});

module.exports = router;
