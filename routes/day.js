var router = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

// get all days
// /days
router.get('/', function(req, res, next) {
  models.Day
        .find()
        .populate('hotel restaurants thingsToDo') 
        .exec(function(err, popDays) {
          res.send(popDays);
        });
});

// post a new day
router.post('/', function(req, res, next) {
  var countDays = models.Day.count({}, function(err, count){
    var newDayNum = count + 1;
    var newDay = new models.Day({number: newDayNum, hotel: null});
    newDay.save();
    res.send(newDay);
    //res.redirect('/days/' + newDayNum);
  });
  
});

// when you click day buttons - whether new or old
// get a particular day's activities
// /days/1..
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .find({number: id})
        .populate('hotel restaurants thingsToDo')
        .exec(function(err, popDay) {
          res.send(popDay);
        });
  });

// delete one day
router.delete('/:id', function (req, res, next) {

});

router.use('/:id', attractionRouter);


// POST /days/:id/hotel
// creates a reference to the hotel
router.post('/:id/hotel', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .update({number: id}, {$set: {hotel: req.body.id}}, function(err, cb) {
          models.Day
                .find({number: id})
                .populate('hotel')
                .exec(function(err, popDoc) {
                  res.send(popDoc);
                });
        })
});
// deletes the reference of the hotel
// days/1/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    
});
// creates a reference to a restaurant
router.post('/:id/restaurants', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .update({number: id}, {$push: {restaurants: req.body.id}}, function(err, cb) {
          models.Day
                .find({number: id})
                .populate('restaurants')
                .exec(function(err, popDoc) {
                  res.send(popDoc);
                });
        })
});
// deletes a reference to a restaurant
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    
});
// creates a reference to a thing to do
router.post('/:id/thingsToDo', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .update({number: id}, {$push: {thingsToDo: req.body.id}}, function(err, cb) {
          models.Day
                .find({number: id})
                .populate('thingsToDo')
                .exec(function(err, popDoc) {
                  res.send(popDoc);
                });
        })    
});
// deletes a reference to a thing to do
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    
});

// when you add activity from control panel 
// router.post('/day/:num/addActivity', function (req, res, next) {
//   models.Day.find({number: req.params.num})
//   // .update();
  
// }); 

module.exports = router; 

