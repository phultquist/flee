var h = window.innerHeight - 50,
		w = window.innerWidth - 50;

var pointsX = 50,
		pointsY = parseInt(h/(w/pointsX))

var randomColors = false,
		fixedFlee = false,
		fleeRadius = 50;

var points = [];
let img;
function preload(){
	img = loadImage('image.jpg');
}

function setup() {
	const queryString = window.location.href.toString();
	const url = new URL(queryString);
	if (url.searchParams.get("random") == 1){
		randomColors = true;
	};
	if (url.searchParams.get("fixed") == 1) {
		fixedFlee = true;
	}
	var radParam = url.searchParams.get("radius")
	if (radParam != null){
		fleeRadius = radParam;
	}

	createCanvas(w, h);
	background(51);
	noStroke();
	img.resize(pointsX, pointsY);
	img.loadPixels();
	var pix = img.pixels;
	var colors = [];
	for (i = 0; i < pix.length; i+= 4){
		colors.push(color(pix[i],pix[i+1],pix[i+2],pix[i+3]));
	}
	var newPoint;
	for (r = 0; r < pointsY; r++){
		for (c = 0; c < pointsX; c++){
			var colorp = colors[c+r*pointsX];
			if (randomColors){
				newPoint = new Point((w/(pointsX+1)) * (c+1), (h/(pointsY+1)) * (r+1), color(random(255), random(255), random(255)));
			} else {
				newPoint = new Point((w/(pointsX+1)) * (c+1), (h/(pointsY+1)) * (r+1), colorp);
			}

			newPoint.show();
			points.push(newPoint);
		}
	}

}

function draw() {
	//frameRate(1);
  // put drawing code here
	background(51);
	for (p in points){
		if (fixedFlee){
			points[p].flee(width/2, height/2);
		} else {
			points[p].flee(mouseX, mouseY);
		}
		points[p].steer();
		points[p].update();
		points[p].show();
	}
}
