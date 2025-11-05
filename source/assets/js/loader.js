document.onreadystatechange = function () {
	var body = document.querySelector("body"),
		loader = document.querySelector(".loader");

	if (document.readyState == "complete") {
		// body.style.visibility = 'visible'
		// loader.style.visibility = 'hidden'
		loader.classList.remove("is-loading");
		// setTimeout(loader.remove(), 1000)
	} else {
		// body.style.visibility = 'hidden'
		// loader.style.visibility = 'visible'
		// loader.style.visibility = 'visible'
	}
};
