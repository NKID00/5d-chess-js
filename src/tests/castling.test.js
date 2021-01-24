const Chess = require('@local/index');

test('Queenside castling', () => {
  var chess = new Chess();
  expect(() => {
    chess.import('1. e3 / e6 2. Qe2 / Qe7 3. d3 / d6 4. Bd2 / Bd7 5. Nc3 / Nc6 6. O-O-O / O-O-O');
  }).not.toThrow();
  expect(() => {
    chess.import('1. e3 / e6 2. Qe2 / Qe7 3. d3 / d6 4. Bd2 / Bd7 5. Nc3 / Nc6');
    chess.move('O-O');
  }).toThrow();
});
