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

function findMatchingId(currentId, otherIds) {
  return otherIds.find(other => {
    let misMatchCount = 0;
    other.split('').forEach((letter, index) => {
      if(currentId[index] !== letter) {
        ++misMatchCount;
      }
    });
    if (misMatchCount > 1) {
      return false;
    }
    return true;
  });
}

function filterOutMismatch(currentId, matchingId) {
  const current = currentId.split('');
  const matching = matchingId.split('');
  let misMatchIndex = null;
  let i = 0;
  while(misMatchIndex === null) {
    if(current[i] !== matching[i]) {
      misMatchIndex = i;
    }
    ++i;
  }
  current[misMatchIndex] = null;
  return current.filter(n => n).join('');
}

function partTwo() {
  for (let i = 0; i < input.length; i++) {
    const currentId = input[i];
    const matchingId = findMatchingId(currentId, input.slice(i + 1));
    if(matchingId) {
      return filterOutMismatch(currentId, matchingId);
    }
  }
}

console.log(`PART 1: solution = ${partOne()}`);
console.log(`PART 2: solution = ${partTwo()}`);