// setup() and draw()
let sprite1, sprite2;

function setup(){
    new Canvas(600,400);

    // gravity
    world.gravity.y = 20;

    // random(255)
}

function draw(){
    background(200);

    if(mouse.presses('left')){
        sprite1 = new Sprite();
        sprite1.x = mouse.x;
        sprite1.y = mouse.y;
        sprite1.collider = 'dynamic';
    }
    if(mouse.presses('right')){
        sprite2 = new Sprite();
        sprite2.x = mouse.x;
        sprite2.y = mouse.y;
        sprite2.collider = 'static';
    }
    
}