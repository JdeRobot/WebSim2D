var v = 0 ;
var w = 0;

function brake(){
  v += -1
  myRobot.setV(v)
}

function speed() {
  v += 1
  myRobot.setV(v)
};

function right() {
  w += 1
  myRobot.setW(w);
};

function left() {
  console.log("left");
  w += -1
  myRobot.setW(w)
};
