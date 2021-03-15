const Chess = require('@local/index');

test('5DFEN importing', () => {
  var chess = new Chess(undefined, undefined, true);
  chess.import(`
[size "8x8"]
[board "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1. e3
  `);

  expect(() => {
    // One too many 8/
    chess.import(`
[size "8x8"]
[board "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1. e3
    `);
  }).toThrow();

  expect(() => {
    // Missing pawn
    chess.import(`
[size "8x8"]
[board "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1. e3
    `);
  }).toThrow();

  expect(() => {
    // a4-pawn
    chess.import(`
[size "8x8"]
[board "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/P7/8/1P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1. a5
    `);
  }).not.toThrow();

  expect(() => {
    // Turn-1 castle
    chess.import(`
[size "8x8"]
[board "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/P7/8/1P*P*P*P*P*P*P*/R*NBQK*2R*:0:1:w]
1. O-O
    `);
  }).not.toThrow();

  expect(() => {
    // Boring chess
    chess.import(`
[size "2x2"]
[board "custom"]
[pk/KP:0:1:w]
    `);
  }).not.toThrow();

  expect(() => {
    // Rook tactics 1
    chess.import(`
[size "5x5"]
[board "custom"]
[puzzle "mate-in-1"]
[4k/5/5/5/K1R2:0:1:w]

1. Kb2 / Ke4
2. Re1 / Kd3
    `);
  }).not.toThrow();
});

test('5DFEN importing over non-custom variant in GUI', () => {
  expect(() => {
    let chess = new Chess();
    chess.import(`
[Board "custom"]
[Size "8x8"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:1:1:w]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:-1:1:w]
    `, 'standard');
    chess.move('(0T1)Nc3');
    chess.move('(1T1)Nc3');
    chess.move('(-1T1)Nf3');
    chess.submit();
  }).not.toThrow();
});
