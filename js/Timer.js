class Timer {
	constructor(domId) {
		this.minutes;
		this.seconds;
		this.fullSeconds = 59;
		this.blockId = domId.bookingStatusId;
		this.timerId = domId.timerId;
		this.firstCall;
		this.auto = '';
	}

	setTimerFromSession() {
		let data = this.getSessionStorageTimer();
		this.minutes = data.minutes;
		this.seconds = data.seconds;
		this.firstCall = false;
		this.startTimer();
	}

	setTimer(minutes, seconds) {
		this.minutes = minutes;
		this.seconds = seconds;
		this.firstCall = true;
	}

	saveTimer() {
		let timer = JSON.stringify(this);
		sessionStorage.setItem("timer", timer);
	}

	getSessionStorageTimer() {
		let storageTimer = sessionStorage.getItem("timer");
		let timerObject = JSON.parse(storageTimer);

		if (timerObject !== null) {
			sessionStorage.removeItem("timer");
			this.stopTimerStorage(timerObject);
		}
		return timerObject;
	}

	minusOneMinute() {
		this.minutes--;
		if (this.minutes === -1 ) {
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
		this.saveTimer();

		if (this.firstCall === false) {
			this.minusOneSecond();
			if (this.minutes >= 0) {
				this.transformTimerInString();
			}
		} else {
			this.firstCall = false;
			this.transformTimerInString();
		}
	}

	startTimer() {
		let self = this;
		self.auto = setInterval(function() {
			self.getTimer();
		}, 1000);
	}

	stopTimer() {
		if (this.firstCall === false) {
			clearInterval(this.auto);
			$(this.timerId).text('');
			$(this.blockId).hide();
			sessionStorage.clear();
		}
	}

	stopTimerStorage(object) {
		clearInterval(object.auto);
	}

	transformTimerInString() {
		let minutes = this.minutes.toString();
		let seconds = this.seconds.toString();
		let string = minutes.padStart(2, '0') + ' min ' + seconds.padStart(2, '0') + ' sec';
		$(this.timerId).text(string);
	}
}