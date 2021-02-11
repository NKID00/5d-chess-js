const Chess = require('@local/index');

test('Check spatial only works', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
[Mode "5D"]
1. a3 / a5`);
  expect(chess.moves('5dpgn', true, true, true).includes('(0T2)Nb1>>(0T1)b3')).toBe(false);
  expect(chess.moves('5dpgn', true, true, false).includes('(0T2)Nb1>>(0T1)b3')).toBe(true);
});