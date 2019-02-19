$(function() {

	let slider = {
		
		slides: $('#slides > div'),
		length: $('#slides > div').length,
		index: 0,
		currentSlide: 0,
		auto: '',

		init() {
			let firstSlide = this.slides.eq(this.currentSlide);
			this.slides.hide();
			firstSlide.css('display', 'flex');

			for (let i = 0; i < this.length; i++) {
				$('#slider-marker').append('<a href="#" class="ml-2 mr-2" id="'+ i +'"></a>');
			}

			slider.markerSelected();
			slider.stopAndStart();
			slider.backwardEvent();
			slider.forwardEvent();
			slider.markerEvent();
		},


		indexUp() {
			this.index++;
			if (this.index > this.length -1) {
				this.index = 0;
				this.currentSlide = this.length -1;
			}
		},

		indexDown() {
			this.index--;
			if (this.index < 0) {
				this.index = this.length -1;
				this.currentSlide = 0;
			}
		},

		slidingLeft() {
			if (this.index !== this.length -1) {
				this.currentSlide = this.index+1;
			}
			
			slider.showSlide();
		},

		slidingRight() {
			if (this.index === 0) {
				slider.showSlide();
			}
			else {
				this.currentSlide = this.index-1;
				slider.showSlide();
			}
		},

		showSlide() {
			$('#slide'+ this.currentSlide).fadeOut(300);
			slider.markerSelected();
			$('#slide'+ this.index).slideUp(500).delay(500).fadeIn(500);
		},

		autoSlide() {
			slider.auto = setInterval(function(){
				slider.indexUp();
				slider.slidingRight();
			}, 5000);
		},

		stopSlide() {
			clearInterval(this.auto);
			$('#slider-marker a').css({
				'background-color': '#BEBEBE',
				'border': '3px solid #BEBEBE'
			});
		},

		startSlide() {
			slider.autoSlide();
		},

		stopAndStart() {

			if (this.auto === '') {
				slider.startSlide();
			}

			$('#slides').hover(
				function(){
					slider.stopSlide();
				},
				function(){
					slider.markerSelected();
					slider.startSlide();
			});
		},

		markerSelected() {
			let markers = $('#slider-marker a');
			let markerSelected = markers[this.index];

			$(markers).css({
				'background-color': 'white',
				'border': '3px solid #9600B2'
			});

			$(markerSelected).css({
				'background-color': '#D600FF',
				'border': '3px solid #D600FF'
			});
		},

		markerEvent() {
			$('#slider-marker a').click(function(e) {
				e.preventDefault();
				slider.stopSlide();
				slider.currentSlide = slider.index;
				slider.index = $(this).attr('id');
				slider.showSlide();
				slider.currentSlide = slider.index -1;
				slider.startSlide();
			});
		},

		backwardEvent() {
			$('#backward').click(function(e) {
				e.preventDefault();
				slider.indexDown();
				slider.slidingLeft();
			});
		},

		forwardEvent() {
			$('#forward').click(function(e) {
				e.preventDefault();
				slider.indexUp();
				slider.slidingRight();
			});
		}
	};

	slider.init();
});