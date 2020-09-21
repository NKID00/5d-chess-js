require('module-alias/register');

const boardFuncs = require('@local/board');
const pieceFuncs = require('@local/piece');
const actionFuncs = require('@local/action');
const printFuncs = require('@local/print');

var nb = boardFuncs.init();
var ca = 0;
var bs = [];
var nr = () => {
  console.log('Turn: ' + (ca % 2 === 0 ? 'White' : 'Black'))
  console.log('Present Timelines: ' + boardFuncs.present(nb));
  var a = actionFuncs.actions(nb, ca);
  console.log('Number of actions: ' + a.length);
  //console.log('Action Number: ' + (n !== -1 ? n : r));
  var m = a[a.length - 1];
  console.log('Chosen Action: ' + JSON.stringify(m));
  actionFuncs.move(nb, m);
  ca++;
  bs.push(boardFuncs.copy(nb));
  //printFuncs.printBoard(nb);
  console.log('');
}

console.time('Benchmark (x1 Samples)');
for(var j = 0;j < 1;j++) {
  nb = boardFuncs.init();
  ca = 0;
  bs = [];
  for(var i = 0;i < 20;i++) {
    nr();
  }
}
console.timeEnd('Benchmark (x1 Samples)');
