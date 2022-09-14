//////////////////////////////////////
//
function createWaterCans() {



  let delay = 0;
  for (let i = 0; i < numSymbolsX; ++i) {

    let sprite = null;
    sprite = PIXI.Sprite.from("gfx/watercan.png");
    layer2.addChild(sprite);
      
    sprite.x = startReelX + i * symbolDX;
    sprite.y = waterCanStartY;

    watercans[watercans.length] = sprite;

    sprite.delay = delay;
    sprite.delayTracker = 0;
    sprite.symbolsPassed = [false, false, false, false, false, false];
    delay += waterCanDelay;  
  }
}


//////////////////////////////////////
//
function moveWaterCans(delta) {
  let res = true;

  for (let i = 0; i < watercans.length; ++i) {

    if (watercans[i].y < watercanFinishY) {
      res = false;
      if (watercans[i].delayTracker < watercans[i].delay) {
        watercans[i].delayTracker += delta;
      } else {
        watercans[i].y += watercanSpeed * delta;

        for (let r = 0; r < rows; ++r) {
          if (watercans[i].symbolsPassed[r] == false &&
            watercans[i].y > rowlines[r]) {
            watercans[i].symbolsPassed[r] = true;
            setSymbolWaterVisibility(i, r, isSymbolWatered());
          }

            rowlines
        }

      }
    } else {
      watercans[i].y = watercanFinishY;
      watercans[i].visible = false;
    }

  }

  return res;

}


//////////////////////////////////////
//
function resetWaterCans() {
  for (let i = 0; i < watercans.length; ++i) {
    watercans[i].y = waterCanStartY;
    watercans[i].visible = true;
    watercans[i].symbolsPassed = [false, false, false, false, false, false];
   
  }
}


