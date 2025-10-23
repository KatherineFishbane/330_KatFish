/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import * as audio from './audio.js';
import * as utils from './utils.js';
import * as canvas from './canvas.js';
let drawParams = {
};


// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/New Adventure Theme.mp3"
});

const init = () =>{

  console.log("init called");
  console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  audio.setupWebaudio(DEFAULTS.sound1);
  let canvasElement = document.querySelector("canvas"); 
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement,audio.analyserNode);
  fetchDefaultState();
  fetchSongs();
  
  loop();
}

const setupUI = (canvasElement) =>{
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fs-button");
  const playButton = document.querySelector("#play-button");

  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };
  playButton.onclick = e => {
    console.log(`audio.audioCtx state = ${audio.audioCtx.state}`);

    if (audio.audioCtx.state == 'suspended') {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx state = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    } else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  };
  // C - hookup volume slider and label
  const volumeSlider = document.querySelector("#volume-slider");
  const volumeLabel = document.querySelector("#volume-label");
  //add .oninput event to slider
  volumeSlider.oninput = e => {
    //set the gain
    audio.setVolume(e.target.value);
    //update the value of the label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
  };
  //set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  //D - hookup track <select>
  let trackSelect = document.querySelector("#track-select");
  //add .onchange event to <select>
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    //pause the current track if it is playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };
  
  //E - hookup checkboxes
  let gradientCB = document.querySelector("#gradient-CB");
  let barsCB = document.querySelector("#bars-CB");
  let circlesCB = document.querySelector("#circles-CB");
  let noiseCB = document.querySelector("#noise-CB");
  let invertCB = document.querySelector("#invert-CB");
  let embossCB = document.querySelector("#emboss-CB");
  let waveformCB = document.querySelector("#waveform-CB");
  let bassCB = document.querySelector("#bass-CB");
  let trebleCB = document.querySelector("#treble-CB");

  waveformCB.onchange = e => {
    drawParams.showWaveform = e.target.checked;
  }
  bassCB.onchange = e => {
  drawParams.showBass = e.target.checked;
  audio.bassBoost(e.target.checked);
}

trebleCB.onchange = e => {
  drawParams.showTreble = e.target.checked;
  audio.trebleBoost(e.target.checked);
}


  
  gradientCB.onchange = e => {
    drawParams.showGradient = e.target.checked;
  }
  barsCB.onchange = e => {
    drawParams.showBars = e.target.checked;
  }
  circlesCB.onchange = e => {
    drawParams.showCircles = e.target.checked;
  }
  noiseCB.onchange = e => {
    drawParams.showNoise = e.target.checked;

  }
  invertCB.onchange = e => {
    drawParams.showInvert = e.target.checked;
  }
  embossCB.onchange = e => {
    drawParams.showEmboss = e.target.checked;
  }




} // end setupUI

const loop = () =>{

  setTimeout(loop,1000/60); //60 fps
  canvas.draw(drawParams);
  
}
//fetch songs from json file
const fetchSongs = () =>{
  const url = "data/av-data.json";
  const category = "songs";
  const trackSelect = document.querySelector("#track-select");
  const callback = (data) => {
    console.log("fetchSongs callback called");
    console.log(data);
    for (let song of data) {
      let option = document.createElement("option");
      option.value = song.url;
      option.innerHTML = song.title;
      trackSelect.appendChild(option);
    }
  };
  utils.fetchData(url, category, callback);


}
//fetch default state from json file
const fetchDefaultState = () =>{
  const url = "data/av-data.json";
  const category = "defaults";
  const callback = (data) => {
    console.log("fetchDefaultState callback called");
    console.log(data);
    let def = data[0];
    //set drawParams default state
    drawParams.showGradient = def.gradient;
    drawParams.showBars = def.bars;
    drawParams.showCircles = def.circles;
    drawParams.showNoise = def.noise;
    drawParams.showInvert = def.invert;
    drawParams.showEmboss = def.emboss;
    drawParams.showWaveform = def.waveform;
    drawParams.showBass = def.bass;
    drawParams.showTreble = def.treble;
    console.log(drawParams);
    //set the checkboxes to match the default state
    document.querySelector("#gradient-CB").checked = drawParams.showGradient;
    document.querySelector("#bars-CB").checked = drawParams.showBars;
    document.querySelector("#circles-CB").checked = drawParams.showCircles;
    document.querySelector("#noise-CB").checked = drawParams.showNoise;
    document.querySelector("#invert-CB").checked = drawParams.showInvert;
    document.querySelector("#emboss-CB").checked = drawParams.showEmboss;
    document.querySelector("#waveform-CB").checked = drawParams.showWaveform;
    document.querySelector("#bass-CB").checked = drawParams.showBass;
    document.querySelector("#treble-CB").checked = drawParams.showTreble;

    canvas.draw(drawParams);

  };
  

  utils.fetchData(url, category, callback);
}

//fetch app title from json file
const fetchAppTitle = () =>{
  const url = "data/av-data.json";
  const category = "title";
  const callback = (data) => {
    console.log("fetchAppTitle callback called");
    console.log(data);
    document.querySelector("title").innerHTML = data;
    document.querySelector("h1").innerHTML = data;
  };
  utils.fetchData(url, category, callback);
}
export { init };