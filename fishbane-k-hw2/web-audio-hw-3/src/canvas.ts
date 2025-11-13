/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;
let sprites = [];

interface DrawParams{
  showGradient: boolean,
  showBars: boolean,
  showCircles: boolean,
  showEmboss: boolean,
  showWaveform: boolean,
  showInvert:boolean,
  showNoise:boolean
  

}

//Sprite class that draws circles that change size with the music and later in the code changes color based on average energy
class CircleSprite {
    static type = "arc";
    constructor(x, y, radius, color) {
        console.log(`${this.constructor.type} created`);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

    }

    update(audioData) {//grows and shrinks with the music 

        let avg = 0;
        for (let i = 0; i < audioData.length; i++) {
            avg += audioData[i] / 20;
        }
        avg /= audioData.length;
        this.radius = avg;





    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

const setupCanvas = (canvasElement, analyserNodeRef) => {
    //creeate drawing context
    ctx = canvasElement.getContext("2d");



    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight,
        [{ percent: 0.0, color: "midnightblue" },
        { percent: 0.3, color: "lightseagreen" },
        { percent: 0.6, color: "orangered" },
        { percent: 0.8, color: "orange" },
        { percent: 1.0, color: "gold" }
        ]);
    analyserNode = analyserNodeRef;
    audioData = new Uint8Array(analyserNode.fftSize / 2);
        //some sprtes to start with
    for (let i = 0; i < 30; i++) {
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        let radius = 1;
        let color = utils.getRandomColor();

        sprites.push(new CircleSprite(x, y, radius, color));
    }

}

const draw = (params:DrawParams ) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    analyserNode.getByteFrequencyData(audioData);
    // OR
    //analyserNode.getByteTimeDomainData(audioData); // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    // 4 - draw bars
    if (params.showBars) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing = 100;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        //loop through the data and draw
        for (let i = 0; i < audioData.length; i++) {
            ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
            ctx.strokeRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
        }
        ctx.restore();
    }

    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < audioData.length; i++) {
            //red-ish circles
            ctx.save();
            let percent = audioData[i] / 256;
            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            //blue-ish circles bigger and more transparent
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 255, 0.10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            //yellow-ish circles smaller
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 0, 0.5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 0.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }
    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;//not used here
    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < 0.05) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 0; // zero out the red and green and blue channels
            //make the noise best color orange
            data[i] = 200;
            data[i + 1] = 150;
            data[i + 2] = 50;


        } // end if
        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }
    } // end for
    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);

    //Give the user the ability to toggle between the visualization using the "frequency data" and the "time domain" (i.e. waveform) data.
    if (params.showWaveform) {
        analyserNode.getByteTimeDomainData(audioData); // waveform data
        ctx.save();
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'rgba(209, 32, 32, 0.5)';
        ctx.beginPath();
        let sliceWidth = canvasWidth * 1.0 / audioData.length;
        let x = 0;
        for (let i = 0; i < audioData.length; i++) {
            let v = audioData[i] / 128.0;
            let y = v * canvasHeight / 2;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    for (let sprite of sprites) {
        sprite.update(audioData);
        sprite.draw(ctx);
    }


    //calculate average energy
    let avgEnergy = 0;
    for (let i = 0; i < audioData.length; i++) {
        avgEnergy += audioData[i];
    }
    avgEnergy /= audioData.length;

    //compare average energy to previous average energy
    if (!draw.prevEnergy) {
        draw.prevEnergy = avgEnergy;
    }
    let energyDiff = avgEnergy - draw.prevEnergy;
    draw.prevEnergy = avgEnergy;

    //if average energy has increased significantly, add more sprites
    if (energyDiff > 15 && sprites.length < 60) {
        for (let i = 0; i < 3; i++) {
            sprites.push(
                new CircleSprite(Math.random() * canvasWidth, Math.random() * canvasHeight,
                    1 + Math.random() * 3,
                    utils.getRandomColor()
                )
            );
        }
    }

    //change color of sprites based on average energy
    for (let sprite of sprites) {
        //if low energy aliceblue with some random color
        if (avgEnergy < 50) {
            if(Math.random() < 0.05) {
                sprite.color = utils.getRandomColor();
            }
            else{
                sprite.color = "AliceBlue";
            }
            //if medium energy more random colors
        } else if (avgEnergy < 130) {
           if(Math.random() < 0.4) {
                sprite.color = utils.getRandomColor();
            }
            else{
                sprite.color = "AliceBlue";
            }
            //if high energy always choose a random color
        } else {
            
            sprite.color = utils.getRandomColor();
        }
    }
















}

export { setupCanvas, draw };