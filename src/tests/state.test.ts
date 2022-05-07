import { Chess } from '../index';
import { Move } from '../types/chess';
const deepEqual = require('deep-equal');

test('State Test', () => {
  var chess = new Chess();
  chess.move({
    promotion: null,
    enPassant: null,
    castling: null,
    start: {
      timeline: 0,
      turn: 1,
      player: 'white',
      coordinate: 'e2',
      rank: 2,
      file: 5
    },
    end: {
      timeline: 0,
      turn: 1,
      player: 'white',
      coordinate: 'e3',
      rank: 3,
      file: 5
    },
    player: 'white',
  } as Move);
  var state1 = chess.getState();
  chess.undo();
  chess.move({
    promotion: null,
    enPassant: null,
    castling: null,
    start: {
      timeline: 0,
      turn: 1,
      player: "white",
      coordinate: "e2",
      rank: 2,
      file: 5
    },
    end: {
      timeline: 0,
      turn: 1,
      player: "white",
      coordinate: "e3",
      rank: 3,
      file: 5
    },
    player:
      "white"
  } as Move);
  var state2 = chess.getState();
  expect(deepEqual(state1, state2)).toBe(true);
});

test('Copy Test', () => {
  var chess = new Chess();
  chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Qd1<>2:e2');
  var state1 = chess.getState();
  var state2 = chess.copy().getState();
  expect(deepEqual(state1, state2)).toBe(true);
});