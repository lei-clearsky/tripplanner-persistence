var router = require('express').Router();
<<<<<<< HEAD
var models = require('../models');


// when you click day buttons - whether new or old
router.get('/day/:num', function (req, res, next) {

  models.Hotel.find({}).exec(function (err, hotels) {
    models.Restaurant.find({}).exec(function (err, restaurants) {
      models.ThingToDo.find({}).exec(function (err, thingsToDo) {
        models.Day.findOrCreate({number: req.params.num}).exec(function (err, day) {
          res.render('index', {
            all_hotels: hotels,
            all_restaurants: restaurants,
            all_things_to_do: thingsToDo, 
            day: day
          });
        })
      });
    });
  });
});

// when you add activity from control panel 
router.post('/day/:num/addActivity', function (req, res, next) {
  models.Day.find({number: req.params.num})
  // .update();
  
}); 

module.exports = router; 
=======
var attractionRouter = require('express').Router();
var models = require('../models');

// get all days
router.get('/', function(req, res, next) {
  models.Day
        .find()
        .populate('hotel restaurants thingsToDo') // why .populate('...', function(){...}) doesn't work??
        .exec(function(err, popDays) {
          console.log('get /days');
          console.log(popDays);
          res.send(popDays);
        });

});

// post a new day
router.post('/', function(req, res, next) {
  var countDays = models.Day.count({}, function(err, count){
    var newDayNum = count + 1;
    console.log(count);
    var newDay = new models.Day({number: newDayNum, hotel: null});
    newDay.save();
    res.send(newDay);
    //res.redirect('/days/' + newDayNum);
  });
  
});

// when you click day buttons - whether new or old
// get a particular day's activities
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  console.log('id', + id);
  models.Day
        .find({number: id})
        .populate('hotel restaurants thingsToDo')
        .exec(function(err, popDay) {
          console.log(popDay);
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
                  console.log('add hotel');
                  console.log(popDoc);
                  res.send(popDoc);
                });
        })
});
// deletes the reference of the hotel
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
                  console.log('add restaurant');
                  console.log(popDoc);
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
                  console.log('add thingsToDo');
                  console.log(popDoc);
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

>>>>>>> a9d55d64761de66b989973f8d9617042b9d184a6
