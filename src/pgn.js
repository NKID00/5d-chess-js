const boardFuncs = require('@local/board');
const parseFuncs = require('@local/parse');
const pieceFuncs = require('@local/piece');
const validateFuncs = require('@local/validate');
// const copyFuncs = require('@local/copy');
// const { action } = require('./convert');

exports.toSanCoord = (point) => {

  return String.fromCharCode(point[1] + 97) + (point[0] + 1);
}

exports.fromSanCoord = (str) => {

  const match = str.match(/^([a-h]?)(\d?)/);

  return [
    match[2].length > 0 ? Number(match[2]) - 1 : -1,
    match[1].length > 0 ? match[1].charCodeAt(0) - 97 : -1
  ];
}

exports.ambiguousSan = (move, fullBoard, actionNum = 0, moveGen = [], promotionPieces = null) => {

  //moveGen here is for pre-generated moves (skipping generating moves again)
  const src = move[0];
  const dest = move[1];
  const piece = Math.abs(fullBoard[src[0]][src[1]][src[2]][src[3]]);
  const destPiece = fullBoard[dest[0]][dest[1]][dest[2]][dest[3]];

  let moves = (moveGen.length <= 0) ? boardFuncs.moves(fullBoard, actionNum, false, false, promotionPieces) : moveGen

  let conflict = false;
  let sameRank = false;
  let sameFile = false;
  let res = '';

  for (const possibleMove of moves) {
    if (validateFuncs.compareMove(move, possibleMove) == 0 || possibleMove.length > 3) continue;

    let currSrc = possibleMove[0];
    let currDest = possibleMove[1];
    let currPiece = Math.abs(fullBoard[currSrc[0]][currSrc[1]][currSrc[2]][currSrc[3]]);

    if (piece != currPiece) continue;

    if (
      src[0] == currSrc[0] &&
      src[1] == currSrc[1] &&
      dest[0] == currDest[0] &&
      dest[1] == currDest[1] &&
      dest[2] == currDest[2] &&
      dest[3] == currDest[3]
    ) {

      if (src[2] == currSrc[2]) sameRank = true;

      if (src[3] == currSrc[3]) sameFile = true;

      conflict = true;
    }
  }

  if (conflict) {
    if (!sameFile) {

      res += this.toSanCoord([src[2], src[3]])[0];

    } else if (sameFile && !sameRank) {

      res += this.toSanCoord([src[2], src[3]])[1];

    } else if (sameFile && sameRank) {

      res += this.toSanCoord([src[2], src[3]]);
    }
  }

  if (Math.abs(destPiece) != 0 || move.length == 3) {
    if ((Math.abs(piece) == 1 || Math.abs(piece) == 2) && !conflict) {

      res += this.toSanCoord([src[2], src[3]])[0];

    }

    res += 'x';
  }

  res += this.toSanCoord([dest[2], dest[3]]);

  return res;
}

exports.fromMove = (move, fullBoard = [], actionNum = 0, suffix = '', timelineActivationToken = true, newTimelineToken = true, superPhysicalToken = false) => {
  const src = move[0];
  const dest = move[1];
  const isTurnZero = boardFuncs.isTurnZero(fullBoard);
  const isEvenTimeline = boardFuncs.isEvenTimeline(fullBoard);
  const moveObj = parseFuncs.fromMove(fullBoard, move, isTurnZero);
  const isSingleTimeline = fullBoard.length <= 1;
  const isTimelineTravel = src[0] !== dest[0];
  const isTimeTravel = src[1] !== dest[1];
  let res = '';

  //Checking if castling needs to be in O-O format
  const isNormalCastling = move.length === 4 && boardFuncs.isNormalCastling(fullBoard);
  // let isEnPassant = move.length === 3;
  const isPromotion = dest.length >= 5;
  const isJump = (isTimelineTravel || isTimeTravel);
  let isPresentMoving = false;
  let isBranching = false;
  let newActivePresent = null;
  let newTimeline = null;

  if (isJump) {
    const tmpBoard = boardFuncs.copy(fullBoard);
    let excludeActive = null;
    let newActive = null;

    boardFuncs.move(tmpBoard, move);

    for (let i = 0; i < tmpBoard.length; i++) {
      if (!Array.isArray(tmpBoard[i]) || Array.isArray(fullBoard[i])) continue;

      isBranching = true;
      newTimeline = i % 2 == 0 ? Math.ceil(i / 2) : -Math.ceil(i / 2);
      excludeActive = i;
    }

    const actives = boardFuncs.active(fullBoard);
    const tmpActives = boardFuncs.active(tmpBoard);

    for (let i = 0; i < tmpActives.length; i++) {

      if (!actives.includes(tmpActives[i]) && tmpActives[i] != excludeActive) newActive = tmpActives[i];
    }

    if (newActive != null && tmpBoard[newActive].length + 1 < tmpBoard[excludeActive].length) {

      newActivePresent = Math.floor((tmpBoard[newActive].length + 1) / 2);
    }

    if (tmpActives.includes(excludeActive)) isPresentMoving = true;

  }

  let srcSP = `(${moveObj.start.timeline}T${moveObj.start.turn})`;
  //Adjust the timeline field for even timelines
  if (isEvenTimeline) {

    if (moveObj.start.timeline < -1) {

      srcSP = `(${moveObj.start.timeline + 1}T${moveObj.start.turn})`;

    } else if (moveObj.start.timeline == -1) {

      srcSP = `(-0T${moveObj.start.turn})`;

    } else if (moveObj.start.timeline == 1) {

      srcSP = `(+0T${moveObj.start.turn})`;

    } else {

      srcSP = `(${moveObj.start.timeline - 1}T${moveObj.start.turn})`;
    }
  }

  let destSP = `(${moveObj.end.timeline}T${moveObj.end.turn})`;
  //Adjust the timeline field for even timelines
  if (isEvenTimeline) {

    if (moveObj.end.timeline < -1) {

      destSP = `(${moveObj.end.timeline + 1}T${moveObj.end.turn})`;

    } else if (moveObj.end.timeline === -1) {

      destSP = `(-0T${moveObj.end.turn})`;

    } else if (moveObj.end.timeline === 1) {

      destSP = `(+0T${moveObj.end.turn})`;

    } else {

      destSP = `(${moveObj.end.timeline - 1}T${moveObj.end.turn})`;
    }
  }

  const srcPiece = fullBoard[src[0]][src[1]][src[2]][src[3]];
  const destPiece = fullBoard[dest[0]][dest[1]][dest[2]][dest[3]];
  const isCapturing = Math.abs(destPiece) !== 0;
  const pieceChar = pieceFuncs.toChar(srcPiece, isJump);
  let promotionPieceChar = '';

  if (isPromotion) promotionPieceChar = pieceFuncs.toChar(dest[4]);

  //Notation construction
  if (isJump) {

    res += srcSP;
    res += pieceChar;
    res += this.toSanCoord([src[2], src[3]]);
    res += isBranching ? '>>' : '>';
    res += isCapturing ? 'x' : '';
    res += destSP;
    res += this.toSanCoord([dest[2], dest[3]]);

  } else {

    if (superPhysicalToken || !isSingleTimeline) res += srcSP;

    if (isNormalCastling) {

      res += 'O-O';

      if (Math.abs(move[2][3] - move[3][3]) > 2) {
        //Queenside
        res += '-O';
      }

    } else {

      res += pieceChar;
      if(Math.abs(srcPiece)>2){
        res += this.ambiguousSan(move, fullBoard, actionNum, [], null);
      }
    }
  }

  if (isPromotion) res += `=${promotionPieceChar}`;

  res += suffix;
  res += isPresentMoving ? '~' : '';

  if (timelineActivationToken && newActivePresent !== null) res += ` (~T${newActivePresent})`;

  if (newTimelineToken && newTimeline != null) res += ` (>L${newTimeline})`;

  return res;
}

exports.toMove = (moveStr, fullBoard = [], actionNum = 0, moveGen = [], promotionPieces = null) => {
  //moveGen here is for pre-generated moves (skipping generating moves again)
  let res = [[0, 0, -1, -1], [0, 0, -1, -1]];

  //Remove tokens
  const orgMoveStr = moveStr;

  moveStr = moveStr.replace(/\r\n/g, '\n');
  moveStr = moveStr.replace(/\{[^\{\}]*\}/g, '');
  moveStr = moveStr.replace(/;[^;\n]*\n/g, '\n');
  moveStr = moveStr.replace(/\s/g, '');
  moveStr = moveStr.replace(/\(~T\-?\d*\)/g, '');
  moveStr = moveStr.replace(/\(>L\-?\d*\)/g, '');

  //Start move reconstruction
  const isJump = moveStr.includes('>');
  const isTurnZero = boardFuncs.isTurnZero(fullBoard);
  const isEvenTimeline = boardFuncs.isEvenTimeline(fullBoard);
  let piece = actionNum % 2 == 0 ? 2 : 1;

  if (isJump) {
    try {
      let srcSP = moveStr.match(/^\(L?\-?\+?\d+T\-?\+?\d+\)/)[0];

      moveStr = moveStr.replace(/^\(L?\-?\+?\d+T\-?\+?\d+\)/, '');

      srcSP = srcSP.replace(/L/g, '');

      let srcSPArr = srcSP.match(/\((\-?\+?\d*)T(\-?\+?\d*)\)/);

      let srcL = Number(srcSPArr[1]);

      //Adjust extracted timeline if in even timeline mode
      if (isEvenTimeline) {

        if (srcSPArr[1] == '-0') {

          srcL = -1;

        } else if (srcSPArr[1] == '+0') {

          srcL = 1;

        } else if (srcL < 0) {

          srcL--;

        } else if (srcL > 0) {

          srcL++;
        }
      }

      const srcT = Number(srcSPArr[2]);

      res[0][0] = Math.abs(srcL) * 2 + (srcL < 0 ? -1 : 0);

      res[0][1] = (srcT - 1) * 2 + (actionNum % 2 === 0 ? 0 : 1);

      if (isTurnZero) res[0][1] += 2;

    } catch (err) { throw new Error('Source super-physical coordinates missing or incorrect!'); }

    const pieceChar = moveStr.match(/^[A-Z]+/);

    if (pieceChar != null) {

      piece = pieceFuncs.fromChar(pieceChar[0], actionNum);
    }

    moveStr = moveStr.replace(/^[A-Z]+/, '');

    const srcP = this.fromSanCoord(moveStr.match(/^[a-h]\d/)[0]);

    moveStr = moveStr.replace(/^[a-h]\d/, '');

    res[0][2] = srcP[0];
    res[0][3] = srcP[1];

    moveStr = moveStr.replace(/>/g, '');
    moveStr = moveStr.replace(/^x/, '');

    try {
      let destSP = moveStr.match(/^\(L?\-?\+?\d+T\-?\+?\d+\)/)[0];

      moveStr = moveStr.replace(/^\(L?\-?\+?\d+T\-?\+?\d+\)/, '');

      destSP = destSP.replace(/L/g, '');

      const destSPArr = destSP.match(/\((\-?\+?\d*)T(\-?\+?\d*)\)/);
      let destL = Number(destSPArr[1]);

      //Adjust extracted timeline if in even timeline mode
      if (isEvenTimeline) {
        if (destSPArr[1] == '-0') {
          destL = -1;
        }
        else if (destSPArr[1] == '+0') {
          destL = 1;
        }
        else if (destL < 0) {
          destL--;
        }
        else if (destL > 0) {
          destL++;
        }
      }

      const destT = Number(destSPArr[2]);

      res[1][0] = Math.abs(destL) * 2 + (destL < 0 ? -1 : 0);
      res[1][1] = (destT - 1) * 2 + (actionNum % 2 == 0 ? 0 : 1);

      if (isTurnZero) res[1][1] += 2;
    } catch (err) { throw new Error('Destination super-physical coordinates missing or incorrect!'); }

    const destP = this.fromSanCoord(moveStr.match(/^[a-h]\d/)[0]);

    res[1][2] = destP[0];
    res[1][3] = destP[1];
  } else {
    try {

      const srcSP = moveStr.match(/^\(L?\-?\+?\d+T\-?\+?\d+\)/)[0].replace(/L/g, '');;
      const srcSPArr = srcSP.match(/\((\-?\+?\d*)T(\-?\+?\d*)\)/);

      moveStr = moveStr.replace(/^\(L?\-?\+?\d+T\-?\+?\d+\)/, '');

      let srcL = Number(srcSPArr[1]);

      //Adjust extracted timeline if in even timeline mode
      if (isEvenTimeline) {

        if (srcSPArr[1] == '-0') {

          srcL = -1;

        } else if (srcSPArr[1] == '+0') {

          srcL = 1;

        } else if (srcL < 0) {

          srcL--;

        } else if (srcL > 0) {

          srcL++;
        }
      }

      const srcT = Number(srcSPArr[2]);

      res[0][0] = Math.abs(srcL) * 2 + (srcL < 0 ? -1 : 0);
      res[0][1] = (srcT - 1) * 2 + (actionNum % 2 === 0 ? 0 : 1);

      if (isTurnZero) res[0][1] += 2;

    } catch (err) {
      if (fullBoard.length >= 1 && fullBoard[0].length > 0) {
        res[0][1] = (fullBoard[0].length - 1);
      }
    }

    res[1][0] = res[0][0];
    res[1][1] = res[0][1];

    if (moveStr.includes('O-O')) {
      if (actionNum % 2 !== 0) {
        res[0][2] = 7;
        res[1][2] = 7;
      } else {
        res[0][2] = 0;
        res[1][2] = 0;
      }

      res[0][3] = 4;

      if (moveStr.includes('O-O-O')) {

        res[1][3] = 2;

      } else {

        res[1][3] = 6;
      }
    } else {

      let pieceChar = moveStr.match(/^[A-Z]+/);
      if (pieceChar !== null) {
        piece = pieceFuncs.fromChar(pieceChar[0], actionNum);
      }
      moveStr = moveStr.replace(/^[A-Z]+/, '');
      let coordArr = moveStr.match(/^([a-h]?\d?)x?([a-h]\d)/);
      let srcP = this.fromSanCoord(coordArr[1]);
      let destP = this.fromSanCoord(coordArr[2]);
      moveStr = moveStr.replace(/^[a-h]?\d?x?[a-h]\d/, '');
      res[0][2] = srcP[0];
      res[0][3] = srcP[1];
      res[1][2] = destP[0];
      res[1][3] = destP[1];
    }
  }

  const promotionChar = moveStr.match(/^=([A-Z])+/);

  if (promotionChar != null) {

    moveStr = moveStr.slice(promotionChar[0].length);
    res[1][4] = pieceFuncs.fromChar(promotionChar[1], actionNum);
  }

  let moves = moveGen;

  if (moves.length <= 0) {
    moves = boardFuncs.moves(fullBoard, actionNum, false, false, false, promotionPieces);
  }

  let conflictMoves = [];

  for (let i = 0; i < moves.length; i++) {
    if (
      res[0][0] != moves[i][0][0] ||
      res[0][1] != moves[i][0][1] ||
      res[1][0] != moves[i][1][0] ||
      res[1][1] != moves[i][1][1] ||
      res[1][2] != moves[i][1][2] ||
      res[1][3] != moves[i][1][3] ||
      (res[1][4] != undefined && Math.abs(res[1][4]) != Math.abs(moves[i][1][4]))
    ) continue;

    if (res[0][2] == moves[i][0][2] && res[0][3] == moves[i][0][3]) return moves[i];

    if (piece == Math.abs(fullBoard[moves[i][0][0]][moves[i][0][1]][moves[i][0][2]][moves[i][0][3]])) {
      conflictMoves.push(moves[i]);
    }
  }

  const sameRank = res[0][2] < 0;
  const sameFile = res[0][3] < 0;

  for (let i = 0; i < conflictMoves.length; i++) {

    //no ambiguity
    if (sameRank && sameFile) return conflictMoves[i];

    if (!sameRank && sameFile && conflictMoves[i][0][2] == res[0][2]) return conflictMoves[i];

    if (sameRank && !sameFile && conflictMoves[i][0][3] == res[0][3]) return conflictMoves[i];
  }

  if (moves.length > 0) {
    throw new Error('No valid move found! Error occurred with this move: ' + orgMoveStr);
  }

  if (sameRank) res[0][2] = 0;

  if (sameFile) res[0][3] = 0;

  return res;
}

exports.fromAction = (action, board = [], actionNum = 0, suffix = '', timelineActivationToken = true, newTimelineToken = true, superPhysicalToken = false) => {
  let res = '';
  const tmpBoard = boardFuncs.copy(board);

  for (let i = 0; i < action.length; i++) {
    res += this.fromMove(action[i], tmpBoard, actionNum, i + 1 === action.length ? suffix : '', timelineActivationToken, newTimelineToken, superPhysicalToken);

    if (i + 1 < action.length) res += ' ';

    boardFuncs.move(tmpBoard, action[i]);
  }

  return res;
}

exports.toAction = (actionStr, board = [], actionNum = 0, promotionPieces = null) => {
  let tmpStr = '' + actionStr;

  tmpStr = tmpStr.replace(/\r\n/g, '\n');
  tmpStr = tmpStr.replace(/\{[^\{\}]*\}/g, '');
  tmpStr = tmpStr.replace(/;[^;\n]*\n/g, '\n');
  tmpStr = tmpStr.replace(/\(~T\-?\d*\)/g, '');
  tmpStr = tmpStr.replace(/\(>L\-?\d*\)/g, '');
  tmpStr = tmpStr.replace(/\s+/g, ' ');

  const splitArr = tmpStr.split(' ');

  let res = [];
  const tmpBoard = boardFuncs.copy(board);

  for (let i = 0; i < splitArr.length; i++) {
    if (splitArr[i].length <= 0) continue;

    const currMove = this.toMove(splitArr[i], tmpBoard, actionNum, [], promotionPieces);

    res.push(currMove);

    boardFuncs.move(tmpBoard, currMove);

  }

  return res;
}

exports.fromActionHistory = (actionHistory, startingBoard = [], startingActionNum = 0, delimiter = '\n', suffixArr = [], timelineActivationToken = true, newTimelineToken = true, superPhysicalToken = false) => {
  const tmpBoard = boardFuncs.copy(startingBoard);
  let tmpActionNum = startingActionNum;
  let res = '';

  for (let i = 0; i < actionHistory.length; i++) {

    if (tmpActionNum % 2 == 0) {

      res += (Math.floor(tmpActionNum / 2) + 1) + '. ';

    } else {
      res += ' / ';
    }

    const currAction = this.fromAction(actionHistory[i], tmpBoard, tmpActionNum, suffixArr[i] ? suffixArr[i] : '', timelineActivationToken, newTimelineToken, superPhysicalToken);

    res += currAction;

    if (tmpActionNum % 2 !== 0 && i + 1 < actionHistory.length) {
      res += delimiter;
    }

    for (let j = 0; j < actionHistory[i].length; j++) {
      boardFuncs.move(tmpBoard, actionHistory[i][j]);
    }

    tmpActionNum++;
  }

  return res;
}

exports.toActionHistory = (actionHistoryStr, startingBoard = [], startingActionNum = 0, promotionPieces = null) => {
  const tmpBoard = boardFuncs.copy(startingBoard);
  let tmpActionNum = startingActionNum;
  let tmpStr = '' + actionHistoryStr;

  tmpStr = tmpStr.replace(/\r\n/g, '\n');
  tmpStr = tmpStr.replace(/\[[^\[\]]*\]/g, '');
  tmpStr = tmpStr.replace(/\{[^\{\}]*\}/g, '');
  tmpStr = tmpStr.replace(/;[^;\n]*\n/g, '\n');

  let splitArr = [];
  let res = [];
  let done = false;

  while (!done) {

    const match1 = tmpStr.match(/\d+\.\s*/i);

    if (match1 == null) return '';

    tmpStr = tmpStr.substring(match1.index + match1[0].length);

    const match2 = tmpStr.match(/\d+\.\s*/i);

    if (match2 != null) {

      splitArr.push(tmpStr.substring(0, match2.index - 1).split('/'));

      tmpStr = tmpStr.substring(match2.index);

    } else {
      splitArr.push(tmpStr.split('/'));

      done = true;
    }
  }

  splitArr = splitArr.flat(1);

  for (let i = 0; i < splitArr.length; i++) {
    if (!splitArr[i].trim()) continue;

    let currAction = this.toAction(splitArr[i], tmpBoard, tmpActionNum, promotionPieces);

    res.push(currAction);

    for (let j = 0; j < currAction.length; j++) {
      boardFuncs.move(tmpBoard, currAction[j]);
    }

    tmpActionNum++;
  }

  return res;
}
