function Point(x,y,c){
	this.position = createVector(x,y);
	this.home = createVector(this.position.x, this.position.y);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);
	this.topSpeed = 50;
	this.color = c;
}

Point.prototype.show = function () {
	fill(this.color);
	circle(this.position.x, this.position.y, 10);
};

Point.prototype.steer = function () {
  this.desired = p5.Vector.sub(this.home, this.position)
	//var steer = p5.Vector.sub(this.desired, createVector(this.velocity.x^2, this.velocity.y^2))
	var steer = p5.Vector.sub(this.desired, this.velocity)
	//steer.mult(5)
	this.applyForce(steer);
};

Point.prototype.flee = function (mx, my) {
	var desired = p5.Vector.sub(createVector(mx,my), this.position)
	var distance = desired.mag();
	if (distance<50){
		desired.mult(-20);
	}else{
		return;
	}

	var fleeSteer = p5.Vector.sub(desired, this.velocity);
	this.applyForce(fleeSteer)
}

Point.prototype.update = function () {

	this.acceleration.setMag(0.8);
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.topSpeed);
	// if(this.velocity.mag()<0.9 && this.desired.mag()<3){
	// 	//this.position = this.home;
	// 	this.velocity = createVector(0,0);
	// }
	this.position.add(this.velocity);
	this.acceleration.mult(0);
};

Point.prototype.applyForce = function (force) {
  this.acceleration.add(force);
};
