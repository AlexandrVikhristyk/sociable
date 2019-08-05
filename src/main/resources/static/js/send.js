(function () {

	let formComponent = Object.create(HTMLElement.prototype);

	formComponent.createdCallback = function() {

	let formReg = document.createElement("form");
	// let forTitle = document.createElement("p");
	// forTitle.innerHTML = "Form Registrtion";
	let objAttribute = [
	{"type": "name", "name": "username", "placeholder": "Username"},
	{"type": "password", "name": "hashPass", "placeholder": "Password"},
	{"type": "email", "name": "email", "placeholder": "Example@gmail.com"}
	]
	let fragment = new DocumentFragment();
		for (let i = 0; i < 4; i++) {
			let crInput = document.createElement("input");
			if(i == 0) {
				crInput.setAttribute("type", "name");
				crInput.setAttribute("name", "username");
				crInput.setAttribute("placeholder", "Username");
			} else if(i == 1) {
				crInput.setAttribute("type", "password");
				crInput.setAttribute("name", "hashPass");
				crInput.setAttribute("placeholder", "Password");
			} else if(i == 2) {
				crInput.setAttribute("type", "email");
				crInput.setAttribute("name", "email");
				crInput.setAttribute("placeholder", "Example@gmail.com");
			} else {
				crInput.setAttribute("type", "submit");
			}
			fragment.append(crInput);
		}
		formReg.append(fragment);
		formReg.setAttribute("name", "registerForm");	
		this.append(formReg);

	let formRegist = document.forms.registerForm;
	let valLogin = formRegist.elements.username;
	let valPassword = formRegist.elements.hashPass;
	let valEmail = formRegist.elements.email;

	formRegist.onsubmit = function() {
		if(!valLogin.value || !valPassword.value || !valEmail) {
			alert("Error");
		} else {
			let obj = ({
				username: valLogin.value,
				hashPass: valPassword.value,
				email: valEmail.value
			});
			let json = JSON.stringify(obj);
			let xhr = new XMLHttpRequest();
			console.log(valLogin.value + " " + valPassword.value + " " + valEmail.value);
			xhr.open("POST", "http://localhost:8080/user/registration");
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.send(json);
		}
		return false;
	}
	}

	let formComponents = document.registerElement("form-component",{
		prototype: formComponent
	});

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

})();