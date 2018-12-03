const { readInputFile } = require('../utils/fileReader');

const input = readInputFile('./chronalCalibration.input.txt');

const result = input.reduce((acc, change) => acc + Number(change), 0);
console.log(`solution = ${result}`);