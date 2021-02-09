const boardFuncs = require('@local/board');
const copyFuncs = require('@local/copy');

/*
In pursuit of efficient action gen:

Theorem 1 - List of all possible moves (including on inactive timelines) are the only possible moves. When moving, no new moves are created.
Theorem 2 - Within the action, the moves that do not matter for move action is only if they are purely spatial moves.
Theorem 3 - If the present is moved backwards by a move, the action should only be that move (moves before and after can be considered optional).

*/

/*
exports.actions = (board, actionNum) => {
  //Results array
  var res = [];

  // Get all possible moves
  var possibleMoves = boardFuncs.moves(board, actionNum, false, false);

  //Filter out single move actions
  for(var i = 0;i < possibleMoves.length;i++) {
    var currMove = possibleMoves[i];
    var tmpBoard = boardFuncs.copy(board);
    boardFuncs.move(tmpBoard, currMove);
    var submittable = boardFuncs.present(tmpBoard, actionNum).length <= 0;
    if(submittable) {
      res.push([copyFuncs.move(currMove)]);
      possibleMoves.splice(i,1);
      i--;
    }
  }

  //Sort moves into groups by timeline coord in source
  var timelineMoves = [];
  var timelineMovesCursor = []; //Used to track which index in timelineMoves is being used
  for(var i = 0;i < board.length;i++) {
    timelineMoves.push([]);
    timelineMovesCursor.push(0);
  }
  for(var i = 0;i < possibleMoves.length;i++) {
    timelineMoves[possibleMoves[i][0][0]].push(copyFuncs.move(possibleMoves[i]));
  }

  //Build permutation
  var tmpRes = [];
  var done = false;
  while(!done) {
    var currAction = [];
    for(var i = 0;i < timelineMovesCursor.length;i++) {
      if(timelineMovesCursor[i] < timelineMoves[i].length) {
        currAction.push(copyFuncs.move(timelineMoves[i][timelineMovesCursor[i]]));
      }
    }
    tmpRes.push(currAction);

    var doneInc = false;
    for(var i = 0;!doneInc && i < timelineMovesCursor.length;i++) {
      timelineMovesCursor[i]++;
      if(timelineMovesCursor[i] < timelineMoves[i].length) {
        doneInc = true;
      }
      else {
        timelineMovesCursor[i] = 0;
        if(i + 1 >= timelineMovesCursor.length) {
          done = true;
        }
      }
    }
  }

  //
  done = false;
  console.log(tmpRes)
  return res;
}
*/

///*
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
//*/
/*
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
*/
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
