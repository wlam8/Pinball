var background = "black";
var circleBorder = "white";
var circleColor = "#C0C0C0";
var polyColor = "#AF7817";

function drawWorld(world, context, gameState, lives) {
	context.fillStyle = background;
	context.fillRect(0, 0, parseInt($('canvas').width), parseInt($('canvas').height));
	/*for (var j = world.m_jointList; j; j = j.m_next) {
		drawJoint(j, context);
	}*/
	for (var b = world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			drawShape(s, context);
		}
	}
	if(gameState == "Start"){
		drawStartScreen(context);
	}
	if(gameState == "GameOver"){
		drawGameOverScreen(context);
	}
	
	drawLives(context, lives);
	drawInstructions(context);
}


function drawJoint(joint, context) {
	var b1 = joint.m_body1;
	var b2 = joint.m_body2;
	var x1 = b1.m_position;
	var x2 = b2.m_position;
	var p1 = joint.GetAnchor1();
	var p2 = joint.GetAnchor2();
	context.strokeStyle = '#00eeee';
	context.beginPath();
	switch (joint.m_type) {
	case b2Joint.e_distanceJoint:
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		break;

	case b2Joint.e_pulleyJoint:
		// TODO
		break;

	default:
		if (b1 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
		}
		else if (b2 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x1.x, x1.y);
		}
		else {
			context.moveTo(x1.x, x1.y);
			context.lineTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
			context.lineTo(p2.x, p2.y);
		}
		break;
	}
	context.stroke();
}


function drawShape(shape, context) {
	context.strokeStyle = '#ffffff';
	context.lineWidth = 1;
	context.beginPath();
	switch (shape.m_type) {
	case b2Shape.e_circleShape:{
			var circle = shape;
			var centerX = circle.m_position.x;
			var centerY = circle.m_position.y;
			var radius = circle.m_radius;
		 
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		 
			context.fillStyle = circleColor;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = circleBorder;
			/*
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);
	
			// draw radius
			context.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			context.lineTo(pos2.x, pos2.y);
			*/
		}
		break;
	case b2Shape.e_polyShape:{
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
			
			context.fillStyle = polyColor;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = polyColor;
		}
		break;
	}
	context.stroke();
}


function drawStartScreen(context){
	context.fillStyle = "rgba(0, 0, 0, .7)";
	context.fillRect(0, 0, parseInt($('canvas').width), parseInt($('canvas').height));

	context.font = "28pt Calibri";
	context.fillStyle = "#1569C7";
	context.fillText("Welcome", 120, 300);
	context.fillText("Press 'Space' to begin", 40, 350);
}


function drawGameOverScreen(context){
	context.fillStyle = "rgba(0, 0, 0, .7)";
	context.fillRect(0, 0, parseInt($('canvas').width), parseInt($('canvas').height));

	context.font = "28pt Calibri";
	context.fillStyle = "#C11B17";
	context.fillText("Game Over", 110, 300);
	context.fillText("Press 'Space' to restart", 30, 350);
}


function drawLives(context, lives){
	context.font = "18pt Calibri";
	context.fillStyle = "white";
	context.fillText("Lives", 30, 585);

	context.font = "35pt Calibri";
	context.fillText(lives, 40, 630);
}

function drawInstructions(context){
	context.font = "12pt Calibri";
	context.fillStyle = "white";
	context.fillText("Space Bar: Launcher", 2, 15);
	context.fillText("S: Right Flipper", 2, 30);
	context.fillText("A: Left Flipper", 1, 45);
}
