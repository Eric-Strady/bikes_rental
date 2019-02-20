$(function() {

	class Slider {
		constructor(slidesBlockId, slides, slideId, markersBlockId, backward, forward) {
			this.slidesBlockId = slidesBlockId;
			this.slides = slides;
			this.length = slides.length;
			this.slideId = slideId;
			this.markersBlockId = markersBlockId;
			this.backward = backward;
			this.forward = forward;
			this.index = 0;
			this.currentSlide = 0;
			this.auto = '';
		}

		init() {
			let firstSlide = this.slides.eq(this.currentSlide);
			this.slides.hide();
			firstSlide.css('display', 'flex');

			for (let i = 0; i < this.length; i++) {
				$(this.markersBlockId).append('<a href="#" class="ml-2 mr-2" id="'+ i +'"></a>');
			}
			this.markers = $(this.markersBlockId + ' a');

			this.markerSelected();
			this.stopAndStart();
			this.backwardEvent();
			this.forwardEvent();
			this.markerEvent();
			this.keyboardEvent();
		}

		indexUp() {
			this.index++;
			if (this.index > this.length -1) {
				this.index = 0;
				this.currentSlide = this.length -1;
			}
		}

		indexDown() {
			this.index--;
			if (this.index < 0) {
				this.index = this.length -1;
				this.currentSlide = 0;
			}
		}

		slidingLeft() {
			if (this.index !== this.length -1) {
				this.currentSlide = this.index+1;
			}
			
			this.showSlide();
		}

		slidingRight() {
			if (this.index !== 0) {
				this.currentSlide = this.index-1;
			}

			this.showSlide();
		}

		showSlide() {
			$(this.slideId + this.currentSlide).fadeOut(300);
			this.markerSelected();
			$(this.slideId + this.index).slideUp(500).delay(500).fadeIn(500);
		}

		autoSlide() {
			this.auto = setInterval(function(){
				slider.indexUp();
				slider.slidingRight();
			}, 5000);
		}

		stopSlide() {
			clearInterval(this.auto);
			this.markers.css({
				'background-color': '#BEBEBE',
				'border': '3px solid #BEBEBE'
			});
		}

		stopAndStart() {

			if (this.auto === '') {
				this.autoSlide();
			}

			this.slidesBlockId.hover(
				function(){
					slider.stopSlide();
				},
				function(){
					slider.markerSelected();
					slider.autoSlide();
			});
		}

		markerSelected() {
			let markers = this.markers;
			let markerSelected = markers[this.index];

			$(markers).css({
				'background-color': 'white',
				'border': '3px solid #9600B2'
			});

			$(markerSelected).css({
				'background-color': '#D600FF',
				'border': '3px solid #D600FF'
			});
		}

		markerEvent() {
			this.markers.click(function(e) {
				e.preventDefault();
				slider.stopSlide();
				slider.currentSlide = slider.index;
				slider.index = $(this).attr('id');
				slider.showSlide();
				slider.currentSlide = slider.index -1;
				slider.startSlide();
			});
		}

		backwardEvent() {
			this.backward.click(function(e) {
				e.preventDefault();
				slider.indexDown();
				slider.slidingLeft();
			});
		}

		forwardEvent() {
			this.forward.click(function(e) {
				e.preventDefault();
				slider.indexUp();
				slider.slidingRight();
			});
		}

		keyboardEvent() {
			$('body').keydown(function(e) {
				if (e.which === 37) {
					slider.indexDown();
					slider.slidingLeft();
				}
				else if (e.which === 39) {
					slider.indexUp();
					slider.slidingRight();
				}
			});
		}
	}


	let slidesBlockId = $('#slides');
	let slides = $('#slides > div');
	let slideId = '#slide';
	let markersBlockId = '#slider-marker';
	let backward = $('#backward');
	let forward = $('#forward');

	const slider = new Slider(slidesBlockId, slides, slideId, markersBlockId, backward, forward);
	slider.init();
});