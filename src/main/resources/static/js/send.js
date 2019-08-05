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
	}


	let formRegist = document.forms.registerForm;
	let valLogin = formRegist.elements.log;
	let valPassword = formRegist.elements.pas;

	formRegist.onsubmit = function() {
		if(!valLogin.value || !valPassword.value) {
			alert("Error");
		} else {
			// let obj = ({
			// 	userName: valLogin.value,
			// 	hashPass: valPassword.value
			// });
			// let json = JSON.stringify(obj);
			let xhr = new XMLHttpRequest();
			console.log(valLogin.value + valPassword.value);
			xhr.open("POST", "http://localhost:8080/user");
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(valLogin.value + valPassword.value);
		}
		return false;
	}
})();