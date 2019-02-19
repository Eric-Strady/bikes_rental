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
		return this.map;
	}

	getLayer() {
		L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
		    maxZoom: 18,
		}).addTo(this.map);
	}
}

const map = new Map('mapid', 49.418134, 2.827051);

map.generateMap();