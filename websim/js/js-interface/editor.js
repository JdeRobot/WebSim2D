var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

  demoWorkspace = Blockly.inject('blockly-div', {
    media: 'google-blockly/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
    trashcan: true,
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
    var start_point = '$(document).ready(execute); \nasync function execute(){\nvar myRobot = new RobotI("a-pibot"); #aqui \n}'
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    content = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    content = start_point.replace("#aqui", content);

    console.log(content);
  }else{
    content = editor.getValue();
  }

  ajaxreq.open('POST', 'http://localhost:8000/myAlgorithm', true);
  ajaxreq.onreadystatechange = function (aEvt) {
    if (ajaxreq.readyState == 4) {
        // Reload the iframe
        var url = JSON.parse(ajaxreq.responseText).url;
        $('#websimframe').attr('src', url);
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

function blocklyToPython(){
  /*
    This code gets blockly blocks, traduces it to Python
    languaje and sends to server, the server creates a file from
    a template and stores it on 'tmp' folder.
  */
  content = Blockly.Python.workspaceToCode(demoWorkspace);
  ajaxreq.open("POST", "http://localhost:8000/python", true);
  ajaxreq.onreadystatechange = function(evt){
    if(ajaxreq.readyState == 4){
      console.log("Created python file on tmp folder.")
    }
  };
  ajaxreq.send(content);
}
