class Booking {
	constructor(bookingObj, bookingSummaryId) {
		this.booking = bookingObj;
		this.bookingSummaryId = bookingSummaryId;
		this.lastName = bookingObj.lastName;
		this.firstName = bookingObj.firstName;
		this.saveToLocalStorage();
		this.saveToSessionStorage();
		this.displayBookingSummary();
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
		let bookingSummary = `Réservation d'un vélo situé "${this.booking.stationAddress}" au nom de ${this.firstName} ${this.lastName}.`;
		$(this.bookingSummaryId).text(bookingSummary);
	}
}