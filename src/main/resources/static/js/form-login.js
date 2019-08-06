(function () {
	'use strict'

	let formComponent = Object.create(HTMLElement.prototype);

	formComponent.createdCallback = function() {

		let formLogin = document.createElement("form");
		let forTitle = document.createElement("p");
		let inputSend = document.createElement("input");
		forTitle.append(document.createTextNode("Form login"));

		let objAttribute = [
		{"type": "name", "name": "username", "placeholder": "Username"},
		{"type": "password", "name": "hashPass", "placeholder": "Password"}
		]
		
		let fragment = new DocumentFragment();
			for (let i = 0; i < objAttribute.length; i++) {
				let crInput = document.createElement("input");
				crInput.setAttribute("type", objAttribute[i]["type"]);
				crInput.setAttribute("name", objAttribute[i]["name"]);
				crInput.setAttribute("placeholder", objAttribute[i]["placeholder"]);

				fragment.append(crInput);
			}
			formLogin.append(fragment);
			formLogin.setAttribute("name", "loginForm");
			formLogin.append(inputSend);
			inputSend.setAttribute("type", "submit");	
			inputSend.setAttribute("value", "Sign In");
			this.append(formLogin);
			formLogin.insertBefore(forTitle, formLogin[0]);

		let loginForm = document.forms.loginForm;
		let valLogin = formLogin.elements.username;
		let valPassword = formLogin.elements.hashPass;

		formLogin.onsubmit = function() {
			if(!valLogin.value || !valPassword.value) {
				alert("Error");
			} else {
				let obj = ({
					login: valLogin.value,
					password: valPassword.value,
				});
				let json = JSON.stringify(obj);
				let xhr = new XMLHttpRequest();
				console.log(valLogin.value + " " + valPassword.value);
				xhr.open("POST", "http://localhost:8080/user/login");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(json);
			}
			return false;
		}
		}

		let formComponents = document.registerElement("form-login",{
			prototype: formComponent
		});
})();