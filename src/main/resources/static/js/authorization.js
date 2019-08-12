(function () {
	'use strict'
		const signupButton = document.getElementById('signup-button'),
		    loginButton = document.getElementById('login-button'),
		    userForms = document.getElementById('user_options-forms')	    
		
		signupButton.addEventListener('click', () => {
		  userForms.classList.remove('bounceRight')
		  userForms.classList.add('bounceLeft')
		}, false)

		loginButton.addEventListener('click', () => {
		  userForms.classList.remove('bounceLeft')
		  userForms.classList.add('bounceRight')
		}, false)

		let loginForm = document.forms.loginForm;
		let valLogin = loginForm.elements.username;
		let valPassword = loginForm.elements.hashPass;

		loginForm.onsubmit = function() {
				let obj = ({
					login: valLogin.value,
					password: valPassword.value,
				});
				let json = JSON.stringify(obj);
				let xhr = new XMLHttpRequest();
				console.log(valLogin.value + " " + valPassword.value);
				xhr.open("POST", "http://localhost:8080/log");
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.send(json);

				xhr.onload = function() {
					if(xhr.status == 200) {
						location.href = "/";
						localStorage.setItem('login', valLogin.value);
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
			let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-_])(?=.{8,})");
			if(strongRegex.test(valuePassword.value)) {
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
				xhr.send(json);

				xhr.onload = function() {
					if(xhr.status == 200) {
						location.href = "/";
						localStorage.setItem('login', valueLogin.value);
						formRegist.reset();
					} else {
						alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
					}
				}
		
				return false;
			} else {
				document.getElementById("forms_error").classList.add("forms_error");
				document.getElementById("placeholder_error").classList.add("placeholder_error");
				document.querySelector(".tooltip_error").style.opacity = "1";
				return false;
			}
		}

		let googleClass = document.getElementsByClassName("googleClass");

		for(let i = 0; i < googleClass.length; i++) {
			googleClass[i].addEventListener("mouseenter", () => {
				googleClass[i].setAttribute("src", "../css/img/search.png");
			}, false);	

			googleClass[i].addEventListener("mouseleave", () => {
				googleClass[i].setAttribute("src", "../css/img/search.svg");
			}, false);	
		}
})();