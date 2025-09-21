let dojoBG;
function preload(){
    dojoBG = loadImage('assets/dojobackground.png');
}
function setup(){
    new Canvas(800, 600);
    world.gravity.y = 10;
}
function draw(){
    image(dojoBG, 0, 0, 800, 600);
}
