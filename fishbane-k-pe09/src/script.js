'use strict';


		let ctx = document.querySelector('canvas').getContext('2d');
		let rotation = 0;
		let scale = 1;
		let grow = true;

		//bad
    const drawSquare1 = (ctx, x, y, width, height, fillStyle) =>{
			ctx.save();
			ctx.fillStyle = fillStyle;
			ctx.fillRect(x, y, width, height);
			ctx.restore();
		}
		//better
		const drawSquare2= (ctx, x, y, width, height, rotation, fillStyle, scale) =>{
			ctx.save();
			ctx.fillStyle = fillStyle;
			ctx.translate(x, y);
			ctx.rotate(rotation);
			ctx.scale(scale, scale);
			ctx.fillRect(0 - width / 2, 0 - height / 2, width, height);
			ctx.restore();
		}
		const drawTriangle=(ctx, x, y, width, height, rotation, fillStyle, scale) =>{
			ctx.save();
			ctx.fillStyle = fillStyle;
			ctx.translate(x, y);
			ctx.rotate(rotation);
			ctx.scale(scale, scale);
			ctx.beginPath();
			ctx.moveTo(0, -height / 2);
			ctx.lineTo(width / 2, height / 2);
			ctx.lineTo(-width / 2, height / 2);
			ctx.closePath();
			ctx.fill();
			ctx.restore();



		}

		//background
		const loop = () =>{
			requestAnimationFrame(loop);
			rotation += 0.05;
			ctx.fillStyle = 'yellow';
			ctx.fillRect(0, 0, 640, 480);

			if (grow) {
				scale += 0.1;
				if (scale >= 10) {
					grow = false;
				}
			} else {
				scale -= 0.1;
				if (scale <= 1) {
					grow = true;
				}
			}

			//do some transformations?
			//ctx.translate(100,0);
			//ctx.rotate(Math.PI/4);
			//ctx.scale(1.2,1.2);

			ctx.save();
			//set a bunch of state attributes
			ctx.shadowOffsetX = 15;
			ctx.shadowOffsetY = 15;
			ctx.shadowColor = "rgba(153,50,204,.6)";
			ctx.shadowBlur = 5;


			// draw square with fillRect() convenience method
			ctx.fillStyle = "green";
			ctx.rotate(rotation);
			ctx.fillRect(100, 100, 100, 100);
			ctx.restore();

			
			ctx.save();
			//draw a "better" triangle - why is this better? You'll see!
			ctx.strokeStyle = "red";
			ctx.fillStyle = "red";
			ctx.lineWidth = "5";
			ctx.translate(200, 200);
			ctx.rotate(rotation);


			ctx.beginPath();
			ctx.moveTo(0, -50);
			ctx.lineTo(50, 50);
			ctx.lineTo(-50, 50);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();

			drawSquare2(ctx, 100, 100, 9, 19, rotation, "orange", 1);
			drawSquare2(ctx, 300, 100, 49, 19, rotation, "blue", 1);
			drawTriangle(ctx, 600, 100, 49, 49, rotation, "orange", scale);

		}
		loop();


		