
/////////////////////////////////////////////
//
function createSymbol(x, y, fruit) {

  let fruitSprite;
  let signSprite;
  let cashSprite;
  let value = 0;
  let blank = false;

  
  if (fruit == FRUIT.BLANK) {
    blank = true;
    fruitSprite = null;
    signSprite = null;
    cashSprite = null;
    value = 0.0;
  } else if (fruit == FRUIT.F1) {
    fruitSprite = "fruit1.png"; 
    signSprite = "sign_f1.png";
    cashSprite = "sign_50.png";
    value = 0.50;
  } else if (fruit == FRUIT.F2) {
    fruitSprite = "fruit2.png";
    signSprite = "sign_f2.png";
    cashSprite = "sign_100.png";
    value = 1.00;
  } else if (fruit == FRUIT.F3) {
    fruitSprite = "fruit3.png";
    signSprite = "sign_f3.png";
    cashSprite = "sign_500.png";
    value = 5.00;
  } else {
    fruitSprite = "fruit4.png";
    signSprite = "sign_f4.png";
    cashSprite = "sign_2000.png";
    value = 20.00;
  }

  let fSprite = null;
  if (!blank) {
    fSprite = PIXI.Sprite.from("gfx/" + fruitSprite);
    layer1.addChild(fSprite);
    fSprite.visible = false;

    fSprite.x = startReelX + x * symbolDX;
    fSprite.y = startReelY + y * symbolDY;
  }


  let sSprite = null;

  if (!blank) {
    sSprite = PIXI.Sprite.from("gfx/" + signSprite);
    layer1.addChild(sSprite);
    sSprite.visible = true;
    sSprite.x = startReelX + x * symbolDX + (symbolImageSize / 2);
    sSprite.y = startReelY + y * symbolDY + (symbolImageSize);
    sSprite.anchor.x = 0.5;
    sSprite.anchor.y = 1.0;
    sSprite.scale.x = sSprite.scale.y = 0.0; 
  }

  let blankSignSprite = PIXI.Sprite.from("gfx/sign_blank.png");

  if (blank) {
    blankSignSprite.x = startReelX + x * symbolDX;
    blankSignSprite.y = startReelY + y * symbolDY;
    layer1.addChild(blankSignSprite);
  } else {
    fSprite.addChild(blankSignSprite);
  }
  blankSignSprite.visible = false;

  let cSprite = null;
  if (!blank) {
    cSprite = PIXI.Sprite.from("gfx/" + cashSprite);
    blankSignSprite.addChild(cSprite);
    cSprite.visible = false;
  }

  let dSprite = null;
  dSprite = PIXI.Sprite.from("gfx/waterdrop.png");
  layer1.addChild(dSprite);
  dSprite.x = startReelX + x * symbolDX;
  dSprite.y = startReelY + y * symbolDY;

  dSprite.visible = false;
  

  let symbol = {
    blank: blank,
    watered: false,
    x: x,
    y: y,
    value: value,
    fruitSprite: fSprite,
    signSprite: sSprite,
    blankSignSprite: blankSignSprite,
    cashSprite: cSprite,
    waterSprite: dSprite
  };

  return symbol;
}


/////////////////////////////////////////////
//
function destroySymbol(sym) {

  if (sym.cashSprite != null) {
    sym.cashSprite.parent.removeChild(sym.cashSprite);
  }

  sym.blankSignSprite.parent.removeChild(sym.blankSignSprite);

  if (sym.signSprite != null) {
    sym.signSprite.parent.removeChild(sym.signSprite);
  }

  if (sym.fruitSprite != null) {
    sym.fruitSprite.parent.removeChild(sym.fruitSprite);
  }

  sym.cashSprite = null;
  sym.blankSignSprite = null;
  sym.signSprite = null;
  sym.fruitSprite = null;
}
