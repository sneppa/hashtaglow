var xmlhttp = new XMLHttpRequest();
var url = "../data/data.json";

var onlyFavorites = false;

function updateMe(){
	xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState == 4) {
	        showPlayerDetails(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function showPlayerDetails(myResponse) {
	var arr = JSON.parse(myResponse);
	var i;
	var out = "<table>";
	
	//add "Alle Spieler" and "Meine Favoriten" as Headlines to the Table
	// TODO - onClick Event -> onlyFavorites = true/false
	out += "<tr><th colspan='3' onclick='changeToAll()'>Alle Spieler</th><th colspan='5'onclick='changeToFavorites()'>Meine Favoriten</th>";
	//add headlines to the table
	out += "<tr><td>Spieler</td><td>Verein</td><td>Headcoach</td><td>Assistant</td><td>Position</td><td>Aktiv</td><td>Nummer</td><td>Jahr</td></tr>";

	//iterate through the data to build it up in a table
	for(i = 0; i < arr.length; i++) {
		if (onlyFavorites == true){
			if (arr[i].isFavorite == true){
				out += "<tr><td>" +
				arr[i].surname + 
				"</td><td>" +
				arr[i].team +
				"</td><td>" +
				arr[i].headcoach +
				"</td><td>" +
				arr[i].asisstantcoach +
				"</td><td>" +
				arr[i].position +
				"</td><td>" +
				wrapActivitytoGerman(arr, i) +
				"</td><td>" +
				arr[i].number +
				"</td><td>" +
				arr[i].year +
				"</td></tr>";
			}
		} else {
			out += "<tr><td>" +
			arr[i].surname + 
			"</td><td>" +
			arr[i].team +
			"</td><td>" +
			arr[i].headcoach +
			"</td><td>" +
			arr[i].asisstantcoach +
			"</td><td>" +
			arr[i].position +
			"</td><td>" +
			wrapActivitytoGerman(arr, i) +
			"</td><td>" +
			arr[i].number +
			"</td><td>" +
			arr[i].year +
			"</td></tr>";
		}
    }
	//end table
	out += "</table>";
	//insert output to document
	document.getElementById("playerTable").innerHTML = out;
}

function wrapActivitytoGerman(array, position){
	if(array[position].isActive == true){
		return "Ja";
	} else {
		return "Nein";
	}
}

function changeToAll(){
	onlyFavorites = false;
	updateMe();
}

function changeToFavorites(){
	onlyFavorites = true;
	updateMe();
}
