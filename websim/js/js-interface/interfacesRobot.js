// document references prueba.html document, not index.html document.
'use strict';

class RobotI
{
    constructor(robotId){
        var self = this;
        this.raycastersArray = [];
        this.distanceArray = {
          center: [],
          left: [],
          right: []
        };
        this.understandedColors = {
          blue: {low: [0, 0, 235, 0], high: [0, 0, 255, 255]},
          green: {low: [0, 235, 0, 0], high: [0, 255, 0, 255]},
          red: {low: [235, 0, 0, 0], high: [255, 0, 0, 255]},
          white: {low: [230, 230, 230, 0], high: [255, 255, 255, 255]}
        };
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
        this.robot = document.getElementById(robotId);
        this.robot.addEventListener('body-loaded', this.setVelocity.bind(self));
        this.startCamera();
    }
    getRotation(){
      return this.robot.getAttribute('rotation');
    }
    setV(v){
        this.velocity.x = v;
    }
    setW(w){
        this.velocity.ay = w*10;
    }
    setL(l){
        this.velocity.y = l;
    }
    move(v, w){
        this.setV(v);
        this.setW(w);
    }
    getV(){
        return this.velocity.x;
    }
    getW(){
        return this.velocity.ay;
    }
    getL(){
        return this.velocity.y;
    }
    setVelocity(body){
      /*
        This code run continiously, setting the speed of the robot every 40ms
        This function will not be callable, use setV, setW or setL
      */

      if(body != undefined){
        this.robot = body.originalTarget;
      }
      let rotation = this.getRotation();

      let newpos = updatePosition(rotation, this.velocity, this.robot.body.position);

      this.robot.body.position.set(newpos.x, newpos.y, newpos.z);
      this.robot.body.angularVelocity.set(this.velocity.ax, this.velocity.ay, this.velocity.az);
      setTimeout(this.setVelocity.bind(this), 30);
    }

    setCameraDescription(data /* , current */)
    {
        console.log("setCameraDescription: "+ data);
    }

    getCameraDescription()
    {
        return 1;
    }
    stopCameraStreaming()
    {
        return 1;
    }

    reset()
    {
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
        this.robot.body.position.set(0,0,0);
        this.stopRaycaster();
        return 1;
    }

    getImageDescription()
    {
        return 1;
    }

    getImageFormat()
    {
        return 1;
    }

    startCamera(){
      // Starts camera from robot
      if (($('#spectatorDiv').length) && (document.querySelector("#spectatorDiv").firstChild != undefined)) {
        this.canvas2d = document.querySelector("#camera2");

        this.getImageData_async();
      }else{
        setTimeout(this.startCamera.bind(this), 100);
      }
    }

    getImage(){
      // Returns a screenshot from the robot camera
      if(this.imagedata != undefined){
        return this.imagedata;
      }else{
        setTimeout(this.getImage.bind(this), 200);
      }
    }

    getImageData_async()
    {
        this.imagedata = cv.imread('camera2');


        setTimeout(this.getImageData_async.bind(this), 33);
    }

    startRaycasters(distance, numOfRaycasters)
    {
      let emptyEntity = document.querySelector("#positionSensor");
      // offsetAngle: angle between one raycaster and the next one.
      if((numOfRaycasters % 2) == 0){
        numOfRaycasters += 1;
      }
      var offsetAngle = 180 / numOfRaycasters;
      var angle = 0;
      var group = "center";
      for(var i = 0; i < numOfRaycasters; i++){
        if( (i%2) == 0 ){
          angle = angle * -1;
          if(i != 0){
            group = "right";
          }
        }else{
          angle = angle * -1;
          angle += offsetAngle;
          if(i != 0){
            group = "left";
          }
        }
        this.createRaycaster(distance, angle, emptyEntity, group, i);
      }
      this.setListener();
    }

    createRaycaster(distance, angle, emptyEntity, group, number)
    {
      let newRaycaster = document.createElement('a-entity');
      newRaycaster.setAttribute('raycaster', 'objects', '.collidable');
      newRaycaster.setAttribute('raycaster', 'far', distance);
      newRaycaster.setAttribute('raycaster', 'showLine', true);
      newRaycaster.setAttribute('raycaster', 'direction', "1 0 0");
      newRaycaster.setAttribute('raycaster', 'interval', 70);
      newRaycaster.setAttribute('raycaster', 'enabled', true);
      newRaycaster.setAttribute('line', 'color', "#ffffff");
      newRaycaster.setAttribute('line', 'opacity', 1);
      newRaycaster.setAttribute('line', 'end', "1 0 0");
      newRaycaster.setAttribute('follow-body', 'entityId', '#a-pibot');
      newRaycaster.setAttribute('follow-body',"offsetRotation", "0 " + angle + " 0");
      newRaycaster.setAttribute('intersection-handler', 'fps','10');
      newRaycaster.classList.add(group);
      newRaycaster.id = number.toString();
      this.raycastersArray.push(newRaycaster)
      emptyEntity.appendChild(newRaycaster);
    }

    stopRaycasters()
    {
      var emptyEntity = document.querySelector("#positionSensor");
      while(emptyEntity.firstChild){
        this.removeListeners(emptyEntity.firstChild);
        emptyEntity.removeChild(emptyEntity.firstChild);
      }
    }

    setListener()
    {
      for(var i = 0; i < this.raycastersArray.length; i++){
        this.raycastersArray[i].addEventListener('intersection-detected-' + this.raycastersArray[i].id, this.updateDistance.bind(this));

        this.raycastersArray[i].addEventListener('intersection-cleared-' + this.raycastersArray[i].id, this.eraseDistance.bind(this));
      }
    }

    removeListeners(raycaster)
    {
        raycaster.removeEventListener('intersection-detected-' + raycaster.id, ()=>{ console.log("removed");});
        raycaster.removeEventListener('intersection-cleared-' + raycaster.id, ()=>{ console.log("removed");});
    }

    updateDistance(evt)
    {
      let id = evt.target.id;
      let targetClass = evt.target.classList[0];

      if(this.distanceArray[targetClass].length == 0){

        this.distanceArray[targetClass].push({ id : id , d: evt.detail });
      }else{
        let found = false;
        let j = 0;
        while((j < this.distanceArray[targetClass].length) && !found){
          if(this.distanceArray[targetClass][j].id == id ){
            this.distanceArray[targetClass][j].d = evt.detail;
            found = true;
          }
          j +=1;
        }
        if(!found){
          this.distanceArray[targetClass].push({ id : id , d: evt.detail });
        }
      }
    }

    eraseDistance(evt)
    {
      let id = evt.target.id;
      let targetClass = evt.target.classList[0];

      for(var i = 0; i < this.distanceArray[targetClass].length; i++){
        if(this.distanceArray[targetClass][i].id == id){
          this.distanceArray[targetClass].splice(i, 1);
        }
      }
    }

    getDistance()
    {
      if(this.distanceArray["center"][0] != null){
        return this.distanceArray["center"][0].d;
      }else{
        return null;
      }
    }

    getDistances()
    {
        var distances = [];
        var groups = ["center", "right", "left"];

        for(var i = 0; i < groups.length; i++){
          this.distanceArray[groups[i]].forEach((obj)=>{
            distances.push(obj.d);
          });
        }
        return distances;
    }

    getPosition()
    {
      let x = this.robot.object3D.position.x;
      let y = this.robot.object3D.position.y;
      let z = this.robot.object3D.position.z;
      let rot = THREE.Math.radToDeg(this.robot.object3D.rotation.y);

      return { x:x , y:y , z:z , theta:rot };
    }

    getObjectColor(reqColor)
    {
      var image = this.getImage();
      var binImg = new cv.Mat();
      var lines = new cv.Mat();
      var colorCodes = this.getColorCode(reqColor);
      var lowTresh = new cv.Mat(image.rows,image.cols, image.type(), colorCodes[0]);
      var highTresh = new cv.Mat(image.rows, image.cols, image.type(), colorCodes[1]);
      var contours = new cv.MatVector();
      var hierarchy = new cv.Mat();

      cv.inRange(image, lowTresh, highTresh, binImg);
      cv.findContours(binImg, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      if(contours.size() > 0){

        let stored = contours.get(0);
        var objArea = cv.contourArea(stored, false);

        let moments = cv.moments(stored, false);
        var cx = moments.m10/moments.m00;
        var cy = moments.m01/moments.m00;

      }
      return {center: [parseInt(cx), parseInt(cy)], area: parseInt(objArea)};
    }

    getColorCode(color)
    {
      if(this.understandedColors[color]){
        var low = this.understandedColors[color].low;
        var high = this.understandedColors[color].high;
        return [low, high];
      }
    }

    followLine(color, speed)
    {
      var data = this.getObjectColor(color);

      this.setV(speed);
      if(data.center[0] >= 75 && data.center[0] < 95){
          this.setW(-0.2);

      }else if(data.center[0] <= 75 && data.center[0] >= 55){
          this.setW(0.2);
      }else if(data.center[0] >= 95){
          this.setW(-0.35);
      }else if(data.center[0] <= 55){
          this.setW(0.35)
      }
    }

}

function updatePosition(rotation, velocity, robotPos){
  let x = velocity.x/10 * Math.cos(rotation.y * Math.PI/180);
  let z = velocity.x/10 * Math.sin(rotation.y * Math.PI/180);

  robotPos.x += x;
  robotPos.z -= z;

  return robotPos;
}
