AFRAME.registerComponent('spectator',{
    'schema': {
      canvas: {
        type: 'string',
        default: ''
      },
      // desired FPS of spectator dislay
      fps: {
        type: 'number',
        default: 30.0
      }
    },
    'init': function() {
      $(document).ready(()=>{
        var targetEl = document.querySelector(this.data.canvas);
        this.counter = 0;
        this.renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
        this.renderer.id = "robotCam";
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( targetEl.offsetWidth, targetEl.offsetHeight );
        // creates spectator canvas
        targetEl.appendChild(this.renderer.domElement);
        targetEl.style.display = "none";

        this.canvas2d = document.createElement('canvas');
        this.canvas2d.id = "camera2";
        this.canvas2d.width = this.renderer.domElement.width;
        this.canvas2d.height = this.renderer.domElement.height;
        this.canvas2d.style.display="none"; //Mantain this not displayed, to display camera change targetEl

        targetEl.appendChild(this.canvas2d);
        this.getCameraInfo(); // references the function of the component getCameraInfo (last lines)
      });
    },
    'tick': function(time, timeDelta) {
      var loopFPS = 1000.0 / timeDelta;
      var hmdIsXFasterThanDesiredFPS = loopFPS / this.data.fps;
      var renderEveryNthFrame = Math.round(hmdIsXFasterThanDesiredFPS);
      if(this.counter % renderEveryNthFrame === 0){
        this.render(timeDelta);
      }
      this.counter += 1;
    },
    'render': function(){
      this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
      let strDataURI = this.renderer.domElement.toDataURL();
      let ctx = this.canvas2d.getContext( '2d' );
      let img = new Image;

      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
      img.src = strDataURI;
    },
    'getCameraInfo': function(){
        console.log(this.el.object3DMap.camera);
    },
  });
