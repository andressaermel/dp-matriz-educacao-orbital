var IS_LOADING = false;

var heroImage = document.querySelector(".js-hero-image");
var subscribeLabel = document.querySelector(".js-set-label");
var pageTitle = document.querySelector(".js-page-title");
var pageContent = document.querySelector(".js-page-content");
var pageList = document.querySelector(".js-page-list");
var formTitle = document.querySelector(".js-form-title");
var formButton = document.querySelector(".js-form-button");
var sliderButton = document.querySelector(".js-slider-button");

if (IS_LOADING) {
	heroImage.classList.add("is-loading");
	formButton.classList.add("is-loading");
	sliderButton.classList.add("is-loading");
	subscribeLabel.classList.add("skeleton");
	formTitle.classList.add("skeleton");
	pageTitle.classList.add("skeleton");
	pageContent.innerHTML =
		'<span class="skeleton" style="width: 85%"></span><br><br><span class="skeleton"></span><span class="skeleton"></span><br><br><span class="skeleton"></span><span class="skeleton"></span><span class="skeleton"></span><span class="skeleton"></span><br><br><span class="skeleton"></span><span class="skeleton"></span><span class="skeleton"></span><br><br><span class="skeleton"></span><br><br>';
	pageList.innerHTML =
		'<span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span><span class="skeleton" style="width: 35%"></span>';
} else {
	console.log("IA INTEGRATION");
}
