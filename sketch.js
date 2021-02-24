var towerImg, tower;
var runner, runnerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var invisibleBox, boxGroup;
var gameState, spooky;

function preload() {
  towerImg = loadImage('tower.png');
  doorImg = loadImage('door.png');
  climberImg = loadImage('climber.png');
  runnerImg = loadImage('runner.png');
  spooky = loadSound('spooky.wav')
}

function setup() {
  createCanvas(400, 400);

  gameState = 'PLAY';

  edges = createEdgeSprites();

  tower = createSprite(200, 200)
  tower.addImage(towerImg);
  tower.scale = 0.7;

  climberGroup = new Group();
  doorGroup = new Group();
  boxGroup = new Group();

  runner = createSprite(200, 200);
  runner.addImage(runnerImg);
  runner.scale = 0.27;
  
  //spooky.play();
}

function draw() {
  background(255);

  if (gameState === 'PLAY') {

    createDoor();

    tower.velocityY = 5;

    if (tower.y > 200) {
      tower.y = 0;
    }

    if (keyDown('SPACE') || keyDown('UP_ARROW')) {
      runner.velocityY = -5;
    } else {
      runner.velocityY = 7;
    }

    if (keyDown('LEFT_ARROW')) {
      runner.velocityX = -5;
    } else if (keyDown('RIGHT_ARROW')) {
      runner.velocityX = 5;
    } else {
      runner.velocityX = 0;
    }

    if (frameCount > 50) {
      runner.collide(climberGroup);
      
      if (runner.isTouching(boxGroup)|| runner.y > 350) {
        runner.destroy();
        doorGroup.destroyEach();
        boxGroup.destroyEach();
        climberGroup.destroyEach();
        gameState = 'END';
      }
    }

  }
  
  else if(gameState === 'END'){
      tower.visible = false;
      background(0);
      fill('white');
      textSize(20);
      text('Game Over', 150,200);
    }


  drawSprites();
}

function createDoor() {
  if (frameCount % 100 === 0 || frameCount === 50) {
    door = createSprite(Math.round(random(50, 400)), -50, 200, 200);
    door.addImage(doorImg);
    door.velocityY = 5;
    doorGroup.add(door);
    door.lifeTime = 200;

    climber = createSprite(door.x, door.y + 50, 10, 10);
    climber.addImage(climberImg);
    climber.velocityY = 5;
    climber.lifeTime = 200;
    climberGroup.add(climber);

    invisibleBox = createSprite(climber.x, climber.y + 20, climber.width, climber.height - 10);
    invisibleBox.velocityY = 5;
    invisibleBox.visible = false;
    boxGroup.add(invisibleBox);

    door.depth = runner.depth;
    runner.depth++;

  }

}