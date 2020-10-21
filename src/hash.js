const md5 = require('blueimp-md5');

exports.hash = (board) => {
  var res = '';
  for(var l = 0;board && l < board.length;l++) {
    if(board[l]) {
      for(var t = 0;t < board[l].length;t++) {
        if(board[l][t]) {
          var zeroSum = 0;
          for(var r = 0;r < board[l][t].length;r++) {
            for(var f = 0;f < board[l][t][r].length;f++) {
              var piece = board[l][t][r][f];
              if(piece === 0) {
                zeroSum++;
              }
              else {
                if(zeroSum > 0) {
                  res += '' + zeroSum;
                  zeroSum = 0;
                }
                if(piece > 0) {
                  res += String.fromCharCode(97 + piece);
                }
                else {
                  res += String.fromCharCode(67 + Math.abs(piece));
                }
              }
            }
          }
        }
        else {
          res += 'B';
        }
      }
    }
    else {
      res += 'A';
    }
  }
  return md5(res);
}

exports.hashBoard = (board, timeline, turn) => {
  var res = '';
  var l = timeline;
  var t = turn;
  if(board[l][t]) {
    var zeroSum = 0;
    for(var r = 0;r < board[l][t].length;r++) {
      for(var f = 0;f < board[l][t][r].length;f++) {
        var piece = board[l][t][r][f];
        if(piece === 0) {
          zeroSum++;
        }
        else {
          if(zeroSum > 0) {
            res += '' + zeroSum;
            zeroSum = 0;
          }
          if(piece > 0) {
            res += String.fromCharCode(97 + piece);
          }
          else {
            res += String.fromCharCode(67 + Math.abs(piece));
          }
        }
      }
    }
  }
  else {
    res += 'B';
  }
  return md5(res);
}