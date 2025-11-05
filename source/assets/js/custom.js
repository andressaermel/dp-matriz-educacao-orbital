var { MaskInput } = Maska;
new MaskInput(".js-mask");

var yearElement = document.querySelector(".js-year");
if (yearElement) {
	yearElement.textContent = new Date().getFullYear();
}

var carouselElement = document.querySelector(".js-carousel");
if (carouselElement) {
	new bootstrap.Carousel(carouselElement, {
		interval: 6000,
		pause: "hover",
	});
}

// Remove datas passadas do select de data do bolsão
// As provas são aos sábados, então removemos após 14h da sexta-feira anterior
var dataBolsaoSelect = document.getElementById("data-bolsao");
if (dataBolsaoSelect) {
	var now = new Date();
	var options = dataBolsaoSelect.querySelectorAll("option");
	options.forEach(function (option) {
		if (option.value) {
			var parts = option.value.split("-");
			var provaDate = new Date(parts[2], parts[1] - 1, parts[0]);
			// Calcula a sexta-feira anterior (1 dia antes) às 14h
			var limiteInscricao = new Date(provaDate);
			limiteInscricao.setDate(limiteInscricao.getDate() - 1);
			limiteInscricao.setHours(14, 0, 0, 0);
			// Remove se já passou do limite
			if (now >= limiteInscricao) {
				option.remove();
			}
		}
	});
}

function serializeForm(form) {
	var data = {};
	var elements = form.querySelectorAll("input, select, textarea");
	elements.forEach(function (el) {
		var key = el.name || el.id;
		if (!key) return;
		if (el.type === "checkbox") {
			data[key] = !!el.checked;
		} else if (el.type === "radio") {
			if (el.checked) data[key] = el.value;
		} else {
			data[key] = el.value;
		}
	});
	return data;
}

var formElement = document.getElementById("form");
if (formElement) {
	formElement.addEventListener("submit", function (event) {
		event.preventDefault();
		var submitButton = document.getElementById("btn-inscricao");
		var isValid = typeof formElement.checkValidity === "function" ? formElement.checkValidity() : true;
		var title, message;

		if (!isValid) {
			formElement.classList.add("was-validated");
			return;
		}

		if (submitButton) {
			submitButton.classList.add("is-loading");
			submitButton.disabled = true;
		}

		var payload = serializeForm(formElement);

		fetch("send.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		})
			.then(function () {
				type = "text-bg-info";
				title = "Pronto!";
				message = "Sua inscrição foi enviada com sucesso. <br>Em breve entraremos em contato com você.";
			})
			.catch(function () {
				type = "text-bg-danger";
				title = "Ooops...";
				message = "Ocorreu um erro ao enviar sua inscrição, tente novamente.";
			})
			.finally(function () {
				submitButton.classList.remove("is-loading");
				submitButton.disabled = false;
				formElement.reset();
				formElement.classList.remove("was-validated");
				var toastEl = document.getElementById("form-toast");
				var toast = bootstrap.Toast.getOrCreateInstance(toastEl, { autohide: true, delay: 5000 });
				toastEl.classList.add(type);
				toastEl.querySelector(".toast-header strong").textContent = title;
				toastEl.querySelector(".toast-body").innerHTML = message;
				toast.show();
			});
	});
}
