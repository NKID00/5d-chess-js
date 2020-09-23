require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.boardFuncs = require('@local/board');
r.context.pieceFuncs = require('@local/piece');
r.context.actionFuncs = require('@local/action');
r.context.printFuncs = require('@local/print');
r.context.validateFuncs = require('@local/validate');
r.context.notationFuncs = require('@local/notation');
r.context.mateFuncs = require('@local/mate');
r.context.Chess = require('@local/index');
r.context.chess = new r.context.Chess();

/*
chess.move('1w. 1:e2:e3');
chess.submit();
chess.move('1b. 1:f7:f6');
chess.submit();
chess.move('2w. 2:Qd1:e2');
chess.submit();
chess.move('2b. 2:g7:g6');
chess.submit();
chess.move('3w. 3:Qe2:h5');
chess.submit();
chess.print(); console.log(chess.moves('notation_short'));
chess.inCheckmate();


chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\r\n2w. 2:Qd1<>2:e2\n2b. 2:Nb8:c6\r\n3w. 3:Qe2:h5');
*/
