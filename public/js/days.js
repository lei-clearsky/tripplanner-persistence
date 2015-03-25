//var days = [];
var currentDay;

var $addDay = $('#add-day')
var $dayTitle = $('#day-title span:first')

$(document).ready(function() {
  $.ajax({
    type: 'get',
    url: '/days',
    success: function (responseData) {
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
    clearMap()
    currentDay = currentDayData;
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
    var newDayBtn = templates.get('day-btn')
      .text(newDay.number)
      .insertBefore($addDay)
      .on('click', function() {
        switchCurrentDay(newDay, $(this))
      })

    switchCurrentDay(newDay, newDayBtn)
  })
});


