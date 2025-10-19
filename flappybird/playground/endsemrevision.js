let background;
let square;
let length;
let width;
function preload(){
background = loadImage('assets/background-day.png');
square = loadImage('assets/redbird-midflap.png');
width = 500;
length = 700;
}
function setup(){
background = new Canvas(width, length)
}
function draw(){
square = new Sprite
square.x = width/2
square.y = length/2
}