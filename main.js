
let spinButton;

let winText;
let bonusText;

let balance = 1000000;
let bet = 10;
let win = 0;

let STATE_WAIT = 1;
let STATE_SHOW_SIGNS = 2;
let STATE_SHOW_WATER = 3;
let STATE_PAY = 4;


let state = STATE_WAIT;

let bgImage;

let gWin = 0;

let app;


////////////////////////////////////////////////////////
function loadBackground() {
  let name = "gfx/bg.jpg";
  bgImage = PIXI.Sprite.from(name);
  layer1.addChild(bgImage);
  bgImage.visible = true;

}


////////////////////////////////////////////////////////
function scaleButton(scl) {
  spinButton.scale.x = scl;
  spinButton.scale.y = scl;
}


////////////////////////////////////////////////////////
function createMaths() {

  maths = {
    currentWin: 0,
    currentBet: 10,
    currentBalance: 10000000,
    numGamesPlayed: 0,
    sumWin: 0,
    sumBet: 0,
    winningGames: 0
  };

}

////////////////////////////////////////////////////////
function createWinMessage() {

  const fontStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    align: "center",
    fontSize: 180,
    fontWeight: 'bold',
    fill: ['#FFFFFF'],
  });


  winText = new PIXI.Text(0, fontStyle);
  winText.x = 539;
  winText.y = 813;
  winText.anchor.x = winText.anchor.y = 0.5;
  layer2.addChild(winText);
  winText.text = "+3 FREE GAMES";

  winText.visible = false;
}



////////////////////////////////////////////////////////
function createMeters() {

  const fontStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    align: "center",
    fontSize: 32,
    fontWeight: 'bold',
    fill: ['#ffcc00'],
  });


  balanceText = new PIXI.Text(0, fontStyle);
  balanceText.x = 172;
  balanceText.y = 1843;
  balanceText.anchor.x = balanceText.anchor.y = 0.5;
  layer1.addChild(balanceText);
  balanceText.text = "$100.00";
  balanceText.cash = 100.00;
  
  betText = new PIXI.Text(0, fontStyle);
  betText.x = 884;
  betText.y = 1843;
  betText.anchor.x = betText.anchor.y = 0.5;
  betText.text = "$1.50"
  layer1.addChild(betText);
}



////////////////////////////////////////////////////////
function createButton() {

  // BIG BALL
  let name = "gfx/spin.png";

  spinButton = PIXI.Sprite.from(name);
  layer2.addChild(spinButton);
  spinButton.anchor.x = spinButton.anchor.y = 0.5;
  spinButton.x = buttonX;
  spinButton.y = buttonY;

  spinButton.on('click', function (e) {
    if (state == STATE_WAIT) {
      spinButton.interactive = false;
      createNewReels();
      signScale = 0.0;
      state = STATE_SHOW_SIGNS;
    }
  });

  spinButton.on('mouseover', function (e) {
    scaleButton(0.95);
  });

  spinButton.on('mouseout', function (e) {
    scaleButton(1.0);
  });

  spinButton.interactive = true;
}


////////////////////////////////////////////////////////
// wait for button press
function handleWaitState(delta) {

  // console.log("WAIT_STATE");

  }


////////////////////////////////////////////////////////
// 
function handleShowSignState(delta) {
  if (updateSignScale(delta)) {

    state = STATE_SHOW_WATER;
  }
}

////////////////////////////////////////////////////////
// 
function handleShowWaterState(delta) {

  if (moveWaterCans(delta)) {
    state = STATE_PAY;
  }


}

////////////////////////////////////////////////////////
// 
function handlePayState(delta) {


}



////////////////////////////////////////////////////////

function update(delta) {

  if (state == STATE_WAIT) {
    handleWaitState(delta);
  } else if (state == STATE_SHOW_SIGNS) {
    handleShowSignState(delta);
  } else if (state == STATE_SHOW_WATER) {
    handleShowWaterState(delta);
  } else if (state == STATE_PAY) {
    handlePayState(delta);
  }
}


////////////////////////////////////////////////////////
// Create the application helper and add its render target to the page
let isReady = false;
function ready() {

  app = new PIXI.Application({ backgroundColor: 0xffffff, width: xsize * screenScale, height: ysize * screenScale });
  app.stage.scale.x = screenScale;
  app.stage.scale.y = screenScale;
  document.body.appendChild(app.view);

  // layers
  layer1 = new PIXI.Container();
  app.stage.addChild(layer1);

  layer2 = new PIXI.Container();
  app.stage.addChild(layer2);


  // GLOBAL CALLS()
  loadBackground();
  createMaths();
  createWinMessage();
  createMeters();
  createButton();

  isReady = true;

 

  createNewReels();
  createWaterCans();

  ////////////////////////////////////////////////////////
  // Add a ticker callback to move the sprite back and forth
  let elapsed = 0.0;
  app.ticker.add((delta) => {

    delta = 1.0;

    update(delta);

    elapsed += delta;

    // if prizeStream is on, drop a recorded ball at intervals 
    if (elapsed > 60.0) {
      elapsed -= 60.0;
    }
  });

}

