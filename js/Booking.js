class Booking {
	constructor(domId) {
		this.eltToShow = {
			help: domId.helpId,
			bookingStatus: domId.bookingStatusId,
			successMessage: domId.successMessageId,
		};
		this.eltToHide = domId.formId;
		this.eltAlert = domId.alertId;
		this.eltToComplete = domId.bookingSummaryId;
		this.eltToCustom = domId.blockFormId;
		this.booking = {};
		this.lastName;
		this.firstName;
	}

	setBookingData(bookingObj) {
		this.booking = bookingObj;
		this.lastName = bookingObj.lastName;
		this.firstName = bookingObj.firstName;
	}

	checkInput() {
		let lastNameLength = this.lastName.length;
		let firstNameLength = this.firstName.length;

		if (lastNameLength > 50 || firstNameLength > 50) {
			let message = 'Votre nom ou votre prénom dépasse les 50 caractères autorisés !';
			$(this.eltAlert).show().text(message).delay(5000).fadeOut(1000);
		} else if (this.lastName === '' || this.firstName === '') {
			let message = 'Votre nom et votre prénom ne doivent pas être vides !';
			$(this.eltAlert).show().text(message).delay(5000).fadeOut(1000);
		} else {
			this.saveToLocalStorage();
			this.saveToSessionStorage();
			this.displayBookingSummary();
		}
	}

	checkSessionStorage() {
		let bookingStorage = sessionStorage.getItem("booking");

		if (bookingStorage !== null) {
			let bookingObject = JSON.parse(bookingStorage);
			this.booking.stationAddress = bookingObject.stationAddress;
			this.firstName = bookingObject.firstName;
			this.lastName = bookingObject.lastName;
			this.displayBookingSummary();
		}
		return bookingStorage;
	}

	saveToLocalStorage() {
		localStorage.setItem("lastName", this.lastName);
		localStorage.setItem("firstName", this.firstName);
	}

	saveToSessionStorage() {
		let bookingString = JSON.stringify(this.booking);
		sessionStorage.setItem("booking", bookingString);
	}

	displayBookingSummary() {
		$(this.eltToHide).hide();
		$(this.eltToCustom).css('border', '6px double gray');
		$(`${this.eltToShow.help}, ${this.eltToShow.bookingStatus}`).show();
		$(this.eltToShow.successMessage).show().delay(5000).fadeOut(1000);

		let bookingSummary = `Réservation d'un vélo situé "${this.booking.stationAddress}" au nom de ${this.firstName} ${this.lastName}.`;
		$(this.eltToComplete).text(bookingSummary);
	}
}