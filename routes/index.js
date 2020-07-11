var express = require('express');
//const mongoose = require('./connect');
var router = express.Router();
var mongoose = require('./connect');
var clinic = mongoose.model('clinic', require('./schema/clinic'));

router.use(function( req, res, next ){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req, res, next) {
  var obj = {
    name: req.name,
    tel: req.body.tel,
    tax: req.body.tax,
    address: req.body.address
  }
  clinic.insertMany(obj, function(err, rs) {
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

module.exports = router;
