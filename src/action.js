const boardFuncs = require('@local/board');

exports.actions = (board, action, activeOnly = true, presentOnly = true) => {
  var currDate = Date.now();
  var recurse =  (board, action, layer = 0, totalMoves = 0, totalLayers = 0, totalIndex = []) => {
    var returnArr = [];
    var moves = boardFuncs.moves(board, action, activeOnly, presentOnly);
    if(Date.now() > currDate + 1000) {
      currDate = Date.now();
      console.log('' + totalMoves + ' moves evaluated so far with ' + (totalLayers + 1) + ' max layers (index of layers is ' + totalIndex + ')')
    }
    for(var i = 0;i < moves.length;i++) {
      var moddedBoard = boardFuncs.copy(board);
      boardFuncs.move(moddedBoard, moves[i]);
      totalMoves++;
      if(boardFuncs.active(moddedBoard).length > 0) {
        totalIndex[layer] = i;
        var recurseRes = recurse(moddedBoard, action, layer + 1, totalMoves, totalLayers, totalIndex);
        var nextLayer = recurseRes[0];
        totalMoves = recurseRes[1];
        totalLayers = recurseRes[2] > layer ? recurseRes[2] : layer;
        totalIndex = recurseRes[3];
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
    return [returnArr, totalMoves, totalLayers, totalIndex];
  }
  return recurse(board, action)[0];
}

exports.move = (board, moves) => {
  for(var i = 0;i < moves.length;i++) {
    boardFuncs.move(board, moves[i]);
  }
}

exports.databaseHasBoard = (board, db) => {
  for(var i = 0;i < db.length;i++) {
    var comparison = boardFuncs.compare(board, db[i]);
    if(comparison === 0) {
      return true;
    }
  }
  db.push(boardFuncs.copy(board));
  return false;
}
