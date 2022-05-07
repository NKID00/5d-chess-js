import { FullBoard, TurnArray } from './types/chess'

export function copy(fullBoard: FullBoard, timeline: number, turn: number): TurnArray | null {
  let res: TurnArray = [];

  if (fullBoard && fullBoard[timeline] && fullBoard[timeline][turn]) {

    for (const rank of fullBoard[timeline][turn]) {

      if (!rank) continue;

      res.push(rank.slice());

    }
  }

  if (res.length <= 0) return null;

  return res;
}