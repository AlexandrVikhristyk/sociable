(function() {

let showList;

(function startApp() {
	setTimeout(() => {
		getData("http://localhost:8080/message");
	}, 2000);
})();

function getData(from) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", from, true);

	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		if(xhr.status == 200) {
			showList = JSON.parse(xhr.response);
		} else{
			alert( 'Ошибка: ' + xhr.status);
		}
	}

	xhr.onerror = function() {
		alert("Request failed");
	};
	xhr.send();
}


let list = Object.create(HTMLElement.prototype);

list.createdCallback = function() {
	let crUl = document.createElement("ul").classList.add("list_wrapper");
	let fragment = new DocumentFragment();

	for(let i = 0; i > showList.length; i++) {
		let crI = document.createElement("li").classList.add("list_wrapper__item");
		crI.innerHTML = `Id - ${showList[i][id]} | Text - ${showList[i][text]}`;
		fragment.append(crI);	
	}
	crUl.append(fragment);
}

let listComponent = document.registerElement("list-component",{
	prototype: list
});


})();