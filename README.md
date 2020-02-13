
# WebSim2D Simulator

## Requirements


- First install NodeJS, open a terminal and type the next commands:
    1. Ubuntu / Linux distributions

~~~
     sudo apt-get update &
     sudo apt-get install nodejs &
     sudo apt-get install npm
~~~

    2. Windows: Go to the [next](https://nodejs.org/es/download/) link and click on ***Windows installer***.

## Usage

  - Ubuntu: In a terminal change directory to ***WebSim2D/websim2d*** and execute:
~~~
    nodejs server.js
~~~

  - Windows: In CMD console change directory to ***WebSim2D/websim2d*** and execute:

~~~
    node server.js
~~~

Open your web browser and write this URL; ***localhost:8000/***, for base WebSim2D version and ***localhost:8000/teleoperator***, for the teleoperator version.

## Teleoperator

The robot can be teleoperated using the arrows to the right of WebSim2D. The following video shows the teleoperator running:
https://www.youtube.com/watch?v=cetckZfJEsQ

## API

***To set the velocity values:***

  - myRobot.setV(v). v is the value of the linear velocity

  - myRobot.setW(w). w is the value of the angular velocity.

***To get the current velocity values:***

  - v = myRobot.getV()

  - w = myRobot.getW()

***To clear the velocity values:***

  - myRobot.clearVelocity()

***To Infrared Sensor:***

  - ir = myRobot.getInfrared()*

*The function returns three arrays of RGB data. The first corresponds to the front IR sensor, the second to the left sensor and the third to the right (ir.Front, ir.Left, ir.Right)*

***To Ray-Cast Sensor:***

  - ray = myRobot.getRayCast()*

*The function returns an array with all rays. Each ray contains the information of the x and y coordinates, and
the range to which each ray reaches where each ray ends (ray[n].x, ray[n].y or ray[n].range)*

***Blocking methods:***

- await myRobot.advanceTo(d). Advance to the distance indicated by the variable d in meters

- await myRobot.turnUpTo(angle). Turn up to the angle indicated by a in degrees

- await myRobot.sleepTo(s). Sleep to the time indicated by s in seconds

The following video shows the blockin methods running:
https://www.youtube.com/watch?v=9CLzcUwfxDg

## Example
An example of code to run in the editor is shown. This code makes use of the advanceTo and turnUpTo blocking methods, as well as the ray-cast sensor. The loop runs for 10 minutes:

~~~
var raycast = myRobot.getRayCast();
var run = true;
var timeout = setTimeout(function(){
        run = false;
},600000);
while (run){
    if (raycast[6].Range < 200 & 
            raycast[7].range < 200 &
            raycast[8].range < 200 & 
            raycast[9].range < 200) {
        await myRobot.turnUpTo(90);    
    } else if (raycast[7].Range < 200 & 
            raycast[6].range < 200) {
        await myRobot.turnUpTo(45);
    } else if (raycast[8].Range < 200 &
                raycast[9].range < 200) {
        await myRobot.turnUpTo(-45);
    } else if (raycast[6].range < 200) {
        await myRobot.turnUpTo(15);
    } else if (raycast[9].range < 200){
        await myRobot.turnUpTo(-15);
    } else {
        await myRobot.advanceTo(75);
    }
    
    raycast = myRobot.getRayCast();
}
~~~

The following video shows the example running:
https://www.youtube.com/watch?v=QuO8BYozK4M
