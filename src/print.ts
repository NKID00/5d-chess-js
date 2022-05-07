import { FullBoard } from "./types/chess";

const pieceIndex = {
  1: 'p',
  2: 'P',
  3: 'b',
  4: 'B',
  5: 'n',
  6: 'N',
  7: 'r',
  8: 'R',
  9: 'q',
  10: 'Q',
  11: 'k',
  12: 'K',
  13: 's',
  14: 'S'
}

export function turnArray(board: FullBoard, timeline: number, turn: number) {
  let output = [];

  for (let r = 0; r < 10; r++) {
    output[r] = [];

    for (let f = 0; f < 10; f++) {

      if (r === 0) {

        if (f === 0) {

          output[r][f] = (turn % 2 === 0 ? '' + '╔' : '╔');

        } else if (f === 9) {

          output[r][f] = (turn % 2 === 0 ? '' + '╗' : '╗');

        } else {

          output[r][f] = (turn % 2 === 0 ? '' + '═' : '═');
        }

      } else if (r === 9) {

        if (f === 0) {

          output[r][f] = (turn % 2 === 0 ? '' + '╚' : '╚');

        } else if (f === 9) {

          output[r][f] = (turn % 2 === 0 ? '' + '╝' : '╝');

        } else {

          output[r][f] = (turn % 2 === 0 ? '' + '═' : '═');
        }

      } else if (f === 0) {

        output[r][f] = (turn % 2 === 0 ? '' + '║' : '║');

      } else if (f === 9) {

        output[r][f] = (turn % 2 === 0 ? '' + '║' : '║');

      } else {

        output[r][f] = '.';
      }
    }
  }

  if (board && board[timeline] && board[timeline][turn]) {

    for (let r = 0; r < board[timeline][turn].length; r++) {

      if (!board[timeline][turn][r]) continue;

      for (let f = 0; f < board[timeline][turn][r].length; f++) {

        const piece = Math.abs(board[timeline][turn][r][f]);

        output[8 - r][f + 1] = pieceIndex[piece];
      }
    }
  }

  const string = '' + timeline + ',' + turn;

  for (let i = 1; i < 10; i++) {

    if (i - 1 >= string.length) continue;

    output[0][i] = string.charAt(i - 1);
  }


  for (let r = 1; r < 9; r++) {

    for (let f = 1; f < 9; f++) {

      if ((r + f) % 2 !== 0) continue;

      output[r][f] = output[r][f];
    }
  }
  return output;
}

export function blankTurnArray() {
  let res = [];

  for (let r = 0; r < 10; r++) {

    res[r] = [];

    for (let f = 0; f < 10; f++) {

      res[r][f] = ' ';

    }
  }
  return res;
}

export function boardArray(board: FullBoard) {
  let res = [];
  let offset = 0;

  for (let l = board.length - 1; board && l >= 0; l--) {

    if (l % 2 !== 0) {
      res[Math.floor((board.length - l - 1) / 2)] = [];
      offset++;
    }

    if (Array.isArray(board[l]) && l % 2 !== 0) {
      for (let t = 0; t < board[l].length; t++) {

        res[Math.floor((board.length - l - 1) / 2)][t] = Array.isArray(board[l][t]) ? turnArray(board, l, t) : blankTurnArray();

      }
    }
  }

  for (let l = 0; board && l < board.length; l++) {

    if (!Array.isArray(board[l]) || l % 2 !== 0) continue;

    res[l / 2 + offset] = [];

    for (let t = 0; t < board[l].length; t++) {

      res[l / 2 + offset][t] = Array.isArray(board[l][t]) ? turnArray(board, l, t) : blankTurnArray();

    }
  }
  return res;
}

export function printBoard(board: FullBoard) {
  let printStr = '';
  const array = boardArray(board);

  for (let l = 0; array && l < array.length; l++) {
    for (let r = 0; r < 10; r++) {
      for (let t = 0; array[l] && t < array[l].length; t++) {
        for (let f = 0; f < 10; f++) {

          printStr += array[l][t][r][f];
        }
      }

      printStr += '\n';
    }
  }
  return printStr;
}
