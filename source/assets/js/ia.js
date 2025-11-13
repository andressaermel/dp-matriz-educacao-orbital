var heroImage = document.querySelector(".js-hero-image");
var subscribeLabel = document.querySelector(".js-set-label");
var pageTitle = document.querySelector(".js-page-title");
var pageContent = document.querySelector(".js-page-content");
var pageList = document.querySelector(".js-page-list");
var formTitle = document.querySelector(".js-form-title");
var sliderButton = document.querySelector(".js-slider-button");
var pageListDate = document.querySelector(".js-page-list-date");
var dayTime = document.querySelector(".js-day-time");
var textSide = document.querySelector(".js-text-side-content");

function removeLoadings() {
	heroImage.classList.remove("is-loading");
	pageTitle.classList.remove("skeleton");
	subscribeLabel.classList.remove("skeleton");
	formTitle.classList.remove("skeleton");
	sliderButton.classList.remove("is-loading");
	pageList.classList.remove("is-skeleton");
	pageContent.classList.remove("is-skeleton");
	dayTime.classList.remove("skeleton");
	if (pageList || pageContent) {
		var content = document.querySelector(".js-content");
		var skeletonSpans = content.querySelectorAll("span.skeleton");
		if (skeletonSpans && skeletonSpans.length) {
			skeletonSpans.forEach(function (el) {
				el.remove();
			});
		}
	}
}

(function (n, v, g) {
	var o = "Navegg";
	if (!n[o]) {
		var a = v.createElement("script");
		a.src = g;
		var b = v.getElementsByTagName("script")[0];
		b.parentNode.insertBefore(a, b);
		n[o] = function (parms) {
			n[o].q = n[o].q || [];
			n[o].q.push([this, parms]);
		};
	}
})(window, document, "https://tag.navdmp.com/universal.min.js");

window.naveggReady = window.naveggReady || [];
window.nvgInst = new Navegg({
	acc: 85089, // ID da Navegg
});
var urlnaveggia = "https://lp-matriz-edu.orbital.company/api/analyze";

//Espera conteúdo aparecer
function getContent() {
	window.dataLayer = window.dataLayer || [];

	// Procura o primeiro objeto que tenha event: 'contentReady'
	const contentReadyEvent = window.dataLayer.find((item) => item.event === "dynamicContentReady");

	if (!contentReadyEvent) {
		console.log("Thinking...");
		setTimeout(function () {
			getContent();
		}, 1000);
	} else {
		console.log("Done!");
		removeLoadings();
		writeData(contentReadyEvent, nextDateShort);
	}
}

function writeData(dados, dataFormatada) {
	var formButton = document.querySelector(".hsfc-NavigationRow__Buttons .hsfc-Button");

	image_url = dados["image_url"];
	date_title = "<span>Próxima Prova " + dataFormatada + '</span><strong class="d-block">Descontos Especiais</strong>';
	action_word = dados["action_word"];
	form_phrase = dados["form_phrase"];
	main_differential = dados["main_differential"];
	button_color = dados["button_color"];
	form_side = dados["form_side"];

	button_color == ("Verde" || "verde") ? (button_color = "#35ad3f") : (button_color = "#ff5722");

	if (form_side == "2") {
		textSide.classList.remove("order-lg-1");
		textSide.classList.add("order-lg-3");
	}

	image_url
		? (heroImage.innerHTML = "<img src='" + image_url + "'>")
		: (heroImage.src = "<img src='images/aluno-1.png'>");
	date_title ? (pageTitle.innerHTML = date_title) : (date_title.innerHTML = date_title);
	action_word ? (subscribeLabel.innerHTML = action_word) : (subscribeLabel.html = "INSCREVA-SE");
	form_phrase
		? (formTitle.innerHTML = form_phrase)
		: (formTitle.html = "Juntos transformamos <br>seu futuro em vitória.");
	main_differential
		? (pageContent.innerHTML = main_differential)
		: (pageContent.innerHTML =
				"<p>Conquiste seu futuro com quem acredita em você!</strong></p><p>Com mais de <strong>3.000 aprovações</strong> em concursos militares e vestibulares, temos orgulho de promover transformação e mobilidade social através da <strong>alta performance pedagógica.</strong></p><p>No Matriz Educação, cada estudante é visto como único. Mais do que aprender, queremos transformar. Nossa missão vai além da sala de aula: formamos cidadãos com pensamento crítico, preparados para os desafios do futuro e comprometidos com valores que constroem uma sociedade melhor.</p><p>O Bolsão Matriz 2026 é a sua oportunidade de conquistar uma bolsa de estudos e vivenciar um ensino deexcelência que une rigor acadêmico, tecnologia, acolhimento e valores que constroem seres humanos.</p><p>Venha fazer parte do Matriz Educação.</p>");

	if (button_color) {
		formButton.style.backgroundColor = button_color;
		formButton.style.borderColor = button_color;
		sliderButton.style.backgroundColor = button_color;
		sliderButton.style.borderColor = button_color;
	}
}

// --- lê JSON externo de datas + horários, calcula próxima e preenche a UI ---
(async function () {
	const JSON_URL = "https://lp-matriz-edu.orbital.company/lp-matriz-timesheet.json?v=" + Date.now(); // cache-buster

	// Função p/ converter "DD/MM/YYYY" em Date (00:00 local)
	function parseDate(str) {
		const [day, month, year] = str.split("/");
		return new Date(`${year}-${month}-${day}T00:00:00`);
	}

	// Data atual (zerando horas)
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	try {
		const res = await fetch(JSON_URL, { cache: "no-store" });
		const eventDates = await res.json();

		// Converte todas as datas e filtra as que ainda não passaram
		const candidates = (eventDates.eventDates || [])
			.map((item) => ({
				dateObj: parseDate(item.date),
				dateStr: item.date, // "DD/MM/YYYY"
				time: item.time || "09:00", // fallback
			}))
			.filter((row) => row.dateObj >= today) // hoje ou futuro
			.sort((a, b) => a.dateObj - b.dateObj); // ordena crescente

		// Escolhe a primeira (mais próxima)
		const now = new Date();
		let nextRow = candidates[0] || null;

		// Se for hoje e já passou de 12h, pega a próxima
		if (nextRow && nextRow.dateObj.toDateString() === now.toDateString() && now.getHours() >= 12) {
			nextRow = candidates[1] || null;
		}

		// Se não houver próxima, trate como antes
		const nextDate = nextRow ? nextRow.dateObj : null;

		// Array com nomes dos dias da semana em português
		const diasSemana = [
			"domingo",
			"segunda-feira",
			"terça-feira",
			"quarta-feira",
			"quinta-feira",
			"sexta-feira",
			"sábado",
		];

		// Formata a data e o dia da semana (mantém seu comportamento)
		const nextDateFormatted = nextDate
			? `${diasSemana[nextDate.getDay()]}, ${nextDate.toLocaleDateString("pt-BR")}`
			: "Nenhuma data futura disponível";

		// Mantém variáveis que você já usa depois (ex.: writeData)
		const data = nextDate ? new Date(nextDate) : null;
		const dia = data ? String(data.getDate()).padStart(2, "0") : "";
		const mes = data ? String(data.getMonth() + 1).padStart(2, "0") : "";
		const nextDateShort = data ? `${dia}/${mes}` : "";

		// Escreve no HTML
		pageListDate.innerHTML = nextDateFormatted;

		// Hora vinda do JSON → "HHh"
		if (dayTime) {
			const hour = nextRow ? nextRow.time.split(":")[0] : "09";
			dayTime.textContent = `${hour}h`;
		}

		// Disponibiliza globalmente p/ writeData
		window.nextDateShort = nextDateShort;
	} catch (e) {
		console.error("Erro ao carregar event-dates.json:", e);
		pageListDate.innerHTML = "—";
		if (dayTime) dayTime.textContent = "";
		window.nextDateShort = ""; // evita undefined
	}

	// Só chama getContent depois que nextDateShort foi definido
	getContent();
})();
