

////////////////////////////////////////////
//
function isSymbolBlank() {
  let res = true;
 
  let notBlank = document.getElementById("signpct").value;


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
  let wet = document.getElementById("waterpct").value;

  let r = Math.floor(Math.random() * 100);
  if (r < wet) {
    res = true;
  }

  return res;
}

////////////////////////////////////////////
//
function getFruitPay(fruit) {
  let num = 0;

  if (fruit == FRUIT.F1) {
    num = document.getElementById("pay1").value;
  } else if (fruit == FRUIT.F2) {
    num = document.getElementById("pay2").value;
  } else if (fruit == FRUIT.F3) {
    num = document.getElementById("pay3").value;
  } else if (fruit == FRUIT.F4) {
    num = document.getElementById("pay4").value;
  }

  return num;
}



////////////////////////////////////////////
//
function getRandomFruit() {
  

  let c1 = 10000.0 * document.getElementById("chance1").value;
  let c2 = 10000.0 * document.getElementById("chance2").value;
  let c3 = 10000.0 * document.getElementById("chance3").value;
  let c4 = 10000.0 * document.getElementById("chance4").value;

  let sum = c1 + c2 + c3 + c4;

  let r = Math.floor(Math.random() * sum);
  let res;

  if (r < c1) {
    res = FRUIT.F1;
  } else if (r < c1 + c2) {
    res = FRUIT.F2;
  } else if (r < c1 + c2 + c3) {
    res = FRUIT.F3;
  } else {
    res = FRUIT.F4;
  }

  return res;
}

////////////////////////////////////////////
//
function simGames(num) {

  let sumWin = 0;
  let sumBet = 0;
  for (let i = 0; i < num; ++i) {

    gBalance -= gBet;
    gWin = 0;

    for (let i = 0; i < reels * rows; ++i) {
      if (!isSymbolBlank() && isSymbolWatered()) {
        let fruit = getRandomFruit();
        let pay = getFruitPay(fruit);
        gWin += Number(pay);        
      }
    }
    gBalance += (gWin * 100);

    sumBet += gBet;
    sumWin += (gWin * 100);

    //console.log("game: " + i + "; balance: " + gBalance);
  }

  let rtp = 100 * sumWin / sumBet;
  rtpText.text = "%" + rtp;
  console.log("RTP: %" + rtp);

}

