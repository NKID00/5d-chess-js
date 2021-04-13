require('module-alias/register');

const boardFuncs = require('@local/board');
const notationFuncs = require('@local/notation');
const pgnFuncs = require('@local/pgn');
const parseFuncs = require('@local/parse');
const validateFuncs = require('@local/validate');

exports.board = (input) => {
  /*
    Supported input:
     - 4D Array (raw board)
     - Board object
     - JSON of either above
  */
  var res = [];
  var tmp = input;
  if(typeof input === 'string') {
    tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
  }
  if(Array.isArray(tmp)) {
    res = boardFuncs.copy(tmp);
  }
  else {
    res = parseFuncs.toBoard(tmp);
  }
  return res;
}

exports.actions = (input, startingBoard = [], startingActionNum = [], promotionPieces = null) => {
  /*
    Supported input:
     - 2D Array of moves (raw or object)
     - Array of action object
     - JSON of either above
     - Multiple actions as expressed in notation / pgn
  */
  var res = [];
  if(typeof input === 'string') {
    input = input.split('\n').map(e => e.trim()).filter(e => !e.startsWith('[') && e).join('\n').trim();
    var tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
    if(tmp === null) {
      try {
        tmp = pgnFuncs.toActionHistory(input, startingBoard, startingActionNum, promotionPieces);
        if(tmp.length <= 0 && input.length > 0) {
          tmp = null;
          throw 'No pgn actions found';
        }
      }
      catch(err) {
        console.warn('Error parsing as pgn, trying old notation: ' + err);
        if (err instanceof Error) {
          console.error(err);
        }
      }
    }
    if(tmp === null) {
      var splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').map(e => e.trim()).filter(e => !e.includes('[') && e !== '');
      var tmpAction = [];
      var tmpCurrAction = null;
      for(var i = 0;i < splitStr.length;i++) {
        if(splitStr[i].length > 0) {
          var tmpNotation = {};
          try {
            if(validateFuncs.notation(splitStr[i])) {
              tmpNotation = notationFuncs.moveNotation(null, 0, splitStr[i]);
            }
            else {
              console.error('Line is not considered notation: ' + splitStr[i]);
            }
          }
          catch(err) {
            console.error(err);
            throw 'Notation invalid and an error has occurred at line: ' + splitStr[i];
          }
          if(tmpCurrAction === null) {
            tmpCurrAction = tmpNotation.action;
          }
          if(tmpNotation.action > tmpCurrAction) {
            if(tmpAction.length > 0) {
              res.push(tmpAction);
              tmpAction = [];
            }
            tmpCurrAction = tmpNotation.action;
          }
          tmpAction.push(tmpNotation.arr);
        }
      }
      if(tmpAction.length > 0) {
        res.push(tmpAction);
      }
    }
    else {
      input = tmp;
    }
  }
  if(Array.isArray(input)) {
    var tmpBoard = boardFuncs.copy(startingBoard);
    var tmpActionNum = startingActionNum;
    for(var i = 0;i < input.length;i++) {
      res.push(this.action(input[i], tmpBoard, tmpActionNum));
      for(var j = 0;j < input[i].length;j++) {
        boardFuncs.move(tmpBoard, input[i][j]);
      }
      tmpActionNum++;
    }
  }
  return res;
}

exports.action = (input, board = [], actionNum = 0, promotionPieces = null) => {
  /*
    Supported input:
     - Array of moves (raw or object)
     - Action object
     - JSON of either above
     - Single action as expressed in notation
  */
  var res = [];
  var isTurnZero = boardFuncs.isTurnZero(board);
  if(typeof input === 'string') {
    var tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
    if(tmp === null) {
      try {
        tmp = pgnFuncs.toAction(input, board, actionNum, promotionPieces);
      }
      catch(err) {
        console.warn('Error parsing as pgn, trying old notation: ' + err);
        if (err instanceof Error) {
          console.error(err);
        }
      }
    }
    if(tmp === null) {
      var splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
      var tmpAction = [];
      for(var i = 0;i < splitStr.length;i++) {
        if(splitStr[i].length > 0) {
          var tmpNotation = {};
          try {
            if(validateFuncs.notation(splitStr[i])) {
              tmpNotation = notationFuncs.moveNotation(null, 0, splitStr[i]);
            }
            else {
              console.error('Line is not considered notation: ' + splitStr[i]);
            }
          }
          catch(err) {
            console.error(err);
            throw 'Notation invalid and an error has occurred at line: ' + splitStr[i];
          }
          tmpAction.push(tmpNotation.arr);
        }
      }
      if(tmpAction.length > 0) {
        res = tmpAction;
      }
    }
    else {
      input = tmp;
    }
  }
  if(!Array.isArray(input) && typeof input === 'object') {
    input = input.moves;
  }
  if(Array.isArray(input)) {
    if(input.length > 0 && !Array.isArray(input[0])) {
      for(var i = 0;i < input.length;i++) {
        res.push(parseFuncs.toMove(input[i], isTurnZero));
      }
    }
    else {
      res = input;
    }
  }
  return res;
}

exports.move = (input, board = [], actionNum = 0, promotionPieces = null) => {
  /*
    Supported input:
     - Move (raw or object)
     - JSON of either above
     - Single move as expressed in notation
  */
  var res = [];
  var isTurnZero = boardFuncs.isTurnZero(board);
  if(typeof input === 'string') {
    var tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
    if(tmp === null) {
      try {
        tmp = pgnFuncs.toMove(input, board, actionNum, [], promotionPieces);
      }
      catch(err) {
        console.warn('Error parsing as pgn, trying old notation: ' + err);
        if (err instanceof Error) {
          console.error(err);
        }
      }
    }
    if(tmp === null) {
      var splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
      if(splitStr.length > 0) {
        if(validateFuncs.notation(splitStr[0])) {
          res = notationFuncs.moveNotation(null, 0, splitStr[0]).arr;
        }
      }
    }
    else {
      input = tmp;
    }
  }
  if(Array.isArray(input)) {
    res = input;
  }
  else if(typeof input === 'object') {
    res = parseFuncs.toMove(input, isTurnZero);
  }
  return res;
}
