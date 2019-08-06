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
			setTimeout(() => {
				updatingTest();
			}, 300);

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

	function updatingTest() {

		let xhr2 = new XMLHttpRequest();
		let showList = [];
		xhr2.open("GET", "http://localhost:8080/message", false);
		xhr2.setRequestHeader('Content-Type', 'application/json');

		function actnDel(target) {
			return function() {
				target.addEventListener("click", event => {
					deleteProjectFromBase(event.target);
				});
			}
		}

		function actnUpd(target) {
			return function() {
				target.addEventListener("click", event => {
					updateProjectFromBase();
				});
			}
		}

		xhr2.onload = function () {
			if (xhr2.status === 200) {
				showList = JSON.parse(xhr2.response);
				let crUl = document.createElement("ul");
				crUl.classList.add("list-component__wrapper");
				let fragment = new DocumentFragment();

				for(let i = 0; i < showList.length; i++) {
					let crI = document.createElement("li");

					/////////////////////////////////////////dev vladoss

					let buttonDelete = document.createElement("button");
					buttonDelete.dataset.stuffIdDelete = showList[i].id;
					actnDel(buttonDelete)();
					let buttonUpdate = document.createElement("button");
					actnUpd(buttonUpdate)();
					buttonDelete.append(document.createTextNode("Delete"));
					buttonUpdate.append(document.createTextNode("Update"));
					crI.append(document.createTextNode(`${showList[i].id} - ${showList[i].text}`));
					crI.append(buttonUpdate);
					crI.append(buttonDelete);

					/////////////////////////////////////////

					crI.classList.add("list-component__wrapper__item");
					crI.dataset.stuffId = showList[i].id;
					fragment.append(crI);
				}
				console.log(showList);
				crUl.append(fragment);
				document.querySelectorAll(".list-component__wrapper")[0].innerHTML = "";
				document.querySelectorAll(".list-component__wrapper")[0].append(crUl);
			} else {
				alert('Ошибка: ' + xhr2.status);
			}
		};

		xhr2.onerror = function () {
			alert("Error");
		};
		xhr2.send();
	}



})();