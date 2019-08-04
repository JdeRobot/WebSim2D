import {setupACE, toggleCameraDisplay, getCode, insertCode, reset} from './editor-methods.js'

var editor = null

$(document).ready(()=>{
  editor = setupACE();

  $("#cambtn").click(()=>{
    toggleCameraDisplay();
  });

  $("#runbtn").click(()=>{
    var codeString = getCode(editor);
    var websimevent = new CustomEvent('code-to-run', {
      'detail': {
        'code': codeString
      }
    });
    document.dispatchEvent(websimevent);
  });

  $('#resetRobot').click(()=>{
    var resetEvent = new CustomEvent('reset', {
      'detail': ''
    });
    document.dispatchEvent(resetEvent);
  });
});


