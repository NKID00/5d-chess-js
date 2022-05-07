import { Chess } from '../index';
const deepEqual = require('deep-equal');

test('Turn Zero Board Parsing', () => {
  var chess = new Chess();
  chess.import('[Board "Standard - Turn Zero"]\n[Mode "5D"]\n1. e3 / f6 2. Qe2');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1, chess.rawAction));
  expect(deepEqual(board1, board2)).toBe(true);
  chess.import('[Board "Standard - Turn Zero"]\n[Mode "5D"]\n1. e3 / f6 2. Qe2 / (0T2)Nb8>>(0T1)b6');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1, chess.rawAction));
  expect(deepEqual(board1, board2)).toBe(true);
  chess.import('[Board "Standard - Turn Zero"]\n[Mode "5D"]\n1. e3 / f6 2. Qe2 / (0T2)Nb8>>(0T1)b6 (~T1) (>L-1) 3. (-1T2)Nf3 / (-1T2)Na6 4. (-1T3)Nd4');
  var board1 = chess.rawBoard;
  var board2 = chess.raw.parseFuncs.toBoard(chess.raw.parseFuncs.fromBoard(board1, chess.rawAction));
  expect(deepEqual(board1, board2)).toBe(true);
  var str1 = '[Board "Custom"]\n' +
    '[Mode "5D"]\n' +
    '[R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:0:0:b]\n' +
    '[R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:0:1:w]\n';
  chess.import(str1);
  var str2 = chess.export();
  expect(str1 === str2).toBe(true);
});
