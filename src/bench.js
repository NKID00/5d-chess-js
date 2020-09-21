require('module-alias/register');

const boardFuncs = require('@local/board');
const pieceFuncs = require('@local/piece');
const actionFuncs = require('@local/action');
const printFuncs = require('@local/print');

var nb = boardFuncs.init();
var ca = 0;
var bs = [];
var nr = (n = -1) => {
  var a = actionFuncs.actions(nb, ca);
  var r = Math.floor(Math.random() * a.length);
  console.log('Number of actions: ' + a.length);
  console.log('Action Number: ' + (n !== -1 ? n : r));
  var m = a[n !== -1 ? n : r];
  console.log('Chosen Action: ' + JSON.stringify(m));
  actionFuncs.move(nb, m);
  ca++;
  bs.push(boardFuncs.copy(nb));
  printFuncs.printBoard(nb);
}
var as = [17,2,5,8,18,11,4,72509];
for(var i = 0;i < as.length;i++) {
  nr(as[i]);
}
nr();