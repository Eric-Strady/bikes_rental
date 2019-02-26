class Booking {
	constructor(bookingObj) {
		this.booking = bookingObj;
		this.stationNumber = bookingObj.stationNumber;
		this.lastName = bookingObj.lastName;
		this.firstName = bookingObj.firstName;
	}

	saveBooking() {
		this.saveToLocalStorage();
		this.saveToSessionStorage();
	}

	saveToLocalStorage() {
		localStorage.setItem("lastName", this.lastName);
		localStorage.setItem("firstName", this.firstName);
	}

	saveToSessionStorage() {
		let bookingString = JSON.stringify(this.booking);
		sessionStorage.setItem("booking", bookingString);
		sessionStorage.setItem("stationNumber", this.stationNumber);
	}

	displayBookingSummary(bookingSummaryId) {
		let bookingSummary = `Réservation d'un vélo situé "${this.booking.stationAddress}" au nom de ${this.firstName} ${this.lastName}.`;
		$(bookingSummaryId).append(bookingSummary);
	}
}