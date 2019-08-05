(function () {
	let valInput = form.elements.val;

	form.onsubmit = function() {
		if(!valInput.value) {
			alert("Error");
		} else {
			let formDate = new FormData(document.forms.ourForm);
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost:8080/message");
			xhr.send(formData);
		}
		return false;
	}
})();