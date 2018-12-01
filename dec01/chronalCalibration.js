const input = require('./chronalCalibration.input.js');

const result = input.reduce((acc, change) => acc + change, 0);
console.log(`solution = ${result}`);