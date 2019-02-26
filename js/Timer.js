class Timer {
	constructor(minutes, seconds, blockId, timerId) {
		this.minutes = minutes;
		this.seconds = seconds;
		this.fullSeconds = 59;
		this.blockId = blockId;
		this.timerId = timerId;
		this.firstCall = false;
		this.auto;
		this.init();
	}

	init() {
		this.getTimer();
		this.stopTimer();
		this.firstCall = true;
		this.startTimer();
	}

	minusOneMinute() {
		this.minutes--;
		if (this.minutes === 0) {
			this.stopTimer();
		}
	}

	minusOneSecond() {
		this.seconds--;
		if (this.seconds < 0) {
			this.seconds = this.fullSeconds;
			this.minusOneMinute();
		}
	}

	getTimer() {
		if (this.firstCall !== false) {
			this.minusOneSecond();
			this.transformTimerInString();
		}
		this.transformTimerInString();
	}

	startTimer() {
		let self = this;
		self.auto = setInterval(function() {
			self.getTimer();
		}, 1000);
	}

	stopTimer() {
		if (this.firstCall !== false) {
			clearInterval(this.auto);
			$(this.blockId).hide();
		}
		clearInterval(this.auto);
	}

	transformTimerInString() {
		let minutes = this.minutes.toString();
		let seconds = this.seconds.toString();
		let string = minutes.padStart(2, '0') + ' min ' + seconds.padStart(2, '0') + ' sec';
		$(this.timerId).text(string);
	}
}