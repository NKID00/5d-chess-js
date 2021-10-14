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
  let res = [];
  let tmp = input;

  if (typeof input === 'string') {
    // tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch (err) { }
  }

  res = (Array.isArray(tmp)) ? boardFuncs.copy(tmp) : parseFuncs.toBoard(tmp);

  return res;
}

exports.actions = (actions, startingBoard = [], startingActionNum = [], promotionPieces = null) => {
  /*
    Supported input:
     - 2D Array of moves (raw or object)
     - Array of action object
     - JSON of either above
     - Multiple actions as expressed in notation / pgn
  */
  let res = [];

  if (typeof actions === 'string') {

    actions = actions.split('\n').map(e => e.trim()).filter(e => !e.startsWith('[') && e).join('\n').trim();

    let tmp = null;

    try {
      tmp = JSON.parse(actions);
    } catch (err) { }

    if (tmp == null) {

      try {

        tmp = pgnFuncs.toActionHistory(actions, startingBoard, startingActionNum, promotionPieces);

        if (tmp.length <= 0 && actions.length > 0) {

          tmp = null;

          throw 'No pgn actions found';

        }

      } catch (err) {

        console.warn('Error parsing as pgn, trying old notation: ' + err);

        if (err instanceof Error) {
          console.error(err);
        }
      }
    }

    if (tmp == null) {
      const splitStr = actions.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').map(e => e.trim()).filter(e => !e.includes('[') && e !== '');
      let currAction = null;
      let action = [];

      for (const string of splitStr) {

        if (string.length <= 0) continue;

        let notation;

        try {

          if (validateFuncs.notation(string)) {

            notation = notationFuncs.moveNotation(null, 0, string);

          } else {

            console.error('Line is not considered notation: ' + string);
          }

        } catch (err) {

          console.error(err);

          throw 'Notation invalid and an error has occurred at line: ' + string;
        }

        if (currAction == null) currAction = notation.action;

        if (notation.action > currAction) {

          if (action.length > 0) {

            res.push(action);

            action = [];

          }

          currAction = notation.action;
        }

        action.push(notation.arr);
      }

      if (action.length > 0) res.push(action);

    } else {

      actions = tmp;
    }
  }

  if (Array.isArray(actions)) {
    const board = boardFuncs.copy(startingBoard);
    let actionNum = startingActionNum;

    for (const action of actions) {

      res.push(this.action(action, board, actionNum));

      for (const move of action) {

        boardFuncs.move(board, move);

      }

      actionNum++;
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
  const isTurnZero = boardFuncs.isTurnZero(board);
  let res = [];

  if (typeof input === 'string') {

    let tmp = null;

    try {
      tmp = JSON.parse(input);
    } catch (err) { }

    if (tmp == null) {

      try {

        tmp = pgnFuncs.toAction(input, board, actionNum, promotionPieces);

      } catch (err) {

        console.warn('Error parsing as pgn, trying old notation: ' + err);

        if (err instanceof Error) {

          console.error(err);
        }
      }

    }

    if (tmp == null) {
      const splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
      let action = [];

      for (const string of splitStr) {

        if (string.length <= 0) continue;

        let notation;

        try {

          if (validateFuncs.notation(string)) {

            notation = notationFuncs.moveNotation(null, 0, string);

          } else {

            console.error('Line is not considered notation: ' + string);
          }

        }
        catch (err) {
          console.error(err);
          throw 'Notation invalid and an error has occurred at line: ' + string;
        }
        action.push(notation.arr);

      }

      if (action.length > 0) res = action;
    } else {
      input = tmp;
    }
  }

  if (!Array.isArray(input) && typeof input == 'object') {

    input = input.moves;
  }

  if (Array.isArray(input)) {

    if (input.length > 0 && !Array.isArray(input[0])) {

      for (const inputted of input) {

        res.push(parseFuncs.toMove(inputted, isTurnZero));
      }

    } else {
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
  const isTurnZero = boardFuncs.isTurnZero(board);
  let res = [];

  if (typeof input === 'string') {

    let tmp = null;

    try {

      tmp = JSON.parse(input);

    } catch (err) { }

    if (tmp == null) {

      try {

        tmp = pgnFuncs.toMove(input, board, actionNum, [], promotionPieces);

      } catch (err) {

        console.warn('Error parsing as pgn, trying old notation: ' + err);

        if (err instanceof Error) {

          console.error(err);
        }
      }
    }

    if (tmp == null) {

      const splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');

      if (splitStr.length > 0 && validateFuncs.notation(splitStr[0])) {
        res = notationFuncs.moveNotation(null, 0, splitStr[0]).arr;
      }

    } else {
      input = tmp;
    }
  }

  if (Array.isArray(input)) {

    res = input;

  } else if (typeof input === 'object') {

    res = parseFuncs.toMove(input, isTurnZero);
  }

  return res;
}