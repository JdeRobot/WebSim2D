
var myRobot;

var fondo = new Image();
fondo.src = "../assets/textures/circuit.png";

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
  myRobot = new RobotI(100, 100, "../assets/models/turtle.png", 300,650, "image");
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
    this.update = function() {
        ctx = myScene.context;

        ctx.drawImage(fondo, 0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.save();
         ctx.translate(this.x, this.y);
         ctx.rotate(this.angle);
         ctx.drawImage(this.image,
                 -this.width/2,
                 -this.height/2,
                 this.width, this.height);
         ctx.restore();
         ctx.fillStyle = "red";
         ctx.fillRect(800, 450, this.width, this.height);
         ctx.fillStyle = "green";
         ctx.fillRect(200, 350, this.width, this.height);

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

      this.xInfraredL = this.x+52*Math.cos(((this.w * Math.PI/180)+(Math.PI/2)))
      this.xInfraredR = this.x+52*Math.cos(((this.w * Math.PI/180)+(3*Math.PI/2)))
      this.yInfraredL = this.y- 52*Math.sin(((this.w * Math.PI/180)+(Math.PI/2)));
      this.yInfraredR = this.y-52*Math.sin(((this.w * Math.PI/180)+(3*Math.PI/2)));
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
