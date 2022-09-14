

////////////////////////////////////////////
//
function isSymbolBlank() {
  let res = true;
 


  let notBlank = document.getElementById("gravity").value;


  let r = Math.floor(Math.random() * 100);
  if (r < notBlank) {
    res = false;
  }

  return res;
}


////////////////////////////////////////////
//
function isSymbolWatered() {
  let res = false;
  let r = Math.floor(Math.random() * 100);
  if (r < 20) {
    res = true;
  }

  return res;
}


////////////////////////////////////////////
//
function getRandomFruit() {
  let r = Math.floor(Math.random() * 4);
  let res;

  if (r == 0) {
    res = FRUIT.F1;
  } else if (r == 1) {
    res = FRUIT.F2;
  } else if (r == 2) {
    res = FRUIT.F3;
  } else if (r == 3) {
    res = FRUIT.F4;
  } else {
    console.assert(false, "bad maths");
  }

  return res;
}
