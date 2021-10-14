const boardFuncs = require('@local/board');

exports.move = (fillBoard, actionNum, move, moveGen = [], promotionPieces = null) => {

  moveGen = (moveGen.length <= 0) ? boardFuncs.moves(fillBoard, actionNum, false, false, false, promotionPieces) : moveGen;

  for (let i = 0; i < moveGen.length; i++) {
    if (this.compareMove(moveGen[i], move) == 0) return true;
  }

  return false;
}

exports.action = (fullBoard, actionNum, moves, variant = 'standard') => {
  const newBoard = boardFuncs.copy(fullBoard);

  for (const move of moves) {
    if (!this.move(newBoard, actionNum, move, variant)) return false;

    boardFuncs.move(newBoard, move);
  }

  if (boardFuncs.present(newBoard, actionNum).length > 0) return false;

  return true;
}

exports.notation = (notation) => {
  const regexRegular = notation.match(/^(\d+[bw]\.\s)\d+([\-\+]\d+)?:[PBNRQK]?[a-h][1-8]((<([\-\+]\d+)?>)+\d*([\-\+]\d+)?)?:x?[PBNRQ]?[a-h][1-8](e\.p\.)?[\=\+\#]?/);
  const regexCastling = notation.match(/^(\d+[bw]\.\s)\d+([\-\+]\d+)?:0\-0(\-0)?[\=\+\#]?/);

  if (regexRegular == null && regexCastling == null) return false;
  if (
    (regexRegular != null && regexRegular[0] != notation) ||
    (regexCastling != null && regexCastling[0] != notation)
  ) return false;

  return true;
}

exports.compareMove = (move1, move2) => {
  if (!Array.isArray(move1) && Array.isArray(move2)) return 1;
  if (!Array.isArray(move2)) return -1;

  if (move1.length != move2.length) return move1.length - move2.length;

  for (let i = 0; i < move1.length; i++) {
    for (let j = 0; j < move1[i].length; j++) {

      if (move1[i].length != move2[i].length) return move1[i].length - move2[i].length;

      if (move1[i][j] == move2[i][j]) continue;

      if (move1[i][j] == undefined) return -1;
      if (move2[i][j] == undefined) return 1;

      return move1[i][j] - move2[i][j];
    }
  }

  return 0;
}
