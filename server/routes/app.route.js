var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {    
    res.render('index');
});

router.get('/temperate', function (req, res, next) {    
    res.render('temperateView');
});


module.exports = router;