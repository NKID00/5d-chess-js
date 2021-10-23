const Chess = require('@local/index');

test('En Passant and Castling', () => {
  var chess = new Chess();
  expect(() => {
    //chess.import('1w. 1:e2:e4\n1b. 1:a7:a6\n2w. 2:e4:e5\n2b. 2:d7:d5');
    //chess.move('3w. 3:e5:xd6e.p.');
    chess.import('1. e4 / a6 2. e5 / d5');
    chess.move('exd6');
  }).not.toThrow();
  expect(() => {
    //chess.import('1w. 1:e2:e4\n1b. 1:a7:a6\n2w. 2:e4:e5\n2b. 2:d7:d5\n3w. 3:e5:e6\n3b. 3:d5:d4\n4w. 4:c2:c4');
    //chess.move('4b. 4:d4:xc3e.p.');
    chess.import('1. e4 / a6 2. e5 / d5 3. e6 / d4 4. c4');
    chess.move('dxc3');
  }).not.toThrow();
  expect(() => {
    chess.import('1. e4 / a6 2. e5 / d5 3. e6 / d4 4. c4');
    chess.rawBoard[0][5][3][2] = 2;
    chess.rawBoard[0][6][3][2] = 2;
    chess.move('dxc3');
  }).toThrow();
});