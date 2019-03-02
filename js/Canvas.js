class Canvas {
	constructor(width, height, color, lineThickness, topLeftMessage) {
		this.width = width;
		this.height = height;
		this.color = color;
		this.lineThickness = lineThickness;
		this.topLeftMessage = topLeftMessage;
		this.mouseDown = false;
		this.oldX;
		this.oldY;
		this.ctx;
	}

	init() {
		this.ctx.fillText(this.topLeftMessage, 10, 20);
	}

	getMousePosition(e) {
	    return {
	        x: e.offsetX,
	        y: e.offsetY
	    };
	}

	getTouchPosition(e) {
		let touch = e.touches[0];
		let x = touch.clientX;
		let y = touch.clientY;
		return {
			x, y
		};
	}

	setStartPosition(newX, newY) {
		this.oldX = newX;
		this.oldY = newY;
		this.mouseDown = true;
	}

	draw(newX, newY) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = this.lineThickness;
		this.ctx.lineJoin = "round";
		this.ctx.moveTo(this.oldX, this.oldY);
		this.ctx.lineTo(newX, newY);
		this.ctx.closePath();
		this.ctx.stroke();

		this.oldX = newX;
		this.oldY = newY;
	}

	reset() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.init();
	}
}