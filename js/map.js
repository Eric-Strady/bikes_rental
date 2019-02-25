class Map {
	constructor(id, lat, lng) {
		this.id = id;
		this.latitude = lat;
		this.longitude = lng;
		this.map;
		this.stations;
	}

	init() {
		this.map = L.map(this.id).setView([this.latitude, this.longitude], 13);
		this.getLayer();
		return this.map;
	}

	getLayer() {
		L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
		    maxZoom: 18,
		}).addTo(this.map);
	}

	generateMarkers(stations) {
		stations.forEach(station => {
			let stationLat = station.position.lat,
				stationLng = station.position.lng,
				stationAdr = station.address,
				stationBikeStands = station.available_bike_stands,
				stationAvailableBikes = station.available_bikes;

			let marker = L.marker([stationLat, stationLng])
				.addTo(this.map)
				.on('click', addData);

			function addData() {
				$('#help').hide();
				$('#rental_form').fadeIn(1000);
				$('#address span').text(stationAdr);
				$('#bikeStands span').text(stationBikeStands);
				$('#availableBikes span').text(stationAvailableBikes);
			}
		});
	}
}