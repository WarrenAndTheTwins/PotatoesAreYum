let flapSound;
let dieSound;
let pointSound;
let score = 0;
let numImg = [];
let scoreDigits;
let startGame = false;
let startScreenLabel;
let startScreenImage;
let bird, floor; // object declarations
let flapMidImg, flapUpImg, flapDownImg, bg, base; // image declarations
let pipeGroup; // variable for group 
let pipe; // image
let bottomPipe, topPipe; //declaring variable

let gameOverImg; // variable for image
let gameOverLabel; // variable for sprite


function preload(){
    for(let i = 0; i < 10; i++){
        numImg[i] = loadImage = ('assets/' + i + '.png');
    }
    startScreenImage = loadImage('assets/message.png')
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
    flapMidImg = loadImage('assets/yellowbird-midflap.png');    
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');
    gameOverImg = loadImage('assets/gameover.png');
    pipe = loadImage('assets/pipe-green.png');
    flapSound = createAudio('assets/sfx_wings.mp3');
    pointSound = createAudio('assets/sfx_point.mp3');
    dieSound = createAudio('sfx_die.mp3');
}

function setup(){
    new Canvas(400, 600);
    background(220);

    //creating the flappy bird sprite
    bird = new Sprite();//var name = new Sprite(x,y,w,h);
    bird.x = width/2;   //var name = new Sprite(x,y,D);
    bird.y = 200;
    bird.w = 30;
    bird.h = 30;
    bird.img = flapMidImg;

    // set the physic for the bird
    bird.collider = "static";
    bird.mass = 2;
    bird.drag = 0.02;
    bird.bounciness = 0.5;
    bird.visible = false;
    
    //gravity
    world.gravity.y = 10;

    // set up the floor
    floor = new Sprite();
    floor.x = width/ 2;
    floor.y = height - 20;
    floor.w = 400;
    floor.h = 125;
    floor.collider = 'static';
    floor.img = base;

    // setup the group for pipe
    pipeGroup = new Group();
    scoreDigits = new Group();
    scoreDigits.collider = 'none';
    scoreDigits.layer = 1000;

    startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none' )
    startScreenLabel.img = startScreenImage
}

function draw(){
    // redraw the background 
    image(bg, 0, 0, width, height);
    
    if (kb.presses('space') || mouse.presses()){
        startGame = true;
        startScreenLabel.visible = false;
        bird.visible = true;
    }

    if (startGame){
        bird.collider = "dynamic";
        if (kb.presses('space') || mouse.presses('left')){
        bird.velocity.y = -5;
        bird.sleeping = false;
        flapSound.play();
    }

    // changing bird animation up, down and neutral
    if (bird.vel.y < -1){
        bird.img = flapUpImg;
        bird.rotation = -30;
    }
    else if (bird.vel.y > 1){
        bird.img = flapDownImg;
        bird.rotation = 30;
    }
    else{
        bird.img = flapMidImg;
        bird.rotation = 0;
    }

    // spawn pipe pair/ call the function
    if (frameCount === 1){
        spawnPipePair();
    }

    if (frameCount % 90 === 0){
        spawnPipePair(); // spawn new pipes every 90 seconds
    }

    // to clear off pipes that have gone off screen
    for (let pipe of pipeGroup){
        if (pipe.x < -50){
            pipe.remove();
        }
    
    // for (let pipe of pipeGroup){
    //     let pipeRightEdge = pipe.x  + pipe.w /2;//specify right most      
    //     // nice drawing
    //     let birdLeftEdge = bird.x - bird.w/2;
    //     if ( pipeRightEdge < birdLeftEdge && pipe.passed ==false){
    //         pipe.passed = true;
    //         score ++;
    //     }
        for (let pipe of pipeGroup){
            let pipeRightEdge = pipe.x + pipe.w/2;
            let birdLeftEdge = bird.x - bird.w/2;
            if (pipeRightEdge < birdLeftEdge && pipe.passed == false){
                pipe.passed = true; 
                pointSound.play();
                score ++;
            }
        }

    }
    }

    // move the bird x and lock camera
    bird.x += 3; // moves the bird forward by 3 pixes every frame
    camera.x = bird.x;// locking the camera position to bird 
    floor.x = bird.x;
    drawScore(width/2, 20, score, 24, 36)

    // detect collision to pipe and floor
    if (bird.collides(pipeGroup) || bird.collides(floor)){
        // create the game over sprite
        gameOverLabel = new Sprite();
        // gameOverLabel.x = width / 2;
        gameOverLabel.y = height / 2;
        gameOverLabel.w = 192;
        gameOverLabel.h = 42;
        gameOverLabel.img = gameOverImg;
        gameOverLabel.layer = 100;
        gameOverLabel.x = camera.x;
        dieSound.play();
        noLoop();//freeze the draw loop function
    }
    

    // keyboard press event || means or
    

    // debug information
    fill('blue');
    textSize(14);
    text('bird.vel.y: ' + bird.vel.y.toFixed(1), 10, 20);
    text('bird.x: ' +  bird.x.toFixed(1), 10, 35);
    text('frameCount: ' + frameCount, 10, 50);

}

// declare the function for spawnPipePair
function spawnPipePair(){
    let gap = 50;
    let midY = random(250, height - 250); //height / 2;;

    bottomPipe = new Sprite();
    bottomPipe.x = bird.x + 400;
    bottomPipe.y = midY + gap /2 + 200; // adjust later
    bottomPipe.w = 52;
    bottomPipe.h = 320;
    bottomPipe.collider = 'static';
    bottomPipe.img = pipe;

    topPipe = new Sprite();
    topPipe.x = bird.x + 400;
    topPipe.y = midY - gap /2 - 200; // adjust later
    topPipe.w = 52;
    topPipe.h = 320;
    topPipe.collider = 'static';
    topPipe.img = pipe;
    topPipe.rotation = -180; // to rotate

    pipeGroup.add(bottomPipe);
    pipeGroup.add(topPipe);
    pipeGroup.layer = 0; // goes to the back i type something to change

    topPipe.passed = false;
}


function drawScore(x, y, score, digitWidth, digitHeight){
    scoreDigits.removeAll();
    let scoreStr = str(score);
    let totalWidth = scoreStr.length * digitWidth;
    let startX = x - totalWidth/2
    for(let i = 0; i < scoreStr.length; i++){
        let digit = int(scoreStr[i]);
        let xPos = startX + i * digitWidth;
        let digitSprite = new scoreDigits.sprite (xPos, y, digitWidth, digitHeight);
        digitSprite.img = numImg[digit];
    }
    moveGroup(scoreDigits, camera.x, 24)
}

function moveGroup(group, targetX, spacing){
    let totalWidth = (group.length - 1) * spacing;
    let startX = (targetX - totalWidth/2);
    for(let i = 0; i < group.length; i++){
        group[i].x = startX + i * spacing;
    }
}