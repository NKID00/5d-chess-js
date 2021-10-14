const boardFuncs = require('@local/board');
const pgnFuncs = require('@local/pgn');
const pieceFuncs = require('@local/piece');

exports.toPosition = (positionObj, isTurnZero = false) => {
  let res = [];

  if (positionObj.timeline >= 0) {
    res[0] = (positionObj.timeline * 2);
  } else {
    res[0] = ((-positionObj.timeline) * 2) - 1;
  }

  let currTurn = positionObj.turn;

  if (isTurnZero) currTurn++;

  res[1] = ((currTurn - 1) * 2) + (positionObj.player === 'white' ? 0 : 1);

  res[2] = positionObj.rank - 1;

  res[3] = positionObj.file - 1;

  return res;
}

exports.fromPosition = (position, isTurnZero = false) => {
  let res = {};

  if (position[0] == 0) {
    res.timeline = 0;
  } else if (position[0] % 2 == 0) {
    res.timeline = Math.ceil(position[0] / 2);
  } else {
    res.timeline = -Math.ceil(position[0] / 2);
  }

  res.turn = Math.floor(position[1] / 2) + 1;

  if (isTurnZero) res.turn--;

  res.player = (position[1] % 2 === 0 ? 'white' : 'black');
  res.coordinate = pgnFuncs.toSanCoord([position[2], position[3]]);
  res.rank = position[2] + 1;
  res.file = position[3] + 1;

  return res;
}

exports.toMove = (moveObj, isTurnZero = false) => {
  let res = [];

  res[0] = this.toPosition(moveObj.start, isTurnZero);
  res[1] = this.toPosition(moveObj.end, isTurnZero);

  if (moveObj.promotion !== null) {
    res[1][4] = pieceFuncs.fromChar(moveObj.promotion, moveObj.player === 'white' ? 0 : 1);
  }

  if (moveObj.enPassant != null) {
    res[2] = this.toPosition(moveObj.enPassant, isTurnZero);
  }

  if (moveObj.castling != null) {
    res[2] = this.toPosition(moveObj.castling.start, isTurnZero);
    res[3] = this.toPosition(moveObj.castling.end, isTurnZero);
  }

  return res;
}

exports.fromMove = (fullBoard, move, isTurnZero = false) => {
  let res = {
    promotion: null,
    enPassant: null,
    castling: null
  };

  res.start = this.fromPosition(move[0], isTurnZero);
  res.end = this.fromPosition(move[1], isTurnZero);
  res.player = (move[0][1] % 2 == 0 ? 'white' : 'black');

  if (move[1][4] != undefined && move.length == 2) {
    res.promotion = pieceFuncs.toChar(move[1][4]);
  }

  if (move.length == 3) {
    res.enPassant = this.fromPosition(move[2], isTurnZero);
  }

  if (move.length == 4) {

    let realEnd = move[3].slice();
    realEnd[1] = realEnd[1] + 1;

    res.castling = {
      start: this.fromPosition(move[2], isTurnZero),
      end: this.fromPosition(move[3], isTurnZero),
      realEnd: this.fromPosition(realEnd, isTurnZero)
    }
  }

  //Calculating real end position
  let currMinT = 0;
  let currMaxT = 0;
  let newMinT = 0;
  let newMaxT = 0;
  const tmpBoard = boardFuncs.copy(fullBoard);

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

  let realEnd = move[1].slice();

  realEnd[1] = realEnd[1] + 1;

  if (currMinT != newMinT) {
    realEnd[0] = newMinT;
  } else if (currMaxT != newMaxT) {
    realEnd[0] = newMaxT;
  }

  res.realEnd = this.fromPosition(realEnd, isTurnZero);

  return res;
}

exports.toAction = (actionObj, isTurnZero = false) => {
  let res = [];

  for (const move of actionObj.moves) {
    res.push(this.toMove(move, isTurnZero));
  }

  return res;
}

exports.fromAction = (fullBoard, actionNum, moves, isTurnZero = false) => {
  let res = {};

  res.action = Math.floor(actionNum / 2) + 1;
  res.player = (actionNum % 2 === 0 ? 'white' : 'black');
  res.moves = [];

  let tmpBoard = boardFuncs.copy(fullBoard);

  for (const move of moves) {
    res.moves.push(this.fromMove(tmpBoard, move, isTurnZero));

    boardFuncs.move(tmpBoard, move);
  }

  return res;
}

exports.toPiece = (pieceObj) => {
  let res = pieceFuncs.fromChar(pieceObj.piece, (pieceObj.player == 'white' ? 0 : 1));

  if (pieceObj.hasMoved == false) {
    res = -res;
  }

  return res;
}

exports.fromPiece = (fullBoard, position, isTurnZero = false) => {
  const piece = fullBoard[position[0]][position[1]][position[2]][position[3]];
  let res = {};

  res.position = this.fromPosition(position, isTurnZero);
  res.piece = pieceFuncs.toChar(piece);
  res.player = (Math.abs(piece) % 2 === 0 ? 'white' : 'black');
  res.hasMoved = piece > 0;

  return res;
}

exports.toTurn = (turnObj, isTurnZero = false) => {
  let res = [];

  for (let r = 0; r < turnObj.height; r++) {
    res.push([]);

    for (let f = 0; f < turnObj.width; f++) {
      res[r][f] = 0;
    }
  }

  for (const pieceObj of turnObj.pieces) {
    const piece = this.toPiece(pieceObj);
    const position = this.toPosition(pieceObj.position, isTurnZero);

    res[position[2]][position[3]] = piece;
  }

  return res;
}

exports.fromTurn = (fullBoard, timeline, turn, isTurnZero = false) => {
  const currTurn = fullBoard[timeline][turn];
  let res = {};

  res.turn = Math.floor(turn / 2) + 1;

  if (isTurnZero) res.turn--;

  res.player = (turn % 2 == 0 ? 'white' : 'black');
  res.pieces = [];
  res.width = 0;
  res.height = currTurn.length;

  for (let r = 0; r < currTurn.length; r++) {
    for (let f = 0; f < currTurn[r].length; f++) {

      if (currTurn[r][f] == 0) continue;

      res.pieces.push(this.fromPiece(fullBoard, [
        timeline,
        turn,
        r,
        f
      ], isTurnZero));


      res.width = (res.width < currTurn[r].length) ? currTurn[r].length : res.width;

    }
  }
  return res;
}

exports.toTimeline = (timelineObj, isTurnZero = false) => {
  let res = [];
  let maxTurnNumber = 0;

  for (const turn of timelineObj.turns) {
    let currTurnNumber = turn.turn;

    if (isTurnZero) currTurnNumber++;

    const newTurnNumber = ((currTurnNumber - 1) * 2) + (turn.player == 'white' ? 0 : 1);

    maxTurnNumber = (maxTurnNumber < newTurnNumber) ? newTurnNumber : maxTurnNumber;
  }

  for (let i = 0; i < maxTurnNumber; i++) {
    res[i] = null;
  }

  for (const turn of timelineObj.turns) {
    let currTurnNumber = turn.turn;

    if (isTurnZero) currTurnNumber++;

    const newTurnNumber = ((currTurnNumber - 1) * 2) + (turn.player == 'white' ? 0 : 1);

    res[newTurnNumber] = this.toTurn(turn, isTurnZero);
  }

  return res;
}

exports.fromTimeline = (fullBoard, actionNum, timeline, isTurnZero = false) => {
  let res = {};

  if (timeline == 0) {
    res.timeline = 0;
  } else if (timeline % 2 == 0) {
    res.timeline = Math.ceil(timeline / 2);
  } else {
    res.timeline = -Math.ceil(timeline / 2);
  }

  res.player = (timeline % 2 == 0 ? 'white' : 'black');
  res.turns = [];
  res.active = boardFuncs.active(fullBoard).includes(timeline);
  res.present = boardFuncs.present(fullBoard, actionNum).includes(timeline);

  const currTimeline = fullBoard[timeline];

  for (let i = 0; i < currTimeline.length; i++) {
    if (typeof currTimeline[i] == 'undefined' || currTimeline[i] == null) continue;

    res.turns.push(this.fromTurn(fullBoard, timeline, i, isTurnZero));
  }

  return res;
}

exports.toBoard = (boardObj) => {
  const timeline = boardObj.timelines;
  let res = [];
  let isTurnZero = false;
  let maxTimelineNumber = 0;

  for (const turn of timeline) {
    for (const rank of turn.turns) {

      if (rank.turn == 0) isTurnZero = true;
    }

    const newTimelineNumber = (turn.timeline < 0) ? ((-turn.timeline.timeline) * 2) - 1 : (turn.timeline * 2);

    maxTimelineNumber = (maxTimelineNumber < newTimelineNumber) ? newTimelineNumber : maxTimelineNumber
  }

  for (let i = 0; i < maxTimelineNumber; i++) {
    res[i] = null;
  }

  for (let i = 0; i < timeline.length; i++) {
    const newTimelineNumber = (timeline[i].timeline < 0) ? ((-timeline[i].timeline) * 2) - 1 : (timeline[i].timeline * 2);

    res[newTimelineNumber] = this.toTimeline(boardObj.timelines[i], isTurnZero);
  }

  return res;
}

exports.fromBoard = (fullBoard, actionNum) => {
  const isTurnZero = boardFuncs.isTurnZero(fullBoard);
  let res = {};

  res.action = Math.floor(actionNum / 2) + 1;
  res.player = (actionNum % 2 === 0 ? 'white' : 'black');
  res.timelines = [];

  for (let i = 0; i < fullBoard.length; i++) {
    if (typeof fullBoard[i] === 'undefined' || fullBoard[i] === null) continue;

    res.timelines.push(this.fromTimeline(fullBoard, actionNum, i, isTurnZero));
  }

  res.width = 0;
  res.height = 0;

  for (const timeline of res.timelines) {
    for (const turn of timeline.turns) {
      if (res.width < turn.width) {
        res.width = turn.width;
      }

      if (res.height < turn.height) {
        res.height = turn.height;
      }
    }
  }

  return res;
}
