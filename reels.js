///////////////////////////////////////
//
function clearSymbols() {
  while (symbols.length > 0) {
    let sym = symbols.pop();
    destroySymbol(sym);
  }
}


///////////////////////////////////////
//
function createNewReels() {

  clearSymbols();

  for (let i = 0; i < numSymbolsX; ++i) {
    for (let j = 0; j < numSymbolsY; ++j) {
      let fruit;
      let pay = 0;
      let isBlank = isSymbolBlank();
      if (isBlank == true) {
        fruit = FRUIT.BLANK;
        
      } else {
        fruit = getRandomFruit();
        pay = getFruitPay(fruit);
      }

      symbols.push(createSymbol(i, j, fruit, Number(pay)));
    }
  }
}



/////////////////////////////////////////////
//
function setSymbolWaterVisibility(reel, row, vis) {
  let idx = row + reel * 6;
  symbols[idx].waterSprite.visible = vis;
}



/////////////////////////////////////////////
//
function updateSignScale(delta) {
  let res = false;
  signScale += 0.1 * delta;
  if (signScale > 1.0) {
    signScale = 1.0;
    res = true;
  }

  for (let i = 0; i < symbols.length; ++i) {

    if (symbols[i].blank == false) {
      symbols[i].signSprite.scale.x = symbols[i].signSprite.scale.y = signScale; 
    }
  }

  return res;
}


/////////////////////////////////////////////
//
function initPayDisplay() {

  fruitScale = 0.0;

  for (let i = 0; i < symbols.length; ++i) {

    if (symbols[i].blank == false && symbols[i].waterSprite.visible == true) {
      symbols[i].signSprite.visible = false;
      symbols[i].blankSignSprite.visible = true;
      symbols[i].fruitSprite.scale.x = symbols[i].fruitSprite.scale.y = 0.0;
      symbols[i].fruitSprite.visible = true;
      //symbols[i].winText.visible = true;
    }
  }

}


/////////////////////////////////////////////
//
function updateFruitScale(delta) {
  let res = false;
  fruitScale += 0.1 * delta;
  if (fruitScale > 1.0) {
    fruitScale = 1.0;
    res = true;
  }

  for (let i = 0; i < symbols.length; ++i) {

    if (symbols[i].blank == false && symbols[i].waterSprite.visible == true) {
      symbols[i].fruitSprite.scale.x = symbols[i].fruitSprite.scale.y = fruitScale;
      symbols[i].fruitSprite.visible = true;
      if (res == true) {
        gWin += symbols[i].value;
        symbols[i].winText.visible = true;
        symbols[i].waterSprite.visible = false;
      }
    }
  }

  return res;
}


