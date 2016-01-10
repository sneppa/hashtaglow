var xmlhttp = new XMLHttpRequest();
var url = "/AllPlayers";

var onlyFavorites = false;

function updateMe(){
	xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && xmlhttp.responseText != null) {
	        showPlayerDetails(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function showPlayerDetails(myResponse) {
	var arr = JSON.parse(myResponse);
	var i;
	var out = "<table align='center'>";
	
	//add "Alle Spieler" and "Meine Favoriten" as Headlines to the Table
        var allPlayers = ' class="active"';
        var favPlayers = '';
	if(onlyFavorites){
            allPlayers = '';
            favPlayers = ' class="active"';
	}
        out += "<tr><th colspan='3' onclick='changeToAll()' id='allPlayers' "+allPlayers+">Alle Spieler</th>" +
        "<th colspan='5' onclick='changeToFavorites()' id='favPlayers' "+favPlayers+">Meine Favoriten</th></tr>";

	//add headlines to the table
	out += "<tr><td>Spieler</td><td>Verein</td><td>Headcoach</td><td>Assistant</td>" +
			"<td>Position</td><td>Aktiv</td><td>Nummer</td><td>Jahr</td></tr>";
	//add div Tag to the inner elements to set the font size
	out += "<div class='favoritesTableContent'>"
	
	//iterate through the data to build it up in a table
	for(i = 0; i < arr.length; i++) {
			out += "<tr><td>" +
			arr[i].firstname + " " +
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
	//end table
	out += "</table>";
	//end div
	out += "</div>"
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
	url = "/AllPlayers";
	updateMe();
}

function changeToFavorites(){
	onlyFavorites = true;
	url = "/Favorites";
	updateMe();
}
