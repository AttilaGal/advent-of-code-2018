const { readInputFile } = require('../utils/fileReader');
const input = readInputFile('./dec02/inventoryManagementSystem.input.txt');

function partOne() {
  const checkSumvariables = input.reduce(function (acc, currentId) {
    let checkedLetters = [];
    let countedDoubleLetter = false;
    let countedTrippleLetter = false;
    const splitted = currentId.split('');
    splitted.forEach(function(letter) {
      if(!checkedLetters.includes(letter) && (!countedDoubleLetter || !countedTrippleLetter)) {
        const letterCount = splitted.filter(l => l === letter).length;
        if(letterCount === 2 && !countedDoubleLetter) {
          ++acc.twice;
          countedDoubleLetter = true;
        }
        if(letterCount === 3 && !countedTrippleLetter) {
          ++acc.thrice;
          countedTrippleLetter = true;
        }
        checkedLetters.push(letter);
      }
    });
    return acc;
  }, {twice: 0, thrice: 0});
  return checkSumvariables.twice * checkSumvariables.thrice;
}

console.log(`PART 1: solution = ${partOne()}`);