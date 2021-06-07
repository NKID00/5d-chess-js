const Chess = require('@local/index');
const deepequal = require('deep-equal');

test('Two Timelines Board Parsing', () => {
  var chess = new Chess();
  chess.import('[Board "Standard - Two Timelines"]\n[Mode "5D"]\n1. (+0T1)Nb1>(-0T1)b3');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1, chess.rawAction));
  expect(deepequal(board1,board2)).toBe(true);
  chess.import('[Board "Standard - Two Timelines"]\n[Mode "5D"]\n1. (-0T1)Nb1>(+0T1)b3');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1, chess.rawAction));
  expect(deepequal(board1,board2)).toBe(true);
  chess.import('[Board "Standard - Two Timelines"]\n[Mode "5D"]\n1. (+0T1)h4 (-0T1)Nb1>>(+0T1)b3~ / (-0T1)a6 (1T1)Ng8>(+0T1)g6');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1, chess.rawAction));
  expect(deepequal(board1,board2)).toBe(true);
  var str1 = '[Board "Custom"]\n' +
  '[Mode "5D"]\n' +
  '[R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:-0:1:b]\n' +
  '[R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:+0:1:w]\n';
  chess.import(str1);
  var str2 = chess.export();
  expect(str1 === str2).toBe(true);
});
