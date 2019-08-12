"use strict"
window.onload = function() {
	let preloader = document.getElementById("container");
	let form = document.getElementById("form")
	preloader.style.display = "none";
	form.style.display = "block";

	let local = localStorage.getItem('login');
	let user = document.getElementById("user");
	let span = document.createElement("span");
	span.append(document.createTextNode(`Welcome: ${local}`));
	user.append(span);
};