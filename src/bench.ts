require('module-alias/register');

const { performance } = require('perf_hooks');
import { Chess } from './index'

const game: Chess = new Chess();

let benchResults = {};

function benchCurrMoves() {
  const maxTimelines: number = game.board.timelines.length;
  let movesGenerated: number = 0;
  let maxTurns: number = 0;

  for (const timeline of game.board.timelines) {

    if (timeline.turns.length > maxTurns) maxTurns = timeline.turns.length;

  }

  console.log(`${maxTimelines} Timeline(s), ${maxTurns} Turn(s) Benchmark (x10000 Samples)`);

  const startM = performance.now();

  for (let i = 0; i < 10000; i++) {

    movesGenerated += game.moves('object', false, false, false).length;
  }

  const endM = performance.now();

  benchResults[`${Date.now()} ${maxTimelines} Timelines, ${maxTurns} Turns`] = {
    'Moves Generated': movesGenerated,
    'Time Taken (secs)': ((endM - startM) / 1000),
    'Moves Generated per second': movesGenerated / ((endM - startM) / 1000)
  }
}

function benchCurrActions() {
  const maxTimelines: number = game.board.timelines.length;
  let actionsGenerated: number = 0;
  let maxTurns: number = 0;

  for (const timeline of game.board.timelines) {

    if (timeline.turns.length > maxTurns) maxTurns = timeline.turns.length;
  }

  console.log(`${maxTimelines} Timeline(s), ${maxTurns} Turn(s) Benchmark (x1 Samples)`);

  const startA = performance.now();

  for (let i = 0; i < 1; i++) {

    actionsGenerated += game.actions('raw', false, false, true).length;
  }

  const endA = performance.now();

  benchResults[`${Date.now()} ${maxTimelines} Timelines, ${maxTurns} Turns`] = {
    'Actions Generated': actionsGenerated,
    'Time Taken (secs)': ((endA - startA) / 1000),
    'Actions Generated per second': actionsGenerated / ((endA - startA) / 1000)
  }
}


benchCurrMoves();
game.move('a3');
game.submit();
benchCurrMoves();
game.move('a6');
game.submit();
benchCurrMoves();
game.move('(0T2)Nb1>>(0T1)b3');
game.submit();
benchCurrMoves();
game.move('(1T1)Nb8>>(0T1)b6');
game.submit();
benchCurrMoves();
game.move('(-1T2)Nb1>>(0T2)b3');
game.move('(1T2)Nd4');
game.submit();
benchCurrMoves();
game.move('(0T2)Nb8>>(0T1)b6');
game.move('(-1T2)Nb8>>(0T2)b6')
game.move('(1T2)a6')
game.move('(2T2)b6')
game.submit();
benchCurrMoves();
game.move('(-2T2)a4');
game.submit();
game.move('(-2T2)Nc6');
game.submit();
benchCurrMoves();

console.table(benchResults);

benchResults = {};
game.reset();
benchCurrActions();
game.move('a3');
game.submit();
benchCurrActions();
game.move('a6');
game.submit();
benchCurrActions();
game.move('(0T2)Nb1>>(0T1)b3');
game.submit();
benchCurrActions();
game.move('(1T1)Nb8>>(0T1)b6');
game.submit();
benchCurrActions();
game.move('(-1T2)Nb1>>(0T2)b3');
game.move('(1T2)Nd4');
game.submit();
//benchCurrActions();
game.move('(0T2)Nb8>>(0T1)b6');
game.move('(-1T2)Nb8>>(0T2)b6')
game.move('(1T2)a6')
game.move('(2T2)b6')
game.submit();
//benchCurrActions();
game.move('(-2T2)a4');
game.submit();
game.move('(-2T2)Nc6');
game.submit();
//benchCurrActions();

console.table(benchResults);
