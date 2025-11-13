import { drawShape } from './drawUtils.js';
import { getRandomInt } from './mathUtils.js';
// import the getRandomInt function from the mathUtils.js file


// select the canvas element from the DOM (use its ID) and then get
// the 2d drawing context of the canvas and store it in script-scoped ctx const
let canvas = document.querySelector('canvas');
let ctx = document.querySelector('canvas').getContext('2d');
const button = document.querySelector('#draw-button');

let isAnimating = false;
let rotation = 0;
let shape = "line";
let size = 100;
let rotating = false;

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const updateCanvas = () => {
    clearCanvas();
    // call the drawShape function with its various required values.
    drawShape(ctx,shape,size,rotation);


    if (rotating) {
        rotation += 0.05;
        requestAnimationFrame(updateCanvas);
    } else {
        isAnimating = false; // stop the animation if not rotating.
    }
}

button.addEventListener('click', () => {
    shape = document.querySelector('#shape-select').value;
    rotating = document.querySelector('#rotate-checkbox').checked;
    // change to a new random size between 50 and 200 using getRandomInt function.
    size = getRandomInt(50,200);

    if (!isAnimating) {
        isAnimating = true;
        updateCanvas();
    }
});


// add a line of code that sets the visible title of the app (in the body) to 
// "Shapinator X" where X is any random multiple of a thousand from 2000 to 9000.