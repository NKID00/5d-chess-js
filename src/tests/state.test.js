const Chess = require('@local/index');
const deepequal = require('deep-equal');

test('State Test', () => {
  var chess = new Chess();
  chess.move({
    "promotion": null,
    "enPassant": null,
    "castling": null,
    "start": {
      "timeline": 0,
      "turn": 1,
      "player": "white",
      "coordinate": "e2",
      "rank": 2,
      "file": 5
    },
    "end": {
      "timeline": 0,
      "turn": 1,
      "player": "white",
      "coordinate": "e3",
      "rank": 3,
      "file": 5
    },
    "player":
    "white"
  });
  var state1 = chess.state();
  chess.undo();
  chess.move({
    "promotion": null,
    "enPassant": null,
    "castling": null,
    "start": {
      "timeline": 0,
      "turn": 1,
      "player": "white",
      "coordinate": "e2",
      "rank": 2,
      "file": 5
    },
    "end": {
      "timeline": 0,
      "turn": 1,
      "player": "white",
      "coordinate": "e3",
      "rank": 3,
      "file": 5
    },
    "player":
    "white"
  });
  var state2 = chess.state();
  expect(deepequal(state1,state2)).toBe(true);
});

test('Copy Test', () => {
  var chess = new Chess();
  chess.import('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Qd1<>2:e2');
  var state1 = chess.state();
  var state2 = chess.copy().state();
  expect(deepequal(state1,state2)).toBe(true);
});