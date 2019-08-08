(function () {
	'use strict'
		const signupButton = document.getElementById('signup-button'),
		    loginButton = document.getElementById('login-button'),
		    userForms = document.getElementById('user_options-forms')	    

		/**
		 * Add event listener to the "Sign Up" button
		 */
		signupButton.addEventListener('click', () => {
		  userForms.classList.remove('bounceRight')
		  userForms.classList.add('bounceLeft')
		}, false)

		/**
		 * Add event listener to the "Login" button
		 */
		loginButton.addEventListener('click', () => {
		  userForms.classList.remove('bounceLeft')
		  userForms.classList.add('bounceRight')
		}, false)

		let loginForm = document.forms.loginForm;
		let valLogin = loginForm.elements.username;
		let valPassword = loginForm.elements.hashPass;

		loginForm.onsubmit = function() {
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
				xhr.open("POST", "http://localhost:8080/user/log");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(json);
			}
			return false;
		}

		let formRegist = document.forms.registerForm;
		let valueLogin = formRegist.elements.username;
		let valuePassword = formRegist.elements.hashPass;
		let valueEmail = formRegist.elements.email;

		formRegist.onsubmit = function() {
			if(!valueLogin.value || !valuePassword.value || !valueEmail.value) {
				alert("Error");
			} else {
				let obj = ({
					username: valueLogin.value,
					hashPass: valuePassword.value,
					email: valueEmail.value
				});
				let json = JSON.stringify(obj);
				let xhr = new XMLHttpRequest();
				console.log(valueLogin.value + " " + valuePassword.value + " " + valueEmail.value);
				xhr.open("POST", "http://localhost:8080/user/reg");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(json);
			}
			return false;
		}
})();