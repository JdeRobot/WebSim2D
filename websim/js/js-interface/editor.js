var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

});

function runCode(){
  var editor = ace.edit("ace");
  var content = null;
  var container = document.getElementById("scriptContainer");

  content = editor.getValue();

  var dynamicScript = document.getElementById("dynamicScript");
  var newScript = document.createElement("script");
  newScript.type = "text/javascript";
  newScript.id = "dynamicScript";
  newScript.text = content ;
  if(dynamicScript != undefined){
    container.removeChild(dynamicScript);
  }
  container.appendChild(newScript);
}
