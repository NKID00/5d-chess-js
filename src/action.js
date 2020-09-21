const boardFuncs = require('@local/board');

exports.actions = (board, action, activeOnly = true, presentOnly = true) => {
  var recurse =  (board, action) => {
    var returnArr = [];
    var moves = boardFuncs.moves(board, action, activeOnly, presentOnly);
    for(var i = 0;i < moves.length;i++) {
      var moddedBoard = boardFuncs.copy(board);
      boardFuncs.move(moddedBoard, moves[i]);
      if(boardFuncs.active(moddedBoard).length > 0) {
        var nextLayer = recurse(moddedBoard, action);
        for(var j = 0;j < nextLayer.length;j++) {
          var currArr = [moves[i]];
          for(var k = 0;k < nextLayer[j].length;k++) {
            currArr.push(nextLayer[j][k]);
          }
          returnArr.push(currArr);
        }
        if(nextLayer.length === 0) {
          returnArr.push([moves[i]]);
        }
      }
      else {
        returnArr.push([moves[i]]);
      }
    }
    return returnArr;
  }
  return recurse(board, action);
}

exports.move = (board, moves) => {
  for(var i = 0;i < moves.length;i++) {
    boardFuncs.move(board, moves[i]);
  }
}