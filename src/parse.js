const boardFuncs = require('@local/board');
const pgnFuncs = require('@local/pgn');
const pieceFuncs = require('@local/piece');

exports.toPosition = (positionObj, isTurnZero = false) => {
  var res = [];
  if(positionObj.timeline >= 0) {
    res[0] = (positionObj.timeline*2);
  }
  else if(positionObj.timeline < 0) {
    res[0] = ((-positionObj.timeline)*2) - 1;
  }
  var currTurn = positionObj.turn;
  if(isTurnZero) {
    currTurn++;
  }
  res[1] = ((currTurn - 1) * 2) + (positionObj.player === 'white' ? 0 : 1);
  res[2] = positionObj.rank - 1;
  res[3] = positionObj.file - 1;
  return res;
}

exports.fromPosition = (position, isTurnZero = false) => {
  var res = {};
  if(position[0] === 0) {
    res.timeline = 0;
  }
  else if(position[0] % 2 === 0) {
    res.timeline = Math.ceil(position[0]/2);
  }
  else {
    res.timeline = -Math.ceil(position[0]/2);
  }
  res.turn = Math.floor(position[1]/2) + 1;
  if(isTurnZero) {
    res.turn--;
  }
  res.player = (position[1] % 2 === 0 ? 'white' : 'black');
  res.coordinate = pgnFuncs.toSanCoord([position[2], position[3]]);
  res.rank = position[2] + 1;
  res.file = position[3] + 1;
  return res;
}

exports.toMove = (moveObj, isTurnZero = false) => {
  var res = [];
  res[0] = this.toPosition(moveObj.start, isTurnZero);
  res[1] = this.toPosition(moveObj.end, isTurnZero);
  if(moveObj.promotion !== null) {
    res[1][4] = pieceFuncs.fromChar(moveObj.promotion, moveObj.player === 'white' ? 0 : 1);
  }
  if(moveObj.enPassant !== null) {
    res[2] = this.toPosition(moveObj.enPassant, isTurnZero);
  }
  if(moveObj.castling !== null) {
    res[2] = this.toPosition(moveObj.castling.start, isTurnZero);
    res[3] = this.toPosition(moveObj.castling.end, isTurnZero);
  }
  return res;
}

exports.fromMove = (board, move, isTurnZero = false) => {
  var res = {
    promotion: null,
    enPassant: null,
    castling: null
  };
  res.start = this.fromPosition(move[0], isTurnZero);
  res.end = this.fromPosition(move[1], isTurnZero);
  res.player = (move[0][1] % 2 === 0 ? 'white' : 'black');
  if(move[1][4] !== undefined && move.length === 2) {
    res.promotion = pieceFuncs.toChar(move[1][4]);
  }
  if(move.length === 3) {
    res.enPassant = this.fromPosition(move[2], isTurnZero);
  }
  if(move.length === 4) {
    var realEnd = move[3].slice();
    realEnd[1] = realEnd[1] + 1;
    res.castling = {
      start: this.fromPosition(move[2], isTurnZero),
      end: this.fromPosition(move[3], isTurnZero),
      realEnd: this.fromPosition(realEnd, isTurnZero)
    }
  }

  //Calculating real end position
  var currMinT = 0;
  var currMaxT = 0;
  var newMinT = 0;
  var newMaxT = 0;
  var tmpBoard = boardFuncs.copy(board);
  try {
    for(var i = 0;i < tmpBoard.length;i++) {
      if(typeof tmpBoard[i] !== 'undefined' && tmpBoard[i] !== null) {
        if(i % 2 === 0) {
          currMaxT = i;
        }
        else {
          currMinT = i;
        }
      }
    }
    boardFuncs.move(tmpBoard, move);
    for(var i = 0;i < tmpBoard.length;i++) {
      if(typeof tmpBoard[i] !== 'undefined' && tmpBoard[i] !== null) {
        if(i % 2 === 0) {
          newMaxT = i;
        }
        else {
          newMinT = i;
        }
      }
    }
  }
  catch(err) {}
  var realEnd = move[1].slice();
  realEnd[1] = realEnd[1] + 1;
  if(currMinT !== newMinT) {
    realEnd[0] = newMinT;
  }
  else if(currMaxT !== newMaxT) {
    realEnd[0] = newMaxT;
  }
  res.realEnd = this.fromPosition(realEnd, isTurnZero);
  return res;
}

exports.toAction = (actionObj, isTurnZero = false) => {
  var res = [];
  for(var i = 0;i < actionObj.moves.length;i++) {
    res.push(this.toMove(actionObj.moves[i], isTurnZero));
  }
  return res;
}

exports.fromAction = (board, actionNum, moves, isTurnZero = false) => {
  var res = {};
  res.action = Math.floor(actionNum/2) + 1;
  res.player = (actionNum % 2 === 0 ? 'white' : 'black');
  res.moves = [];
  var tmpBoard = boardFuncs.copy(board);
  for(var i = 0;i < moves.length;i++) {
    res.moves.push(this.fromMove(tmpBoard, moves[i], isTurnZero));
    boardFuncs.move(tmpBoard, moves[i]);
  }
  return res;
}

exports.toPiece = (pieceObj) => {
  var res = pieceFuncs.fromChar(pieceObj.piece, (pieceObj.player === 'white' ? 0 : 1));
  if(pieceObj.hasMoved === false) {
    res = -res;
  }
  return res;
}

exports.fromPiece = (board, pos, isTurnZero = false) => {
  var res = {};
  var piece = board[pos[0]][pos[1]][pos[2]][pos[3]];
  res.position = this.fromPosition(pos, isTurnZero);
  res.piece = pieceFuncs.toChar(piece);
  res.player = (Math.abs(piece) % 2 === 0 ? 'white' : 'black');
  res.hasMoved = piece > 0;
  return res;
}

exports.toTurn = (turnObj, isTurnZero = false) => {
  var res = [];
  for(var r = 0;r < turnObj.height;r++) {
    res.push([]);
    for(var f = 0;f < turnObj.width;f++) {
      res[r][f] = 0;
    }
  }
  for(var i = 0;i < turnObj.pieces.length;i++) {
    var piece = this.toPiece(turnObj.pieces[i]);
    var position = this.toPosition(turnObj.pieces[i].position, isTurnZero);
    res[position[2]][position[3]] = piece;
  }
  return res;
}

exports.fromTurn = (board, timeline, turn, isTurnZero = false) => {
  var res = {};
  res.turn = Math.floor(turn/2) + 1;
  if(isTurnZero) {
    res.turn--;
  }
  res.player = (turn % 2 === 0 ? 'white' : 'black');
  res.pieces = [];
  res.width = 0;
  var currTurn = board[timeline][turn];
  res.height = currTurn.length;
  for(var r = 0;r < currTurn.length;r++) {
    for(var f = 0;f < currTurn[r].length;f++) {
      if(currTurn[r][f] !== 0) {
        res.pieces.push(this.fromPiece(board, [
          timeline,
          turn,
          r,
          f
        ], isTurnZero));
      }
      if(res.width < currTurn[r].length) {
        res.width = currTurn[r].length;
      }
    }
  }
  return res;
}

exports.toTimeline = (timelineObj, isTurnZero = false) => {
  var res = [];
  var maxTurnNumber = 0;
  for(var i = 0;i < timelineObj.turns.length;i++) {
    var currTurnNumber = timelineObj.turns[i].turn;
    if(isTurnZero) {
      currTurnNumber++;
    }
    var newTurnNumber = ((currTurnNumber - 1) * 2) + (timelineObj.turns[i].player === 'white' ? 0 : 1);
    if(maxTurnNumber < newTurnNumber) {
      maxTurnNumber = newTurnNumber;
    }
  }
  for(var i = 0;i < maxTurnNumber;i++) {
    res[i] = null;
  }
  for(var i = 0;i < timelineObj.turns.length;i++) {
    var currTurnNumber = timelineObj.turns[i].turn;
    if(isTurnZero) {
      currTurnNumber++;
    }
    var newTurnNumber = ((currTurnNumber - 1) * 2) + (timelineObj.turns[i].player === 'white' ? 0 : 1);
    res[newTurnNumber] = this.toTurn(timelineObj.turns[i], isTurnZero);
  }
  return res;
}

exports.fromTimeline = (board, actionNum, timeline, isTurnZero = false) => {
  var res = {};
  if(timeline === 0) {
    res.timeline = 0;
  }
  else if(timeline % 2 === 0) {
    res.timeline = Math.ceil(timeline/2);
  }
  else {
    res.timeline = -Math.ceil(timeline/2);
  }
  res.player = (timeline % 2 === 0 ? 'white' : 'black');
  res.turns = [];
  res.active = boardFuncs.active(board).includes(timeline);
  res.present = boardFuncs.present(board, actionNum).includes(timeline);
  var currTimeline = board[timeline];
  for(var i = 0;i < currTimeline.length;i++) {
    if(!(typeof currTimeline[i] === 'undefined' || currTimeline[i] === null)) {
      res.turns.push(this.fromTurn(board, timeline, i, isTurnZero));
    }
  }
  return res;
}

exports.toBoard = (boardObj) => {
  var res = [];
  var isTurnZero = false;
  var maxTimelineNumber = 0;
  for(var i = 0;i < boardObj.timelines.length;i++) {
    for(var j = 0;j < boardObj.timelines[i].turns.length;j++) {
      if(boardObj.timelines[i].turns[j].turn === 0) {
        isTurnZero = true;
      }
    }
    var newTimelineNumber = (boardObj.timelines[i].timeline*2);
    if(boardObj.timelines[i].timeline < 0) {
      newTimelineNumber = ((-boardObj.timelines[i].timeline.timeline)*2) - 1;
    }
    if(maxTimelineNumber < newTimelineNumber) {
      maxTimelineNumber = newTimelineNumber;
    }
  }
  for(var i = 0;i < maxTimelineNumber;i++) {
    res[i] = null;
  }
  for(var i = 0;i < boardObj.timelines.length;i++) {
    var newTimelineNumber = (boardObj.timelines[i].timeline*2);
    if(boardObj.timelines[i].timeline < 0) {
      newTimelineNumber = ((-boardObj.timelines[i].timeline)*2) - 1;
    }
    res[newTimelineNumber] = this.toTimeline(boardObj.timelines[i], isTurnZero);
  }
  return res;
}

exports.fromBoard = (board, actionNum) => {
  var res = {};
  var isTurnZero = board.length > 0 ? (board[0].length > 0 ? board[0][0] === null : false) : false;
  res.action = Math.floor(actionNum/2) + 1;
  res.player = (actionNum % 2 === 0 ? 'white' : 'black');
  res.timelines = [];
  for(var i = 0;i < board.length;i++) {
    if(!(typeof board[i] === 'undefined' || board[i] === null)) {
      res.timelines.push(this.fromTimeline(board, actionNum, i, isTurnZero));
    }
  }
  res.width = 0;
  res.height = 0;
  for(var l = 0;l < res.timelines.length;l++) {
    for(var t = 0;t < res.timelines[l].turns.length;t++) {
      if(res.width < res.timelines[l].turns[t].width) {
        res.width = res.timelines[l].turns[t].width;
      }
      if(res.height < res.timelines[l].turns[t].height) {
        res.height = res.timelines[l].turns[t].height;
      }
    }
  }
  return res;
}
