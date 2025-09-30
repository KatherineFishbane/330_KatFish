//importing module functions
import {getRandomColor,getRandomInt,drawRectangle,drawArc,drawLine} from './utils.js'
		"use strict";


		//global variables
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

		window.onload = init;


		//draw functions
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

		
	//update loop 
		const update = () => {
			//if not paused then draw
			if (!paused) {
				requestAnimationFrame(update);
				//if the checkboxes for the shapes are checked then draw them
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

		//spraypaint function
		const canvasClicked = (e) =>{
			//checking where the mouse is on the canvas
			let rect = e.target.getBoundingClientRect();
			let mouseX = e.clientX - rect.x;
			let mouseY = e.clientY - rect.y;
			console.log(mouseX, mouseY);
			//drawing circles around the mouse
			for(let i = 0; i<20; i++){
				let x = getRandomInt(-50,50)+mouseX;
				let y = getRandomInt(-50,50)+mouseY;
				let radius = getRandomInt(5,20);
				let color = getRandomColor();
				drawArc(ctx,x,y,radius,color);
				
			}
		}

		//setting up all of the buttons and checkboxes
		const setupUi = () => {
			//plays
			document.querySelector("#btnPlay").onclick = function () {
				console.log("Play");
				paused = false;
				if (!updating) {
					update();
				}
				updating = true;

			};
			//pauses
			document.querySelector("#btnPause").onclick = function () {
				paused = true;
				updating = false;
			};
			//clears
			document.querySelector("#btnClear").onclick = function(){
				clearCanvas();
			};
			//canvas click for spraypaint
			canvas.onclick = canvasClicked;

			//rectangle checkbox
			document.querySelector("#cbRectangles").onclick = function(e){
				createRectCheck = e.target.checked;
			};
			//circle checkbox
			document.querySelector("#cbArcs").onclick = function(e){
				createArcCheck = e.target.checked;
			};
			//line checkbox
			document.querySelector("#cbLines").onclick = function(e){
				createLineCheck = e.target.checked;
			};

		}


