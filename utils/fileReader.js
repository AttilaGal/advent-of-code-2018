const fs = require('fs');

function readInputFile(path) {
  return fs.readFileSync(path).toString().split("\n");
}

module.exports = {
  readInputFile,
};