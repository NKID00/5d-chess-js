const parseFuncs = require('@local/parse');
const deepequal = require('deep-equal');

test('Position Parsing', () => {
  var pos1 = [1,2,3,4];
  var pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [2,3,4,5];
  pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [0,0,0,0];
  pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
  pos1 = [12,13,7,7];
  pos2 = parseFuncs.toPosition(parseFuncs.fromPosition(pos1.slice()));
  expect(deepequal(pos1,pos2)).toBe(true);
});