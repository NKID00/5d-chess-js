const pieceFuncs = require('@local/piece');
const turnFuncs = require('@local/turn');
const parseFuncs = require('@local/parse');

exports.init = (variant) => {
  switch (variant) {
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
    case typeof variant === 'object':
      return parseFuncs.toBoard(variant);
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

exports.copy = (board) => {

  let res = [];

  //go trough the timelines of the game
  for (let l = 0; board && l < board.length; l++) {

    // make result the same size as board with no values
    if (board[l]) {
      res[l] = [];
    }

    // go through each board in the current timeline
    for (let t = 0; board[l] && t < board[l].length; t++) {

      // make result the same size as board with no values
      if (board[l][t]) {
        res[l][t] = [];
      }

      // create a copy of the current turn
      const newTurn = turnFuncs.copy(board, l, t);

      // go to the next turn
      this.setTurn(res, l, t, newTurn);
    }
  }
  return res;
}

exports.setTurn = (board, timeline, time, turn) => {
  //Function to set small board/turn for full board. Used to avoid PACKED -> HOLEY element transition on v8 engine.
  if (!Array.isArray(board)) {
    board = [];
  }

  // go through every timeline
  for (let l = 0; l <= timeline; l++) {

    // if the timeline we are on is the last timeline
    if (l === timeline) {

      if (!Array.isArray(board[l])) {
        board[l] = [];
      }

      // go through all of the boards in the current timeline
      for (let t = 0; t <= time; t++) {

        // if the board we are on is the last board
        if (t === time) {
          board[l][t] = turn;
        }
        else if (t >= board[l].length || typeof board[l][t] === 'undefined') {
          board[l][t] = null;
        }
      }
    }
    else if (l >= board.length || typeof board[l] === 'undefined') {
      board[l] = null;
    }
  }
}

exports.move = (board, move) => {
  // position validation 
  if (this.positionExists(board, move[0]) && this.positionIsLatest(board, move[0])) {
    const src = move[0];
    const dest = move[1];
    let newTurn = turnFuncs.copy(board, src[0], src[1]);
    const destPiece = dest[4] ? dest[4] : Math.abs(newTurn[src[2]][src[3]]);

    if (destPiece !== undefined && destPiece !== 0) {
      newTurn[src[2]][src[3]] = 0;
      if (dest !== undefined) {
        if (dest[0] === src[0] && dest[1] === src[1]) {
          newTurn[dest[2]][dest[3]] = destPiece;
        }
        else {
          let secondNewTurn = turnFuncs.copy(board, dest[0], dest[1]);
          secondNewTurn[dest[2]][dest[3]] = destPiece;
          if ((board[dest[0]].length - 1) === dest[1]) {
            this.setTurn(board, dest[0], dest[1] + 1, secondNewTurn);
          }
          else {
            let newTimeline = 0;
            for (let i = 1; i < board.length; i++) {
              if (!(typeof board[i] === 'undefined' || board[i] === null) && (i % 2) === (dest[1] % 2)) {
                if (newTimeline < i) { newTimeline = i; }
              }
            }
            if (newTimeline === 0) {
              board[(dest[1] % 2) === 0 ? 2 : 1] = [];
              this.setTurn(board, (dest[1] % 2) === 0 ? 2 : 1, dest[1] + 1, secondNewTurn);
            }
            else {
              board[newTimeline + 2] = [];
              this.setTurn(board, newTimeline + 2, dest[1] + 1, secondNewTurn);
            }
          }
        }
      }
      this.setTurn(board, src[0], src[1] + 1, newTurn);
    }
    if (move[2] !== undefined) {
      var src2 = move[2];
      if (move[3] !== undefined) {
        var dest2 = move[3];
        var destPiece2 = dest2[4] ? dest2[4] : Math.abs(board[src2[0]][src2[1]][src2[2]][src2[3]]);
        if (dest2 !== undefined) {
          board[dest2[0]][dest2[1] + 1][dest2[2]][dest2[3]] = destPiece2;
        }
      }
      board[src2[0]][src2[1] + 1][src2[2]][src2[3]] = 0;
    }
  }
}

exports.positionExists = (board, pos) => {
  return Boolean(
    board[pos[0]] !== undefined && board[pos[0]] !== null &&
    board[pos[0]][pos[1]] !== undefined  && board[pos[0]][pos[1]] !== null &&
    pos[2] >= 0 && pos[2] < board[pos[0]][pos[1]].length &&
    pos[3] >= 0 && pos[3] < board[pos[0]][pos[1]][pos[2]].length
  );
}

exports.positionIsLatest = (board, pos) => {

  return this.positionExists(board, pos) && (board[pos[0]].length - 1) === pos[1]

}

exports.active = (board) => {
  let res = [];
  let minTimeline = 0;
  let maxTimeline = 0;

  // go trough all timelines that have happened
  for (let l = 0; l < board.length; l++) {

    // if a timeline has a board at the current index
    if (!board[l]) continue;

    //get the earliest timeline that isn't null?
    minTimeline = (minTimeline < l && l % 2 !== 0) ? l : minTimeline

    //get the latest timeline that isn't null?
    maxTimeline = (maxTimeline < l && l % 2 === 0) ? l : maxTimeline

  }

  // go trough all timelines
  for (let l = 0; l < board.length; l++) {

    // if a timeline has a board at the current index
    if (!board[l]) continue;

    if (maxTimeline + 1 >= l && l % 2 !== 0) res.push(l);

    if (minTimeline + 3 >= l && l % 2 === 0) res.push(l);

  }

  return res;
}

exports.present = (board, actionNum) => {
  let res = [];
  let activeTimelines = this.active(board);
  let lowestTurn = -1;

  // go through all active timelines
  for (let i = 0; i < activeTimelines.length; i++) {
    let currMax = -1;

    // go trough the boards on each active timeline
    for (let t = 0; t < board[activeTimelines[i]].length; t++) {

      // set the currMax to the maximum board id in each timeline
      currMax = (board[activeTimelines[i]][t] && currMax < t && actionNum % 2 === t % 2) ? t : currMax;

    }

    if (currMax !== -1) {

      lowestTurn = (lowestTurn === -1 || lowestTurn > currMax) ? currMax : lowestTurn

    }
  }

  if (lowestTurn >= 0) {

    // go through all active timelines
    for (let i = 0; i < activeTimelines.length; i++) {
      let currMax = 0;

      // go trough the boards on each active timeline
      for (let t = 0; t < board[activeTimelines[i]].length; t++) {

        // set currMax equal to the minimum board index
        if (board[activeTimelines[i]][t] && currMax < t) {
          currMax = t;
        }
      }

      if (lowestTurn === currMax) {
        res.push(activeTimelines[i]);
      }
      else if (lowestTurn > currMax) {
        return [];
      }
    }
  }

  return res;
}

exports.moves = (board, actionNum, activeOnly = true, presentOnly = true, spatialOnly = false, promotionPieces = null) => {

  let res = [];

  //if all moves come from only present timelines
  if (presentOnly) {
    // get all of the present timelines
    const presentTimelines = this.present(board, actionNum);
    res = this.getMovesFromTimelines(board, presentTimelines, actionNum, spatialOnly, promotionPieces, res);
  }
  // if the moves come from only active timelines
  else if (activeOnly) {

    // get all active timelines
    const activeTimelines = this.active(board);
    res = this.getMovesFromTimelines(board, activeTimelines, actionNum, spatialOnly, promotionPieces, res);

  }
  else {
    // same thing as the getMoveFromTimelines function but you have to validate timelines before getting the latestTurn
    for (let l = 0; l < board.length; l++) {

      const currTimeline = board[l];
      if (!currTimeline) continue;

      const latestTurn = currTimeline[currTimeline.length - 1];

      if ((currTimeline.length - 1) % 2 === actionNum % 2) {

        for (let r = 0; latestTurn && r < latestTurn.length; r++) {

          for (let f = 0; latestTurn[r] && f < latestTurn[r].length; f++) {

            const piece = Math.abs(latestTurn[r][f]);

            if (piece !== 0 && piece % 2 === actionNum % 2) {
              const moves = pieceFuncs.moves(board, [l, currTimeline.length - 1, r, f], spatialOnly, promotionPieces);

              for (let j = 0; j < moves.length; j++) {
                res.push(moves[j]);
              }
            }
          }
        }
      }
    }
  }

  return res;
}

exports.positionIsAttacked = (board, pos, player, spatialOnly = false) => {
  var pos2 = pos[2];
  var pos3 = pos[3];
  var curBoard = board[pos[0]][pos[1]];
  var movePos = pieceFuncs.movePos(6); // Knight movement
  var moveVecs = pieceFuncs.moveVecs(10); // Queen movement

  // Knight
  for (var i = 0; i < 8; i++) {
    var rPos = pos2 + movePos[i][2];
    var fPos = pos3 + movePos[i][3];
    
    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      var curPiece = Math.abs(curBoard[rPos][fPos]);
      if (curPiece !== 0 && curPiece - player === 5) {
        return true;
      }
    }
  }

  // RF
  for (var i = 0; i < 4; i++) {
    var rMove = moveVecs[i][2];
    var fMove = moveVecs[i][3];
    var rPos = pos2 + rMove;
    var fPos = pos3 + fMove;

    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      var curPiece = Math.abs(curBoard[rPos][fPos]);
      if (curPiece !== 0) {
        if (curPiece % 2 !== player) {
          var compPiece = curPiece - player;
          if ((compPiece >= 7 && compPiece <= 13) || compPiece === 17 || compPiece === 19) {
            return true;
          }
        }
        continue;
      }
      rPos += rMove;
      fPos += fMove;

      while (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
        curPiece = Math.abs(curBoard[rPos][fPos]);
        if (curPiece !== 0) {
          if (curPiece % 2 !== player) {
            var compPiece = curPiece - player;
            if (compPiece === 7 || compPiece === 9 || compPiece === 13 || compPiece === 19) {
              return true;
            }
          }
          break;
        }
        rPos += rMove;
        fPos += fMove;
      }
    }
  }

  // Diagonal
  for (var i = 4; i < 8; i++) {
    var rMove = moveVecs[i][2];
    var fMove = moveVecs[i][3];
    var rPos = pos2 + rMove;
    var fPos = pos3 + fMove;

    if (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
      var curPiece = Math.abs(curBoard[rPos][fPos]);
      if (curPiece !== 0) {
        if (curPiece % 2 !== player) {
          var compPiece = curPiece - player;
          if (compPiece === 5 || compPiece === 7 || compPiece === 21 || compPiece === 23) {
            continue;
          } else if ((compPiece === 1 || compPiece === 15) && i % 2 === player) {
            return true;
          } else {
            return true;
          }
        }
        continue;
      }
      rPos += rMove;
      fPos += fMove;

      while (rPos >= 0 && rPos < curBoard.length && fPos >= 0 && fPos < curBoard[rPos].length) {
        curPiece = Math.abs(curBoard[rPos][fPos]);
        if (curPiece !== 0) {
          if (curPiece % 2 !== player) {
            var compPiece = curPiece - player;
            if (compPiece === 3 || compPiece === 9 || compPiece === 13 || compPiece === 19) {
              return true;
            }
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

exports.isTurnZero = (board) => {
  //Checking if turn exists at the zero index
  let hasZeroIndex = false;

  if (!Array.isArray(board) || !board.length > 0) return false;

  for (let l = 0; l < board.length; l++) {

    if (Array.isArray(board[l]) && board[l].length > 0) {

      if (Array.isArray(board[l][0])) {
        hasZeroIndex = true;
      }
    }
  }
  //Inverted, since turn zero is the lack of a zero index turn (i.e. first turn starts from the index of 1)
  return !hasZeroIndex;

}

exports.isEvenTimeline = (board) => {

  return (!Array.isArray(board) || !board.length > 0) || !Array.isArray(board[0])

}

exports.isNormalCastling = (board) => {
  //Check if initial boards (not full board) can use O-O notation format
  let hasNonNormalCastling = false;
  const isTurnZero = this.isTurnZero(board);

  if (Array.isArray(board) && board.length > 0) return false;

  for (let l = 0; l < board.length; l++) {

    if (Array.isArray(board[l]) && board[l].length > 0) continue;

    const currTurn = board[l][0];

    if (isTurnZero) currTurn = board[l][2];

    if (Array.isArray(currTurn)) {
      if (currTurn[0][4] !== -12 || currTurn[7][4] !== -11) {
        hasNonNormalCastling = true;
      }
    }
  }
  //Inverted, since normal castling means no initial board contains non-normal castling
  return !hasNonNormalCastling;

}

exports.compare = (board1, board2) => {
  //Note: accidentally used t instead of l for timeline and l instead of t for turn
  if (Array.isArray(board1)) {

    if (Array.isArray(board2) && board1.length === board2.length) {

      for (var t = 0; t < board1.length; t++) {

        if (Array.isArray(board1[t])) {

          if (Array.isArray(board2[t]) && board1[t].length === board2[t].length) {

            for (var l = 0; l < board1[t].length; l++) {

              if (Array.isArray(board1[t][l])) {

                if (Array.isArray(board2[t][l]) && board1[t][l].length === board2[t][l].length) {

                  for (var r = 0; r < board1[t][l].length; r++) {

                    if (Array.isArray(board1[t][l][r])) {

                      if (Array.isArray(board2[t][l][r]) && board1[t][l][r].length === board2[t][l][r].length) {

                        for (var f = 0; f < board1[t][l][r].length; f++) {

                          if (board1[t][l][r][f] !== undefined) {

                            if (board2[t][l][r][f] !== undefined) {

                              if (board1[t][l][r][f] !== board2[t][l][r][f]) return board1[t][l][r][f] - board2[t][l][r][f];

                            }
                            else {
                              return -1;
                            }
                          }
                          else {
                            if (board2[t][l][r][f] !== undefined) {
                              return 1;
                            }
                          }
                        }
                      }
                      else {
                        return -1;
                      }
                    }
                    else {
                      if (Array.isArray(board2[t][l][r])) {
                        return 1;
                      }
                    }
                  }
                }
                else {
                  return -1;
                }
              }
              else {
                if (Array.isArray(board2[t][l])) {
                  return 1;
                }
              }
            }
          }
          else {
            return -1;
          }
        }
        else {
          if (Array.isArray(board2[t])) {
            return 1;
          }
        }
      }
    }
    else {
      return -1;
    }
  }
  else {
    if (Array.isArray(board2)) {
      return 1;
    }
    else {
      return 0;
    }
  }
  return 0;
}

exports.getMovesFromTimelines = (board, Timelines, actionNum, spatialOnly, promotionPieces, res) => {
  for (let i = 0; i < Timelines.length; i++) {

    //if a board exists in this timeline
    if (board[Timelines[i]]) {
      const currTimeline = board[Timelines[i]];

      const latestTurn = currTimeline[currTimeline.length - 1];

      // if the previous players move is the current players move
      if ((currTimeline.length - 1) % 2 === actionNum % 2) {

        // go through all files on the latestTurn
        for (let r = 0; r < latestTurn.length; r++) {
          // go through all squares in every file
          for (let f = 0; f < latestTurn[r].length; f++) {
            const piece = Math.abs(latestTurn[r][f]);

            // if there is a piece on the current square and currentPiece is the current player's piece
            if (piece !== 0 && piece % 2 === actionNum % 2) {
              const moves = pieceFuncs.moves(board, [Timelines[i], currTimeline.length - 1, r, f], spatialOnly, promotionPieces);

              // add all possible moves the the results array
              for (let j = 0; j < moves.length; j++) {
                res.push(moves[j]);
              }
            }
          }
        }
      }
    }
  }
  return res;
}
