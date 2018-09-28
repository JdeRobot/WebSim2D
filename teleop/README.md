# Demo with Teleoperator

![Example](https://github.com/JdeRobot/WebSim/blob/master/teleopDemo/demoTeleop.gif "Example with Camera and motors Entities")

## Install packages 
```
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116 

sudo apt-add-repository "deb http://zeroc.com/download/apt/ubuntu$(lsb_release -rs) stable main"
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 5E6DA83306132997

sudo apt update

sudo apt install ros-kinetic-opencv3

sudo apt install python-matplotlib python-pyqt5 python-pip python-numpy python-pyqt5.qtsvg python-pyqt5.qsci python-yaml

sudo apt install zeroc-glacier2

pip install zeroc-ice==3.6.4

```

## Running the example

In a termintal run:
```
cd basic_component_py 
python basic_component.py basic_component_py.yml
```
For Ice:

In a second terminal run:
```
glacier2router --Ice.Config=config.glacier2
```

In last terminal run:
```
cd ../websim/
python -m SimpleHTTPServer 8000
```

open in your browser localhost:8000.

For Ros:

In a second terminal run:
```
roslaunch rosbridge_server rosbridge_websocket.launch
```

In last terminal run:
Download the repository of JdeRobot github WebSim
```
cd WebSim/websim/
npm install
npm start
