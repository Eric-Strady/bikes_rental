class Map {
	constructor(id, lat, lng, urlApi, domId) {
		this.id = id;
		this.latitude = lat;
		this.longitude = lng;
		this.urlApi = urlApi;
		this.map;
		this.stations;
		this.domId = domId;
		this.init();
		this.getApiData();
	}

	init() {
		this.map = L.map(this.id).setView([this.latitude, this.longitude], 13);
		this.getLayer();
		return this.map;
	}

	getApiData() {
		let self = this;
		ajaxGet(self.urlApi, function(response) {
			self.stations = JSON.parse(response);
			console.log(self.stations);
			self.generateMarkers();
		});
	}

	getLayer() {
		L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
		    maxZoom: 18,
		}).addTo(this.map);
	}

	generateMarkers() {
		let self = this;
		self.stations.forEach(station => {
			let stationLat = station.position.lat,
				stationLng = station.position.lng;

			let marker = L.marker([stationLat, stationLng])
				.addTo(self.map)
				.on('click', generateForm);

			function generateForm() {
				new Form(station, self.domId);
			}
		});
	}
}