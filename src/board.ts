import * as pieceFuncs from './piece';
import * as parseFuncs from './parse';
import * as turnFuncs from './turn';
import { Board, FullBoard, MoveArray, PositionArray, TimelineArray, TurnArray } from './types/chess';

export function init(variant?: string | Object): FullBoard {
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
      return parseFuncs.toBoard(variant as Board);
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

export function copy(fullBoard: FullBoard): FullBoard {

  let fullBoardCopy: FullBoard = [];

  for (let timeline = 0; fullBoard && timeline < fullBoard.length; timeline++) {

    if (fullBoard[timeline]) fullBoardCopy[timeline] = [];

    for (let turn = 0; fullBoard[timeline] && turn < fullBoard[timeline].length; turn++) {

      if (fullBoard[timeline][turn]) fullBoardCopy[timeline][turn] = [];

      const newTurn: TurnArray = turnFuncs.copy(fullBoard, timeline, turn);

      setTurn(fullBoardCopy, timeline, turn, newTurn);
    }
  }

  return fullBoardCopy;
}

export function setTurn(fullBoard: FullBoard, givenTimelineIndex: number, givenTurnIndex: number, turnMade: TurnArray): void {
  //Function to set small board/turn for full board. Used to avoid PACKED -> HOLEY element transition on v8 engine.
  fullBoard = !Array.isArray(fullBoard) ? [] : fullBoard;

  for (let timeline = 0; timeline <= givenTimelineIndex; timeline++) {

    if (timeline == givenTimelineIndex) {

      fullBoard[timeline] = !Array.isArray(fullBoard[timeline]) ? [] : fullBoard[timeline]

      for (let turn = 0; turn <= givenTurnIndex; turn++) {

        if (turn == givenTurnIndex) fullBoard[timeline][turn] = turnMade;

        if (turn < fullBoard[timeline].length && typeof fullBoard[timeline][turn] != 'undefined') continue;

        fullBoard[timeline][turn] = null;

      }
    }

    if (timeline < fullBoard.length && typeof fullBoard[timeline] != 'undefined') continue;

    fullBoard[timeline] = null;
  }
}

export function move(fullBoard: FullBoard, moves: MoveArray): void {
  // position validation
  if (!positionExists(fullBoard, moves[0]) || !positionIsLatest(fullBoard, moves[0])) return;

  const start: PositionArray = moves[0];
  const dest: PositionArray = moves[1];

  let newTurn: TurnArray = turnFuncs.copy(fullBoard, start[0], start[1]);

  const destPiece: number = dest[4] ? dest[4] : Math.abs(newTurn[start[2]][start[3]]);

  if (destPiece !== undefined && destPiece !== 0) {

    newTurn[start[2]][start[3]] = 0;

    if (dest !== undefined) {

      if (dest[0] !== start[0] || dest[1] !== start[1]) {

        let secondNewTurn: TurnArray = turnFuncs.copy(fullBoard, dest[0], dest[1]);

        secondNewTurn[dest[2]][dest[3]] = destPiece;

        if ((fullBoard[dest[0]].length - 1) !== dest[1]) {

          let newTimeline: number = 0;

          for (let timeline = 1; timeline < fullBoard.length; timeline++) {

            if ((typeof fullBoard[timeline] === 'undefined' || fullBoard[timeline] === null) || (timeline % 2) != (dest[1] % 2)) continue;

            newTimeline = (newTimeline < timeline) ? timeline : newTimeline;
          }

          if (newTimeline === 0) {

            fullBoard[(dest[1] % 2) === 0 ? 2 : 1] = [];

            setTurn(fullBoard, (dest[1] % 2) === 0 ? 2 : 1, dest[1] + 1, secondNewTurn);

          } else {

            fullBoard[newTimeline + 2] = [];

            setTurn(fullBoard, newTimeline + 2, dest[1] + 1, secondNewTurn);
          }

        } else {

          setTurn(fullBoard, dest[0], dest[1] + 1, secondNewTurn);
        }

      } else {

        newTurn[dest[2]][dest[3]] = destPiece;
      }
    }

    setTurn(fullBoard, start[0], start[1] + 1, newTurn);
  }

  if (moves[2] === undefined) return;

  const src2: PositionArray = moves[2];

  if (moves[3] !== undefined) {

    const dest2: PositionArray = moves[3];

    const destPiece2: number = dest2[4] ? dest2[4] : Math.abs(fullBoard[src2[0]][src2[1]][src2[2]][src2[3]]);

    if (dest2 !== undefined) {

      fullBoard[dest2[0]][dest2[1] + 1][dest2[2]][dest2[3]] = destPiece2;

    }
  }

  fullBoard[src2[0]][src2[1] + 1][src2[2]][src2[3]] = 0;
}

export function positionExists(fullBoard: FullBoard, pos: PositionArray): boolean {

  return fullBoard[pos[0]] && fullBoard[pos[0]][pos[1]] && pos[2] >= 0 &&
    pos[2] < fullBoard[pos[0]][pos[1]].length &&
    pos[3] >= 0 && pos[3] < fullBoard[pos[0]][pos[1]][pos[2]].length

}

export function positionIsLatest(fullBoard: FullBoard, pos: PositionArray): boolean {

  return positionExists(fullBoard, pos) && (fullBoard[pos[0]].length - 1) === pos[1]

}

export function active(fullBoard: FullBoard): number[] {
  let activeTimelines: number[] = [];
  let minTimeline: number = 0;
  let maxTimeline: number = 0;

  for (let timeline = 0; timeline < fullBoard.length; timeline++) {

    if (!fullBoard[timeline]) continue;

    minTimeline = (minTimeline < timeline && timeline % 2 != 0) ? timeline : minTimeline

    maxTimeline = (maxTimeline < timeline && timeline % 2 == 0) ? timeline : maxTimeline

  }

  for (let timeline = 0; timeline < fullBoard.length; timeline++) {

    if (!fullBoard[timeline]) continue;

    if (maxTimeline + 1 >= timeline && timeline % 2 != 0) activeTimelines.push(timeline);

    if (minTimeline + 3 >= timeline && timeline % 2 == 0) activeTimelines.push(timeline);

  }

  return activeTimelines;
}

export function present(fullBoard: FullBoard, actionNum: number): number[] {
  const activeTimelines: number[] = active(fullBoard);
  let presentTimelines: number[] = [];
  let lowestTurn: number = -1;

  for (let i = 0; i < activeTimelines.length; i++) {

    let currMax: number = -1;

    for (let t = 0; t < fullBoard[activeTimelines[i]].length; t++) {

      currMax = (fullBoard[activeTimelines[i]][t] && currMax < t && actionNum % 2 === t % 2) ? t : currMax;
    }

    lowestTurn = (currMax != -1 && (lowestTurn === -1 || lowestTurn > currMax)) ? currMax : lowestTurn
  }


  if (lowestTurn < 0) return presentTimelines

  for (let i = 0; i < activeTimelines.length; i++) {

    let currMax: number = 0;

    for (let t = 0; t < fullBoard[activeTimelines[i]].length; t++) {

      currMax = (fullBoard[activeTimelines[i]][t] && currMax < t) ? t : currMax;

    }

    if (lowestTurn === currMax) presentTimelines.push(activeTimelines[i]);

    if (lowestTurn > currMax) return [];
  }

  return presentTimelines;
}

export function moves(fullBoard: FullBoard, actionNum: number, activeOnly: boolean = true, presentOnly: boolean = true, spatialOnly: boolean = false, promotionPieces: number[] = null): MoveArray[] {


  if (presentOnly) return getMovesFromTimelines(fullBoard, present(fullBoard, actionNum), actionNum, spatialOnly, promotionPieces);

  if (activeOnly) return getMovesFromTimelines(fullBoard, active(fullBoard), actionNum, spatialOnly, promotionPieces);

  let moveList: MoveArray[] = [];

  for (let timeline = 0; timeline < fullBoard.length; timeline++) {

    const currTimeline: TimelineArray = fullBoard[timeline];

    if (!currTimeline || (currTimeline.length - 1) % 2 !== actionNum % 2) continue;

    const latestTurn: TurnArray = currTimeline[currTimeline.length - 1];

    for (let rank = 0; latestTurn && rank < latestTurn.length; rank++) {

      for (let file = 0; latestTurn[rank] && file < latestTurn[rank].length; file++) {

        const piece: number = Math.abs(latestTurn[rank][file]);

        if (piece === 0 || piece % 2 !== actionNum % 2) continue;

        const moves: MoveArray[] = pieceFuncs.moves(fullBoard, [timeline, currTimeline.length - 1, rank, file], spatialOnly, promotionPieces) as any;

        for (const move of moves) {
          moveList.push(move);
        }
      }
    }
  }

  return moveList;
}

export function positionIsAttacked(fullBoard: FullBoard, pos: PositionArray, player: number): boolean {
  const pos2: number = pos[2];
  const pos3: number = pos[3];
  const movePos: number[][] = pieceFuncs.getMovePos(6); // Knight movement
  const moveVecs: number[][] = pieceFuncs.getMoveVecs(10); // Queen movement
  const curBoard: TurnArray = fullBoard[pos[0]][pos[1]];

  // Knight
  for (let i = 0; i < 8; i++) {
    const rankPos: number = pos2 + movePos[i][2];
    const filePos: number = pos3 + movePos[i][3];

    if (rankPos < 0 || rankPos >= curBoard.length || filePos < 0 || filePos >= curBoard[rankPos].length) continue;

    const curPiece: number = Math.abs(curBoard[rankPos][filePos]);

    if (curPiece !== 0 && curPiece - player === 5) return true;

  }

  // RF
  for (let i = 0; i < 4; i++) {
    const rMove: number = moveVecs[i][2];
    const fMove: number = moveVecs[i][3];
    let rankPos: number = pos2 + rMove;
    let filePos: number = pos3 + fMove;

    if (rankPos >= 0 && rankPos < curBoard.length && filePos >= 0 && filePos < curBoard[rankPos].length) {
      let curPiece: number = Math.abs(curBoard[rankPos][filePos]);

      const compPiece: number = curPiece - player;

      if (
        curPiece !== 0 &&
        curPiece % 2 !== player &&
        ((compPiece >= 7 && compPiece <= 13) || compPiece === 17 || compPiece === 19)
      ) return true;

      rankPos += rMove;
      filePos += fMove;

      while (rankPos >= 0 && rankPos < curBoard.length && filePos >= 0 && filePos < curBoard[rankPos].length) {
        curPiece = Math.abs(curBoard[rankPos][filePos]);

        if (curPiece !== 0) {
          if (curPiece % 2 !== player) {
            const compPiece: number = curPiece - player;

            if (compPiece === 7 || compPiece === 9 || compPiece === 13 || compPiece === 19) return true;
          }
          break;
        }

        rankPos += rMove;
        filePos += fMove;
      }
    }
  }

  // Diagonal
  for (let i = 4; i < 8; i++) {
    const rankMove: number = moveVecs[i][2];
    const fileMove: number = moveVecs[i][3];
    let rankPos: number = pos2 + rankMove;
    let filePos: number = pos3 + fileMove;

    if (rankPos >= 0 && rankPos < curBoard.length && filePos >= 0 && filePos < curBoard[rankPos].length) {
      let curPiece = Math.abs(curBoard[rankPos][filePos]);

      const compPiece: number = curPiece - player;

      if (
        curPiece !== 0 &&
        curPiece % 2 != player &&
        (compPiece !== 5 && compPiece !== 7 && compPiece !== 21 && compPiece !== 23)
      ) return true;

      rankPos += rankMove;
      filePos += fileMove;

      while (rankPos >= 0 && rankPos < curBoard.length && filePos >= 0 && filePos < curBoard[rankPos].length) {
        curPiece = Math.abs(curBoard[rankPos][filePos]);

        if (curPiece !== 0) {

          if (curPiece % 2 !== player) {
            const compPiece: number = curPiece - player;

            if (compPiece === 3 || compPiece === 9 || compPiece === 13 || compPiece === 19) return true;
          }
          break;
        }

        rankPos += rankMove;
        filePos += fileMove;
      }
    }
  }

  return false;
}

export function isTurnZero(fullBoard: FullBoard): boolean {
  if (!Array.isArray(fullBoard) || !(fullBoard.length > 0)) return false;

  let hasZeroIndex: boolean = false;

  for (const timeline of fullBoard) {

    if (
      Array.isArray(timeline) &&
      timeline.length >= + 0 &&
      Array.isArray(timeline[0])
    ) hasZeroIndex = true;

  }
  //Inverted, since turn zero is the lack of a zero index turn (i.e. first turn starts from the index of 1)
  return !hasZeroIndex;
}

export function isEvenTimeline(fullBoard: FullBoard): boolean {

  return (!Array.isArray(fullBoard) || !(fullBoard.length > 0)) || !Array.isArray(fullBoard[0])

}

export function isNormalCastling(fullBoard: FullBoard): boolean {
  //Check if initial boards (not full board) can use O-O notation format
  if (Array.isArray(fullBoard) && fullBoard.length > 0) return false;

  let hasNonNormalCastling: boolean = false;

  const turnZero: boolean = isTurnZero(fullBoard);

  for (const timeline of fullBoard) {

    if (Array.isArray(timeline) && timeline.length > 0) continue;

    let currTurn: number[][] = (turnZero) ? timeline[2] : timeline[0];

    if (Array.isArray(currTurn) && currTurn[0][4] !== -12 || currTurn[7][4] !== -11) hasNonNormalCastling = true;
  }
  //Inverted, since normal castling means no initial board contains non-normal castling
  return !hasNonNormalCastling;
}

export function compare(firstFullBoard: FullBoard, secondFullBoard: FullBoard): number {

  if (!Array.isArray(firstFullBoard) && Array.isArray(secondFullBoard)) return 1;

  if (Array.isArray(secondFullBoard) && firstFullBoard.length === secondFullBoard.length) return -1;

  for (let l = 0; l < firstFullBoard.length; l++) {

    if (!Array.isArray(firstFullBoard[l]) && Array.isArray(secondFullBoard[l])) return 1;

    if (!Array.isArray(secondFullBoard[l]) || firstFullBoard[l].length != secondFullBoard[l].length) return -1;

    for (let t = 0; t < firstFullBoard[l].length; t++) {

      if (!Array.isArray(firstFullBoard[l][t]) && Array.isArray(secondFullBoard[l][t])) return 1;

      if (!Array.isArray(secondFullBoard[l][t]) || firstFullBoard[l][t].length != secondFullBoard[l][t].length) return -1;

      for (let r = 0; r < firstFullBoard[l][t].length; r++) {
        if (!Array.isArray(firstFullBoard[l][t][r]) && Array.isArray(secondFullBoard[l][t][r])) return 1;

        if (Array.isArray(secondFullBoard[l][t][r]) || firstFullBoard[l][t][r].length != secondFullBoard[l][t][r].length) return -1;

        for (let f = 0; f < firstFullBoard[l][t][r].length; f++) {

          if (firstFullBoard[l][t][r][f] != undefined && secondFullBoard[l][t][r][f] != undefined) return 1;

          if (secondFullBoard[l][t][r][f] != undefined) return -1;

          if (firstFullBoard[l][t][r][f] != secondFullBoard[l][t][r][f]) return firstFullBoard[l][t][r][f] - secondFullBoard[l][t][r][f];
        }
      }
    }
  }

  return 0;
}

export function getMovesFromTimelines(fullBoard: FullBoard, timelineIndexes: number[], actionNum: number, spatialOnly: boolean, promotionPieces: number[], givenMoves: MoveArray[] = []): MoveArray[] {
  for (const timeline of timelineIndexes) {

    if (!fullBoard[timeline]) continue;

    const currTimeline: TimelineArray = fullBoard[timeline];

    if ((currTimeline.length - 1) % 2 != actionNum % 2) continue;

    const latestTurn: TurnArray = currTimeline[currTimeline.length - 1];

    for (let rank = 0; rank < latestTurn.length; rank++) {

      for (let file = 0; file < latestTurn[rank].length; file++) {
        const piece: number = Math.abs(latestTurn[rank][file]);

        if (piece == 0 || piece % 2 != actionNum % 2) continue;

        const moves: MoveArray[] = pieceFuncs.moves(fullBoard, [timeline, currTimeline.length - 1, rank, file], spatialOnly, promotionPieces);

        for (const move of moves) {
          givenMoves.push(move);
        }
      }
    }
  }
  return givenMoves;
}
