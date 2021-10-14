require('module-alias/register');

const boardFuncs = require('@local/board');
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

          throw new Error('No pgn actions found');

        }

      } catch (err) {

        throw new Error('Notation invalid and an error has occurred with string: ' + actions);

      }
    }

    if(tmp !== null) {
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

        throw new Error('Notation invalid and an error has occurred with string: ' + input);

      }
    }

    if(tmp !== null) {
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

        throw new Error('Notation invalid and an error has occurred with string: ' + input);

      }
    }

    if(tmp !== null) {
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