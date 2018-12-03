const { readInputFile } = require('../utils/fileReader');

const input = readInputFile('./chronalCalibration.input.txt');

const result = input.reduce((acc, change) => acc + Number(change), 0);
console.log(`PART 1: solution = ${result}`);

function partTwo() {
  const foundFrequencies = new Set([0]);
  let currentFrequency = 0
  while(true) {
    for (let i = 0; i < input.length; i++) {
      const modifier = input[i];
      currentFrequency += Number(modifier);
      if(foundFrequencies.has(currentFrequency)) {
        return currentFrequency;
      }
      foundFrequencies.add(currentFrequency);
    }
  }
}

const resultPartTwo = partTwo();
console.log(`PART 2: solution = ${resultPartTwo}`);
