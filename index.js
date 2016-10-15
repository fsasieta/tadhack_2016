var express = require('express')
var http = require("http");
var fs   = require("fs");
var path = require("path");
var mime = require("mime");


var app = express();

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}
function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
});

var port_number = server.listen(process.env.PORT || 3000);


/*
var get_list_of_events = function () {

	var json_data = fs.readfile('input.txt', function(err, data) {

		if (err){
			console.log(err.stack);
			return;
		}

		return data.toString();
	})

	
	console.log(json_data);

}
*/

/*
app.get('/events_available', function(req, res) {
	res.json({event1: "Comm working in browser"})
	//get_list_of_events()
})

app.listen(3000);
*/


