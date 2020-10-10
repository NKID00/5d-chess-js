const boardFuncs = require('@local/board');

exports.char = (piece) => {
  if(piece === 3 || piece === 4) {
    return 'B';
  }
  if(piece === 5 || piece === 6) {
    return 'N';
  }
  if(Math.abs(piece) === 7 || Math.abs(piece) === 8) {
    return 'R';
  }
  if(piece === 9 || piece === 10) {
    return 'Q';
  }
  if(Math.abs(piece) === 11 || Math.abs(piece) === 12) {
    return 'K';
  }
  return '';
}

exports.movePos = (piece) => {
  if(piece === 5 || piece === 6) {
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
  if(piece === 3 || piece === 4) {
    return [
      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

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
  if(piece === 9 || piece === 10) {
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

exports.moves = (board, src) => {
  var res = [];
  if(boardFuncs.positionExists(board, src)) {
    var piece = board[src[0]][src[1]][src[2]][src[3]];
    var movePos = this.movePos(piece);
    for(var i = 0;i < movePos.length;i++) {
      var currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] += movePos[i][0] * 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] -= movePos[i][0] * 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      currMove[1][1] += movePos[i][1] * 2;
      currMove[1][2] += movePos[i][2];
      currMove[1][3] += movePos[i][3];
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0 || (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(piece < 0) { currMove[1][4] = Math.abs(piece); }
          res.push(currMove);
        }
      }
    }
    var moveVecs = this.moveVecs(piece);
    for(var i = 0;i < moveVecs.length;i++) {
      var currMove = [src.slice(), src.slice()];
      var blocking = false;
      while(!blocking) {
        if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
          currMove[1][0] += moveVecs[i][0] * 2;
          if(currMove[1][0] < 0) {
            currMove[1][0] = (currMove[1][0] * -1) + 1;
          }
        }
        else {
          currMove[1][0] += moveVecs[i][0] * -2;
          if(currMove[1][0] < 0) {
            currMove[1][0] = (currMove[1][0] * -1) - 1;
          }
        }
        currMove[1][1] += moveVecs[i][1] * 2;
        currMove[1][2] += moveVecs[i][2];
        currMove[1][3] += moveVecs[i][3];
        if(boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0 || (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            if(piece < 0) { currMove[1][4] = Math.abs(piece); }
            res.push([currMove[0].slice(),currMove[1].slice()]);
            if(Math.abs(destPiece) % 2 !== Math.abs(piece) % 2 && destPiece !== 0) { blocking = true; }
          }
          else { blocking = true; }
        }
        else { blocking = true; }
      }
    }
    if(piece === 1 || piece === -1) {
      //Black forward single square RF movement
      var currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      if(piece === -1) { currMove[1][4] = 1; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          if(currMove[1][2] === 7) {
            currMove[1][4] = 3;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 5;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 7;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 9;
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //Black forward single square capture RF movement
      currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      currMove[1][3]++;
      if(piece === -1) { currMove[1][4] = 1; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === 7) {
            currMove[1][4] = 3;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 5;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 7;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 9;
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      currMove = [src.slice(), src.slice()];
      currMove[1][2]++;
      currMove[1][3]--;
      if(piece === -1) { currMove[1][4] = 1; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === 7) {
            currMove[1][4] = 3;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 5;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 7;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 9;
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //Black forward en passant capture RF movement
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
        if(destPiece === 2) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]+1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === -2) {
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
        if(destPiece === 2) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]+1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]+1][currMove[1][3]];
            if(destPiece === -2) {
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
      //Black forward double square RF movement
      if(piece === -1) {
        currMove = [src.slice(), src.slice()];
        currMove[1][2] += 2;
        currMove[1][4] = 1;
        if(src[2] === 1 && boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] - 1][currMove[1][3]];
            if(destPiece === 0) {
              if(currMove[1][2] === 7) {
                currMove[1][4] = 3;
                res.push([currMove[0].slice(), currMove[1].slice()]);
                currMove[1][4] = 5;
                res.push([currMove[0].slice(), currMove[1].slice()]);
                currMove[1][4] = 7;
                res.push([currMove[0].slice(), currMove[1].slice()]);
                currMove[1][4] = 9;
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
              else {
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
      }
      //Black forward single square LT movement
      currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] += 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] -= 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      if(piece === -1) { currMove[1][4] = 1; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          res.push([currMove[0].slice(), currMove[1].slice()]);
        }
      }
      //Black forward single square capture LT movement
      currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] += 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] -= 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      currMove[1][1] += 2;
      if(piece === -1) { currMove[1][4] = 1; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          res.push([currMove[0].slice(), currMove[1].slice()]);
        }
      }
      currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] += 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] -= 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      currMove[1][1] -= 2;
      if(piece === -1) { currMove[1][4] = 1; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          res.push([currMove[0].slice(), currMove[1].slice()]);
        }
      }
    }
    if(piece === 2 || piece === -2) {
      //White forward single square RF movement
      var currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      if(piece === -2) { currMove[1][4] = 2; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          if(currMove[1][2] === 0) {
            currMove[1][4] = 4;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 6;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 8;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 10;
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //White forward single square capture RF movement
      currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      currMove[1][3]++;
      if(piece === -2) { currMove[1][4] = 2; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === 0) {
            currMove[1][4] = 4;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 6;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 8;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 10;
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      currMove = [src.slice(), src.slice()];
      currMove[1][2]--;
      currMove[1][3]--;
      if(piece === -2) { currMove[1][4] = 2; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if(currMove[1][2] === 0) {
            currMove[1][4] = 4;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 6;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 8;
            res.push([currMove[0].slice(), currMove[1].slice()]);
            currMove[1][4] = 10;
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          else {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
      }
      //White forward en passant capture RF movement
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
        if(destPiece === 1) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]-1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === -1) {
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
        if(destPiece === 1) {
          if(boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1]-2,
            currMove[1][2]-1,
            currMove[1][3]
          ])) {
            var destPiece = board[currMove[1][0]][currMove[1][1]-2][currMove[1][2]-1][currMove[1][3]];
            if(destPiece === -1) {
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
      //White forward double square RF movement
      if(piece === -2) {
        currMove = [src.slice(), src.slice()];
        currMove[1][2] -= 2;
        currMove[1][4] = 2;
        if(src[2] === 6 && boardFuncs.positionExists(board, currMove[1])) {
          var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if(destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] + 1][currMove[1][3]];
            if(destPiece === 0) {
              if(currMove[1][2] === 0) {
                currMove[1][4] = 4;
                res.push([currMove[0].slice(), currMove[1].slice()]);
                currMove[1][4] = 6;
                res.push([currMove[0].slice(), currMove[1].slice()]);
                currMove[1][4] = 8;
                res.push([currMove[0].slice(), currMove[1].slice()]);
                currMove[1][4] = 10;
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
              else {
                res.push([currMove[0].slice(), currMove[1].slice()]);
              }
            }
          }
        }
      }
      //White forward single square LT movement
      currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] -= 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] += 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      if(piece === -2) { currMove[1][4] = 2; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece === 0) {
          res.push([currMove[0].slice(), currMove[1].slice()]);
        }
      }
      //White forward single square capture LT movement
      currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] -= 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] += 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      currMove[1][1] += 2;
      if(piece === -2) { currMove[1][4] = 2; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          res.push([currMove[0].slice(), currMove[1].slice()]);
        }
      }
      currMove = [src.slice(), src.slice()];
      if(currMove[1][0] === 0 || currMove[1][0] % 2 === 0) {
        currMove[1][0] -= 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) + 1;
        }
      }
      else {
        currMove[1][0] += 2;
        if(currMove[1][0] < 0) {
          currMove[1][0] = (currMove[1][0] * -1) - 1;
        }
      }
      currMove[1][1] -= 2;
      if(piece === -2) { currMove[1][4] = 2; }
      if(boardFuncs.positionExists(board, currMove[1])) {
        var destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if(destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          res.push([currMove[0].slice(), currMove[1].slice()]);
        }
      }
    }
    if(piece === -11 || piece === -12) {
      if(src[3] === 4) {
        //Queenside Castling Movement
        currMove = [src.slice(), src.slice()];
        if(!boardFuncs.positionIsAttacked(board, src, Math.abs(piece) % 2)) {
          if(boardFuncs.positionExists(board,[
            src[0],
            src[1],
            src[2],
            3,
          ]) &&
          board[src[0]][src[1]][src[2]][3] === 0) {
            if(!boardFuncs.positionIsAttacked(board,[
              src[0],
              src[1],
              src[2],
              3,
            ], Math.abs(piece) % 2)) {
              if(boardFuncs.positionExists(board,[
                src[0],
                src[1],
                src[2],
                2,
              ]) &&
              board[src[0]][src[1]][src[2]][2] === 0) {
                if(!boardFuncs.positionIsAttacked(board,[
                  src[0],
                  src[1],
                  src[2],
                  2,
                ], Math.abs(piece) % 2)) {
                  if(boardFuncs.positionExists(board,[
                    src[0],
                    src[1],
                    src[2],
                    1,
                  ]) &&
                  board[src[0]][src[1]][src[2]][1] === 0) {
                    if(boardFuncs.positionExists(board,[
                      src[0],
                      src[1],
                      src[2],
                      0,
                    ]) &&
                    (board[src[0]][src[1]][src[2]][0] === -7 || board[src[0]][src[1]][src[2]][0] === -8)) {
                      if((piece === -11 && src[2] === 0) || (piece === -12 && src[2] === 7)) {
                        res.push([
                          [src[0], src[1], src[2], 4],
                          [src[0], src[1], src[2], 2, Math.abs(piece)],
                          [src[0], src[1], src[2], 0],
                          [src[0], src[1], src[2], 3, Math.abs(board[src[0]][src[1]][src[2]][0])]
                        ]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        //Kingside Castling Movement
        if(!boardFuncs.positionIsAttacked(board, src, Math.abs(piece) % 2)) {
          if(boardFuncs.positionExists(board,[
            src[0],
            src[1],
            src[2],
            5,
          ]) &&
          board[src[0]][src[1]][src[2]][5] === 0) {
            if(!boardFuncs.positionIsAttacked(board,[
              src[0],
              src[1],
              src[2],
              5,
            ], Math.abs(piece) % 2)) {
              if(boardFuncs.positionExists(board,[
                src[0],
                src[1],
                src[2],
                6,
              ]) &&
              board[src[0]][src[1]][src[2]][6] === 0) {
                if(!boardFuncs.positionIsAttacked(board,[
                  src[0],
                  src[1],
                  src[2],
                  6,
                ], Math.abs(piece) % 2)) {
                  if(boardFuncs.positionExists(board,[
                    src[0],
                    src[1],
                    src[2],
                    7,
                  ]) &&
                  (board[src[0]][src[1]][src[2]][7] === -7 || board[src[0]][src[1]][src[2]][7] === -8)) {
                    if((piece === -11 && src[2] === 0) || (piece === -12 && src[2] === 7)) {
                      res.push([
                        [src[0], src[1], src[2], 4],
                        [src[0], src[1], src[2], 6, Math.abs(piece)],
                        [src[0], src[1], src[2], 7],
                        [src[0], src[1], src[2], 5, Math.abs(board[src[0]][src[1]][src[2]][0])]
                      ]);
                    }
                  }
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
