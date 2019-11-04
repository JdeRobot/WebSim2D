
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
  
*The function returns three arrays of RGB data. The first corresponds to the front IR sensor, the second to the left sensor and the third to the right (ir.Front, ir.Left, ir.Right)

***To Ray-Cast Sensor:***

  - ray = myRobot.getRayCast()*
  
*The function returns an array with all rays. Each ray contains the information of the x and y coordinates, and 
the range to which each ray reaches where each ray ends (ray[n].x, ray[n].y or ray[n].range)

***To Cameras:***

  - img = myRobot.getImage()*
  
*The function returns an array with the width, height of each frame and a buffer with the color components of each pixel. The images are 150x100. The next video show the cameras support: https://www.youtube.com/watch?v=JTzYaz_EOuU&feature=youtu.be
