
var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}


function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(50,500,30,50);
  monkey.scale = 0.25;
  monkey.addAnimation("running", monkey_running);
  
  banana = createSprite(100,100,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;

  
  
  ground = createSprite(300,585,1200,35);
  ground.shapeColor = 'green';
  
   FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;  
}


function draw() {

background("lightblue");
  
  
  //giving the ground infinite scrolling effect
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
    //making the monkey jump
    if(keyDown("space") ) {
      monkey.velocityY = -10;
    }
  
    //giving gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);  
  
    //calling the other functions in function draw
    Bananas();
    Obstacles();
 
  
  //making he scoreboard
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
//creating the end condition for the game
if(obstaclesGroup.isTouching(monkey)){
 ground.velocityX = 0;
 monkey.velocityY = 0;
 obstaclesGroup.setVelocityXEach(0);
 FoodGroup.setVelocityXEach(0);
 obstaclesGroup.setLifetimeEach(-1);
 FoodGroup.setLifetimeEach(-1);
 }
  
  //creating the survival rate 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}
   
  
function Bananas() {
  
  //spawning bananas at every 30 frames
  if (frameCount % 30 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale=0.2;
    
  //assigning lifetime to banana
  banana.lifetime = 300;
    
  //giving depth to banana and monkey
  monkey.depth = banana.depth + 1;
    
    
 //adding bananas to the food group
 FoodGroup.add(banana);
  }
  
}



function Obstacles() {
  
  //spawning obstacles at every 150 frames
  if(frameCount % 150 === 0) {
    obstacle = createSprite(500,550,10,40);
    obstacle.velocityX = -5;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

  
   

