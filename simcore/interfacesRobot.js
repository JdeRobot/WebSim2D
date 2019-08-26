
var myRobot;
var map = [];
var fondo = new Image();
var nray = 25;
var raymax = 200;
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
        this.canvas.id = "myCanvas"
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
    this.angle =0;
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
        ctx.drawImage(fondo, 0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(1200, 380, 40, 40);
        ctx.fillStyle = "green";
        ctx.fillRect(250, 420, 50, 50);
        ctx.save();
         ctx.translate(this.x, this.y);
         ctx.rotate(this.angle);
         ctx.drawImage(this.image,
                 -this.width/2,
                 -this.height/2,
                 this.width, this.height);
         ctx.restore();
         imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
         //getMap(imgData,ctx.canvas.width, ctx.canvas.height);
         this.raycast = setRayCast(this.w,this.x+54*Math.cos((this.w * Math.PI/180)),
                      this.y-54*Math.sin((this.w * Math.PI/180)), ctx);
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
      this.xInfraredF = this.x+52*Math.cos((this.w * Math.PI/180));
      this.yInfraredF = this.y-52*Math.sin((this.w * Math.PI/180));
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
      this.w = 0
    }

}

function updateScene(){
  myScene.clear();
  myRobot.newPos();
  myRobot.update();
}

function getMap(pixels, width, height) {
  var i = 0;
  for (var y = 0; y < height; y += 1){
    map[y] = []
    for (var x = 0; x < width; x += 1){
      if (pixels[i] == 255 && pixels[i+1] == 255 && pixels[i+2] == 255){
        map[y][x]=0;
      } else if (pixels[i]== 0 && pixels[i+1] == 0 && pixels[i+2]==255) {
        map[y][x]=0;
      } else {
        map[y][x]=1;
      }
      i += 1
    }
  }
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
      bx = x + (r-1)*Math.cos(rayangle);
      by = y - (r-1) * Math.sin(rayangle);
      dx = x + r*Math.cos(rayangle);
      dy = y - r * Math.sin(rayangle);
      var pixel = ctx.getImageData(dx,dy,1,1).data;
      var bpixel = ctx.getImageData(bx,by,1,1).data;
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
    raycast[ray].x = dx;
    raycast[ray].y = dy;
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
