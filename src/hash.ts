import { FullBoard } from "./types/chess";

import md5 from 'blueimp-md5';

export function hash(fullBoard: FullBoard): string {
  let res: string = '';

  for (const timeline of fullBoard) {

    if (timeline) {

      for (const turn of timeline) {

        if (turn) {

          let zeroSum: number = 0;

          for (const rank of turn) {
            for (const file of rank) {
              const piece: number = file;

              if (piece == 0) {

                zeroSum++;

              } else {

                if (zeroSum > 0) {

                  res += '' + zeroSum;

                  zeroSum = 0;

                }

                res += (piece > 0) ? String.fromCharCode(97 + piece) : String.fromCharCode(67 + Math.abs(piece));
              }
            }
          }
        } else {

          res += 'B';
        }
      }
    } else {

      res += 'A';
    }
  }

  return md5(res);
}

export function hashBoard(fullBoard: FullBoard, timeline: number, turn: number): string {
  const l: number = timeline;
  const t: number = turn;
  let res: string = '';

  if (fullBoard[l][t]) {
    let zeroSum: number = 0;

    for (const rank of fullBoard[l][t]) {
      for (const file of rank) {
        const piece = file;

        if (piece == 0) {

          zeroSum++;

        } else {

          if (zeroSum > 0) {

            res += '' + zeroSum;

            zeroSum = 0;

          }

          res += (piece > 0) ? String.fromCharCode(97 + piece) : String.fromCharCode(67 + Math.abs(piece));

        }
      }
    }
  } else {

    res += 'B';
  }

  return md5(res);
}