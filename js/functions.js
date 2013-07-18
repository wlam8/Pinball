function createBall(world, x, y, rad, fixed) {
	var ballSd = new b2CircleDef();
	if (!fixed) ballSd.density = 1.0;
	ballSd.radius = rad || 10;
	ballSd.restitution = 0.2;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
};


function createPoly(world, x, y, points, fixed) {
	var polySd = new b2PolyDef();
	if (!fixed) polySd.density = 1.0;
	polySd.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd.vertices[i].Set(points[i][0], points[i][1]);
	}
	var polyBd = new b2BodyDef();
	polyBd.AddShape(polySd);
	polyBd.position.Set(x,y);
	return world.CreateBody(polyBd)
};


function createCircleBumper(world, x, y, rad) {
	var ballSd = new b2CircleDef();
	ballSd.radius = rad || 10;
	ballSd.restitution = 0.8;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
};


function createPolyBumper(world, x, y, points) {
	var polySd = new b2PolyDef();
	polySd.restitution = 1.1;	
	polySd.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd.vertices[i].Set(points[i][0], points[i][1]);
	}
	var polyBd = new b2BodyDef();
	polyBd.AddShape(polySd);
	polyBd.position.Set(x,y);
	return world.CreateBody(polyBd)
};


function createArc(world, x, y, outerRadius, innerRadius, smoothness){
	var degree = 0;
	while(degree<Math.PI){
        var currentOuterX = outerRadius * Math.cos(degree);
        var currentOuterY = -outerRadius * Math.sin(degree);
        var currentInnerX = innerRadius * Math.cos(degree);
        var currentInnerY = -innerRadius * Math.sin(degree);
				
		degree=degree+(Math.PI/2)/smoothness;

        var nextOuterX = outerRadius * Math.cos(degree);
        var nextOuterY = -outerRadius * Math.sin(degree);
        var nextInnerX = innerRadius * Math.cos(degree);
        var nextInnerY = -innerRadius * Math.sin(degree);
		
		var ceilingDef = new b2PolyDef();
		ceilingDef.vertexCount = 4;
		ceilingDef.vertices[0].Set(nextOuterX, nextOuterY);
		ceilingDef.vertices[1].Set(currentOuterX, currentOuterY);
		ceilingDef.vertices[2].Set(currentInnerX, currentInnerY);
		ceilingDef.vertices[3].Set(nextInnerX, nextInnerY);
		//ceilingDef.density = 1.0;
		//ceilingDef.friction = 0.3;
		ceilingDef.restitution = 0.1;

		var ceilingBd = new b2BodyDef();
		ceilingBd.AddShape(ceilingDef);
		ceilingBd.position.Set(x, y);
		world.CreateBody(ceilingBd);
	}
}


function createConcave(world, x, y, radius, smoothness){
	//Top right ceiling
	var degree = 0;
	while(degree<Math.PI/2){
        var currentX = radius * Math.cos(degree);
        var currentY = -radius * Math.sin(degree);
				
		degree=degree+(Math.PI/2)/smoothness;

        var nextX = radius * Math.cos(degree);
        var nextY = -radius * Math.sin(degree);
		
		var ceilingDef = new b2PolyDef();
		ceilingDef.vertexCount = 3;
		ceilingDef.vertices[0].Set(radius, -radius);
		ceilingDef.vertices[1].Set(currentX, currentY);
		ceilingDef.vertices[2].Set(nextX, nextY);
		//ceilingDef.density = 1.0;
		//ceilingDef.friction = 0.3;
		ceilingDef.restitution = 0.1;

		var ceilingBd = new b2BodyDef();
		ceilingBd.AddShape(ceilingDef);
		ceilingBd.position.Set(x, y);
		world.CreateBody(ceilingBd);
	}
	
	//Top left ceiling
	degree = Math.PI/2;
	while(degree<Math.PI){
        var currentX = radius * Math.cos(degree);
        var currentY = -radius * Math.sin(degree);
				
		degree=degree+(Math.PI/2)/smoothness;

        var nextX = radius * Math.cos(degree);
        var nextY = -radius * Math.sin(degree);
		
		var ceilingDef = new b2PolyDef();
		ceilingDef.vertexCount = 3;
		ceilingDef.vertices[0].Set(-radius, -radius);
		ceilingDef.vertices[1].Set(currentX, currentY);
		ceilingDef.vertices[2].Set(nextX, nextY);
		//ceilingDef.density = 1.0;
		//ceilingDef.friction = 0.3;
		ceilingDef.restitution = 0.1;

		var ceilingBd = new b2BodyDef();
		ceilingBd.AddShape(ceilingDef);
		ceilingBd.position.Set(x, y);
		world.CreateBody(ceilingBd);
	}		
}


function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300/2);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	return world;
}


function createGround(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(185, 50);
	groundSd.restitution = 0.2;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(185, 700);
	return world.CreateBody(groundBd)
}


function createBall(world, x, y) {
	var ballSd = new b2CircleDef();
	ballSd.density = 1.0;
	ballSd.radius = 20;
	ballSd.restitution = 1.0;
	ballSd.friction = 0;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
}


function createBox(world, x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	return world.CreateBody(boxBd)
}


//Old function
function concaveCircle(world, x, y, radius, thickness, minicircles, beginCircle, endCircle){
    var rad = radius + thickness;
    for (var degree=beginCircle; degree<=endCircle; degree=degree+2*Math.PI/minicircles){
        var yCoord = -rad * Math.sin(degree);
        var xCoord = rad * Math.cos(degree);
        
    	createBall(world, x+xCoord, y+yCoord, thickness, true);       
    }
}