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
		}
	}
	return !foundErrors;
}

function validate(element){
	if(element.type=="text"){
		var currentElementsName = element.name;	
		if(currentElementsName=="number"){
			window.alert("number");
			return validateTrickotNumber(element.value);
		}else if(currentElementsName=="jahr"){
			window.alert("jahr");
			return validateYear(element.value);
		}else{
			return validateName(element.value);
		}
	}else if (element.type=="radio"){
		return;
	}
}

function validateName(value){
	return false;	
}

function validateYear(value){
	return false;
}

function validateTrickotNumber(value){
	return false;
}