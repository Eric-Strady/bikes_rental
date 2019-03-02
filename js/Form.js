class Form {
	constructor(station, domId) {
		this.stationStatus = station.status,
		this.stationNumber = station.number,
		this.stationAddr = station.address,
		this.stationBikeStands = station.available_bike_stands,
		this.stationAvailableBikes = station.available_bikes;
		this.lastName = '';
		this.firstName = '';
		this.eltAlert = domId.alertId;
		this.eltToDisabled = domId.submitButtonId;
		this.eltToHide = {
			help: domId.helpId,
			signature: domId.signatureId
		}
		this.eltToShow = {
			form: domId.formId,
			submitButton: domId.submitId
		}
		this.eltToComplete = {
			status: domId.statusId,
			address: domId.addressId,
			bikeStands: domId.bikeStandsId,
			availableBikes: domId.availableBikesId,
			lastName: domId.lastNameId,
			firstName: domId.firstNameId,
			stationNumber: domId.stationNumberId 
		};
		this.init();
		this.checkStatus();
		this.checkAvailableBikes();
		this.checkSessionStorage();
		this.checkLocalStorage();
		this.displayStationDetails();
	}

	init() {
		$(`${this.eltToHide.help}, ${this.eltToHide.signature}`).hide();
		$(`${this.eltToShow.form}, ${this.eltToShow.submitButton}`).fadeIn(1000);
		$(this.eltToDisabled).attr('disabled', false);
	}

	checkStatus() {
		switch (this.stationStatus) {
			case 'OPEN':
				this.stationStatus = 'Station ouverte';
				break;
			case 'CLOSED':
				this.stationStatus = 'Station fermée (travaux ou autres)';
				break;
		}
	}

	checkSessionStorage() {
		let bookingStored = sessionStorage.getItem("booking");

		if (bookingStored !== null) {
			let bookingObj = JSON.parse(bookingStored);
			let stationNumberStored = Number(bookingObj.stationNumber);
			if (stationNumberStored === this.stationNumber) {
				this.stationBikeStands++;
				this.stationAvailableBikes--;
				if (this.stationAvailableBikes <= 0) {
					this.stationAvailableBikes = 0;
				} 

				$(this.eltToDisabled).attr('disabled', true);

				let message = 'Vous avez déjà une réservation en cours sur cette station !';
				this.displayAlertMessage(message);
			}
		}
	}

	checkLocalStorage() {
		let lastNameStored = localStorage.getItem("lastName");
		let firstNameStored = localStorage.getItem("firstName");

		if (lastNameStored !== null && firstNameStored !== null) {
			this.lastName = lastNameStored;
			this.firstName = firstNameStored;
		}
	}

	checkAvailableBikes() {
		if (this.stationAvailableBikes === 0) {
			$(this.eltToDisabled).attr('disabled', true);

			let message = 'Aucune réservation n\'est possible pour le moment sur cette station car aucun vélo n\'est disponible.';
			this.displayAlertMessage(message);
		}
	}

	displayStationDetails() {
		$(this.eltToComplete.status).text(this.stationStatus);
		$(this.eltToComplete.address).text(this.stationAddr);
		$(this.eltToComplete.bikeStands).text(this.stationBikeStands);
		$(this.eltToComplete.availableBikes).text(this.stationAvailableBikes);
		$(this.eltToComplete.lastName).attr('value', this.lastName);
		$(this.eltToComplete.firstName).attr('value', this.firstName);
		$(this.eltToComplete.stationNumber).attr('value', this.stationNumber);
	}

	displayAlertMessage(message) {
		$(this.eltAlert).show().text(message).delay(5000).fadeOut(1000);
	}
}