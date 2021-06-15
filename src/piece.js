const boardFuncs = require('@local/board');

exports.toChar = (piece, displayPawn = false) => {
  if(displayPawn && (Math.abs(piece) === 1 || Math.abs(piece) === 2)) {
    return 'P';
  }
  if(Math.abs(piece) === 3 || Math.abs(piece) === 4) {
    return 'B';
  }
  if(Math.abs(piece) === 5 || Math.abs(piece) === 6) {
    return 'N';
  }
  if(Math.abs(piece) === 7 || Math.abs(piece) === 8) {
    return 'R';
  }
  if(Math.abs(piece) === 9 || Math.abs(piece) === 10) {
    return 'Q';
  }
  if(Math.abs(piece) === 11 || Math.abs(piece) === 12) {
    return 'K';
  }
  if(Math.abs(piece) === 13 || Math.abs(piece) === 14) {
    return 'S';
  }
  if(Math.abs(piece) === 15 || Math.abs(piece) === 16) {
    return 'W';
  }
  if(Math.abs(piece) === 17 || Math.abs(piece) === 18) {
    return 'C';
  }
  if(Math.abs(piece) === 19 || Math.abs(piece) === 20) {
    return 'Y';
  }
  if(Math.abs(piece) === 21 || Math.abs(piece) === 22) {
    return 'U';
  }
  if(Math.abs(piece) === 23 || Math.abs(piece) === 24) {
    return 'D';
  }
  return '';
}

exports.fromChar = (char, actionNum = 0) => {
  if(char === 'P') {
    return (actionNum % 2 === 0 ? 2 : 1);
  }
  if(char === 'B') {
    return (actionNum % 2 === 0 ? 4 : 3);
  }
  if(char === 'N') {
    return (actionNum % 2 === 0 ? 6 : 5);
  }
  if(char === 'R') {
    return (actionNum % 2 === 0 ? 8 : 7);
  }
  if(char === 'Q') {
    return (actionNum % 2 === 0 ? 10 : 9);
  }
  if(char === 'K') {
    return (actionNum % 2 === 0 ? 12 : 11);
  }
  if(char === 'S') {
    return (actionNum % 2 === 0 ? 14 : 13);
  }
  if(char === 'W' || char === 'BR') {
    return (actionNum % 2 === 0 ? 16 : 15);
  }
  if(char === 'C' || char === 'CK') {
    return (actionNum % 2 === 0 ? 18 : 17);
  }
  if(char === 'Y' || char === 'RQ') {
    return (actionNum % 2 === 0 ? 20 : 19);
  }
  if(char === 'U') {
    return (actionNum % 2 === 0 ? 22 : 21);
  }
  if(char === 'D') {
    return (actionNum % 2 === 0 ? 24 : 23);
  }
  return (actionNum % 2 === 0 ? 2 : 1);
}

exports.movePos = (piece) => {
  if(Math.abs(piece) === 5 || Math.abs(piece) === 6) {
    return [
      [ 0, 0, 1, 2],
      [ 0, 0, 1,-2],
      [ 0, 0,-1, 2],
      [ 0, 0,-1,-2],
      [ 0, 0, 2, 1],
      [ 0, 0, 2,-1],
      [ 0, 0,-2, 1],
      [ 0, 0,-2,-1],

      [ 0, 1, 0, 2],
      [ 0, 1, 0,-2],
      [ 0,-1, 0, 2],
      [ 0,-1, 0,-2],
      [ 0, 2, 0, 1],
      [ 0, 2, 0,-1],
      [ 0,-2, 0, 1],
      [ 0,-2, 0,-1],

      [ 0, 1, 2, 0],
      [ 0, 1,-2, 0],
      [ 0,-1, 2, 0],
      [ 0,-1,-2, 0],
      [ 0, 2, 1, 0],
      [ 0, 2,-1, 0],
      [ 0,-2, 1, 0],
      [ 0,-2,-1, 0],

      [ 1, 0, 0, 2],
      [ 1, 0, 0,-2],
      [-1, 0, 0, 2],
      [-1, 0, 0,-2],
      [ 2, 0, 0, 1],
      [ 2, 0, 0,-1],
      [-2, 0, 0, 1],
      [-2, 0, 0,-1],

      [ 1, 0, 2, 0],
      [ 1, 0,-2, 0],
      [-1, 0, 2, 0],
      [-1, 0,-2, 0],
      [ 2, 0, 1, 0],
      [ 2, 0,-1, 0],
      [-2, 0, 1, 0],
      [-2, 0,-1, 0],

      [ 1, 2, 0, 0],
      [ 1,-2, 0, 0],
      [-1, 2, 0, 0],
      [-1,-2, 0, 0],
      [ 2, 1, 0, 0],
      [ 2,-1, 0, 0],
      [-2, 1, 0, 0],
      [-2,-1, 0, 0]
    ];
  }
  if(Math.abs(piece) === 11 || Math.abs(piece) === 12 || Math.abs(piece) === 17 || Math.abs(piece) === 18) {
    return [
      [ 0, 0, 0, 1],
      [ 0, 0, 0,-1],

      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 0],
      [ 0, 1,-1, 0],
      [ 0,-1, 1, 0],
      [ 0,-1,-1, 0],

      [ 0, 1, 1, 1],
      [ 0, 1, 1,-1],
      [ 0, 1,-1, 1],
      [ 0, 1,-1,-1],
      [ 0,-1, 1, 1],
      [ 0,-1, 1,-1],
      [ 0,-1,-1, 1],
      [ 0,-1,-1,-1],

      [ 1, 0, 0, 0],
      [-1, 0, 0, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 0, 1, 1],
      [ 1, 0, 1,-1],
      [ 1, 0,-1, 1],
      [ 1, 0,-1,-1],
      [-1, 0, 1, 1],
      [-1, 0, 1,-1],
      [-1, 0,-1, 1],
      [-1, 0,-1,-1],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0],

      [ 1, 1, 0, 1],
      [ 1, 1, 0,-1],
      [ 1,-1, 0, 1],
      [ 1,-1, 0,-1],
      [-1, 1, 0, 1],
      [-1, 1, 0,-1],
      [-1,-1, 0, 1],
      [-1,-1, 0,-1],

      [ 1, 1, 1, 0],
      [ 1, 1,-1, 0],
      [ 1,-1, 1, 0],
      [ 1,-1,-1, 0],
      [-1, 1, 1, 0],
      [-1, 1,-1, 0],
      [-1,-1, 1, 0],
      [-1,-1,-1, 0],

      [ 1, 1, 1, 1],
      [ 1, 1, 1,-1],
      [ 1, 1,-1, 1],
      [ 1, 1,-1,-1],
      [ 1,-1, 1, 1],
      [ 1,-1, 1,-1],
      [ 1,-1,-1, 1],
      [ 1,-1,-1,-1],
      [-1, 1, 1, 1],
      [-1, 1, 1,-1],
      [-1, 1,-1, 1],
      [-1, 1,-1,-1],
      [-1,-1, 1, 1],
      [-1,-1, 1,-1],
      [-1,-1,-1, 1],
      [-1,-1,-1,-1]
    ];
  }
  return [];
}

exports.moveVecs = (piece) => {
  if(Math.abs(piece) === 3 || Math.abs(piece) === 4) {
    return [
      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 0],
      [ 0, 1,-1, 0],
      [ 0,-1, 1, 0],
      [ 0,-1,-1, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0]
    ];
  }
  if(Math.abs(piece) === 7 || Math.abs(piece) === 8) {
    return [
      [ 0, 0, 0, 1],
      [ 0, 0, 1, 0],
      [ 0, 1, 0, 0],
      [ 1, 0, 0, 0],
      [ 0, 0, 0,-1],
      [ 0, 0,-1, 0],
      [ 0,-1, 0, 0],
      [-1, 0, 0, 0]
    ];
  }
  if(Math.abs(piece) === 9 || Math.abs(piece) === 10 || Math.abs(piece) === 19 || Math.abs(piece) === 20) {
    return [
      [ 0, 0, 0, 1],
      [ 0, 0, 0,-1],

      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 0],
      [ 0, 1,-1, 0],
      [ 0,-1, 1, 0],
      [ 0,-1,-1, 0],

      [ 0, 1, 1, 1],
      [ 0, 1, 1,-1],
      [ 0, 1,-1, 1],
      [ 0, 1,-1,-1],
      [ 0,-1, 1, 1],
      [ 0,-1, 1,-1],
      [ 0,-1,-1, 1],
      [ 0,-1,-1,-1],

      [ 1, 0, 0, 0],
      [-1, 0, 0, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 0, 1, 1],
      [ 1, 0, 1,-1],
      [ 1, 0,-1, 1],
      [ 1, 0,-1,-1],
      [-1, 0, 1, 1],
      [-1, 0, 1,-1],
      [-1, 0,-1, 1],
      [-1, 0,-1,-1],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0],

      [ 1, 1, 0, 1],
      [ 1, 1, 0,-1],
      [ 1,-1, 0, 1],
      [ 1,-1, 0,-1],
      [-1, 1, 0, 1],
      [-1, 1, 0,-1],
      [-1,-1, 0, 1],
      [-1,-1, 0,-1],

      [ 1, 1, 1, 0],
      [ 1, 1,-1, 0],
      [ 1,-1, 1, 0],
      [ 1,-1,-1, 0],
      [-1, 1, 1, 0],
      [-1, 1,-1, 0],
      [-1,-1, 1, 0],
      [-1,-1,-1, 0],

      [ 1, 1, 1, 1],
      [ 1, 1, 1,-1],
      [ 1, 1,-1, 1],
      [ 1, 1,-1,-1],
      [ 1,-1, 1, 1],
      [ 1,-1, 1,-1],
      [ 1,-1,-1, 1],
      [ 1,-1,-1,-1],
      [-1, 1, 1, 1],
      [-1, 1, 1,-1],
      [-1, 1,-1, 1],
      [-1, 1,-1,-1],
      [-1,-1, 1, 1],
      [-1,-1, 1,-1],
      [-1,-1,-1, 1],
      [-1,-1,-1,-1]
    ];
  }
  if(Math.abs(piece) === 13 || Math.abs(piece) === 14) {
    return [
      [ 0, 0, 0, 1],
      [ 0, 0, 0,-1],

      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 0],
      [ 0, 1,-1, 0],
      [ 0,-1, 1, 0],
      [ 0,-1,-1, 0],

      [ 1, 0, 0, 0],
      [-1, 0, 0, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0]
    ];
  }
  if(Math.abs(piece) === 21 || Math.abs(piece) === 22) {
    return [
      [ 0, 1, 1, 1],
      [ 0, 1, 1,-1],
      [ 0, 1,-1, 1],
      [ 0, 1,-1,-1],
      [ 0,-1, 1, 1],
      [ 0,-1, 1,-1],
      [ 0,-1,-1, 1],
      [ 0,-1,-1,-1],

      [ 1, 0, 1, 1],
      [ 1, 0, 1,-1],
      [ 1, 0,-1, 1],
      [ 1, 0,-1,-1],
      [-1, 0, 1, 1],
      [-1, 0, 1,-1],
      [-1, 0,-1, 1],
      [-1, 0,-1,-1],

      [ 1, 1, 0, 1],
      [ 1, 1, 0,-1],
      [ 1,-1, 0, 1],
      [ 1,-1, 0,-1],
      [-1, 1, 0, 1],
      [-1, 1, 0,-1],
      [-1,-1, 0, 1],
      [-1,-1, 0,-1],

      [ 1, 1, 1, 0],
      [ 1, 1,-1, 0],
      [ 1,-1, 1, 0],
      [ 1,-1,-1, 0],
      [-1, 1, 1, 0],
      [-1, 1,-1, 0],
      [-1,-1, 1, 0],
      [-1,-1,-1, 0],
    ];
  }
  if(Math.abs(piece) === 23 || Math.abs(piece) === 24) {
    return [
      [ 1, 1, 1, 1],
      [ 1, 1, 1,-1],
      [ 1, 1,-1, 1],
      [ 1, 1,-1,-1],
      [ 1,-1, 1, 1],
      [ 1,-1, 1,-1],
      [ 1,-1,-1, 1],
      [ 1,-1,-1,-1],
      [-1, 1, 1, 1],
      [-1, 1, 1,-1],
      [-1, 1,-1, 1],
      [-1, 1,-1,-1],
      [-1,-1, 1, 1],
      [-1,-1, 1,-1],
      [-1,-1,-1, 1],
      [-1,-1,-1,-1]
    ];
  }
  return [];
}

exports.availablePromotionPieces = (board) => {
  var res = [];
  for(var l = 0;board && l < board.length;l++) {
    for(var t = 0;board[l] && t < board[l].length;t++) {
      for(var r = 0;board[l][t] && r < board[l][t].length;r++) {
        for(var f = 0;board[l][t][r] && f < board[l][t][r].length;f++) {
          var piece = Math.abs(board[l][t][r][f]);
          if(!res.includes(piece)) {
            if(
              piece >= 3 && piece <= 10 ||
              piece >= 13 && piece <= 14 ||
              piece >= 17 && piece <= 18
            ) {
              res.push(piece);
            }
          }
        }
      }
    }
  }
  //Order pieces in order of importance
  //TODO: system to modify this.promotionPieces on index.js for builtin variants that need it
  return res.sort((a, b) => b - a);
}

exports.timelineMove = (sourceTimelineIndex, timelineMoveVector, isEvenTimeline = false) => {
  var ret = 0;
  if(sourceTimelineIndex % 2 === 0) {
    ret = sourceTimelineIndex + (timelineMoveVector * 2);
  }
  else {
    ret = sourceTimelineIndex - (timelineMoveVector * 2);
  }
  if(!isEvenTimeline && ret < 0) {
    ret = (ret * -1) - 1;
  }
  if(isEvenTimeline && ret <= 0) {
    ret = (ret * -1) + 1;
  }
  return ret;
}

exports.moves = (board, src, spatialOnly = false, promotionPieces = null, skipCastling = false) => {
  var res = [];
  var isEvenTimeline = boardFuncs.isEvenTimeline(board);
  if(boardFuncs.positionExists(board, src)) {
    var piece = board[src[0]][src[1]][src[2]][src[3]];
    if(Math.abs(piece) === 0) { return []; }
    //Single square moves
    var movePos = this.movePos(piece);
    for(var i = 0;i < movePos.length;i++) {
      if(!spatialOnly || (spatialOnly && (movePos[i][0] === 0 && movePos[i][1] === 0))) {
        var currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], movePos[i][0], isEvenTimeline);
        currMove[1][1] += movePos[i][1] * 2;
        currMove[1][2] += movePos[i][2];
        currMove[1][3] += movePos[i][3];
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0 || (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push(currMove);
          }
        }
      }
    }
    //Vector moves
    var moveVecs = this.moveVecs(piece);
    for(var i = 0;i < moveVecs.length;i++) {
      if(!spatialOnly || (spatialOnly && (moveVecs[i][0] === 0 && moveVecs[i][1] === 0))) {
        var currMove = [src.slice(), src.slice()];
        var blocking = false;
        while(!blocking) {
          currMove[1][0] = this.timelineMove(currMove[1][0], moveVecs[i][0], isEvenTimeline);
          currMove[1][1] += moveVecs[i][1] * 2;
          currMove[1][2] += moveVecs[i][2];
          currMove[1][3] += moveVecs[i][3];
          if(boardFuncs.positionExists(board, currMove[1])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
            if(destPiece === 0 || (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
              res.push([currMove[0].slice(),currMove[1].slice()]);
              if(Math.abs(destPiece) % 2 !== Math.abs(piece) % 2 && destPiece !== 0) { blocking = true; }
            }
            else { blocking = true; }
          }
          else { blocking = true; }
        }
      }
    }
    //Black pawn/brawn moves
    if(Math.abs(piece) === 1 || Math.abs(piece) === 15) {
      //Black forward single square RF movement
      var currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          if(currMove[1][2] === 0) {
            if(!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for(var i = 0;i < promotionPieces.length;i++) {
              if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                currMove[1][4] = promotionPieces[i];
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //Black forward single square capture RF movement
      currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      currMove[1][3]++;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === 0) {
            if(!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for(var i = 0;i < promotionPieces.length;i++) {
              if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                currMove[1][4] = promotionPieces[i];
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      currMove[1][3]--;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === 0) {
            if(!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for(var i = 0;i < promotionPieces.length;i++) {
              if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                currMove[1][4] = promotionPieces[i];
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //Black forward en passant capture RF movement
      currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      currMove[1][3]++;
      if(boardFuncs.positionExists(board, [
        currMove[1][0],
        currMove[1][1],
        currMove[1][2]+1,
        currMove[1][3]
      ])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]+1][currMove[1][3]];
        if(destPiece === 2 || destPiece === 16) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]-1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === -2 || destPiece === -16) {
              res.push([currMove[0].slice(), currMove[1].slice(), [
                currMove[1][0],
                currMove[1][1],
                currMove[1][2]+1,
                currMove[1][3]
              ]]);
            }
          }
        }
      }
      currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      currMove[1][3]--;
      if(boardFuncs.positionExists(board, [
        currMove[1][0],
        currMove[1][1],
        currMove[1][2]+1,
        currMove[1][3]
      ])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]+1][currMove[1][3]];
        if(destPiece === 2 || destPiece === 16) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]-1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === -2 || destPiece === -16) {
              res.push([currMove[0].slice(), currMove[1].slice(), [
                currMove[1][0],
                currMove[1][1],
                currMove[1][2]+1,
                currMove[1][3]
              ]]);
            }
          }
        }
      }
      //Black forward double square RF movement
      if(piece === -1 || piece === -15) {
        currMove = [src.slice(), src.slice()];
        currMove[1][2] -= 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === 0) {
              if(currMove[1][2] === 0) {
                if(!promotionPieces || promotionPieces.length <= 0) {
                  promotionPieces = this.availablePromotionPieces(board);
                }
                for(var i = 0;i < promotionPieces.length;i++) {
                  if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                    currMove[1][4] = promotionPieces[i];
                    res.push([currMove[0].slice(), currMove[1].slice()]);
                  }
                }
              }
              else {
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
      }
      if(!spatialOnly) {
        //Black forward single square LT movement
        currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], 1, isEvenTimeline);
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
            //Black forward double square LT movement
            if(piece === -1 || piece === -15) {
              currMove = [src.slice(), src.slice()];
              currMove[1][0] = this.timelineMove(currMove[1][0], 2, isEvenTimeline);
              if(boardFuncs.positionExists(board, currMove[1])) {
                var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
                if(destPiece === 0) {
                  res.push([currMove[0].slice(), currMove[1].slice()]);
                }
              }
            }
          }
        }
        //Black forward single square capture LT movement
        currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], 1, isEvenTimeline);
        currMove[1][1] += 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], 1, isEvenTimeline);
        currMove[1][1] -= 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
    }
    //White pawn/brawn moves
    if(Math.abs(piece) === 2 || Math.abs(piece) === 16) {
      //White forward single square RF movement
      var currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          if(currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if(!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for(var i = 0;i < promotionPieces.length;i++) {
              if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                currMove[1][4] = promotionPieces[i];
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //White forward single square capture RF movement
      currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      currMove[1][3]++;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if(!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for(var i = 0;i < promotionPieces.length;i++) {
              if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                currMove[1][4] = promotionPieces[i];
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      currMove[1][3]--;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if(!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for(var i = 0;i < promotionPieces.length;i++) {
              if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                currMove[1][4] = promotionPieces[i];
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //White forward en passant capture RF movement
      currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      currMove[1][3]++;
      if(boardFuncs.positionExists(board, [
        currMove[1][0],
        currMove[1][1],
        currMove[1][2]-1,
        currMove[1][3]
      ])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]-1][currMove[1][3]];
        if(destPiece === 1 || destPiece === 15) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]+1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === -1 || destPiece === -15) {
              res.push([currMove[0].slice(), currMove[1].slice(), [
                currMove[1][0],
                currMove[1][1],
                currMove[1][2]-1,
                currMove[1][3]
              ]]);
            }
          }
        }
      }
      currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      currMove[1][3]--;
      if(boardFuncs.positionExists(board, [
        currMove[1][0],
        currMove[1][1],
        currMove[1][2]-1,
        currMove[1][3]
      ])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]-1][currMove[1][3]];
        if(destPiece === 1 || destPiece === 15) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]+1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === -1 || destPiece === -15) {
              res.push([currMove[0].slice(), currMove[1].slice(), [
                currMove[1][0],
                currMove[1][1],
                currMove[1][2]-1,
                currMove[1][3]
              ]]);
            }
          }
        }
      }
      //White forward double square RF movement
      if(piece === -2 || piece === -16) {
        currMove = [src.slice(), src.slice()];
        currMove[1][2] += 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === 0) {
              if(currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
                if(!promotionPieces || promotionPieces.length <= 0) {
                  promotionPieces = this.availablePromotionPieces(board);
                }
                for(var i = 0;i < promotionPieces.length;i++) {
                  if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                    currMove[1][4] = promotionPieces[i];
                    res.push([currMove[0].slice(), currMove[1].slice()]);
                  }
                }
              }
              else {
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
      }
      if(!spatialOnly) {
        //White forward single square LT movement
        currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], -1, isEvenTimeline);
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
            //White forward double square LT movement
            if(piece === -1 || piece === -15) {
              currMove = [src.slice(), src.slice()];
              currMove[1][0] = this.timelineMove(currMove[1][0], -2, isEvenTimeline);
              if(boardFuncs.positionExists(board, currMove[1])) {
                var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
                if(destPiece === 0) {
                  res.push([currMove[0].slice(), currMove[1].slice()]);
                }
              }
            }
          }
        }
        //White forward single square capture LT movement
        currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], -1, isEvenTimeline);
        currMove[1][1] += 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        currMove = [src.slice(), src.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], -1, isEvenTimeline);
        currMove[1][1] -= 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
    }
    // Brawn-specific captures
    if (Math.abs(piece) === 15 || Math.abs(piece) === 16) {
      let promotionRank = Math.abs(piece) % 2 === 0 ? board[src[0]][src[1]].length - 1 : 0;
      let forward = Math.abs(piece) % 2 === 0 ? 1 : -1;
      // ⟨l, t, y, x⟩
      let cardinalities = [
        [-forward, 0, 0, 1],
        [-forward, 0, 0, -1],
        [-forward, 0, forward, 0],
        [0, -1, forward, 0],
      ];

      for (let [dl, dt, dy, dx] of cardinalities) {
        if (src[0] % 2 === 0) {
          // White's timelines
          currMove = [src.slice(), [
            src[0],
            src[1] + 2 * dt,
            src[2] + dy,
            src[3] + dx
          ]];
          currMove[1][0] = this.timelineMove(currMove[1][0], dl, isEvenTimeline);
        } else {
          // Black's timelines
          currMove = [src.slice(), [
            src[0],
            src[1] + 2 * dt,
            src[2] + dy,
            src[3] + dx
          ]];
          currMove[1][0] = this.timelineMove(currMove[1][0], dl, isEvenTimeline);
        }

        // Verify the capture and yield the move
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {

            if(currMove[1][2] === promotionRank) {
              // Must promote
              if(!promotionPieces || promotionPieces.length <= 0) {
                promotionPieces = this.availablePromotionPieces(board);
              }
              for(var i = 0;i < promotionPieces.length;i++) {
                if(promotionPieces[i] % 2 === Math.abs(piece) % 2) {
                  currMove[1][4] = promotionPieces[i];
                  res.push([currMove[0].slice(), currMove[1].slice()]);
                }
              }
            }
            else {
              // Can't promote
              res.push([currMove[0].slice(), currMove[1].slice()]);
            }
          }
        }
      }
    }
    //Castling
    if((piece === -11 || piece === -12) && !skipCastling) {
      //Queenside Castling Movement
      if(!boardFuncs.positionIsAttacked(board, src, Math.abs(piece) % 2, true)) {
        var leftOnePos = [
          src[0],
          src[1],
          src[2],
          src[3] - 1,
        ];
        if(
          boardFuncs.positionExists(board, leftOnePos) &&
          board[leftOnePos[0]][leftOnePos[1]][leftOnePos[2]][leftOnePos[3]] === 0 &&
          !boardFuncs.positionIsAttacked(board, leftOnePos, Math.abs(piece) % 2, true)
        ) {
          var leftTwoPos = [
            src[0],
            src[1],
            src[2],
            src[3] - 2,
          ];
          if(
            boardFuncs.positionExists(board, leftTwoPos) &&
            board[leftTwoPos[0]][leftTwoPos[1]][leftTwoPos[2]][leftTwoPos[3]] === 0 &&
            !boardFuncs.positionIsAttacked(board, leftTwoPos, Math.abs(piece) % 2, true)
          ) {
            //Search left for rook
            var done = false;
            var currPos = leftTwoPos.slice();
            currPos[3]--;
            while(!done) {
              if(boardFuncs.positionExists(board, currPos)) {
                var currPiece = board[currPos[0]][currPos[1]][currPos[2]][currPos[3]];
                if(currPiece === -7 || currPiece === -8) {
                  if(Math.abs(piece) % 2 === Math.abs(currPiece) % 2) {
                    res.push([
                      src.slice(),
                      leftTwoPos.slice(),
                      currPos.slice(),
                      leftOnePos.slice()
                    ]);
                  }
                }
                else if(currPiece !== 0) {
                  done = true;
                }
              }
              else {
                done = true;
              }
              currPos[3]--;
            }
          }
        }
      }
      //Kingside Castling Movement
      if(!boardFuncs.positionIsAttacked(board, src, Math.abs(piece) % 2, true)) {
        var rightOnePos = [
          src[0],
          src[1],
          src[2],
          src[3] + 1,
        ];
        if(
          boardFuncs.positionExists(board, rightOnePos) &&
          board[rightOnePos[0]][rightOnePos[1]][rightOnePos[2]][rightOnePos[3]] === 0 &&
          !boardFuncs.positionIsAttacked(board, rightOnePos, Math.abs(piece) % 2, true)
        ) {
          var rightTwoPos = [
            src[0],
            src[1],
            src[2],
            src[3] + 2,
          ];
          if(
            boardFuncs.positionExists(board, rightTwoPos) &&
            board[rightTwoPos[0]][rightTwoPos[1]][rightTwoPos[2]][rightTwoPos[3]] === 0 &&
            !boardFuncs.positionIsAttacked(board, rightTwoPos, Math.abs(piece) % 2, true)
          ) {
            //Search right for rook
            var done = false;
            var currPos = rightTwoPos.slice();
            currPos[3]++;
            while(!done) {
              if(boardFuncs.positionExists(board, currPos)) {
                var currPiece = board[currPos[0]][currPos[1]][currPos[2]][currPos[3]];
                if(currPiece === -7 || currPiece === -8) {
                  if(Math.abs(piece) % 2 === Math.abs(currPiece) % 2) {
                    res.push([
                      src.slice(),
                      rightTwoPos.slice(),
                      currPos.slice(),
                      rightOnePos.slice()
                    ]);
                  }
                }
                else if(currPiece !== 0) {
                  done = true;
                }
              }
              else {
                done = true;
              }
              currPos[3]++;
            }
          }
        }
      }
    }
  }
  return res;
}
