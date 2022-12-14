//Variables
var robot, robotImg
var obstcaleGroup
var background_factory, backgroundImg
var ground
var obstacle1Img,obstacle2Img,obstacle
var obstacle2
var GameOver, GameOverImg
var Restart, ResartImg
var gameState= "LEARN"
var score = 0
var dieSound, restartSound, jumpSound
var startButton, startImg

//All Images Loaded Below
function preload(){
  //to load IMAGE
  robotImg=loadImage("Images/RobotImg.png")
  backgroundImg=loadImage("Images/Background.png")
  obstacle1Img=loadImage("Images/Obstacle1.png")
  obstacle2Img=loadImage("Images/Obstacle2.png")
  RestartImg=loadImage("Images/RestartImg.png")
  GameOverImg=loadImage("Images/gameOverImg.png")
  startImg=loadImage("Images/startButtonImg.png")
  // TO LOAD SOUND
  dieSound=loadSound("Images/dieSound.mp3")
  jumpSound=loadSound("Images/jumpSound.mp3")
  restartSound=loadSound("Images/restartSound.mp3")
}


function setup(){
  //Creating Canvas
  createCanvas(1000,1000);
  //Creating Sprites(characters)
  robot=createSprite(200,900)
  //addImage to the sprite
  robot.addImage("spider",robotImg)
  //Scaling Sprite
  robot.scale=0.25
  
  ground=createSprite(500,950,1000,5)
  //Making Sprite visible/invisible
  ground.visible=true
  //Used to create GROUP
  obstacleGroup=new Group()

  background_factory=createSprite(500,600,1000,1000)
  background_factory.addImage("factory",backgroundImg)
  background_factory.scale=2.25
  background_factory.depth=robot.depth
  robot.depth=robot.depth+1
  
  gameOver=createSprite(500,300)
  gameOver.addImage("gameOverButton", GameOverImg)
  gameOver.scale=1.5

  restart=createSprite(500,800)
  restart.addImage("restartButton",RestartImg)
  restart.visible=false
  gameOver.visible=false

  startButton=createSprite(500,500)
  startButton.addImage("start",startImg)
}
function draw() 
  {
    background(30);
    textSize(30)
    //to give color to text
    fill("white")
    //used to display a MESSAGE/TEXT on screen.
    text("Score: "+score,100,100)
    //conditions for LEARN/WAITING STATE
    if (gameState ==="LEARN"){
      text("Instructions to play GAME",70,200)
      textSize(20)
      text("1. Use UP ARROW to jump over obstacles",70,230)
      textSize(20)
      text("2. Avoid the FIRE and TOXIC PUDDLES for as long as possible ", 70,260)
      textSize(20)
      text("3. Gain as many points as possible and watch out for the rapid increase in speed",70,290)
     }
    //if BUTTON is clicked, the GAMESTATE changes into play
    if(mousePressedOver(startButton)){
      gameState ="PLAY"
    }
    //frameCount is the total number of frames in the GAME.
    if(frameCount%50 == 0 && gameState!="END"&& gameState!="LEARN"){
      //to increase score
      score=score+10
      //to display score
      text("Score: "+score,100,100)
    }
    //to collide the robot with ground so the robot doesn't fall off.
    robot.collide(ground)
    //condition for playing State
    if (gameState==="PLAY"){
    //to give velocity/speed to sprites
    ground.velocityX=-1
    //GAME ADAPTIVITY
    ground.velocityX=ground.velocityX-(6+5*score/100)
    startButton.visible=false
    //to say that if you click the UPARROW, the robot JUMPS!
    if(keyDown(UP_ARROW)&& robot.y>=885){
      robot.velocityY=-20
      //to play the sound
      jumpSound.play()
    }
    //calling function
    createObstacles();
    //to make infinte ground
    if(ground.x<0){
      ground.x=500 
    }
    //to give gravity to robot
    robot.velocityY=robot.velocityY+1
    //condition for ENDING the game.
    if(robot.isTouching(obstacleGroup)){
      restart.visible=true
      gameOver.visible=true
      gameState="END"
      dieSound.play()
      
    }
  }
  if(gameState==="END"){
  ground.velocityX=0
  //to give velocity to group
  obstacleGroup.setVelocityXEach(0)
  // to setLIFETIME for group
  obstacleGroup.setLifetimeEach(-1)
  if(mousePressedOver(restart)){
    restartGame()
  }
  }
  //to DISPLAY ALL SPRITES
  drawSprites();
}
//function to create Obstacles
function createObstacles(){
  //TO SHOW AFTER EVERY 200 FRAMES,WE WANT A CERTAIN OUTPUT
  if(frameCount%200==0){
  obstacle=createSprite(950,900,50,50)
  obstacle.scale=0.2
  obstacle.velocityX=-4
  obstacleGroup.add(obstacle)
  obstacle.lifetime=20
  //to get random number
  var myRandom=Math.round(random(1,2))
  obstacle.velocityX=obstacle.velocityX-(6+5*score/100)
  // TO SWITCH THE CASES
  switch(myRandom){
    case 1: obstacle.addImage("barrel",obstacle1Img)
      break;
    case 2: obstacle.addImage("fire",obstacle2Img)
 }
}
}
//to RESTART GAME
function restartGame(){
gameState="LEARN"
startButton.visible=true
//to destoy each MEMBER of group
obstacleGroup.destroyEach()
restart.visible=false
gameOver.visible=false
score=0
restartSound.play()
}