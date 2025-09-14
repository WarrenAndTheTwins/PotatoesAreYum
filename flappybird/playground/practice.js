let Square;
let Circle;
let Dave;
let Richie_the_Circle;
function setup(){
    new Canvas (800, 400);
    background(220);
    Square = new Sprite(400, 200, 80, 80);
    Circle = new Sprite(100, 350, 40);
    Dave = new Group();
}
function draw(){
    for(let i=0; i<10; i++){
        console.log("hi");
    }
    let count = 0;
    while (count<5){
        count++
    }
    if (mouse.presses ('left') || KeyboardEvent.presses('space'));
        Richie_the_Circle = new Sprite(mouse.x, mouse.y,50, "dynamic");
        Richie_the_Circle.x = mouse.x;
        Richie_the_Circle.y = mouse.y;
        

}