const boardFuncs = require('@local/board');
const copyFuncs = require('@local/copy');

/*
exports.actions = (board, actionNum, activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, variant = 'standard') => {
  var recurse =  (board, actionNum, layer = 0, totalMoves = 0, totalLayers = 0, totalIndex = []) => {
    var returnArr = [];
    var moves = boardFuncs.moves(board, actionNum, activeOnly, presentOnly, variant);
    for(var i = 0;i < moves.length;i++) {
      var moddedBoard = boardFuncs.copy(board);
      if(
        !newActiveTimelinesOnly ||
        (newActiveTimelinesOnly && (this.newTimelineIsActive(moddedBoard, actionNum) || (!this.newTimelineIsActive(moddedBoard, actionNum) && boardFuncs.positionIsLatest(moddedBoard, moves[i][1]))))
      ) {
        boardFuncs.move(moddedBoard, moves[i]);
        totalMoves++;
        if(boardFuncs.present(moddedBoard, actionNum).length > 0) {
          totalIndex[layer] = i;
          var recurseRes = recurse(moddedBoard, actionNum, layer + 1, totalMoves, totalLayers, totalIndex);
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
    }
    return [returnArr, totalMoves, totalLayers, totalIndex];
  }
  return recurse(board, actionNum)[0];
}
*/

exports.actions = (board, actionNum, activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, variant = 'standard') => {
  var moves = boardFuncs.moves(board, actionNum, activeOnly, presentOnly, variant);
  var possibleMoves = copyFuncs.action(moves);
  var returnArr = [];
  for(var i = 0;i < moves.length;i++) {
    returnArr.push([copyFuncs.move(moves[i])]);
  }
  var allDone = 0;
  while(allDone < returnArr.length) {
    allDone = 0;
    for(var i = 0;i < returnArr.length;i++) {
      var moddedBoard = boardFuncs.copy(board);
      var skip = false;
      for(var j = 0;!skip && j < returnArr[i].length;j++) {
        try {
          boardFuncs.move(moddedBoard, returnArr[i][j]);
        }
        catch(err) {
          returnArr.splice(i, 1);
          skip = true;
          i--;
        }
      }
      if(!skip) {
        if(boardFuncs.present(moddedBoard, actionNum).length > 0) {
          var baseAction = copyFuncs.action(returnArr[i]);
          returnArr.splice(i, 1);
          for(var j = 0;j < possibleMoves.length;j++) {
            var currAction = copyFuncs.action(baseAction);
            currAction.push(copyFuncs.move(possibleMoves[j]));
            returnArr.push(currAction);
          }
          i--;
        }
        else {
          allDone++;
        }
      }
    }
  }
  return returnArr;
}

exports.move = (board, moves) => {
  for(var i = 0;i < moves.length;i++) {
    boardFuncs.move(board, moves[i]);
  }
}

exports.newTimelineIsActive = (board, actionNum) => {
  var minTimeline = 0;
  var maxTimeline = 0;
  for(var l = 0;board && l < board.length;l++) {
    if(board[l]) {
      if(minTimeline < l && l % 2 !== 0) {
        minTimeline = l;
      }
      if(maxTimeline < l && l % 2 === 0) {
        maxTimeline = l;
      }
    }
  }
  if(actionNum % 2 === 0) {
    return (minTimeline + 1) >= maxTimeline;
  }
  return (minTimeline + 1) <= maxTimeline;
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
