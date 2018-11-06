var demoWorkspace ="";
var mainInterval;
var play = false;

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

});

function runCode(){

  var editor = ace.edit("ace");
  var content = null;

  content = editor.getValue();

  if(!play){
    eval(content);
    play = true;
  }else{
    clearInterval(mainInterval);
    myRobot.move(0,0);
    play = false;
    console.log("Execution stopped.")
  }
}
