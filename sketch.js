var player = [];
var death = false;
var imgPop = false;
var proceed = false;
var font;
var img;
var data;
var currentSceneNumber;
var currentScene;
var chosenNumber;
var x;
var y;
var input;

function preload() {
  font = loadFont("HARNGTON.TTF");
  img = loadImage("shadowBeast.jpg");
  data = loadJSON("storyData.json");
}

//////////////////////////////
function setup() {
  createCanvas(600, 600);
  background(0);
  textAlign(LEFT);
  textFont(font);
  textSize(15);
  currentSceneNumber = 0;
  currentScene = data.scenelist[currentSceneNumber];
  chosenNumber = 0;
  x = 20;
  y = 100;
}

function draw() {
  background(0);
  proceed = false;
  while (currentSceneNumber < data.scenelist.length) {
    if (currentScene.spirit !== null && currentScene.spirit instanceof Array)
      fill(255),
      text(currentScene.spirit[chosenNumber], x, y);
    else if (currentScene.spirit !== null && currentScene.spirit instanceof String)
      fill(255),
      text(currentScene.spirit, x, y);
    console.log(currentScene.spirit);

    if (currentScene.scenario instanceof Array)
      fill(255),
      text(currentScene.scenario[chosenNumber], x, y + 20);
    else
      fill(255),
      text(currentScene.scenario, x, y + 20);

    if (currentScene.choice !== null)
      fill(255),
      text("PICK YOUR CHOICE", x, y + 40),
      text(currentScene.choice[0], x, y + 60),
      text(currentScene.choice[1], x, y + 80),
      text(currentScene.choice[2], x, y + 100),
      text(currentScene.choice[3], x, y + 120);
    else
      fill(255),
      text("Please press the spacebar to proceed.", x, y + 40);
    
    keyTyped();
    if (proceed === true) currentSceneNumber += 1, proceed = true;

    console.log(proceed);
  }
}
//////////////////////////////
/*function specialCase() {
  imgPop = true;
  if (imgPop === true) {
    background(img);
    if (frameCount % 50 === 0) { //cheap timer. make better one.
      imgPop = false,
        background(0),
        fill(255),
        text(currentScene.scenario[2], x, y),
        fill('#faa'),
        text(currentScene.scenario[2], x, y + 20),
        fill(255),
        text(currentScene.scenario[3], x, y + 40),
        text("Please press the spacebar to proceed.", x, y + 60);
    }
  }
}

///////////////////////////////
// function player() {
//  input = createInput();
//  input.changed(name)
//}



    if (currentSceneNumber == 4) {
    text(currentScene.spirit[1], x, y),
      text(currentScene.scenario[1], x, y + 20);
    if (frameCount % 50 === 0) {
      specialCase();
    }
  } 
  put this part at the top of the draw function and change if statements to else if
  */

///////////////////////////////
function keyTyped() {
  if (keyCode == '32') //spacebar
    proceed = true;
  if (key == '1')
    chosenNumber = 1,
    proceed = true;
  if (key == '2')
    chosenNumber = 2,
    proceed = true;
  if (key == '3')
    chosenNumber = 3,
    proceed = true;
  if (key == '4')
    chosenNumber = 4,
    proceed = true;
}