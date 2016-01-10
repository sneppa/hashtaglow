function formValidation(){
	var elements = document.getElementById("player_form").elements;
	var errors = [""];
	var foundErrors = false;
	for (var i=0;i<elements.length;i++){
		if(validate(elements[i])==false){
			if(foundErrors==false){
				elements[i].focus();
			}
			elements[i].style.borderColor = "red";
			errors.push(elements[i]);
			foundErrors=true;
		} else
			elements[i].style.borderColor = "";                    
	}
        if (foundErrors) {
            alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");
        } else {
	        //TODO - create put request with data
/*
	        var request = new XMLHttpRequest();	        
	        request.open("PUT", "http://127.0.0.1:8000/Player", true);
*/
        }
}

function validate(element){
	if(element.type=="text"){
		var currentElementsName = element.name;	
		if(currentElementsName=="number"){
                    return validateTrikotNumber(element.value);
		}else if(currentElementsName=="jahr"){
                    return validateYear(element.value);
		}else{
                    return validateText(element.value);
		}
	}else if (element.type=="radio"){
            return;
	}
}

function validateText(value){
    return value.match(/^[a-z öäüß]+$/i) !== null; // Nimmt auch Leerzeichen/deutsche Umlaute an (Verein kann ja auch Leerzeichen enthalten)
}

function validateYear(value){
    var d = new Date();
    return (value >= 0 && value < d.getFullYear()); // value.match(/^\d{1,4}$/) !== null && | Das match kann eigentlich draußen bleiben, wenn sie die will, dann rein damit
}

function validateTrikotNumber(value){
    return (value > 3 && value < 16); // value.match(/^\d{1,2}$/) !== null && | Das match kann eigentlich draußen bleiben, wenn sie die will, dann rein damit
}