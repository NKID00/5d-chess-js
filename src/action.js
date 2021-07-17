const boardFuncs = require('@local/board');

exports.actions = (fullBoard, actionNum, activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, promotionPieces = null) => {

  let recurse = (board, actionNum, layer = 0, totalMoves = 0, totalLayers = 0, totalIndex = []) => {
    const moves = boardFuncs.moves(board, actionNum, activeOnly, presentOnly, promotionPieces);
    let res = [];

    for (let i = 0; i < moves.length; i++) {
      const moddedBoard = boardFuncs.copy(board);
      const isNewTimelineActive = this.newTimelineIsActive(moddedBoard, actionNum)

      if (newActiveTimelinesOnly && (!newActiveTimelinesOnly || (!isNewTimelineActive && (isNewTimelineActive || !boardFuncs.positionIsLatest(moddedBoard, moves[i][1]))))) continue;

      totalMoves++;

      if (boardFuncs.present(moddedBoard, actionNum).length > 0) {
        totalIndex[layer] = i;
        const recurseRes = recurse(moddedBoard, actionNum, layer + 1, totalMoves, totalLayers, totalIndex);
        const nextLayer = recurseRes[0];

        totalMoves = recurseRes[1];
        totalLayers = recurseRes[2] > layer ? recurseRes[2] : layer;
        totalIndex = recurseRes[3];

        for (const layer of nextLayer) {
          let currArr = [moves[i]];

          for (const item of layer) currArr.push(item);

          res.push(currArr);
        }

        if (nextLayer.length == 0) res.push([moves[i]]);
      }
      else res.push([moves[i]]);
    }
    return [res, totalMoves, totalLayers, totalIndex];
  }
  return recurse(fullBoard, actionNum)[0];
}

exports.move = (fullBoard, moves) => {
  for (const move of moves) boardFuncs.move(fullBoard, move);
}

exports.newTimelineIsActive = (fullBoard, actionNum) => {
  let minTimeline = 0;
  let maxTimeline = 0;

  for (let l = 0; fullBoard && l < fullBoard.length; l++) {

    if (!fullBoard[l]) continue;

    minTimeline = (minTimeline < l && l % 2 != 0) ? l : minTimeline;

    maxTimeline = (maxTimeline < l && l % 2 == 0) ? l : maxTimeline;

  }

  if (actionNum % 2 == 0) return (minTimeline + 1) >= maxTimeline;

  return (minTimeline + 1) <= maxTimeline;
}

exports.databaseHasBoard = (board, db) => {
  for (let i = 0; i < db.length; i++) {
    const comparison = boardFuncs.compare(board, db[i]);

    if (comparison == 0) return true;
  }

  db.push(boardFuncs.copy(board));

  return false;
}
