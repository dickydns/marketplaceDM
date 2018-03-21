var express     = require('express');
var router      = express.Router();
var session     = require('express-session');

router.get('/', function(req, res) {
 req.session.destroy(function(err) {
    res.redirect('/'); 
    
 })
})

module.exports = router;