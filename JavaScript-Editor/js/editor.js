

var editor = null


$(document).ready(()=>{
  editor = setupACE();

  $("#cambtn").click(()=>{
    toggleCameraDisplay();
  });

  $("#runbtn").click(()=>{
    var codeString = getCode(editor);
    console.log(codeString);
    var websimevent = new CustomEvent('code-to-run', {
      'detail': {
        'code': codeString
      }
    });

    console.log(websimevent);
    document.dispatchEvent(websimevent);
  });

  $('#resetRobot').click(()=>{
    var resetEvent = new CustomEvent('reset', {
      'detail': ''
    });
    document.dispatchEvent(resetEvent);
  });
});
