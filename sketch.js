var bow, arrow, background, redB, pinkB, greenB, blueB, arrowGroup;
var bowImage,
  arrowImage,
  green_balloonImage,
  red_balloonImage,
  pink_balloonImage,
  blue_balloonImage,
  backgroundImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  backgroundImage = loadImage("background0.png");

  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  createCanvas(600, 400);

  //creating background
  background = createSprite(0, 0, 600, 600);
  background.addImage(backgroundImage);
  background.scale = 2.5;

  // creating bow to shoot arrow
  bow = createSprite(480, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  score = 0;
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  arrowGroup = new Group();
}

function draw() {
  // moving ground
  background.velocityX = -3;

  if (gameState === PLAY) {
    if (keyWentDown("space")) {
      createArrow();
    }
    var select_balloon = Math.round(random(1, 4));

    if (World.frameCount % 100 == 0) {
      if (select_balloon == 1) {
        redBalloon();
      } else if (select_balloon == 2) {
        greenBalloon();
      } else if (select_balloon == 3) {
        blueBalloon();
      } else {
        pinkBalloon();
      }
      score = score + Math.round(frameCount / 90);
    }
  } else if (gameState === END) {
    background.velocityX = 0;
    arrowGroup.setVelocityXEach(0);
    redB.setVelocityXEach(0);
    greenB.setVelocityXEach(0);
    pinkB.setVelocityXEach(0);
    blueB.setVelocityXEach(0);
  }

  if (arrowGroup.isTouching(redB)) {
    redB.destroyEach();
    arrowGroup.destroyEach();
    //ore = score + 1;
  }

  if (arrowGroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    //ore = score + 3;
  }

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    //core = score + 2;
  }

  if (arrowGroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    //core = score + 1;
  }

  if (score === 170) {
    gameState = END;
    text("you won", 300, 200);
    textSize(40);
  }

  if (background.x < 0) {
    background.x = background.width / 2;
  }

  //moving bow
  bow.y = World.mouseY;

  // release arrow when space key is pressed

  //creating continous enemies

  drawSprites();
  text("Score: " + score, 500, 50);
}

function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = Math.round(random(2, 8));
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = Math.round(random(2, 8));
  blue.lifetime = 200;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = Math.round(random(2, 8));
  green.lifetime = 200;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = Math.round(random(2, 8));
  pink.lifetime = 200;
  pink.scale = 1;
  pinkB.add(pink);
}

// Creating  arrows for bow
function createArrow() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 475;
  arrow.y = bow.y;
  arrow.velocityX = Math.round(random(-2, -7));
  arrow.lifetime = 200;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);

  //arrow.debug = true;
  arrow.setCollider("rectangle", -110, 0, 1, 1);
}
