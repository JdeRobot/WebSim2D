function initIce(){

	var RouterPrx = Glacier2.RouterPrx;
    var SetterMotorsPrx = jderobot.SetterMotorsPrx;
	var SetterCameraPrx = jderobot.SetterCameraPrx;
    var MotorsPrx = jderobot.MotorsPrx;
	var CameraPrx = jderobot.CameraPrx;


	async function signin(){

		let id = new Ice.InitializationData();
        id.properties = Ice.createProperties();
        let communicator = Ice.initialize(id);

        const routerBase = communicator.stringToProxy(config.Glacier.endpoint + ":ws -h " + config.Glacier.address +" -p " +config.Glacier.port);
	console.log(routerBase);

        const router = await Glacier2.RouterPrx.checkedCast(routerBase);

        communicator.setDefaultRouter(router);

        const baseMotors = communicator.stringToProxy(config.endpointM + ":ws -h " + config.address +" -p "+ config.port);
        const baseCamera = communicator.stringToProxy(config.endpointI + ":ws -h " + config.address +" -p "+ config.port);

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
        const motorsImpl = new MotorsI("a-pibot");
		const motors = motorsImpl;
        const motorsIdent = new Ice.Identity();
        motorsIdent.name = "Motors";
        motorsIdent.category = categoryMotors;

        const MotorsR = MotorsPrx.uncheckedCast(adapter.add(motors, motorsIdent));

        contextMotors = new Ice.Context();
        contextMotors.set("_fwd", "t");
        await setterMotors.setMotors(MotorsR, contextMotors);

        const cameraImpl = new CameraI("camera2");
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

}
