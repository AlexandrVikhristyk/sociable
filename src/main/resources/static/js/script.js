(function startApp() {
	setTimeout(() => {
		getData("localhost:8080/message");
	}, 2000);
})();

function getData(from) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET","from", false);

	if(xhr.status == 200 && xhr.readyState == 4) {
		let value = JSON.parse(xhr.responseText);
		console.log(value);
	};
	xhr.onerror = function() {
		alert("Request failed");
	};
	xhr.send();
}