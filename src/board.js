const pieceFuncs = require('@local/piece');
const turnFuncs = require('@local/turn');
const parseFuncs = require('@local/parse');

exports.init = (letiant) => {
  switch (letiant) {
    case 'defended_pawn':
      return [[[
        [-8, -10, -4, -6, -12, -4, -6, -8],
        [-2, -2, -2, -2, -2, -2, -2, -2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-7, -9, -3, -5, -11, -3, -5, -7]
      ]]];
    case 'half_reflected':
      return [[[
        [-8, -6, -4, -10, -12, -4, -6, -8],
        [-2, -2, -2, -2, -2, -2, -2, -2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-7, -5, -3, -11, -9, -3, -5, -7]
      ]]];
    case 'princess':
      return [[[
        [-8, -6, -4, -14, -12, -4, -6, -8],
        [-2, -2, -2, -2, -2, -2, -2, -2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-7, -5, -3, -13, -11, -3, -5, -7]
      ]]];
    case 'reversed_royalty':
      return [[[
        [-8, -6, -4, -20, -18, -4, -6, -8],
        [-2, -2, -2, -2, -2, -2, -2, -2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-7, -5, -3, -19, -17, -3, -5, -7]
      ]]];
    case 'turn_zero':
      return [[
        null,
        [
          [-8, -6, -4, -10, -12, -4, -6, -8],
          [-2, -2, -2, -2, -2, -2, -2, -2],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-7, -5, -3, -9, -11, -3, -5, -7]
        ],
        [
          [-8, -6, -4, -10, -12, -4, -6, -8],
          [-2, -2, -2, -2, -2, -2, -2, -2],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-7, -5, -3, -9, -11, -3, -5, -7]
        ]
      ]];
    case 'two_timelines':
      return [
        null,
        [[
          [-8, -6, -4, -10, -12, -4, -6, -8],
          [-2, -2, -2, -2, -2, -2, -2, -2],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-7, -5, -3, -9, -11, -3, -5, -7]
        ]],
        [[
          [-8, -6, -4, -10, -12, -4, -6, -8],
          [-2, -2, -2, -2, -2, -2, -2, -2],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [-1, -1, -1, -1, -1, -1, -1, -1],
          [-7, -5, -3, -9, -11, -3, -5, -7]
        ]]
      ];
    case 'custom':
      return [];
    case typeof letiant === 'object':
      return parseFuncs.toBoard(letiant);
    default:
      return [[[
        [-8, -6, -4, -10, -12, -4, -6, -8],
        [-2, -2, -2, -2, -2, -2, -2, -2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-7, -5, -3, -9, -11, -3, -5, -7]
      ]]];

  }
}

exports.copy = (fullBoard) => {

  let res = [];

  //go trough the timelines of the game
  for (let l = 0; fullBoard && l < fullBoard.length; l++) {

    // make result the same size as board with no values
    if (fullBoard[l]) res[l] = [];

    // go through each board in the current timeline
    for (let t = 0; fullBoard[l] && t < fullBoard[l].length; t++) {

      // make result the same size as board with no values
      if (fullBoard[l][t]) res[l][t] = [];

      // create a copy of the current turn
      const newTurn = turnFuncs.copy(fullBoard, l, t);

      // add the copied turn
      this.setTurn(res, l, t, newTurn);
    }
  }
  return res;
}

// I hate this function because it literally uses the one thing you shouldn't to work (using an object pointer and mutating the data from a different place instead of returning the changed data and assigning the object to it)
// But I can't think of a better way to make a deep copy of the data without doing this :(
exports.setTurn = (fullBoard, givenTimelineIndex, givenTurnIndex, turnMade) => {
  //Function to set small board/turn for full board. Used to avoid PACKED -> HOLEY element transition on v8 engine.
  fullBoard = !Array.isArray(fullBoard) ? [] : fullBoard

  // go through every timeline
  for (let l = 0; l <= givenTimelineIndex; l++) {

    // if the timeline we are on is the given timeline
    if (l == givenTimelineIndex) {

      fullBoard[l] = !Array.isArray(fullBoard[l]) ? [] : fullBoard[l]

      // go through all of the turns in the current timeline
      for (let t = 0; t <= givenTurnIndex; t++) {

        // if the turn we are on is the given turn
        if (t == givenTurnIndex) fullBoard[l][t] = turnMade;

        // if the turn we are on is not a turn
        if (t < fullBoard[l].length && typeof t != 'undefined') continue;

        fullBoard[l][t] = null;

      }
    }

    // if the timeline we are on is not a timeline
    if (l < fullBoard.length && typeof fullBoard[l] != 'undefined') continue;

    fullBoard[l] = null;
  }
}

// I hate this function because it literally uses the one thing you shouldn't to work (using an object pointer and mutating the data from a different place instead of returning the changed data and assigning the object to it)
// But I can't think of a better way to make a deep copy of the data in a way that it doesn't happen :(
exports.move = (fullBoard, moves) => {
  // position validation 
  if (this.positionExists(fullBoard, moves[0]) && this.positionIsLatest(fullBoard, moves[0])) {
    const start = moves[0];
    const dest = moves[1];

    let newTurn = turnFuncs.copy(fullBoard, start[0], start[1]);

    const destPiece = dest[4] ? dest[4] : Math.abs(newTurn[start[2]][start[3]]);

    if (destPiece !== undefined && destPiece !== 0) {

      newTurn[start[2]][start[3]] = 0;

      if (dest != undefined) {

        if (dest[0] === start[0] && dest[1] === start[1]) {

          newTurn[dest[2]][dest[3]] = destPiece;
        } else {

          let secondNewTurn = turnFuncs.copy(fullBoard, dest[0], dest[1]);

          secondNewTurn[dest[2]][dest[3]] = destPiece;

          if ((fullBoard[dest[0]].length - 1) === dest[1]) {

            this.setTurn(fullBoard, dest[0], dest[1] + 1, secondNewTurn);
          } else {
            let newTimeline = 0;

            for (let i = 1; i < fullBoard.length; i++) {

              if ((typeof fullBoard[i] === 'undefined' || fullBoard[i] === null) || (i % 2) != (dest[1] % 2)) continue;

              newTimeline = (newTimeline < i) ? i : newTimeline
            }

            if (newTimeline === 0) {

              fullBoard[(dest[1] % 2) === 0 ? 2 : 1] = [];

              this.setTurn(fullBoard, (dest[1] % 2) === 0 ? 2 : 1, dest[1] + 1, secondNewTurn);
            }
            else {

              fullBoard[newTimeline + 2] = [];

              this.setTurn(fullBoard, newTimeline + 2, dest[1] + 1, secondNewTurn);
            }
          }
        }
      }

      this.setTurn(fullBoard, start[0], start[1] + 1, newTurn);
    }

    if (moves[2] != undefined) {

      const src2 = moves[2];

      if (moves[3] != undefined) {

        const dest2 = moves[3];

        const destPiece2 = dest2[4] ? dest2[4] : Math.abs(fullBoard[src2[0]][src2[1]][src2[2]][src2[3]]);

        if (dest2 != undefined) {

          fullBoard[dest2[0]][dest2[1] + 1][dest2[2]][dest2[3]] = destPiece2;

        }
      }

      fullBoard[src2[0]][src2[1] + 1][src2[2]][src2[3]] = 0;
    }
  }
}

exports.positionExists = (fullBoard, pos) => {
  return fullBoard[pos[0]] && fullBoard[pos[0]][pos[1]] && pos[2] >= 0 &&
    pos[2] < fullBoard[pos[0]][pos[1]].length &&
    pos[3] >= 0 && pos[3] < fullBoard[pos[0]][pos[1]][pos[2]].length

}

exports.positionIsLatest = (fullBoard, pos) => {

  return this.positionExists(fullBoard, pos) && (fullBoard[pos[0]].length - 1) === pos[1]

}

exports.active = (fullBoard) => {
  let res = [];
  let minTimeline = 0;
  let maxTimeline = 0;

  // go trough all timelines
  for (let l = 0; l < fullBoard.length; l++) {

    // if the timeline exists
    if (!fullBoard[l]) continue;

    //get the earliest timeline that isn't null
    minTimeline = (minTimeline < l && l % 2 != 0) ? l : minTimeline

    //get the latest timeline that isn't null
    maxTimeline = (maxTimeline < l && l % 2 == 0) ? l : maxTimeline

  }

  // go trough all timelines
  for (let l = 0; l < fullBoard.length; l++) {

    // if the timeline exists
    if (!fullBoard[l]) continue;

    if (maxTimeline + 1 >= l && l % 2 != 0) res.push(l);

    if (minTimeline + 3 >= l && l % 2 == 0) res.push(l);

  }

  return res;
}

exports.present = (fullBoard, actionNum) => {
  const activeTimelines = this.active(fullBoard);
  let res = [];
  let lowestTurn = -1;

  // go through all active timelines
  for (let i = 0; i < activeTimelines.length; i++) {
    let currMax = -1;

    // go trough the boards on each active timeline
    for (let t = 0; t < fullBoard[activeTimelines[i]].length; t++) {

      // set the currMax to the maximum board id in each timeline
      currMax = (fullBoard[activeTimelines[i]][t] && currMax < t && actionNum % 2 === t % 2) ? t : currMax;

    }

    lowestTurn = (currMax != -1 && (lowestTurn === -1 || lowestTurn > currMax)) ? currMax : lowestTurn
  }

  if (lowestTurn >= 0) {

    // go through all active timelines
    for (let i = 0; i < activeTimelines.length; i++) {
      let currMax = 0;

      // go trough the boards on each active timeline
      for (let t = 0; t < fullBoard[activeTimelines[i]].length; t++) {

        // set currMax equal to the minimum board index
        currMax = (fullBoard[activeTimelines[i]][t] && currMax < t) ? t : currMax;

      }

      if (lowestTurn === currMax) res.push(activeTimelines[i]);

      if (lowestTurn > currMax) return [];
    }
  }

  return res;
}

exports.moves = (fullBoard, actionNum, activeOnly = true, presentOnly = true, spatialOnly = false, promotionPieces = null) => {

  let res = [];

  //if all moves come from only present timelines
  if (presentOnly) {
    // get all of the present timelines
    const presentTimelines = this.present(fullBoard, actionNum);
    return res = this.getMovesFromTimelines(fullBoard, presentTimelines, actionNum, spatialOnly, promotionPieces, res);

  }
  // if the moves come from only active timelines
  if (activeOnly) {
    // get all active timelines
    const activeTimelines = this.active(fullBoard);
    return res = this.getMovesFromTimelines(fullBoard, activeTimelines, actionNum, spatialOnly, promotionPieces, res);

  }

  // same thing as the getMoveFromTimelines function but you have to validate timelines before getting the latestTurn
  for (let l = 0; l < fullBoard.length; l++) {

    const currTimeline = fullBoard[l];
    if (!currTimeline) continue;

    const latestTurn = currTimeline[currTimeline.length - 1];

    if ((currTimeline.length - 1) % 2 !== actionNum % 2) continue;

    for (let r = 0; latestTurn && r < latestTurn.length; r++) {

      for (let f = 0; latestTurn[r] && f < latestTurn[r].length; f++) {

        const piece = Math.abs(latestTurn[r][f]);

        if (piece === 0 || piece % 2 !== actionNum % 2) continue;

        const moves = pieceFuncs.moves(fullBoard, [l, currTimeline.length - 1, r, f], spatialOnly, promotionPieces);

        for (let j = 0; j < moves.length; j++) {
          res.push(moves[j]);
        }
      }
    }
  }

  return res;
}

exports.positionIsAttacked = (fullBoard, pos, player) => {
  const pos2 = pos[2];
  const pos3 = pos[3];
  const curBoard = fullBoard[pos[0]][pos[1]];
  const movePos = pieceFuncs.movePos(6); // Knight movement
  const moveVecs = pieceFuncs.moveVecs(10); // Queen movement

  // Knight
  for (let i = 0; i < 8; i++) {
    const rPos = pos2 + movePos[i][2];
    const fPos = pos3 + movePos[i][3];

    if (rPos < 0 || rPos >= curBoard.length || fPos < 0 || fPos >= curBoard[rPos].length) continue;

    let curPiece = Math.abs(curBoard[rPos][fPos]);

    if (curPiece !== 0 && curPiece - player === 5) return true;

  }

  // RF
  for (let i = 0; i < 4; i++) {
    const rMove = moveVecs[i][2];
    const fMove = moveVecs[i][3];
    let rPos = pos2 + rMove;
    let fPos = pos3 + fMove;

    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      let curPiece = Math.abs(curBoard[rPos][fPos]);

      if (curPiece !== 0) {
        const compPiece = curPiece - player;

        if (curPiece % 2 === player) continue;

        if ((compPiece >= 7 && compPiece <= 13) || compPiece === 17 || compPiece === 19) return true;
      }

      rPos += rMove;
      fPos += fMove;

      while (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
        curPiece = Math.abs(curBoard[rPos][fPos]);

        if (curPiece !== 0) {

          if (curPiece % 2 !== player) {
            const compPiece = curPiece - player;

            if (compPiece === 7 || compPiece === 9 || compPiece === 13 || compPiece === 19) return true;
          }
          break;
        }

        rPos += rMove;
        fPos += fMove;
      }
    }
  }

  // Diagonal
  for (let i = 4; i < 8; i++) {
    const rMove = moveVecs[i][2];
    const fMove = moveVecs[i][3];
    let rPos = pos2 + rMove;
    let fPos = pos3 + fMove;

    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      let curPiece = Math.abs(curBoard[rPos][fPos]);

      if (curPiece !== 0) {
        const compPiece = curPiece - player;

        if (curPiece % 2 == player) continue;

        if (compPiece === 5 || compPiece === 7 || compPiece === 21 || compPiece === 23) continue;

        return true;
      }

      rPos += rMove;
      fPos += fMove;

      while (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
        curPiece = Math.abs(curBoard[rPos][fPos]);

        if (curPiece !== 0) {

          if (curPiece % 2 !== player) {
            const compPiece = curPiece - player;

            if (compPiece === 3 || compPiece === 9 || compPiece === 13 || compPiece === 19) return true;
          }
          break;
        }

        rPos += rMove;
        fPos += fMove;
      }
    }
  }

  return false;
}

exports.isTurnZero = (fullBoard) => {
  //Checking if turn exists at the zero index
  let hasZeroIndex = false;

  if (!Array.isArray(fullBoard) || !fullBoard.length > 0) return false;

  for (const timeline of fullBoard) {

    if (!Array.isArray(timeline) || timeline.length < + 0) continue;

    if (Array.isArray(timeline[0])) hasZeroIndex = true;

  }
  //Inverted, since turn zero is the lack of a zero index turn (i.e. first turn starts from the index of 1)
  return !hasZeroIndex;

}

exports.isEvenTimeline = (fullBoard) => {

  return (!Array.isArray(fullBoard) || !fullBoard.length > 0) || !Array.isArray(fullBoard[0])

}

exports.isNormalCastling = (fullBoard) => {
  //Check if initial boards (not full board) can use O-O notation format
  const isTurnZero = this.isTurnZero(fullBoard);
  let hasNonNormalCastling = false;

  if (Array.isArray(fullBoard) && fullBoard.length > 0) return false;

  for (const timeline of fullBoard) {

    if (Array.isArray(timeline) && timeline.length > 0) continue;

    const currTurn = timeline[0];

    currTurn = (isTurnZero) ? timeline[2] : currTurn;

    if (!Array.isArray(currTurn)) continue;

    if (currTurn[0][4] !== -12 || currTurn[7][4] !== -11) hasNonNormalCastling = true;
  }
  //Inverted, since normal castling means no initial board contains non-normal castling
  return !hasNonNormalCastling;

}

exports.compare = (firstFullBoard, secondFullBoard) => {

  if (Array.isArray(firstFullBoard)) {

    if (Array.isArray(secondFullBoard) && firstFullBoard.length === secondFullBoard.length) return -1;

    for (let l = 0; l < fullBoard.length; l++) {

      if (Array.isArray(firstFullBoard[l])) {

        if (!Array.isArray(secondFullBoard[l]) || firstFullBoard[l].length != secondFullBoard[l].length) return -1;

        for (let t = 0; t < firstFullBoard[l].length; t++) {

          if (Array.isArray(firstFullBoard[l][t])) {

            if (!Array.isArray(secondFullBoard[l][t]) || firstFullBoard[l][t].length != secondFullBoard[l][t].length) return -1;

            for (let r = 0; r < firstFullBoard[l][t].length; r++) {
              if (Array.isArray(firstFullBoard[l][t][r])) {

                if (Array.isArray(secondFullBoard[l][t][r]) || firstFullBoard[l][t][r].length != secondFullBoard[l][t][r].length) return -1;

                for (let f = 0; f < firstFullBoard[l][t][r]; f++) {

                  if (firstFullBoard[l][t][r][f] != undefined && secondFullBoard[l][t][r][f] != undefined) return 1;

                  if (secondFullBoard[l][t][r][f] != undefined) return -1;

                  if (firstFullBoard[l][t][r][f] != secondFullBoard[l][t][r][f]) return firstFullBoard[l][t][r][f] - secondFullBoard[l][t][r][f];
                }
              }

              if (Array.isArray(secondFullBoard[l][t][r])) return 1;
            }
          }

          if (Array.isArray(secondFullBoard[l][t])) return 1;
        }
      }

      if (Array.isArray(secondFullBoard[l])) return 1;
    }
  }

  if (Array.isArray(secondFullBoard)) return 1;

  return 0;
}

exports.getMovesFromTimelines = (fullBoard, timelines, actionNum, spatialOnly, promotionPieces, res) => {
  for (const timeline of timelines) {

    //if a board exists in this timeline
    if (!fullBoard[timeline]) continue;

    const currTimeline = fullBoard[timeline];

    const latestTurn = currTimeline[currTimeline.length - 1];

    // if the previous players move is the current players move
    if ((currTimeline.length - 1) % 2 != actionNum % 2) continue;

    // go through all files on the latestTurn
    for (let r = 0; r < latestTurn.length; r++) {
      // go through all squares in every file
      for (let f = 0; f < latestTurn[r].length; f++) {
        const piece = Math.abs(latestTurn[r][f]);
        const moves = pieceFuncs.moves(fullBoard, [timeline, currTimeline.length - 1, r, f], spatialOnly, promotionPieces);

        // if there is a piece on the current square and currentPiece is the current player's piece
        if (piece == 0 || piece % 2 != actionNum % 2) continue;

        // add all possible moves the the results array
        for (const move of moves) res.push(move);
      }
    }
  }
  return res;
}
