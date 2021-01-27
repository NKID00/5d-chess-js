const boardFuncs = require('@local/board');
const copyFuncs = require('@local/copy');
const parseFuncs = require('@local/parse');
const pieceFuncs = require('@local/piece');
const validateFuncs = require('@local/validate');
const { action } = require('./convert');

exports.toSanCoord = (point) => {
  return String.fromCharCode(point[1] + 97) + (point[0] + 1);
}

exports.fromSanCoord = (str) => {
  var match = str.match(/^([a-h]?)(\d?)/);
  return [
    match[2].length > 0 ?
      Number(match[2]) - 1
    :
      -1,
    match[1].length > 0 ?
      match[1].charCodeAt(0) - 97
    :
      -1
  ];
}

exports.ambiguousSan = (move, board, actionNum = 0, moveGen = []) => {
  //moveGen here is for pregenerated moves (skipping generating moves again)
  var res = '';
  var moves = moveGen;
  if(moves.length <= 0) {
    moves = boardFuncs.moves(board, actionNum, false, false);
  }
  var src = move[0];
  var dest = move[1];
  var piece = Math.abs(board[src[0]][src[1]][src[2]][src[3]]);
  var destPiece = board[dest[0]][dest[1]][dest[2]][dest[3]];
  var conflict = false;
  var sameRank = false;
  var sameFile = false;
  for(var i = 0;i < moves.length;i++) {
    if(validateFuncs.compareMove(move, moves[i]) !== 0) {
      if(moves[i].length <= 3) {
        var currSrc = moves[i][0];
        var currDest = moves[i][1];
        var currPiece = Math.abs(board[currSrc[0]][currSrc[1]][currSrc[2]][currSrc[3]]);
        if(piece === currPiece) {
          if(
            src[0] === currSrc[0] &&
            src[1] === currSrc[1] &&
            dest[0] === currDest[0] &&
            dest[1] === currDest[1] &&
            dest[2] === currDest[2] &&
            dest[3] === currDest[3]
          ) {
            if(src[2] === currSrc[2]) {
              sameRank = true;
            }
            if(src[3] === currSrc[3]) {
              sameFile = true;
            }
            conflict = true;
          }
        }
      }
    }
  }
  if(conflict) {
    if(!sameFile) {
      res += this.toSanCoord([src[2], src[3]])[0];
    }
    else if(sameFile && !sameRank) {
      res += this.toSanCoord([src[2], src[3]])[1];
    }
    else if(sameFile && sameRank) {
      res += this.toSanCoord([src[2], src[3]]);
    }
  }
  if(Math.abs(destPiece) !== 0 || move.length === 3) {
    if(Math.abs(piece) === 1 || Math.abs(piece) === 2) {
      if(!conflict) {
        res += this.toSanCoord([src[2], src[3]])[0];
      }
    }
    res += 'x';
  }
  res += this.toSanCoord([dest[2], dest[3]]);
  return res;
}

exports.fromMove = (move, board = [], actionNum = 0, suffix = '', timelineActivationToken = true, newTimelineToken = true, superPhysicalToken = false) => {
  var res = '';
  var src = move[0];
  var dest = move[1];
  var isTurnZero = board.length > 0 ? (board[0].length > 0 ? board[0][0] === null : false) : false;
  var moveObj = parseFuncs.fromMove(move, isTurnZero);
  var isSingleTimeline = board.length <= 1;
  var isTimelineTravel = src[0] !== dest[0];
  var isTimeTravel = src[1] !== dest[1];
  var isCastling = move.length === 4;
  var isEnPassant = move.length === 3;
  var isPromotion = dest.length >= 5;
  var isJump = (isTimelineTravel || isTimeTravel);
  var isBranching = false;
  var isPresentMoving = false;
  var newActive = null;
  var newTimeline = null;
  if(isJump) {
    var tmpBoard = boardFuncs.copy(board);
    boardFuncs.move(tmpBoard, move);
    for(var i = 0;i < tmpBoard.length;i++) {
      if(Array.isArray(tmpBoard[i]) && !Array.isArray(board[i])) {
        isBranching = true;
        newTimeline = i % 2 === 0 ? Math.ceil(i/2) : -Math.ceil(i/2);
      }
    }
    var actives = boardFuncs.active(board);
    var tmpActives = boardFuncs.active(tmpBoard);
    for(var i = 0;i < tmpActives.length;i++) {
      if(!actives.includes(tmpActives[i])) {
        newActive = tmpActives[i];
      }
    }
  }
  var srcSP = `(${moveObj.start.timeline}T${moveObj.start.turn})`;
  var destSP = `(${moveObj.end.timeline}T${moveObj.end.turn})`;
  var srcPiece = board[src[0]][src[1]][src[2]][src[3]];
  var destPiece = board[dest[0]][dest[1]][dest[2]][dest[3]];
  var isCapturing = Math.abs(destPiece) !== 0;
  var pieceChar = pieceFuncs.toChar(srcPiece, isJump);
  var promotionPieceChar = '';
  if(isPromotion) {
    promotionPieceChar = pieceFuncs.toChar(dest[4]);
  }
  //Notation construction
  if(isJump) {
    res += srcSP;
    res += pieceChar;
    res += this.toSanCoord([src[2], src[3]]);
    res += isBranching ? '>>' : '>';
    res += isCapturing ? 'x' : '';
    res += destSP;
    res += this.toSanCoord([dest[2], dest[3]]);
  }
  else {
    if(superPhysicalToken || !isSingleTimeline) {
      res += srcSP;
    }
    if(isCastling) {
      res += 'O-O';
      if(Math.abs(move[2][3] - move[3][3]) > 2) {
        //Queenside
        res += '-O';
      }
    }
    else {
      res += pieceChar;
      res += this.ambiguousSan(move, board, actionNum);
    }
  }
  if(isPromotion) {
    res += `=${promotionPieceChar}`;
  }
  res += suffix;
  res += isPresentMoving ? '~' : '';
  if(timelineActivationToken && newActive !== null) {
    res += ` (~T${newActive})`;
  }
  if(newTimelineToken && newTimeline !== null) {
    res += ` (>L${newTimeline})`;
  }
  return res;
}

exports.toMove = (moveStr, board = [], actionNum = 0, moveGen = []) => {
  //moveGen here is for pregenerated moves (skipping generating moves again)
  var res = [[0,0,-1,-1],[0,0,-1,-1]];
  //Remove tokens
  var orgMoveStr = moveStr;
  moveStr = moveStr.replace(/\r\n/g, '\n');
  moveStr = moveStr.replace(/\{[^\{\}]*\}/g, '');
  moveStr = moveStr.replace(/;[^;\n]*\n/g, '\n');
  moveStr = moveStr.replace(/\s/g, '');
  moveStr = moveStr.replace(/\(~T\-?\d*\)/g, '');
  moveStr = moveStr.replace(/\(>L\-?\d*\)/g, '');
  //Start move reconstruction
  var isJump = moveStr.includes('>');
  var isTurnZero = board.length > 0 ? (board[0].length > 0 ? board[0][0] === null : false) : false;
  var piece = actionNum % 2 === 0 ? 2 : 1;
  if(isJump) {
    try {
      var srcSP = moveStr.match(/^\(L?\-?\+?\d+T\-?\+?\d+\)/)[0];
      moveStr = moveStr.replace(/^\(L?\-?\+?\d+T\-?\+?\d+\)/, '');
      srcSP = srcSP.replace(/L/g,'');
      var srcSPArr = srcSP.match(/\((\-?\+?\d*)T(\-?\+?\d*)\)/);
      var srcL = Number(srcSPArr[1]);
      var srcT = Number(srcSPArr[2]);
      res[0][0] = Math.abs(srcL) * 2 + (srcL < 0 ? -1 : 0);
      res[0][1] = (srcT - 1) * 2 + (actionNum % 2 === 0 ? 0 : 1);
      if(isTurnZero) {
        res[0][1] += 2;
      }
    }
    catch(err) { throw 'Source super-physical coordinates missing or incorrect!'; }
    var pieceChar = moveStr.match(/^[A-Z]+/);
    if(pieceChar !== null) {
      piece = pieceFuncs.fromChar(pieceChar[0], actionNum);
    }
    moveStr = moveStr.replace(/^[A-Z]+/,'');
    var srcP = this.fromSanCoord(moveStr.match(/^[a-h]\d/)[0]);
    moveStr = moveStr.replace(/^[a-h]\d/,'');
    res[0][2] = srcP[0];
    res[0][3] = srcP[1];
    moveStr = moveStr.replace(/>/g,'');
    moveStr = moveStr.replace(/^x/,'');
    try {
      var destSP = moveStr.match(/^\(L?\-?\+?\d+T\-?\+?\d+\)/)[0];
      moveStr = moveStr.replace(/^\(L?\-?\+?\d+T\-?\+?\d+\)/, '');
      destSP = destSP.replace(/L/g,'');
      var destSPArr = destSP.match(/\((\-?\+?\d*)T(\-?\+?\d*)\)/);
      var destL = Number(destSPArr[1]);
      var destT = Number(destSPArr[2]);
      res[1][0] = Math.abs(destL) * 2 + (destL < 0 ? -1 : 0);
      res[1][1] = (destT - 1) * 2 + (actionNum % 2 === 0 ? 0 : 1);
      if(isTurnZero) {
        res[1][1] += 2;
      }
    }
    catch(err) { throw 'Destination super-physical coordinates missing or incorrect!'; }
    var destP = this.fromSanCoord(moveStr.match(/^[a-h]\d/)[0]);
    res[1][2] = destP[0];
    res[1][3] = destP[1];
  }
  else {
    try {
      var srcSP = moveStr.match(/^\(L?\-?\+?\d+T\-?\+?\d+\)/)[0];
      moveStr = moveStr.replace(/^\(L?\-?\+?\d+T\-?\+?\d+\)/, '');
      srcSP = srcSP.replace(/L/g,'');
      var srcSPArr = srcSP.match(/\((\-?\+?\d*)T(\-?\+?\d*)\)/);
      var srcL = Number(srcSPArr[1]);
      var srcT = Number(srcSPArr[2]);
      res[0][0] = Math.abs(srcL) * 2 + (srcL < 0 ? -1 : 0);
      res[0][1] = (srcT - 1) * 2 + (actionNum % 2 === 0 ? 0 : 1);
      if(isTurnZero) {
        res[0][1] += 2;
      }
    }
    catch(err) {
      if(board.length >= 1) {
        if(board[0].length > 0) {
          res[0][1] = (board[0].length - 1);
        }
      }
    }
    res[1][0] = res[0][0];
    res[1][1] = res[0][1];
    if(moveStr.includes('O-O')) {
      //TODO rework castling for non 8x8 boards
      if(actionNum % 2 !== 0) {
        res[0][2] = 7;
        res[1][2] = 7;
      }
      else {
        res[0][2] = 0;
        res[1][2] = 0;
      }
      res[0][3] = 4;
      if(moveStr.includes('O-O-O')) {
        res[1][3] = 2;
      }
      else {
        res[1][3] = 6;
      }
    }
    else {
      var pieceChar = moveStr.match(/^[A-Z]+/);
      if(pieceChar !== null) {
        piece = pieceFuncs.fromChar(pieceChar[0], actionNum);
      }
      moveStr = moveStr.replace(/^[A-Z]+/,'');
      var coordArr = moveStr.match(/^([a-h]?\d?)x?([a-h]\d)/);
      var srcP = this.fromSanCoord(coordArr[1]);
      var destP = this.fromSanCoord(coordArr[2]);
      moveStr = moveStr.replace(/^[a-h]?\d?x?[a-h]\d/,'');
      res[0][2] = srcP[0];
      res[0][3] = srcP[1];
      res[1][2] = destP[0];
      res[1][3] = destP[1];
    }
  }
  var moves = moveGen;
  if(moves.length <= 0) {
    moves = boardFuncs.moves(board, actionNum, false, false);
  }
  var conflictMoves = [];
  for(var i = 0;i < moves.length;i++) {
    if(
      res[0][0] === moves[i][0][0] &&
      res[0][1] === moves[i][0][1] &&
      res[1][0] === moves[i][1][0] &&
      res[1][1] === moves[i][1][1] &&
      res[1][2] === moves[i][1][2] &&
      res[1][3] === moves[i][1][3]
    ) {
      if(
        res[0][2] === moves[i][0][2] &&
        res[0][3] === moves[i][0][3]
      ) {
        return moves[i];
      }
      if(piece === Math.abs(board[moves[i][0][0]][moves[i][0][1]][moves[i][0][2]][moves[i][0][3]])) {
        conflictMoves.push(moves[i]);
      }
    }
  }
  var sameRank = res[0][2] < 0;
  var sameFile = res[0][3] < 0;
  for(var i = 0;i < conflictMoves.length;i++) {
    if(sameRank && sameFile) {
      //No ambiguity
      return conflictMoves[i];
    }
    else if(!sameRank && sameFile) {
      if(conflictMoves[i][0][2] === res[0][2]) {
        return conflictMoves[i];
      }
    }
    else if(sameRank && !sameFile) {
      if(conflictMoves[i][0][3] === res[0][3]) {
        return conflictMoves[i];
      }
    }
  }
  if(moves.length > 0) {
    console.error('Error occurred with this move: ' + orgMoveStr);
    console.error(res);
    throw 'No valid move found';
  }
  if(sameRank) {
    res[0][2] = 0;
  }
  if(sameFile) {
    res[0][3] = 0;
  }
  return res;
}

exports.fromAction = (action, board = [], actionNum = 0, suffix = '', timelineActivationToken = true, newTimelineToken = true, superPhysicalToken = false) => {
  var res = '';
  var tmpBoard = boardFuncs.copy(board);
  for(var i = 0;i < action.length;i++) {
    res += this.fromMove(action[i], tmpBoard, actionNum, i + 1 === action.length ? suffix : '', timelineActivationToken, newTimelineToken, superPhysicalToken);
    if(i + 1 < action.length) {
      res += ' ';
    }
    boardFuncs.move(tmpBoard, action[i]);
  }
  return res;
}

exports.toAction = (actionStr, board = [], actionNum = 0) => {
  var tmpStr = '' + actionStr;
  tmpStr = tmpStr.replace(/\r\n/g, '\n');
  tmpStr = tmpStr.replace(/\{[^\{\}]*\}/g, '');
  tmpStr = tmpStr.replace(/;[^;\n]*\n/g, '\n');
  tmpStr = tmpStr.replace(/\(~T\-?\d*\)/g, '');
  tmpStr = tmpStr.replace(/\(>L\-?\d*\)/g, '');
  tmpStr = tmpStr.replace(/\s+/g, ' ');
  var splitArr = tmpStr.split(' ');
  var res = [];
  var tmpBoard = boardFuncs.copy(board);
  for(var i = 0;i < splitArr.length;i++) {
    if(splitArr[i].length > 0) {
      var currMove = this.toMove(splitArr[i], tmpBoard, actionNum);
      res.push(currMove);
      boardFuncs.move(tmpBoard, currMove);
    }
  }
  return res;
}

exports.fromActionHistory = (actionHistory, startingBoard = [], startingActionNum = 0, delimiter = '\n', suffixArr = [], timelineActivationToken = true, newTimelineToken = true, superPhysicalToken = false) => {
  var tmpBoard = boardFuncs.copy(startingBoard);
  var tmpActionNum = startingActionNum;
  var res = '';
  for(var i = 0;i < actionHistory.length;i++) {
    if(tmpActionNum % 2 === 0) {
      res += (Math.floor(tmpActionNum/2) + 1) + '. ';
    }
    else {
      res += ' / ';
    }
    var currAction = this.fromAction(actionHistory[i], tmpBoard, tmpActionNum, suffixArr[i] ? suffixArr[i] : '', timelineActivationToken, newTimelineToken, superPhysicalToken);
    res += currAction;
    if(tmpActionNum % 2 !== 0 && i + 1 < actionHistory.length) {
      res += delimiter;
    }
    for(var j = 0;j < actionHistory[i].length;j++) {
      boardFuncs.move(tmpBoard, actionHistory[i][j]);
    }
    tmpActionNum++;
  }
  return res;
}

exports.toActionHistory = (actionHistoryStr, startingBoard = [], startingActionNum = 0) => {
  var tmpBoard = boardFuncs.copy(startingBoard);
  var tmpActionNum = startingActionNum;
  var tmpStr = '' + actionHistoryStr;
  tmpStr = tmpStr.replace(/\r\n/g, '\n');
  tmpStr = tmpStr.replace(/\{[^\{\}]*\}/g, '');
  tmpStr = tmpStr.replace(/;[^;\n]*\n/g, '\n');
  var splitArr = [];
  var res = [];
  var done = false;
  while(!done) {
    var match1 = tmpStr.match(/\d+\.\s*/i);
    if(match1 === null) {
      return '';
    }
    tmpStr = tmpStr.substring(match1.index + match1[0].length);
    var match2 = tmpStr.match(/\d+\.\s*/i);
    if(match2 !== null) {
      splitArr.push(tmpStr.substring(0, match2.index - 1).split('/'));
      tmpStr = tmpStr.substring(match2.index);
    }
    else {
      splitArr.push(tmpStr.split('/'));
      done = true;
    }
  }
  splitArr = splitArr.flat(1);
  for(var i = 0;i < splitArr.length;i++) {
    var currAction = this.toAction(splitArr[i], tmpBoard, tmpActionNum);
    res.push(currAction);
    for(var j = 0;j < currAction.length;j++) {
      boardFuncs.move(tmpBoard, currAction[j]);
    }
    tmpActionNum++;
  }
  return res;
}