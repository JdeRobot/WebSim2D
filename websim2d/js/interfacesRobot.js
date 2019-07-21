
var myRobot;

var myScene= {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
myRobot = new RobotI(100, 100, "assets/models/turtle.png", window.innerWidth/2, window.innerHeight/2, "image");
myScene.start();
}

function RobotI(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.v = 0;
    this.w = 0;
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myScene.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.v/10*Math.cos(this.w * Math.PI/180);
        this.y += this.v/10*Math.sin(-this.w * Math.PI/180);
    }

    this.setV = function(v){
      this.v = v
    }

    this.setW = function(w){
      this.w = w
    }

    this.getV = function(){
      return this.v
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
