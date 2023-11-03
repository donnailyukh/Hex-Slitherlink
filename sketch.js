const dark = "#1a1236";
const white = "#fff";
const med = "#999";

var game;
var w;
var margin;

function setup(){
  w = min(windowWidth, windowHeight);
  margin = 30;
  createCanvas(w, w);
  game = new Game(7, w, margin);
}

function drawPointGrid(){
  noFill();
  stroke(white);
  strokeWeight(2);
  drawingContext.setLineDash([]);
  
  for (const v of game.verticies) {
    point(v.x, v.y);
  }
}

function drawLines() {
  noFill();
  stroke(med);
  strokeWeight(1);
  drawingContext.setLineDash([1, 4]);
  
  for (const l of game.lines) {
    line(l.v1.x, l.v1.y, l.v2.x, l.v2.y);
  }
}

function drawBoard() {
  drawLines();
  drawPointGrid();
  //drawNumbers();
}

//window resize will be tough because point and line objects depend on coordinates
//so when game is being played, this would mess up logic
//fix later if this gets thought through properly.
/*function windowResized() {
  w = min(windowWidth, windowHeight);
  resizeCanvas(w, w);
  game.redraw(w);
}*/

function draw(){
  background(dark);
  
  drawBoard();
  

  //noLoop()
}