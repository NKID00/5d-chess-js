import * as boardFuncs from './board';
import { FullBoard, MoveArray, PositionArray, TurnArray } from './types/chess';

export function toChar(piece: number, displayPawn: boolean = false): string {
  const absPiece: number = Math.abs(piece);

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

export function fromChar(char: string, actionNum: number = 0): number {
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

export function getMovePos(piece: number): number[][] {
  const absPiece: number = Math.abs(piece);

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

export function getMoveVecs(piece: number): number[][] {
  const absPiece: number = Math.abs(piece);
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

export function getAvailablePromotionPieces(fullBoard: FullBoard): number[] {

  let res: number[] = [];

  for (let l = 0; fullBoard && l < fullBoard.length; l++) {
    for (let t = 0; fullBoard[l] && t < fullBoard[l].length; t++) {
      for (let r = 0; fullBoard[l][t] && r < fullBoard[l][t].length; r++) {
        for (let f = 0; fullBoard[l][t][r] && f < fullBoard[l][t][r].length; f++) {
          const piece: number = Math.abs(fullBoard[l][t][r][f]);

          const isNotRoyalty: boolean = piece >= 3 && piece <= 10 || piece == 13 || piece == 14 || piece == 17 || piece == 18;

          if (isNotRoyalty && !res.includes(piece)) {
            res.push(piece);

            const opponentPiece = piece % 2 === 0 ? piece - 1 : piece + 1;
            if (!res.includes(opponentPiece)) res.push(opponentPiece);
          }
        }
      }
    }
  }
  //Order pieces in order of importance
  //TODO: system to modify this.promotionPieces on index.js for builtin variants that need it
  return res.sort((a, b) => b - a);
}

export function getTimelineMove(sourceTimelineIndex: number, timelineMoveVector: number, isEvenTimeline = false): number {

  let res: number = (sourceTimelineIndex % 2 == 0) ? sourceTimelineIndex + (timelineMoveVector * 2) : sourceTimelineIndex - (timelineMoveVector * 2)

  res = (!isEvenTimeline && res < 0) ? (res * -1) - 1 : res;

  res = (isEvenTimeline && res <= 0) ? (res * -1) + 1 : res;

  return res;
}

export function moves(fullBoard: FullBoard, givenPiece: PositionArray, spatialOnly: boolean = false, promotionPieces = null, skipCastling: boolean = false): MoveArray[] {
  let res: MoveArray[] = [];

  if (!boardFuncs.positionExists(fullBoard, givenPiece)) return res;

  const givenPieceTimeline: number = givenPiece[0];
  const givenPieceTurn: number = givenPiece[1];
  const givenPieceRank: number = givenPiece[2];
  const givenPieceFile: number = givenPiece[3];
  const piece: number = fullBoard[givenPieceTimeline][givenPieceTurn][givenPieceRank][givenPieceFile];

  if (piece === 0) return res;

  const absPiece: number = Math.abs(piece);
  const pieceColor: number = absPiece % 2;
  const isEvenTimeline: boolean = boardFuncs.isEvenTimeline(fullBoard);

  if (absPiece === 1 || absPiece === 2 || absPiece === 15 || absPiece === 16) {

    const curBoard: TurnArray = fullBoard[givenPieceTimeline][givenPieceTurn];
    const forward: 1 | -1 = (pieceColor === 1) ? -1 : 1;
    const promotionRank: number = (pieceColor === 1) ? 0 : curBoard.length - 1;
    const rPos: number = givenPieceRank + forward;

    //Forward single/double square RF movement
    if (rPos >= 0 && rPos < curBoard.length && givenPieceFile >= 0 && givenPieceFile < curBoard[rPos].length) {
      const destPiece: number = curBoard[rPos][givenPieceFile];
      if (destPiece === 0) {
        res = promotionPiece(givenPiece, fullBoard, rPos, givenPieceFile, promotionPieces, promotionRank, pieceColor, res);

        if (piece < 0) {
          const rPosDouble: number = rPos + forward;
          if (rPosDouble >= 0 && rPosDouble < curBoard.length && givenPieceFile >= 0 && givenPieceFile < curBoard[rPos].length) {
            const destPiece: number = curBoard[rPosDouble][givenPieceFile];

            if (destPiece === 0) {

              res = promotionPiece(givenPiece, fullBoard, rPosDouble, givenPieceFile, promotionPieces, promotionRank, pieceColor, res);

            }
          }
        }
      }
    }

    res = enPassantMovement(fullBoard, givenPiece, promotionRank, promotionPieces, forward, curBoard, pieceColor, rPos, givenPieceFile + 1, res);

    res = enPassantMovement(fullBoard, givenPiece, promotionRank, promotionPieces, forward, curBoard, pieceColor, rPos, givenPieceFile - 1, res);

    if (!spatialOnly) {
      let curMove: PositionArray = [getTimelineMove(givenPieceTimeline, -forward, isEvenTimeline), givenPieceTurn, givenPieceRank, givenPieceFile];

      if (boardFuncs.positionExists(fullBoard, curMove)) {
        const destPiece: number = fullBoard[curMove[0]][givenPieceTurn][givenPieceRank][givenPieceFile];

        if (destPiece === 0) {

          res.push([givenPiece, curMove]);
          if (piece < 0) {
            const curMove: PositionArray = [getTimelineMove(givenPieceTimeline, -forward * 2, isEvenTimeline), givenPieceTurn, givenPieceRank, givenPieceFile];

            if (boardFuncs.positionExists(fullBoard, curMove)) {
              const destPiece: number = fullBoard[curMove[0]][givenPieceTurn][givenPieceRank][givenPieceFile];

              if (destPiece === 0) res.push([givenPiece, curMove]);
            }
          }
        }
      }

      curMove = [getTimelineMove(givenPieceTimeline, -forward, isEvenTimeline), givenPieceTurn + 2, givenPieceRank, givenPieceFile];
      res = opponentTimelineCapture(fullBoard, givenPiece, curMove, pieceColor, res);

      curMove = [getTimelineMove(givenPieceTimeline, -forward, isEvenTimeline), givenPieceTurn - 2, givenPieceRank, givenPieceFile];
      res = opponentTimelineCapture(fullBoard, givenPiece, curMove, pieceColor, res);

      if (absPiece === 15 || absPiece === 16) {
        // ⟨l, t, y, x⟩
        const cardinalities: number[][] = [
          [-forward, 0, 0, 1],
          [-forward, 0, 0, -1],
          [-forward, 0, forward, 0],
          [0, -1, forward, 0],
        ];
        let curColorMove: PositionArray[];

        for (let [dl, dt, dy, dx] of cardinalities) {

          if (pieceColor) {
            // White's timelines
            curColorMove = [givenPiece.slice() as PositionArray, [
              givenPieceTimeline,
              givenPieceTurn + 2 * dt,
              givenPieceRank + dy,
              givenPieceFile + dx
            ]];

            curColorMove[1][0] = getTimelineMove(curColorMove[1][0], dl, isEvenTimeline);
          } else {
            // Black's timelines
            curColorMove = [givenPiece.slice() as PositionArray, [
              givenPiece[0],
              givenPiece[1] + 2 * dt,
              givenPiece[2] + dy,
              givenPiece[3] + dx
            ]];

            curColorMove[1][0] = getTimelineMove(curColorMove[1][0], dl, isEvenTimeline);
          }

          if (!boardFuncs.positionExists(fullBoard, curColorMove[1])) continue;

          const destPiece: number = fullBoard[curColorMove[1][0]][curColorMove[1][1]][curColorMove[1][2]][curColorMove[1][3]];

          if (destPiece === 0 || (Math.abs(destPiece) % 2 === pieceColor)) continue;

          if (curColorMove[1][2] === promotionRank) {
            promotionPieces = (!promotionPieces || promotionPieces.length <= 0) ? getAvailablePromotionPieces(fullBoard) : promotionPieces

            for (let piece of promotionPieces) {
              if (piece % 2 !== pieceColor) continue;

              curColorMove[1][4] = piece;

              res.push([curColorMove[0].slice() as PositionArray, curColorMove[1].slice() as PositionArray]);
            }
          } else {
            res.push([curColorMove[0].slice() as PositionArray, curColorMove[1].slice() as PositionArray]);
          }
        }
      }
    }
  } else {

    const curBoard: TurnArray = fullBoard[givenPieceTimeline][givenPieceTurn];
    // All non-pawn/brawn pieces
    const spatialLength: number[] = [
      0, 0, 4, 4, 8, 8, 4, 4,
      8, 8, 8, 8, 8, 8, 0, 0,
      8, 8, 8, 8, 0, 0, 0, 0
    ];

    //Single square moves
    const movePos = getMovePos(piece);

    if (movePos.length !== 0) {
      const spatial: number = spatialLength[Math.abs(piece) - 1];

      for (let i = 0; i < spatial; i++) {
        const rankPos: number = givenPieceRank + movePos[i][2];
        const filePos: number = givenPieceFile + movePos[i][3];

        if (rankPos < 0 || rankPos >= curBoard.length || filePos < 0 || filePos >= curBoard[rankPos].length) continue;

        const destPiece: number = curBoard[rankPos][filePos];

        if (destPiece === 0 || Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rankPos, filePos]]);
      }

      if (!spatialOnly) {
        for (let i = spatial; i < movePos.length; i++) {
          const curMove: PositionArray = [
            getTimelineMove(givenPieceTimeline, movePos[i][0], isEvenTimeline),
            givenPieceTurn + movePos[i][1] * 2,
            givenPieceRank + movePos[i][2],
            givenPieceFile + movePos[i][3]
          ];

          if (!boardFuncs.positionExists(fullBoard, curMove)) continue;

          const destPiece: number = fullBoard[curMove[0]][curMove[1]][curMove[2]][curMove[3]];

          if (destPiece === 0 || Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, curMove]);
        }
      }
    }

    //Vector moves
    const moveVecs: number[][] = getMoveVecs(piece);
    if (moveVecs.length != 0) {
      const spatial: number = spatialLength[absPiece - 1];

      for (let i = 0; i < spatial; i++) {
        const rankMove: number = moveVecs[i][2];
        const fileMove: number = moveVecs[i][3];
        let rankPos: number = givenPieceRank + rankMove;
        let filePos: number = givenPieceFile + fileMove;

        while (rankPos >= 0 && rankPos < curBoard.length && filePos >= 0 && filePos < curBoard[rankPos].length) {
          const destPiece: number = curBoard[rankPos][filePos];

          if (destPiece !== 0) {

            if (Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rankPos, filePos]]);

            break;
          }

          res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rankPos, filePos]]);

          rankPos += rankMove;
          filePos += fileMove;
        }
      }

      if (!spatialOnly) {

        for (let i = spatial; i < moveVecs.length; i++) {
          const timelineMove: number = moveVecs[i][0];
          const turnMove: number = moveVecs[i][1] * 2;
          const rankMove: number = moveVecs[i][2];
          const fileMove: number = moveVecs[i][3];

          let curMove: PositionArray = [
            getTimelineMove(givenPieceTimeline, timelineMove, isEvenTimeline),
            givenPieceTurn + turnMove,
            givenPieceRank + rankMove,
            givenPieceFile + fileMove
          ];

          while (boardFuncs.positionExists(fullBoard, curMove)) {
            const destPiece: number = fullBoard[curMove[0]][curMove[1]][curMove[2]][curMove[3]];

            if (destPiece !== 0) {
              if (Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, curMove]);

              break;
            }

            res.push([givenPiece, curMove.slice() as PositionArray]);

            curMove[0] = getTimelineMove(curMove[0], timelineMove, isEvenTimeline);
            curMove[1] += turnMove;
            curMove[2] += rankMove;
            curMove[3] += fileMove;
          }
        }
      }
    }

    if (piece === -11 || piece === -12) {
      const curRank: number[] = curBoard[givenPieceRank];
      let notInCheck: boolean

      // Kingside Castling Movement
      let filePos: number = givenPieceFile + 1;

      if (filePos >= 0 && filePos < curRank.length && curRank[filePos] === 0) {

        filePos++;

        if (filePos >= 0 && filePos < curRank.length && curRank[filePos] === 0) {

          filePos++;

          while (filePos >= 0 && filePos < curRank.length) {
            const curPiece: number = curRank[filePos];

            if (curPiece !== 0) {

              if (curPiece - pieceColor === -8) {
                const rightOnePos: PositionArray = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile + 1];
                const rightTwoPos: PositionArray = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile + 2];

                notInCheck = !boardFuncs.positionIsAttacked(fullBoard, givenPiece, pieceColor);

                const condition: boolean = notInCheck && !boardFuncs.positionIsAttacked(fullBoard, rightOnePos, pieceColor) && !boardFuncs.positionIsAttacked(fullBoard, rightTwoPos, pieceColor);

                if (condition) res.push([
                  givenPiece,
                  rightTwoPos,
                  [givenPieceTimeline, givenPieceTurn, givenPieceRank, filePos],
                  rightOnePos
                ]);
              }
              break;
            }
            filePos++;
          }
        }
      }

      // Queenside Castling Movement
      filePos = givenPieceFile - 1;

      if (filePos >= 0 && filePos < curRank.length && curRank[filePos] === 0) {

        filePos--;

        if (filePos >= 0 && filePos < curRank.length && curRank[filePos] === 0) {

          filePos--;

          while (filePos >= 0 && filePos < curRank.length) {
            const curPiece: number = curRank[filePos];

            if (curPiece !== 0) {

              if (curPiece - pieceColor === -8) {
                const leftOnePos: PositionArray = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile - 1];
                const leftTwoPos: PositionArray = [givenPieceTimeline, givenPieceTurn, givenPieceRank, givenPieceFile - 2];

                const isPositionAttacked: boolean =
                  !boardFuncs.positionIsAttacked(fullBoard, leftOnePos, pieceColor) &&
                  !boardFuncs.positionIsAttacked(fullBoard, leftTwoPos, pieceColor);

                if (notInCheck !== undefined) {

                  if (notInCheck && isPositionAttacked) res.push([
                    givenPiece,
                    leftTwoPos,
                    [givenPieceTimeline, givenPieceTurn, givenPieceRank, filePos],
                    leftOnePos
                  ]);
                } else {

                  if (!boardFuncs.positionIsAttacked(fullBoard, givenPiece, pieceColor) && isPositionAttacked) res.push([
                    givenPiece,
                    leftTwoPos,
                    [givenPieceTimeline, givenPieceTurn, givenPieceRank, filePos],
                    leftOnePos
                  ]);
                }

              }
              break;
            }
            filePos--;
          }
        }
      }
    }
  }
  return res;
}

export function promotionPiece(givenPiece: PositionArray, fullBoard: FullBoard, rankPos: number, filePos: number, promotionPieces: number[], promotionRank: number, pieceColor: number, res: MoveArray[]): MoveArray[] {
  const givenPieceTimeline: number = givenPiece[0];
  const givenPieceTurn: number = givenPiece[1];

  if (rankPos === promotionRank) {
    if (!promotionPieces || promotionPieces.length <= 0) promotionPieces = getAvailablePromotionPieces(fullBoard);
    for (let i = 0; i < promotionPieces.length; i++) {
      if (promotionPieces[i] % 2 !== pieceColor) continue;
      res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rankPos, filePos, promotionPieces[i]]]);
    }
  } else {
    res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rankPos, filePos]]);
  }
  return res;
}

export function enPassant(fullBoard: FullBoard, givenPiece: PositionArray, curBoard: TurnArray, pieceColor: number, forward: 1 | -1, rankPos: number, filePos: number, res: MoveArray[]): MoveArray[] {
  const givenPieceTimeline: number = givenPiece[0];
  const givenPieceTurn: number = givenPiece[1];
  const givenPieceRank: number = givenPiece[2];

  if (filePos < 0 || filePos >= curBoard[givenPieceRank].length) return res;
  let destPiece: number = curBoard[givenPieceRank][filePos] - pieceColor;

  if (destPiece !== 1 && destPiece !== 15) return res;

  const rankPosEn: number = rankPos + forward;

  if (
    rankPosEn >= 0 &&
    rankPosEn < curBoard.length &&
    filePos >= 0 &&
    filePos < curBoard[rankPosEn].length
  ) {
    destPiece = curBoard[rankPosEn][filePos];

    if (destPiece !== 0) return res;

    if (
      boardFuncs.positionExists(fullBoard, [givenPieceTimeline, givenPieceTurn - 2, rankPosEn, filePos]) &&
      boardFuncs.positionExists(fullBoard, [givenPieceTimeline, givenPieceTurn - 2, givenPieceRank, filePos])
    ) {
      destPiece = fullBoard[givenPieceTimeline][givenPieceTurn - 2][givenPieceRank][filePos];

      if (destPiece !== 0) return res;

      destPiece = fullBoard[givenPieceTimeline][givenPieceTurn - 2][rankPosEn][filePos] + pieceColor;

      if (destPiece === -1 || destPiece === -15) res.push([givenPiece, [givenPieceTimeline, givenPieceTurn, rankPos, filePos], [givenPieceTimeline, givenPieceTurn, givenPieceRank, filePos]]);
    }
  }
  return res;
}

export function enPassantMovement(fullBoard: FullBoard, givenPiece: PositionArray, promotionRank: number, promotionPieces: number[], forward: 1 | -1, curBoard: TurnArray, pieceColor: number, rankPos: number, filePos: number, res: MoveArray[]): MoveArray[] {
  if (rankPos < 0 && rankPos >= curBoard.length || filePos < 0 || filePos >= curBoard[rankPos].length) return res;

  const destPiece: number = curBoard[rankPos][filePos];
  if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) res = promotionPiece(givenPiece, fullBoard, rankPos, filePos, promotionPieces, promotionRank, pieceColor, res);

  res = enPassant(fullBoard, givenPiece, curBoard, pieceColor, forward, rankPos, filePos, res);
  return res;
}

export function opponentTimelineCapture(fullBoard: FullBoard, givenPiece: PositionArray, curMove: PositionArray, pieceColor: number, res: MoveArray[]): MoveArray[] {
  const givenPieceRank: number = givenPiece[2];
  const givenPieceFile: number = givenPiece[3];

  if (boardFuncs.positionExists(fullBoard, curMove)) {
    const destPiece: number = fullBoard[curMove[0]][curMove[1]][givenPieceRank][givenPieceFile];

    if (destPiece !== 0 && Math.abs(destPiece) % 2 !== pieceColor) res.push([givenPiece, curMove]);
  }

  return res;
}