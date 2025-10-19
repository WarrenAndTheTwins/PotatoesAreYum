let background;
let square;
function preload(){
background = loadImage('assets/background-day.png');
square = loadImage('assets/redbird-midflap.png');
}
function setup(){
world.gravity.y = 10
background = new Canvas(500, 700)
square = new Sprite();
square.x = width/2;
square.y = length/2;
square.collider = "dynamic";
}
function draw(){
image(background,0,0,width,height);
if (mouse.presses()){
    square.velocity.y = -5
}
}