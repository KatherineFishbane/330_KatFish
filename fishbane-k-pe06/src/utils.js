
//returns a random color in rgba
const getRandomColor = () => {
	function getByte() {
		return 55 + Math.round(Math.random() * 200);
	}
	return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
}


const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//draws a rectangle on the canvas according to the parameters
const drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
	ctx.save();
	ctx.fillStyle = fillStyle;
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fill();
	if (lineWidth > 0) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
	ctx.closePath();
	ctx.restore();
}

//draws an circle on the canvas according to the parameters
const drawArc = (ctx, x, y, radius, fillStyle = "black", lineWidth = 0, strokeStyle = "black", beginAngle = 0, endAngle = 2 * Math.PI) => {
	ctx.save();
	ctx.fillStyle = fillStyle;
	ctx.beginPath();
	ctx.arc(x, y, radius, beginAngle, endAngle);
	ctx.fill();
	if (lineWidth > 0) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
	ctx.closePath();
	ctx.restore();
}

//draws a line on the canvas according to the parameters
const drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black") => {
	ctx.save();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeStyle;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

//exporting functions to be used script.js
export { getRandomColor, getRandomInt, drawRectangle, drawArc, drawLine };