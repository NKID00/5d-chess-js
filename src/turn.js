exports.copy = (board, timeline, turn) => {
  var res = [];
  if(board && board[timeline] && board[timeline][turn]) {
    for(var r = 0;r < board[timeline][turn].length;r++) {
      if(board[timeline][turn][r]) {
        res.push(board[timeline][turn][r].slice());
      }
    }
  }
  return res;
}
