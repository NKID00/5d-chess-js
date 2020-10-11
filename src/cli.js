require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.actionFuncs = require('@local/action');
r.context.boardFuncs = require('@local/board');
r.context.mateFuncs = require('@local/mate');
r.context.notationFuncs = require('@local/notation');
r.context.parseFuncs = require('@local/parse');
r.context.pieceFuncs = require('@local/piece');
r.context.printFuncs = require('@local/print');
r.context.validateFuncs = require('@local/validate');

r.context.Chess = require('@local/index');
r.context.chess = new r.context.Chess();

/*
chess.raw.boardFuncs.present(chess.rawBoard, chess.rawAction);
chess.move('1w. 1:e2:e3');
chess.submit();
chess.move('1b. 1:f7:f6');
chess.submit();
chess.move('2w. 2:Qd1:e2');
chess.submit();
chess.move('2b. 2:a7:a6');
chess.submit();
chess.move('3w. 3:Qe2:h5');
chess.submit();
chess.print(); console.log(chess.moves('notation_short'));
chess.inCheckmate;


chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\r\n2w. 2:Qd1<>2:e2\n2b. 2:Nb8:c6\r\n3w. 3:Qe2:h5');

chess.import('1w. 1:a2:a4\n1b. 1:a7:a5\n2w. 2:Ra1:Ra3\n2b. 2:Ra8:Ra6\n3w. 3:Ra3:e3\n3b. 3:Nb8<>2:b6\n4w. 3-1:Ra3:b3\n4b. 3-1:c7:c6\nw. 4:Re3<>-1:e3');

chess.import('1w. 1:d2:d4\n1b. 1:c7:c5\n2w. 2:Bc1:f4\n2b. 2:Nb8:c6\n3w. 3:Nb1:c3\n3b. 3:c5:xd4\n4w. 4:Nc3:d5\n4b. 4:Qd8:a5\n5w. 5:Bf4:d2\n5b. 5:Qa5:xd5\n6w. 6:Ng1:f3\n6b. 6:e7:e6\n7w. 7:g2:g3\n7b. 7:Bf8:b4\n8w. 8:c2:c3\n8b. 8:d4:xc3\n9w. 9:b2:xc3\n9b. 9:Qd5:c5\n10w. 10:c3:xb4\n10b. 10:Qc5<>7:xf2+\n11w. 8-1:Ke1:xf2\n11b. 8-1:d4:d3\n12w. 9-1:e2:e3\n12b. 9-1:Nc6:e5');
chess.move('13w. 11:Bd2<+1>8:xd5');
chess.raw.boardFuncs.present(chess.rawBoard, chess.rawAction);

chess.print(); console.log(chess.export('notation_short'));
*/
