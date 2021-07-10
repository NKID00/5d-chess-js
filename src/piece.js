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
      [ 0, 0, 0,-1], 
      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],
      [ 1, 0, 0, 0],
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
      [ 0, 0,-1, 1],
      [ 0, 0, 1,-1],
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

  if(!boardFuncs.positionExists(board, src)) { return res; }
  var src0 = src[0];
  var src1 = src[1];
  var src2 = src[2];
  var src3 = src[3];
  var piece = board[src0][src1][src2][src3];
  if(piece === 0) { return res; }
  var absPiece = Math.abs(piece);
  var pieceColor = absPiece % 2;
  var isEvenTimeline = boardFuncs.isEvenTimeline(board);

  // Pawn/Brawn movement
  if (absPiece === 1 || absPiece === 2 || absPiece === 15 || absPiece === 16) {

    var curBoard = board[src0][src1];
    if (pieceColor === 1) {
      forward = -1;
      promotionRank = 0;
    } else {
      forward = 1;
      promotionRank = curBoard.length - 1;
    }

    //Forward single/double square RF movement
    var rPos = src2 + forward;
    if(rPos >= 0 && rPos < curBoard.length && src3 >= 0 && src3 < curBoard[rPos].length) {
      var destPiece = curBoard[rPos][src3];
      if(destPiece === 0) {
        if(rPos === promotionRank) {
          if(!promotionPieces || promotionPieces.length <= 0) {
            promotionPieces = this.availablePromotionPieces(board);
          }
          for(var i = 0; i < promotionPieces.length; i++) {
            if(promotionPieces[i] % 2 === pieceColor) {
              res.push([src, [src0, src1, rPos, src3, promotionPieces[i]]]);
            }
          }
        } else {
          res.push([src, [src0, src1, rPos, src3]]);
        }
        if (piece < 0) {
          var rPosDouble = rPos + forward;
          if (rPosDouble >= 0 && rPosDouble < curBoard.length && src3 >= 0 && src3 < curBoard[rPos].length) {
            var destPiece = curBoard[rPosDouble][src3];
            if (destPiece === 0) {
              if (rPos === promotionRank) {
                if(!promotionPieces || promotionPieces.length <= 0) {
                  promotionPieces = this.availablePromotionPieces(board);
                }
                for (var i = 0; i < promotionPieces.length; i++) {
                  if (promotionPieces[i] % 2 === pieceColor) {
                    res.push([src, [src0, src1, rPosDouble, src3, promotionPieces[i]]]);
                  }
                }
              } else {
                res.push([src, [src0, src1, rPosDouble, src3]]);
              }
            }
          }
        }
      }
    }

    //Forward single/en passant square capture RF movement
    var fPos = src3 + 1;
    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      var destPiece = curBoard[rPos][fPos];
      if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) {
        if(rPos === promotionRank) {
          if(!promotionPieces || promotionPieces.length <= 0) {
            promotionPieces = this.availablePromotionPieces(board);
          }
          for(var i = 0; i < promotionPieces.length; i++) {
            if(promotionPieces[i] % 2 === pieceColor) {
              res.push([src, [src0, src1, rPos, fPos, promotionPieces[i]]]);
            }
          }
        } else {
          res.push([src, [src0, src1, rPos, fPos]]);
        }
      }
      if (fPos >= 0 && fPos < curBoard[src2].length) {
        var destPiece = curBoard[src2][fPos] - pieceColor;
        if (destPiece === 1 || destPiece === 15) {
          var rPosEn = rPos + forward;
          if(rPosEn >= 0 && rPosEn < curBoard.length && fPos >= 0 && fPos < curBoard[rPosEn].length) {
            var destPiece = curBoard[rPosEn][fPos];
            if (destPiece === 0) {
              if (boardFuncs.positionExists(board, [src0, src1 - 2, rPosEn, fPos])) {
                var destPiece = board[src0][src1 - 2][rPosEn][fPos] + pieceColor;
                if (destPiece === -1 || destPiece === -15) {
                  res.push([src, [src0, src1, rPos, fPos], [src0, src1, src2, fPos]]);
                }
              }
            }
          }
        }
      }
    }
    var fPos = src3 - 1;
    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      var destPiece = curBoard[rPos][fPos];
      if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) {
        if(rPos === promotionRank) {
          if(!promotionPieces || promotionPieces.length <= 0) {
            promotionPieces = this.availablePromotionPieces(board);
          }
          for(var i = 0; i < promotionPieces.length; i++) {
            if(promotionPieces[i] % 2 === pieceColor) {
              res.push([src, [src0, src1, rPos, fPos, promotionPieces[i]]]);
            }
          }
        } else {
          res.push([src, [src0, src1, rPos, fPos]]);
        }
      }
      if (fPos >= 0 && fPos < curBoard[src2].length) {
        var destPiece = curBoard[src2][fPos] - pieceColor;
        if (destPiece === 1 || destPiece === 15) {
          var rPosEn = rPos + forward;
          if(rPosEn >= 0 && rPosEn < curBoard.length && fPos >= 0 && fPos < curBoard[rPosEn].length) {
            var destPiece = curBoard[rPosEn][fPos];
            if (destPiece === 0) {
              if (boardFuncs.positionExists(board, [src0, src1 - 2, rPosEn, fPos])) {
                var destPiece = board[src0][src1 - 2][rPosEn][fPos] + pieceColor;
                if (destPiece === -1 || destPiece === -15) {
                  res.push([src, [src0, src1, rPos, fPos], [src0, src1, src2, fPos]]);
                }
              }
            }
          }
        }
      }
    }

    if(!spatialOnly) {
      //Forward single square LT movement
      var curMove = [this.timelineMove(src0, -forward, isEvenTimeline), src1, src2, src3];
      if(boardFuncs.positionExists(board, curMove)) {
        var destPiece = board[curMove[0]][src1][src2][src3];
        if (destPiece === 0) {
          res.push([src, curMove]);
          //Forward double square LT movement
          if(piece < 0) {
            var curMove = [this.timelineMove(src0, -forward * 2, isEvenTimeline), src1, src2, src3];
            if (boardFuncs.positionExists(board, curMove)) {
              var destPiece = board[curMove[0]][src1][src2][src3];
              if (destPiece === 0) {
                res.push([src, curMove]);
              }
            }
          }
        }
      }

      //Forward single square capture LT movement
      var curMove = [this.timelineMove(src0, -forward, isEvenTimeline), src1 + 2, src2, src3];
      if (boardFuncs.positionExists(board, curMove)) {
        var destPiece = board[curMove[0]][curMove[1]][src2][src3];
        if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) {
          res.push([src, curMove]);
        }
      }
      var curMove = [this.timelineMove(src0, -forward, isEvenTimeline), src1 - 2, src2, src3];
      if (boardFuncs.positionExists(board, curMove)) {
        var destPiece = board[curMove[0]][curMove[1]][src2][src3];
        if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) {
          res.push([src, curMove]);
        }
      }

      // Brawn-specific captures
      if (absPiece === 15 || absPiece === 16) {
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
              } else {
                // Can't promote
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
      }
    }
  } else {

    // All non-pawn/brawn pieces
    var spatialLength = [
      0, 0, 4, 4, 8, 8, 4, 4,
      8, 8, 8, 8, 8, 8, 0, 0,
      8, 8, 8, 8, 0, 0, 0, 0
    ];

    //Single square moves
    var movePos = this.movePos(piece);
    if (movePos.length !== 0) {
      var spatial = spatialLength[Math.abs(piece) - 1];
      var curBoard = board[src0][src1];
      for (var i = 0; i < spatial; i++) {
        var rPos = src2 + movePos[i][2];
        var fPos = src3 + movePos[i][3];
        if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
          var destPiece = curBoard[rPos][fPos];
          if (destPiece === 0 || Math.abs(destPiece) % 2 !== pieceColor) {
            res.push([src, [src0, src1, rPos, fPos]]);
          }
        }
      }
      if(!spatialOnly) {
        for(var i = spatial; i < movePos.length; i++) {
          var curMove = [
            this.timelineMove(src0, movePos[i][0], isEvenTimeline), 
            src1 + movePos[i][1] * 2, 
            src2 + movePos[i][2], 
            src3 + movePos[i][3]
          ];
          if(boardFuncs.positionExists(board, curMove)) {
            var destPiece = board[curMove[0]][curMove[1]][curMove[2]][curMove[3]];
            if(destPiece === 0 || Math.abs(destPiece) % 2 !== pieceColor) {
              res.push([src, curMove]);
            }
          }
        }
      }
    }

    //Vector moves
    var moveVecs = this.moveVecs(piece);
    if (moveVecs.length !== 0) {
      var spatial = spatialLength[absPiece - 1];
      var curBoard = board[src0][src1];
      for (var i = 0; i < spatial; i++) {
        var rMove = moveVecs[i][2];
        var fMove = moveVecs[i][3];
        var rPos = src2 + rMove;
        var fPos = src3 + fMove;
        while(rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
          var destPiece = curBoard[rPos][fPos];
          if (destPiece !== 0) {
            if (Math.abs(destPiece) % 2 !== pieceColor) {
              res.push([src, [src0, src1, rPos, fPos]]);
            }
            break;
          }
          res.push([src, [src0, src1, rPos, fPos]]);
          rPos += rMove;
          fPos += fMove;
        }
      }
      if (!spatialOnly) {
        for(var i = spatial; i < moveVecs.length; i++) {
          var lMove = moveVecs[i][0];
          var tMove = moveVecs[i][1] * 2;
          var rMove = moveVecs[i][2];
          var fMove = moveVecs[i][3];
          var curMove = [
            this.timelineMove(src0, lMove, isEvenTimeline), 
            src1 + tMove, 
            src2 + rMove, 
            src3 + fMove
          ];
          while(boardFuncs.positionExists(board, curMove)) {
            var destPiece = board[curMove[0]][curMove[1]][curMove[2]][curMove[3]];
            if (destPiece !== 0) {
              if (Math.abs(destPiece) % 2 !== pieceColor) {
                res.push([src, curMove]);
              }
              break;
            }
            res.push([src, curMove.slice()]);
            curMove[0] = this.timelineMove(curMove[0], lMove, isEvenTimeline);
            curMove[1] += tMove;
            curMove[2] += rMove;
            curMove[3] += fMove;
          }
        }
      }
    }

    if(piece === -11 || piece === -12) {
      var curRank = curBoard[src2];
      var notInCheck = undefined;

      // Kingside Castling Movement
      var fPos = src3 + 1;
      if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {
        fPos++;
        if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {
          fPos++;
          while (fPos >= 0 && fPos < curRank.length) {
            var curPiece = curRank[fPos];
            if (curPiece !== 0) {
              if (curPiece - pieceColor === -8) {
                var rightOnePos = [src0, src1, src2, src3 + 1];
                var rightTwoPos = [src0, src1, src2, src3 + 2];
                var notInCheck = !boardFuncs.positionIsAttacked(board, src, pieceColor);
                if (notInCheck && 
                  !boardFuncs.positionIsAttacked(board, rightOnePos, pieceColor) &&
                  !boardFuncs.positionIsAttacked(board, rightTwoPos, pieceColor)
                  ) {
                  res.push([
                    src,
                    rightTwoPos,
                    [src0, src1, src2, fPos],
                    rightOnePos
                  ]);
                }
              }
              break;
            }
            fPos++;
          }
        }
      }

      // Queenside Castling Movement
      var fPos = src3 - 1;
      if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {
        fPos--;
        if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {
          fPos--;
          while (fPos >= 0 && fPos < curRank.length) {
            var curPiece = curRank[fPos];
            if (curPiece !== 0) {
              if (curPiece - pieceColor === -8) {
                var leftOnePos = [src0, src1, src2, src3 - 1];
                var leftTwoPos = [src0, src1, src2, src3 - 2];
                if (notInCheck !== undefined) {
                  if (notInCheck && 
                    !boardFuncs.positionIsAttacked(board, leftOnePos, pieceColor) &&
                    !boardFuncs.positionIsAttacked(board, leftTwoPos, pieceColor)
                    ) {
                    res.push([
                      src,
                      leftTwoPos,
                      [src0, src1, src2, fPos],
                      leftOnePos
                    ]);
                  }
                } else {
                  if (!boardFuncs.positionIsAttacked(board, src, pieceColor) && 
                  !boardFuncs.positionIsAttacked(board, leftOnePos, pieceColor) &&
                  !boardFuncs.positionIsAttacked(board, leftTwoPos, pieceColor)
                  ) {
                    res.push([
                      src,
                      leftTwoPos,
                      [src0, src1, src2, fPos],
                      leftOnePos
                    ]);
                  }
                }

              }
              break;
            }
            fPos--;
          }
        }
      }
    }
  }
  return res;
}
