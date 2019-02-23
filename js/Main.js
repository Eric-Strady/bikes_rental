$(function() {
	class Main {
		constructor() {
			this.initSlider();
			this.initMap();
		}

		initSlider() {
			let	slides = $('#slides > div'),
				slideId = '#slide',
				markersBlockId = '#slider-marker';

			const slider = new Slider(slides, slideId, markersBlockId);
			slider.init()
			startSliding();

			$('#slides').hover(
				function() {
					stopSliding();
				},
				function() {
					slider.markerSelected();
					startSliding();
				}
			);

			$('body').keydown(function(e) {
				if (e.which === 37) {
					slider.rewindSlide();
				}
				else if (e.which === 39) {
					slider.autoSlide();
				}
			});

			$('#backward').click(function(e) {
				e.preventDefault();
				slider.rewindSlide();
			});

			$('#forward').click(function(e) {
				e.preventDefault();
				slider.autoSlide();
			});

			$('#slider-marker a').click(function(e) {
				e.preventDefault();
				stopSliding();
				slider.currentSlide = slider.index;
				slider.index = $(this).attr('id');
				slider.showSlide();
				slider.currentSlide = slider.index -1;
				startSliding();
			});

			function startSliding() {
				slider.auto = setInterval(function(){
					slider.autoSlide();
				}, 5000);
			}

			function stopSliding() {
				clearInterval(slider.auto);
				$('#slider-marker a').css({
					'background-color': '#BEBEBE',
					'border': '3px solid #BEBEBE'
				});
			}
		}

		initMap() {
			$('#rental_form').hide();
			let dataFromJCDecaux = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=3e1f17ee3d8f0b4e911b05f690af84c74891c3fc';

			const map = new Map('mapid', 47.217894, -1.552875);
			map.init();
			getApiData(dataFromJCDecaux);

			function getApiData(url) {
				let stations = ajaxGet(url, function(response) {
					map.stations = JSON.parse(response);
					map.generateMarkers(map.stations);
				});
			}
		}
	}
	
	const main = new Main();
});