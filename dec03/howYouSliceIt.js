const { inputToClaim, joinClaims } = require('./helpers');

const { readInputFile } = require('../utils/fileReader');
const input = readInputFile('./dec03/input.txt');

function bundleClaims(allClaims) {
  let bundledClaims = null;
  for (let i = 0; i < allClaims.length; i++) {
    const claim = inputToClaim(allClaims[i], 10, 10);
    if(!bundledClaims) {
      bundledClaims = claim;
    } else {
      bundledClaims = joinClaims(bundledClaims, claim);
    }
  }
  return bundledClaims;
}

function partOne() {
  const bundledClaims = bundleClaims(input);
  return bundledClaims.reduce((acc, row) => {
    row.forEach(number => {
      if (number >= 2) {
        acc++;
      }
    });
    return acc;
  }, 0);
}

console.log(`PART 1: solution = ${partOne()}`);