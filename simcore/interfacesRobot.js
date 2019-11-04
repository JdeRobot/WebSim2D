
var myRobot;
var map = [];
var fondo = new Image();
var nray = 15;
var raymax = 200;
var cray = []
fondo.src = "../assets/resources/follow_line.png";
var myScene= {
    canvas : document.createElement("canvas"),
    start : function() {
        var div = document.getElementById("myIFrame")
        var cs = getComputedStyle(div);
        var width = parseInt(cs.getPropertyValue('width'), 10);
        var height = parseInt(cs.getPropertyValue('height'), 10);
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.id = "myCanvas";
        this.context = this.canvas.getContext("2d");
        var ctx = this.context
        div.appendChild(this.canvas);
        this.frameNo = 0;

        this.interval = setInterval(updateScene, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

function startScene(){
  var div = document.getElementById("myIFrame")
  var cs = getComputedStyle(div);
  var width = parseInt(cs.getPropertyValue('width'), 10);
  var height = parseInt(cs.getPropertyValue('height'), 10);
  myRobot = new RobotI(100, 100, "../assets/models/turtle.png", 50,140, "image");
  myScene.start();
}

function RobotI(width, height, color, x, y, type) {
    this.type = type;
    this.image = new Image();
    this.image.src = color;
    this.width = width;
    this.height = height;
    this.v = 0;
    this.w = 0;
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.xInfraredL = this.x;
    this.xInfraredR = this.x;
    this.yInfraredL = this.y
    this.yInfraredR = this.y;
    this.xInfraredF = this.x;
    this.yInfraredF = this.y;
    this.raycast;
    var imgData;
    this.update = function() {
        ctx = myScene.context;
        ctx.save();
         ctx.translate(this.x, this.y);
         ctx.rotate(this.angle);
         ctx.drawImage(this.image,
                 -this.width/2,
                 -this.height/2,
                 this.width, this.height);
         let src = cv.imread('myCanvas');
         let dst1 = new cv.Mat();
         let low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
         let high = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 0, 255]);
         cv.inRange(src, low, high, dst1);
         src.delete(); low.delete(); high.delete();
         ctx.restore();
         ctx.drawImage(fondo, 0,0,ctx.canvas.width, ctx.canvas.height);
         ctx.fillStyle = "red";
         ctx.fillRect(1170, 380, 50, 50);
         ctx.fillStyle = "green";
         ctx.fillRect(175, 55, 100, 25);
         ctx.save();
         src = cv.imread('myCanvas');
         let dst2 = new cv.Mat();
         low = new cv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
         high = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 0, 255]);
         cv.inRange(src, low, high, dst2);
         src.delete(); low.delete(); high.delete();
         ctx.translate(this.x, this.y);
         ctx.rotate(this.angle);
         ctx.drawImage(this.image,
                 -this.width/2,
                 -this.height/2,
                 this.width, this.height);
         ctx.restore();
         let dst = new cv.Mat();
         let mask = new cv.Mat();
         let dtype = -1;
         cv.subtract(dst2, dst1, dst, mask, dtype);
         cv.threshold(dst, dst, 177, 200, cv.THRESH_BINARY);
         let contours = new cv.MatVector();
         let hierarchy = new cv.Mat();
         cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
         let cnt = contours.get(0);
         let rect;
         try{
           rect = cv.boundingRect(cnt);
           cnt.delete();
         } catch (e) {
           rect = {}
           rect.x = null;
           rect.y = null;
         }
         dst1.delete(); dst2.delete(); dst.delete(); mask.delete();
         contours.delete(); hierarchy.delete();
         if (rect.x != null){
           var pc = {}
           pc.x = this.x;
           pc.y = this.y
           var check = checkCollision(rect,pc,this.w);
           if (check && this.v>=0){
             this.newPos();
           } else if (!check && this.v<=0) {
             this.newPos();
           } else {
             this.v = 0;
           }
         } else {
           this.newPos();
         }
         imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
         this.raycast = setRayCast(this.w,this.x+53*Math.cos((this.w * Math.PI/180)),
                      this.y-53*Math.sin((this.w * Math.PI/180)), ctx);
    }
    this.newPos = function() {
        this.x += this.v/10*Math.cos(this.w * Math.PI/180);
        this.y += this.v/10*Math.sin(-this.w * Math.PI/180);


    }

    this.setV = function(v){
      this.v = v
    }

    this.setW = function(w){
      this.angle = -w*Math.PI/180
      this.w = w
    }

    this.getV = function(){
      return this.v
    }

    this.getInfrared = function(){

      this.xInfraredL = this.x+47*Math.cos(((this.w * Math.PI/180)+(15.26*Math.PI/180)))
      this.xInfraredR = this.x+47*Math.cos(((this.w * Math.PI/180)+(-15.26*Math.PI/180)))
      this.yInfraredL = this.y- 47*Math.sin(((this.w * Math.PI/180)+(15.26*Math.PI/180)))
      this.yInfraredR = this.y-47*Math.sin(((this.w * Math.PI/180)+(-15.26*Math.PI/180)))
      this.xInfraredF = this.x+51*Math.cos((this.w * Math.PI/180));
      this.yInfraredF = this.y-51*Math.sin((this.w * Math.PI/180));
      ctx = myScene.context;
      var iLeft = ctx.getImageData(this.xInfraredL,this.yInfraredL,1,1).data;
      var iRight = ctx.getImageData(this.xInfraredR,this.yInfraredR ,1,1).data;
      var iFront= ctx.getImageData(this.xInfraredF,this.yInfraredF ,1,1).data;
      var infrared = {};
      infrared.Left = [iLeft[0], iLeft[1],iLeft[2]];
      infrared.Right = [iRight[0], iRight[1],iRight[2]];
      infrared.Front = [iFront[0], iFront[1],iFront[2]];
      return infrared
    }

    this.getRayCast = function(){
      return this.raycast;
    }

    this.getW = function(){
      return this.w
    }

    this.clearVelocity = function(){
      this.v = 0
    }

    this.getImage = function(){
      var width = 150;
      var height = 100;
      var pixel = [];
      var maxr = width/nray;
      for (var ray = 0; ray<nray;ray++){
        for (var r = 1; r <= maxr; r++){
          pixel[ray*maxr+r] = cray[ray]
        }
      }
      var img = [];
      for (var y = 0; y < height; y++){
        for (var x = 0; x < width; x++){
          var pos = (y*width+x)*4;
          img[pos] = pixel[x+1][0];
          img[pos+1] = pixel[x+1][1];
          img[pos+2] = pixel[x+1][2];
          img[pos+3] = pixel[x+1][3];
        }
      }
      var imgData = [];
      imgData.width = width;
      imgData.height = height;
      imgData.buffer = img;
      return imgData;
    }

}

function updateScene(){
  myScene.clear();
  myRobot.update();
}


function checkCollision(p,pc,w){
  var pd = {}
  var v;
  pd.x = pc.x+50*Math.cos((w * Math.PI/180));
  pd.y = pc.y-52*Math.sin((w * Math.PI/180));

  if ((pd.x -pc.x) >=0 && (pd.y-pc.y)<=0){
    if (pc.x<=p.x &&  pc.y >= p.y) {
      v = false;
    } else if (pc.x>=p.x &&  pc.y >= p.y) {
      v = false;
    } else if (pc.x>=p.x &&  pc.y <= p.y) {
      v = true
    } else if (pc.x<=p.x &&  pc.y <= p.y) {
      v = true;
    }
  } else if ((pd.x -pc.x) <=0 && (pd.y-pc.y)<=0) {
    if (pc.x<=p.x &&  pc.y >= p.y) {
      v = false;
    } else if (pc.x>=p.x &&  pc.y >= p.y) {
      v = false;
    } else if (pc.x>=p.x &&  pc.y <= p.y) {
      v = true
    } else if (pc.x<=p.x &&  pc.y <= p.y) {
      v = true;
    }
  } else if ((pd.x -pc.x) <=0 && (pd.y-pc.y)>=0) {
      if (pc.x<=p.x &&  pc.y >= p.y) {
        v = true;
      } else if (pc.x>=p.x &&  pc.y >= p.y) {
        v = true;
      } else if (pc.x>=p.x &&  pc.y <= p.y) {
        v = false;
      } else if (pc.x<=p.x &&  pc.y <= p.y) {
        v = false;
      }
    } else if ((pd.x -pc.x) >=0 && (pd.y-pc.y)>=0) {
        if (pc.x<=p.x &&  pc.y >= p.y) {
          v = true;
        } else if (pc.x>=p.x &&  pc.y >= p.y) {
          v = true;
        } else if (pc.x>=p.x &&  pc.y <= p.y) {
          v = false;
        } else if (pc.x<=p.x &&  pc.y <= p.y) {
          v = false;
        }
  }
  return v
}

function setRayCast(angle,x,y, ctx){
  var raycast = [];
  var aray = 120/nray;
  for (var ray = 0; ray < nray; ray++){
    raycast[ray] = [];
    var rayangle = (60-ray*aray+angle)*(Math.PI/180)
    var dx = 0
    var dy = 0
    var collision = false;
    var r = 1;
    while (!collision && r <=raymax){
      dx = x + (r-1)*Math.cos(rayangle);
      dy = y - (r-1) * Math.sin(rayangle);
      var pixel = ctx.getImageData(dx,dy,1,1).data;
      if (pixel[2] > pixel[1] && pixel[2] > pixel[0]){
        r+=2;
      } else if (pixel[0] == 255 && pixel[1] == 255 && pixel[2] == 255) {
        r+=2;
      } else if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 255) {
        r+=2;
      } else {
        collision = true;
      }
    }

    var cx = x + (r+4)*Math.cos(rayangle);
    var cy = y - (r+4) * Math.sin(rayangle);
    var cpixel = ctx.getImageData(cx,cy,1,1).data;

    if (cpixel[2] > cpixel[1] && cpixel[2] > cpixel[0]){
      cpixel[0] = 255;
      cpixel[1] = 255;
      cpixel[2] = 255;
      cpixel[3] = 255;
    }
    cray[ray] = cpixel;
    raycast[ray].x = Math.round((dx)*100)/100;
    raycast[ray].y = Math.round((dy)*100)/100;
    raycast[ray].range = Math.round((r-1)*100)/100;;
  }

  for (var ray = 0; ray<nray; ray++){
    dx = raycast[ray].x;
    dy = raycast[ray].y;
    ctx.lineWidth = 1;
		ctx.strokeStyle = "#E6C509";
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(dx, dy);
		ctx.stroke();
  }
  return raycast
}
