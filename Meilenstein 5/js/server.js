//import HTTP module, url, and file system
var http = require('http');
var url = require('url');
var fs = require("fs");

//Server Config
const PORT=8000;
const IP="127.0.0.1";

//create server variable
var server = http.createServer(function (request, response) {
	
	//TODO filtering the "favicon-request", better select the form-request and drop everything else!
	if(request.url.indexOf('ico') > -1){
		console.log('requested ico')
		return;	
	}
	console.log('User connected to Server')
	var queryData = url.parse(request.url, true).query;
        
        if (typeof queryData.name != "undefined")
        {
            console.log('Data send');
            var myString = queryData.vorname + ' ' + queryData.name + ', ' + queryData.jahr + ', ' + queryData.hcoach + ', ' + queryData.acoach + ', ' + queryData.position + ', ' + queryData.number + '\n';
            appendToFile('../db/form.txt', myString);
        }
        
	response.end('Sie haben sich erfolgreich auf den WebServer mit der Url ' + IP + ':' + PORT + ' verbunden');
	
});

//start the Server
server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);
});

function appendToFile(path, appendingString){
	fs.open(path, 'a', function( err, fd ) {
		fs.write( fd, appendingString, null, 'utf8', function(){
			fs.close(fd, function(){
//				console.log('file closed')
			});
		});
	});
}