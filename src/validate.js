const boardFuncs = require('@local/board');

exports.move = (board, action, move) => {
  var moves = boardFuncs.moves(board, action, false, false);
  for(var i = 0;i < moves.length;i++) {
    if(this.compareMove(moves[i],move) === 0) { return true; }
  }
  return false;
}

exports.action = (board, action, moves) => {
  var newBoard = boardFuncs.copy(board);
  for(var i = 0;i < moves.length;i++) {
    if(!this.move(newBoard, action, moves[i])) { return false; }
    boardFuncs.move(newBoard, moves[i]);
  }
  if(boardFuncs.present(newBoard, action).length > 0) {
    return false;
  }
  return true;
}

exports.notation = (notation) => {
  var regexRegular = notation.match(/^(\d+[bw]\.\s)\d+([\-\+]\d+)*:[BNRQK]*[a-h][1-8]((<([\-\+]\d+)*>)+\d*([\-\+]\d+)*)*:x*[BNRQ]*[a-h][1-8]/);
  var regexCastling = notation.match(/^(\d+[bw]\.\s)\d+([\-\+]\d+)*:0\-0(\-0)*/);
  if(regexRegular === null && regexCastling === null) { return false; }
  if(
    (regexRegular !== null && regexRegular.length <= 0) ||
    (regexCastling !== null && regexCastling.length <= 0)
  ) { return false; }
  return true;
}

exports.compareMove = (move1, move2) => {
  if(Array.isArray(move1)) {
    if(Array.isArray(move2)) {
      if(move1.length === move2.length) {
        for(var i = 0;i < move1.length;i++) {
          for(var j = 0;j < move1[i].length;j++) {
            if(move1[i].length !== move2[i].length) {
              return move1[i].length - move2[i].length;
            }
            if(move1[i][j] !== move2[i][j]) {
              if(move1[i][j] === undefined) {
                return -1;
              }
              if(move2[i][j] === undefined) {
                return 1;
              }
              return move1[i][j] - move2[i][j];
            }
          }
        }
      }
      else {
        return move1.length - move2.length;
      }
    }
    else {
      return -1;
    }
  }
  else {
    if(Array.isArray(move2)) {
      return 1;
    }
    else {
      return 0;
    }
  }
  return 0;
}