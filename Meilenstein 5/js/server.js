// import HTTP module, url, and file system
var http = require('http');
var url = require('url');
var fs = require("fs");

// Server Config
const PORT=8000;
const IP="127.0.0.1";

// create server variable
var server = http.createServer(function (request, response) {
	var queryData = url.parse(request.url, true).query;
	var myString = queryData.vorname + ' ' + queryData.name + ', ' + queryData.hcoach + ', ' + queryData.acoach + ', ' + queryData.position + ', ' + queryData.number + '\n';
	
	// TODO - didn't write own parse
	fs.appendFile('../db/form.txt', myString, function (err) {

		// show console log and end response with message
		console.log('<User connected to Server>');
		response.end('Sie haben sich erfolgreich auf den WebServer mit der Url ' + IP + ':' + PORT + ' verbunden');
	});
});

// start the Server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});