require('module-alias/register');

import * as boardFuncs from './board';
import * as pgnFuncs from './pgn';
import * as parseFuncs from './parse';
import { Action, Move, Board, FullBoard, MoveArray, ActionArray } from './types/chess';
// import * as validateFuncs from './validate';

export function board(input: string | FullBoard | Board): FullBoard {
  /*
    Supported input:
     - 4D Array (raw board)
     - Board object
     - JSON of either above
  */

  let tmp: string | FullBoard | Board = input;

  if (typeof input === 'string') {

    try {
      tmp = JSON.parse(input);
    }
    catch (err) { }
  }

  return (Array.isArray(tmp)) ? boardFuncs.copy(tmp) : parseFuncs.toBoard(tmp as Board);
}

export function actions(actions: string | Move[][] | ActionArray[] | Action[], startingBoard: FullBoard = [], startingActionNum: number, promotionPieces: number[] = null): ActionArray[] {
  /*
    Supported input:
     - 2D Array of moves (raw or object)
     - Array of action object
     - JSON of either above
     - Multiple actions as expressed in notation / pgn
  */

  if (typeof actions === 'string') {

    actions = actions.split('\n').map(e => e.trim()).filter(e => !e.startsWith('[') && e).join('\n').trim();

    let tmp: ActionArray[] | null = null;

    try {
      tmp = JSON.parse(actions);
    } catch (err) { }

    if (tmp == null) {

      try {

        tmp = pgnFuncs.toActionHistory(actions, startingBoard, startingActionNum, promotionPieces) as ActionArray[];

        if (tmp.length <= 0 && actions.length > 0) {

          tmp = null;

          throw new Error('No pgn actions found');

        }

      } catch (err) {

        throw new Error('Notation invalid and an error has occurred with string: ' + actions);

      }
    }

    if (tmp !== null) actions = tmp;
  }

  let newActions: ActionArray[] = [];

  if (Array.isArray(actions)) {
    const fullBoard: FullBoard = boardFuncs.copy(startingBoard);
    let actionNum: number = startingActionNum;

    for (const moveAction of actions) {

      newActions.push(action(moveAction, fullBoard, actionNum));

      for (const moves of moveAction as ActionArray) {

        boardFuncs.move(fullBoard, moves);
      }

      actionNum++;
    }
  }

  return newActions;
}

export function action(input: string | Move[] | ActionArray | Action, fullBoard: FullBoard = [], actionNum: number = 0, promotionPieces: number[] = null): ActionArray {
  /*
    Supported input:
     - Array of moves (raw or object)
     - Action object
     - JSON of either above
     - Single action as expressed in notation
  */

  if (typeof input === 'string') {

    let tmp = null;

    try {
      tmp = JSON.parse(input);
    } catch (err) { }

    if (tmp == null) {

      try {

        tmp = pgnFuncs.toAction(input, fullBoard, actionNum, promotionPieces);

      } catch (err) {

        throw new Error('Notation invalid and an error has occurred with string: ' + input);

      }
    }

    if (tmp !== null) input = tmp;
  }

  if (!Array.isArray(input) && typeof input == 'object') {

    input = input.moves;
  }

  const isTurnZero: boolean = boardFuncs.isTurnZero(fullBoard);
  let action: ActionArray = [];

  if (Array.isArray(input)) {

    if (input.length > 0 && !Array.isArray(input[0])) {

      for (const move of input) {

        action.push(parseFuncs.toMove(move as Move, isTurnZero));
      }

    } else {
      action = input as ActionArray;
    }
  }

  return action;
}

export function move(input: string | Move | MoveArray, fullBoard: FullBoard = [], actionNum: number = 0, promotionPieces: number[] = null): MoveArray {
  /*
    Supported input:
     - Move (raw or object)
     - JSON of either above
     - Single move as expressed in notation
  */

  if (typeof input === 'string') {

    let tmp: null | MoveArray = null;

    try {

      tmp = JSON.parse(input);

    } catch (err) { }

    if (tmp == null) {

      try {

        tmp = pgnFuncs.toMove(input, fullBoard, actionNum, [], promotionPieces);

      } catch (err) {

        throw new Error('Notation invalid and an error has occurred with string: ' + input);

      }
    }

    if (tmp !== null) input = tmp;
  }


  if (Array.isArray(input)) {

    return input;

  } else if (typeof input === 'object') {
    const isTurnZero: boolean = boardFuncs.isTurnZero(fullBoard);

    return parseFuncs.toMove(input, isTurnZero);
  }

  return [[, , , ,], [, , , ,]];
}