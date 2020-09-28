const Chess = require('@local/index');
const parseFuncs = require('@local/parse');
const deepequal = require('deep-equal');

test('Position Parsing', () => {
  var pos1 = [1,2,3,4];
  var pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [2,3,4,5];
  pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [0,0,0,0];
  pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [12,13,7,7];
  pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
});

test('Board Parsing', () => {
  var chess = new Chess();
  chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Qd1<>2:e2');
  var board1 = chess.rawBoard;
  var board2 = parseFuncs.toBoard(parseFuncs.fromBoard(board1));
  expect(deepequal(board1,board2)).toBe(true);
  chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Qd1<>2:e2\n2b. 2:Nb8:c6\n3w. 3:Qe2:h5');
  var board1 = chess.rawBoard;
  var board2 = parseFuncs.toBoard(parseFuncs.fromBoard(board1));
  expect(deepequal(board1,board2)).toBe(true);
  chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Nb1<>1:b3\n2b. 1+1:a7:a6\n3w. 2+1:c2:c3\n3b. 2:Nb8:c6\n3b. 2+1:Nb8:c6\n4w. 3:d1:h5\n4w. 3+1:d1:c2#');
  var board1 = chess.rawBoard;
  var board2 = parseFuncs.toBoard(parseFuncs.fromBoard(board1));
  expect(deepequal(board1,board2)).toBe(true);
});
