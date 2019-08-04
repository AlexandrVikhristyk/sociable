(function startApp() {
	setTimeout(() => {
		getData("http://localhost:8080/message");
	}, 2000);
})();

function getData(from) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", from, false);

	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		if(xhr.status == 200) {
			let value = JSON.parse(xhr.response);
			console.log(value);
		} else{
			alert( 'Ошибка: ' + xhr.status);
		}
	}

	xhr.onerror = function() {
		alert("Request failed");
	};
	xhr.send();
}