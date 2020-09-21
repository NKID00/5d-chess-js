require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.boardFuncs = require('@local/board');
r.context.pieceFuncs = require('@local/piece');
r.context.actionFuncs = require('@local/action');
r.context.printFuncs = require('@local/print');

/*
var nb = boardFuncs.init();
var ca = 0;
var bs = [];
var nr = (n = -1) => {
  var a = actionFuncs.actions(nb, ca);
  var r = Math.floor(Math.random() * a.length);
  console.log('Turn: ' + (ca % 2 === 0 ? 'White' : 'Black'))
  console.log('Number of actions: ' + a.length);
  //console.log('Action Number: ' + (n !== -1 ? n : r));
  var m = a[a.length - 1];
  console.log('Chosen Action: ' + JSON.stringify(m));
  actionFuncs.move(nb, m);
  ca++;
  bs.push(boardFuncs.copy(nb));
  printFuncs.printBoard(nb);
  console.log('Timelines: ' + boardFuncs.present(nb));
}

for(var i = 0;i < 4;i++) {
  nr();
}
var as = [0,0,20];
for(var i = 0;i < as.length;i++) {
  nr(as[i]);
}
*/
