class Booking {
	constructor(bookingObj, messageBlockId) {
		this.booking = bookingObj;
		this.stationNumber = bookingObj.stationNumber;
		this.lastName = bookingObj.lastName;
		this.firstName = bookingObj.firstName;
		this.messageBlockId = messageBlockId;
		this.successMessage = '<div class="alert alert-success text-center mt-5" role="alert">Votre réservation a bien été prise en compte. Si vous le souhaitez, vous pouvez effectuer une nouvelle réservation.</div>'
	}

	saveBooking() {
		this.saveToLocalStorage();
		this.saveToSessionStorage();
		this.displaySuccessMessage();
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

	displaySuccessMessage() {
		$(this.messageBlockId).append(this.successMessage);
	}
}