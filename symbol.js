  

/////////////////////////////////////////////
//
function createSymbol(x, y, fruit) {

  const fontStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    align: "center",
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#FFFFFF'],
  });


  let fruitSprite;
  let signSprite;
  let value = 0;
  let blank = false;

  
  if (fruit == FRUIT.BLANK) {
    blank = true;
    fruitSprite = null;
    signSprite = null;
    value = 0.0;
  } else if (fruit == FRUIT.F1) {
    fruitSprite = "fruit1.png"; 
    signSprite = "sign_f1.png";
  
    value = 0.50;
  } else if (fruit == FRUIT.F2) {
    fruitSprite = "fruit2.png";
    signSprite = "sign_f2.png";

    value = 1.00;
  } else if (fruit == FRUIT.F3) {
    fruitSprite = "fruit3.png";
    signSprite = "sign_f3.png";
 
    value = 2.00;
  } else {
    fruitSprite = "fruit4.png";
    signSprite = "sign_f4.png";
    value = 10.00;
  }

  let fSprite = null;
  if (!blank) {
    fSprite = PIXI.Sprite.from("gfx/" + fruitSprite);
    layer1.addChild(fSprite);
    fSprite.visible = false;
    fSprite.anchor.x = 0.5;
    fSprite.anchor.y = 1.0;

    fSprite.x = startReelX + x * symbolDX + (symbolImageSize / 2);
    fSprite.y = startReelY + y * symbolDY + (symbolImageSize);
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

  blankSignSprite.x = startReelX + x * symbolDX;
  blankSignSprite.y = startReelY + y * symbolDY;
  layer1.addChild(blankSignSprite);

  blankSignSprite.visible = false;

  let dSprite = null;
  dSprite = PIXI.Sprite.from("gfx/waterdrop.png");
  layer1.addChild(dSprite);
  dSprite.x = startReelX + x * symbolDX;
  dSprite.y = startReelY + y * symbolDY;

  dSprite.visible = false;

  winText = new PIXI.Text(0, fontStyle);
  winText.x = 80;
  winText.y = 115;
  winText.anchor.x = winText.anchor.y = 0.5;
  blankSignSprite.addChild(winText);
  winText.text = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  winText.visible = false;



  let symbol = {
    blank: blank,
    watered: false,
    x: x,
    y: y,
    value: value,
    fruitSprite: fSprite,
    signSprite: sSprite,
    blankSignSprite: blankSignSprite,
    waterSprite: dSprite,
    winText: winText
  };

  return symbol;
}


/////////////////////////////////////////////
//
function destroySymbol(sym) {

  if (sym.waterSprite != null) {
    sym.waterSprite.parent.removeChild(sym.waterSprite);
  }

  if (sym.winText != null) {
    sym.winText.parent.removeChild(sym.winText);
  }

  sym.blankSignSprite.parent.removeChild(sym.blankSignSprite);

  if (sym.signSprite != null) {
    sym.signSprite.parent.removeChild(sym.signSprite);
  }

  if (sym.fruitSprite != null) {
    sym.fruitSprite.parent.removeChild(sym.fruitSprite);
  }

  sym.waterSprite = null;
  sym.winText = null;
  sym.blankSignSprite = null;
  sym.signSprite = null;
  sym.fruitSprite = null;
}
