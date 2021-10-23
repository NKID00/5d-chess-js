exports.turnArray = (board, timeline, turn) => {
  var res = [];
  for(var r = 0;r < 10;r++) {
    res[r] = [];
    for(var f = 0;f < 10;f++) {
      if(r === 0) {
        if(f === 0) {
          res[r][f] = (turn % 2 === 0 ? '' + '╔' : '╔');
        }
        else if(f === 9) {
          res[r][f] = (turn % 2 === 0 ? '' + '╗' : '╗');
        }
        else {
          res[r][f] = (turn % 2 === 0 ? '' + '═' : '═');
        }
      }
      else if(r === 9) {
        if(f === 0) {
          res[r][f] = (turn % 2 === 0 ? '' + '╚' : '╚');
        }
        else if(f === 9) {
          res[r][f] = (turn % 2 === 0 ? '' + '╝' : '╝');
        }
        else {
          res[r][f] = (turn % 2 === 0 ? '' + '═' : '═');
        }
      }
      else if(f === 0) {
        res[r][f] = (turn % 2 === 0 ? '' + '║' : '║');
      }
      else if(f === 9) {
        res[r][f] = (turn % 2 === 0 ? '' + '║' : '║');
      }
      else {
        res[r][f] = '.';
      }
    }
  }
  if(board && board[timeline] && board[timeline][turn]) {
    for(var r = 0;r < board[timeline][turn].length;r++) {
      if(board[timeline][turn][r]) {
        for(var f = 0;f < board[timeline][turn][r].length;f++) {
          var piece = Math.abs(board[timeline][turn][r][f]);
          if(piece === 1) {
            res[8 - r][f + 1] = 'p';
          }
          else if(piece === 3) {
            res[8 - r][f + 1] = 'b';
          }
          else if(piece === 5) {
            res[8 - r][f + 1] = 'n';
          }
          else if(piece === 7) {
            res[8 - r][f + 1] = 'r';
          }
          else if(piece === 9) {
            res[8 - r][f + 1] = 'q';
          }
          else if(piece === 11) {
            res[8 - r][f + 1] = 'k';
          }
          else if(piece === 13) {
            res[8 - r][f + 1] = 's';
          }
          else if(piece === 2) {
            res[8 - r][f + 1] = 'P';
          }
          else if(piece === 4) {
            res[8 - r][f + 1] = 'B';
          }
          else if(piece === 6) {
            res[8 - r][f + 1] = 'N';
          }
          else if(piece === 8) {
            res[8 - r][f + 1] = 'R';
          }
          else if(piece === 10) {
            res[8 - r][f + 1] = 'Q';
          }
          else if(piece === 12) {
            res[8 - r][f + 1] = 'K';
          }
          else if(piece === 14) {
            res[8 - r][f + 1] = 'S';
          }
        }
      }
    }
  }
  var string = '' + timeline + ',' + turn;
  for(var i = 1;i < 10;i++) {
    if(i-1 < string.length) {
      res[0][i] = string.charAt(i-1);
    }
  }
  for(var r = 1;r < 9;r++) {
    for(var f = 1;f < 9;f++) {
      if((r + f) % 2 === 0) {
        res[r][f] = res[r][f];
      }
    }
  }
  return res;
}

exports.blankTurnArray = () => {
  var res = [];
  for(var r = 0;r < 10;r++) {
    res[r] = [];
    for(var f = 0;f < 10;f++) {
      res[r][f] = ' ';
    }
  }
  return res;
}

exports.boardArray = (board) => {
  var res = [];
  var offset = 0;
  for(var l = board.length - 1;board && l >= 0;l--) {
    if(l % 2 !== 0) {
      res[Math.floor((board.length - l - 1)/2)] = [];
      offset++;
    }
    if(Array.isArray(board[l]) && l % 2 !== 0) {
      for(var t = 0;t < board[l].length;t++) {
        if(Array.isArray(board[l][t])) {
          res[Math.floor((board.length - l - 1)/2)][t] = this.turnArray(board, l, t);
        }
        else {
          res[Math.floor((board.length - l - 1)/2)][t] = this.blankTurnArray(board, l, t);
        }
      }
    }
  }
  for(var l = 0;board && l < board.length;l++) {
    if(Array.isArray(board[l]) && l % 2 === 0) {
      res[l/2 + offset] = [];
      for(var t = 0;t < board[l].length;t++) {
        if(Array.isArray(board[l][t])) {
          res[l/2 + offset][t] = this.turnArray(board, l, t);
        }
        else {
          res[l/2 + offset][t] = this.blankTurnArray(board, l, t);
        }
      }
    }
  }
  return res;
}

exports.printBoard = (board) => {
  var printStr = '';
  var array = this.boardArray(board);
  for(var l = 0;array && l < array.length;l++) {
    for(var r = 0;r < 10;r++) {
      for(var t = 0;array[l] && t < array[l].length;t++) {
        for(var f = 0;f < 10;f++) {
          printStr += array[l][t][r][f];
        }
      }
      printStr += '\n';
    }
  }
  return printStr;
}
