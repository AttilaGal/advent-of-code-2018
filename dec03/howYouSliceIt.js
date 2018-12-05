const { inputToClaim, inputToClaimWithId, joinClaims, isPatternStandAlone } = require('./helpers');

const { readInputFile } = require('../utils/fileReader');
const input = readInputFile('./dec03/input.txt');

function bundleClaims(allClaims) {
  let bundledClaims = null;
  for (let i = 0; i < allClaims.length; i++) {
    const claim = inputToClaim(allClaims[i], 1000, 1000);
    if(!bundledClaims) {
      bundledClaims = claim;
    } else {
      bundledClaims = joinClaims(bundledClaims, claim);
    }
  }
  return bundledClaims;
}

function partOne(bundledClaims) {
  return bundledClaims.reduce((acc, row) => {
    row.forEach(number => {
      if (number >= 2) {
        acc++;
      }
    });
    return acc;
  }, 0);
}

function partTwo(bundledClaims) {
  for (let i = 0; i < input.length; i++) {
    const claim = inputToClaimWithId(input[i], 1000, 1000);
    if(isPatternStandAlone(bundledClaims, claim.pattern)) {
      return claim.id;
    }
  }
}

const bundledClaims = bundleClaims(input);
console.log(`PART 1: solution = ${partOne(bundledClaims)}`);
console.log(`PART 2: solution = ${partTwo(bundledClaims)}`);