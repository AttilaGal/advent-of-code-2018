function inputToClaim(input, clothWidth, clothHeight) {
  const [ id, at, offsets, size ] = input.split(' ');
  const [ offsetLeft, offsetTop ] = offsets
    .substr(0, offsets.length - 1)
    .split(',')
    .map(o => Number(o));
  const [ width, height ] = size.split('x');
  let claim = [];
  for (let height = 0; height < clothHeight; height++) {
    const row = [];
    for (let width = 0; width < clothWidth; width++) {
      row.push(0);
    }
    claim.push(row);
  }
  for(let top = offsetTop, counterTop = 0; counterTop < height; ++top, ++counterTop){
    for(let side = offsetLeft, counterLeft = 0; counterLeft < width; ++side, ++counterLeft){
      claim[top][side] += 1;
    }
  }
  return claim;
}

function inputToClaimWithId(input, clothWidth, clothHeight) {
  const id = input.split(' ')[0];
  return {
    id,
    pattern: inputToClaim(input, clothWidth, clothHeight)
  };
}

function joinClaims(claimA, claimB) {
  const claimUpdate = [...claimA];
  for (let i = 0; i < claimA.length; ++i) {
    const row = claimA[i];
    for (let j = 0; j < row.length; ++j) {
      claimUpdate[i][j] += claimB[i][j];
    }
  }
  return claimUpdate;
}

function isPatternStandAlone(bundled, pattern) {
  for (let row = 0; row < pattern.length; row++) {
    for (let column = 0; column < pattern[row].length; column++) {
      if(pattern[row][column] && bundled[row][column] > 1) {
        return false;
      }
    }
  }
  return true;
}

module.exports = {
  inputToClaim,
  joinClaims,
  inputToClaimWithId,
  isPatternStandAlone,
};