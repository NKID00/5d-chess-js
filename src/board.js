const pieceFuncs = require('@local/piece');
const turnFuncs = require('@local/turn');

exports.init = () => {
  return [[[
    [7,5,3,9,11,3,5,7],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,2,2,2,2,2,2,2],
    [8,6,4,10,12,4,6,8]
  ]]];
}

exports.copy = (board) => {
  var res = [];
  for(var l = 0;board && l < board.length;l++) {
    if(board[l]) {
      res[l] = [];
    }
    for(var t = 0;board[l] && t < board[l].length;t++) {
      if(board[l][t]) {
        res[l][t] = [];
      }
      for(var r = 0;board[l][t] && r < board[l][t].length;r++) {
        if(board[l][t][r]) {
          res[l][t][r] = board[l][t][r].slice();
        }
      }
    }
  }
  return res;
}

exports.move = (board, move) => {
  if(this.positionExists(board, move[0]) && this.positionIsLatest(board, move[0])) {
    var src = move[0];
    var dest = move[1];
    var newTurn = turnFuncs.copy(board, src[0], src[1]);
    var destPiece = dest[4] ? dest[4] : newTurn[src[2]][src[3]];
    if(destPiece !== undefined && destPiece !== 0) { 
      newTurn[src[2]][src[3]] = 0;
      if(dest !== undefined) {
        if(dest[0] === src[0] && dest[1] === src[1]) {
          newTurn[dest[2]][dest[3]] = destPiece;
        }
        else {
          var secondNewTurn = turnFuncs.copy(board, dest[0], dest[1]);
          secondNewTurn[dest[2]][dest[3]] = destPiece;
          if(this.positionIsLatest(board, dest)) {
            board[dest[0]][dest[1] + 1] = secondNewTurn;
          }
          else {
            var newTimeline = 0;
            for(var i = 0;i < board.length;i++) {
              if(board[i] !== undefined && i % 2 === destPiece % 2) {
                if(newTimeline < i) { i = newTimeline; }
              }
            }
            board[newTimeline + 2] = [];
            board[newTimeline][dest[1] + 1] = secondNewTurn;
          }
        }
      }
      board[src[0]][src[1] + 1] = newTurn;
    }
    if(move[2] !== undefined) {
      var src2 = move[2];
      var dest2 = move[3];
      var destPiece2 = dest2[4] ? dest2[4] : board[src2[0]][src2[1]][src2[2]][src2[3]];
      if(dest2 !== undefined) {
        board[dest2[0]][dest2[1]][dest2[2]][dest2[3]] = destPiece2;
      }
      board[src2[0]][src2[1]][src2[2]][src2[3]] = 0;
    }
  }
}

exports.positionExists = (board, pos) => {
  return Boolean(
    board &&
    board[pos[0]] &&
    board[pos[0]][pos[1]] &&
    board[pos[0]][pos[1]][pos[2]] &&
    board[pos[0]][pos[1]][pos[2]][pos[3]] !== undefined
  );
}

exports.positionIsLatest = (board, pos) => {
  if(this.positionExists(board, pos)) {
    return (board[pos[0]].length - 1) === pos[1];
  }
  return false;
}

exports.active = (board) => {
  var res = [];
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
  for(var l = 0;board && l < board.length;l++) {
    if(board[l]) {
      if(maxTimeline + 1 >= l && l % 2 !== 0) {
        res.push(l);
      }
      if(minTimeline + 3 >= l && l % 2 === 0) {
        res.push(l);
      }
    }
  }
  return res;
}

exports.present = (board) => {
  var res = [];
  var activeTimelines = this.active(board);
  var lowestTurn = -1;
  for(var i = 0;i < activeTimelines.length;i++) {
    var currMax = 0;
    for(var t = 0;t < board[activeTimelines[i]].length;t++) {
      if(board[activeTimelines[i]][t] && currMax < t) {
        currMax = t;
      }
    }
    if(lowestTurn === -1 || lowestTurn > currMax) {
      lowestTurn = currMax;
    }
  }
  if(lowestTurn >= 0) {
    for(var i = 0;i < activeTimelines.length;i++) {
      var currMax = 0;
      for(var t = 0;t < board[activeTimelines[i]].length;t++) {
        if(board[activeTimelines[i]][t] && currMax < t) {
          currMax = t;
        }
      }
      if(lowestTurn === currMax) {
        res.push(activeTimelines[i]);
      }
    }
  }
  return res;
}

exports.moves = (board, action, activeOnly = true, presentOnly = true) => {
  var res = [];
  if(presentOnly) {
    var presentTimelines = this.present(board);
    for(var i = 0;i < presentTimelines.length;i++) {
      if(board[presentTimelines[i]]) {
        var currTimeline = board[presentTimelines[i]];
        var latestTurn = currTimeline[currTimeline.length - 1];
        if((currTimeline.length - 1) % 2 === action % 2) {
          for(var r = 0;latestTurn && r < latestTurn.length;r++) {
            for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
              if(latestTurn[r][f] % 2 === action % 2) {
                var moves = pieceFuncs.moves(board, [presentTimelines[i], currTimeline.length - 1, r, f]);
                for(var j = 0;j < moves.length;j++) {
                  res.push(moves[j]);
                }
              }
            }
          }
        }
      }
    }
  }
  else if(activeOnly) {
    var activeTimelines = this.active(board);
    for(var i = 0;i < activeTimelines.length;i++) {
      if(board[activeTimelines[i]]) {
        var currTimeline = board[activeTimelines[i]];
        var latestTurn = currTimeline[currTimeline.length - 1];
        if((currTimeline.length - 1) % 2 === action % 2) {
          for(var r = 0;latestTurn && r < latestTurn.length;r++) {
            for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
              if(latestTurn[r][f] % 2 === action % 2) {
                var moves = pieceFuncs.moves(board, [activeTimelines[i], currTimeline.length - 1, r, f]);
                for(var j = 0;j < moves.length;j++) {
                  res.push(moves[j]);
                }
              }
            }
          }
        }
      }
    }
  }
  else {
    for(var l = 0;board && l < board.length;l++) {
      var currTimeline = board[l];
      var latestTurn = currTimeline[currTimeline.length - 1];
      if((currTimeline.length - 1) % 2 === action % 2) {
        for(var r = 0;latestTurn && r < latestTurn.length;r++) {
          for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
            if(latestTurn[r][f] % 2 === action % 2) {
              var moves = pieceFuncs.moves(board, [l, currTimeline.length - 1, r, f]);
              for(var j = 0;j < moves.length;j++) {
                res.push(moves[j]);
              }
            }
          }
        }
      }
    }
  }
  return res;
}

exports.positionIsAttacked = (board, pos, player) => {
  var toCheck = [];
  if(this.positionExists(board, pos)) {
    var movePos = pieceFuncs.movePos(6); //Knight movement
    var moveVec = pieceFuncs.movePos(10); //Queen movement
    for(var i = 0;i < movePos.length;i++) {
      var newSrc = pos.slice();
      if(newSrc[0] === 0 || newSrc[0] % 2 === 0) {
        newSrc[0] += movePos[i][0] * 2;
        if(newSrc[0] < 0) {
          newSrc[0] = (newSrc[0] * -1) + 1;
        }
      }
      else {
        newSrc[0] -= movePos[i][0] * 2;
        if(newSrc[0] < 0) {
          newSrc[0] = (newSrc[0] * -1) - 1;
        }
      }
      newSrc[1] += movePos[i][1] * 2;
      newSrc[2] += movePos[i][2];
      newSrc[3] += movePos[i][3];
      if(boardFuncs.positionExists(board, newSrc)) {
        var destPiece = board[newSrc[0]][newSrc[1]][newSrc[2]][newSrc[3]];
        if(destPiece % 2 !== player) {
          toCheck.push(newSrc.slice());
        }
      }
    }
    for(var i = 0;i < moveVec.length;i++) {
      var newSrc = pos.slice();
      var blocking = false;
      while(!blocking) {
        if(newSrc[0] === 0 || newSrc[0] % 2 === 0) {
          newSrc[0] += moveVec[i][0] * 2;
          if(newSrc[0] < 0) {
            newSrc[0] = (newSrc[0] * -1) + 1;
          }
        }
        else {
          newSrc[0] -= moveVec[i][0] * 2;
          if(newSrc[0] < 0) {
            newSrc[0] = (newSrc[0] * -1) - 1;
          }
        }
        newSrc[1] += moveVec[i][1] * 2;
        newSrc[2] += moveVec[i][2];
        newSrc[3] += moveVec[i][3];
        if(boardFuncs.positionExists(board, newSrc)) {
          var destPiece = board[newSrc[0]][newSrc[1]][newSrc[2]][newSrc[3]];
          if(destPiece % 2 !== player) {
            toCheck.push(newSrc.slice());
          }
          else if(destPiece % 2 === player) { blocking = true; }
        }
        else { blocking = true; }
      }
    }
    //Generate moves from toCheck Arr
    for(var i = 0;i < toCheck.length;i++) {
      var moves = pieceFuncs.moves(board, toCheck[i]);
      for(var j = 0;j < moves.length;j++) {
        if(
          moves[j][1][0] === pos[0] &&
          moves[j][1][1] === pos[1] &&
          moves[j][1][2] === pos[2] &&
          moves[j][1][3] === pos[3]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}