
/* How to markov chain
Analyse the three most recent moves
take input as a list, iterate over the list, analysing the move and the two last moves, put in an object
*/

var probability = {};
var winMoves = {"r" : 'p', 'p' : 's', 's' : 'r'};

//populate the object
var log = "rpspsprrpsrpsrpsrpssprprsprps";
for(var i = 0; i <3 ; i++)
{
    probability["rps"[i]] = {}; //define as empty
    for (var j = 0; j < 3; j++) {
        probability["rps"[i]]["rps"[j]] = {}; //define as empty

        for(var k = 0; k < 3; k++)
        {
            chain = "rps"[i] + "rps"[j] + "rps"[k];
            probability["rps"[i]]["rps"[j]]["rps"[k]] = 0; //add content
        }
    }
}
/**
 * Returns a char
 * @return {string} ['r'||'p'||'s']
 */
exports.choose = function(){
    var prev = getPreviousMoves();
    var nextMoves = probability[prev[0]][prev[1]];
    //Chose the most probable move:
    nextMove = 'r';
    var highest = 0;
    for (var key in nextMoves){//Loop through and get the highest probability
        if(nextMoves[key] > highest){
            highest = nextMoves[key];
            nextMove = key;
        }
        else if (nextMoves[key] == highest) {//Equal probability: pick random
            if(Math.floor((Math.random()*100)%2)) //50% chance of overwriting previous high
                nextMove = key;
        }
    }
    //nextMove is what the ai guesses you
    nextMove = winMoves[nextMove];
    return nextMove;//return probability;
}
/**
 * Accepts a move, updates the probability and returns success
 * @param  {char} userChoice takes either r p or s as a char
 * @return {bool}            success
 */
exports.userChoice = function(userChoice)
{
    if(!checkUserInput(userChoice))
    {
        console.log("userString is in the wrong format");
        return false;
    }
    var trainString = getPreviousMoves() + userChoice;
    train(trainString);
    log += userChoice;
    return true;
}
/**
 * Gets the two previous moves
 * @return {string[2]} a string of the two previos moves
 */
function getPreviousMoves()
{
    return log.substring(log.length-2)
}

function train(trainString)//if a user wins, add something to the probability chart
{
    console.log(trainString);
    probability[trainString[0]][trainString[1]][trainString[2]] += 1;

}

function checkUserInput(userChoice)
{
    return true;
}

exports.rock = function(){
    userChoice('r');
}
exports.paper = function(){
    userChoice('p');
}
exports.scissor = function(){
    userChoice('s');
}



for(var i = 2; i < log.length; i++)
    train(log.substring(i-2,i+1));
