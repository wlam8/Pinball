var initId = 0;
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;

var launcherBody;
var playBallBody;
var flipperBodyL;
var flipperBodyR;

var lives = 3;
var enableControls = false;

//Start, Playing, GameOver
var gameState = "Start";


function step(cnt){
	var stepping = false;
	var timeStep = 1.0/60;
	var iteration = 1;
	world.Step(timeStep, iteration);
	//Check if ball is touching the ground
	if(playBallBody.GetCenterPosition().y > canvasHeight-20){
		lives--;
		if(lives <= 0){
			enableControls = false;
			gameState = "GameOver";
		}
		playBallBody.SetLinearVelocity(new b2Vec2(0, 0));
		playBallBody.SetAngularVelocity(0);
		playBallBody.SetCenterPosition(new b2Vec2(380,600), 0);
	}
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx, gameState, lives);
	setTimeout('step(' + (cnt || 0) + ')', 10);
}
Event.observe(window, 'load', function(){
    //demos.top.initWorld(world);
	ctx = $('canvas').getContext('2d');
	var canvasElm = $('canvas');
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);

	
	createBoundaries(world, canvasWidth, canvasHeight);
	createPlayBall(world);
   	createLauncher(world);
   	createFlippers(world);
   	addKeyboardListeners();

	
	/*
	Event.observe('canvas', 'click', function(e) {
		demos.top.createBall(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop);
	});
	Event.observe('canvas', 'contextmenu', function(e) {
		if (e.preventDefault) e.preventDefault();
		createBox(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop, 10, 10, false);
		return false;
	});*/
	
	step();
});


function createPlayBall(wld){	
	var ballCircleDefinition = new b2CircleDef();
	ballCircleDefinition.density = 1.0;
	ballCircleDefinition.radius = 10;
	ballCircleDefinition.restitution = 0.2;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballCircleDefinition);
	ballBd.position.Set(380,600);
	ballBd.isBullet = true;
	playBallBody = wld.CreateBody(ballBd);
	return wld;
}


function createFlippers(wld){
	var flipperSd = new b2BoxDef();
	var flipperBd = new b2BodyDef();
	flipperBd.AddShape(flipperSd);
    var flipperJointDef = new b2RevoluteJointDef();

      //Data shared by both flippers
	flipperSd.extents.Set(20, 5);
	flipperSd.density = 100.0;

      //Data for left flipper and joint
	flipperBd.position.Set(142, 564.5);
    flipperBodyL = wld.CreateBody(flipperBd);
    flipperJointDef.anchorPoint.Set(142-20+5, 564.5);
    flipperJointDef.body1 = flipperBodyL;
    flipperJointDef.body2 = wld.m_groundBody;
    flipperJointDef.upperAngle = Math.PI * (30/180);
    flipperJointDef.lowerAngle = Math.PI * (-30/180);
	flipperJointDef.enableLimit = true;
    wld.CreateJoint(flipperJointDef);
    
    //Data for right flipper and joint
    flipperBd.position.Set(208, 564.5);
    flipperBodyR = wld.CreateBody(flipperBd);
    flipperJointDef.anchorPoint.Set(208+20-5, 564.5);
    flipperJointDef.body1 = flipperBodyR;
    flipperJointDef.body2 = wld.m_groundBody;
    flipperJointDef.upperAngle = Math.PI * (30/180);
    flipperJointDef.lowerAngle = Math.PI * (-30/180);
	flipperJointDef.enableLimit = true;
    wld.CreateJoint(flipperJointDef);

	return wld;
}


function createLauncher(wld){
	var launcherSd = new b2BoxDef();
	launcherSd.extents.Set(5, 10);
	launcherSd.density = 10.0;
	var launcherBd = new b2BodyDef();
	launcherBd.AddShape(launcherSd);
	launcherBd.position.Set(380, 635);
	
	launcherBody = wld.CreateBody(launcherBd);
	var launcherJointDef = new b2PrismaticJointDef();
	
	launcherJointDef.anchorPoint.Set(380, 635);
	launcherJointDef.body1 = wld.m_groundBody;
	launcherJointDef.body2 = launcherBody;
	launcherJointDef.axis.Set(0.0, 1.0);
	launcherJointDef.lowerTranslation = -10.0;
	launcherJointDef.upperTranslation = 0;
	launcherJointDef.enableLimit = true;
	launcherJointDef.motorSpeed = 0.0; // joint friction
	launcherJointDef.motorForce = 100000.0;
	launcherJointDef.enableMotor = true;
	
	wld.CreateJoint(launcherJointDef);
	
	return wld;
}


function addKeyboardListeners(){
	document.onkeydown = function(evt){
		handleKeydown(evt);
	};
}

function handleKeydown(evt){
    keycode = ((evt.which) || (evt.keyCode));
    switch (keycode) {
        case 32: // space
			if(gameState == "Start"){
				enableControls = true;
				gameState = "Playing";
			}else if(gameState == "GameOver"){
				enableControls = true;
				gameState = "Playing";
				lives = 3;
			}else if(enableControls){
				var force = new b2Vec2(0, -1000.0);
				launcherBody.WakeUp();
				launcherBody.SetLinearVelocity(force);
			}
			break;
        case 65: // a
			if(enableControls){
				flipperBodyL.WakeUp();
				flipperBodyL.SetAngularVelocity(-100);
			}
			break;
        case 83: // s
			if(enableControls){
				flipperBodyR.WakeUp();
				flipperBodyR.SetAngularVelocity(100);
			}
			break;
    }
}


//Start, Playing, GameOver
//var gameState = "Start";
