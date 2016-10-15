var express = require('express')

var app = express();

app.get('/events_available', function(req, res) {

	
	res.json({event1: "Comm working in browser"})
	
	//get_list_of_events()

})

app.listen(3000);



var get_list_of_events = function () {

	var fs = require("fs");

	var json_data = fs.readfile('input.txt', function(err, data) {

		if (err){
			console.log(err.stack);
			return;
		}

		return data.toString();
	})

	
	console.log(json_data);

}

