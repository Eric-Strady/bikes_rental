class Map {
	constructor(id, lat, lng, urlApi) {
		this.id = id;
		this.latitude = lat;
		this.longitude = lng;
		this.urlApi = urlApi;
		this.map;
		this.stations;
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
		this.stations.forEach(station => {
			let stationLat = station.position.lat,
				stationLng = station.position.lng,
				stationStatus = station.status,
				stationNumber = station.number,
				stationAddr = station.address,
				stationBikeStands = station.available_bike_stands,
				stationAvailableBikes = station.available_bikes;

			let marker = L.marker([stationLat, stationLng])
				.addTo(this.map)
				.on('click', addData);

			function addData() {
				$('#help').hide();
				$('#rental_form').fadeIn(1000);
				$('#address span').text(stationAddr);
				$('#bikeStands span').text(stationBikeStands);
				$('#availableBikes span').text(stationAvailableBikes);
				$('#stationNumber').attr('value', stationNumber);
			}
		});
	}
}