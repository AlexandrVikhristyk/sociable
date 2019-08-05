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
			let json = JSON.stringify(obj);
			let xhr = new XMLHttpRequest();
			console.log(json);
			xhr.open("POST", "http://localhost:8080/message");
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(json);
		}
		return false;
	};


	let formRegist = document.forms.registerForm;
	let valLogin = formRegist.elements.username;
	let valPassword = formRegist.elements.hashPass;
	let varEmail = formRegist.elements.email;

	formRegist.onsubmit = function() {
		if(!valLogin.value || !valPassword.value) {
			alert("Error");
		} else {
			let obj = ({
				// id: null,
				username: valLogin.value,
				hashPass: valPassword.value,
				email: varEmail.value,
				// role: null,
				// lastVisit: null
			});
			let json = JSON.stringify(obj);
			let xhr = new XMLHttpRequest();
			console.log(valLogin.value + " " + valPassword.value + " " + varEmail.value);
			xhr.open("POST", "http://localhost:8080/user/registration");
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(json);
		}
		return false;
	}
})();