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

// two halves of each rucksack, one value is on both sides
// could split sides into two - hash one side, 
// then check the object for all letters in the other side
// 

const dataArray = dataString.split('\n');

const letterValue = (letter) => {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter) + 1;
}

const sortRucksack = (rucksackArray) => {
    let letterAggregator = 0;
    for (let rucksack of rucksackArray) {
        const length = rucksack.length;
        const firstHalf = [...rucksack].slice(0, length/2)
        const secondHalf = [...rucksack].slice(length/2);
        let obj = {};
        let duplicateLetter = '';
        // assign all first half letters as keys in object
        firstHalf.forEach(letter => {
            obj[letter] = true;
        });
        // check which letter in the second half is already assigned in that object
        secondHalf.forEach(letter => {
            if (obj[letter]) duplicateLetter = letterValue(letter);
        });
        letterAggregator += duplicateLetter;
    }
    console.log(letterAggregator);
}

sortRucksack(dataArray);