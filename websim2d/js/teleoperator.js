var v = 0 ;
var w = 0;

document.onkeydown = function(a){
  if(a.keyCode === 87){
    w += 1
    myRobot.setW(w);
  } else if (a.keyCode === 68) {
    myRobot.setV(v)
    v += 1
  } else if (a.keyCode === 65) {
    v += -1
    myRobot.setV(v)
  } else if (a.keyCode === 83) {
    w += -1
    myRobot.setW(w)
  } else {
    myRobot.clearVelocity();
  }
}
