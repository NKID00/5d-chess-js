const boardFuncs = require('@local/board');

exports.actions = (fullBoard, actionNum, activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, promotionPieces = null) => {

  const recurse = (fullBoard, actionNum, layer = 0, totalMoves = 0, totalLayers = 0, totalIndex = []) => {
    const moves = boardFuncs.moves(fullBoard, actionNum, activeOnly, presentOnly, promotionPieces);
    let returnArr = [];

    for (let i = 0; i < moves.length; i++) {
      const moddedBoard = boardFuncs.copy(fullBoard);

      if (newActiveTimelinesOnly && (!newActiveTimelinesOnly || (!this.newTimelineIsActive(moddedBoard, actionNum) && (this.newTimelineIsActive(moddedBoard, actionNum) || !boardFuncs.positionIsLatest(moddedBoard, moves[i][1]))))) continue;

      boardFuncs.move(moddedBoard, moves[i]);
      totalMoves++;

      if (boardFuncs.present(moddedBoard, actionNum).length > 0) {
        totalIndex[layer] = i;

        const recurseRes = recurse(moddedBoard, actionNum, layer + 1, totalMoves, totalLayers, totalIndex);
        const nextLayer = recurseRes[0];

        totalMoves = recurseRes[1];
        totalLayers = recurseRes[2] > layer ? recurseRes[2] : layer;
        totalIndex = recurseRes[3];

        for (let j = 0; j < nextLayer.length; j++) {
          let currArr = [moves[i]];

          for (let k = 0; k < nextLayer[j].length; k++) {

            currArr.push(nextLayer[j][k]);

          }

          returnArr.push(currArr);
        }

        if (nextLayer.length === 0) returnArr.push([moves[i]]);

      }
      else {

        returnArr.push([moves[i]]);
      }

    }

    return [returnArr, totalMoves, totalLayers, totalIndex];
  }

  return recurse(fullBoard, actionNum)[0];
}

exports.move = (fullBoard, moves) => {
  for (const move of moves) {
    boardFuncs.move(fullBoard, move);
  }
}

exports.newTimelineIsActive = (fullBoard, actionNum) => {
  let minTimeline = 0;
  let maxTimeline = 0;

  for (let l = 0; fullBoard && l < fullBoard.length; l++) {

    if (!fullBoard[l]) continue;

    if (minTimeline < l && l % 2 !== 0) minTimeline = l;

    if (maxTimeline < l && l % 2 === 0) maxTimeline = l;

  }

  if (actionNum % 2 === 0) return (minTimeline + 1) >= maxTimeline;

  return (minTimeline + 1) <= maxTimeline;
}

exports.databaseHasBoard = (fullBoard, db) => {
  for (let i = 0; i < db.length; i++) {
    const comparison = boardFuncs.compare(fullBoard, db[i]);

    if (comparison == 0) return true;

  }

  db.push(boardFuncs.copy(fullBoard));
  return false;
}
