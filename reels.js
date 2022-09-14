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
      let isBlank = isSymbolBlank();
      if (isBlank == true) {
        fruit = FRUIT.BLANK;
      } else {
        fruit = getRandomFruit();
      }

      symbols.push(createSymbol(i, j, fruit));
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





