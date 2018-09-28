// MAYBE: Crea las conexiones entre las interfaces de los motores y la camara con ICE

$(document).ready(function() {


	var RouterPrx = Glacier2.RouterPrx;
  var SetterMotorsPrx = jderobot.SetterMotorsPrx;
	var SetterCameraPrx = jderobot.SetterCameraPrx;
  var MotorsPrx = jderobot.MotorsPrx;
	var CameraPrx = jderobot.CameraPrx;


	async function signin(){

		let id = new Ice.InitializationData();
        id.properties = Ice.createProperties();
				//The call to initialize returns an Ice.Communicator reference, which is the main object in the Ice run time
        let communicator = Ice.initialize(id);

        const routerBase = communicator.stringToProxy("DemoGlacier2/router:ws -p 5063 -h localhost");

        const router = await Glacier2.RouterPrx.checkedCast(routerBase);

        communicator.setDefaultRouter(router);

        const baseMotors = communicator.stringToProxy("setMotors:ws -h localhost -p 10000");
        const baseCamera = communicator.stringToProxy("setCamera:ws -h localhost -p 10000");

        await router.createSession("userid", "xxx");



        let timeout = await router.getACMTimeout()
        const connection = router.ice_getCachedConnection();
        if(timeout > 0)
        {
            connection.setACM(timeout, undefined, Ice.ACMHeartbeat.HeartbeatAlways);
        }




        const setterMotors = await jderobot.SetterMotorsPrx.checkedCast(baseMotors);
        const setterCamera = await jderobot.SetterCameraPrx.checkedCast(baseCamera);
        const adapter = await communicator.createObjectAdapterWithRouter("Adapter", router);

        await adapter.activate();

        const categoryMotors = await router.getCategoryForClient();
        const motorsImpl = new MotorsI("a-pibot"); // this is a jderobot.motors modified from js/iceinterfaces.js
		const motors = motorsImpl;
        const motorsIdent = new Ice.Identity();
        motorsIdent.name = "Motors";
        motorsIdent.category = categoryMotors;

        const MotorsR = MotorsPrx.uncheckedCast(adapter.add(motors, motorsIdent));

        contextMotors = new Ice.Context();
        contextMotors.set("_fwd", "t");
        await setterMotors.setMotors(MotorsR, contextMotors);

        const cameraImpl = new CameraI("camera2"); // this is a jderobot.camera modified from js/iceinterfaces.js
        const camera = cameraImpl;
        const camerasIdent = new Ice.Identity();
        const categoryCamera = await router.getCategoryForClient();
        camerasIdent.name = "Camera";
        camerasIdent.category = categoryCamera;

        const CameraR = CameraPrx.uncheckedCast(adapter.add(camera, camerasIdent));



        contextCamera = new Ice.Context();
        contextCamera.set("_fwd", "t");
        await setterCamera.setCamera(CameraR, contextCamera);


	}

    signin()

});
