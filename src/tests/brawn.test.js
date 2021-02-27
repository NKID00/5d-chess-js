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
    // White single brawn push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]
    `, 'custom');
    chess.move('Wa2');
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
    `, 'custom');
    chess.move('Wa3');
  }).toThrow();

  expect(() => {
    // Moved brawn double push, black
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/1W2:0:1:w]
    `, 'custom');
    chess.move('Wb2');
    chess.submit();
    chess.move('Wa2');
  }).toThrow();
  console.error.mockRestore();

  expect(() => {
    // Normal push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]
    `, 'custom');
    chess.move('Wb2');
  }).not.toThrow();

  expect(() => {
    // Double push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [4/4/4/WW*2:0:1:w]
    `, 'custom');
    chess.move('Wb3');
  }).not.toThrow();

  expect(() => {
    // Black normal push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/1W2:0:1:w]
    `, 'custom');
    chess.move('Wb2');
    chess.submit();
    chess.move('Wa3');
  }).not.toThrow();

  expect(() => {
    // Black normal push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/W3:0:1:w]
    `, 'custom');
    chess.move('Wa2');
    chess.submit();
    chess.move('Wb3');
  }).not.toThrow();

  expect(() => {
    // Black normal double push
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [ww*2/4/4/W3:0:1:w]
    `, 'custom');
    chess.move('Wa2');
    chess.submit();
    chess.move('Wb2');
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
    2. Wb2
    `, 'custom');
    chess.move('(0T2)Wa3>>x(0T1)a2~');
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
    `, 'custom');
    chess.move('(0T3)Wa2>x(-1T2)a2');
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
    4. (-1T3)Wb3 (0T3)Wb3
    `, 'custom');
    chess.move('(-1T3)Wa3>x(0T3)a2');
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
    4. (-1T3)Wb3 (0T3)Wb3
    `, 'custom');
    chess.move('(-1T3)Wa3>x(0T3)b3');
  }).not.toThrow();


  expect(() => {
    // Promotion
    chess.import(`
    [Size "4x4"]
    [Mode "5D"]
    [Board "custom"]
    [w3/4/4/WW*1Q:0:1:w]

    1. Wb3 / Wa3
    `, 'custom');
    chess.move('Wb4=Q');
  }).not.toThrow();

  expect(() => {
    // En passant
    chess.import(`
    [Size "5x5"]
    [Mode "5D"]
    [Board "custom"]
    [w*w*w*w*k/5/5/5/KW*W*W*W*:0:1:w]

    1. (0T1)Wd3 / (0T1)Wa3
    2. (0T2)Wc3 / (0T2)Wd4
    3. (0T3)Wb2 / (0T3)Wdxc3
    4. (0T4)Wxa3 / (0T4)Wc2
    5. (0T5)Kb2 / (0T5)Wc3+
    `, 'custom');
    chess.move('Wxc4');
    chess.submit();
    chess.move('Wxc4');
  });
});


test("Brawn check/checkmates", () => {
  let chess = new Chess();

  expect(() => {
    chess.import(`
    [Size "5x5"]
    [Mode "5D"]
    [Board "custom"]
    [w*w*w*w*k/5/5/5/KW*W*W*W*:0:1:w]
    `);
  }).not.toThrow();

  expect(() => {
    chess.import(`
    [Size "5x5"]
    [Mode "5D"]
    [Board "custom"]
    [w*w*w*w*k/5/5/5/KW*W*W*W*:0:1:w]

    1. (0T1)Wd3 / (0T1)Wa3
    2. (0T2)Wc3 / (0T2)Wd4
    3. (0T3)Wb2 / (0T3)Wdxc3
    4. (0T4)Wxa3 / (0T4)Wc2
    5. (0T5)Kb2 / (0T5)Wc3+
    6. (0T6)Wxc4 / (0T6)Wxc4
    7. (0T7)We3 / (0T7)Wc3+
    8. (0T8)Kxc2 / (0T8)Ke5>>(0T7)e4
    9. (-1T8)Kb2>>(0T7)a2 / (+1T7)Wc3+
    10. (+1T8)Kxc2 / (-1T8)Kxe3 (+1T8)Kd5#
    `);
  }).not.toThrow();

  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(true);
  expect(chess.inStalemate).toBe(false);
});
