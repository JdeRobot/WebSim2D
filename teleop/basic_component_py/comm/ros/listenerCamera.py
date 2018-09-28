import rospy
import roslib
import sys, time
from sensor_msgs.msg import Image as ImageROS
from sensor_msgs.msg import CompressedImage
from scipy.ndimage import filters
import threading
from math import pi as PI
import numpy as np
from jderobotTypes import Image
import cv2
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import CompressedImage



MAXRANGE = 8 #max length received from imageD
MINRANGE = 0


def depthToRGB8(float_img_buff):
    '''
    Translates from 32FC1 Image format to RGB. Inf values are represented by NaN, when converting to RGB, NaN passed to 0

    @param float_img_buff: ROS Image to translate

    @type img: ros image

    @return a Opencv RGB image

    '''
    float_img = np.zeros((float_img_buff.shape[0], float_img_buff.shape[1], 1), dtype = "float32")
    float_img.data = float_img_buff.data


    gray_image=cv2.convertScaleAbs(float_img, alpha=255/MAXRANGE)
    cv_image = cv2.cvtColor(gray_image, cv2.COLOR_GRAY2RGB)

    return cv_image

def imageComp2Image(img,bridge):
    '''
    Translates from ROS CompressedImage to Image Raw.

    @param img: ROS CompressedImage to translate
    @param bridge: bridge to do translation

    @type img: sensor_msgs.msg.CompressedImage
    @type brige: CvBridge
    '''

    np_arr = np.fromstring(img.data, np.uint8)
    image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR) # After this point it returns 0
    method = "GridFAST"
    feat_det = cv2.ORB_create()
    time1 = time.time()
    featPoints = feat_det.detect(
            cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY))
    time2 = time.time()
    return image_np


def imageMsg2Image(img, bridge):
    '''
    Translates from ROS Image to JderobotTypes Image.

    @param img: ROS Image to translate
    @param bridge: bridge to do translation

    @type img: sensor_msgs.msg.Image
    @type brige: CvBridge

    @return a JderobotTypes.Image translated from img

    '''
    image = Image()

    image.width = img.width
    image.height = img.height
    image.format = "RGB8"
    image.timeStamp = img.header.stamp.secs + (img.header.stamp.nsecs *1e-9)
    cv_image=0
    if (img.encoding == "32FC1"):
        gray_img_buff = bridge.imgmsg_to_cv2(img, "32FC1")
        cv_image  = depthToRGB8(gray_img_buff)
    else:
        cv_image = bridge.imgmsg_to_cv2(img, "rgb8")
    image.data = cv_image
    return image

class ListenerCamera:
    '''
        ROS Camera (Image) Subscriber. Camera Client to Receive Images from ROS nodes.
    '''
    def __init__(self, topic, messageType):
        '''
        ListenerCamera Constructor.

        @param topic: ROS topic to subscribe

        @type topic: String

        '''
        self.topic = topic
	self.messageType = messageType
        self.data = Image()
        self.sub = None
        self.lock = threading.Lock()

        self.bridge = CvBridge()
        self.start()

    def __callback (self, img):
        '''
        Callback function to receive and save Images.

        @param img: ROS Image received

        @type img: sensor_msgs.msg.Image

        '''
        if img.format == "jpeg":

            image = imageComp2Image(img, self.bridge)
            cv2.imshow('cv_img', image)
            cv2.waitKey(1)
        else:
        	image = imageMsg2Image(img, self.bridge)
		self.lock.acquire()
        	self.data = image
        	self.lock.release()


    def stop(self):
        '''
        Stops (Unregisters) the client.

        '''
        self.sub.unregister()

    def start (self):
        '''
        Starts (Subscribes) the client.

        '''
	if self.messageType == "CompressedImage":
        	self.sub = rospy.Subscriber(self.topic, CompressedImage, self.__callback)
	else:
        	self.sub = rospy.Subscriber(self.topic, ImageROS, self.__callback)

    def getImage(self):
        '''
        Returns last Image.

        @return last JdeRobotTypes Image saved

        '''
        self.lock.acquire()
        image = self.data
        self.lock.release()

        return image

    def hasproxy (self):
        '''
        Returns if Subscriber has ben created or not.

        @return if Subscriber has ben created or not (Boolean)

        '''
        return hasattr(self,"sub") and self.sub
