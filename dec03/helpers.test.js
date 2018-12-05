const { 
  inputToClaim,
  inputToClaimWithId,
  joinClaims,
  isPatternStandAlone,
} = require('./helpers');
describe('helpers', () => {
  test('inputToClaim should return the correct claim', () => {
    expect(inputToClaim('#123 @ 3,2: 5x4', 11, 9)).toEqual([
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
    ]);
  });
  test('inputToClaim should return the correct claim', () => {
    expect(inputToClaimWithId('#123 @ 3,2: 5x4', 11, 9)).toEqual({
      id: '#123',
      pattern: [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
      ]
    });
  });

  test('joinClaims should add upp the array correctly', () => {
    const claim = inputToClaim('#123 @ 3,2: 5x4', 11, 9);
    expect(joinClaims(claim, claim)).toEqual([
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,2,2,2,2,2,0,0,0],
      [0,0,0,2,2,2,2,2,0,0,0],
      [0,0,0,2,2,2,2,2,0,0,0],
      [0,0,0,2,2,2,2,2,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
    ]);
  });

  test('isPatternStandAlone, should return false when patterns overlap, even with 1 field', () => {
    const bundledPattern = [
      [0,0,2,2],
      [0,0,2,2],
      [0,0,0,0],
      [0,0,0,0],
    ];
    const potentialStandalone = [
      [0,0,0,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
    ];
    expect(isPatternStandAlone(bundledPattern, potentialStandalone)).toBe(false);
  });

  test('isPatternStandAlone, should return true when patterns don\'t overlap', () => {
    const bundledPattern = [
      [0,0,2,2],
      [0,0,2,2],
      [0,0,0,0],
      [0,0,0,0],
    ];
    const potentialStandalone = [
      [0,0,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0],
    ];
    expect(isPatternStandAlone(bundledPattern, potentialStandalone)).toBe(true);
  });
});