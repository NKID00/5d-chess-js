exports.turnArray = (fullBoard, timeline, turn) => {
  let res = [];

  for (let r = 0; r < 10; r++) {

    res[r] = [];

    for (let f = 0; f < 10; f++) {

      if (r == 0) {
        if (f == 0) {
          res[r][f] = (turn % 2 == 0 ? '╔' : '╔');
        } else if (f == 9) {
          res[r][f] = (turn % 2 == 0 ? '╗' : '╗');
        } else {
          res[r][f] = (turn % 2 == 0 ? '═' : '═');
        }
      } else if (r == 9) {
        if (f == 0) {
          res[r][f] = (turn % 2 == 0 ? '╚' : '╚');
        } else if (f == 9) {
          res[r][f] = (turn % 2 == 0 ? '╝' : '╝');
        } else {
          res[r][f] = (turn % 2 == 0 ? '═' : '═');
        }
      } else if (f == 0) {
        res[r][f] = (turn % 2 == 0 ? '║' : '║');
      } else if (f == 9) {
        res[r][f] = (turn % 2 == 0 ? '║' : '║');
      } else {
        res[r][f] = '.';
      }
    }
  }

  if (fullBoard && fullBoard[timeline] && fullBoard[timeline][turn]) {
    for (const rank of fullBoard[timeline][turn]) {
      if (!rank) continue;

      for (const file of rank) {
        const piece = Math.abs(file);

        let pieceLetter;

        switch (piece) {
          case 1:
            pieceLetter = 'p';

          case 2:
            pieceLetter = 'P';

          case 3:
            pieceLetter = 'b';

          case 4:
            pieceLetter = 'B';

          case 5:
            pieceLetter = 'n';

          case 6:
            pieceLetter = 'N';

          case 7:
            pieceLetter = 'r';

          case 8:
            pieceLetter = 'R';

          case 9:
            pieceLetter = 'q';

          case 10:
            pieceLetter = 'Q';

          case 11:
            pieceLetter = 'k';

          case 12:
            pieceLetter = 'K';

          case 13:
            pieceLetter = 's';

          case 14:
            pieceLetter = 'S';
        }

        res[8 - r][f + 1] = pieceLetter;
      }
    }
  }

  let string = timeline + ',' + turn;

  for (let i = 1; i < 10; i++) {
    res[0][i] = (i - 1 < string.length) ? string.charAt(i - 1) : res[0][i];
  }

  for (let r = 1; r < 9; r++) {
    for (let f = 1; f < 9; f++) {
      if ((r + f) % 2 == 0) {
        res[r][f] = res[r][f];
      }
    }
  }

  return res;
}

exports.blankTurnArray = () => {
  let res = [];

  for (let r = 0; r < 10; r++) {
    res[r] = [];
    for (let f = 0; f < 10; f++) {
      res[r][f] = ' ';
    }
  }

  return res;
}

exports.boardArray = (fullBoard) => {
  let res = [];
  let offset = 0;

  for (let l = fullBoard.length - 1; fullBoard && l >= 0; l--) {

    if (l % 2 == 0) continue;

    res[Math.floor((fullBoard.length - l - 1) / 2)] = [];
    offset++;

    if (Array.isArray(fullBoard[l]) || l % 2 == 0) continue;

    for (let t = 0; t < fullBoard[l].length; t++) {
      res[Math.floor((fullBoard.length - l - 1) / 2)][t] = Array.isArray(fullBoard[l][t]) ? this.turnArray(fullBoard, l, t) : this.blankTurnArray(fullBoard, l, t);
    }
  }

  for (let l = 0; fullBoard && l < fullBoard.length; l++) {
    if (Array.isArray(fullBoard[l]) || l % 2 != 0) continue;

    res[l / 2 + offset] = [];

    for (let t = 0; t < fullBoard[l].length; t++) {
      res[l / 2 + offset][t] = Array.isArray(fullBoard[l][t]) ? this.turnArray(fullBoard, l, t) : this.blankTurnArray(fullBoard, l, t);
    }
  }

  return res;
}

exports.printBoard = (fullBoard) => {
  const array = this.boardArray(fullBoard);
  let printStr = '';

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
