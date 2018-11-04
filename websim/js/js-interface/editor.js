var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";
var mainInterval;
var runningCode = false;

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

});

function runCode(){

  var editor = ace.edit("ace");
  var content = null;
  var container = document.getElementById("scriptContainer");

  if($("#ace").css("display") === "none"){
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    content = Blockly.JavaScript.workspaceToCode(demoWorkspace);

  }else{
    content = editor.getValue();
  }

  if(!runningCode){
    eval(content);
    runningCode = true;
  }else{
    console.log("Code already running, stop it first");
  }
}

function stopCode(){
/*
  This function stops the code and the robot.
*/
  clearInterval(mainInterval);
  myRobot.move(0,0);
  runningCode = false;
}
