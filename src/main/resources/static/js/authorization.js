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
				let obj = ({
					username: valLogin.value,
					hashPass: valPassword.value,
				});
				let json = JSON.stringify(obj);
				let xhr = new XMLHttpRequest();
				console.log(valLogin.value + " " + valPassword.value);
				xhr.open("POST", "http://localhost:8080/log");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(json);

				xhr.onload = function() {
					if(xhr.status == 200) {
						alert("Саша ПИДОР!!!!");
					} else {
						alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
					}
				}
			
			return false;
		}

		let formRegist = document.forms.registerForm;
		let valueLogin = formRegist.elements.username;
		let valuePassword = formRegist.elements.hashPass;
		let valueEmail = formRegist.elements.email;

		formRegist.onsubmit = function() {
				let obj = ({
					username: valueLogin.value,
					hashPass: valuePassword.value,
					email: valueEmail.value
				});
				let json = JSON.stringify(obj);
				let xhr = new XMLHttpRequest();
				console.log(valueLogin.value + " " + valuePassword.value + " " + valueEmail.value);
				xhr.open("POST", "http://localhost:8080/reg");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				console.log(json);
				xhr.send(json);

				xhr.onload = function() {
					if(xhr.status == 200) {
						alert("Саша ПИДОР!!!!");
					} else {
						alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
					}
				}
		
			return false;
		}
})();