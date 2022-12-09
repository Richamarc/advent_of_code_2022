const fs = require('fs');
const filename = process.argv[2];

const dataString = fs.readFileSync(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  return data;
});

const dataArray = dataString.split('\n');
let backpack = [];
let heaviestElf = 0;
dataArray.forEach(foodItem => {
    if (foodItem) {
        backpack.push(Number(foodItem));
    } else {
        const backpackWeighed = backpack.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        );
        if (heaviestElf < backpackWeighed ) {
            heaviestElf = backpackWeighed};
        backpack = [];
    }
})
console.log(heaviestElf);