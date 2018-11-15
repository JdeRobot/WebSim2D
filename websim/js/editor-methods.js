
export function setupACE(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

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

export function getCode(){

  var editor = ace.edit("ace");
  var content = null;

  content = editor.getValue();

  return content;
}
