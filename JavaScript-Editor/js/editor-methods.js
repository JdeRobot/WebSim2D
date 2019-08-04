
export function setupACE(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  return editor;
}

export function toggleCameraDisplay(){
    var opencvCam = document.querySelector("#outputCanvas");
    var imageCamBtn = document.querySelector("#cambtn").firstChild;
    $("#outputCanvas, #spectatorDiv").toggle();
    if(opencvCam.style.display != "none"){
      imageCamBtn.src = "assets/resources/stop-camera-icon.png"
    }else{
      imageCamBtn.src = "assets/resources/play-camera-icon.png"
    }
}

export function getCode(editor){
  var content = editor.getValue();

  return content;
}

export function insertCode(textToInject, editor){
  // Reloads the code inside the editor erasing all content
  editor.setValue(textToInject);
  return editor;
}

export function reset(){
  
}