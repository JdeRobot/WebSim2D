
var intervalInfrared;

function brake(){
  var v
  v = myRobot.getV()
  v += -1
  myRobot.setV(v)
}

function speed() {
  var v
  v = myRobot.getV()
  v += 1
  myRobot.setV(v)
};

function right() {
  var w
  w = myRobot.getW()
  w += 0.5
  myRobot.setW(w);
};

function left() {
  var w
  w = myRobot.getW()
  w += -0.5
  myRobot.setW(w)
};

function getInfrared(){

    intervalInfrared = setInterval(function(){
    var infrared = document.getElementById("infrared");
    var sInfrared = myRobot.getInfrared();
    infrared.innerHTML = '<p id="infrared"><button class = "infrared" onclick="getInfrared()">Get Infrared</button>'
    + '<p> Front -> R: '+sInfrared.Front[0]+" G: "+sInfrared.Front[1]+" B: "+sInfrared.Front[2]+'</p>'
    + '<p> Left -> R: '+sInfrared.Left[0]+" G: "+sInfrared.Left[1]+" B: "+sInfrared.Left[2]+'</p>'
    + "<p> Right -> R: "+sInfrared.Right[0]+" G: "+sInfrared.Right[1]+" B: " +sInfrared.Right[2]+'</p></p>';
  },1);

}


function setImage(){
  var div = document.getElementById("sensor");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = myRobot.getImage();
  canvas.width = img.width;
  canvas.height = img.height;
  var idata = ctx.createImageData(img.width, img.height);
  idata.data.set(img.buffer);
  ctx.putImageData(idata, 0, 0);
  div.appendChild(canvas);
  var imgInterval = setInterval(function(){
    img = myRobot.getImage();
    canvas.width = img.width;
    canvas.height = img.height;
    idata = ctx.createImageData(img.width, img.height);
    idata.data.set(img.buffer);
    ctx.putImageData(idata, 0, 0);
  },1000);

}
