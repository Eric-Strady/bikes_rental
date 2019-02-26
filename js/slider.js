class Slider {
	constructor(slides, slideId, markersBlockId) {
		this.slides = slides;
		this.length = slides.length;
		this.slideId = slideId;
		this.markersBlockId = markersBlockId;
		this.index = 0;
		this.currentSlide = 0;
		this.auto = '';
		this.init();
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
	}

	slidingRight() {
		if (this.index !== 0) {
			this.currentSlide = this.index-1;
		}
	}

	showSlide() {
		$(this.slideId + this.currentSlide).fadeOut(300);
		this.markerSelected();
		$(this.slideId + this.index).slideUp(500).delay(500).fadeIn(500);
	}

	autoSlide() {
		this.indexUp();
		this.slidingRight();
		this.showSlide();
	}

	rewindSlide() {
		this.indexDown();
		this.slidingLeft();
		this.showSlide();
	}

	startSliding() {
		let self = this;
		self.auto = setInterval(function() {
			self.autoSlide();
		}, 5000);
	}

	stopSliding() {
		clearInterval(this.auto);
		this.markers.css({
			'background-color': '#BEBEBE',
			'border': '3px solid #BEBEBE'
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

	markerEvent(markerId) {
		this.stopSliding();
		this.currentSlide = this.index;
		this.index = markerId;
		this.showSlide();
		this.currentSlide = this.index -1;
	}
}

