
# WebSim Simulator


## Introduction

WebSim is a web tool for Robotic programming learning. Includes a graphic simulator based on AFRAME framework and 2 code editors,
ACE Editor and Blockly editor.

Websim has 3 diferent usage methods, you can use it with JS interface, Ros or ICE communications

WebSim uses different frameworks:
  - NodeJS (4.2.6)
  - AFRAME (0.8.2)
  - ACE Editor (1.3.3)
  - OpenCV JS (3.3.1)
  - jQuery (3.3.1)
  - Blockly
  - ROS
  - ICE

## Requirements


- First install NodeJS, open a terminal and type the next commands:
    1. Ubuntu / Linux distributions


    `sudo apt-get update &
     sudo apt-get install nodejs &
     sudo apt-get install npm`



    2. Windows: Go to the [next](https://nodejs.org/es/download/) link and click on ***Windows installer***.


2. Clone this repo in your PC from https://github.com/RoboticsURJC-students/2018-tfg-alvaro_paniagua

## Usage


### ROS Interface

This interface only works in Ubuntu distributions. Is used to teleoperate robot using ROS communications between
browser and python teleoperator.


On first terminal go to the cloned folder and move to */teleop/basic_component_py* folder, then type:
  ```
      python basic_component.py basic_component_py.yml
  ```
__Note__: The basic_component_py.yml need to have the following conifguration:

  ```
  basic_component:
    Motors:
      Server: Ros # Deactivate, Ice , Ros, Glacier
      Proxy: "Motors:default -h localhost -p 9001"
      Topic: "/turtlebotROS/mobile_base/commands/velocity"
      Name: basic_component_pyCamera
      maxW: 0.7
      maxV: 4

    Camera:
      Server: Ros # Deactivate, Ice , Ros, Glacier
      Proxy: "CameraL:default -h localhost  -p 9001"
      Format: RGB8
      Topic: "/turtlebotROS/cameraL/image_raw"
      Name: basic_component_pyCamera
      Fps: 30
      MessageType: "CompressedImage"

    NodeName: basic_component_py
    Endpoints: ws -h localhost -p 9090

  ```

In a second terminal run:

 ```
  roslaunch rosbrige_server rosbridge_websocket.launch
 ```
In a third terminal go to directory *websim/websim* and run:

```
  nodejs server.js
```

Open your browser and go the URL *locahost:8000/ros*. Once done we will have a joystick to move the robot and a camera
with the image from robot in AFRAME.


### ICE Interface

This interface is used to control robot through ICE communications messages.


On first terminal, go to the *websim/teleop/basic_component_py* folder and run:

```
    python basic_component.py basic_component_py.yml
```
__Note__: The basic_component_py.yml need to have the following conifguration:

```
basic_component:
  Motors:
    Server: Glacier # Deactivate, Ice , Ros, Glacier
    Proxy: "Motors:default -h localhost -p 9001"
    Topic: "/turtlebotROS/mobile_base/commands/velocity"
    Name: basic_component_pyCamera
    maxW: 0.7
    maxV: 4

  Camera:
    Server: Glacier # Deactivate, Ice , Ros, Glacier
    Proxy: "CameraL:default -h localhost  -p 9001"
    Format: RGB8
    Topic: "/turtlebotROS/cameraL/image_raw"
    Name: basic_component_pyCamera
    Fps: 30
    MessageType: "CompressedImage"

  NodeName: basic_component_py
  Endpoints: ws -h localhost -p 10000

```

In a second terminal, go to the *websim/teleop* and then run:

 ```
    glacier2router --Ice.Config=config.glacier2
 ```
In a third terminal go to directory *websim/websim* and run:

```
  nodejs server.js
```

Now open your browser and go to the URL *localhost:8000/ice*


### JavaScript Interface

Go to the folder you cloned and type this command:

  - Ubuntu: In a terminal change directory to ***websim/websim*** and execute:
~~~
    nodejs server.js
~~~

  - Windows: In CMD console change directory to ***websim/websim*** and execute:

~~~
    node server.js
~~~

Open your web browser and write this URL; ***localhost:8000/***

![WebSim index page](/websim/docs/websimScreen.png)

Now write your code using the API shown below or use Blockly blocks.



## API

To run the robot we provide a API to make it simple to execute some commands on the robot.

Here we add an example of code to getting started with the robot.
The code just creates a Robot object and binds method to an AFRAME tag with id "a-pibot",
after that executes ".move()" method that gives linear and angular speed for the robot making it moves
describing circles.
~~~
  var myRobot = new RobotI('a-pibot');
  myRobot.move(0.5, 0.5);
~~~

The robot starts camera and raycaster sensors (infrarred sensor) on initiation.

Some robot interfaces are not callable, see below.

### Motors interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| setV(linearSpeed) | Sets linear speed for the robot. | linearSpeed: Linear speed for the body. | Float | myRobotInstance.setV(0.4) |
| setW(angularSpeed) | Sets angular speed for the robot. | angularSpeed: Angular speed for the body. | Float | myRobotInstance.setW(0.4) |
| setL(lateralSpeed) | Sets lateral speed for humanoids robots. | lateralSpeed: Lateral speed. | Float | myRobotInstance.setL(0.7) |
| move(linearSpeed, angularSpeed) | Sets linear and angular speed for the robot. | linearSpeed: Linear speed. / angularSpeed: Angular speed | Float , Float | myRobotInstance.move(0.7, 0.5) |
| getV() | Returns linear speed given or 0 | - | - | myRobotInstance.getV() |
| getW() | Returns angular speed given or 0 | - | - | myRobotInstance.getW() |
| getL() | Returns lateral speed given or 0 | - | - | myRobotInstance.getL() |
| setVelocity() | This method is not callable, is a continious task to set every interval the speed we give to the robot | - | - | Not in use |
| getRotation() | Returns object with the rotation on X, Y, Z axis | - | - | myRobotInstance.getRotation() |

### Camera interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startCamera() | This method is not callable, is a task to run the getImage_async after canvas is loaded | - | - | Not in use |
| getImage_async() | This method is not callable, is a continious task to get the image from the WebGL canvas | - | - | Not in use |
| getImage() | Returns a cv.Mat() object with the data from the WebGL canvas with id "camera2" | - | - | myRobotInstance.getImage() |
| getObjectColor(color) | Returns an object with center coordinates of an object detected with color passed as argument. | color: color of the object to detect, given colors ( red, blue, green ) | string | myRobotInstance.getObjectColor("blue") |
| getColorCode(color) | Returns a matrix with RGB low and high filter for an specified color, not callable. | color: color to search on predefined understandedColors object | string | Not in use |
| followLine(lineColor, speed) | Executes a predefined follow line algorithm | colorLine: color for the line to follow / speed: linear speed for the robot | string / number | myRobotInstance.followLine("white", 0.4) |
| readIR(reqColor) | Crops robot image, filters and calculates center of object with color passed as argument. Returns 0-1-2-3 depending of center position | reqColor: color for the object to filter on image | string | myRobotInstance.readIR("white") |

### Position sensors:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startRaycasters(distance, numOfRaycasters) | This method sets up a given number of raycaster which far property is given by distance | distance: Distance for every raycaster (meters) / numOfRaycasters: Number of raycasters to check intersections. | Float , Float | myRobotInstance.startRaycasters(1, 7) |
| setListener() | This method is not callable, sets a listener for the event 'intersection-detected-id' and 'intersection-cleared-id' and gets distance emitted by event or null, every single raycaster has its own custom event. | - | - | Not in use |
| getDistance() | This method returns the distance (float) between robot and the raycaster intersection in the center. | - | - | myRobotInstance.getDistance() |
| getDistances() | This method returns the distance (float) between robot and each raycaster intersection. | - | - | myRobotInstance.getDistances() |
| stopRaycasters() | This method erases all raycaster properties, disables sensor | - | - | myRobotInstance.stopRaycasters() |
| createRaycaster( distance, angle, emptyEntity, group, number) | This method creates a single raycaster. Not callable. | distance, angle, group and number are raycaster properties, emptyEntity is the entity where raycaster will be appended. | Float, Float, String, Integer, HTML object | Not in use |
| setListener() | This method creates event listener for every raycaster. Not callable. | - | - | Not in use |
| updateDistance() | This method update distances catched by raycasters. Not callable. | - | - | Not in use |
| eraseDistance() | This method erases distance entry when 'intersection-cleared' event fires up for a raycaster. Not callable. | - | - | Not in use |
| removeListeners() | This method removes event listener for all raycasters. Not callable. | - | - | Not in use. |
| getPosition() | This method returns the position of the robot and rotation on Y axis as JS object. | - | - | myRobotInstance.getPosition() |

*This API usage is shown at the Youtube videos below.*

## Blockly

In this section we explain the custom Blockly blocks created to use the Robot functions.

The new blocks are allocated on blockly editor under RobotAPI category, this category is subdivided in four new
categories, [Motors](#motorsBlockly), [Sensors](#sensorsBlockly), [Tools](#toolsBlockly) and [Camera](#cameraBlockly).

### Motors<a name="motorsBlockly"></a>

![Move forward](/websim/docs/blocklyScreenshots/setVBlock.PNG)

This block is used to move forward the robot, is equivalent to code *myRobot.setV(linSpeed)*.
Input value must be positive.


![Move backward](/websim/docs/blocklyScreenshots/setVBackBlock.PNG)

This block is used to move backward the robo, is equivalent to code *myRobot.setV(-linSpeed)*.
Input value must be positive.


![Curves](/websim/docs/blocklyScreenshots/moveBlock.PNG)

This block is used to describe circles, you can set linear speed and angular speed
in just one block, is equivalent to code *myRobot.move(linSpeed, angSpeed)*.
Inputs can be negative or positive, it varies turn direction.


![Get linear speed](/websim/docs/blocklyScreenshots/getVBlock.PNG)

This block is used to obtain the current linear speed for the robot, is equivalent to code *myRobot.getV()*.


![Get angular speed](/websim/docs/blocklyScreenshots/getWBlock.PNG)

This block is used to obtain current angular speed for the robot, is equivalent to code *myRobot.getW()*.


![Get lateral speed](/websim/docs/blocklyScreenshots/getLBlock.PNG)

This block is used to obtain current lateral speed (only for humanoid robots), is equivalent to code *myRobot.getL()*.


![Turn left](/websim/docs/blocklyScreenshots/setWLeft.PNG)

This block is used to make robot turn left, is equivalent to code *myRobot.setW(angSpeed)*.
Input value must be positive.


![Turn right](/websim/docs/blocklyScreenshots/setWRight.PNG)

This block is used to make robot turn right, is equivalent to code *myRobot.setW(-angSpeed)*.
Input value must be positive.


![Move lateral](/websim/docs/blocklyScreenshots/setLBlock.PNG)

This block is used to set lateral speed (only for humanoid robots), is equivalent to code *myRobot.setL(latSpeed)*.

![Stop](/websim/docs/blocklyScreenshots/stopBlock.PNG)

Thhis block is used to stop robot.

### Camera<a id="cameraBlockly"></a>

![Get image](/websim/docs/blocklyScreenshots/getImage.PNG)

This block is used to set on a variable the image from the robot camera, is equivalent to code *myRobot.getImage()*.


![Get object with color](/websim/docs/blocklyScreenshots/getObjectColor.PNG)

This block is used to obtain center and area of the entity with color passed. Is equivalent to code *myRobot.getObjectColor("blue")*.
The returned object has next format:
~~~
{
  center: Array[cx, cy],
  area: number
}
~~~
We provide a dropdown to chose between cx, cy and area.


![Read IR](/websim/docs/blocklyScreenshots/readIR.PNG)

This block is used to read an object with a given color on the floor.
The return value is a integer [0 1 2 3] depending on the center of the object filtered.

| Value | Center Position |
|-------|-----------------|
| 0 | Pixel range 57 to 93 (center of image) |
| 1 | Pixel range 0 to 57 (left of image) |
| 2 | Pixel range 93 to 150 (right of image) |
| 3 | Out of the image or object doesn't exists |


### Tools<a id="toolsBlockly"></a>

![Create robot instance](/websim/docs/blocklyScreenshots/createRobot.PNG)

This block is used to create multiple robot instances, is equivalent to code *var newRobot = new RobotI("id")*.
This needs an AFRAME entity for the robot on the HTML file.


![Interval](/websim/docs/blocklyScreenshots/setInterval.PNG)

This block is used when you want to execute some code every given miliseconds, is used with other blocks like *get_image* and others.
This is equivalent to the next code:

```
  setInterval(function(){
    //Code
  }, intervalOnMiliseconds);
```


![Timeout](/websim/docs/blocklyScreenshots/setTimeout.PNG)

This block is used when you want to execute some code once after given miliseconds.
This is equivalent to the next code:

```
  setTimeout(function(){
    //Code to execute just once
  }, intervalOnMiliseconds);
```


![Logs](/websim/docs/blocklyScreenshots/consoleLog.PNG)

This block is used to print something in the browser console, by example you can use it to print center of an object.
This block is equivalent to code *console.log(somethingToPrint)*.


![Print image on canvas](/websim/docs/blocklyScreenshots/printImgCanvas.PNG)

This block is used to print image returned from *Get ROBOT camera image* block on _Camera_ category.


![Wait](/websim/docs/blocklyScreenshots/waitBlock.PNG)

This block is used to stop code for some time give as input number block.


### Sensors


![Start Raycasters](/websim/docs/blocklyScreenshots/startRays.PNG)

This block is used to start a given raycaster sensor with a chosed distance, is equivalent to code *myRobot.startRaycasters(1, 3)*.
The rays detects object when it intersects with a ray and returns a distance.
We can use it but is optional, raycasters are actived on robot load.


![Stop Raycasters](/websim/docs/blocklyScreenshots/stopRays.PNG)

This block is used to stop all raycasters, is equivalent to code *myRobot.stopRaycasters()*.


![Obtain rotation](/websim/docs/blocklyScreenshots/getRotation.PNG)

This block is used to obtain an object with rotation on X, Y and Z axis. This is equivalent to code *myRobot.getRotation()*.


![Get distance](/websim/docs/blocklyScreenshots/getDistance.PNG)

This block is used to get distance returned for the raycaster in the center of the arc of rays.
This is equivalent to code *myRobot.getDistance()*.


![Get distances](/websim/docs/blocklyScreenshots/getDistances.PNG)

This block is used to get all distances from the raycasters, if no intersection detected by a raycaster it returns 0.
This returns an array with the distances, is equivalent to code *myRobot.getDistances()*.


![Get position](/websim/docs/blocklyScreenshots/getPos.PNG)

This block is used to return X, Y and Z coordinates and rotation in the horizontal plane (*Rotation on Y axis*).
This is equivalent to code *myRobot.getPosition()*.



Usage examples are shown on YT videos above.


## Youtube videos


OpenCV functionality with JS code: [Websim with OpenCV](https://www.youtube.com/watch?v=7y5X0LIvkik&t=3s)

Follow line algorithm: [Follow Line](https://youtu.be/7vfqN4fS5FU)

Raycaster first example: [Pibot detecting object](https://www.youtube.com/watch?v=OdjiArnrKoY)

Pibot moving between walls: [Raycaster examples](https://youtu.be/2O_4U86pe2M)

New raycaster behavior: [Raycaster getDistance](https://www.youtube.com/watch?v=jSG7ly4C_qk)

Arc of raycasters detecting a wall: [Avoiding walls](https://www.youtube.com/watch?v=BaFc_mYDkS4)

Following an object: [Object detection by color](https://www.youtube.com/watch?v=_RfJrCThpAE)

Follow line: [New follow line method by color](https://www.youtube.com/watch?v=hf0u5lENR24)

First blockly examples: [Follow line Blockly](https://www.youtube.com/watch?v=6uXuuKfNBIA)

Pibot executing follow line with Blockly: [New follow line](https://www.youtube.com/watch?v=vs2r_J27kbE)

Pibot following objects: [Follow green box](https://www.youtube.com/watch?v=9JIZO5E3jUo)

Blockly to python traduction code: [Blockly to python](https://www.youtube.com/watch?v=M3KwD8lCAi8)

Websim with Gazebo: [Gazebo](https://www.youtube.com/watch?v=iouvTDALMl8)

## Tutorials

Start moving robot: [Motors sensors](https://www.youtube.com/watch?v=SAeh9c8zf30)

First steps with camera: [Getting image](https://www.youtube.com/watch?v=LtEW6Ce85cE)

Raycaster tutorial: [Hit and turn exercise](https://www.youtube.com/watch?v=VDW9FZcwA0g)

Move robot with keyboard: [Connect keyboard](https://youtu.be/LlGeu95gEtk)

Following a sphere using camera color filter: [Follow ball](https://www.youtube.com/watch?v=NeNvb5V90MA)

## References


[A-frame - Framework](https://aframe.io/websim/docs/0.8.0/introduction/)

[A-frame - Github](https://github.com/aframevr/aframe)



## web-VRviewer

A-Frame is a web framework for building virtual reality (VR) experiences. Originally from [Mozilla](https://www.mozilla.org/en-US/), A-Frame was developed to be an easy but powerful way to develop VR content. As an [independent open source project](https://github.com/aframevr/), A-Frame has grown to be one of the [largest and most welcoming VR communities](https://aframe.io/community/).

A-Frame is based on top of HTML, making it simple to get started. But A-Frame is not just a 3D scene graph or a markup language; the core is a powerful entity-component framework that provides a declarative, extensible, and composable structure to [three.js](https://threejs.org/).

A-Frame supports most VR headsets such as Vive, Rift, Windows Mixed Reality, Daydream, GearVR, Cardboard, and can even be used for augmented reality. Although A-Frame supports the whole spectrum, A-Frame aims to define fully immersive interactive VR experiences that go beyond basic 360° content, making full use of positional tracking and controllers.


A-frame can be developed from a plain HTML file without having to install anything. A great way to try out A-Frame is to remix the starter example on Glitch, an online code editor that instantly hosts and deploys for free. Alternatively, create an .html file and include A-Frame in the `<head>`:

```
<html>
  <head>
    <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

As an example to learn how to use the tools and possibilities offered by the framework we added two cameras to the scene: one main camera and the other one with the robot.

![Example](https://github.com/JdeRobot/WebSim/blob/master/websim/assets/resources/demoCamera.gif "Example with Camera Entity")

References:

[A-frame - Framework](https://aframe.io/websim/docs/0.8.0/introduction/)

[A-frame - Github](https://github.com/aframevr/aframe)

## Running

For Ice Teleoperator:

```
cd websim/
python -m SimpleHTTPServer 8000
```

open in your browser localhost:8000.

For Ros Teleoperator:

```
cd websim/
npm install
npm start
```
Ros teleoperator is in the repository of github viz
