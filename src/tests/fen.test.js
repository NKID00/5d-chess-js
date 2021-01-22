const Chess = require('@local/index');

test('5DFEN importing', () => {
  var chess = new Chess(undefined, undefined, true);
  chess.import(`
[size "8x8"]
[variant "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1w. 1:e2:e3
  `);

  expect(() => {
    // One too many 8/
    chess.import(`
[size "8x8"]
[variant "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1w. 1:e2:e3
    `);
  }).toThrow();

  expect(() => {
    // Missing pawn
    chess.import(`
[size "8x8"]
[variant "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1w. 1:e2:e3
    `);
  }).toThrow();

  expect(() => {
    // a4-pawn
    chess.import(`
[size "8x8"]
[variant "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/P7/8/1P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]
1w. 1:a4:a5
    `);
  }).not.toThrow();

  expect(() => {
    // Turn-1 castle
    chess.import(`
[size "8x8"]
[variant "custom"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/P7/8/1P*P*P*P*P*P*P*/R*NBQK*2R*:0:1:w]
1w. 1:0-0
    `);
  }).not.toThrow();

  expect(() => {
    // Boring chess
    chess.import(`
[size "2x2"]
[variant "custom"]
[pk/KP:0:1:w]
    `);
  }).not.toThrow();

  expect(() => {
    // Boring chess
    chess.import(`
[size "5x5"]
[variant "custom"]
[puzzle "mate-in-1"]
[4k/5/5/5/K1R2:0:1:w]

1w. 1:Ka1:b2
1b. 1:Ke5:e4
2w. 2:Rc1:e1
2b. 2:Ke4:d3
    `);
  }).not.toThrow();
});
