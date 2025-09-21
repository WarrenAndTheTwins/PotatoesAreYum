let dojoBG;
let fruitGroup;
let fruitType = [];

function preload(){
    dojoBG = loadImage('assets/dojobackground.png');
    let peach = {
        whole:loadImage('assets/peachwhole.png')
    };
    let watermelon = {
        whole:loadImage('assets/watermelonwhole.png')
    };
    fruitType = [peach, watermelon]
}
function setup(){
    new Canvas(800, 600);
    world.gravity.y = 10;
}
function draw(){
    clear();
    image(dojoBG, 0, 0, 800, 600);
}
function spawnFruit(){
    let fruitData = random(fruitType);
    let RandomX = random(300, 500);
    let fruit = fruitGroup.Sprite(RandomX, height + 20, 40);
    fruit.image = fruitData.whole;
    fruit.type = fruitData;
    fruit.vel.y = random(-10, -14)
}