const Chess = require('@local/index');

test('Test simple 3 turn checkmate', () => {
  var chess = new Chess();
  chess.move('1w. 1:e2:e3');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('1b. 1:f7:f6');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('2w. 2:Qd1:e2');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('2b. 2:Nb8:c6');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('3w. 3:Qe2:h5');
  chess.submit();
  expect(chess.inCheckmate()).toBe(true);
});

test('Test simple 3 turn check but not checkmate', () => {
  var chess = new Chess();
  chess.move('1w. 1:e2:e3');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('1b. 1:f7:f6');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('2w. 2:Qd1:e2');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('2b. 2:g7:g6');
  chess.submit();
  expect(chess.inCheckmate()).toBe(false);
  chess.move('3w. 3:Qe2:h5');
  chess.submit();
  expect(chess.inCheck()).toBe(true);
  expect(chess.inCheckmate()).toBe(false);
});
