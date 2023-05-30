
// Exercise 6
function validate() {
	var error = 0;

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");  
	
	// Comprobamos si todos los campos estan rellenados ademas de si tienen al menos 3 caracteres.
	var fieldForm = ["fName", "fEmail", "fLastN", "fPaswword", "fAdress", "fPhone"];
	var lettersOnly = /^[A-Za-z]+$/;
	fieldForm.forEach(element => {
		let field = document.getElementById(element)
		if (field.value.length <= 3) {
			error++
		}
		// esto hay que cambiar los fname ponerlos en una variable
		if (!lettersOnly.test(fieldForm[0].value) || !lettersOnly.test(fieldForm[1].value)) {
            error++;	
		}
	});

	
	 
	if(error>=1){
		alert("Error");
	}else{
		alert("OK");
	}

}
