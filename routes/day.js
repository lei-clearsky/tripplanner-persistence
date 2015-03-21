var router = require('express').Router();
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