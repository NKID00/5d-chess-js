import { Chess } from '../index';

test('Queenside castling', () => {
  var chess = new Chess();
  expect(() => {
    chess.import('1. e3 / e6 2. Qe2 / Qe7 3. d3 / d6 4. Bd2 / Bd7 5. Nc3 / Nc6 6. O-O-O / O-O-O');
  }).not.toThrow();
  expect(() => {
    chess.import('1. e3 / e6 2. Qe2 / Qe7 3. d3 / d6 4. Bd2 / Bd7 5. Nc3 / Nc6');
    chess.move('O-O');
  }).toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*3P*P*P*P*/R*3K*BNR*:0:1:w]`);
    chess.move('O-O-O');
  }).not.toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R,B,N"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/1r6/8/P*3P*P*P*P*/R*3K*BNR*:0:1:w]`);
    chess.move('O-O-O');
  }).not.toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R,B,N"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*3P*P*P*P*/R*2K*1BNR*:0:1:w]`);
    chess.move('Kb1');
  }).not.toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R,B,N"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/3r*4/8/P*3P*P*P*P*/R*3K*BNR*:0:1:w]`);
    chess.move('O-O-O');
  }).toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R,B,N"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/5q2/8/P*3P*P*P*P*/R*3K*BNR*:0:1:w]`);
    chess.move('O-O-O');
  }).toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R,B,N"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/1q6/8/P*3P*P*P*P*/R*3K*BNR*:0:1:w]`);
    chess.move('O-O-O');
  }).toThrow();
  expect(() => {
    chess.import(`[Board "Custom"]
[Size "8x8"]
[Promotions "Q,R,B,N"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*3P*P*P*P*/R*2K*1BNR*:0:1:w]`);
    chess.move('O-O-O');
  }).toThrow();
});
