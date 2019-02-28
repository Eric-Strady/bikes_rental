class Form {
	constructor(station, domId) {
		this.stationStatus = station.status,
		this.stationNumber = station.number,
		this.stationAddr = station.address,
		this.stationBikeStands = station.available_bike_stands,
		this.stationAvailableBikes = station.available_bikes;
		this.lastName = '';
		this.firstName = '';
		this.eltToHide = {
			help: domId.helpId,
			signature: domId.signatureId
		}
		this.eltToShow = {
			form: domId.formId,
			submitButton: domId.submitButtonId
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
		this.checkSessionStorage();
		this.checkLocalStorage();
		this.displayStationDetails();
	}

	displayStationDetails() {
		$(`${this.eltToHide.help}, ${this.eltToHide.signature}`).hide();
		$(`${this.eltToShow.form}, ${this.eltToShow.submitButton}`).fadeIn(1000);
		$(this.eltToComplete.status).text(this.stationStatus);
		$(this.eltToComplete.address).text(this.stationAddr);
		$(this.eltToComplete.bikeStands).text(this.stationBikeStands);
		$(this.eltToComplete.availableBikes).text(this.stationAvailableBikes);
		$(this.eltToComplete.lastName).attr('value', this.lastName);
		$(this.eltToComplete.firstName).attr('value', this.firstName);
		$(this.eltToComplete.stationNumber).attr('value', this.stationNumber);
	}

	checkSessionStorage() {
		let bookingStored = sessionStorage.getItem("booking");

		if (bookingStored !== null) {
			let bookingObj = JSON.parse(bookingStored);
			let stationNumberStored = Number(bookingObj.stationNumber);
			if (stationNumberStored === this.stationNumber) {
				this.stationBikeStands++;
				this.stationAvailableBikes--;
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
}