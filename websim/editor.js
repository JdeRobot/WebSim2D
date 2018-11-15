import {setupACE, toggleCameraDisplay, getCode} from './js/editor-methods.js'


$(document).ready(()=>{
  setupACE();

  $("#cambtn").click(()=>{
    toggleCameraDisplay();
  });

  $("#runbtn").click(()=>{
    var codeString = getCode();
    var websimevent = new CustomEvent('code-to-run', {
      'detail': {
        'code': codeString
      }
    });
    document.dispatchEvent(websimevent);
  });
});
