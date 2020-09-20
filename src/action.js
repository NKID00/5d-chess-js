const boardFuncs = require('@local/board');

exports.actions = (board, action) => {
  var recurse =  (board, action) => {
    var returnArr = [];
    var newBoard = board.copy(board)
  }
  return recurse(board, action);
}