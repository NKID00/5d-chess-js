require('module-alias/register');

const { performance } = require('perf_hooks');

const Chess = require('@local/index');
var chess = new Chess();

var benchResults = {};

var benchCurrMoves = () => {
  var movesGenerated = 0;
  var maxTimelines = chess.board.timelines.length;
  var maxTurns = 0;
  for(var i = 0;i < chess.board.timelines.length;i++) {
    if(chess.board.timelines[i].turns.length > maxTurns) {
      maxTurns = chess.board.timelines[i].turns.length;
    }
  }
  var start = performance.now();
  console.log('' + maxTimelines + ' Timeline(s), ' + maxTurns + ' Turn(s) Benchmark (x100 Samples)');
  for(var i = 0;i < 100;i++) {
    movesGenerated += chess.moves('object', false, false).length;
  }
  var end = performance.now();
  benchResults['' + maxTimelines + ' Timelines, ' + maxTurns + ' Turns'] = {
    'Moves Generated': movesGenerated,
    'Time Taken (secs)': ((end - start) / 1000),
    'Moves Generated per second': movesGenerated / ((end - start) / 1000)
  }
}

benchCurrMoves();
chess.move('1w. 1:a2:a3');
chess.submit();
benchCurrMoves();
chess.move('1b. 1:a7:a6');
chess.submit();
benchCurrMoves();
chess.move('2w. 2:Nb1<+1>1:b3');
chess.submit();
benchCurrMoves();
chess.move('2b. 1+1:Nb8<-1>+0:b6');
chess.submit();
benchCurrMoves();
chess.move('3w. 2-1:Nb1<+2>+0:b3');
chess.move('3w. 2+1:Nb3:d4');
chess.submit();
benchCurrMoves();
chess.move('3b. 2:Nb8<-2>1:b6');
chess.move('3b. 2-1:Nb8<-3>+0:b6');
chess.move('3b. 2+1:a7:a6');
chess.move('3b. 2+2:b7:b6');
chess.submit();
benchCurrMoves();
chess.move('4w. 2-2:a3:a4');
chess.submit();
chess.move('4b. 2-2:Nb8:c6');
chess.submit();
benchCurrMoves();

console.table(benchResults);

/*
chess.move('1w. 1:a2:a3');
chess.submit();
chess.move('1b. 1:a7:a6');
chess.submit();
chess.move('2w. 2:Nb1<+1>1:b3');
chess.submit();
chess.move('2b. 1+1:Nb8<-1>+0:b6');
chess.submit();
chess.move('3w. 2-1:Nb1<+2>+0:b3');
chess.move('3w. 2+1:Nb3:d4');
chess.submit();
chess.move('3b. 2:Nb8<-2>1:b6');
chess.move('3b. 2-1:Nb8<-3>+0:b6');
chess.move('3b. 2+1:Ra8:b8');
chess.move('3b. 2+2:b7:b6');
chess.submit();
chess.move('4w. 2-2:a3:a4');
chess.submit();
chess.move('4b. 2-2:Nb8:c6');
chess.submit();
chess.print(); console.log(chess.moves('notation_short'));
*/
