const md5 = require('blueimp-md5');

exports.hash = (fullBoard) => {
  let res = '';

  for (const timeline of fullBoard) {

    if (timeline) {

      for (const turn of timeline) {

        if (turn) {
          let zeroSum = 0;

          for (const rank of turn) {
            for (const file of rank) {
              const piece = file;

              if (piece == 0) {

                zeroSum++;

              } else {

                if (zeroSum > 0) {

                  res += '' + zeroSum;

                  zeroSum = 0;

                }

                if (piece > 0) {

                  res += String.fromCharCode(97 + piece);

                } else {

                  res += String.fromCharCode(67 + Math.abs(piece));
                }
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

exports.hashBoard = (fullBoard, timeline, turn) => {
  const l = timeline;
  const t = turn;
  let res = '';

  if (fullBoard[l][t]) {
    let zeroSum = 0;

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

          if (piece > 0) {

            res += String.fromCharCode(97 + piece);

          } else {

            res += String.fromCharCode(67 + Math.abs(piece));
          }
        }
      }
    }
  } else {

    res += 'B';
  }

  return md5(res);
}