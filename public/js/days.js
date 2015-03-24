//var days = [];
var currentDay;

var $addDay = $('#add-day')
var $dayTitle = $('#day-title span:first')

$(document).ready(function() {
  console.log('all days');
  $.ajax({
    type: 'get',
    url: '/days',
    success: function (responseData) {
      console.log('all days');
      var days = responseData;
      days.forEach(function(day){
        var newDayBtn = templates.get('day-btn')
        .text(day.number)
        .insertBefore($addDay)
        .on('click', function() {
          switchCurrentDay(day, $(this))
        })
      });
    }
  });
});

var switchCurrentDay = function(day, $dayBtn) {
  // get current day data
  $.get('/days/' + day.number, function(currentDayData) {
    //console.log('day ', currentDayData[0].hotel);
    clearMap()
    currentDay = currentDayData;
    console.log('day ', currentDay[0]);
    $dayTitle.text('Day ' + currentDay[0].number)
    $('.day-btn').removeClass('current-day')
    $dayBtn.addClass('current-day')

    // wipe current itenerary and replace with a clone of a new template
    $("#itinerary").html(templates.get('itinerary'))

    // loop through the model, and call `addItemToList` once for each activity
    addItemToList('hotel', currentDay[0].hotel)

    if (currentDay[0].restaurants){
      currentDay[0].restaurants.forEach(function(r) {
        addItemToList('restaurants', r)
      })
    }

    if (currentDay[0].thingsToDo){
      currentDay[0].thingsToDo.forEach(function(t) {
        addItemToList('thingsToDo', t)
      })
    }
  })
}

$addDay.on('click', function() {
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



