const Chess = require('@local/index');

test('Copied Instance', () => {
  let chess1 = new Chess();
  chess1.import('1. e4 / a6 2. e5 / d5 3. e6 / d4 4. c4');
  let chess2 = chess1.copy();
  expect(chess1.rawBoard[0][6][3][2] === chess2.rawBoard[0][6][3][2]).toBe(true);
  chess1.rawBoard[0][6][3][2] = 2;
  expect(chess1.rawBoard[0][6][3][2] === chess2.rawBoard[0][6][3][2]).toBe(false);
});