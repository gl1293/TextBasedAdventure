var font;
var img;
var data;
var dramamusic;
var currentSceneNumber;
var currentScene;
var chosenNumber;
var x;
var y;
var margin;
var check;
var startImage = -100;

function preload() {
  font = loadFont("HARNGTON.TTF");
  img = loadImage("shadowBeast.jpg");
  data = loadJSON("storyData.json");
  beastMusic = loadSound('tyops.wav'); //when beast is chasing you (scene 1 - 3)
  suspenseMusic = loadSound('kaiodeleis.wav'); //when door is opened
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  textSize(15);
  margin = width - 50;
  x = 20;
  y = 100;
  chosenNumber = 0;
  currentSceneNumber = 0;
  currentScene = data.scenelist[currentSceneNumber];
}

function draw() {
  background(0);
  currentScene = data.scenelist[currentSceneNumber];
  check = (currentScene.scenario[chosenNumber].search("GAME OVER"));
  story();
  music();
  // Choice "Look for beast" reveals image
  if (currentSceneNumber == 5 && chosenNumber === 0) {
    if (frameCount % 50 === 0) {
      startImage = frameCount;
      beast();
    }
  }
}

function story() {

  // SPIRIT
  if (currentScene.spirit !== null && currentScene.spirit instanceof Array)
    fill(200, 200, 250),
    text(currentScene.spirit[chosenNumber], x, y, margin);
  if (currentScene.spirit !== null && typeof currentScene.spirit == "string")
    fill(200, 200, 250),
    text(currentScene.spirit, x, y, margin);

  //SCENARIO
  if (currentScene.scenario instanceof Array)
    fill(255),
    text(currentScene.scenario[chosenNumber], x, y + 60, margin);
  else
    fill(255),
    text(currentScene.scenario, x, y + 60, margin);


  // CHOICE
  if (currentScene.choice !== null)
    fill(255),
    text("PICK YOUR CHOICE. PRESS YOUR NUMBER", x, y + 140),
    text(currentScene.choice[0], x, y + 160, margin),
    text(currentScene.choice[1], x, y + 180, margin),
    text(currentScene.choice[2], x, y + 200, margin),
    text(currentScene.choice[3], x, y + 220, margin);

  // INSTRUCTIONS
  if (check != -1 || currentSceneNumber == data.scenelist.length - 1)
    fill(255),
    text("Please press the spacebar to restart the game. ", x, height - 30);
  else if (check == -1 && currentScene.choice === null)
    fill(255),
    text("Please press Enter to proceed.", x, height - 30);
}

function music() {
  if (currentSceneNumber == 5 && chosenNumber == 2) suspenseMusic.play();
  else if (currentSceneNumber < 3) beastMusic.play();
  else beastMusic.stop();
}

function keyTyped() {
  if (keyCode == '32') //spacebar
    currentSceneNumber = 0;

  if (keyCode == '13') { //enter
    if (currentSceneNumber == 5 && chosenNumber != 2) currentSceneNumber -= 1;
    else currentSceneNumber += 1;
  }

  if (key == '1')
    currentSceneNumber += 1,
    chosenNumber = 0;
  if (key == '2')
    currentSceneNumber += 1,
    chosenNumber = 1;
  if (key == '3')
    currentSceneNumber += 1,
    chosenNumber = 2;
  if (key == '4')
    currentSceneNumber += 1,
    chosenNumber = 3;
}

function beast() {
  if (frameCount - startImage < 50) {
    image(img, 0, 0, width, height);
  } else if (frameCount - startImage < 100) {
    tint(255, 255 - 10 * (frameCount - startImage - 10));
    image(img, 0, 0, width, height);
  }
}