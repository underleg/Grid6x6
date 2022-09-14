
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
    fontSize: 160,
    fontWeight: 'bold',
    fill: ['#FFFFFF'],
  });


  winText = new PIXI.Text(0, fontStyle);
  winText.x = xsize / 2;
  winText.y = 715;
  winText.anchor.x = winText.anchor.y = 0.5;
  layer2.addChild(winText);
  winText.text = "";

  winText.visible = true;
}



////////////////////////////////////////////////////////
function createMeters() {

  const fontStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    align: "center",
    fontSize: 46,
    fontWeight: 'bold',
    fill: ['#ffffff'],
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
  betText.text = "$1.00"
  layer1.addChild(betText);
}


////////////////////////////////////////////////////////
function updateMeters() {
  let bal = gBalance / 100;
  balanceText.text = bal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

}

////////////////////////////////////////////////////////
function updateWinMeter() {
  if (gWin > 0) {
    let win = gWin
    winText.text = win.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    gBalance += (gWin * 100);
    gWin = 0;

    updateMeters();
  }
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
      resetWaterCans();
      createNewReels();
      signScale = 0.0;
      gBalance -= gBet;
      gWin = 0;
      winText.text = "";
      updateMeters();

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


}


////////////////////////////////////////////////////////
// 
function handleShowSignState(delta) {
  if (updateSignScale(delta)) {
    console.log("STATE_SHOW_WATER");
    state = STATE_SHOW_WATER;
  }
}

////////////////////////////////////////////////////////
// 
function handleShowWaterState(delta) {

  if (moveWaterCans(delta)) {
    console.log("STATE_PAY");
    initPayDisplay();
    state = STATE_PAY;
  }


}

////////////////////////////////////////////////////////
// 
function handlePayState(delta) {
  if (updateFruitScale(delta)) {
    console.log("STATE_WAIT");
    updateWinMeter();
    spinButton.interactive = true;
    state = STATE_WAIT;
  } 

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

