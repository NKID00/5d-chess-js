const Chess = require('@local/index');
const deepequal = require('deep-equal');

test('Position Parsing', () => {
  var chess = new Chess();
  var pos1 = [1,2,3,4];
  var pos2 = chess.raw.parseFuncs.toPosition(chess.raw.parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [2,3,4,5];
  pos2 = chess.raw.parseFuncs.toPosition(chess.raw.parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [0,0,0,0];
  pos2 = chess.raw.parseFuncs.toPosition(chess.raw.parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [12,13,7,7];
  pos2 = chess.raw.parseFuncs.toPosition(chess.raw.parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
});

test('Action Parsing', () => {
  var chess = new Chess();
  var actions = [
    [[[0,0,1,4],[0,0,2,4]]],
    [[[0,1,6,5],[0,1,5,5]]],
    [[[0,2,0,3],[0,2,1,4]]],
    [[[0,3,7,1],[0,3,5,2]]],
    [[[0,4,1,4],[0,4,4,7]]]
  ];
  var action1 = actions[0];
  var action2 = chess.raw.parseFuncs.toAction(chess.raw.parseFuncs.fromAction(null, 0, action1));
  expect(deepequal(action1,action2)).toBe(true);
  var action1 = actions[1];
  var action2 = chess.raw.parseFuncs.toAction(chess.raw.parseFuncs.fromAction(null, 1, action1));
  expect(deepequal(action1,action2)).toBe(true);
  var action1 = actions[2];
  var action2 = chess.raw.parseFuncs.toAction(chess.raw.parseFuncs.fromAction(null, 2, action1));
  expect(deepequal(action1,action2)).toBe(true);
  var action1 = actions[3];
  var action2 = chess.raw.parseFuncs.toAction(chess.raw.parseFuncs.fromAction(null, 3, action1));
  expect(deepequal(action1,action2)).toBe(true);
  var action1 = actions[4];
  var action2 = chess.raw.parseFuncs.toAction(chess.raw.parseFuncs.fromAction(null, 4, action1));
  expect(deepequal(action1,action2)).toBe(true);
});

test('Board Parsing', () => {
  var chess = new Chess();
  chess.import('[Board "Standard"]\n[Mode "5D"]\n1. e3 / f6\n2. Qe2');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1));
  expect(deepequal(board1,board2)).toBe(true);
  chess.import('[Board "Standard"]\n[Mode "5D"]\n1. e3 / f6\n2. Qe2 / Nc6\n3. Qh5');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1));
  expect(deepequal(board1,board2)).toBe(true);
  chess.import(`[Board "Standard"]
[Mode "5D"]
1. e3 / f6
2. (0T2)Nb1>>(0T1)b3~ / (1T1)a6
3. (1T2)c3 / (0T2)Nc6 (1T2)Nc6
4. (0T3)Qh5 (1T3)Qc2`);
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1));
  expect(deepequal(board1,board2)).toBe(true);
});
