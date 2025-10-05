let fruitGroup;
let fruitTypes =[];
let dogoBG;
function preload(){
     dogoBG = loadImage('assets/dojobackground.png');
    //declare peach 
    let peach = {
        whole:loadImage('assets/peachwhole.png')
    };
    let watermelon = {
        whole: loadImage('assets/watermelonwhole.png')
    }
    //store the fruit objject into fruitTypes array[]
    fruitTypes = [peach,watermelon];
}
function setup(){
    new Canvas(800,600);
    //set gravity to 10
    world.gravity.y = 10;
    fruitGroup= new Group();
}
function draw(){
    clear();
    image(dogoBG,0,0,width,height);
    // % refers to the remainder so if framecount / by 120 and the remainder is 0 then i call spawnfruit function
    if(frameCount % 120 === 0){
        spawnFruit();
    }
    if(mouse.pressing()){
        trail = new Sprite(mouse.x,mouse.y,7);
        trail.collider = 'none';
        trail.color ="red";
        trail.life = 10;
        sliceFruit();
    }
}

function spawnFruit(){
    let fruitData = random(fruitTypes);
    let randomX = random(300,500);
    let fruit = new fruitGroup.Sprite(randomX,600+20,40); 
    fruit.image = fruitData.whole;
    fruit.type = fruitData;
    fruit.vel.y = random(-10,-14);
    fruit.vel.x = random(-2,2);
    fruit.friction = 0;
}

function sliceFruit(){
    for(let fruit of fruitGroup){
        if(fruit.sliced);
            continue;
    }
    let distance = dist(mouse.x, mouse.y, fruit.x, fruit.y);
        if(distance <((fruit.diameter / 2) + 5)){
                
        }
}