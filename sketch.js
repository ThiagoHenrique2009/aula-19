var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
}

function draw() {
  background(200);
  
 
 

 
  
  

  if(gameState === "play"){
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
   }
     
   if(keyDown("right_arrow")){
     ghost.x = ghost.x + 3;
   }
   if(keyDown("space")){
     ghost.velocityY = -5;
   }
   ghost.velocityY = ghost.velocityY + 0.8;

   gerarPortas(); 

   if(tower.y > 400){
    tower.y = 300
   }
  
   if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
   }

   if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = "end";
   }

   drawSprites();
  }
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de jogo",230,250);

  }
 
}

function gerarPortas(){
  if (frameCount %240 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImg);
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
  
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.hight = 1;
    

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    door.lifetime = 650;

    climber.lifetime = 650;
    
    invisibleBlock.debug = false;

    ghost.depth = door.depth;
    ghost.depth += 1;

    doorsGroup.add(door);

    climbersGroup.add(climber);
    
    invisibleBlockGroup.add(invisibleBlock);
  }
}
