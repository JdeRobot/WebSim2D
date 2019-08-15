var mainInterval;
var play = false;
var reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];
document.addEventListener('code-to-run', (event)=>{

  var codeContent = "async function myAlgorithm(){\n"+event.detail['code']+"}\n myAlgorithm();";
  var jsonOutput = startStopCode(play, reservedVariables, mainInterval, codeContent);

  play = jsonOutput["play"];
  mainInterval = jsonOutput["mainInterval"];
});

document.addEventListener('reset', (event)=>{
  var codeContent = `
  myRobot.clearVelocity();
  `
  // This loop is necesary to first stop the current code execution, execute reset code and then stop it again to receive
  // the new code from user
  for(var i = 0; i<3; i++){
    var jsonOutput = null;
    if (i == 1){
      jsonOutput = startStopCode(play, reservedVariables, mainInterval, codeContent);
    }else{
      jsonOutput = startStopCode(play, reservedVariables, mainInterval, "");
    }
    play = jsonOutput["play"];
    mainInterval = jsonOutput["mainInterval"];
  }
});
