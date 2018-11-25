$(document).ready(function() {
    var w;
    var robot = document.querySelector('#a-pibot');
    if(typeof(Worker) !== "undefined") {
      if(typeof(w) == "undefined") {
        w = new Worker("js/Ice/ice_worker.js");
	var message = {func: "Init"};
        w.postMessage(message);
    }
    } else {
      Console.log("Sorry, your browser does not support Web Workers...");
    }

    w.onmessage = function(event) {
      if (event.data.func == "setMotors"){
        setVelocity(event.data.velocity, robot)
      } else if (event.data.func == "init"){
	var canvas = document.querySelector('#camera2');
        let ctx = canvas.getContext( '2d' );
        let  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var message = {func: "startStreaming", img: imageData};
        w.postMessage(message);
      } else if (event.data.func == "getImage"){
	var canvas = document.querySelector('#camera2');
        let ctx = canvas.getContext( '2d' );
        let  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var message = {func: "setImage", img: imageData};
        w.postMessage(message);
      } else {
        console.log(event.data);
        w.terminate();
      }
    }
});



function updatePosition(rotation, velocity, robotPos){
  let x = (velocity.x/10) * Math.cos(rotation.y * Math.PI/180);
  let z = (velocity.x/10) * Math.sin(rotation.y * Math.PI/180);

  robotPos.x += x;
  robotPos.z -= z;

  return robotPos;
}

function getRotation(robot){
  return robot.getAttribute('rotation');
}

function setVelocity(velocity, robot){
  let rotation = robot.getAttribute('rotation');
  let newpos = updatePosition(rotation, velocity, robot.body.position);
  robot.body.position.set(newpos.x, newpos.y, newpos.z);
  robot.body.angularVelocity.set(velocity.ax, velocity.ay, velocity.az);
}
