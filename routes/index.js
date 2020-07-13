var express = require('express');
var router = express.Router();
var mongoose = require('./connect');
var clinic = mongoose.model('clinic', require('./schema/clinic'));
var customer = mongoose.model('customer', require('./schema/customer'));
var pet = mongoose.model('pet', require('./schema/pet'));
var repair = mongoose.model('repair', require('./schema/repair'));
var mediceen = mongoose.model('mediceen', require('./schema/mediceen'));

var ObjectId = require('mongodb').ObjectID;

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

router.post('/clinicSave', function(req, res, next) {
  var obj = {
    name: req.body.name,
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

router.get('/clinicInfo', function(req, res, next){
  clinic.findOne({}, function(err, rs) {
    if (err){
      res.send(err);
    } else {
      res.send(rs);
    }
  });
});

router.post('/clinicUpdate', function(req, res, next){
  clinic.updateOne({_id: req.body._id}, req.body, function(err, rs){
    if (err){
      res.send(err);
    }
    else{
      res.send(rs);
    }
  })
});

router.post('/customerSave', function(req, res, next){
  customer.insertMany(req.body, function(err, rs){
    if (err){
      res.send(err);
    }
    else { 
      res.send(rs);
    }
  });
});

router.get('/customerAll', function(req, res, next){
  customer.find({}, function(err, rs){
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

router.post('/customerDelete', function(req, res, next){
  customer.deleteOne({ _id: req.body._id }, function(err, rs){
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

router.post('/customerUpdate', function(req, res, next){
  var condition = { _id: req.body._id }
  customer.updateOne(condition, req.body, function(err, rs){
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

router.post('/petSave', function(req, res, next){
  req.body.customer_id = new ObjectId(req.body.customer_id);

  if(req.body._id == null){
    pet.insertMany(req.body, function(err, rs){
      if (err){
        res.send(err);
      }
      else { 
        res.send(rs);
      }
    });
  }
  else{
    var condition = { _id: req.body._id}
    pet.updateOne(condition, req.body, function(err, rs){
      if (err){
        res.send(err);
      }
      else { 
        res.send(rs);
      }
    })
  }
});

router.get('/petAll', function(req, res, next){
  pet.aggregate([
    {
      "$lookup": {     
        "from": "customer",     
        "localField": "customer_id",     
        "foreignField": "_id",     
        "as": "customer"   
      }
    } 
]).exec(function(err, rs){
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

router.post('/petDelete', function(req, res, next){
  pet.deleteOne({ _id: req.body._id }, function(err, rs){
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

router.post('/petOfCustomer', function(req, res, next){
  pet.find({ customer_id: req.body._id }, function(err, rs){
    if (err){
      res.send(err);
    }
    else {
      res.send(rs);
    }
  });
});

router.post('/repairSave', function(req, res, next){

  var data = {
    problem: req.body.repair.problem,
    pet_id: new ObjectId(req.body.pet._id)
  }

  if(req.body.repair._id != undefined){
    var condition = { _id: new ObjectId(req.body.repair._id) }
    repair.updateOne(condition, data, function(err, rs) {
      if(err){
        res.send(err)
      }
      else{
        res.send(rs)
      }
    });
  }
  else{
    repair.insertMany(data, function (err, rs) {
      if(err){
        res.send(err)
      }
      else{
        res.send(rs)
      }
    });
  }
  
});

router.post('/repairOfPet', function (req, res, next){
  repair.find({ pet_id: req.body.pet_id }, function(err, rs){
    if(err){
      res.send(err)
    }
    else{
      res.send(rs)
    }
  });
});

router.post('/repairRemove', function(req, res, next){
  repair.deleteOne({ _id: req.body._id }, function(err, rs){
    if(err){
      res.send(err)
    }
    else{
      res.send(rs)
    }
  });
});

router.post('/saveMediceen', function(req, res, next){

  if( req.body._id !== undefined){
    var condition = { _id: req.body._id }

    mediceen.updateOne(condition, req.body, function(err, rs){
      if(err){
        res.send(err)
      }
      else{
        res.send(rs)
      }
    })
  }
  else{
    mediceen.insertMany(req.body, function(err, rs){
      if(err){
        res.send(err)
      }
      else{
        res.send(rs)
      }
    });
  }
});

router.get('/mediceenAll', function(req, res, next){
  mediceen.find({}, function(err, rs){
    if(err){
      res.send(err)
    }
    else{
      res.send(rs)
    }
  });
});

router.post('/mediceenDelete', function(req, res, next){
  mediceen.deleteOne({ _id: req.body._id }, function(err, rs){
    if (err){
      res.send(err)
    }
    else{
      res.send(rs)
    }
  });
});

module.exports = router;
