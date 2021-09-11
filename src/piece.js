const boardFuncs = require('@local/board');

// convert's all of the piece numbers to their characters 
exports.toChar = (piece, displayPawn = false) => {
  const absPiece = Math.abs(piece);

  if (displayPawn && (absPiece === 1 || absPiece === 2)) return 'P';

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

// convert's all of the piece characters to their numbers
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

// returns the movement positions of the given piece
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

// returns the movement vectors of the given piece
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
        [0, 0, 0, -1],
        [0, 0, 1, 0],
        [0, 0, -1, 0],

        [0, 1, 0, 0],
        [0, -1, 0, 0],
        [1, 0, 0, 0],
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
        [0, 0, -1, 1],
        [0, 0, 1, -1],
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
      return []
  }
}

exports.availablePromotionPieces = (fullBoard) => {

  let res = [];

  // go through the full board down to every file
  for (let l = 0; fullBoard && l < fullBoard.length; l++) {
    for (let t = 0; fullBoard[l] && t < fullBoard[l].length; t++) {
      for (let r = 0; fullBoard[l][t] && r < fullBoard[l][t].length; r++) {
        for (let f = 0; fullBoard[l][t][r] && f < fullBoard[l][t][r].length; f++) {
          // get that piece
          const piece = Math.abs(fullBoard[l][t][r][f]);
          // check if that piece is a royalty piece
          const isRoyalty = piece >= 3 && piece <= 10 || piece == 13 || piece == 14 || piece == 17 || piece == 18
          // check if that piece is counted
          if (res.includes(piece)) continue;
          // count it
          if (isRoyalty) res.push(piece);
        }
      }
    }
  }
  //Order pieces in order of importance
  //TODO: system to modify this.promotionPieces on index.js for builtin variants that need it
  return res.sort((a, b) => b - a);
}

exports.timelineMove = (sourceTimelineIndex, timelineMoveVector, isEvenTimeline = false) => {

  let res = (sourceTimelineIndex % 2 == 0) ? sourceTimelineIndex + (timelineMoveVector * 2) : sourceTimelineIndex - (timelineMoveVector * 2)

  res = (!isEvenTimeline && res < 0) ? (res * -1) - 1 : res;

  res = (isEvenTimeline && res <= 0) ? (res * -1) + 1 : res;

  return res;
}

exports.moves = (fullBoard, givenPiece, spatialOnly = false, promotionPieces = null, skipCastling = false) => {
  let res = [];

  // if the position doesn't exist return
  if (!boardFuncs.positionExists(fullBoard, givenPiece)) return res;

  const givenPieceTimeline = givenPiece[0];
  const givenPieceTurn = givenPiece[1];
  const givenPieceRank = givenPiece[2];
  const givenPieceFile = givenPiece[3];
  const piece = fullBoard[givenPieceTimeline][givenPieceTurn][givenPieceRank][givenPieceFile];

  // if the spot is empty return
  if (piece === 0) return res;

  const absPiece = Math.abs(piece);
  const pieceColor = absPiece % 2;
  const isEvenTimeline = boardFuncs.isEvenTimeline(fullBoard);

  // Pawn/Brawn movement
  if (absPiece === 1 || absPiece === 2 || absPiece === 15 || absPiece === 16) {

    const curBoard = fullBoard[givenPieceTimeline][givenPieceTurn];
    const forward = (pieceColor === 1) ? -1 : 1;
    const promotionRank = (pieceColor === 1) ? 0 : curBoard.length - 1;
    const rPos = givenPieceRank + forward;

    //Forward single/double square RF movement
    if (rPos >= 0 && rPos < curBoard.length && givenPieceFile >= 0 && givenPieceFile < curBoard[rPos].length) {
      const destPiece = curBoard[rPos][givenPieceFile];
      // promotionPiece
      if (destPiece === 0) {
        // get promotion pieces
        res = this.promotionPiece(givenPiece, fullBoard, rPos, givenPieceFile, promotionPieces, promotionRank, pieceColor, res);

        if (piece < 0) {
          const rPosDouble = rPos + forward;
          // if rPosDouble's position exists
          if (rPosDouble >= 0 && rPosDouble < curBoard.length && givenPieceFile >= 0 && givenPieceFile < curBoard[rPos].length) {
            const destPiece = curBoard[rPosDouble][givenPieceFile];

            // promotionPiece
            if (destPiece === 0) {

              res = this.promotionPiece(givenPiece, fullBoard, rPosDouble, givenPieceFile, promotionPieces, promotionRank, pieceColor, res);

            }
          }
        }
      }
    }

    //Forward single/en passant square capture RF movement
    res = this.enPassantMovement(fullBoard, givenPiece, promotionRank, promotionPieces, forward, curBoard, pieceColor, rPos, givenPieceFile + 1, res);

    res = this.enPassantMovement(fullBoard, givenPiece, promotionRank, promotionPieces, forward, curBoard, pieceColor, rPos, givenPieceFile - 1, res);

    if (!spatialOnly) {
      //Forward single square LT movement
      let curMove = [this.timelineMove(givenPieceTimeline, -forward, isEvenTimeline), givenPieceTurn, givenPieceRank, givenPieceFile];

      if (boardFuncs.positionExists(fullBoard, curMove)) {
        const destPiece = fullBoard[curMove[0]][givenPieceTurn][givenPieceRank][givenPieceFile];

        if (destPiece === 0) {

          res.push([givenPiece, curMove]);
          //Forward double square LT movement
          if (piece < 0) {
            const curMove = [this.timelineMove(givenPieceTimeline, -forward * 2, isEvenTimeline), givenPieceTurn, givenPieceRank, givenPieceFile];

            if (boardFuncs.positionExists(fullBoard, curMove)) {
              const destPiece = fullBoard[curMove[0]][givenPieceTurn][givenPieceRank][givenPieceFile];

              if (destPiece === 0) res.push([givenPiece, curMove]);
            }
          }
        }
      }

      //Forward single square capture LT movement
      curMove = [this.timelineMove(givenPieceTimeline, -forward, isEvenTimeline), givenPieceTurn + 2, givenPieceRank, givenPieceFile];
      // opponentTimelineCapture
      res = this.opponentTimelineCapture(fullBoard, givenPiece, curMove, pieceColor, res);

      curMove = [this.timelineMove(givenPieceTimeline, -forward, isEvenTimeline), givenPieceTurn - 2, givenPieceRank, givenPieceFile];
      // opponentTimelineCapture
      res = this.opponentTimelineCapture(fullBoard, givenPiece, curMove, pieceColor, res);

      // Brawn-specific captures
      if (absPiece === 15 || absPiece === 16) {
        // ⟨l, t, y, x⟩
        const cardinalities = [
          [-forward, 0, 0, 1],
          [-forward, 0, 0, -1],
          [-forward, 0, forward, 0],
          [0, -1, forward, 0],
        ];

        for (let [dl, dt, dy, dx] of cardinalities) {

          if (pieceColor) {
            // White's timelines
            currMove = [givenPiece.slice(), [
              givenPieceTimeline,
              givenPieceTurn + 2 * dt,
              givenPieceRank + dy,
              givenPieceFile + dx
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
          if (!boardFuncs.positionExists(fullBoard, currMove[1])) continue;

          const destPiece = fullBoard[currMove[1][0]][currMove[1][1]][currMove[1][2]][currMove[1][3]];

          if (destPiece === 0 || (Math.abs(destPiece) % 2 === pieceColor)) continue;

          if (currMove[1][2] === promotionRank) {
            // Must promote
            promotionPieces = (!promotionPieces || promotionPieces.length <= 0) ? this.availablePromotionPieces(fullBoard) : promotionPieces

            for (let piece of promotionPieces) {
              if (piece % 2 !== pieceColor) continue;

              currMove[1][4] = piece;

              res.push([currMove[0].slice(), currMove[1].slice()]);
            }
          } else {
            // Can't promote
            res.push([currMove[0].slice(), currMove[1].slice()]);
          }
        }
        //Black en passant capture LT movement
        else if(destPiece === 0) {
          currMove[2] = currMove[1].slice();
          currMove[2][0] = this.timelineMove(currMove[2][0], 1, isEvenTimeline);
          currMove[2][1]--;
          if(boardFuncs.positionExists(board, currMove[2])) {
            destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
            if(destPiece === -2 || destPiece === -16) {
              currMove[2][0] = this.timelineMove(currMove[2][0], -2, isEvenTimeline);
              if(boardFuncs.positionExists(board, currMove[2])) {
                destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                if(destPiece === 0) {
                  currMove[2][1]++;
                  if(boardFuncs.positionExists(board, currMove[2])) {
                    destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                    if(destPiece === 2 || destPiece === 16) {
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
  } else {

    const curBoard = fullBoard[givenPieceTimeline][givenPieceTurn];
    // All non-pawn/brawn pieces
    const spatialLength = [
      0, 0, 4, 4, 8, 8, 4, 4,
      8, 8, 8, 8, 8, 8, 0, 0,
      8, 8, 8, 8, 0, 0, 0, 0
    ];

    //Single square moves
    const movePos = this.movePos(piece);

    if (movePos.length !== 0) {
      const spatial = spatialLength[Math.abs(piece) - 1];

      for (let i = 0; i < spatial; i++) {
        const rPos = givenPieceRank + movePos[i][2];
        const fPos = givenPieceFile + movePos[i][3];

        if (rPos < 0 || rPos >= curBoard.length || fPos < 0 || fPos >= curBoard[rPos].length) continue;

        const destPiece = curBoard[rPos][fPos];

        if (destPiece === 0 || Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rPos, fPos]]);
      }

      if (!spatialOnly) {
        for (let i = spatial; i < movePos.length; i++) {
          const curMove = [
            this.timelineMove(givenPieceTimeline, movePos[i][0], isEvenTimeline),
            givenPieceTurn + movePos[i][1] * 2,
            givenPieceRank + movePos[i][2],
            givenPieceFile + movePos[i][3]
          ];

          if (!boardFuncs.positionExists(fullBoard, curMove)) continue;

          const destPiece = fullBoard[curMove[0]][curMove[1]][curMove[2]][curMove[3]];

          if (destPiece === 0 || Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, curMove]);
        }
      }
    }

    //Vector moves
    const moveVecs = this.moveVecs(piece);
    if (moveVecs.length !== 0) {
      const spatial = spatialLength[absPiece - 1];

      for (let i = 0; i < spatial; i++) {
        const rMove = moveVecs[i][2];
        const fMove = moveVecs[i][3];
        let rPos = givenPieceRank + rMove;
        let fPos = givenPieceFile + fMove;

        while (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
          const destPiece = curBoard[rPos][fPos];

          if (destPiece !== 0) {

            if (Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rPos, fPos]]);

            break;
          }

          res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rPos, fPos]]);

          rPos += rMove;
          fPos += fMove;
        }
      }

      if (!spatialOnly) {

        for (let i = spatial; i < moveVecs.length; i++) {
          const lMove = moveVecs[i][0];
          const tMove = moveVecs[i][1] * 2;
          const rMove = moveVecs[i][2];
          const fMove = moveVecs[i][3];
          let curMove = [
            this.timelineMove(givenPieceTimeline, lMove, isEvenTimeline),
            givenPieceTurn + tMove,
            givenPieceRank + rMove,
            givenPieceFile + fMove
          ];

          while (boardFuncs.positionExists(fullBoard, curMove)) {
            const destPiece = fullBoard[curMove[0]][curMove[1]][curMove[2]][curMove[3]];

            if (destPiece !== 0) {
              if (Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, curMove]);

              break;
            }

            res.push([givenPiece, curMove.slice()]);

            curMove[0] = this.timelineMove(curMove[0], lMove, isEvenTimeline);
            curMove[1] += tMove;
            curMove[2] += rMove;
            curMove[3] += fMove;
          }
          //White en passant capture LT movement
          else if(destPiece === 0) {
            currMove[2] = currMove[1].slice();
            currMove[2][0] = this.timelineMove(currMove[2][0], -1, isEvenTimeline);
            currMove[2][1]--;
            if(boardFuncs.positionExists(board, currMove[2])) {
              destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
              if(destPiece === -1 || destPiece === -15) {
                currMove[2][0] = this.timelineMove(currMove[2][0], 2, isEvenTimeline);
                if(boardFuncs.positionExists(board, currMove[2])) {
                  destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                  if(destPiece === 0) {
                    currMove[2][1]++;
                    if(boardFuncs.positionExists(board, currMove[2])) {
                      destPiece = board[currMove[2][0]][currMove[2][1]][currMove[2][2]][currMove[2][3]];
                      if(destPiece === 1 || destPiece === 15) {
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

    if (piece === -11 || piece === -12) {
      const curRank = curBoard[givenPieceRank];
      let notInCheck = undefined;

      // Kingside Castling Movement
      let fPos = givenPieceFile + 1;

      if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {

        fPos++;
        if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {

          fPos++;
          while (fPos >= 0 && fPos < curRank.length) {
            const curPiece = curRank[fPos];

            if (curPiece !== 0) {

              if (curPiece - pieceColor === -8) {
                const rightOnePos = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile + 1];
                const rightTwoPos = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile + 2];

                notInCheck = !boardFuncs.positionIsAttacked(fullBoard, givenPiece, pieceColor);

                const condition = notInCheck && !boardFuncs.positionIsAttacked(fullBoard, rightOnePos, pieceColor) && !boardFuncs.positionIsAttacked(fullBoard, rightTwoPos, pieceColor);

                if (condition) {
                  res.push([
                    givenPiece,
                    rightTwoPos,
                    [givenPieceTimeline, givenPieceTurn, givenPieceRank, fPos],
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
      fPos = givenPieceFile - 1;

      if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {

        fPos--;
        if (fPos >= 0 && fPos < curRank.length && curRank[fPos] === 0) {

          fPos--;
          while (fPos >= 0 && fPos < curRank.length) {
            const curPiece = curRank[fPos];

            if (curPiece !== 0) {

              if (curPiece - pieceColor === -8) {
                const leftOnePos = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile - 1];
                const leftTwoPos = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile - 2];
                const isPositionAttacked =
                  !boardFuncs.positionIsAttacked(fullBoard, leftOnePos, pieceColor) &&
                  !boardFuncs.positionIsAttacked(fullBoard, leftTwoPos, pieceColor);

                if (notInCheck !== undefined) {

                  if (notInCheck && isPositionAttacked) {

                    res.push([
                      givenPiece,
                      leftTwoPos,
                      [givenPieceTimeline, givenPieceTurn, givenPieceRank, fPos],
                      leftOnePos
                    ]);
                  }
                } else {

                  if (!boardFuncs.positionIsAttacked(fullBoard, givenPiece, pieceColor) && isPositionAttacked) {

                    res.push([
                      givenPiece,
                      leftTwoPos,
                      [givenPieceTimeline, givenPieceTurn, givenPieceRank, fPos],
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

exports.promotionPiece = (givenPiece, fullBoard, rPos, fPos, promotionPieces, promotionRank, pieceColor, res) => {
  const givenPieceTimeline = givenPiece[0];
  const givenPieceTurn = givenPiece[1];

  // if the given rank is the promotionRank 
  if (rPos === promotionRank) {
    // get all of the promotion pieces if they aren't already defined
    if (!promotionPieces || promotionPieces.length <= 0) promotionPieces = this.availablePromotionPieces(fullBoard);
    // go through all promotion pieces
    for (let i = 0; i < promotionPieces.length; i++) {
      // if the piece isn't yours go to the next one
      if (promotionPieces[i] % 2 !== pieceColor) continue;
      // add it to the result
      res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rPos, fPos, promotionPieces[i]]]);
    }
  } else {
    // add it to the result
    res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rPos, fPos]]);
  }
  return res
}

exports.enPassant = (fullBoard, givenPiece, curBoard, pieceColor, forward, rPos, fPos, res) => {
  const givenPieceTimeline = givenPiece[0];
  const givenPieceTurn = givenPiece[1];
  const givenPieceRank = givenPiece[2];

  if (fPos < 0 || fPos >= curBoard[givenPieceRank].length) return res;
  // get the destination piece
  const destPiece = curBoard[givenPieceRank][fPos] - pieceColor;

  if (destPiece !== 1 && destPiece !== 15) return res;

  const rPosEn = rPos + forward;

  if (rPosEn >= 0 && rPosEn < curBoard.length && fPos >= 0 && fPos < curBoard[rPosEn].length) {
    const destPiece = curBoard[rPosEn][fPos];

    if (destPiece !== 0) return res;

    if (boardFuncs.positionExists(fullBoard, [givenPieceTimeline, givenPieceTurn - 2, rPosEn, fPos])) {
      const destPiece = fullBoard[givenPieceTimeline][givenPieceTurn - 2][rPosEn][fPos] + pieceColor;

      if (destPiece === -1 || destPiece === -15) res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rPos, fPos], [givenPieceTimeline, givenPieceTurn, givenPieceRank, fPos]]);
    }
  }
  return res;
}

exports.enPassantMovement = (fullBoard, givenPiece, promotionRank, promotionPieces, forward, curBoard, pieceColor, rPos, fPos, res) => {
  if (rPos < 0 && rPos >= curBoard.length || fPos < 0 || fPos >= curBoard[rPos].length) return res;

  const destPiece = curBoard[rPos][fPos];
  // promotionPiece
  if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) {
    res = this.promotionPiece(givenPiece, fullBoard, rPos, fPos, promotionPieces, promotionRank, pieceColor, res);
  }

  res = this.enPassant(fullBoard, givenPiece, curBoard, pieceColor, forward, rPos, fPos, res)
  return res;
}

exports.opponentTimelineCapture = (fullBoard, givenPiece, curMove, pieceColor, res) => {
  const givenPieceRank = givenPiece[2];
  const givenPieceFile = givenPiece[3];

  if (boardFuncs.positionExists(fullBoard, curMove)) {
    const destPiece = fullBoard[curMove[0]][curMove[1]][givenPieceRank][givenPieceFile];

    if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor)
      res.push([givenPiece, curMove]);
  }
  return res;
}