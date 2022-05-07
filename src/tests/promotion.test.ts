import { Chess } from '../index';

test('Test Standard Promotion Availability', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6`);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=Q')).toBe(true);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=S')).toBe(false);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=K')).toBe(false);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=\n')).toBe(false);
});

test('Test Standard Promotion Order', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6`);
  expect(chess.rawPromotionPieces).toStrictEqual([10, 9, 8, 7, 6, 5, 4, 3]);
});

test('Test Standard Promotion Action', () => {
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

test('Test Princess Promotion Availability', () => {
  var chess = new Chess();
  chess.import(`[Board "Princess"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6`);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=S')).toBe(true);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=Q')).toBe(false);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=K')).toBe(false);
  expect((chess.moves('5dpgn') as string).includes('b7xc8=\n')).toBe(false);
});

test('Test Princess Promotion Order', () => {
  var chess = new Chess();
  chess.import(`[Board "Princess"]
[Mode "5D"]
1. a3 / b5
2. a4 / h6
3. axb5 / g6
4. b6 / f6
5. b7 / e6`);
  expect(chess.rawPromotionPieces).toStrictEqual([14, 13, 8, 7, 6, 5, 4, 3]);
});

test('Test Princess Promotion Action', () => {
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
