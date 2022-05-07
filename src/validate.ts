import * as boardFuncs from './board';
import { FullBoard, MoveArray } from './types/chess';

export function move(fillBoard: FullBoard, actionNum: number, move: MoveArray, moveGen: MoveArray[] = [], promotionPieces: number[] = null): boolean {

  moveGen = (moveGen.length <= 0) ? boardFuncs.moves(fillBoard, actionNum, false, false, false, promotionPieces) : moveGen;

  for (let i = 0; i < moveGen.length; i++) {
    if (compareMove(moveGen[i], move) == 0) return true;
  }

  return false;
}

export function action(fullBoard: FullBoard, actionNum: number, moves, variant: string = 'standard'): boolean {
  const newBoard: FullBoard = boardFuncs.copy(fullBoard);

  for (const move of moves) {
    if (!move(newBoard, actionNum, move, variant)) return false;

    boardFuncs.move(newBoard, move);
  }

  if (boardFuncs.present(newBoard, actionNum).length > 0) return false;

  return true;
}

export function notation(notation: string): boolean {
  const regexRegular = notation.match(/^(\d+[bw]\.\s)\d+([\-\+]\d+)?:[PBNRQK]?[a-h][1-8]((<([\-\+]\d+)?>)+\d*([\-\+]\d+)?)?:x?[PBNRQ]?[a-h][1-8](e\.p\.)?[\=\+\#]?/);
  const regexCastling = notation.match(/^(\d+[bw]\.\s)\d+([\-\+]\d+)?:0\-0(\-0)?[\=\+\#]?/);

  if (regexRegular == null && regexCastling == null) return false;

  if (
    (regexRegular != null && regexRegular[0] != notation) ||
    (regexCastling != null && regexCastling[0] != notation)
  ) return false;

  return true;
}

export function compareMove(move1: MoveArray, move2: MoveArray): number {
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
