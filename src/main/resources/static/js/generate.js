(function() {

let chat = Object.create(HTMLElement.prototype);

chat.createdCallback = function() {

	let stompClient = null;

	let crWrapper = document.createElement("div");
	crWrapper.className = "chat_wrapper";
	let iconChat = new Image();
	iconChat.src = "../../assets/speech-bubble.svg";
	crWrapper.append(iconChat);
	this.append(crWrapper);

	let animationLoad = `<div class="spinner-border text-danger" role="status">
 							<span class="sr-only">Loading...</span>
						</div>`

	let crChatBlock = document.createElement("div");
	crChatBlock.className = "chat_wrapper__block shadow";
	let crInput = document.createElement("input");
	crInput.type = "text";
	crInput.name = "send-socked";
	crInput.className = "form-control";
	let crBtn = document.createElement("input");
	crBtn.type = "submit";
	crBtn.className = "btn btn-danger";
	crBtn.addEventListener("click", () => {
		sendName(crInput.value);
		console.log("SEND SOCKED");
	});

	crChatBlock.append(crInput);
	crChatBlock.append(crBtn);
	$(crChatBlock).append(animationLoad);
	document.body.append(crChatBlock);

	let statusConnect = false;

	crWrapper.addEventListener("click", (event) => {
		crChatBlock.classList.toggle("chat_wrapper__block__open");
		if(!statusConnect){
			connect().then(
				result => {$(".spinner-border").hide()},
				error => { console.log(error) }
			);
			statusConnect = true;
		}
	});

	function sendName(data) {
    	stompClient.send("/app/hello", {}, JSON.stringify({'text': data}));
	}

	function connect() {
		return new Promise(function(resolve, reject) {
			let socket = new SockJS('/gs-guide-websocket');
		    stompClient = Stomp.over(socket);
		    stompClient.connect({}, function (frame) {
		    	resolve();
		        stompClient.subscribe('/topic/greetings', function (greeting) {
		        	let obj = JSON.parse(greeting.body);
		            showGreeting(obj.text + " " + obj.creationDate);
		            console.log('Connected: ' + frame);
		        });
		    }, function() {
		    	console.log("Error connected");
		    	reject();
		    });
		});
	}

	function showGreeting(message) {
    	$(".chat_wrapper__block").append("<tr><td>" + message + "</td></tr>");
	}


}

let chatComponent = document.registerElement("chat-component",{
	prototype: chat
});


let showList = [
	{id: "1", text: "TEST"},
	{id: "2", text: "TEST"},
	{id: "3", text: "TEST"}
];

function getData(method, from, json){

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
		 case "PUT":
		 	return new Promise(function(resolve, reject) {
				let xhr = new XMLHttpRequest();
				xhr.open("PUT", from, false);
				xhr.setRequestHeader('Content-Type', 'application/json');
				console.log(json);
				xhr.send(json);
			});
		 break;

	}

};

getData("GET", "http://localhost:8080/message").then(
	result => {
		console.log(result);
	},
	error => {
		console.log(error);
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
				updateProjectFromBase(event.target);
			});
		}
	}

	let crUl = document.createElement("ul");
	crUl.className = "list-component__wrapper list-group";
	let fragment = new DocumentFragment();

	for(let i = 0; i < showList.length; i++) {
		let crI = document.createElement("li");
		let crInput = document.createElement("input");

		/////////////////////////////////////////dev vladoss
	
		let buttonDelete = document.createElement("button");
		buttonDelete.dataset.stuffIdDelete = showList[i].id;
		actnDel(buttonDelete)();
		let buttonUpdate = document.createElement("button");
		buttonUpdate.dataset.stuffIdUpdate = showList[i].id;
		buttonUpdate.setAttribute("class", "buttonUpdate");
		actnUpd(buttonUpdate)();
		buttonDelete.append(document.createTextNode("Delete"));
		buttonUpdate.append(document.createTextNode("Update"));
		crInput.type = "text";
		crInput.setAttribute('value', showList[i].text);
		crInput.className = "form-control";
		crI.append(document.createTextNode(`${showList[i].id}`));
		crI.append(crInput);
		crI.append(buttonUpdate);
		crI.append(buttonDelete);

		/////////////////////////////////////////

		crI.className = "list-component__wrapper__item list-group-item";
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
			console.log(result);
		},
		error => {
			console.log(error);
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
};


function updateProjectFromBase(target) {

	let obj = ({
		text: target.previousElementSibling.value
	});

	let json = JSON.stringify(obj);
	console.log(json);

	getData("PUT", `/message/${target.dataset.stuffIdUpdate}`, json).then(
		result => {
			console.log(result);
		},
		error => {
			console.log(error);
		}
	)
}


})();