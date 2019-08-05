(function() {

let showList = [
	{id: "1", text: "TEST"},
	{id: "2", text: "TEST"},
	{id: "3", text: "TEST"}
];

function getData(method, from){

	switch(method) {

		case "GET":
		 	return new Promise(function(resolve, reject) {
				let xhr = new XMLHttpRequest();
				xhr.open("GET", from, false);

				xhr.setRequestHeader('Content-Type', 'application/json');

				xhr.onload = function() {
					if(xhr.status === 200) {
						showList = JSON.parse(xhr.response);
						resolve("successful");
					} else{
						alert( 'Ошибка: ' + xhr.status);
					}
				};

				xhr.onerror = function() {
					reject();
				};
				xhr.send();
			});
		 break;
		 case "DELETE": 
			 return new Promise(function(resolve, reject) {
				let xhr = new XMLHttpRequest();
				xhr.open("DELETE", from, false);
				xhr.send();
			 });
		 break;

	}

};

getData("GET", "http://localhost:8080/message").then(
	result => {
		console.log(result);
	},
	error => {
		alert(error);
	}
)
// ("http://localhost:8080/message");

let list = Object.create(HTMLElement.prototype);

list.createdCallback = function() {

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
	crUl.append(fragment);
	this.append(crUl);
};

let listComponent = document.registerElement("list-component",{
	prototype: list
});

window.deleteProjectFromBase = function(target) {
	// let xhr = new XMLHttpRequest();

	target.parentNode.remove();
	
	getData("DELETE", `http://localhost:8080/message/${target.dataset.stuffIdDelete}`).then(
		result => {
			alert(result);
		},
		error => {
			alert(error);
		}
	)


	// list.createdCallback();

	// setTimeout(() => {
	// 	getData("GET", "http://localhost:8080/message").then(
	// 		result => {
	// 			console.log(result);
	// 		},
	// 		error => {
	// 			alert(error);
	// 		}
	// 	)
	// }, 1000);
}

function updateProjectFromBase() {
	alert("test");
}


})();