exports.copy = (fullBoard, timeline, turn) => {
  let res = [];

  if (fullBoard && fullBoard[timeline] && fullBoard[timeline][turn]) {

    for (const rank of fullBoard[timeline][turn]) {

      if (!rank) continue;

      res.push(rank.slice());

    }

  }

  if (res.length <= 0) return null;

  return res;
}
