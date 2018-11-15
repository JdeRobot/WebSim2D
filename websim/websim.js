import 'aframe';
import 'aframe-physics-system';
import RobotI from './js/interfacesRobot.js';
import {spectObject} from './js/spectatorComponent.js';
import {intersectionHandlerObj} from './js/intersectionHandlerComponent.js';
import {followBodyObj} from './js/followBodyComponent.js';
import {startStopCode} from './js/websim-world-controller.js';
import $ from 'jquery';
// export for others scripts to use
window.$ = $;
//Websim variables
var myRobot;
var play = false;
var reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];
var mainInterval;
var argument, getCodeFunction;

// Register 3 AFRAME components
AFRAME.registerComponent('spectator', spectObject);
AFRAME.registerComponent("intersection-handler", intersectionHandlerObj);
AFRAME.registerComponent("follow-body", followBodyObj);

// Declare an event listener for body-loaded and then creates robot object.
document.addEventListener('body-loaded', (bodyLoaded)=>{ // No se lanza porque no puedo usar el sistema de fisicas

  if(bodyLoaded.target.id == "a-pibot"){
    console.log("------Robot body loaded, creating myRobot instance------")
    myRobot = new RobotI('a-pibot');
  }
});

//Declares a listener, listen to code generated for the editor
document.addEventListener('code-to-run', (event)=>{
  var codeContent = event.detail['code'];
  var jsonOutput = startStopCode(play, myRobot, reservedVariables, mainInterval, codeContent);

  play = jsonOutput["play"];
  mainInterval = jsonOutput["mainInterval"];
});

// Auxiliar function to implement a throttle of code.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
