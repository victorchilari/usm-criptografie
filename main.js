const db = {
	'ccp': ['Cifru cu transpozitie Mysakovski'],
	'ccsm': ['Cifru nihilist'],
	'ccsp': ['Cifru Playfair'],
	'cmcpss': ['Nicodemus']
};

function radioHandler() {
	const form = document.querySelector('#radio');
	const data = new FormData(form);
	let value = '';
	for (const entry of data) {
		value = entry[1];
	}
	console.log(value);
	const select = document.querySelector('#cifru_cu_substitutie');
	if (value === 'ccs') {
		select.style.display = 'block';
		value = 'ccsm';
	} else {
		select.style.display = 'none';
	}
	updateChipherTitle(value);
}

function selectHandler() {
	const form = document.querySelector('#select');
	const data = new FormData(form);
	let value = '';
	for (const entry of data) {
		value = entry[1];
	}

	console.log(value);
	updateChipherTitle(value);
}

function updateChipherTitle(value) {
	const title = document.querySelector('#ChipherTitle');
	const text = db[value];
	title.innerText = text;
}
