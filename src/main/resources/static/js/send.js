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

	let formLogin = document.forms.formLogin;
	let valueLogin = formLogin.elements.login;
	let valuePassword = formLogin.elements.password;

	formLogin.onsubmit = function() {
		if(!valueLogin.value || !valuePassword.value) {
			alert("Error");
		} else {
			let obj = ({
				login: valueLogin.value,
				password: valuePassword.value
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

	let xhr2 = new XMLHttpRequest();
	xhr2.open("GET", "http://localhost:8080/message", false);
	xhr2.setRequestHeader('Content-Type', 'application/json');

	xhr2.onload = function() {
		if(xhr2.status === 200) {
			document.querySelectorAll(".list-component__wrapper")[0].innerHTML = JSON.parse(xhr2.response);
		} else{
			alert( 'Ошибка: ' + xhr2.status);
		}
	};

	xhr2.onerror = function() {
		alert("Error");
	};
	xhr2.send();



})();