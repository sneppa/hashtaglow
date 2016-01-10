//import HTTP module, url, express and file system
var http = require('http');
var url = require('url');
var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var path = require('path');

// include static content (CSS,HTML,JS)
app.use('/css',express.static(__dirname + '/css'));
app.use('/', express.static(__dirname + '/html'));
app.use('/js', express.static(__dirname + '/js'));

// Bodyparser Options for PUT Request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// main page
app.get("/", function(req, res) {
   res.sendFile(path.resolve('html/home.html'));
});

// show all players
app.get('/allPlayers', function (req, res) {
    fs.readFile(__dirname + "/html/data.json", 'utf8', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});

// show Favorites
app.get('/Favorites', function (req, res) {
    fs.readFile(__dirname + "/html/data.json", 'utf8', function (err, data) {
        var jSonArray = JSON.parse(data);
        var resJSON = [];
        for (var i = 0; i < jSonArray.length; i++) {
            if (jSonArray[i].isFavorite) {
                resJSON.push({
                    "_id"           : jSonArray[i]._id,
                    "isActive"      : jSonArray[i].isActive,
                    "isFavorite"    : jSonArray[i].isFavorite,
                    "year"          : jSonArray[i].year,
                    "number"        : jSonArray[i].number,
                    "firstname"     : jSonArray[i].firstname,
                    "surname"       : jSonArray[i].surname,
                    "headcoach"     : jSonArray[i].headcoach,
                    "asisstantcoach": jSonArray[i].asisstantcoach,
                    "team"          : jSonArray[i].team,
                    "position"      : jSonArray[i].position
                });
            }
        }
        res.end(JSON.stringify(resJSON));
    });
});


app.put('/Player', function (req, res) { 

    var queryData = req.body;
    
    console.log(queryData);

    if (typeof queryData.submit != "undefined")
    {
        console.log('Data send');
        res.end("ok");
        var myString = queryData.vorname + ' ' + queryData.name + ', ' + queryData.jahr + ', ' + queryData.hcoach + ', ' + queryData.acoach + ', ' + queryData.position + ', ' + queryData.number + '\n';
        console.log(myString);
        appendToFile('./db/form.txt', myString);
    }
    else
        res.end("error");
});

//create server variable
/*
var server = http.createServer(function (request, response) {
	
	//TODO filtering the "favicon-request", better select the form-request and drop everything else!
	if(request.url.indexOf('ico') > -1){
		console.log('requested ico')
		return;	
	}
	console.log('called')
	var queryData = url.parse(request.url, true).query;
	var myString = queryData.vorname + ' ' + queryData.name + ', ' + queryData.jahr + ', ' + queryData.hcoach + ', ' + queryData.acoach + ', ' + queryData.position + ', ' + queryData.number + '\n';

	appendToFile('../db/form.txt', myString);
	response.end('Sie haben sich erfolgreich auf den WebServer mit der Url ' + IP + ':' + PORT + ' verbunden');
	
});
*/

//start the Server
var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});
    

//old stuff
function appendToFile(path, appendingString){
	fs.open(path, 'a', function( err, fd ) {
		fs.write( fd, appendingString, null, 'utf8', function(){
			fs.close(fd, function(){
				console.log('file closed')
			});
		});
	});
}