const boardFuncs = require('@local/board');

exports.toChar = (piece, displayPawn = false) => {
  const absPiece = Math.abs(piece);

  if (displayPawn && (Math.abs(absPiece) === 1 || Math.abs(absPiece) === 2)) return 'P';

  switch (absPiece) {
    case 3:
    case 4:
      return 'B';
    case 5:
    case 6:
      return 'N';
    case 7:
    case 8:
      return 'R';
    case 9:
    case 10:
      return 'Q';
    case 11:
    case 12:
      return 'K';
    case 13:
    case 14:
      return 'S';
    case 15:
    case 16:
      return 'W';
    case 17:
    case 18:
      return 'C';
    case 19:
    case 20:
      return 'Y';
    case 21:
    case 22:
      return 'U';
    case 23:
    case 24:
      return 'D';
    default:
      return ''
  }
}

exports.fromChar = (char, actionNum = 0) => {
  switch (char) {
    case 'P':
      return actionNum % 2 === 0 ? 2 : 1;
    case 'B':
      return actionNum % 2 === 0 ? 4 : 3;
    case 'N':
      return actionNum % 2 === 0 ? 6 : 5;
    case 'R':
      return actionNum % 2 === 0 ? 8 : 7;
    case 'Q':
      return actionNum % 2 === 0 ? 10 : 9;
    case 'K':
      return actionNum % 2 === 0 ? 12 : 11;
    case 'S':
      return actionNum % 2 === 0 ? 14 : 13;
    case 'W':
    case 'BR':
      return actionNum % 2 === 0 ? 16 : 15;
    case 'C':
    case 'CK':
      return actionNum % 2 === 0 ? 18 : 17;
    case 'Y':
    case 'RQ':
      return actionNum % 2 === 0 ? 20 : 19;
    case 'U':
      return actionNum % 2 === 0 ? 22 : 21;
    case 'D':
      return actionNum % 2 === 0 ? 24 : 23;
    default:
      return actionNum % 2 === 0 ? 2 : 1;
  }
}

exports.movePos = (piece) => {
  const absPiece = Math.abs(piece);

  switch (absPiece) {
    case 5:
    case 6:
      return [
        [0, 0, 1, 2],
        [0, 0, 1, -2],
        [0, 0, -1, 2],
        [0, 0, -1, -2],
        [0, 0, 2, 1],
        [0, 0, 2, -1],
        [0, 0, -2, 1],
        [0, 0, -2, -1],

        [0, 1, 0, 2],
        [0, 1, 0, -2],
        [0, -1, 0, 2],
        [0, -1, 0, -2],
        [0, 2, 0, 1],
        [0, 2, 0, -1],
        [0, -2, 0, 1],
        [0, -2, 0, -1],

        [0, 1, 2, 0],
        [0, 1, -2, 0],
        [0, -1, 2, 0],
        [0, -1, -2, 0],
        [0, 2, 1, 0],
        [0, 2, -1, 0],
        [0, -2, 1, 0],
        [0, -2, -1, 0],

        [1, 0, 0, 2],
        [1, 0, 0, -2],
        [-1, 0, 0, 2],
        [-1, 0, 0, -2],
        [2, 0, 0, 1],
        [2, 0, 0, -1],
        [-2, 0, 0, 1],
        [-2, 0, 0, -1],

        [1, 0, 2, 0],
        [1, 0, -2, 0],
        [-1, 0, 2, 0],
        [-1, 0, -2, 0],
        [2, 0, 1, 0],
        [2, 0, -1, 0],
        [-2, 0, 1, 0],
        [-2, 0, -1, 0],

        [1, 2, 0, 0],
        [1, -2, 0, 0],
        [-1, 2, 0, 0],
        [-1, -2, 0, 0],
        [2, 1, 0, 0],
        [2, -1, 0, 0],
        [-2, 1, 0, 0],
        [-2, -1, 0, 0]
      ];
    case 11:
    case 12:
    case 17:
    case 18:
      return [
        [0, 0, 0, 1],
        [0, 0, 0, -1],

        [0, 0, 1, 0],
        [0, 0, -1, 0],

        [0, 0, 1, 1],
        [0, 0, 1, -1],
        [0, 0, -1, 1],
        [0, 0, -1, -1],

        [0, 1, 0, 0],
        [0, -1, 0, 0],

        [0, 1, 0, 1],
        [0, 1, 0, -1],
        [0, -1, 0, 1],
        [0, -1, 0, -1],

        [0, 1, 1, 0],
        [0, 1, -1, 0],
        [0, -1, 1, 0],
        [0, -1, -1, 0],

        [0, 1, 1, 1],
        [0, 1, 1, -1],
        [0, 1, -1, 1],
        [0, 1, -1, -1],
        [0, -1, 1, 1],
        [0, -1, 1, -1],
        [0, -1, -1, 1],
        [0, -1, -1, -1],

        [1, 0, 0, 0],
        [-1, 0, 0, 0],

        [1, 0, 0, 1],
        [1, 0, 0, -1],
        [-1, 0, 0, 1],
        [-1, 0, 0, -1],

        [1, 0, 1, 0],
        [1, 0, -1, 0],
        [-1, 0, 1, 0],
        [-1, 0, -1, 0],

        [1, 0, 1, 1],
        [1, 0, 1, -1],
        [1, 0, -1, 1],
        [1, 0, -1, -1],
        [-1, 0, 1, 1],
        [-1, 0, 1, -1],
        [-1, 0, -1, 1],
        [-1, 0, -1, -1],

        [1, 1, 0, 0],
        [1, -1, 0, 0],
        [-1, 1, 0, 0],
        [-1, -1, 0, 0],

        [1, 1, 0, 1],
        [1, 1, 0, -1],
        [1, -1, 0, 1],
        [1, -1, 0, -1],
        [-1, 1, 0, 1],
        [-1, 1, 0, -1],
        [-1, -1, 0, 1],
        [-1, -1, 0, -1],

        [1, 1, 1, 0],
        [1, 1, -1, 0],
        [1, -1, 1, 0],
        [1, -1, -1, 0],
        [-1, 1, 1, 0],
        [-1, 1, -1, 0],
        [-1, -1, 1, 0],
        [-1, -1, -1, 0],

        [1, 1, 1, 1],
        [1, 1, 1, -1],
        [1, 1, -1, 1],
        [1, 1, -1, -1],
        [1, -1, 1, 1],
        [1, -1, 1, -1],
        [1, -1, -1, 1],
        [1, -1, -1, -1],
        [-1, 1, 1, 1],
        [-1, 1, 1, -1],
        [-1, 1, -1, 1],
        [-1, 1, -1, -1],
        [-1, -1, 1, 1],
        [-1, -1, 1, -1],
        [-1, -1, -1, 1],
        [-1, -1, -1, -1]
      ];
    default:
      return [];
  }
}

exports.moveVecs = (piece) => {
  const absPiece = Math.abs(piece);
  switch (absPiece) {
    case 3:
    case 4:
      return [
        [0, 0, 1, 1],
        [0, 0, 1, -1],
        [0, 0, -1, 1],
        [0, 0, -1, -1],

        [0, 1, 0, 1],
        [0, 1, 0, -1],
        [0, -1, 0, 1],
        [0, -1, 0, -1],

        [0, 1, 1, 0],
        [0, 1, -1, 0],
        [0, -1, 1, 0],
        [0, -1, -1, 0],

        [1, 0, 0, 1],
        [1, 0, 0, -1],
        [-1, 0, 0, 1],
        [-1, 0, 0, -1],

        [1, 0, 1, 0],
        [1, 0, -1, 0],
        [-1, 0, 1, 0],
        [-1, 0, -1, 0],

        [1, 1, 0, 0],
        [1, -1, 0, 0],
        [-1, 1, 0, 0],
        [-1, -1, 0, 0]
      ];
    case 7:
    case 8:
      return [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, -1],
        [0, 0, -1, 0],
        [0, -1, 0, 0],
        [-1, 0, 0, 0]
      ];
    case 9:
    case 10:
    case 19:
    case 20:
      return [
        [0, 0, 0, 1],
        [0, 0, 0, -1],

        [0, 0, 1, 0],
        [0, 0, -1, 0],

        [0, 0, 1, 1],
        [0, 0, 1, -1],
        [0, 0, -1, 1],
        [0, 0, -1, -1],

        [0, 1, 0, 0],
        [0, -1, 0, 0],

        [0, 1, 0, 1],
        [0, 1, 0, -1],
        [0, -1, 0, 1],
        [0, -1, 0, -1],

        [0, 1, 1, 0],
        [0, 1, -1, 0],
        [0, -1, 1, 0],
        [0, -1, -1, 0],

        [0, 1, 1, 1],
        [0, 1, 1, -1],
        [0, 1, -1, 1],
        [0, 1, -1, -1],
        [0, -1, 1, 1],
        [0, -1, 1, -1],
        [0, -1, -1, 1],
        [0, -1, -1, -1],

        [1, 0, 0, 0],
        [-1, 0, 0, 0],

        [1, 0, 0, 1],
        [1, 0, 0, -1],
        [-1, 0, 0, 1],
        [-1, 0, 0, -1],

        [1, 0, 1, 0],
        [1, 0, -1, 0],
        [-1, 0, 1, 0],
        [-1, 0, -1, 0],

        [1, 0, 1, 1],
        [1, 0, 1, -1],
        [1, 0, -1, 1],
        [1, 0, -1, -1],
        [-1, 0, 1, 1],
        [-1, 0, 1, -1],
        [-1, 0, -1, 1],
        [-1, 0, -1, -1],

        [1, 1, 0, 0],
        [1, -1, 0, 0],
        [-1, 1, 0, 0],
        [-1, -1, 0, 0],

        [1, 1, 0, 1],
        [1, 1, 0, -1],
        [1, -1, 0, 1],
        [1, -1, 0, -1],
        [-1, 1, 0, 1],
        [-1, 1, 0, -1],
        [-1, -1, 0, 1],
        [-1, -1, 0, -1],

        [1, 1, 1, 0],
        [1, 1, -1, 0],
        [1, -1, 1, 0],
        [1, -1, -1, 0],
        [-1, 1, 1, 0],
        [-1, 1, -1, 0],
        [-1, -1, 1, 0],
        [-1, -1, -1, 0],

        [1, 1, 1, 1],
        [1, 1, 1, -1],
        [1, 1, -1, 1],
        [1, 1, -1, -1],
        [1, -1, 1, 1],
        [1, -1, 1, -1],
        [1, -1, -1, 1],
        [1, -1, -1, -1],
        [-1, 1, 1, 1],
        [-1, 1, 1, -1],
        [-1, 1, -1, 1],
        [-1, 1, -1, -1],
        [-1, -1, 1, 1],
        [-1, -1, 1, -1],
        [-1, -1, -1, 1],
        [-1, -1, -1, -1]
      ];
    case 13:
    case 14:
      return [
        [0, 0, 0, 1],
        [0, 0, 0, -1],

        [0, 0, 1, 0],
        [0, 0, -1, 0],

        [0, 0, 1, 1],
        [0, 0, 1, -1],
        [0, 0, -1, 1],
        [0, 0, -1, -1],

        [0, 1, 0, 0],
        [0, -1, 0, 0],

        [0, 1, 0, 1],
        [0, 1, 0, -1],
        [0, -1, 0, 1],
        [0, -1, 0, -1],

        [0, 1, 1, 0],
        [0, 1, -1, 0],
        [0, -1, 1, 0],
        [0, -1, -1, 0],

        [1, 0, 0, 0],
        [-1, 0, 0, 0],

        [1, 0, 0, 1],
        [1, 0, 0, -1],
        [-1, 0, 0, 1],
        [-1, 0, 0, -1],

        [1, 0, 1, 0],
        [1, 0, -1, 0],
        [-1, 0, 1, 0],
        [-1, 0, -1, 0],

        [1, 1, 0, 0],
        [1, -1, 0, 0],
        [-1, 1, 0, 0],
        [-1, -1, 0, 0]
      ];
    case 21:
    case 22:
      return [
        [0, 1, 1, 1],
        [0, 1, 1, -1],
        [0, 1, -1, 1],
        [0, 1, -1, -1],
        [0, -1, 1, 1],
        [0, -1, 1, -1],
        [0, -1, -1, 1],
        [0, -1, -1, -1],

        [1, 0, 1, 1],
        [1, 0, 1, -1],
        [1, 0, -1, 1],
        [1, 0, -1, -1],
        [-1, 0, 1, 1],
        [-1, 0, 1, -1],
        [-1, 0, -1, 1],
        [-1, 0, -1, -1],

        [1, 1, 0, 1],
        [1, 1, 0, -1],
        [1, -1, 0, 1],
        [1, -1, 0, -1],
        [-1, 1, 0, 1],
        [-1, 1, 0, -1],
        [-1, -1, 0, 1],
        [-1, -1, 0, -1],

        [1, 1, 1, 0],
        [1, 1, -1, 0],
        [1, -1, 1, 0],
        [1, -1, -1, 0],
        [-1, 1, 1, 0],
        [-1, 1, -1, 0],
        [-1, -1, 1, 0],
        [-1, -1, -1, 0],
      ];
    case 23:
    case 24:
      return [
        [1, 1, 1, 1],
        [1, 1, 1, -1],
        [1, 1, -1, 1],
        [1, 1, -1, -1],
        [1, -1, 1, 1],
        [1, -1, 1, -1],
        [1, -1, -1, 1],
        [1, -1, -1, -1],
        [-1, 1, 1, 1],
        [-1, 1, 1, -1],
        [-1, 1, -1, 1],
        [-1, 1, -1, -1],
        [-1, -1, 1, 1],
        [-1, -1, 1, -1],
        [-1, -1, -1, 1],
        [-1, -1, -1, -1]
      ];
    default:
      return [];
  }
}

exports.availablePromotionPieces = (board) => {
  let res = [];
  for (let l = 0; board && l < board.length; l++) {
    for (let t = 0; board[l] && t < board[l].length; t++) {
      for (let r = 0; board[l][t] && r < board[l][t].length; r++) {
        for (let f = 0; board[l][t][r] && f < board[l][t][r].length; f++) {
          let piece = Math.abs(board[l][t][r][f]);
          if (!res.includes(piece)) {
            if (
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
  let res = 0;

  if (sourceTimelineIndex % 2 === 0) {
    res = sourceTimelineIndex + (timelineMoveVector * 2);
  }
  else {
    res = sourceTimelineIndex - (timelineMoveVector * 2);
  }

  res = (!isEvenTimeline && res < 0) ? (res * -1) - 1 : res;

  res = (isEvenTimeline && res <= 0) ? (res * -1) + 1 : res;

  return res;
}

exports.moves = (board, givenPiece, spatialOnly = false, promotionPieces = null, skipCastling = false) => {
  let res = [];
  const isEvenTimeline = boardFuncs.isEvenTimeline(board);

  // check if board at current position exists
  if (boardFuncs.positionExists(board, givenPiece)) {
    const piece = board[givenPiece[0]][givenPiece[1]][givenPiece[2]][givenPiece[3]];
    if (Math.abs(piece) === 0) return [];
    //Single square moves
    const movePos = this.movePos(piece);
    // go through each movement option for the given piece
    movePos.forEach(move => {
      // check if we are moving in time or across dimensions when we shouldn't be
      if (spatialOnly && (move[0] !== 0 || move[1] !== 0)) return;

      let currMove = [givenPiece.slice(), givenPiece.slice()];

      //
      currMove[1][0] = this.timelineMove(currMove[1][0], move[0], isEvenTimeline);
      currMove[1][1] += move[1] * 2;
      currMove[1][2] += move[2];
      currMove[1][3] += move[3];

      if (!boardFuncs.positionExists(board, currMove[1])) return

      const destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];

      if (destPiece === 0 || (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) res.push(currMove);

    });

    //Vector moves
    const moveVecs = this.moveVecs(piece);

    moveVecs.forEach(move => {
      if (spatialOnly && (move[0] !== 0 || move[1] !== 0)) return;

      let currMove = [givenPiece.slice(), givenPiece.slice()];
      let blocking = false;

      while (!blocking) {
        currMove[1][0] = this.timelineMove(currMove[1][0], move[0], isEvenTimeline);
        currMove[1][1] += move[1] * 2;
        currMove[1][2] += move[2];
        currMove[1][3] += move[3];
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece === 0 || (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
            if (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2 && destPiece !== 0) blocking = true;
          }
          else blocking = true;
        }
        else blocking = true;
      }
    });

    //Black pawn/brawn moves
    if (Math.abs(piece) === 1 || Math.abs(piece) === 15) {
      //Black forward single square RF movement
      let currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]--;
      if (boardFuncs.positionExists(board, currMove[1])) {
        const destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        const condition = (destPiece === 0)
        res = this.pendingName(condition, currMove, promotionPieces, board, piece, res);
      }
      //Black forward single square capture RF movement
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]--;
      currMove[1][3]++;
      if (boardFuncs.positionExists(board, currMove[1])) {
        const destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        const condition = (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2))
        res = this.pendingName(condition, currMove, promotionPieces, board, piece, res);
      }
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]--;
      currMove[1][3]--;
      if (boardFuncs.positionExists(board, currMove[1])) {
        const destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        const condition = (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2))
        res = this.pendingName(condition, currMove, promotionPieces, board, piece, res);
      }
      //Black forward en passant capture RF movement
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]--;
      currMove[1][3]++;

      res = this.tempNamePassant(board, currMove, res);

      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]--;
      currMove[1][3]--;

      res = this.tempNamePassant(board, currMove, res);

      //Black forward double square RF movement
      if (piece === -1 || piece === -15) {

        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][2] -= 2;

        if (boardFuncs.positionExists(board, currMove[1])) {

          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] + 1][currMove[1][3]];
            const condition = (destPiece === 0)
            res = this.pendingName(condition, currMove, promotionPieces, board, piece, res)
          }
        }
      }
      if (!spatialOnly) {
        //Black forward single square LT movement
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], 1, isEvenTimeline);
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          const condition = (destPiece === 0)
          res = this.pendingName(condition, currMove, promotionPieces, board, piece, res)
        }
        //Black forward single square capture LT movement
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], 1, isEvenTimeline);
        currMove[1][1] += 2;
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], 1, isEvenTimeline);
        currMove[1][1] -= 2;
        let destPiece
        if (boardFuncs.positionExists(board, currMove[1])) {
          destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        //Black en passant capture LT movement
        else if (destPiece === 0) {
          currMove[2] = currMove[1].slice();
          currMove[2][0] = this.timelineMove(currMove[2][0], 1, isEvenTimeline);
          currMove[2][1]--;
          if (boardFuncs.positionExists(board, currMove[2])) {
            destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
            if (destPiece === -2 || destPiece === -16) {
              currMove[2][0] = this.timelineMove(currMove[2][0], -2, isEvenTimeline);
              if (boardFuncs.positionExists(board, currMove[2])) {
                destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                if (destPiece === 0) {
                  currMove[2][1]++;
                  if (boardFuncs.positionExists(board, currMove[2])) {
                    destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                    if (destPiece === 2 || destPiece === 16) {
                      currMove[2] = currMove[0].slice();
                      res.push([currMove[0].slice(), currMove[1].slice(), currMove[2].slice()]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //White pawn/brawn moves
    if (Math.abs(piece) === 2 || Math.abs(piece) === 16) {
      //White forward single square RF movement
      let currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]++;
      if (boardFuncs.positionExists(board, currMove[1])) {
        let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if (destPiece === 0) {
          if (currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if (!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for (let i = 0; i < promotionPieces.length; i++) {
              if (promotionPieces[i] % 2 === Math.abs(piece) % 2) {
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
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]++;
      currMove[1][3]++;
      if (boardFuncs.positionExists(board, currMove[1])) {
        let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if (currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if (!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for (let i = 0; i < promotionPieces.length; i++) {
              if (promotionPieces[i] % 2 === Math.abs(piece) % 2) {
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
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]++;
      currMove[1][3]--;
      if (boardFuncs.positionExists(board, currMove[1])) {
        let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
        if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
          if (currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
            if (!promotionPieces || promotionPieces.length <= 0) {
              promotionPieces = this.availablePromotionPieces(board);
            }
            for (let i = 0; i < promotionPieces.length; i++) {
              if (promotionPieces[i] % 2 === Math.abs(piece) % 2) {
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
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]++;
      currMove[1][3]++;
      if (boardFuncs.positionExists(board, [
        currMove[1][0],
        currMove[1][1],
        currMove[1][2] - 1,
        currMove[1][3]
      ])) {
        let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] - 1][currMove[1][3]];
        if (destPiece === 1 || destPiece === 15) {
          if (boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1] - 2,
            currMove[1][2] + 1,
            currMove[1][3]
          ])) {
            let destPiece = board[currMove[1][0]][currMove[1][1] - 2][currMove[1][2] + 1][currMove[1][3]];
            if (destPiece === -1 || destPiece === -15) {
              res.push([currMove[0].slice(), currMove[1].slice(), [
                currMove[1][0],
                currMove[1][1],
                currMove[1][2] - 1,
                currMove[1][3]
              ]]);
            }
          }
        }
      }
      currMove = [givenPiece.slice(), givenPiece.slice()];
      currMove[1][2]++;
      currMove[1][3]--;
      if (boardFuncs.positionExists(board, [
        currMove[1][0],
        currMove[1][1],
        currMove[1][2] - 1,
        currMove[1][3]
      ])) {
        let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] - 1][currMove[1][3]];
        if (destPiece === 1 || destPiece === 15) {
          if (boardFuncs.positionExists(board, [
            currMove[1][0],
            currMove[1][1] - 2,
            currMove[1][2] + 1,
            currMove[1][3]
          ])) {
            let destPiece = board[currMove[1][0]][currMove[1][1] - 2][currMove[1][2] + 1][currMove[1][3]];
            if (destPiece === -1 || destPiece === -15) {
              res.push([currMove[0].slice(), currMove[1].slice(), [
                currMove[1][0],
                currMove[1][1],
                currMove[1][2] - 1,
                currMove[1][3]
              ]]);
            }
          }
        }
      }
      //White forward double square RF movement
      if (piece === -2 || piece === -16) {
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][2] += 2;
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece === 0) {
            destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] - 1][currMove[1][3]];
            if (destPiece === 0) {
              if (currMove[1][2] === (board[currMove[0][0]][currMove[0][1]].length - 1)) {
                if (!promotionPieces || promotionPieces.length <= 0) {
                  promotionPieces = this.availablePromotionPieces(board);
                }
                for (let i = 0; i < promotionPieces.length; i++) {
                  if (promotionPieces[i] % 2 === Math.abs(piece) % 2) {
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
      if (!spatialOnly) {
        //White forward single square LT movement
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], -1, isEvenTimeline);
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          const condition = (destPiece === 0)
          res = this.pendingName(condition, currMove, promotionPieces, board, piece, res)
        }
        //White forward single square capture LT movement
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], -1, isEvenTimeline);
        currMove[1][1] += 2;
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        currMove = [givenPiece.slice(), givenPiece.slice()];
        currMove[1][0] = this.timelineMove(currMove[1][0], -1, isEvenTimeline);
        currMove[1][1] -= 2;
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
          //White en passant capture LT movement
          else if (destPiece === 0) {
            currMove[2] = currMove[1].slice();
            currMove[2][0] = this.timelineMove(currMove[2][0], -1, isEvenTimeline);
            currMove[2][1]--;
            if (boardFuncs.positionExists(board, currMove[2])) {
              destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
              if (destPiece === -1 || destPiece === -15) {
                currMove[2][0] = this.timelineMove(currMove[2][0], 2, isEvenTimeline);
                if (boardFuncs.positionExists(board, currMove[2])) {
                  destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                  if (destPiece === 0) {
                    currMove[2][1]++;
                    if (boardFuncs.positionExists(board, currMove[2])) {
                      destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                      if (destPiece === 1 || destPiece === 15) {
                        currMove[2] = currMove[0].slice();
                        res.push([currMove[0].slice(), currMove[1].slice(), currMove[2].slice()]);
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
    // Brawn-specific captures
    if (Math.abs(piece) === 15 || Math.abs(piece) === 16) {
      let promotionRank = Math.abs(piece) % 2 === 0 ? board[givenPiece[0]][givenPiece[1]].length - 1 : 0;
      let forward = Math.abs(piece) % 2 === 0 ? 1 : -1;
      // ⟨l, t, y, x⟩
      let cardinalities = [
        [-forward, 0, 0, 1],
        [-forward, 0, 0, -1],
        [-forward, 0, forward, 0],
        [0, -1, forward, 0],
      ];

      for (let [dl, dt, dy, dx] of cardinalities) {
        if (givenPiece[0] % 2 === 0) {
          // White's timelines
          currMove = [givenPiece.slice(), [
            givenPiece[0],
            givenPiece[1] + 2 * dt,
            givenPiece[2] + dy,
            givenPiece[3] + dx
          ]];
          currMove[1][0] = this.timelineMove(currMove[1][0], dl, isEvenTimeline);
        } else {
          // Black's timelines
          currMove = [givenPiece.slice(), [
            givenPiece[0],
            givenPiece[1] + 2 * dt,
            givenPiece[2] + dy,
            givenPiece[3] + dx
          ]];
          currMove[1][0] = this.timelineMove(currMove[1][0], dl, isEvenTimeline);
        }

        // Verify the capture and yield the move
        if (boardFuncs.positionExists(board, currMove[1])) {
          let destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];
          if (destPiece !== 0 && (Math.abs(destPiece) % 2 !== Math.abs(piece) % 2)) {

            if (currMove[1][2] === promotionRank) {
              // Must promote
              if (!promotionPieces || promotionPieces.length <= 0) {
                promotionPieces = this.availablePromotionPieces(board);
              }
              for (let i = 0; i < promotionPieces.length; i++) {
                if (promotionPieces[i] % 2 === Math.abs(piece) % 2) {
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
    if ((piece === -11 || piece === -12) && !skipCastling) {
      //Queenside Castling Movement
      if (!boardFuncs.positionIsAttacked(board, givenPiece, Math.abs(piece) % 2, true)) {
        let leftOnePos = [
          givenPiece[0],
          givenPiece[1],
          givenPiece[2],
          givenPiece[3] - 1,
        ];
        if (
          boardFuncs.positionExists(board, leftOnePos) &&
          board[leftOnePos[0]][leftOnePos[1]][leftOnePos[2]][leftOnePos[3]] === 0 &&
          !boardFuncs.positionIsAttacked(board, leftOnePos, Math.abs(piece) % 2, true)
        ) {
          let leftTwoPos = [
            givenPiece[0],
            givenPiece[1],
            givenPiece[2],
            givenPiece[3] - 2,
          ];
          if (
            boardFuncs.positionExists(board, leftTwoPos) &&
            board[leftTwoPos[0]][leftTwoPos[1]][leftTwoPos[2]][leftTwoPos[3]] === 0 &&
            !boardFuncs.positionIsAttacked(board, leftTwoPos, Math.abs(piece) % 2, true)
          ) {
            //Search left for rook
            let done = false;
            let currPos = leftTwoPos.slice();
            currPos[3]--;
            while (!done) {
              if (boardFuncs.positionExists(board, currPos)) {
                let currPiece = board[currPos[0]][currPos[1]][currPos[2]][currPos[3]];
                if (currPiece === -7 || currPiece === -8) {
                  if (Math.abs(piece) % 2 === Math.abs(currPiece) % 2) {
                    res.push([
                      givenPiece.slice(),
                      leftTwoPos.slice(),
                      currPos.slice(),
                      leftOnePos.slice()
                    ]);
                  }
                }
                else if (currPiece !== 0) {
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
      if (!boardFuncs.positionIsAttacked(board, givenPiece, Math.abs(piece) % 2, true)) {
        let rightOnePos = [
          givenPiece[0],
          givenPiece[1],
          givenPiece[2],
          givenPiece[3] + 1,
        ];
        if (
          boardFuncs.positionExists(board, rightOnePos) &&
          board[rightOnePos[0]][rightOnePos[1]][rightOnePos[2]][rightOnePos[3]] === 0 &&
          !boardFuncs.positionIsAttacked(board, rightOnePos, Math.abs(piece) % 2, true)
        ) {
          let rightTwoPos = [
            givenPiece[0],
            givenPiece[1],
            givenPiece[2],
            givenPiece[3] + 2,
          ];
          if (
            boardFuncs.positionExists(board, rightTwoPos) &&
            board[rightTwoPos[0]][rightTwoPos[1]][rightTwoPos[2]][rightTwoPos[3]] === 0 &&
            !boardFuncs.positionIsAttacked(board, rightTwoPos, Math.abs(piece) % 2, true)
          ) {
            //Search right for rook
            let done = false;
            let currPos = rightTwoPos.slice();
            currPos[3]++;
            while (!done) {
              if (boardFuncs.positionExists(board, currPos)) {
                let currPiece = board[currPos[0]][currPos[1]][currPos[2]][currPos[3]];
                if (currPiece === -7 || currPiece === -8) {
                  if (Math.abs(piece) % 2 === Math.abs(currPiece) % 2) {
                    res.push([
                      givenPiece.slice(),
                      rightTwoPos.slice(),
                      currPos.slice(),
                      rightOnePos.slice()
                    ]);
                  }
                }
                else if (currPiece !== 0) {
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
exports.pendingName = (condition, currMove, promotionPieces, board, piece, res) => {
  if (!condition) return res;
  if (currMove[1][2] === 0) {

    promotionPieces = (!promotionPieces || promotionPieces.length <= 0) ? this.availablePromotionPieces(board) : promotionPieces;

    promotionPieces.forEach(pieces => {
      if (pieces % 2 !== Math.abs(piece) % 2)
        return;

      currMove[1][4] = pieces;
      res.push([currMove[0].slice(), currMove[1].slice()]);
    });
  }
  else
    res.push([currMove[0].slice(), currMove[1].slice()]);
  return res;
}

exports.tempNamePassant = (board, currMove, res) => {
  const pos = [currMove[1][0], currMove[1][1], currMove[1][2] + 1, currMove[1][3]]

  if (boardFuncs.positionExists(board, pos)) {

    const destPiece = board[currMove[1][0]][currMove[1][1]][currMove[1][2] + 1][currMove[1][3]];

    if (destPiece === 2 || destPiece === 16) {

      const pos = [currMove[1][0], currMove[1][1] - 2, currMove[1][2] - 1, currMove[1][3]];

      if (boardFuncs.positionExists(board, pos)) {

        const destPiece = board[currMove[1][0]][currMove[1][1] - 2][currMove[1][2] - 1][currMove[1][3]];

        const pos = [currMove[1][0], currMove[1][1], currMove[1][2] + 1, currMove[1][3]];

        if (destPiece === -2 || destPiece === -16)
          res.push([currMove[0].slice(), currMove[1].slice(), pos]);
      }
    }
  }
  return res;
}

