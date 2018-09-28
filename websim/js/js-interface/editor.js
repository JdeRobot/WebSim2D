var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

  demoWorkspace = Blockly.inject('blockly-div', {
    media: 'google-blockly/media/',
    toolbox: document.getElementById('toolbox'),
    toolboxPosition: 'end',
    horizontalLayout: true,
    scrollbars: true
  });

  var blocklyEditor = $("#blockly-div");
  blocklyEditor.css("display", "none");
});

function getCode(){
  /*
    This code extracts the text from the embedded code editor and
    creates a AJAX request to the server, then the server responses with a HTML
    which references the new file.
  */
  var editor = ace.edit("ace");;
  var content = null;

  if($("#ace").css("display") === "none"){
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    content = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  }else{
    content = editor.getValue();
  }

  ajaxreq.open('POST', 'http://localhost:8000/myAlgorithm', true);
  ajaxreq.onreadystatechange = function (aEvt) {
    if (ajaxreq.readyState == 4) {
        // Reload the iframe
        document.getElementById('websimframe').contentWindow.location.reload();
    }
  };
  ajaxreq.send(content);

}

function changeEditor(){
  var blocklyEditor = $("#blockly-div");
  var aceEditor = $("#ace");

  if(blocklyEditor.css("display") === "none"){
    aceEditor.fadeOut("slow");
    blocklyEditor.fadeIn("slow");
  }else{
    aceEditor.fadeIn("slow");
    blocklyEditor.fadeOut("slow");
  }

}
