// 
// accept filename as argument for function
// 

const fs = require('fs');
const filename = process.argv[2];

const dataString = fs.readFileSync(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  return data;
});

// 
// function section
// consider the guide a recommendation of strategy, and each row is a play.
// opponent decision is A for Rock, B for Paper, and C for Scissors
// your decision is X for Rock, Y for Paper, and Z for Scissors
// 

// points system is shape selected: Rock is 1, Paper is 2, and Scissors is 3 points
// + if you won or not: 0 for lost, 3 for draw and 6 for win
// A beats Z
// B beats X
// C beats Y
// Z beats B
// Y beats A
// X beats C


const translateOpp = {
    A: "Rock",
    B: "Paper",
    C: "Scissors"
}

const translateYour = {
    X: "Rock",
    Y: "Paper",
    Z: "Scissors"
}

// your decision, then their decision
const decisionGuide = {
    "Rock": { "Rock": 3, "Paper": 0, "Scissors": 6},
    "Paper": { "Rock": 6, "Paper": 3, "Scissors": 0},
    "Scissors": { "Rock": 0, "Paper": 6, "Scissors": 3}
}

const pointGuide = {
    "Rock": 1,
    "Paper": 2,
    "Scissors": 3
}

const checkOutcome = (opponent, you) => {
    const oppD = translateOpp[opponent];
    const yourD = translateYour[you];
    if (oppD && oppD === yourD) return 3 + pointGuide[yourD];
    else if (oppD) {
        return decisionGuide[yourD][oppD] + pointGuide[yourD];
    }
}

// 
// main function
// 

let totalScore = 0;
const strategyArray = dataString.split('\n');
strategyArray.forEach((play, i) => {
    const oppDecision = play.slice(0,1);
    const yourDecision = play.slice(-1);
    if (oppDecision) {
        const outcomeValue = checkOutcome(oppDecision, yourDecision);
        totalScore = totalScore + outcomeValue;
    }
    
})
console.log(totalScore);