const Chess = require('@local/index');

test('En Passant and Castling', () => {
  var chess = new Chess();
  expect(() => {
    chess.import('1w. 1:a2:a4\n1b. 1:a7:a5\n2w. 2:Ra1:a3\n2b. 2:Ra8:a6\n3w. 3:Ra3:e3\n3b. 3:Nb8<>2:b6\n4w. 3-1:Ra3:b3\n4b. 3-1:c7:c6');
    chess.move('5w. 4:Re3<>-1:e3');
  }).not.toThrow();
});