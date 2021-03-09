const Chess = require('@local/index');

test('Real End - Move Buffer', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
  [Mode "5D"]
  [Date "2021.02.08"]
  [White "5D-Chess-DB-Gen"]
  [Black "5D-Chess-DB-Gen"]
  [Result "*"]
  [Bench_time "10.75"]
  [Checkmate_time "65897"]
  [Checkmate_difficulty "6129.953488372093"]
  [Checkmate_timeout "true"]
  [Node "12.18.2"]
  [V8 "7.8.279.23-node.39"]
  [Hash "a71b77b56989a3d67ba15fb1c8d1310d"]
  [Chessjs "^1.0.9"]
  1. b3 / g5
  2. h4 / Bg7
  3. a3 / e5
  4. d4 / g4
  5. b4 / Kf8
  6. Bf4 / Ne7
  7. c4 / Ng8
  8. Qd3 / (0T8)Qd8>>(0T7)e8
  9. (-1T8)Bh2 / (-1T8)Qd8>>(0T8)e7
  10. (-1T9)f3 (0T9)Nc3 / (0T9)d5 (-1T9)g3`);
  chess.move('(-1T10)Qd1>>(-1T9)d2');
  chess.move('(-2T9)Qd3>>(-1T8)e3');
  var move = chess.moveBuffer[1];
  expect(move.end.timeline).toBe(-1);
  expect(move.realEnd.timeline).toBe(2);
});

test('Real End - Action History', () => {
  var chess = new Chess();
  chess.import(`[Board "Standard"]
  [Mode "5D"]
  [Date "2021.02.08"]
  [White "5D-Chess-DB-Gen"]
  [Black "5D-Chess-DB-Gen"]
  [Result "*"]
  [Bench_time "10.75"]
  [Checkmate_time "65897"]
  [Checkmate_difficulty "6129.953488372093"]
  [Checkmate_timeout "true"]
  [Node "12.18.2"]
  [V8 "7.8.279.23-node.39"]
  [Hash "a71b77b56989a3d67ba15fb1c8d1310d"]
  [Chessjs "^1.0.9"]
  1. b3 / g5
  2. h4 / Bg7
  3. a3 / e5
  4. d4 / g4
  5. b4 / Kf8
  6. Bf4 / Ne7
  7. c4 / Ng8
  8. Qd3 / (0T8)Qd8>>(0T7)e8
  9. (-1T8)Bh2 / (-1T8)Qd8>>(0T8)e7
  10. (-1T9)f3 (0T9)Nc3 / (0T9)d5 (-1T9)g3
  11. (0T10)Kd1 (-1T10)Qd1>>(-1T9)d2 (-2T9)Qd3>>(-1T8)e3`);
  var move = chess.actionHistory[20].moves[2];
  expect(move.end.timeline).toBe(-1);
  expect(move.realEnd.timeline).toBe(2);
});