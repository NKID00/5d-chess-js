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

test('5DFEN importing a royal queen and common king', () => {
  expect(() => {
    let chess = new Chess();
    chess.import(`
[Size "8x8"]
[Board "custom"]
[Mode "5D"]
[VariantName "Royalty war"]
[Promotions "Q,N,R,B,C"]
[InitialMultiverses "0 -1"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBYCBNR*:0:0:b]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBYCBNR*:0:1:w]
[r*nbycbnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:-1:0:b]
[r*nbycbnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:-1:1:w]
    `, 'standard');
    expect(chess.inCheckmate).toBe(false);
    chess.move('(-1T1)Nf3');
    chess.move('(0T1)d3');
    chess.submit();
    expect(chess.inCheckmate).toBe(false);
  }).not.toThrow();
});

test('Royal queen checkmates', () => {
  let chess = new Chess();
  chess.import(`
[Size "4x4"]
[Board "custom"]
[Mode "5D"]
[Y3/2q1/1n2/1k*2:0:1:w]
  `);
  expect(chess.inCheckmate).toBe(true);
});
