// document references prueba.html document, not index.html document.
'use strict';
var myRobot;

class RobotI
{
    constructor(robotId){
        const defaultDistanceDetection = 10;
        const defaultNumOfRays = 31;

        this.myRobotID = robotId;
        this.robot = document.getElementById(robotId);
        var self = this;
        this.activeRays = false;
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
        this.robot.addEventListener('body-loaded', this.motorsStarter.bind(self));
        this.startCamera();
        this.startRaycasters(defaultDistanceDetection, defaultNumOfRays);
    }
    motorsStarter(body){
      console.log("LOG ---------> Starting motors");
      this.setVelocity(this);
    }

    getRotation(){
      /*
        Returns an object with rotation properties.
      */
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
        this.robot = body.robot;
      }

      let rotation = this.getRotation();

      let newpos = updatePosition(rotation, this.velocity, this.robot.body.position);

      this.robot.body.position.set(newpos.x, newpos.y, newpos.z);
      this.robot.body.angularVelocity.set(this.velocity.ax, this.velocity.ay, this.velocity.az);
      this.timeoutMotors = setTimeout(this.setVelocity.bind(this), 30);
    }

    getCameraDescription()
    /*
      Returns width and height for the robot camera.
    */
    {
        return {width: this.canvas2d.width, height: this.canvas2d.height};
    }

    clearAll()
    /*
      Resets all states of the robot.
    */
    {
        clearTimeout(this.timeoutCamera); // Clear camera timeouts (stops camera)
        clearTimeout(this.timeoutMotors); // Clear motors timeouts (stops motors)
        clearInterval(this.followLineInterval); // Clears followLine intervals
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
        this.setVelocity();
        this.robot.body.position.set(0, 0, 0);
    }

    getImageDescription()
    /*
      Returns an object with width and height of the robot image.
    */
    {
        return {width: this.imagedata.cols, height: this.imagedata.rows};
    }

    getImageFormat()
    {
        return 1;
    }

    startCamera(){
      // Starts camera from robot
      console.log("LOG ---------> Starting camera.");
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
    /*
      This function stores image from the robot in the variable
      "imagedata", this allows to obtain image from the robot
      with getImage() function.
    */
    {
        this.imagedata = cv.imread('camera2');
        this.timeoutCamera = setTimeout(this.getImageData_async.bind(this), 33);
    }

    startRaycasters(distance, numOfRaycasters)
    /*
      This function enables/disbles raycasters (position sensors)
      for the robot.

      @distance (Number): Distance which the rays will detect objects.
      @numOfRaycasters (Numbrer): Number of Raycaster.
    */
    {
      if(!this.activeRays){
        console.log("LOG ---------> Starting sound sensors");
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
        this.activeRays = true;
        this.setListener();
      }else{
        this.stopRaycasters();
        this.startRaycasters(distance, numOfRaycasters);
      }
    }

    createRaycaster(distance, angle, emptyEntity, group, number)
    /*
      This function appends raycasters entities to the robot.
    */
    {
      let newRaycaster = document.createElement('a-entity');
      newRaycaster.setAttribute('raycaster', 'objects', '.collidable');
      newRaycaster.setAttribute('raycaster', 'far', distance);
      newRaycaster.setAttribute('raycaster', 'showLine', true);
      newRaycaster.setAttribute('raycaster', 'direction', "1 0 0");
      newRaycaster.setAttribute('raycaster', 'interval', 100);
      newRaycaster.setAttribute('raycaster', 'enabled', true);
      newRaycaster.setAttribute('line', 'color', "#ffffff");
      newRaycaster.setAttribute('line', 'opacity', 0);
      newRaycaster.setAttribute('line', 'end', "1 0 0");
      newRaycaster.setAttribute('follow-body', 'entityId', '#' + this.myRobotID);
      newRaycaster.setAttribute('follow-body',"offsetRotation", "0 " + angle + " 0");
      newRaycaster.setAttribute('intersection-handler', 'fps','10');
      newRaycaster.classList.add(group);
      newRaycaster.id = number.toString();
      this.raycastersArray.push(newRaycaster)
      emptyEntity.appendChild(newRaycaster);
    }

    stopRaycasters()
    /*
      This function erases all raycasters for the robot.
    */
    {
      var emptyEntity = document.querySelector("#positionSensor");
      while(emptyEntity.firstChild){
        this.removeListeners(emptyEntity.firstChild);
        emptyEntity.removeChild(emptyEntity.firstChild);
      }
      this.activeRays = false;
    }

    setListener()
    /*
      This function sets up intersection listeners for each raycaster.
    */
    {
      for(var i = 0; i < this.raycastersArray.length; i++){
        this.raycastersArray[i].addEventListener('intersection-detected-' + this.raycastersArray[i].id,
                                                  this.updateDistance.bind(this));

        this.raycastersArray[i].addEventListener('intersection-cleared-' + this.raycastersArray[i].id,
                                                  this.eraseDistance.bind(this));
      }
    }

    removeListeners(raycaster)
    /*
      This function disables intersection listeners.
    */
    {
        raycaster.removeEventListener('intersection-detected-' + raycaster.id, ()=>{ console.log("removed");});
        raycaster.removeEventListener('intersection-cleared-' + raycaster.id, ()=>{ console.log("removed");});
    }

    updateDistance(evt)
    /*
      This function is called when an intersection is detected and updates the distance
      to the point of intersection.
    */
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
    /*
      This function is called when the intersection is cleared and
      removes the distance from the array.
    */
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
    /*
      This function returns the distance for the raycaster in the center of the arc of rays.
    */
    {
      if(this.distanceArray["center"][0] != null){
        return this.distanceArray["center"][0].d;
      }else{
        return null;
      }

    }

    getDistances()
    /*
      This function returns an array with all the distances detected by the rays.
    */
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
    /*
      This function returns an object with X-Y-Z positions and rotation (theta)
      for the Y axis.
    */
    {
      let x = this.robot.object3D.position.x;
      let y = this.robot.object3D.position.y;
      let z = this.robot.object3D.position.z;
      let rot = THREE.Math.radToDeg(this.robot.object3D.rotation.y);

      return { x:x , y:y , z:z , theta:rot };
    }

    getObjectColor(colorAsString)
    /*
      This function filters an object in the scene with a given color passed as string, uses OpenCVjs
      to filter by color and calculates the center of the object and the area.

      Returns center: CenterX (cx), CenterY (cy) and the area of the object detected in the image.
    */
    {
      var image = this.getImage();
      var colorCodes = this.getColorCode(colorAsString);
      var binImg = new cv.Mat();
      var lines = new cv.Mat();
      var M = cv.Mat.ones(5, 5, cv.CV_8U);
      var anchor = new cv.Point(-1, -1);
      var lowThresh = new cv.Mat(image.rows,image.cols, image.type(), colorCodes[0]);
      var highThresh = new cv.Mat(image.rows, image.cols, image.type(), colorCodes[1]);
      var contours = new cv.MatVector();
      var hierarchy = new cv.Mat();

      cv.morphologyEx(image, image, cv.MORPH_OPEN, M, anchor, 2,
                cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue()); // Erosion followed by dilation

      cv.inRange(image, lowThresh, highThresh, binImg);
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

    getObjectColorRGB(lowval, highval)
    /*
      This function filters an object in the scene with a given color, uses OpenCVjs to filter
      by color and calculates the center of the object.

      Returns center: CenterX (cx), CenterY (cy) and the area of the object detected in the image.
    */
    {
      var image = this.getImage();
      var binImg = new cv.Mat();
      var lines = new cv.Mat();
      var M = cv.Mat.ones(5, 5, cv.CV_8U);
      var anchor = new cv.Point(-1, -1);
      var lowThresh = new cv.Mat(image.rows,image.cols, image.type(), lowval);
      var highThresh = new cv.Mat(image.rows, image.cols, image.type(), highval);
      var contours = new cv.MatVector();
      var hierarchy = new cv.Mat();

      cv.morphologyEx(image, image, cv.MORPH_OPEN, M, anchor, 2,
                cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue()); // Erosion followed by dilation

      cv.inRange(image, lowThresh, highThresh, binImg);
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
    /*
      This function returns binary values for the color if the color is on the
      array of colors that robot can filter.
    */
    {
      if(this.understandedColors[color]){
        var low = this.understandedColors[color].low;
        var high = this.understandedColors[color].high;
        return [low, high];
      }
    }

    followLine(lowval, highval, speed, interval = 100)
    /*
      This function is a simple implementation of follow line algorithm, the robot filters an object with
      a given color and follows it.
    */
    {
      this.followLineInterval = setInterval(()=>{
        var data = this.getObjectColorRGB(lowval, highval); // Filters image

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
        }, interval);
    }

    readIR(reqColor)
    /*
      This function filters an object on the robot image and returns 0-1-2-3 depending of the
      position of the center on X axis for the detected object.
    */
    {
      var outputVal = 3;
      var image = this.getImage();
      var binImg = new cv.Mat();
      var lines = new cv.Mat();
      var colorCodes = this.getColorCode(reqColor);
      var contours = new cv.MatVector();
      var hierarchy = new cv.Mat();
      let dst = new cv.Mat();
      let M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, 0, 0, 1, -95]);
      let dsize = new cv.Size(image.cols , image.rows - 95);
      // You can try more different parameters
      cv.warpAffine(image, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

      var lowTresh = new cv.Mat(dst.rows, dst.cols, dst.type(), colorCodes[0]);
      var highTresh = new cv.Mat(dst.rows, dst.cols, dst.type(), colorCodes[1]);

      cv.inRange(dst, lowTresh, highTresh, binImg);
      cv.findContours(binImg, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

      if(contours.size() > 0){
        let stored = contours.get(0);
        let moments = cv.moments(stored, false);

        var cx = moments.m10/moments.m00;

        if(isNaN(cx)){
          outputVal = 3;
        }else if((cx <= 150) && (cx >= 93)){
          outputVal = 2;
        }else if((cx >= 0) && (cx <= 57)){
          outputVal = 1;
        }else{
          outputVal = 0;
        }

      }
      return outputVal;
    }
}

function updatePosition(rotation, velocity, robotPos){
  /*
    This function calculates the new position of the robot.
  */
  let x = velocity.x/10 * Math.cos(rotation.y * Math.PI/180);
  let z = velocity.x/10 * Math.sin(rotation.y * Math.PI/180);

  robotPos.x += x;
  robotPos.z -= z;

  return robotPos;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(()=>{
  sleep(1000)
  myRobot = new RobotI('a-pibot');
  console.log("Robot instance created with variable name <myRobot>:", myRobot);
});
