const Chess = require('@local/index');

test('Queenside castling', () => {
  var chess = new Chess();
  expect(() => {
    chess.import('1w. 1:e2:e3\n1b. 1:e7:e6\n2w. 2:Qd1:e2\n2b. 2:Qd8:e7\n3w. 3:d2:d3\n3b. 3:d7:d6\n4w. 4:Bc1:d2\n4b. 4:Bc8:d7\n5w. 5:Nb1:c3\n5b. 5:Nb8:c6\n6w. 6:0-0-0\n6b. 6:0-0-0');
  }).not.toThrow();
  expect(() => {
    chess.import('1w. 1:e2:e3\n1b. 1:e7:e6\n2w. 2:Qd1:e2\n2b. 2:Qd8:e7\n3w. 3:d2:d3\n3b. 3:d7:d6\n4w. 4:Bc1:d2\n4b. 4:Bc8:d7\n5w. 5:Nb1:c3\n5b. 5:Nb8:c6');
    chess.move('6w. 6:0-0');
  }).toThrow();
});
