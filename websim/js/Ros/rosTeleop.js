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
    format : "jpeg",
    data : data.replace("data:image/jpeg;base64,", "")
  });
  imageTopic.publish(imageMessage);
}

function initRos(){
  ros = new ROSLIB.Ros({
      url : "ws://" + config.address + ":" + config.port
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

function updatePosition(rotation, velocity, robotPos){
  let x = (velocity.x/10) * Math.cos(rotation.y * Math.PI/180);
  let z = (velocity.x/10) * Math.sin(rotation.y * Math.PI/180);

  robotPos.x += x;
  robotPos.z -= z;

  return robotPos;
}

function move(){
  var robot = document.querySelector('#a-pibot');
  let rotation = robot.getAttribute('rotation');
  var velocity = {}
  velocity.x = vx;
  velocity.y = vy;
  velocity.z = vz;
  let newpos = updatePosition(rotation, velocity, robot.body.position);
  robot.body.position.set(newpos.x, newpos.y, newpos.z);
  robot.body.angularVelocity.set(wx, wy, wz);
}
