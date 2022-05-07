import * as boardFuncs from './board';
import * as pieceFuncs from './piece';
import * as pgnFuncs from './pgn';

import { Position, Move, FullBoard, Action, MoveArray, PositionArray, Piece, Turn, TurnArray, Timeline, TimelineArray, Board, ActionArray } from './types/chess'

export function toPosition(positionObj: Position, isTurnZero: boolean = false): PositionArray {
  let position: PositionArray = [0, 0, 0, 0];

  if (positionObj.timeline >= 0) {
    position[0] = (positionObj.timeline * 2);
  } else {
    position[0] = ((-positionObj.timeline) * 2) - 1;
  }

  let currTurn: number = positionObj.turn;

  if (isTurnZero) currTurn++;

  position[1] = ((currTurn - 1) * 2) + (positionObj.player === 'white' ? 0 : 1);

  position[2] = positionObj.rank - 1;

  position[3] = positionObj.file - 1;

  return position;
}

export function fromPosition(position: PositionArray, isTurnZero: boolean = false): Position {
  let positionObj: Position = {
    player: (position[1] % 2 === 0 ? 'white' : 'black'),
    coordinate: pgnFuncs.toSanCoord([position[2], position[3]]),
    rank: position[2] + 1,
    file: position[3] + 1,
    turn: Math.floor(position[1] / 2) + 1
  } as Position;

  if (position[0] == 0) {
    positionObj.timeline = 0;
  } else if (position[0] % 2 == 0) {
    positionObj.timeline = Math.ceil(position[0] / 2);
  } else {
    positionObj.timeline = -Math.ceil(position[0] / 2);
  }

  if (isTurnZero) positionObj.turn--;

  return positionObj;
}

export function toMove(moveObj: Move, isTurnZero: boolean = false): MoveArray {
  let move: MoveArray = [
    toPosition(moveObj.start, isTurnZero),
    toPosition(moveObj.end, isTurnZero)
  ];

  if (moveObj.promotion !== null) {
    move[1][4] = pieceFuncs.fromChar(moveObj.promotion, moveObj.player === 'white' ? 0 : 1);
  }

  if (moveObj.enPassant != null) {
    move[2] = toPosition(moveObj.enPassant, isTurnZero);
  }

  if (moveObj.castling != null) {
    move[2] = toPosition(moveObj.castling.start, isTurnZero);
    move[3] = toPosition(moveObj.castling.end, isTurnZero);
  }

  return move;
}

export function fromMove(fullBoard: FullBoard, move: MoveArray, isTurnZero: boolean = false): Move {
  let moveObj: Move = {
    promotion: null,
    enPassant: null,
    castling: null,
    start: fromPosition(move[0], isTurnZero),
    end: fromPosition(move[1], isTurnZero),
    player: (move[0][1] % 2 == 0 ? 'white' : 'black')
  } as Move;

  if (move[1][4] != undefined && move.length == 2) {
    moveObj.promotion = pieceFuncs.toChar(move[1][4]);
  }

  if (move.length == 3) {
    moveObj.enPassant = fromPosition(move[2], isTurnZero);
  }

  if (move.length == 4) {

    let realEnd: PositionArray = move[3].slice() as PositionArray;
    realEnd[1] = realEnd[1] + 1;

    moveObj.castling = {
      start: fromPosition(move[2], isTurnZero),
      end: fromPosition(move[3], isTurnZero),
      realEnd: fromPosition(realEnd, isTurnZero)
    }
  }

  //Calculating real end position
  let currMinT: number = 0;
  let currMaxT: number = 0;
  let newMinT: number = 0;
  let newMaxT: number = 0;
  const tmpBoard: FullBoard = boardFuncs.copy(fullBoard);

  try {

    for (let i = 0; i < tmpBoard.length; i++) {
      if (typeof tmpBoard[i] == 'undefined' || tmpBoard[i] == null) continue;

      if (i % 2 == 0) {
        currMaxT = i;
      } else {
        currMinT = i;
      }
    }

    boardFuncs.move(tmpBoard, move);

    for (let i = 0; i < tmpBoard.length; i++) {
      if (typeof tmpBoard[i] == 'undefined' || tmpBoard[i] == null) continue;

      if (i % 2 == 0) {
        newMaxT = i;
      }
      else {
        newMinT = i;
      }
    }
  } catch (err) { }

  let realEnd: PositionArray = move[1].slice() as PositionArray;

  realEnd[1] = realEnd[1] + 1;

  if (currMinT != newMinT) {
    realEnd[0] = newMinT;
  } else if (currMaxT != newMaxT) {
    realEnd[0] = newMaxT;
  }

  moveObj.realEnd = fromPosition(realEnd, isTurnZero);

  return moveObj;
}

export function toAction(actionObj: Action, isTurnZero: boolean = false): ActionArray {
  let action: ActionArray = [];

  for (const move of actionObj.moves) {
    action.push(toMove(move, isTurnZero));
  }

  return action;
}

export function fromAction(fullBoard: FullBoard, actionNum: number, moves: ActionArray, isTurnZero: boolean = false): Action {
  let actionObj: Action = {
    action: Math.floor(actionNum / 2) + 1,
    player: (actionNum % 2 === 0 ? 'white' : 'black'),
    moves: []
  } as Action;

  let tmpBoard: FullBoard = boardFuncs.copy(fullBoard);

  for (const move of moves) {
    actionObj.moves.push(fromMove(tmpBoard, move, isTurnZero));

    boardFuncs.move(tmpBoard, move);
  }

  return actionObj;
}

export function toPiece(pieceObj: Piece): number {
  let piece: number = pieceFuncs.fromChar(pieceObj.piece, (pieceObj.player == 'white' ? 0 : 1));

  if (pieceObj.hasMoved == false) {
    piece = -piece;
  }

  return piece;
}

export function fromPiece(fullBoard: FullBoard, position: PositionArray, isTurnZero: boolean = false): Piece {
  const piece: number = fullBoard[position[0]][position[1]][position[2]][position[3]];
  let pieceObj: Piece = {
    position: fromPosition(position, isTurnZero),
    piece: pieceFuncs.toChar(piece),
    player: (Math.abs(piece) % 2 === 0 ? 'white' : 'black'),
    hasMoved: piece > 0
  };

  return pieceObj;
}

export function toTurn(turnObj: Turn, isTurnZero: boolean = false): TurnArray {
  let turn: TurnArray = [];

  for (let r = 0; r < turnObj.height; r++) {
    turn.push([]);

    for (let f = 0; f < turnObj.width; f++) {
      turn[r][f] = 0;
    }
  }

  for (const pieceObj of turnObj.pieces) {
    const piece: number = toPiece(pieceObj);
    const position: PositionArray = toPosition(pieceObj.position, isTurnZero);

    turn[position[2]][position[3]] = piece;
  }

  return turn;
}

export function fromTurn(fullBoard: FullBoard, timeline: number, turn: number, isTurnZero: boolean = false): Turn {
  const currTurn = fullBoard[timeline][turn];
  let turnObj: Turn = {
    turn: Math.floor(turn / 2) + 1,
    player: (turn % 2 == 0 ? 'white' : 'black'),
    pieces: [],
    width: 0,
    height: currTurn.length
  } as Turn;

  if (isTurnZero) turnObj.turn--;

  for (let r = 0; r < currTurn.length; r++) {
    for (let f = 0; f < currTurn[r].length; f++) {

      if (currTurn[r][f] == 0) continue;

      turnObj.pieces.push(fromPiece(fullBoard, [
        timeline,
        turn,
        r,
        f
      ], isTurnZero));


      turnObj.width = (turnObj.width < currTurn[r].length) ? currTurn[r].length : turnObj.width;

    }
  }
  return turnObj;
}

export function toTimeline(timelineObj: Timeline, isTurnZero: boolean = false): TimelineArray {
  let timeline: TimelineArray = [];
  let maxTurnNumber: number = 0;

  for (const turn of timelineObj.turns) {
    let currTurnNumber: number = turn.turn;

    if (isTurnZero) currTurnNumber++;

    const newTurnNumber: number = ((currTurnNumber - 1) * 2) + (turn.player == 'white' ? 0 : 1);

    maxTurnNumber = (maxTurnNumber < newTurnNumber) ? newTurnNumber : maxTurnNumber;
  }

  for (let i = 0; i < maxTurnNumber; i++) {
    timeline[i] = null;
  }

  for (const turn of timelineObj.turns) {
    let currTurnNumber: number = turn.turn;

    if (isTurnZero) currTurnNumber++;

    const newTurnNumber: number = ((currTurnNumber - 1) * 2) + (turn.player == 'white' ? 0 : 1);

    timeline[newTurnNumber] = toTurn(turn, isTurnZero);
  }

  return timeline;
}

export function fromTimeline(fullBoard: FullBoard, actionNum: number, timeline: number, isTurnZero: boolean = false): Timeline {
  let timelineObj: Timeline = {
    player: (timeline % 2 == 0 ? 'white' : 'black'),
    turns: [],
    active: boardFuncs.active(fullBoard).includes(timeline),
    present: boardFuncs.present(fullBoard, actionNum).includes(timeline)
  } as Timeline;

  if (timeline == 0) {
    timelineObj.timeline = 0;
  } else if (timeline % 2 == 0) {
    timelineObj.timeline = Math.ceil(timeline / 2);
  } else {
    timelineObj.timeline = -Math.ceil(timeline / 2);
  }

  const currTimeline: TimelineArray = fullBoard[timeline];

  for (let i = 0; i < currTimeline.length; i++) {
    if (typeof currTimeline[i] == 'undefined' || currTimeline[i] == null) continue;

    timelineObj.turns.push(fromTurn(fullBoard, timeline, i, isTurnZero));
  }

  return timelineObj;
}

export function toBoard(boardObj: Board): FullBoard {
  const timelines: Timeline[] = boardObj.timelines;

  let fullBoard: FullBoard = [];
  let isTurnZero: boolean = false;
  let maxTimelineNumber: number = 0;

  for (const timeline of timelines) {
    for (const turn of timeline.turns) {

      if (turn.turn == 0) isTurnZero = true;
    }

    const newTimelineNumber: number = (timeline.timeline < 0) ? ((-timeline.timeline) * 2) - 1 : (timeline.timeline * 2);

    maxTimelineNumber = (maxTimelineNumber < newTimelineNumber) ? newTimelineNumber : maxTimelineNumber
  }

  for (let i = 0; i < maxTimelineNumber; i++) {
    fullBoard[i] = null;
  }

  for (let i = 0; i < timelines.length; i++) {
    const newTimelineNumber: number = (timelines[i].timeline < 0) ? ((-timelines[i].timeline) * 2) - 1 : (timelines[i].timeline * 2);

    fullBoard[newTimelineNumber] = toTimeline(boardObj.timelines[i], isTurnZero);
  }

  return fullBoard;
}

export function fromBoard(fullBoard: FullBoard, actionNum: number): Board {
  const isTurnZero = boardFuncs.isTurnZero(fullBoard);

  let boardObj: Board = {
    action: Math.floor(actionNum / 2) + 1,
    player: (actionNum % 2 === 0 ? 'white' : 'black'),
    timelines: [],
    width: 0,
    height: 0
  } as Board;

  for (let i = 0; i < fullBoard.length; i++) {
    if (typeof fullBoard[i] === 'undefined' || fullBoard[i] === null) continue;

    boardObj.timelines.push(fromTimeline(fullBoard, actionNum, i, isTurnZero));
  }

  for (const timeline of boardObj.timelines) {
    for (const turn of timeline.turns) {
      if (boardObj.width < turn.width) {
        boardObj.width = turn.width;
      }

      if (boardObj.height < turn.height) {
        boardObj.height = turn.height;
      }
    }
  }

  return boardObj;
}
