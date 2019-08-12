var v = 0 ;
var w = 0;
var intervalInfrared;

function brake(){
  v += -1
  myRobot.setV(v)
}

function speed() {
  v += 1
  myRobot.setV(v)
};

function right() {
  w += 0.5
  myRobot.setW(w);
};

function left() {
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
