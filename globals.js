let gWin = 0;
let gBalance = 10000;
let gBet = 100;

let reels = 6;
let rows = 6;

let layer1;
let layer2;

const rowlines = [363, 530, 697, 864, 1031, 1198];

const xsize = 1080;
const ysize = 1920;

const symbolDX = 164;
const symbolDY = 167;

const startReelX = 50;
const startReelY = 204;

const symbolImageSize = 160;

const screenScale = 0.4;

const halfx = xsize / 2;

const buttonX = halfx;
const buttonY = 1450;

const numSymbolsX = 6;
const numSymbolsY = 6;


const FRUIT = {
  BLANK: "blank",
  F1: "fruit1",
  F2: "fruit2",
  F3: "fruit3",
  F4: "fruit4"
};


const waterCanStartY = 70;
let waterCanY = [];
let waterCanDelay = 10;
let watercanFinishY = 1295;
let watercanSpeed = 25.0; 

let symbols = [];
let watercans = [];

let signScale = 0.0;
let fruitScale = 0.0;

let waterDrops = [];


let rtpText;


