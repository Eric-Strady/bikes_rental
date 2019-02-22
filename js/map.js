$(function() {

	class Map {
		constructor(id, lat, lng) {
			this.id = id;
			this.latitude = lat;
			this.longitude = lng;
			this.map = '';
			this.dataFromJCDecaux = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=3e1f17ee3d8f0b4e911b05f690af84c74891c3fc';
		}

		generateMap() {
			this.map = L.map(this.id).setView([this.latitude, this.longitude], 13);
			this.getLayer();
			this.getApiData();
			return this.map;
		}

		getLayer() {
			L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
			    maxZoom: 18,
			}).addTo(this.map);
		}

		getApiData() {
			ajaxGet(this.dataFromJCDecaux, function(response) {
				let stations = JSON.parse(response);
				console.log(stations);
				map.generateMarkers(stations);
			});
		}

		generateMarkers(stations) {
			stations.forEach(station => {
				let stationLat = station.position.lat;
				let stationLng = station.position.lng;
				let stationAdr = station.address;
				let stationBikeStands = station.available_bike_stands;
				let stationAvailableBikes = station.available_bikes;

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

	$('#rental_form').hide();

	const map = new Map('mapid', 47.217894, -1.552875);
	map.generateMap();
});