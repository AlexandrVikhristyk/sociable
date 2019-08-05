(function () {
	let form = document.forms.ourForm;
	let valInput = form.elements.val;


	form.onsubmit = function() {
		if(!valInput.value) {
			alert("Error");
		} else {
			let obj = ({
				id: null,
				text: valInput.value
			});
			let formDate = new FormData(form);
			let json = JSON.stringify(obj);
			let xhr = new XMLHttpRequest();
			console.log(json);
			xhr.open("POST", "http://localhost:8080/message");
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(json);
		}
		return false;
	}


	let formRegist = document.forms.registerForm;
	let valLogin = form.elements.login;
	let valPassword = form.elements.password;

	formRegist.onsubmit = function() {
		if(!valLogin.value) {
			alert("Error");
		} else {
			let obj = ({
				userName: valLogin.value,
				hashPass: valPassword.value
			});
			let formDate = new FormData(form);
			let json = JSON.stringify(obj);
			let xhr = new XMLHttpRequest();
			console.log(json);
			xhr.open("POST", "http://localhost:8080/message");
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(json);
		}
		return false;
	}
})();