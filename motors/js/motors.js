
var velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0}

$(document).ready(function() {
	var RouterPrx = Glacier2.RouterPrx;
	var SetterMotorsPrx = jderobot.SetterMotorsPrx;
	var MotorsPrx = jderobot.MotorsPrx;
    
    function setVelocity(velocity){

        var pibot = document.querySelector('#a-pibot');

        pibot.body.velocity.set(velocity.x, velocity.y, velocity.z)
        pibot.body.angularVelocity.set(velocity.ax, velocity.ay, velocity.az)
        
        console.log(velocity)
    }


	var MotorsI = Ice.Class(jderobot.Motors, {
        setV: function(data)
        {
            velocity.x = data
            setVelocity(velocity)
        },
        setW: function(data)
        {
            velocity.ay = data*10
            setVelocity(velocity)
        },
        setL: function(data)
        {
            velocity.y = data
            setVelocity(velocity)
        },
        getV: function()
        {
            return velocity.x;
        },
        getW: function()
        {
            return velocity.az;
        },
        getL: function()
        {
            return velocity.y;
        }
	});
    
	async function signin(){

		let id = new Ice.InitializationData();
        id.properties = Ice.createProperties();
        let communicator = Ice.initialize(id);

        const routerBase = communicator.stringToProxy("DemoGlacier2/router:ws -p 5063 -h localhost");

        const router = await Glacier2.RouterPrx.checkedCast(routerBase);

        communicator.setDefaultRouter(router);

        const base = communicator.stringToProxy("setMotors:tcp -h localhost -p 10000");

        await router.createSession("userid", "xxx");





        let timeout = await router.getACMTimeout()
        const connection = router.ice_getCachedConnection();
        if(timeout > 0)
        {
            connection.setACM(timeout, undefined, Ice.ACMHeartbeat.HeartbeatAlways);
        }







        const twoway = await jderobot.SetterMotorsPrx.checkedCast(base);

        const adapter = await communicator.createObjectAdapterWithRouter("MotorsAdapter", router);

        await adapter.activate();

        const category = await router.getCategoryForClient();

        const motorsImpl = new MotorsI();
		const motors = motorsImpl;

        const motorsIdent = new Ice.Identity();
        motorsIdent.name = "Motors";
		motorsIdent.category = category;

		const twowayR = MotorsPrx.uncheckedCast(adapter.add(motors, motorsIdent));

		context = new Ice.Context();
        context.set("_fwd", "t");
        await twoway.setMotors(twowayR, context);
        //await twoway.initiateCallback(twowayR, "");
		//await motorsImpl.callbackOK();


	}

    signin()

});