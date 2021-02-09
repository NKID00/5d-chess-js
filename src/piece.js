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
  if(Math.abs(piece) === 11 || Math.abs(piece) === 12) {
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
  if(Math.abs(piece) === 9 || Math.abs(piece) === 10) {
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
              piece !== 0,
              piece !== 1,
              piece !== 2,
              piece !== 11,
              piece !== 12
            ) {
              res.push(piece);
            }
          }
        }
      }
    }
  }
  return res;
}

exports.moves = (board, src, spatialOnly = false) => {
  var res = [];
  if(boardFuncs.positionExists(board, src)) {
    var piece = board[src[0]][src[1]][src[2]][src[3]];
    var movePos = this.movePos(piece);
    for(var i = 0;i < movePos.length;i++) {
      if(!spatialOnly || (spatialOnly && (movePos[i][0] === 0 || movePos[i][1] === 0))) {
        var currMove = [src.slice(), src.slice()];
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] += movePos[i][0] * 2;
        }
        else {
          currMove[1][0] -= movePos[i][0] * 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
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
    var moveVecs = this.moveVecs(piece);
    for(var i = 0;i < moveVecs.length;i++) {
      if(!spatialOnly || (spatialOnly && (moveVecs[i][0] === 0 || moveVecs[i][1] === 0))) {
        var currMove = [src.slice(), src.slice()];
        var blocking = false;
        while(!blocking) {
          if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
            currMove[1][0] += moveVecs[i][0] * 2;
          }
          else {
            currMove[1][0] += moveVecs[i][0] * -2;
          }
          if(currMove[1][0] < 0) {
            currMove[1][0] = (currMove[1][0] * -1) - 1;
          }
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
    var promotionPieces = [];
    if(piece === 1 || piece === -1) {
      //Black forward single square RF movement
      var currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          if(currMove[1][2] === 0) {
            if(promotionPieces.length <= 0) {
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
            if(promotionPieces.length <= 0) {
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
            if(promotionPieces.length <= 0) {
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
        if(destPiece === 2) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]-1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === -2) {
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
        if(destPiece === 2) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]-1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === -2) {
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
      if(piece === -1) {
        currMove = [src.slice(), src.slice()];
        currMove[1][2] -= 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === 0) {
              if(currMove[1][2] === 0) {            
                if(promotionPieces.length <= 0) {
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
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] += 2;
        }
        else {
          currMove[1][0] -= 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
            //Black forward double square LT movement
            currMove = [src.slice(), src.slice()];
            if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
              currMove[1][0] += 4;
            }
            else {
              currMove[1][0] -= 4;
            }
            if(currMove[1][0] < 0) {
              currMove[1][0] = (currMove[1][0] * -1) - 1;
            }
            if(boardFuncs.positionExists(board, currMove[1])) {
              var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
              if(destPiece === 0) {
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
        //Black forward single square capture LT movement
        currMove = [src.slice(), src.slice()];
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] += 2;
        }
        else {
          currMove[1][0] -= 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
        currMove[1][1] += 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        currMove = [src.slice(), src.slice()];
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] += 2;
        }
        else {
          currMove[1][0] -= 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
        currMove[1][1] -= 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
    }
    if(piece === 2 || piece === -2) {
      //White forward single square RF movement
      var currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          if(currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if(promotionPieces.length <= 0) {
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
            if(promotionPieces.length <= 0) {
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
            if(promotionPieces.length <= 0) {
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
        if(destPiece === 1) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]+1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === -1) {
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
        if(destPiece === 1) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]+1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === -1) {
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
      if(piece === -2) {
        currMove = [src.slice(), src.slice()];
        currMove[1][2] += 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === 0) {
              if(currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
                if(promotionPieces.length <= 0) {
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
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] -= 2;
        }
        else {
          currMove[1][0] += 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
            //White forward double square LT movement
            currMove = [src.slice(), src.slice()];
            if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
              currMove[1][0] -= 4;
            }
            else {
              currMove[1][0] += 4;
            }
            if(currMove[1][0] < 0) {
              currMove[1][0] = (currMove[1][0] * -1) - 1;
            }
            if(boardFuncs.positionExists(board, currMove[1])) {
              var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
              if(destPiece === 0) {
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
        //White forward single square capture LT movement
        currMove = [src.slice(), src.slice()];
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] -= 2;
        }
        else {
          currMove[1][0] += 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
        currMove[1][1] += 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        currMove = [src.slice(), src.slice()];
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] -= 2;
        }
        else {
          currMove[1][0] += 2;
        }
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
        currMove[1][1] -= 2;
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
    }
    if(piece === -11 || piece === -12) {
      //Queenside Castling Movement
      currMove = [src.slice(), src.slice()];
      if(!boardFuncs.positionIsAttacked(board, src, Math.abs(piece) % 2, true)) {
        if(boardFuncs.positionExists(board,[
          src[0],
          src[1],
          src[2],
          src[3] - 1,
        ]) &&
        board[src[0]][src[1]][src[2]][src[3] - 1] === 0) {
          if(!boardFuncs.positionIsAttacked(board,[
            src[0],
            src[1],
            src[2],
            src[3] - 1,
          ], Math.abs(piece) % 2, true)) {
            if(boardFuncs.positionExists(board,[
              src[0],
              src[1],
              src[2],
              src[3] - 2,
            ]) &&
            board[src[0]][src[1]][src[2]][src[3] - 2] === 0) {
              if(!boardFuncs.positionIsAttacked(board,[
                src[0],
                src[1],
                src[2],
                src[3] - 2,
              ], Math.abs(piece) % 2, true)) {
                if(boardFuncs.positionExists(board,[
                  src[0],
                  src[1],
                  src[2],
                  src[3] - 3,
                ]) &&
                board[src[0]][src[1]][src[2]][src[3] - 3] === 0) {
                  if(boardFuncs.positionExists(board,[
                    src[0],
                    src[1],
                    src[2],
                    src[3] - 4,
                  ]) &&
                  (board[src[0]][src[1]][src[2]][src[3] - 4] === -7 || board[src[0]][src[1]][src[2]][src[3] - 4] === -8)) {
                    res.push([
                      [src[0], src[1], src[2], src[3]],
                      [src[0], src[1], src[2], src[3] - 2],
                      [src[0], src[1], src[2], src[3] - 4],
                      [src[0], src[1], src[2], src[3] - 1]
                    ]);
                  }
                }
              }
            }
          }
        }
      }
      //Kingside Castling Movement
      if(!boardFuncs.positionIsAttacked(board, src, Math.abs(piece) % 2, true)) {
        if(boardFuncs.positionExists(board,[
          src[0],
          src[1],
          src[2],
          src[3] + 1,
        ]) &&
        board[src[0]][src[1]][src[2]][src[3] + 1] === 0) {
          if(!boardFuncs.positionIsAttacked(board,[
            src[0],
            src[1],
            src[2],
            src[3] + 1,
          ], Math.abs(piece) % 2, true)) {
            if(boardFuncs.positionExists(board,[
              src[0],
              src[1],
              src[2],
              src[3] + 2,
            ]) &&
            board[src[0]][src[1]][src[2]][src[3] + 2] === 0) {
              if(!boardFuncs.positionIsAttacked(board,[
                src[0],
                src[1],
                src[2],
                src[3] + 2,
              ], Math.abs(piece) % 2, true)) {
                if(boardFuncs.positionExists(board,[
                  src[0],
                  src[1],
                  src[2],
                  src[3] + 3,
                ]) &&
                (board[src[0]][src[1]][src[2]][src[3] + 3] === -7 || board[src[0]][src[1]][src[2]][src[3] + 3] === -8)) {
                  res.push([
                    [src[0], src[1], src[2], src[3]],
                    [src[0], src[1], src[2], src[3] + 2],
                    [src[0], src[1], src[2], src[3] + 3],
                    [src[0], src[1], src[2], src[3] + 1]
                  ]);
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
