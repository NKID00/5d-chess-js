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
*/
