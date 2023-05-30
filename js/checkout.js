
// Exercise 6
function validate(event) {
	var error = 0;
	event.preventDefault();
	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");

	// Comprobamos si todos los campos estan rellenados ademas de si tienen al menos 3 caracteres.
	var fieldForm = ["fName", "fEmail", "fLastN", "fPassword", "fAddress", "fPhone"];
	var lettersOnly = /^[A-Za-z]+$/;
	fieldForm.forEach(element => {
		let field = document.getElementById(element)
		if (field.value.length <= 3) {
			error++
		}
		// Comprobamos si los campos se han escrito con los caracteres adecuados
		if (lettersOnly.test(field.value)) {
			error++
		}
	});




	//  Comprobamos si hay errores y mostramos el mensaje.
	if (error >= 1) {
		alert("Error");
	} else {
		alert("OK");
	}

}
