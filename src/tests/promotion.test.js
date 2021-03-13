const Chess = require('@local/index');

test('Test Standard Promotion', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6`);
  expect(chess.moves('5dpgn').includes('b7xc8=Q')).toBe(true);
  expect(chess.moves('5dpgn').includes('b7xc8=S')).toBe(false);
  expect(chess.moves('5dpgn').includes('b7xc8=K')).toBe(false);
  expect(chess.moves('5dpgn').includes('b7xc8=\n')).toBe(false);
});

test('Test Standard Promotion (import)', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6
6. b7xc8=Q`);
  expect(chess.rawBoard[0][11][7][2]).toBe(10);
});

test('Test Princess Promotion', () => {
  var chess = new Chess();
  chess.import(`[Board "Princess"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6`);
  expect(chess.moves('5dpgn').includes('b7xc8=S')).toBe(true);
  expect(chess.moves('5dpgn').includes('b7xc8=Q')).toBe(false);
  expect(chess.moves('5dpgn').includes('b7xc8=K')).toBe(false);
  expect(chess.moves('5dpgn').includes('b7xc8=\n')).toBe(false);
});


test('Test Princess Promotion', () => {
  var chess = new Chess();
  chess.import(`[Board "Princess"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6
6. b7xc8=S`);
  expect(chess.rawBoard[0][11][7][2]).toBe(14);
});
