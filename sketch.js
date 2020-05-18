var h = window.innerHeight - 50,
		w = window.innerWidth - 50;

var pointsX = 50,
		pointsY = parseInt(h/(w/pointsX))

var randomColors = false;

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

	createCanvas(w, h);
	background(51);
	noStroke();
	img.resize(pointsX, pointsY);
	img.loadPixels();
	var pix = img.pixels;
	console.log(pix);
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
		points[p].flee(mouseX, mouseY);
		points[p].steer();
		points[p].update();
		points[p].show();
	}
}
