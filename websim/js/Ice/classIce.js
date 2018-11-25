class CameraI extends jderobot.Camera
{

    constructor(img) {
        super()
        this.imageData = img;
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
	postMessage({func:"getImage"});
	onmessage = function(e) {
		switch (e.data.func){
	      	case "setImage":
                    console.log(e.data.img);
		    this.imageData = e.data.img;
		    break;
	      	}
        let data  = new Uint8Array(this.imageData.width*this.imageData.height*3);

        let j = 0;
        let i = 0;
        for (i=0; i < this.imageData.data.length; i+=4){
            data[j] = this.imageData.data[i];
            data[j+1] = this.imageData.data[i+1];
            data[j+2] = this.imageData.data[i+2];
            j+=3;
        }


        let msgImage = new jderobot.ImageData();
        let desc = new jderobot.ImageDescription();
        msgImage.pixelData = data;
        desc.width = this.imageData.width;
        desc.height = this.imageData.height;
        desc.format = "RGB8";
        msgImage.description = desc;
	console.log(msgImage);
        cb.ice_response(msgImage);
       } 
        return ;
    }

}


class MotorsI extends jderobot.Motors
{
    constructor(){
        super();
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
    }
    setV(v){
        this.velocity.x = v;
        self.postMessage({func:"setMotors", velocity: this.velocity});
    }
    setW(w){
        this.velocity.ay = w*10;
        self.postMessage({func:"setMotors", velocity: this.velocity});

    }
    setL(l){
        this.velocity.y = l;
        self.postMessage({func:"setMotors", velocity: this.velocity});

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
    /*getRotation(){
      return this.robot.getAttribute('rotation');
    }
    setVelocity(){
      let rotation = this.getRotation();
      let newpos = updatePosition(rotation, this.velocity, this.robot.body.position);
      this.robot.body.position.set(newpos.x, newpos.y, newpos.z);
      this.robot.body.angularVelocity.set(this.velocity.ax, this.velocity.ay, this.velocity.az);
    }*/
}
