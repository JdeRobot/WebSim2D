
class CameraI extends jderobot.Camera
{

    constructor(canvasId) {
        super()
        this.canvas = document.querySelector("#"+canvasId);
    }

    setCameraDescription(data /* , current */)
    {
        console.log("setCameraDescription: "+ data);
    }

    getCameraDescription()
    {
        return new jderobot.CameraDescription();
    }

    startCameraStreaming()
    {
        return 1;
    }

    stopCameraStreaming()
    {
        return 1;
    }

    reset()
    {
        return 1;
    }

    getImageDescription()
    {
        return new jderobot.ImageDescription();
    }

    getImageFormat()
    {
        return new jderobot.ImageFormat();
    }

    getImageData_async(cb, format, current)
    {
        let ctx = this.canvas.getContext( '2d' );

        let  imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let data  = new Uint8Array(imageData.width*imageData.height*3);

        let j = 0;
        let i = 0;
        for (i=0; i < imageData.data.length; i+=4){
            data[j] = imageData.data[i];
            data[j+1] = imageData.data[i+1];
            data[j+2] = imageData.data[i+2];
            j+=3;
        }


        let msgImage = new jderobot.ImageData();
        let desc = new jderobot.ImageDescription();
        msgImage.pixelData = data;
        desc.width = imageData.width;
        desc.height = imageData.height;
        desc.format = "RGB8";
        msgImage.description = desc;
        cb.ice_response(msgImage);

        return ;
    }

}


class MotorsI extends jderobot.Motors
{
    constructor(robotId){
        super();
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
        this.robot = document.querySelector('#'+robotId);
    }
    setV(v){
        this.velocity.x = v;
        this.setVelocity();
    }
    setW(w){
        this.velocity.ay = w*10;
        this.setVelocity();

    }
    setL(l){
        this.velocity.y = l;
        this.setVelocity();

    }
    getV(){
        return this.velocity.x;
    }
    getW(){
        return this.velocity.az;
    }
    getL(){
        return this.velocity.y;
    }
    getRotation(){
      return this.robot.getAttribute('rotation');
    }
    setVelocity(){
      let rotation = this.getRotation();
      let newpos = updatePosition(rotation, this.velocity, this.robot.body.position);
      this.robot.body.position.set(newpos.x, newpos.y, newpos.z);
      this.robot.body.angularVelocity.set(this.velocity.ax, this.velocity.ay, this.velocity.az);
    }
}

function updatePosition(rotation, velocity, robotPos){
  let x = (velocity.x/10) * Math.cos(rotation.y * Math.PI/180);
  let z = (velocity.x/10) * Math.sin(rotation.y * Math.PI/180);

  robotPos.x += x;
  robotPos.z -= z;

  return robotPos;
}
