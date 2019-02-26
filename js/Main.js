$(function() {
	class Main {
		constructor() {
			this.initSlider();
			this.initMap();
			this.initCanvas();
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
					slider.stopSliding();
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
				let markerId = $(this).attr('id');
				slider.markerEvent(markerId);
				startSliding();
			});

			function startSliding() {
				slider.auto = setInterval(function() {
					slider.autoSlide();
				}, 5000);
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

		initCanvas() {
			let width = $('#signatureCanvas').attr('width'),
				height = $('#signatureCanvas').attr('height'),
				color = '#64D017',
				lineThickness = 3,
				topLeftMessage = 'Votre signature:';

			$('#signatureCanvas, #signatureButtons').hide();

			const canvas = new Canvas(width, height, color, lineThickness, topLeftMessage);

			$('#submitButton input').click(function(e) {
				if ($('#lastName').val() !== '' && $('#firstName').val() !== '') {
					e.preventDefault();
					
					$('#submitButton').hide();
					$('#signatureCanvas, #signatureButtons').fadeIn(1000);
					$('#signatureButtons button').attr('disabled', 'true');
					canvas.ctx = document.getElementById('signatureCanvas').getContext("2d");

					canvas.init();
				}
			});

			$('#signatureCanvas').mousedown(function(e) {
				let mousePosition = canvas.getMousePosition(e);
				canvas.setStartPosition(mousePosition.x, mousePosition.y);
			});

			$('#signatureCanvas').mousemove(function(e) {
				if (canvas.mouseDown) {
          			$('#signatureButtons button').removeAttr('disabled');
					let mousePosition = canvas.getMousePosition(e);

					canvas.draw(mousePosition.x, mousePosition.y);
				}
			});

			$('#signatureCanvas').mouseup(function() {
				canvas.mouseDown = false;
			});

			$('#signatureCanvas').mouseleave(function() {
				canvas.mouseDown = false;
			});

			$('#resetButton').click(function(e) {
				e.preventDefault();
				canvas.reset();
				$('#signatureButtons button').attr('disabled', 'true');
			});
		}
	}
	
	const main = new Main();
});