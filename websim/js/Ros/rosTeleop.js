var cmdVelInterval, cameraInterval;
var vx = 0;
var vy = 0;
var vz = 0;
var wx = 0;
var wy = 0;
var wz = 0;
var ros, imageTopic, cmdVelTopic

function start(){
  cmdVelTopic.subscribe(function(message){
    vx = message.linear.x;
    vy = message.linear.z;
    vz = message.linear.y;
    wx = message.angular.x;
    wy = message.angular.z * 10;
    wz = message.angular.y;
    move();
  });
}


function startStreaming(){
  var canvas = document.getElementById('camera2');
  var data = canvas.toDataURL('image/jpeg');
  var imageMessage = new ROSLIB.Message({
    format: 'jpeg',
    data : data.replace("data:image/jpeg;base64,", "")
  });
  imageTopic.publish(imageMessage);
}


function initRos(){
  ros = new ROSLIB.Ros({
      //url: "ws://0.0.0.0:9090"
      url : "ws://" + config.address + ":9090"
   });
    // This function is called upon the rosbridge connection event
   ros.on('connection', function() {
       // Write appropriate message to #feedback div when successfully connected to rosbridge
       console.log("Connect websocket")
   });
  // This function is called when there is an error attempting to connect to rosbridge
  ros.on('error', function(error) {
      // Write appropriate message to #feedback div upon error when attempting to connect to rosbridge
      console.log("Error to connect websocket")
  });
  // This function is called when the connection to rosbridge is closed
  ros.on('close', function() {
      // Write appropriate message to #feedback div upon closing connection to rosbridge
      console.log("Disconnect websocket");
   });
    imageTopic = new ROSLIB.Topic({
     ros : ros,
     name : config.topicI,
     messageType : "sensor_msgs/CompressedImage"
   });
    cmdVelTopic = new ROSLIB.Topic({
       ros : ros,
       name : config.topicM,
       messageType : "geometry_msgs/Twist"
   });
  start();
  cameraInterval = setInterval(function(){
    startStreaming();
  },1);
}


 function move(){
  var robot = document.querySelector('#a-pibot');
  var rotation = robot.getAttribute('rotation');
  let x = (vx / 10) * Math.cos(rotation.y * Math.PI/180);
  let z = (vx / 10) * Math.sin(rotation.y * Math.PI/180);

  robot.body.position.set(robot.body.position.x + x, robot.body.position.y, robot.body.position.z - z);
  robot.body.angularVelocity.set(wx, wy, wz);
}
