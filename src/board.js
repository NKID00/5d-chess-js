const pieceFuncs = require('@local/piece');
const turnFuncs = require('@local/turn');
const parseFuncs = require('@local/parse');

exports.init = (variant) => {
  if(variant === 'defended_pawn') {
    return [[[
      [-8,-10,-4,-6,-12,-4,-6,-8],
      [-2,-2,-2,-2,-2,-2,-2,-2],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [-1,-1,-1,-1,-1,-1,-1,-1],
      [-7,-9,-3,-5,-11,-3,-5,-7]
    ]]];
  }
  else if(variant === 'half_reflected') {
    return [[[
      [-8,-6,-4,10,-12,-4,-6,-8],
      [-2,-2,-2,-2,-2,-2,-2,-2],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [-1,-1,-1,-1,-1,-1,-1,-1],
      [-7,-5,-3,-11,-9,-3,-5,-7]
    ]]];
  }
  else if(variant === 'princess') {
    return [[[
      [-8,-6,-4,14,-12,-4,-6,-8],
      [-2,-2,-2,-2,-2,-2,-2,-2],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [-1,-1,-1,-1,-1,-1,-1,-1],
      [-7,-5,-3,-13,-11,-3,-5,-7]
    ]]];
  }
  else if(variant === 'turn_zero') {
    return [[
      null,
      [
        [-8,-6,-4,10,-12,-4,-6,-8],
        [-2,-2,-2,-2,-2,-2,-2,-2],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-7,-5,-3,-9,-11,-3,-5,-7]
      ],
      [
        [-8,-6,-4,10,-12,-4,-6,-8],
        [-2,-2,-2,-2,-2,-2,-2,-2],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-7,-5,-3,-9,-11,-3,-5,-7]
      ]
    ]];
  }
  else if(typeof variant === 'object') {
    return parseFuncs.toBoard(variant);
  }
  return [[[
    [-8,-6,-4,10,-12,-4,-6,-8],
    [-2,-2,-2,-2,-2,-2,-2,-2],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-7,-5,-3,-9,-11,-3,-5,-7]
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

exports.setTurn = (board, timeline, time, turn) => {
  //Function to set small board/turn for full board. Used to avoid PACKED -> HOLEY element transistion on v8 engine.
  if(!Array.isArray(board)) {
    board = [];
  }
  for(var l = 0;l <= timeline;l++) {
    if(l === timeline) {
      if(!Array.isArray(board[l])) {
        board[l] = [];
      }
      for(var t = 0;t <= time;t++) {
        if(t === time) {
          board[l][t] = turn;
        }
        else if(t >= board[l].length || typeof board[l][t] === 'undefined') {
          board[l][t] = null;
        }
      }
    }
    else if(l >= board.length || typeof board[l] === 'undefined') {
      board[l] = null;
    }
  }
}

exports.move = (board, move) => {
  if(this.positionExists(board, move[0]) && this.positionIsLatest(board, move[0])) {
    var src = move[0];
    var dest = move[1];
    var newTurn = turnFuncs.copy(board, src[0], src[1]);
    var destPiece = dest[4] ? dest[4] : Math.abs(newTurn[src[2]][src[3]]);
    if(destPiece !== undefined && destPiece !== 0) {
      newTurn[src[2]][src[3]] = 0;
      if(dest !== undefined) {
        if(dest[0] === src[0] && dest[1] === src[1]) {
          newTurn[dest[2]][dest[3]] = destPiece;
        }
        else {
          var secondNewTurn = turnFuncs.copy(board, dest[0], dest[1]);
          secondNewTurn[dest[2]][dest[3]] = destPiece;
          if((board[dest[0]].length - 1) === dest[1]) {
            this.setTurn(board, dest[0], dest[1] + 1, secondNewTurn);
          }
          else {
            var newTimeline = 0;
            for(var i = 1;i < board.length;i++) {
              if(!(typeof board[i] === 'undefined' || board[i] === null) && (i % 2) === (dest[1] % 2)) {
                if(newTimeline < i) { newTimeline = i; }
              }
            }
            if(newTimeline === 0) {
              board[(dest[1] % 2) === 0 ? 2 : 1] = [];
              this.setTurn(board, (dest[1] % 2) === 0 ? 2 : 1, dest[1] + 1, secondNewTurn);
            }
            else {
              board[newTimeline + 2] = [];
              this.setTurn(board, newTimeline + 2, dest[1] + 1, secondNewTurn);
            }
          }
        }
      }
      this.setTurn(board, src[0], src[1] + 1, newTurn);
    }
    if(move[2] !== undefined) {
      var src2 = move[2];
      if(move[3] !== undefined) {
        var dest2 = move[3];
        var destPiece2 = dest2[4] ? dest2[4] : Math.abs(board[src2[0]][src2[1]][src2[2]][src2[3]]);
        if(dest2 !== undefined) {
          board[dest2[0]][dest2[1] + 1][dest2[2]][dest2[3]] = destPiece2;
        }
      }
      board[src2[0]][src2[1] + 1][src2[2]][src2[3]] = 0;
    }
  }
}

exports.positionExists = (board, pos) => {
  return Boolean(
    board !== undefined &&
    board[pos[0]] &&
    board[pos[0]][pos[1]] &&
    board[pos[0]][pos[1]][pos[2]] &&
    Number.isInteger(board[pos[0]][pos[1]][pos[2]][pos[3]])
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

exports.present = (board, actionNum) => {
  var res = [];
  var activeTimelines = this.active(board);
  var lowestTurn = -1;
  for(var i = 0;i < activeTimelines.length;i++) {
    var currMax = -1;
    for(var t = 0;t < board[activeTimelines[i]].length;t++) {
      if(board[activeTimelines[i]][t] !== undefined && currMax < t && actionNum % 2 === t % 2) {
        currMax = t;
      }
    }
    if(currMax !== -1) {
      if(lowestTurn === -1 || lowestTurn > currMax) {
        lowestTurn = currMax;
      }
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
      else if(lowestTurn > currMax) {
        return [];
      }
    }
  }
  return res;
}

exports.moves = (board, actionNum, activeOnly = true, presentOnly = true, variant = 'standard') => {
  var res = [];
  if(presentOnly) {
    var presentTimelines = this.present(board, actionNum);
    for(var i = 0;i < presentTimelines.length;i++) {
      if(board[presentTimelines[i]]) {
        var currTimeline = board[presentTimelines[i]];
        var latestTurn = currTimeline[currTimeline.length - 1];
        if((currTimeline.length - 1) % 2 === actionNum % 2) {
          for(var r = 0;latestTurn && r < latestTurn.length;r++) {
            for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
              if(Math.abs(latestTurn[r][f]) % 2 === actionNum % 2) {
                var moves = pieceFuncs.moves(board, [presentTimelines[i], currTimeline.length - 1, r, f], variant);
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
        if((currTimeline.length - 1) % 2 === actionNum % 2) {
          for(var r = 0;latestTurn && r < latestTurn.length;r++) {
            for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
              if(Math.abs(latestTurn[r][f]) % 2 === actionNum % 2) {
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
      if(currTimeline) {
        var latestTurn = currTimeline[currTimeline.length - 1];
        if((currTimeline.length - 1) % 2 === actionNum % 2) {
          for(var r = 0;latestTurn && r < latestTurn.length;r++) {
            for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
              if(Math.abs(latestTurn[r][f]) % 2 === actionNum % 2) {
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
  }
  return res;
}


exports.positionIsAttacked = (board, pos, player, singleBoard = false) => {
  var toCheck = [];
  if(this.positionExists(board, pos)) {
    var movePos = pieceFuncs.movePos(6); //Knight movement
    var moveVec = pieceFuncs.movePos(10); //Queen movement
    for(var i = 0;i < movePos.length;i++) {
      var newSrc = pos.slice();
      if(!singleBoard) {
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
      }
      newSrc[2] += movePos[i][2];
      newSrc[3] += movePos[i][3];
      if(this.positionExists(board, newSrc)) {
        var destPiece = board[newSrc[0]][newSrc[1]][newSrc[2]][newSrc[3]];
        if(Math.abs(destPiece) % 2 !== player) {
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
        if(this.positionExists(board, newSrc)) {
          var destPiece = board[newSrc[0]][newSrc[1]][newSrc[2]][newSrc[3]];
          if(Math.abs(destPiece) % 2 !== player) {
            toCheck.push(newSrc.slice());
          }
          else if(Math.abs(destPiece) % 2 === player) { blocking = true; }
        }
        else { blocking = true; }
      }
    }
    //Generate moves from toCheck Arr
    for(var i = 0;i < toCheck.length;i++) {
      var moves = pieceFuncs.moves(board, toCheck[i]);
      for(var j = 0;j < moves.length;j++) {
        if(this.positionIsLatest(board, moves[j][0])) {
          if (
            moves[j].length === 2 &&
            moves[j][1][0] === pos[0] &&
            moves[j][1][1] === pos[1] &&
            moves[j][1][2] === pos[2] &&
            moves[j][1][3] === pos[3]
          ) {
            return true;
          }
          if (
            moves[j].length === 3 &&
            moves[j][2][0] === pos[0] &&
            moves[j][2][1] === pos[1] &&
            moves[j][2][2] === pos[2] &&
            moves[j][2][3] === pos[3]
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

exports.compare = (board1, board2) => {
  if(Array.isArray(board1)) {
    if(Array.isArray(board2) && board1.length === board2.length) {
      for(var t = 0;t < board1.length;t++) {
        if(Array.isArray(board1[t])) {
          if(Array.isArray(board2[t]) && board1[t].length === board2[t].length) {
            for(var l = 0;l < board1[t].length;l++) {
              if(Array.isArray(board1[t][l])) {
                if(Array.isArray(board2[t][l]) && board1[t][l].length === board2[t][l].length) {
                  for(var r = 0;r < board1[t][l].length;r++) {
                    if(Array.isArray(board1[t][l][r])) {
                      if(Array.isArray(board2[t][l][r]) && board1[t][l][r].length === board2[t][l][r].length) {
                        for(var f = 0;f < board1[t][l][r].length;f++) {
                          if(board1[t][l][r][f] !== undefined) {
                            if(board2[t][l][r][f] !== undefined) {
                              if(board1[t][l][r][f] !== board2[t][l][r][f]) {
                                return board1[t][l][r][f] - board2[t][l][r][f];
                              }
                            }
                            else {
                              return -1;
                            }
                          }
                          else {
                            if(board2[t][l][r][f] !== undefined) {
                              return 1;
                            }
                          }
                        }
                      }
                      else {
                        return -1;
                      }
                    }
                    else {
                      if(Array.isArray(board2[t][l][r])) {
                        return 1;
                      }
                    }
                  }
                }
                else {
                  return -1;
                }
              }
              else {
                if(Array.isArray(board2[t][l])) {
                  return 1;
                }
              }
            }
          }
          else {
            return -1;
          }
        }
        else {
          if(Array.isArray(board2[t])) {
            return 1;
          }
        }
      }
    }
    else {
      return -1;
    }
  }
  else {
    if(Array.isArray(board2)) {
      return 1;
    }
    else {
      return 0;
    }
  }
  return 0;
}
