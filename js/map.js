$(function() {

	class Map {
		constructor(id, lat, lng) {
			this.id = id;
			this.latitude = lat;
			this.longitude = lng;
			this.map = '';
		}

		generateMap() {
			this.map = L.map(this.id).setView([this.latitude, this.longitude], 13);
			this.getLayer();
			this.getStaticData();
			return this.map;
		}

		getLayer() {
			L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
			    maxZoom: 18,
			}).addTo(this.map);
		}

		getStaticData() {
			ajaxGet('http://127.0.0.1/js_project/json/Nantes.json', function(response) {
				let staticData = JSON.parse(response);
				let dataLat;
				let dataLng;
				staticData.forEach(data => {
					dataLat = data.latitude;
					dataLng = data.longitude;
					map.generateMarkers(dataLat, dataLng);
				});
			});
		}

		generateMarkers(dataLat, dataLng) {
			let marker = L.marker([dataLat, dataLng]).addTo(this.map);
		}
	}

	const map = new Map('mapid', 47.217894, -1.552875);
	map.generateMap();
});