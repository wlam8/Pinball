//World is 400,650
//Ball has 20 Diameter
function createBoundaries(world, cWidth, cHeight) {
	createGround(world);

	//Ceiling
	createBox(world, cWidth/2, 0, cWidth/2, 10);
	createConcave(world, 200, 200, 380/2, 10);
	
	//Walls
	createArc(world, 200, 200, 169, 140, 10);
	createBox(world, 0+5, cHeight/2, 5, cHeight/2);
	
	//'Candycane' wall
	createBox(world, cWidth-5, cHeight/2, 5, cHeight/2);
	createPoly(world, 340, 200, [[0, 0], [29, 0], [29, 450], [0, 450]], true);
	
	//Left ramp
	createPoly(world, 10, 300, [[0, 0], [0, -100], [5, -50]], true);
	createPoly(world, 10, 300, [[0, 0], [5, -50], [15, -8]], true);
	createPoly(world, 10, 300, [[0, 0], [15, -8], [30, 15]], true);

	//Right ramp
	createPoly(world, 340, 300, [[0, 0], [-5, -50], [0, -100]], true);
	createPoly(world, 340, 300, [[0, 0], [-15, -8], [-5, -50]], true);
	createPoly(world, 340, 300, [[0, 0], [-30, 15], [-15, -8]], true);

	//Area around left flipper
	createPoly(world, 10, 300, [[0, 0], [30, 15], [30, 215], [0, 200]], true);
	createPoly(world, 10, 500, [[0, 0], [115, 57.5], [0, 57.5]], true);
	createPolyBumper(world, 60, 427, [[0, 0], [50, 100], [0, 75]]);
	createPoly(world, 40, 315, [[0, 0], [30, 35], [30, 65], [0, 85]], true);
	
	//Area around right flipper
	createPoly(world, 340, 300, [[0, 0], [0, 200], [-30, 215], [-30, 15]], true);
	createPoly(world, 340, 500, [[0, 0], [0, 57.5], [-115, 57.5]], true);
	createPolyBumper(world, 290, 427, [[0, 0], [0, 75], [-50,100]]);
	
	//Bumpers
	createCircleBumper(world, 220, 140, 25);
	createCircleBumper(world, 140, 190, 25);
	createCircleBumper(world, 230, 230, 25);
    
	return world;
}
