let fruitGroup;
let fruitTypes =[];
let dogoBG;
let fruitHalves;
let score = 0;
let missedfruits = 0;

function preload(){
     dogoBG = loadImage('assets/dojobackground.png');
    //declare peach 
    let peach = {
        whole:loadImage('assets/peachwhole.png'),
        half:loadImage('assets/peachhalf.png')
    };
    let watermelon = {
        whole:loadImage('assets/watermelonwhole.png'),
        half: loadImage('assets/watermelonhalf.png')
    }

    
    //store the fruit objject into fruitTypes array[]
    fruitTypes = [peach,watermelon];
}
function setup(){
    new Canvas(800,600);
    //set gravity to 10
    world.gravity.y = 10;
    fruitGroup= new Group();
    fruitHalves = new Group();
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
for (fruits in fruitGroup){
    if (fruits.y > height + 50){
        fruits.remove();
        missedfruits += 1;
    }
}

    stroke(158, 69, 69);
    fill(255); 
    textSize(24);
    textAlign(LEFT, TOP);
    text('Score:' + score, 10, 10);
    text('Missed:' + missedfruits, 200, 10);

   
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
        if(fruit.sliced){
            continue;
        }
        let distance  = dist(mouse.x,mouse.y,fruit.x,fruit.y);
        if(distance<((fruit.diameter/2)+5)){
            const fx = fruit.x;
            const fy = fruit.y;
            fruit.sliced= true;
            fruit.remove();
            splitFruit(fx,fy,fruit.type);
            score += 1;
            break;
        }
    }
}
function splitFruit(x,y,fruitData){
    let left = new fruitHalves.Sprite(x-10,y,40,40);
    left.img = fruitData.half;
    //set the physics
    left.vel.x = -6;
    left.vel.y = random(-7,-3);
    left.rotationSpeed = -7;
    left.life = 60;

    //do for the right as well
    let right = new fruitHalves.Sprite(x-10,y,40,40);
    right.img = fruitData.half;
    //set the physics
    right.vel.x = 6;
    right.vel.y = random(-7,-3);
    right.rotationSpeed = 7;
    right.life = 60;
}