let dojoBG;
let fruitGroup;
let fruitType = [];

function preload(){
    dojoBG = loadImage('assets/dojobackground.png');
    let peach;
    let watermelon;
    peach = loadImage('assets/peachwhole.png');
    watermelon = loadImage('assets/watermelonwhole.png');
}
function setup(){
    new Canvas(800, 600);
    world.gravity.y = 10;
}
function draw(){
    image(dojoBG, 0, 0, 800, 600);
}
