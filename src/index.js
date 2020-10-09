require('module-alias/register');

const deepcopy = require('deep-copy');
const actionFuncs = require('@local/action');
const boardFuncs = require('@local/board');
const parseFuncs = require('@local/parse');
const pieceFuncs = require('@local/piece');
const printFuncs = require('@local/print');
const mateFuncs = require('@local/mate');
const notationFuncs = require('@local/notation');
const turnFuncs = require('@local/turn');
const validateFuncs = require('@local/validate');

class Chess {
  constructor(input) {
    this.reset();
    if(input !== undefined) {
      this.import(input);
    }
    this.raw = {
      actionFuncs: actionFuncs,
      boardFuncs: boardFuncs,
      mateFuncs: mateFuncs,
      notationFuncs: notationFuncs,
      parseFuncs: parseFuncs,
      pieceFuncs: pieceFuncs,
      printFuncs: printFuncs,
      turnFuncs: turnFuncs,
      validateFuncs: validateFuncs
    };
  }
  reset() {
    this.rawBoard = boardFuncs.init();
    this.rawAction = 0;
    this.rawBoardHistory = [this.rawBoard];
    this.rawActionHistory = [];
    this.rawMoveBuffer = [];
  }
  convert(input) {
    var actions = [];
    if(Array.isArray(input)) {
      var tmp = deepcopy(input);
      if(tmp.length > 0 && !Array.isArray(tmp[0])) {
        for(var i = 0;i < tmp.length;i++) {
          actions.push(parseFuncs.toAction(tmp[i]));
        }
      }
      else {
        actions = tmp;
      }
    }
    else {
      try {
        var tmp = JSON.parse(input);
        for(var i = 0;i < tmp.length;i++) {
          actions.push(parseFuncs.toAction(tmp[i]));
        }
      }
      catch(err) {
        if(typeof input === 'string') {
          var splitStr = input.replace(/\r\n/g, '\n').split('\n');
          var tmpCurrAction = this.rawAction;
          var tmpBoard = boardFuncs.copy(this.rawBoard);
          var tmpAction = [];
          for(var i = 0;i < splitStr.length;i++) {
            if(splitStr[i].length > 0) {
              var tmpNotation = {};
              try {
                if(!validateFuncs.notation(splitStr[i])) {
                  throw 'Notation invalid and an error has occurred at line: ' + splitStr[i];
                }
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
  import(input, skipDetection = false) {
    this.reset();
    var actions = this.convert(input);
    for(var i = 0;i < actions.length;i++) {
      this.action(actions[i], skipDetection);
    }
  }
  importable(input, skipDetection = false) {
    try {
      this.reset();
      var actions = this.convert(input);
      for(var i = 0;i < actions.length;i++) {
        if(!this.actionable(actions[i], skipDetection)) { return false; }
      }
      return true;
    }
    catch(err) { return false; }
  }
  action(input, skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) {
        throw 'Cannot submit, currently in checkmate.';
      }
      if(this.inStalemate) {
        throw 'Cannot submit, currently in stalemate.';
      }
    }
    var moves = [];
    if(Array.isArray(input)) {
      var tmp = deepcopy(input);
      if(tmp.length > 0 && !Array.isArray(tmp[0])) {
        for(var i = 0;i < tmp.length;i++) {
          moves.push(parseFuncs.toMove(tmp[i]));
        }
      }
      else {
        moves = tmp;
      }
    }
    else {
      try {
        var tmp = JSON.parse(input);
        for(var i = 0;i < tmp.length;i++) {
          moves.push(parseFuncs.toMove(tmp[i]));
        }
      }
      catch(err) {
        moves = this.convert(input)[0];
      }
    }
    var tmpBoard = boardFuncs.copy(this.rawBoard);
    for(var i = 0;i < moves.length;i++) {
      if(!validateFuncs.move(tmpBoard, this.rawAction, moves[i])) {
        throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.rawAction, moves[i]).str;
      }
      boardFuncs.move(tmpBoard, moves[i]);
    }
    if(boardFuncs.present(tmpBoard, this.rawAction).length > 0) {
      throw 'Action is not complete, more moves are needed';
    }
    else {
      this.rawBoard = tmpBoard;
      this.rawBoardHistory.push(this.rawBoard);
      this.rawActionHistory.push(deepcopy(moves));
      this.rawAction++;
    }
  }
  actions(format = 'object', activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, skipDetection = false) {
    var actions = actionFuncs.actions(this.rawBoard, this.rawAction, activeOnly, presentOnly, newActiveTimelinesOnly);
    if(format === 'raw') { return actions; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < actions.length;i++) {
        if(this.actionable(actions[i], skipDetection)) {
          for(var j = 0;j < actions[i].length;j++) {
            res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, actions[i][j], format.includes('short')).str + '\n';
          }
        }
      }
      return res;
    }
    res = [];
    for(var i = 0;i < actions.length;i++) {
      if(this.actionable(actions[i], skipDetection)) {
        res.push(parseFuncs.fromAction(actions[i]));
      }
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  actionable(input, skipDetection = false) {
    try {
      if(!skipDetection) {
        if(this.inCheckmate) { return false; }
        if(this.inStalemate) { return false; }
      }
      var moves = [];
      if(Array.isArray(input)) {
        var tmp = deepcopy(input);
        if(tmp.length > 0 && !Array.isArray(tmp[0])) {
          for(var i = 0;i < tmp.length;i++) {
            moves.push(parseFuncs.toMove(tmp[i]));
          }
        }
        else {
          moves = tmp;
        }
      }
      else {
        try {
          moves = JSON.parse(input);
        }
        catch(err) {
          moves = this.convert(input)[0];
        }
      }
      var tmpCurrAction = this.rawAction;
      var tmpBoard = boardFuncs.copy(this.rawBoard);
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
  move(input, skipDetection = false) {
    var move = [];
    if(Array.isArray(input)) {
      move = deepcopy(input);
    }
    else {
      if(typeof input === 'object') {
        move = parseFuncs.toMove(deepcopy(input));
      }
      else {
        try {
          move = parseFuncs.toMove(JSON.parse(input));
        }
        catch(err) {
          move = this.convert(input)[0][0];
        }
      }
    }
    var tmpCurrAction = this.rawAction;
    var tmpBoard = boardFuncs.copy(this.rawBoard);
    if(!this.moveable(move, skipDetection)) {
      throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.rawAction, move).str;
    }
    this.rawMoveBuffer.push(move);
    boardFuncs.move(tmpBoard, move);
    this.rawBoard = tmpBoard;
  }
  moves(format = 'object', activeOnly = true, presentOnly = true, skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) { return []; }
      if(this.inStalemate) { return []; }
    }
    var moves = boardFuncs.moves(this.rawBoard, this.rawAction, activeOnly, presentOnly);
    if(format === 'raw') { return moves; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < moves.length;i++) {
        res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, moves[i], format.includes('short')).str + '\n';
      }
      return res;
    }
    res = [];
    for(var i = 0;i < moves.length;i++) {
      if(this.moveable(moves[i], skipDetection)) {
        res.push(parseFuncs.fromMove(moves[i]));
      }
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  moveable(input, skipDetection = false) {
    try {
      if(!skipDetection) {
        if(this.inCheckmate) { return false; }
        if(this.inStalemate) { return false; }
      }
      var move = [];
      if(Array.isArray(input)) {
        move = deepcopy(input);
      }
      else {
        if(typeof input === 'object') {
          move = parseFuncs.toMove(deepcopy(input));
        }
        else {
          try {
            move = parseFuncs.toMove(JSON.parse(input));
          }
          catch(err) {
            move = this.convert(input)[0][0];
          }
        }
      }
      var tmpBoard = boardFuncs.copy(this.rawBoard);
      return validateFuncs.move(tmpBoard, this.rawAction, move);
    }
    catch(err) { return false; }
  }
  submit(skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) {
        throw 'Cannot submit, currently in checkmate.';
      }
      if(this.inStalemate) {
        throw 'Cannot submit, currently in stalemate.';
      }
      if(this.inCheck) {
        throw 'Cannot submit, currently in check.';
      }
    }
    if(!this.submittable(skipDetection)) {
      throw 'Action is not complete, more moves are needed';
    }
    this.rawBoardHistory.push(this.rawBoard);
    this.rawActionHistory.push(deepcopy(this.rawMoveBuffer));
    this.rawMoveBuffer = [];
    this.rawAction++;
  }
  submittable(skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) { return false; }
      if(this.inStalemate) { return false; }
      if(this.inCheck) { return false; }
    }
    return boardFuncs.present(this.rawBoard, this.rawAction).length <= 0;
  }
  undo() {
    if(this.rawMoveBuffer.length > 0) {
      var tmpBuffer = deepcopy(this.rawMoveBuffer);
      tmpBuffer.pop();
      var tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
      for(var i = 0;i < tmpBuffer.length;i++) {
        if(!validateFuncs.move(tmpBoard, this.rawAction, tmpBuffer[i])) {
          throw 'Undo buffer is corrupted and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.rawAction, tmpBuffer[i]).str;
        }
        boardFuncs.move(tmpBoard, tmpBuffer[i]);
      }
      this.rawBoard = boardFuncs.copy(tmpBoard);
      this.rawMoveBuffer = deepcopy(tmpBuffer);
    }
    else {
      throw 'No moves to undo.';
    }
  }
  undoable() {
    try {
      if(this.rawMoveBuffer.length > 0) {
        var tmpBuffer = deepcopy(this.rawMoveBuffer);
        tmpBuffer.pop();
        var tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
        for(var i = 0;i < tmpBuffer.length;i++) {
          if(!validateFuncs.move(tmpBoard, this.rawAction, tmpBuffer[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    catch(err) { return false; }
  }
  checks(format = 'object') {
    var moves = mateFuncs.checks(this.rawBoard, this.rawAction);
    if(format === 'raw') { return moves; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < moves.length;i++) {
        res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, moves[i], format.includes('short')).str + '\n';
      }
      return res;
    }
    res = [];
    for(var i = 0;i < moves.length;i++) {
      res.push(parseFuncs.fromMove(moves[i]));
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  get inCheckmate() {
    return (this.rawMoveBuffer.length <= 0) && mateFuncs.checkmate(this.rawBoard, this.rawAction);
  }
  get inCheck() {
    return mateFuncs.checks(this.rawBoard, this.rawAction).length > 0;
  }
  get inStalemate() {
    return mateFuncs.stalemate(this.rawBoard, this.rawAction);
  }
  export(format = 'notation') {
    if(format === 'raw') { return this.rawActionHistory; }
    if(format === 'json') { return JSON.stringify(this.rawActionHistory.map((e,i) => {
      return parseFuncs.fromAction(i,e);
    })); }
    if(format === 'object') { return this.rawActionHistory.map((e,i) => {
      return parseFuncs.fromAction(i,e);
    }); }
    var res = '';
    var tmpBoard = boardFuncs.copy(boardFuncs.init());
    for(var i = 0;i < this.rawActionHistory.length;i++) {
      for(var j = 0;j < this.rawActionHistory[i].length;j++) {
        var currMove = this.rawActionHistory[i][j];
        boardFuncs.move(tmpBoard, currMove);
        if(format.includes('notation')) {
          res += notationFuncs.moveNotation(tmpBoard, i, currMove, format.includes('short')).str + '\n';
        }
      }
    }
    return res;
  }
  print() {
    console.log('Current Player: ' + (this.rawAction % 2 === 0 ? 'White' : 'Black'));
    console.log('Action Number: ' + (Math.ceil(this.rawAction/2) + 1));
    if(this.rawMoveBuffer.length > 0) {
      console.log('Move Stack:');
    }
    for(var i = 0;i < this.rawMoveBuffer.length;i++) {
      console.log('  ' + notationFuncs.moveNotation(this.rawBoard, this.rawAction, this.rawMoveBuffer[i]).str)
    }
    printFuncs.printBoard(this.rawBoard);
  }
  get board() {
    return parseFuncs.fromBoard(this.rawBoard, this.rawAction);
  }
  get actionNumber() {
    return Math.floor(this.rawAction/2) + 1;
  }
  get boardHistory() {
    var res = [];
    for(var i = 0;i < this.rawBoardHistory.length;i++) {
      res.push(parseFuncs.fromBoard(this.rawBoardHistory[i], i));
    }
    return res;
  }
  get actionHistory() {
    return this.export('object');
  }
  get moveBuffer() {
    var res = [];
    for(var i = 0;i < this.rawMoveBuffer.length;i++) {
      res.push(parseFuncs.fromMove(this.rawMoveBuffer[i], i));
    }
    return res;
  }
  get player() {
    return (this.rawAction % 2 === 0 ? 'white' : 'black');
  }
}

module.exports = Chess;
