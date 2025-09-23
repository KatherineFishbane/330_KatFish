import {getRandomColor,getRandomInt,drawRectangle,drawArc,drawLine} from 'utils.js'
		"use strict";


		window.onload = init;
		let ctx;
		let paused = false;
		let canvas;
		let createRect = true;
		let updating = false;
		let createRectCheck = true;
		let createArcCheck = true;
		let createLineCheck = true;

		const init = () => {
			console.log("page loaded!");
	
			canvas = document.querySelector("canvas");
			ctx = canvas.getContext("2d");
			ctx.fillStyle = "red";
				drawLine(ctx,0,100,640,100,20);
			setupUi();
			//update();
		}


		//UTILITY FUNCTIONS
		// handy helper functions!

		

		const drawRandomRect = (ctx) =>{
			drawRectangle(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(1, 120), getRandomInt(1, 120), getRandomColor(), getRandomInt(0, 5), getRandomColor());
		}

		const drawRandomArc = (ctx) => {
			drawArc(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(1,60),getRandomColor(),getRandomInt(0,5),getRandomColor());
		}
		const drawRandomLine =(ctx) =>{
			drawLine(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,640),getRandomInt(0,480),getRandomInt(1,5),getRandomColor());
		}
		const clearCanvas =() =>{
			console.log("clear");
			drawRectangle(ctx,0,0,640,480,"white",0,"white");
		}

		
		


		const update = () => {
			if (!paused) {
				requestAnimationFrame(update);
				if(createRectCheck){
					drawRandomRect(ctx);
					
				}
				if(createArcCheck){
					drawRandomArc(ctx);
				}
				if(createLineCheck){
					drawRandomLine(ctx);
				}
				
				
			}
			else {
				return;
			}


		}

		const canvasClicked = (e) =>{
			let rect = e.target.getBoundingClientRect();
			let mouseX = e.clientX - rect.x;
			let mouseY = e.clientY - rect.y;
			console.log(mouseX, mouseY);
			for(let i = 0; i<20; i++){
				let x = getRandomInt(-50,50)+mouseX;
				let y = getRandomInt(-50,50)+mouseY;
				let radius = getRandomInt(5,20);
				let color = getRandomColor();
				drawArc(ctx,x,y,radius,color);
				
			}
		}

		const setupUi = () => {
			//arrowify
			document.querySelector("#btnPlay").onclick = function () {
				console.log("Play");
				paused = false;
				if (!updating) {
					update();
				}
				updating = true;

			};
			document.querySelector("#btnPause").onclick = function () {
				paused = true;
				updating = false;
			};
			document.querySelector("#btnClear").onclick = function(){
				clearCanvas();
			};

			canvas.onclick = canvasClicked;

			document.querySelector("#cbRectangles").onclick = function(e){
				createRectCheck = e.target.checked;
			};
			document.querySelector("#cbArcs").onclick = function(e){
				createArcCheck = e.target.checked;
			};
			document.querySelector("#cbLines").onclick = function(e){
				createLineCheck = e.target.checked;
			};

		}


