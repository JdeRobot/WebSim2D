# web-VRviewer

# web-VRviewer


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

References:

[A-frame - Framework](https://aframe.io/docs/0.8.0/introduction/)

[A-frame - Github](https://github.com/aframevr/aframe)
