import * as boardFuncs from './board';
import { FullBoard, MoveArray } from './types/chess';


// returns all possible actions / "move sets"
export function actions(fullBoard: FullBoard, actionNum: number, activeOnly: boolean = true, presentOnly: boolean = true, newActiveTimelinesOnly: boolean = true, promotionPieces: number[] = null): MoveArray[][] {

  const recurse = (fullBoard: FullBoard, actionNum: number, layer: number = 0, totalMoves: number = 0, totalLayers: number = 0, totalIndex: any = []): any[][] => {

    const moves: MoveArray[] = boardFuncs.moves(fullBoard, actionNum, activeOnly, presentOnly, false, promotionPieces);
    let returnArr = [];

    for (let i = 0; i < moves.length; i++) {
      const moddedBoard: FullBoard = boardFuncs.copy(fullBoard);

      if (newActiveTimelinesOnly && (!newActiveTimelinesOnly || (!newTimelineIsActive(moddedBoard, actionNum) && (newTimelineIsActive(moddedBoard, actionNum) || !boardFuncs.positionIsLatest(moddedBoard, moves[i][1]))))) continue;

      boardFuncs.move(moddedBoard, moves[i]);
      totalMoves++;

      if (boardFuncs.present(moddedBoard, actionNum).length > 0) {
        totalIndex[layer] = i;

        const recurseRes: any[] = recurse(moddedBoard, actionNum, layer + 1, totalMoves, totalLayers, totalIndex);
        const nextLayer: any[] = recurseRes[0];

        totalMoves = recurseRes[1];
        totalLayers = recurseRes[2] > layer ? recurseRes[2] : layer;
        totalIndex = recurseRes[3];

        for (let j = 0; j < nextLayer.length; j++) {
          let currArr: MoveArray[] = [moves[i]];

          for (let k = 0; k < nextLayer[j].length; k++) {

            currArr.push(nextLayer[j][k]);

          }

          returnArr.push(currArr);
        }

        if (nextLayer.length === 0) returnArr.push([moves[i]]);

      } else {

        returnArr.push([moves[i]]);
      }

    }

    return [returnArr, totalMoves, totalLayers, totalIndex];
  }

  return recurse(fullBoard, actionNum)[0];
}

export function move(fullBoard: FullBoard, moves: MoveArray[]): void {
  for (const move of moves) {
    boardFuncs.move(fullBoard, move);
  }
}

export function newTimelineIsActive(fullBoard: FullBoard, actionNum: number): boolean {
  let minTimeline: number = 0;
  let maxTimeline: number = 0;

  for (let l = 0; fullBoard && l < fullBoard.length; l++) {

    if (!fullBoard[l]) continue;

    if (minTimeline < l && l % 2 !== 0) minTimeline = l;

    if (maxTimeline < l && l % 2 === 0) maxTimeline = l;

  }

  if (actionNum % 2 === 0) return (minTimeline + 1) >= maxTimeline;

  return (minTimeline + 1) <= maxTimeline;
}

export function databaseHasBoard(fullBoard: FullBoard, db): boolean {
  for (let i = 0; i < db.length; i++) {
    const comparison = boardFuncs.compare(fullBoard, db[i]);

    if (comparison == 0) return true;

  }

  db.push(boardFuncs.copy(fullBoard));
  return false;
}