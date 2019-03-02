$(function() {
	class Main {
		constructor() {
			this.initSlider();
			this.initMap();
			this.initCanvas();
			this.initBooking();
		}

		initSlider() {
			let	slides = $('#slides > div'),
				slideId = '#slide',
				markersBlockId = '#sliderMarker';

			const slider = new Slider(slides, slideId, markersBlockId);
			slider.startSliding();

			$('#slides').hover(
				function() {
					slider.stopSliding();
				},
				function() {
					slider.markerSelected();
					slider.startSliding();
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

			$('#sliderMarker a').click(function(e) {
				e.preventDefault();
				let markerId = $(this).attr('id');
				slider.markerEvent(markerId);
				slider.startSliding();
			});
		}

		initMap() {
			$('#successMessage, #formAlert, #rentalForm').hide();
			let urlApi = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=3e1f17ee3d8f0b4e911b05f690af84c74891c3fc';
			let domId = {
				blockId: '#station',
				alertId: '#formAlert',
				helpId: '#help',
				signatureId: '#signature',
				formId: '#rentalForm',
				submitId: '#submitButton',
				submitButtonId: '#submitButton input',
				statusId: '#status',
				addressId: '#address span',
				bikeStandsId: '#bikeStands span',
				availableBikesId: '#availableBikes span',
				lastNameId: '#lastName',
				firstNameId: '#firstName',
				stationNumberId: '#stationNumber'
			};

			const map = new Map('mapid', 47.217894, -1.552875, urlApi, domId);
		}

		initCanvas() {
			let width = $('#signatureCanvas').attr('width'),
				height = $('#signatureCanvas').attr('height'),
				color = '#64D017',
				lineThickness = 3,
				topLeftMessage = 'Votre signature:';

			const canvas = new Canvas(width, height, color, lineThickness, topLeftMessage);

			$('#submitButton input').click(function(e) {
				if ($('#lastName').val() !== '' && $('#firstName').val() !== '') {
					e.preventDefault();

					$('#submitButton').hide();
					$('#signature').fadeIn(800);
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
          			$('.signatureButtons').removeAttr('disabled');
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
				$('.signatureButtons').attr('disabled', 'true');
			});

			$('#signatureCanvas').on({'touchstart': function(e) {
				let touchPosition = canvas.getTouchPosition(e);
				canvas.setStartPosition(touchPosition.x, touchPosition.y);
			}});

			$('#signatureCanvas').on({'touchmove': function(e) {
      			$('.signatureButtons').removeAttr('disabled');
				let touchPosition = canvas.getTouchPosition(e);

				canvas.draw(touchPosition.x, touchPosition.y);
			}});
		}

		initBooking() {
			$('#bookingStatus').hide();

			$('#validationButton').click(function(e) {
				e.preventDefault();
				let bookingData = {
					stationNumber: $('#stationNumber').val(),
					stationAddress: $('#address span').text(),
					lastName: $('#lastName').val(),
					firstName: $('#firstName').val()
				}
				
				let domId = {
					alertId: '#formAlert',
					helpId: '#help',
					formId: '#rentalForm',
					bookingSummaryId: '#bookingSummary',
					bookingStatusId: '#bookingStatus',
					successMessageId: '#successMessage',
					blockFormId: '#station',
					timerId: '#timer span'
				};

				const booking = new Booking(bookingData, domId);
				const timer = new Timer(20, 0, domId);
			});
		}
	}
	
	const main = new Main();


	// SMOOTH SCROLL

	$('.anchor').click(function(e) {
        if (this.hash !== "")
        {
            var hash = this.hash;
            $('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){
            window.location.hash = hash;
            });
            e.preventDefault();
        }
    });
});