/*

model
- wire up event listeners
- on click, find the object cooresponding to the id selected
- find the id selected
- push that object into the current day


view
- look in currentday div for the correct category
- add a div (from a template) for the selected item
- wire up new event listerns for remove

possible complications
- hotel is singular, the others are plural
- new elements won't be functional by default
- model <-> view sync
*/

var getListByType = function(type) {
	return {
		"hotel": $('#itinerary .hotel-list'),
		"restaurants": $('#itinerary .restaurant-list'),
		"thingsToDo": $("#itinerary .thingsToDo-list")
	}[type]
}

var addItemToList = function(type, activity) {
	if(!activity) return;
	var list = getListByType(type);
	// var template = templates.get('itinerary-item')
	//   .appendTo(list);

	// template.find('.title')
	//  .text(activity.name)
	//  .attr('id', activity._id);

	// drawLocation(activity.place[0].location, iconTypeMap[type])

	if (type == 'hotel'){
		// list = $('#itinerary .hotel-list');

		var template = templates.get('itinerary-item')
	  		.appendTo(list);

		template.find('.title')
		 .text(activity.name)
		 .attr('id', activity._id);

		drawLocation(activity.place[0].location, iconTypeMap[type])
	} else if (type == 'restaurants') {
		// list = $('#itinerary .restaurant-list');

		var template = templates.get('itinerary-item')
	  		.appendTo(list);

		template.find('.title')
		 .text(activity.name)
		 .attr('id', activity._id);

		drawLocation(activity.place[0].location, iconTypeMap[type])		
	} else if (type == 'thingsToDo') {
		// list = $('#itinerary .thingsToDo-list');

		var template = templates.get('itinerary-item')
	  		.appendTo(list);
	  		
		template.find('.title')
		 .text(activity.name)
		 .attr('id', activity._id);

		drawLocation(activity.place[0].location, iconTypeMap[type])		
	}
}

$('.add-activity').on('click', function() {

	//models
	//find the correct select
	var $select = $(this).siblings('select')
	var type = $(this).attr('data-type')
	var id = $select.val()

	if(type === "hotels")
		type = "hotel"

	$.ajax({ 
    	type: 'POST',
    	url: '/days/' + currentDay[0].number + '/' + type,
    	data: { id: id },
    	success: function(responseData){
    		console.log('success! ', responseData[0][type]);
    		if(type === "hotel")
    			addItemToList(type, responseData[0][type])
    		else if (type === "restaurants" || type === "thingsToDo"){
    			var lastIndex = responseData[0][type].length - 1;
    			addItemToList(type, responseData[0][type][lastIndex])
    		}
    			
    	}
	});

})

// remove a day 
// $('.remove').on('click', function() {

// });


// remove activity from model
$('body').on('click', '.remove-btn', function() {

		//models
	//find the correct select
	var $title = $(this).siblings('.title')
	var type = $(this).parents().find('.list-group').attr('class').split(' ')[0];
	var id = $title.attr('id');

	// remove from view
	$(this).parent().remove();

	if(type === "hotel-list") {
		type = "hotel"
	} else if (type === "restaurant-list") {
		type = "restaurants"
	} else if (type==="thingsToDo-list") {
		type = 'thingsToDo'; 
	}

	// remove from db 
	$.ajax({ 
    	type: 'DELETE',
    	url: '/days/' + currentDay[0].number + '/' + type,
    	data: { id: id }
	});
});



















