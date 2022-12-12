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

// testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`

const dataArray = dataString.split('\n');

const letterValue = (letter) => {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter) + 1;
}

const groupByThree = (rucksackArray) => {
    let resArr = [];
    let i = 0;
    for (let rucksack of rucksackArray) {
        const index = Math.floor(i/3);
        if (!resArr[index]) resArr[index] = [];
        resArr[index].push(rucksack);
        ++i;
    }
    return resArr;
}

const findCommonLetter = (rucksackArray) => {
    let hashTable = {};
    for (let letter of [...rucksackArray[0]]) hashTable[letter] = 0;
    for (let letter of [...rucksackArray[1]]) if (hashTable[letter] === 0) hashTable[letter] = 1;
    for (let letter of [...rucksackArray[2]]) if (hashTable[letter] === 1) return letter;
}

const findBadge = (rucksackArray) => {
 
    const groupedRucksacks = groupByThree(rucksackArray);

    let commonLetters = [];
    for (let rucksackGroup of groupedRucksacks) commonLetters.push(findCommonLetter(rucksackGroup))

    let letterAggregator = 0;
    for (letter of commonLetters) letterAggregator += letterValue(letter);

    console.log(letterAggregator);
}

findBadge(dataArray);