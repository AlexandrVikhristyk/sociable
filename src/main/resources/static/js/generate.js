(function() {

let showList = [];

function getData(from) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", from, false);

	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		if(xhr.status === 200) {
			showList = JSON.parse(xhr.response);
		} else{
			alert( 'Ошибка: ' + xhr.status);
		}
	};

	xhr.onerror = function() {
		alert("Request failed");
	};
	xhr.send();
}

getData("http://localhost:8080/message");

let list = Object.create(HTMLElement.prototype);

list.createdCallback = function() {
	console.log(showList);
	let crUl = document.createElement("ul");
	crUl.classList.add("list-component__wrapper");
	let fragment = new DocumentFragment();

	for(let i = 0; i < showList.length; i++) {
		let crI = document.createElement("li");

		/////////////////////////////////////////
	
		let buttonDelete = document.createElement("button");
		let buttonUpdate = document.createElement("button");
		buttonDelete.append(document.createTextNode("Delete"));
		buttonUpdate.append(document.createTextNode("Update"));
		crI.append(document.createTextNode(`${showList[i].id} - ${showList[i].text}`));
		crI.append(buttonUpdate);
		crI.append(buttonDelete);

		/////////////////////////////////////////


		crI.classList.add("list-component__wrapper__item");
		// crI.innerHTML = `<i>${showList[i].id}</i> - ${showList[i].text}`;
		fragment.append(crI);
	}
	crUl.append(fragment);
	this.append(crUl);
};

let listComponent = document.registerElement("list-component",{
	prototype: list
});


})();