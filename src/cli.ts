require('module-alias/register');

const repl = require('repl');
const r = repl.start('node> ');
r.context.actionFuncs = require('@local/action');
r.context.boardFuncs = require('@local/board');
r.context.mateFuncs = require('@local/mate');
//r.context.mateGpuFuncs = require('@local/mate.gpu');
r.context.pgnFuncs = require('@local/pgn');
r.context.parseFuncs = require('@local/parse');
r.context.pieceFuncs = require('@local/piece');
r.context.printFuncs = require('@local/print');
r.context.validateFuncs = require('@local/validate');

r.context.Chess = require('@local/index');
r.context.chess = new r.context.Chess();

/*
chess.import('1w. 1:e2:e3\n1b. 1:e7:e6\n2w. 2:Qd1:e2\n2b. 2:Qd8:e7\n3w. 3:d2:d3\n3b. 3:d7:d6\n4w. 4:Bc1:d2\n4b. 4:Bc8:d7\n5w. 5:Nb1:c3\n5b. 5:Nb8:c6');
currMoves = chess.moves('raw');
for(var i = 0;i < currMoves.length;i++) {
  var notationStr = notationFuncs.fromMove(currMoves[i], chess.rawBoard, chess.rawAction, '', true, true, false);
  console.log(notationStr);
  console.log(notationFuncs.toMove(notationStr, chess.rawBoard, chess.rawAction));
}

chess.move('1w. 1:e2:e3');
chess.submit();
chess.move('1b. 1:f7:f6');
chess.submit();
currMoves = chess.moves('raw');
for(var i = 0;i < currMoves.length;i++) {
  var notationStr = notationFuncs.fromMove(currMoves[i], chess.rawBoard, chess.rawAction);
  console.log(notationStr);
  console.log(notationFuncs.toMove(notationStr, chess.rawBoard, chess.rawAction));
}
chess.move('2w. 2:Qd1:e2');
chess.submit();
chess.move('2b. 2:a7:a6');
chess.submit();
chess.move('3w. 3:Qe2:h5');
chess.submit();
chess.print(); console.log(chess.moves('notation_short'));
chess.inCheckmate;


chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\r\n2w. 2:Qd1<>2:e2\n2b. 2:Nb8:c6\r\n3w. 3:Qe2:h5');

chess.import('1w. 1:a2:a4\n1b. 1:a7:a5\n2w. 2:Ra1:a3\n2b. 2:Ra8:a6\n3w. 3:Ra3:e3\n3b. 3:Nb8<>2:b6\n4w. 3-1:Ra3:b3\n4b. 3-1:c7:c6\n5w. 4:Re3<>-1:e3');
s = notationFuncs.fromActionHistory(chess.rawActionHistory, chess.rawBoardHistory[0], 0)
notationFuncs.toActionHistory(s, chess.rawBoardHistory[0], 0)
a = [chess.moves('raw', false, false)[60], [ [ 0, 7, 5, 0 ], [ 0, 7, 5, 1 ] ]];
b = notationFuncs.fromAction(a, chess.rawBoard, chess.rawAction);
notationFuncs.toAction(b, chess.rawBoard, chess.rawAction);

chess.import('1w. 1:d2:d4\n1b. 1:c7:c5\n2w. 2:Bc1:f4\n2b. 2:Nb8:c6\n3w. 3:Nb1:c3\n3b. 3:c5:xd4\n4w. 4:Nc3:d5\n4b. 4:Qd8:a5\n5w. 5:Bf4:d2\n5b. 5:Qa5:xd5\n6w. 6:Ng1:f3\n6b. 6:e7:e6\n7w. 7:g2:g3\n7b. 7:Bf8:b4\n8w. 8:c2:c3\n8b. 8:d4:xc3\n9w. 9:b2:xc3\n9b. 9:Qd5:c5\n10w. 10:c3:xb4\n10b. 10:Qc5<>7:xf2+\n11w. 8-1:Ke1:xf2\n11b. 8-1:d4:d3\n12w. 9-1:e2:e3\n12b. 9-1:Nc6:e5');
chess.move('13w. 11:Bd2<+1>8:xd5');
chess.raw.boardFuncs.present(chess.rawBoard, chess.rawAction);

chess.import('1w. 1:d2:d4\n1b. 1:c7:c5\n2w. 2:Bc1:f4\n2b. 2:Nb8:c6\n3w. 3:Nb1:c3\n3b. 3:c5:xd4\n4w. 4:Nc3:d5\n4b. 4:Qd8:a5\n5w. 5:Bf4:d2\n5b. 5:Qa5:xd5\n6w. 6:Ng1:f3\n6b. 6:e7:e6\n7w. 7:g2:g3\n7b. 7:Bf8:b4\n8w. 8:c2:c3\n8b. 8:d4:xc3\n9w. 9:b2:xc3\n9b. 9:Qd5:c5\n10w. 10:c3:xb4\n10b. 10:Qc5<-1>7:xf2+\n11w. 8-1:Ke1:xf2\n11b. 8-1:d4:d3\n12w. 9-1:e2:e3\n12b. 9-1:Nc6:e5\n13w. 11:Bd2<+1>8:xd5\n13b. 8+1:Ng8:e7\n14w. 9+1:Bd2:xb4\n14b. 9+1:Nc6:xb4\n15w. 10-1:Bf1:g2\n15w. 10+1:Nf3:e5\n15b. 10-1:Qd5<>+1:xd5\n16w. 11-1:Nf3:xe5\n16w. 11+1:Ne5:xf7\n16b. 11-1:Ng8:f6\n16b. 11:Ng8:f6\n16b. 11+1:Nb4:xc2\n17w. 12-1:Ne5<>+0:c5\n17w. 12+1:Qd1:xc2\n17b. 12+1:Qd5:b5\n17b. 12:Nf6:g4\n17b. 12-1:Nf6:g4\n18w. 13:Nc5<>+1:c7\n18w. 13-1:Qd1:xg4\n18b. 13:Bc8<>+1:xc7\n18b. 13-1:Bf8:c5\n19w. 14-1:Qg4:xe6\n19w. 14:Qd1:xd7\n19w. 14+1:Qc2:xc7\n19b. 14+1:Qb5<-2>11:xb2\n20w. 15+1:Qc7<>12-2:f4\n20b. 12-2:Qb2:c3\n21w. 13-2:Qf4:d2\n21b. 13-2:Nb4:xc2\n22w. 14-2:Qd1:xc2\n22b. 14-2:Qd5<>+0:xd7\n22b. 14-1:f7:xe6\n23w. 15-1:Bd2<>+0:d3\n23w. 15-2:Qc2:xc3\n23b. 15-2:0-0\n23b. 15-1:0-0\n23b. 15:Qd7:d6\n23b. 15+1:0-0\n24w. 16+1:Nf7<>-1:xf8\n24w. 16:a2:a3\n24w. 16-2:Qc3:xd4\n24b. 16+1:Rf8<>-1:xf8\n24b. 16:Nc6:xb4\n24b. 16-2:Rf8:xf7\n25w. 17-2:Qd4<>+0:xd6\n25w. 17-1:Bg2:f3\n25w. 17+1:Bf1:h3\n25b. 17-2:Rf7<>-1:f7\n25b. 17:Nb4:xd3\n25b. 17+1:Ne7:d5\n26w. 18-2:Qd2:g5\n26w. 18-1:c2:xd3\n26w. 18:e2:xd3\n26w. 18+1:Bh3:xe6\n26b. 18+1:d7:xe6\n26b. 18:Ng4:e3\n26b. 18-1:Rf7:xf3\n26b. 18-2:Ne7:c6\n27w. 19:f2:xe3\n27w. 19-2:Qg5<+2>+0:e7\n27w. 19+1:0-0\n27w. 19-1:Kf2:e1\n27b. 19+1:Bc8<-3>14:c3+\n28w. 15-3:b2:xc3\n28b. 15-3:0-0\n29w. 16-3:Nf7:h6\n29b. 16-3:g7:xh6\n30w. 17-3:e2:e3\n30b. 17-3:Qb5:f5\n31w. 18-3:Qc7:f4\n31b. 18-3:Qf5:xf4\n32w. 19-3:g3:xf4');
chess.inGpuCheckmate
chess.raw.mateFuncs.checkmate(chess.rawBoard, chess.rawAction, true);
chess.print(); console.log(chess.export('notation_short'));
*/
