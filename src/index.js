require('module-alias/register');

const deepcopy = require('deep-copy');
const boardFuncs = require('@local/board');
const pieceFuncs = require('@local/piece');
const actionFuncs = require('@local/action');
const printFuncs = require('@local/print');
const notationFuncs = require('@local/notation');
const validateFuncs = require('@local/validate');
const mateFuncs = require('@local/mate');

class Chess {
  constructor(input) {
    this.reset();
    if(input !== undefined) {
      this.import(input);
    }
  }
  reset() {
    this.currentBoard = boardFuncs.init();
    this.currentAction = 0;
    this.boardHistory = [this.currentBoard];
    this.actionHistory = [];
    this.moveBuffer = [];
  }
  convert(input) {
    var actions = [];
    if(Array.isArray(input)) {
      actions = deepcopy(input);
    }
    else {
      try {
        actions = JSON.parse(input);
      }
      catch(err) {
        if(typeof input === 'string') {
          var splitStr = input.replace(/\r\n/g, '\n').split('\n');
          var tmpCurrAction = this.currentAction;
          var tmpBoard = boardFuncs.copy(this.currentBoard);
          var tmpAction = [];
          for(var i = 0;i < splitStr.length;i++) {
            var tmpNotation = {};
            try {
              tmpNotation = notationFuncs.moveNotation(tmpBoard, tmpCurrAction, splitStr[i]);
            }
            catch(err) {
              throw 'Notation invalid and an error has occurred at line: ' + splitStr[i];
            }
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
            boardFuncs.move(tmpBoard, tmpNotation.arr);
            tmpAction.push(tmpNotation.arr);
          }
          if(tmpAction.length > 0) {
            actions.push(tmpAction);
          }
        }
        else {
          throw 'Input not recognized. Input should be an Array, JSON string of an array, or notation string delimited by newlines.';
        }
      }
    }
    return actions;
  }
  convertable(input) {
    try {
      this.convert(input);
      return true;
    }
    catch(err) { return false; }
  }
  import(input) {
    this.reset();
    var actions = this.convert(input);
    for(var i = 0;i < actions.length;i++) {
      this.action(actions[i]);
    }
  }
  importable(input) {
    try {
      this.reset();
      var actions = this.convert(input);
      for(var i = 0;i < actions.length;i++) {
        if(!this.actionable(actions[i])) { return false; }
      }
      return true;
    }
    catch(err) { return false; }
  }
  action(input) {
    if(this.inCheckmate()) {
      throw 'Cannot submit, currently in checkmate.';
    }
    if(this.inStalemate()) {
      throw 'Cannot submit, currently in stalemate.';
    }
    var moves = [];
    if(Array.isArray(input)) {
      moves = deepcopy(input);
    }
    else {
      try {
        moves = JSON.parse(input);
      }
      catch(err) {
        moves = this.convert(input)[0];
      }
    }
    var tmpBoard = boardFuncs.copy(this.currentBoard);
    for(var i = 0;i < moves.length;i++) {
      if(!validateFuncs.move(tmpBoard, this.currentAction, moves[i])) {
        throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.currentAction, moves[i]).str;
      }
      boardFuncs.move(tmpBoard, moves[i]);
    }
    if(boardFuncs.present(tmpBoard, this.currentAction).length > 0) {
      throw 'Action is not complete, more moves are needed';
    }
    else {
      this.currentBoard = tmpBoard;
      this.boardHistory.push(this.currentBoard);
      this.actionHistory.push(deepcopy(moves));
      this.currentAction++;
    }
  }
  actions(format = 'object', activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true) {
    var actions = actionFuncs.actions(this.currentBoard, this.currentAction, activeOnly, presentOnly, newActiveTimelinesOnly);
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < actions.length;i++) {
        for(var j = 0;j < actions[i].length;j++) {
          res += notationFuncs.moveNotation(this.currentBoard, this.currentAction, actions[i][j], format.includes('short')).str + '\n';
        }
      }
      return res;
    }
    if(format === 'json') {
      return JSON.stringify(actions);
    }
    return actions;
  }
  actionable(input) {
    try {
      if(this.inCheckmate()) { return false; }
      if(this.inStalemate()) { return false; }
      var moves = [];
      if(Array.isArray(input)) {
        moves = deepcopy(input);
      }
      else {
        try {
          moves = JSON.parse(input);
        }
        catch(err) {
          moves = this.convert(input)[0];
        }
      }
      var tmpCurrAction = this.currentAction;
      var tmpBoard = boardFuncs.copy(this.currentBoard);
      for(var i = 0;i < moves.length;i++) {
        if(!validateFuncs.move(tmpBoard, tmpCurrAction, moves[i])) {
          return false;
        }
        boardFuncs.move(tmpBoard, moves[i]);
      }
      if(boardFuncs.present(tmpBoard, tmpCurrAction).length > 0) {
        return false;
      }
      return true;
    }
    catch(err) { return false; }
  }
  move(input) {
    var move = [];
    if(Array.isArray(input)) {
      move = deepcopy(input);
    }
    else {
      try {
        move = JSON.parse(input);
      }
      catch(err) {
        move = this.convert(input)[0][0];
      }
    }
    var tmpCurrAction = this.currentAction;
    var tmpBoard = boardFuncs.copy(this.currentBoard);
    if(!this.moveable(move)) {
      throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.currentAction, move).str;
    }
    this.moveBuffer.push(move);
    boardFuncs.move(tmpBoard, move);
    this.currentBoard = tmpBoard;
  }
  moves(format = 'object', activeOnly = true, presentOnly = true) {
    if(this.inCheckmate()) { return []; }
    if(this.inStalemate()) { return []; }
    var moves = boardFuncs.moves(this.currentBoard, this.currentAction, activeOnly, presentOnly);
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < moves.length;i++) {
        res += notationFuncs.moveNotation(this.currentBoard, this.currentAction, moves[i], format.includes('short')).str + '\n';
      }
      return res;
    }
    if(format === 'json') {
      return JSON.stringify(moves);
    }
    return moves;
  }
  moveable(input) {
    try {
      if(this.inCheckmate()) { return false; }
      if(this.inStalemate()) { return false; }
      var move = [];
      if(Array.isArray(input)) {
        move = deepcopy(input);
      }
      else {
        try {
          move = JSON.parse(input);
        }
        catch(err) {
          move = this.convert(input)[0][0];
        }
      }
      var tmpBoard = boardFuncs.copy(this.currentBoard);
      return validateFuncs.move(tmpBoard, this.currentAction, move);
    }
    catch(err) { return false; }
  }
  submit() {
    if(this.inCheckmate()) {
      throw 'Cannot submit, currently in checkmate.';
    }
    if(this.inStalemate()) {
      throw 'Cannot submit, currently in stalemate.';
    }
    if(this.inCheck()) {
      throw 'Cannot submit, currently in check.';
    }
    if(!this.submittable()) {
      throw 'Action is not complete, more moves are needed';
    }
    this.boardHistory.push(this.currentBoard);
    this.actionHistory.push(deepcopy(this.moveBuffer));
    this.moveBuffer = [];
    this.currentAction++;
  }
  submittable() {
    if(this.inCheckmate()) { return false; }
    if(this.inStalemate()) { return false; }
    if(this.inCheck()) { return false; }
    return boardFuncs.present(this.currentBoard, this.currentAction).length <= 0;
  }
  undo() {
    if(this.moveBuffer.length > 0) {
      var tmpBuffer = deepcopy(this.moveBuffer);
      tmpBuffer.pop();
      var tmpBoard = boardFuncs.copy(this.boardHistory[this.boardHistory.length - 1]);
      for(var i = 0;i < tmpBuffer.length;i++) {
        if(!validateFuncs.move(tmpBoard, this.currentAction, tmpBuffer[i])) {
          throw 'Undo buffer is corrupted and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.currentAction, tmpBuffer[i]).str;
        }
        boardFuncs.move(tmpBoard, tmpBuffer[i]);
      }
      this.currentBoard = boardFuncs.copy(tmpBoard);
      this.moveBuffer = deepcopy(tmpBuffer);
    }
    else {
      throw 'No moves to undo.';
    }
  }
  undoable() {
    try {
      if(this.moveBuffer.length > 0) {
        var tmpBuffer = deepcopy(this.moveBuffer);
        tmpBuffer.pop();
        var tmpBoard = boardFuncs.copy(this.boardHistory[this.boardHistory.length - 1]);
        for(var i = 0;i < tmpBuffer.length;i++) {
          if(!validateFuncs.move(tmpBoard, this.currentAction, tmpBuffer[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    catch(err) { return false; }
  }
  inCheckmate() {
    return mateFuncs.checkmate(this.currentBoard, this.currentAction);
  }
  inCheck() {
    return mateFuncs.checks(this.currentBoard, this.currentAction).length > 0;
  }
  inStalemate() {
    return mateFuncs.stalemate(this.currentBoard, this.currentAction);
  }
  export(format = 'notation') {
    if(format === 'json') { return JSON.stringify(this.actionHistory); }
    if(format === 'object') { return this.actionHistory; }
    var res = '';
    var tmpBoard = boardFuncs.copy(boardFuncs.init());
    for(var i = 0;i < this.actionHistory.length;i++) {
      for(var j = 0;j < this.actionHistory[i].length;j++) {
        var currMove = this.actionHistory[i][j];
        boardFuncs.move(tmpBoard, currMove);
        if(format.includes('notation')) {
          res += notationFuncs.moveNotation(tmpBoard, i, currMove, format.includes('short'),
            mateFuncs.checks(tmpBoard, i + 1).length > 0,
            mateFuncs.checkmate(tmpBoard, i + 1),
            mateFuncs.stalemate(tmpBoard, i + 1)
          ).str + '\n';
        }
      }
    }
    return res;
  }
  print() {
    console.log('Current Player: ' + (this.currentAction % 2 === 0 ? 'White' : 'Black'));
    console.log('Action Number: ' + (Math.ceil(this.currentAction/2) + 1));
    if(this.moveBuffer.length > 0) {
      console.log('Move Stack:');
    }
    for(var i = 0;i < this.moveBuffer.length;i++) {
      console.log('  ' + notationFuncs.moveNotation(this.currentBoard, this.currentAction, this.moveBuffer[i]).str)
    }
    printFuncs.printBoard(this.currentBoard);
  }
}

module.exports = Chess;
