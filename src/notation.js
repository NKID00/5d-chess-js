const boardFuncs = require('@local/board');
const mateFuncs = require('@local/mate');
const pieceFuncs = require('@local/piece');

// TODO: un-hardcode 8
exports.sanCoord = (input) => {
  var res = {
    str: '',
    arr: [0,0]
  };
  if(typeof input === 'string') {
    res.str = input;
    res.arr[1] = input.charCodeAt(0) - 97;
    res.arr[0] = Number(input.charAt(1)) - 1;
  }
  else if(Array.isArray(input)) {
    res.str = String.fromCharCode(input[1] + 97) + (input[0] + 1);
    res.arr = input;
  }
  return res;
}

exports.moveNotation = (board, actionNum, input, minimize = false) => {
  //(Action #)(Color). [Turn #][+/- Line #]:(Piece)[Coord]<[+/- New Line #]>[Dest Turn #][Dest +/- Line #]:[Capture][Promotion Piece][Dest Coord][Check][En Passant]
  var res = {
    str: '',
    arr: [[0,0,0,0],[0,0,0,0]],
    action: actionNum
  };
  if(typeof input === 'string') {
    res.str = input;
    var tmp = input.slice();
    var tmpActionArr = tmp.match(/^\d+[bw]/);
    if(tmpActionArr && tmpActionArr.length > 0) {
      var tmpAction = tmpActionArr[0];
      res.action = (Number(tmpAction.substr(0,tmpAction.length - 1)) - 1) * 2 + (tmpAction.charAt(tmpAction.length - 1) === 'w' ? 0 : 1);
    }
    tmp = tmp.replace(/^\d+[bw]\.\s+/, '');
    var tmpSrcTurnArr = tmp.match(/^\d+/);
    if(tmpSrcTurnArr && tmpSrcTurnArr.length > 0) {
      var tmpSrcTurn = Number(tmpSrcTurnArr[0]);
      res.arr[0][1] = (tmpSrcTurn - 1) * 2 + (res.action % 2 === 0 ? 0 : 1);
      tmp = tmp.replace(/^\d+/, '');
    }
    var tmpSrcTimelineArr = tmp.match(/^[\-\+]\d+/);
    if(tmpSrcTimelineArr && tmpSrcTimelineArr.length > 0) {
      var tmpSrcTimeline = Number(tmpSrcTimelineArr[0]);
      res.arr[0][0] = Math.abs(tmpSrcTimeline) * 2 + (tmpSrcTimeline < 0 ? -1 : 0);
      tmp = tmp.replace(/^[\-\+]\d+/, '');
    }
    tmp = tmp.substr(1);
    if(!tmp.includes('0-0')) {
      tmp = tmp.replace(/^[A-Z]/, '');
      var tmpSrcCoord = this.sanCoord(tmp.substr(0,2));
      res.arr[0][2] = tmpSrcCoord.arr[0];
      res.arr[0][3] = tmpSrcCoord.arr[1];
      tmp = tmp.substr(2);
      if(tmp.charAt(0) === '<') {
        tmp = tmp.replace(/^\<[\-\+]*\d*\>/, '');
        var tmpDestTurnArr = tmp.match(/^\d+/);
        if(tmpDestTurnArr && tmpDestTurnArr.length > 0) {
          var tmpDestTurn = Number(tmpDestTurnArr[0]);
          res.arr[1][1] = (tmpDestTurn - 1) * 2 + (res.action % 2 === 0 ? 0 : 1);
          tmp = tmp.replace(/^\d+/, '');
        }
        else {
          res.arr[1][1] = res.arr[0][1];
        }
        var tmpDestTimelineArr = tmp.match(/^[\-\+]\d+/);
        if(tmpDestTimelineArr && tmpDestTimelineArr.length > 0) {
          var tmpDestTimeline = Number(tmpDestTimelineArr[0]);
          res.arr[1][0] = Math.abs(tmpDestTimeline) * 2 + (tmpDestTimeline < 0 ? -1 : 0);
          tmp = tmp.replace(/^[\-\+]\d+/, '');
        }
        else {
          res.arr[1][0] = res.arr[0][0];
        }
      }
      else {
        res.arr[1][0] = res.arr[0][0];
        res.arr[1][1] = res.arr[0][1];
      }
      tmp = tmp.substr(1);
      tmp = tmp.replace(/^x*/, '');
      var tmpDestPieceArr = tmp.match(/^[A-Z]*/);
      if(tmpDestPieceArr && tmpDestPieceArr.length > 0) {
        var tmpDestPiece = tmpDestPieceArr[0];
        if(tmpDestPiece === 'B') {
          res.arr[1][4] = (res.action % 2 === 0 ? 4 : 3);
        }
        if(tmpDestPiece === 'N') {
          res.arr[1][4] = (res.action % 2 === 0 ? 6 : 5);
        }
        if(tmpDestPiece === 'R') {
          res.arr[1][4] = (res.action % 2 === 0 ? 8 : 7);
        }
        if(tmpDestPiece === 'Q') {
          res.arr[1][4] = (res.action % 2 === 0 ? 10 : 9);
        }
        if(tmpDestPiece === 'K') {
          res.arr[1][4] = (res.action % 2 === 0 ? 12 : 11);
        }
        if(tmpDestPiece === 'P') {
          res.arr[1][4] = (res.action % 2 === 0 ? 14 : 13);
        }
        tmp = tmp.replace(/^[A-Z]*/, '');
      }
      var tmpDestCoord = this.sanCoord(tmp.substr(0,2));
      res.arr[1][2] = tmpDestCoord.arr[0];
      res.arr[1][3] = tmpDestCoord.arr[1];
      tmp = tmp.substr(2);
      if(tmp.includes('e.p.')) {
        res.arr[2] = [];
        res.arr[2][0] = res.arr[0][0];
        res.arr[2][1] = res.arr[0][1];
        res.arr[2][2] = res.arr[0][2];
        res.arr[2][3] = res.arr[1][3];
      }
    }
    else {
      res.arr[2] = [];
      res.arr[3] = [];
      res.arr[1][0] = res.arr[0][0];
      res.arr[2][0] = res.arr[0][0];
      res.arr[3][0] = res.arr[0][0];
      res.arr[1][1] = res.arr[0][1];
      res.arr[2][1] = res.arr[0][1];
      res.arr[3][1] = res.arr[0][1];
      res.arr[0][3] = 4;
      if(res.action % 2 !== 0) {
        res.arr[0][2] = 7;
        res.arr[1][2] = res.arr[0][2];
        res.arr[2][2] = res.arr[0][2];
        res.arr[3][2] = res.arr[0][2];
      }
      else {
        res.arr[0][2] = 0;
        res.arr[1][2] = res.arr[0][2];
        res.arr[2][2] = res.arr[0][2];
        res.arr[3][2] = res.arr[0][2];
      }
      if(tmp.includes('0-0-0')) {
        res.arr[1][3] = 2;
        res.arr[2][3] = 0;
        res.arr[3][3] = 3;
      }
      else {
        res.arr[1][3] = 6;
        res.arr[2][3] = 7;
        res.arr[3][3] = 5;
      }
    }
  }
  else if(Array.isArray(input)) {
    res.arr = [input[0].slice(),input[1].slice()];
    if(input[2]) {
      res.arr[2] = input[2].slice();
    }
    if(input[3]) {
      res.arr[3] = input[3].slice();
    }
    res.str += Math.ceil((res.action+1)/2) + (res.action % 2 === 0 ? 'w' : 'b');
    res.str += '. ';
    res.str += Math.ceil((input[0][1]+1)/2);
    if(input[0][0] !== 0) {
      if(input[0][0] % 2 === 0) {
        res.str += '+' + Math.ceil(input[0][0]/2);
      }
      else {
        res.str += '-' + Math.ceil(input[0][0]/2);
      }
    }
    res.str += ':';
    if(input.length === 2 || input.length === 3) {
      if(boardFuncs.positionExists(board, input[0])) {
        var piece = board[input[0][0]][input[0][1]][input[0][2]][input[0][3]];
        res.str += pieceFuncs.toChar(piece);
        res.str += this.sanCoord([input[0][2],input[0][3]]).str;
        if(
          ((input[0][1] === input[1][1] && !minimize) || input[0][1] !== input[1][1]) ||
          ((input[0][0] === input[1][0] && !minimize) || input[0][0] !== input[1][0])
        ) {
          res.str += '<';
          var maxTimeline = 0;
          for(var i = 0;i < board.length;i++) {
            if(board[i] !== undefined && i % 2 === res.action % 2) { maxTimeline = i; }
          }
          var moddedBoard = boardFuncs.copy(board);
          boardFuncs.move(moddedBoard, input);
          var newMaxTimeline = 0;
          for(var i = 0;i < moddedBoard.length;i++) {
            if(moddedBoard[i] !== undefined && i % 2 === res.action % 2) { newMaxTimeline = i; }
          }
          if(maxTimeline !== newMaxTimeline) {
            if(newMaxTimeline % 2 === 0) {
              res.str += '+' + Math.ceil(newMaxTimeline/2);
            }
            else {
              res.str += '-' + Math.ceil(newMaxTimeline/2);
            }
          }
          res.str += '>';
        }
        if((input[0][1] === input[1][1] && !minimize) || input[0][1] !== input[1][1]) {
          res.str += Math.ceil((input[1][1]+1)/2);
        }
        if((input[0][0] === input[1][0] && !minimize) || input[0][0] !== input[1][0]) {
          if(input[1][0] !== 0) {
            if(input[1][0] % 2 === 0) {
              res.str += '+' + Math.ceil(input[1][0]/2);
            }
            else {
              res.str += '-' + Math.ceil(input[1][0]/2);
            }
          }
          else if(input[0][0] !== input[1][0]) {
            res.str += '+0';
          }
        }
        res.str += ':';
        var destPiece = board[input[1][0]][input[1][1]][input[1][2]][input[1][3]];
        if((destPiece !== 0 && Math.abs(piece) % 2 !== Math.abs(destPiece) % 2) || input.length === 3) {
          res.str += 'x';
        }
        if(input[1][4] !== undefined) {
          var srcPiece = board[input[0][0]][input[0][1]][input[0][2]][input[0][3]];
          if(Math.abs(srcPiece) === 1 || Math.abs(srcPiece) === 2) {
            res.str += pieceFuncs.toChar(input[1][4]);
          }
        }
        res.str += this.sanCoord([input[1][2],input[1][3]]).str;
        if(input.length === 3) {
          res.str += 'e.p.';
        }
        if(mateFuncs.stalemate(moddedBoard, res.action + 1)) {
          res.str += '=';
        }
        else if(mateFuncs.checkmate(moddedBoard, res.action + 1)) {
          res.str += '#';
        }
        else if(mateFuncs.checks(moddedBoard, res.action + 1).length > 0) {
          res.str += '+';
        }
      }
    }
    else if(input.length === 4) {
      res.str += '0-0';
      if(input[1][3] === 2) {
        res.str += '-0';
      }
    }
  }
  return res;
}
