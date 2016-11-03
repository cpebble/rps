//C prototypen er for at vise at jeg kan bruge low-level sprog, men i nodejs
//Kan jeg lave programmet meget mere lækker
//På grund af det høje abstraktionsniveau
const readlineSync = require('readline-sync');
const colors = require('colors');
const clear = require('clear');

//Import strings
const strings = require("./languages/english.js")

//Array log of previous moves when playing against AI
var a = [];

/*--features--
* = implemented | - = planned
*play against computer
*play against human on same device
*Colored output
*listed selection
*yes no selection
*Banner
*Continous playing
*Language selection
  english
  danish
*ascii graphics
-neural network for ai


*/

//score, p2 indeholder ai eller spiller 2
var p1s = 0;
var p2s = 0;
var tie = 0;

var version = 0.1;

console.log(strings.lang.versionL + ": " + version);
console.log("Christian Egon Sørensen, MIT " + strings.lang.licens);

//Banner generatoren
//Made with figlet
function redraw(){
  clear()
  console.log(" ____            _        ____")
  console.log("|  _ \\ ___   ___| | __   |  _ \\ __ _ _ __   ___ _ __");
  console.log("| |_) / _ \\ / __| |/ /   | |_) / _` | '_ \\ / _ \\ '__|");
  console.log("|  _ < (_) | (__|   < _  |  __/ (_| | |_) |  __/ | _");
  console.log("|_| \\_\\___/ \\___|_|\\_( ) |_|   \\__,_| .__/ \\___|_|( )");
  console.log("                     |/             |_|           |/");
  console.log(" ____       _");
  console.log("/ ___|  ___(_)___ ___  ___  _ __");
  console.log("\\___ \\ / __| / __/ __|/ _ \\| '__|");
  console.log(" ___) | (__| \\__ \\__ \\ (_) | |");
  console.log("|____/ \\___|_|___/___/\\___/|_|");
}

function rock(){
  console.log("    _______");
  console.log("---'   ____)");
  console.log("      (_____)");
  console.log("      (_____)");
  console.log("      (____)");
  console.log("---.__(___)");
}

function paper(){
console.log("    _______");
console.log("---'   ____)____");
console.log("          ______)");
console.log("          _______)");
console.log("         _______)");
console.log("---.__________)");
}

function scissor(){
  console.log("    _______");
  console.log("---'   ____)____");
  console.log("          ______)");
  console.log("       __________)");
  console.log("      (____)");
  console.log("---.__(___)");
}

//prints hand, x is the signal code
function mkHand(x,y){
  //TODO: Needs refactoring
  for(i = 1; i < 3; i++){
    if(i == 2)
      x = y;
    switch (x) {
      case 1:
        rock();
        break;
      case 2:
        scissor();
        break;
      case 3:
        paper();
        break;
      default:
        break;
    }
  }
}

redraw();

//Allowed moves, obsolete
//const aMoves = [1,2,3];

//Names aMoves
const nMoves = [strings.lang.rock, strings.lang.paper, strings.lang.scissor];

//Declaration of variables holding player moves
var p1 = 0;
var p2 = 0;

//Checks if any player cancels the game
function checkCancel(x){
  if(x == -1){
    console.log(strings.lang.cancel.red);
    process.exit()
  }
}

//checker om nogen har vundet
//refactored function
//X is a bool telling if were playing against AI
function checkWin(p1,p2,ai){
  //Hvis det er samme værdi er x - y nul
  if(ai){
    if(p1 - p2 == 0){
      console.log(strings.lang.draw.yellow);
      tie++;
    }
    if((p1 == 1 && p2 == 2) || (p1 == 2 && p2 == 3) || (p1 == 3 && p2 == 1)){
      console.log(strings.lang.pwin.green);
      p1s++;
    }
    if((p2 == 1 && p1 == 2) || (p2 == 2 && p1 == 3) || (p2 == 3 && p1 == 1)){
      console.log(strings.lang.aiwin.green);
      p2s++;
    }
    mkHand(p1,p2);
    console.log(strings.lang.score + "\n" + strings.lang.p + ": " + p1s + "\n" + strings.lang.ai + ": " + p2s + "\n" + strings.lang.tie + ": " + tie);
  }
  else{
    if(p1 - p2 == 0){
      console.log(strings.lang.draw.yellow);
      tie++;
    }
    if((p1 == 1 && p2 == 2) || (p1 == 2 && p2 == 3) || (p1 == 3 && p2 == 1)){
      console.log(strings.lang.p1win.green);
      p1s++;
    }
    if((p2 == 1 && p1 == 2) || (p2 == 2 && p1 == 3) || (p2 == 3 && p1 == 1)){
      console.log(strings.lang.p2win.green);
      p2s++;
    }
    mkHand(p1,p2);
    console.log(strings.lang.score + "\n" + strings.lang.p1 + ": " + p1s + "\n" + strings.lang.p2 + ": " + p2s + "\n" + strings.lang.tie + ": " + tie);
  }
}

//Cheker om nogen har vundet, gamle version
/*
function checkWinOld(p1,p2){
  if (p1 == 1) {
    if (p2 == 1)
      console.log("Draw".yellow);
    if (p2 == 2)
      console.log("p1 wins!".green);
    if(p2 == 3)
      console.log("p2 wins!".green);
  }
  if (p1 == 2) {
    if (p2 == 2)
      console.log("Draw".yellow);
    if (p2 == 3)
      console.log("p1 wins!".green);
    if(p2 == 1)
      console.log("p2 wins!".green);
  }
  if (p1 == 3) {
    if (p2 == 3)
      console.log("Draw".yellow);
    if (p2 == 2)
      console.log("p1 wins!".green);
    if(p2 == 1)
      console.log("p2 wins!".green);
  }
}*/

//Checks if we should keep playing
//It's a function because that makes it easy to refactored
//if true, against ai, else against player
function kp(x){
  if(!readlineSync.keyInYN(strings.lang.keepPlaying)){
    console.log(strings.lang.goodbye.inverse);
    console.log(a);
    process.exit();
  }

  redraw();

  if(x)
    ai();
  else
    pvp();
}

function ai(){
  var p1 = readlineSync.keyInSelect(nMoves, strings.lang.eMove);
  checkCancel(p1);
  p1++;

  //Push move to log
  a.push(p1);

  /* Old implementation, random
  //Gets a random number between 0.0 and 1.0
  p2 = Math.random()
  //Maps the random number to a move
  if(p2 < 0.333)
    p2 = 1;
  if(p2 < 0.666)
    p2 = 2;
  if(p2 > 0.666 && p2 < 1)
    p2 = 3;*/

  //Statistical analyzis of previous inputs
  var o1, o2, o3, o;
  for (var i = 0; i < a.length; i++) {
    if(a[i] == 1)
      o1++;
    if(a[i] == 2)
      o2++;
    if(a[i] == 3)
      o3++;
  }

  if(o1 > o2 && o1 > o3)
    o = 2;
  if(o2 > o1 && o2 > o3)
    o = 1;
  if(o3 > o1 && o3 > o2)
    o = 3;
  else {
    o = 1;
  }

  switch (o) {
    case 1:
      p2 = 2;
      break;
    case 1:
      p2 = 3;
      break;
    case 1:
      p2 = 1;
      break;
    default:

  }

  redraw();

  checkWin(p1,p2,true);
  kp(true);
}

function pvp(){
  //Get's index of answer, technically making aMoves uneccesarry
  //Because the index of nMoves is the same as the numerical value
  //Of that move
  var p1 = readlineSync.keyInSelect(nMoves, strings.lang.eMove);
  checkCancel(p1);

  //TODO: clear screen
  //DONE;
  redraw();

  var p2 = readlineSync.keyInSelect(nMoves, strings.lang.eMove);
  checkCancel(p2);

  redraw();

  //Key in select returns index numericaly ordered at zero
  //We want it at one after checking the input
  p1++;
  p2++;

  //Testing code, left for ease of use
  //console.log(p1 + " " + p2);

  redraw();

  checkWin(p1,p2,false);
  kp(false);
}

//Checks if the player want's to to play agains ai
if(readlineSync.keyInYN(strings.lang.againstAI))
  ai();
else
  pvp();
