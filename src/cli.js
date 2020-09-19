require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.boardFuncs = require('@local/board');
r.context.pieceFuncs = require('@local/piece');
