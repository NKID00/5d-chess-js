const Chess = require('@local/index');

test("Brawn normal moves", () => {
  let chess = new Chess();
  expect(() => {
    // Position with brawns, random move to not upset the warn
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [w3/4/4/WW*1B:0:1:w]

    1. Bc2
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    //
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]

    1. Wa2
    `, 'custom');
  }).not.toThrow();

  // Suppress error because of https://github.com/facebook/jest/issues/5785
  // The issue isn't getting solved anytime soon, and we have to use hacks like this one
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
  expect(() => {
    // Moved brawn double push, white
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]

    1. Wa3
    `, 'custom');
  }).toThrow();

  expect(() => {
    // Moved brawn double push, black
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/1W2:0:1:w]

    1. Wb2 / Wa2
    `, 'custom');
  }).toThrow();
  console.error.mockRestore();

  expect(() => {
    // Normal push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]

    1. Wb2
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    // Double push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]

    1. Wb3
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    // Black normal push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/1W2:0:1:w]

    1. Wb2 / Wa3
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    // Black normal push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/W3:0:1:w]

    1. Wa2 / Wb3
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    // Black normal double push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/W3:0:1:w]

    1. Wa2 / Wb2
    `, 'custom');
  }).not.toThrow();
});

test("Brawn advanced moves", () => {
  let chess = new Chess();

  expect(() => {
    // TY-capture
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/WW2:0:1:w]

    1. Wa2 / Wa3
    2. Wb2 / (0T2)Wa3>>x(0T1)a2~
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    // TY- and LT-captures
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/WW2:0:1:w]

    1. Wa2 / Wa3
    2. Wb2 / (0T2)Wa3>>x(0T1)a2~
    3. (0T3)Wa2>x(-1T2)a2
    `, 'custom');
  }).not.toThrow();

  expect(() => {
    // LY-capture
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/WW2:0:1:w]

    1. Wa2 / Wa3
    2. Wb2 / (0T2)Wa3>>x(0T1)a2~
    3. (-1T2)Wb2 / (-1T2)Wa3
    4. (-1T3)Wb3 (0T3)Wb3 / (-1T3)Wa3>x(0T3)a2
    `, 'custom');
  }).not.toThrow();


  expect(() => {
    // LX-capture
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/WW2:0:1:w]

    1. Wa2 / Wa3
    2. Wb2 / (0T2)Wa3>>x(0T1)a2~
    3. (-1T2)Wb2 / (-1T2)Wa3
    4. (-1T3)Wb3 (0T3)Wb3 / (-1T3)Wa3>x(0T3)b3
    `, 'custom');
  }).not.toThrow();


  expect(() => {
    // Promotion
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [w3/4/4/WW*1Q:0:1:w]

    1. Wb3 / Wa3
    2. Wb4=Q
    `, 'custom');
  }).not.toThrow();
});
