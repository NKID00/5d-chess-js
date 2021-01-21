const parseFuncs = require('@local/parse');
const pieceFuncs = require('@local/piece');

exports.toSanCoord = (point) => {
  return String.fromCharCode(point[1] + 97) + (point[0] + 1);
}

exports.fromSanCoord = (str) => {
  return [str.charCodeAt(0) - 97, Number(str.charAt(1)) - 1];
}



exports.fromMove = (move, board) => {
  var res = '';
  var src = move[0];
  var dest = move[1];
  var moveObj = parseFuncs.fromMove(move);
  if(board.length > 0 || src[1] !== dest[1]) {
    res += `(${moveObj.start.timeline}T${moveObj.start.turn})`;
  }
  res += pieceFuncs.char(
    board[src[0]][src[1]][src[2]][src[3]],
    (src[0] !== dest[0] || src[1] !== dest[1])
  );
  res += this.toSanCoord([src[2], src[3]]);
  
}