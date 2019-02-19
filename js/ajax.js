function ajaxGet(url, callback) {
	let req = new XMLHttpRequest();
	req.open('GET', url);

	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			callback(req.responseText);
		}
		else {
			console.log(`${req.status} ${req.statusText} sur l'adresse suivante: ${url}`);
		}
	});

	req.addEventListener('error', function() {
		console.log(`Erreur réseau avec l\'adresse suivante: ${url}`);
	});

	req.send(null);
}