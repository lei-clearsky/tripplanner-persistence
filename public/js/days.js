$(document).ready(function() {
  $.ajax({
    type: 'get',
    url: '/days',
    success: function (responseData) {
      var days = responseData;
    }
  });
});

//var days = [];
var currentDay;

var $addDay = $('#add-day')
var $dayTitle = $('#day-title span:first')

var switchCurrentDay = function(day, $dayBtn) {
  // get current day data
  $.get('/days/' + day.number, function(currentDayData) {
    clearMap()
    console.log(currentDayData);
    currentDay = currentDayData
    $dayTitle.text('Day ' + currentDay[0].number)
    $('.day-btn').removeClass('current-day')
    $dayBtn.addClass('current-day')

    // wipe current itenerary and replace with a clone of a new template
    $("#itinerary").html(templates.get('itinerary'))

    // loop through the model, and call `addItemToList` once for each activity
    addItemToList('hotel', currentDay.hotel)

    currentDay.restaurants.forEach(function(r) {
      addItemToList('restaurants', r)
    })

    currentDay.thingsToDo.forEach(function(t) {
      addItemToList('thingsToDo', t)
    })
  })
}

$addDay.on('click', function() {
  //"model-y"
  // var newDay = {
  //   restaurants: [],
  //   thingsToDo: [],
  //   hotel: null,
  //   dayNum: days.length + 1
  // }

  // days.push(newDay)

  // create a new day
  $.post('/days', function(newDay) {
    console.log('POST response data', newDay)

    var newDayBtn = templates.get('day-btn')
      .text(newDay.number)
      .insertBefore($addDay)
      .on('click', function() {
        switchCurrentDay(newDay, $(this))
      })

    switchCurrentDay(newDay, newDayBtn)
  })
});



