require('module-alias/register');

const { performance } = require('perf_hooks');
const Chess = require('@local/index');

const chess = new Chess();

let benchResults = {};

const benchCurrMoves = () => {
  const maxTimelines = chess.board.timelines.length;
  let movesGenerated = 0;
  let maxTurns = 0;

  for (const timeline of chess.board.timelines) {

    if (timeline.turns.length > maxTurns) maxTurns = timeline.turns.length;

  }

  console.log('' + maxTimelines + ' Timeline(s), ' + maxTurns + ' Turn(s) Benchmark (x10000 Samples)');

  const startM = performance.now();

  for (let i = 0; i < 10000; i++) {

    movesGenerated += chess.moves('object', false, false, false, true).length;
  }

  const endM = performance.now();

  benchResults[Date.now() + ' ' + maxTimelines + ' Timelines, ' + maxTurns + ' Turns'] = {
    'Moves Generated': movesGenerated,
    'Time Taken (secs)': ((endM - startM) / 1000),
    'Moves Generated per second': movesGenerated / ((endM - startM) / 1000)
  }
}

const benchCurrActions = () => {
  const maxTimelines = chess.board.timelines.length;
  let actionsGenerated = 0;
  let maxTurns = 0;

  for (const timeline of chess.board.timelines) {

    if (timeline.turns.length > maxTurns) maxTurns = timeline.turns.length;
  }

  console.log('' + maxTimelines + ' Timeline(s), ' + maxTurns + ' Turn(s) Benchmark (x1 Samples)');

  const startA = performance.now();

  for (let i = 0; i < 1; i++) {

    actions = chess.actions('raw', false, false, true);

    actionsGenerated += actions.length;
  }

  const endA = performance.now();

  benchResults[Date.now() + ' ' + maxTimelines + ' Timelines, ' + maxTurns + ' Turns'] = {
    'Actions Generated': actionsGenerated,
    'Time Taken (secs)': ((endA - startA) / 1000),
    'Actions Generated per second': actionsGenerated / ((endA - startA) / 1000)
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

benchResults = {};
chess.reset();
benchCurrActions();
chess.move('1w. 1:a2:a3');
chess.submit();
benchCurrActions();
chess.move('1b. 1:a7:a6');
chess.submit();
benchCurrActions();
chess.move('2w. 2:Nb1<+1>1:b3');
chess.submit();
benchCurrActions();
chess.move('2b. 1+1:Nb8<-1>+0:b6');
chess.submit();
benchCurrActions();
chess.move('3w. 2-1:Nb1<+2>+0:b3');
chess.move('3w. 2+1:Nb3:d4');
chess.submit();
//benchCurrActions();
chess.move('3b. 2:Nb8<-2>1:b6');
chess.move('3b. 2-1:Nb8<-3>+0:b6');
chess.move('3b. 2+1:a7:a6');
chess.move('3b. 2+2:b7:b6');
chess.submit();
//benchCurrActions();
chess.move('4w. 2-2:a3:a4');
chess.submit();
chess.move('4b. 2-2:Nb8:c6');
chess.submit();
//benchCurrActions();

console.table(benchResults);
