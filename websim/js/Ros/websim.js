var config = {};
$(document).ready(function() {
		try{
			const yaml = require('js-yaml');
			const fs = require('fs');
			config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))
		} catch (e) {
			config.server = "Ros";
			config.port = "10000";
  		config.address = "localhost";
  		config.topicM = "/turtlebotROS/mobile_base/commands/velocity";
  		config.topicI = '/turtlebotROS/cameraL/image_raw';
  		config.endpointM = "setMotors";
  		config.endpointI = "setCamera";
  		config.Glacier = {};
  		config.Glacier.address = "localhost";
  		config.Glacier.port = "5063"
  		config.Glacier.endpoint = "DemoGlacier2/router"
		}

 		if (config.server == "Ros"){
  		initRos();
		} else if (config.server == "Ice"){
  		initIce();
		} else{
  		alert("Server unnknown");
		}
});
