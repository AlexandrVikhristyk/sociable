"use strict"
window.onload = function() {
	let preloader = document.getElementById("container");
	let form = document.getElementById("form")
	preloader.style.display = "none";
	form.style.display = "block";

	let local = localStorage.getItem('login');
	let user = document.getElementById("user");
	let span = document.createElement("span");
	let img = document.createElement('img');
	img.setAttribute("class", "dropdownArrow");
	img.setAttribute("src", "../css/img/dropdownArrow.svg");
	span.append(document.createTextNode(`Welcome: ${local}`));
	user.append(span);
	span.append(img);
};