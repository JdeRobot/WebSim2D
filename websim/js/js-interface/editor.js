var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

});

function getCode(){
  /*
    This code extracts the text from the embedded code editor and
    creates a AJAX request to the server, then the server responses with a HTML
    which references the new file.
  */
  var editor = ace.edit("ace");;
  var content = null;

  content = editor.getValue();

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
