const Chess = require('@local/index');

test('Misc 1', () => {
  var chess = new Chess();
  expect(() => {
    //chess.import('1w. 1:a2:a4\n1b. 1:a7:a5\n2w. 2:Ra1:a3\n2b. 2:Ra8:a6\n3w. 3:Ra3:e3\n3b. 3:Nb8<>2:b6\n4w. 3-1:Ra3:b3\n4b. 3-1:c7:c6');
    //chess.move('5w. 4:Re3<>-1:e3');
    chess.import('1. a4 / a5 2. Ra3 / Ra6 3. Re3 / (0T3)Nb8>>(0T2)b6 4. (-1T3)Rb3 / (-1T3)c6');
    chess.move('(0T4)Re3>(-1T4)e3');
    chess.undo();
    chess.move('(0T4)Re3>(-1T4)e3');
  }).not.toThrow();
});


test('Double RF move promotion', () => {
  var chess = new Chess();
  expect(() => {
    chess.import(`[Size "3x3"]
[Board "custom"]
[Mode "5D"]
[k*1p*/3/K*R*1:0:1:w]`);
    chess.move('Rb2');
    chess.submit();
    chess.move('c1=R');
    chess.submit();
  }).not.toThrow();
});