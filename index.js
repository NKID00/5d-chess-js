require('module-alias/register');

const deepcopy = require('deep-copy');
const boardFuncs = require('@local/board');
const pieceFuncs = require('@local/piece');
const actionFuncs = require('@local/action');
const printFuncs = require('@local/print');
const notationFuncs = require('@local/notation');
const validateFuncs = require('@local/validate');

exports = class {
  constructor() {
    this.currentBoard = boardFuncs.init();
    this.boardHistory = [this.currentBoard];
    this.moveBuffer = [];
    this.currentAction = 0;
  }
  reset() {
    this.currentBoard = boardFuncs.init();
    this.boardHistory = [this.currentBoard];
    this.moveBuffer = [];
    this.currentAction = 0;
  }
  convert(input) {
    var actions = [];
    if(Array.isArray(input)) {
      actions = deepcopy(input);
    }
    try {
      actions = JSON.parse(input);
    }
    catch(err) {
      if(typeof input === 'string') {
        var splitStr = input.replace(/\r\n/g, '\n').split('\n');
        var tmpCurrAction = 0;
        var tmpBoard = boardFuncs.init();
        var tmpAction = [];
        for(var i = 0;i < splitStr.length;i++) {
          if(!notationFuncs.notation(splitStr[i])) {
            throw 'Notation invaild and an error has occurred at line: ' + splitStr[i];
          }
          var tmpNotation = notationFuncs.moveNotation(tmpBoard, tmpCurrAction, splitStr[i]);
          if(tmpNotation.action > tmpCurrAction) {
            if(tmpAction.length > 0) {
              actions.push(tmpAction);
              tmpAction = [];
            }
            tmpCurrAction = tmpNotation.action;
          }
          else if(tmpNotation.action < tmpCurrAction) {
            throw 'Input order has been tampered and an error has occurred at line: ' + splitStr[i];
          }
          tmpAction.push(tmpNotation.arr);
        }
      }
      else {
        throw 'Input not recognized. Input should be an Array, JSON string of an array, or notation string delimited by newlines.';
      }
    }
    return actions;
  }
  import(input) {
    var actions = this.convert(input);
    for(var i = 0;i < actions.length;i++) {
      this.action(actions[i]);
    }
  }
  action(input) {
    var moves = [];
    if(Array.isArray(input)) {
      moves = deepcopy(input);
    }
    try {
      moves = JSON.parse(input);
    }
    catch(err) {
      moves = this.convert(input)[0];
    }
    var tmpCurrAction = this.currentAction;
    var tmpBoard = boardFuncs.copy(this.currentBoard);
    for(var i = 0;i < moves.length;i++) {
      if(!validateFuncs.move(tmpBoard, tmpCurrAction, moves[i])) {
        throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.notation(moves[i]).str;
      }
      boardFuncs.move(tmpBoard, moves[i]);
    }
    if(boardFuncs.present(tmpBoard, tmpCurrAction).length > 0) {
      throw 'Action is not complete, more moves are needed';
    }
    else {
      this.currentBoard = tmpBoard;
      this.boardHistory.push(this.currentBoard);
      this.currentAction++;
    }
  }
  move(input) {
    var move = [];
    if(Array.isArray(input)) {
      move = deepcopy(input);
    }
    try {
      move = JSON.parse(input);
    }
    catch(err) {
      move = this.convert(input)[0][0];
    }
    var tmpCurrAction = this.currentAction;
    var tmpBoard = boardFuncs.copy(this.currentBoard);
    if(!validateFuncs.move(tmpBoard, tmpCurrAction, move)) {
      throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.notation(move).str;
    }
    this.moveBuffer.push(move);
    boardFuncs.move(tmpBoard, move);
    this.currentBoard = tmpBoard;
  }
}
