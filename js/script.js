/**
 * Step 1: create a canvas so that you can use canvas function (e.g. clearRect)
 * Step 2: create game
 * Step 3: create a loop to update the animation
 */

// create the canvas that you will be working, assign it to ctx
const ctx = document.getElementById('rock-board').getContext('2d');
let timeOutId;

// keeps count of the frames
let frames = 0;
let startGame = true;
let int;

// controls how fast the character moves
let characterSpeed = 15;
let timerValue = 1799;
let bonusArray = [];
let bombBonusFlag = false;
let startWithBonusFlag = true;
// variables that hold the canvas width and height in case the canvas size changes
let canvasWidth = document.querySelector("#rock-board").width;
let canvasHeight = document.querySelector("#rock-board").height;

// create a Game object, initializes new player and monster
let theGame = new Game(canvasWidth, canvasHeight);

// testing choose a character method
// theGame.chooseCharacter("test");

// create player and monster variables
let player = theGame.thePlayer;
let monster = theGame.theMonster;
let sound = theGame.theSound;
let monster2 = theGame.theMonster2;

// testing 
let spriteX = 10;
let spriteY = 715;



// function that recursively calls itself to update the animation screen
// the loop can be called anything you want, doesn't have to be mainLoop
function mainLoop() {
  frames++;

  // clearRect erases the pixels of the canvas starting from (0, 0) until (canvasWidth, canvasHeight)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // draw the player, money and monster
  theGame.drawPlayer(ctx, spriteX, spriteY);
  theGame.drawMoney(ctx);
  theGame.drawMonster(ctx);
  sound.playBackground();
  theGame.drawObstacle(ctx);
  theGame.drawBackground(ctx);
  if(theGame.level === 3){
    theGame.drawMonster2(ctx);
  }



  /**
   * You should call this method whenever you're ready to update your animation onscreen. 
   * This will request that your animation function be called before the browser performs 
   * the next repaint. The number of callbacks is usually 60 times per second, but will 
   * generally match the display refresh rate in most web browsers as per W3C recommendation. 
   * */
 
  if (theGame.moneyArray.length === 0) {
    clearTimeout(timeOutId);
    openPopup();
  }
  if (startGame && startWithBonusFlag) {
    setTimerValue();
    int = window.requestAnimationFrame(mainLoop);
  } else {
    window.cancelAnimationFrame(int)
  }
}

// randomly move the monster on the game board
monster.moveMonster(canvasWidth, canvasHeight);
monster2.moveMonster(canvasWidth,canvasHeight);

function restart() {
  theGame.reset();
}
function change(event, point) {
  console.log(event.currentTarget.checked);
  console.log(event.currentTarget.value);
  if(event.currentTarget.checked) {
    bonusArray.push({bonus:event.currentTarget.value, points:point});
  }
}
function buy() {
  console.log(bonusArray.length);
  bonusArray.forEach(bonus => {
    console.log(bonus.bonus);
    if(bonus.bonus === 'energy-drink') {
      theGame.tracker -= bonus.points;
      console.log(theGame.tracker);
        characterSpeed = 35;
      console.log(characterSpeed);
      document.getElementsByClassName('score-value')[0].innerText = theGame.tracker;
    }
    if(bonus.bonus === 'bomb') {
      theGame.tracker -= bonus.points;
      bombBonusFlag = true;
      console.log(bombBonusFlag);
      document.getElementsByClassName('score-value')[0].innerText = theGame.tracker;
    }
    if(bonus.bonus === 'lucky-charm') {
      theGame.tracker -= bonus.points;
      theGame.luckyCharmFlag = true;
      document.getElementsByClassName('score-value')[0].innerText = theGame.tracker;
    }
  })
  startWithBonusFlag = true;
  mainLoop()
  // return startWithBonusFlag;
}
function notBuy() {
  startWithBonusFlag = true;
  mainLoop()
 // return startWithBonusFlag;
}
function moveKey() {
  // depending on the direction the user presses move in that direction
  document.onkeydown = function (e) {
    if (e.key === "ArrowUp") {
      if (theGame.collisionDetection(player.x, player.y - characterSpeed))
        player.movePlayer(player.x, player.y - characterSpeed, canvasWidth, canvasHeight);
      theGame.theSound.playWalkingSound();

      if(spriteY > 523 || spriteY < 523) {
        spriteY = 523; 
        spriteX = 10;
      }
      else if(spriteX + 64 > 522)
        spriteX = 74;
      else
        spriteX += 64;
    }
    if (e.key === "ArrowDown") {
      if (theGame.collisionDetection(player.x, player.y + characterSpeed))
        player.movePlayer(player.x, player.y + characterSpeed, canvasWidth, canvasHeight);
      theGame.theSound.playWalkingSound();

      if(spriteY > 652 || spriteY < 652) {
        spriteY = 652; 
        spriteX = 10;
      }
      else if(spriteX + 64 > 522)
        spriteX = 74;
      else
        spriteX += 64;
    }
    if (e.key === "ArrowLeft") {
      if (theGame.collisionDetection(player.x - characterSpeed, player.y))
        player.movePlayer(player.x - characterSpeed, player.y, canvasWidth, canvasHeight);
      
      theGame.theSound.playWalkingSound();
        
      if(spriteY > 587 || spriteY < 587) {
        spriteY = 587; 
        spriteX = 10;
      }
      else if(spriteX + 64 > 522)
        spriteX = 74;
      else
        spriteX += 64;
    }
    if (e.key === "ArrowRight") {
      if (theGame.collisionDetection(player.x + characterSpeed, player.y))
        player.movePlayer(player.x + characterSpeed, player.y, canvasWidth, canvasHeight);
        
      theGame.theSound.playWalkingSound();

      if(spriteY > 715 || spriteY < 715) {
        spriteY = 715; 
        spriteX = 10;
      }
      else if(spriteX + 64 > 522)
        spriteX = 74;
      else
        spriteX += 64;
    }
    if (e.key === "Shift") {
     if(bombBonusFlag){
       theGame.obstacleArray.forEach((obstacle,index) => {
            theGame.obstacleArray.splice(index,1);
       })
     }
    }
  }
}


function openPopup() {
  document.getElementById('exampleModal').classList.add('show');
  document.getElementById('exampleModal').classList.add('show-popup');
  document.getElementById('exampleModal').classList.remove('hide-popup');
  startGame = false;
  if (timerValue !== 0) {
    timerValue = 0;
    document.getElementsByClassName('timer-value')[0].innerText = timerValue;
  }
  dimScreen();
  if (Number(document.getElementsByClassName('score-value')[0].innerText) >= Number(document.getElementsByClassName('goal-value')[0].innerText)) {
    document.getElementsByClassName('win-temp')[0].classList.remove('hide-popup');
    document.getElementsByClassName('lose')[0].classList.add('hide-popup');
    document.getElementsByClassName('win-temp-body')[0].classList.remove('hide-popup');
    document.getElementsByClassName('win-temp-body')[0].innerText = `Woo hoo! You cleared Level ${theGame.level}`;
    document.getElementsByClassName('lose-body')[0].classList.add('hide-popup');
    document.getElementsByClassName('start')[0].classList.remove('hide-popup');

  } else {
    document.getElementsByClassName('lose')[0].classList.remove('hide-popup');
    document.getElementsByClassName('win-temp')[0].classList.add('hide-popup');
    document.getElementsByClassName('lose-body')[0].classList.remove('hide-popup');
    document.getElementsByClassName('win-temp-body')[0].classList.add('hide-popup');
    document.getElementsByClassName('start')[0].classList.add('hide-popup');
    document.getElementsByClassName('lose-body')[0].innerText = `Sorry! Please try again`;
  }
}

function dimScreen() {
  document.getElementById('modal-overlay').classList.remove('hide-popup');
  document.getElementById('modal-overlay').classList.add('show-popup');
}

// ends the game and activates modal
function timeUp() {
    timeOutId = setTimeout(() => {
      theGame.theSound.stopTimer();
      openPopup();
    }, 30000); 
} 

function timeOut() {
  document.getElementById('exampleModal').classList.remove('show');
  document.getElementById('exampleModal').classList.remove('show-popup');
  document.getElementById('exampleModal').classList.add('hide-popup');
  if (document.getElementById('modal-overlay').classList.contains('show-popup')) {
    document.getElementById('modal-overlay').classList.remove('show-popup');
    document.getElementById('modal-overlay').classList.add('hide-popup');
  }
}

function setTimerValue() {
  timerValue--;
  document.getElementsByClassName('timer-value')[0].innerText = timerValue;
  if(timerValue < 200) {
    document.getElementsByClassName('timer-value')[0].setAttribute('style','color: rgba(180, 34, 8, 0.877)');
    theGame.theSound.stopBackground();
    theGame.theSound.playTimerSound();
  } else {
    document.getElementsByClassName('timer-value')[0].removeAttribute('style','color: rgba(180, 34, 8, 0.877)');
  }
}

// start of the game
function initialLoad() {
  theGame.scoreByLevel = 0;
  timerValue = 1799;
  frames = 0;
  startGame = true;
  player.x = 0;
  player.y = 0;
  timeOut();
}

 function nextLoad() {
  document.getElementsByClassName('goal-value')[0].innerText = theGame.setGoal(theGame.level);
  theGame.createRandomNumber(theGame.level);
  theGame.createMoney();
  theGame.createBackground();
  theGame.createObstacle();
  
  //mainLoop();
  moveKey();
  timeUp();
 }

function changeCanvasImage() {
  if(theGame.level === 2) {
    document.getElementById('rock-board').setAttribute('style','background-image:url("../images/multi-color-rock-background.jpg")') ;
    theGame.theSound = new Sound('../music/level2-main.mp3','../music/super mario bros coin sound FX.mp3','../music/ouch.mov')
  }
  if(theGame.level === 3) {
    document.getElementById('rock-board').setAttribute('style','background-image:url("../images/stone-texture-background.jpg")') ;
    theGame.theSound = new Sound('../music/level3-main.mp3','../music/super mario bros coin sound FX.mp3','../music/ouch.mov')
  }
}

function start() {
 initialLoad()
 bonusArray = [];
  bombBonusFlag = false;
  theGame.luckyCharmFlag = false;
  characterSpeed = 15;
  document.getElementById('energy-drink-option').checked = false; 
  document.getElementById('bomb-option').checked = false; 
  document.getElementById('lucky-charm-option').checked = false; 
 theGame.level++;
 changeCanvasImage();
 ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 startWithBonusFlag = false;
 nextLoad();
}

function restartLevel() {
  initialLoad();
  spriteX = 10;
  document.getElementsByClassName('score-value')[0].innerText = theGame.tracker - theGame.trackerByLevel[theGame.level];
  theGame.tracker = theGame.tracker - theGame.trackerByLevel[theGame.level]
  nextLoad();
  startWithBonusFlag = true;
  mainLoop()
}

document.getElementById('modal-overlay').classList.add('hide-popup');
document.getElementsByClassName('goal-value')[0].innerText = theGame.setGoal(theGame.level);
mainLoop();
moveKey();
timeUp();
