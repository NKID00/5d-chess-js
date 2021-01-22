require('module-alias/register');

const actionFuncs = require('@local/action');
const boardFuncs = require('@local/board');
const convertFuncs = require('@local/convert');
const copyFuncs = require('@local/copy');
const fenFuncs = require('@local/fen');
const hashFuncs = require('@local/hash');
const parseFuncs = require('@local/parse');
const pieceFuncs = require('@local/piece');
const printFuncs = require('@local/print');
const mateFuncs = require('@local/mate');
const metadataFuncs = require('@local/metadata');
const notationFuncs = require('@local/notation');
const turnFuncs = require('@local/turn');
const validateFuncs = require('@local/validate');

class Chess {
  constructor(input, variant) {
    this.raw = {
      actionFuncs: actionFuncs,
      boardFuncs: boardFuncs,
      convertFuncs: convertFuncs,
      hashFuncs: hashFuncs,
      mateFuncs: mateFuncs,
      metadataFuncs: metadataFuncs,
      notationFuncs: notationFuncs,
      parseFuncs: parseFuncs,
      pieceFuncs: pieceFuncs,
      printFuncs: printFuncs,
      turnFuncs: turnFuncs,
      validateFuncs: validateFuncs
    };
    this.checkmateTimeout = 60000;
    this.metadata = {
      variant: 'standard'
    };
    if(variant !== undefined) {
      this.metadata.variant = variant;
    }
    this.reset();
    if(input !== undefined) {
      this.import(input);
    }
  }
  copy() {
    var newInstance = new Chess();
    newInstance.checkmateTimeout = this.checkmateTimeout;
    newInstance.metadata = Object.assign({}, this.metadata);
    newInstance.rawAction = this.rawAction;
    newInstance.rawBoardHistory = [];
    for(var i = 0;i < this.rawBoardHistory.length;i++) {
      newInstance.rawBoardHistory.push(boardFuncs.copy(this.rawBoardHistory[i]));
    }
    newInstance.rawBoard = boardFuncs.copy(this.rawBoard);
    newInstance.rawActionHistory = copyFuncs.actions(this.rawActionHistory);
    newInstance.rawMoveBuffer = copyFuncs.action(this.rawMoveBuffer);
    return newInstance;
  }
  reset(variant) {
    if(typeof variant !== 'undefined') {
      this.metadata.variant = variant;
    }
    this.rawBoard = boardFuncs.init(this.metadata.variant);
    this.rawAction = this.metadata.variant === 'turn_zero' ? 2 : 0;
    if(typeof this.metadata.variant === 'object') {
      this.rawAction = (this.metadata.variant.action - 1) * 2 + (this.metadata.variant.player === 'white' ? 0 : 1);
    }
    this.rawBoardHistory = [boardFuncs.copy(this.rawBoard)];
    this.rawActionHistory = [];
    this.rawMoveBuffer = [];
  }
  import(input, variant, skipDetection = false) {
    if(variant !== undefined) {
      this.metadata.variant = variant;
    }
    if(typeof input === 'string') {
      Object.assign(this.metadata, metadataFuncs.strToObj(input));
    }
    this.reset();
    if(this.metadata.variant === 'custom') {
      this.importFen(input);
    }
    var actions = convertFuncs.actions(input);
    for(var i = 0;i < actions.length;i++) {
      for(var j = 0;j < actions[i].length;j++) {
        this.move(actions[i][j], skipDetection);
      }
      try {
        this.submit(skipDetection);
      }
      catch(err) {
        console.error('Error submitting');
        console.error(err);
      }
    }
  }
  importFen(input) {
    // Read width and height
    let width = 8;
    let height = 8;

    let match;
    if(match = /^(\d+)x(\d+)$/.exec(this.metadata.size || "")) {
      width = +match[1];
      height = +match[2];
    }

    // Look for 5DFEN strings and parse them
    for(var line of input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n')) {
      line = line.trim();
      if(line.startsWith('[') && line.endsWith(']') && !/\s/.exec(line)) {
        let [turn, l, t] = fenFuncs.fromFen(line, width, height);
        fenFuncs.setTurn(this.rawBoard, turn, l, t);
        fenFuncs.setTurn(this.rawBoardHistory, turn, l, t);
      }
    }
  }
  importable(input, skipDetection = false) {
    try {
      var newInstance = this.copy();
      newInstance.import(input, skipDetection);
      return true;
    }
    catch(err) { return false; }
  }
  pass(skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) {
        throw 'Cannot submit, currently in checkmate.';
      }
      if(this.inStalemate) {
        throw 'Cannot submit, currently in stalemate.';
      }
    }
    mateFuncs.blankAction(this.rawBoard, this.rawAction);
    this.submit(skipDetection);
  }
  passable(skipDetection =  false) {
    try {
      var newInstance = this.copy();
      newInstance.pass(skipDetection);
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
    var moves = convertFuncs.action(input);
    for(var i = 0;i < moves.length;i++) {
      this.move(moves[i], skipDetection);
    }
    this.submit(skipDetection);
  }
  actions(format = 'object', activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, skipDetection = false) {
    var actions = actionFuncs.actions(this.rawBoard, this.rawAction, activeOnly, presentOnly, newActiveTimelinesOnly, this.metadata.variant);
    if(format === 'raw') { return actions; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < actions.length;i++) {
        if(skipDetection || this.actionable(actions[i], skipDetection)) {
          for(var j = 0;j < actions[i].length;j++) {
            res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, actions[i][j], format.includes('short')).str + '\n';
          }
        }
      }
      return res;
    }
    res = [];
    for(var i = 0;i < actions.length;i++) {
      if(skipDetection || this.actionable(actions[i], skipDetection)) {
        res.push(parseFuncs.fromAction(this.rawAction, actions[i]));
      }
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  actionable(input, skipDetection = false) {
    try {
      var newInstance = this.copy();
      newInstance.action(input, skipDetection);
      return true;
    }
    catch(err) { return false; }
  }
  move(input, skipDetection = false) {
    var move = convertFuncs.move(input);
    if(!skipDetection) {
      if(!this.moveable(move, skipDetection)) {
        throw 'Move is invalid and an error has occurred with this move: ' + notationFuncs.moveNotation(this.rawBoard, this.rawAction, move).str;
      }
    }
    this.rawMoveBuffer.push(move);
    boardFuncs.move(this.rawBoard, move);
  }
  moves(format = 'object', activeOnly = true, presentOnly = true, skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) { return []; }
      if(this.inStalemate) { return []; }
    }
    var moves = boardFuncs.moves(this.rawBoard, this.rawAction, activeOnly, presentOnly, this.metadata.variant);
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
  moveable(input, skipDetection = false, moveGen = []) {
    try {
      var move = convertFuncs.move(input);
      return validateFuncs.move(this.rawBoard, this.rawAction, move, moveGen, this.metadata.variant);
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
    }
    if(this.inCheck) {
      throw 'Cannot submit, currently in check.';
    }
    if(!this.submittable(skipDetection)) {
      throw 'Action is not complete, more moves are needed';
    }
    this.rawBoardHistory.push(boardFuncs.copy(this.rawBoard));
    this.rawActionHistory.push(copyFuncs.action(this.rawMoveBuffer));
    this.rawMoveBuffer = [];
    this.rawAction++;
  }
  submittable(skipDetection = false) {
    if(!skipDetection) {
      if(this.inCheckmate) { return false; }
      if(this.inStalemate) { return false; }
    }
    if(this.inCheck) { return false; }
    return boardFuncs.present(this.rawBoard, this.rawAction).length <= 0;
  }
  undo(skipDetection = false) {
    if(this.rawMoveBuffer.length > 0) {
      var tmpBuffer = copyFuncs.action(this.rawMoveBuffer);
      tmpBuffer.pop();
      var tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
      for(var i = 0;i < tmpBuffer.length;i++) {
        if(!skipDetection) {
          if(!validateFuncs.move(tmpBoard, this.rawAction, tmpBuffer[i], this.metadata.variant)) {
            throw 'Undo buffer is corrupted and an error has occurred with this move: ' + notationFuncs.moveNotation(tmpBoard, this.rawAction, tmpBuffer[i]).str;
          }
        }
        boardFuncs.move(tmpBoard, tmpBuffer[i]);
      }
      this.rawBoard = boardFuncs.copy(tmpBoard);
      this.rawMoveBuffer = copyFuncs.action(tmpBuffer);
    }
    else {
      throw 'No moves to undo.';
    }
  }
  undoable(skipDetection = false) {
    try {
      this.copy().undo(skipDetection);
      return true;
    }
    catch(err) { return false; }
  }
  checks(format = 'object') {
    var checks = mateFuncs.checks(this.rawBoard, this.rawAction, this.metadata.variant);
    if(format === 'raw') { return checks; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < checks.length;i++) {
        res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, checks[i], format.includes('short')).str + '\n';
      }
      return res;
    }
    res = [];
    for(var i = 0;i < checks.length;i++) {
      res.push(parseFuncs.fromMove(checks[i]));
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  get inCheckmate() {
    return (this.rawMoveBuffer.length <= 0) && mateFuncs.checkmate(this.rawBoard, this.rawAction, this.checkmateTimeout, this.metadata.variant);
  }
  get inCheck() {
    return mateFuncs.checks(this.rawBoard, this.rawAction, this.metadata.variant).length > 0;
  }
  get inStalemate() {
    return mateFuncs.stalemate(this.rawBoard, this.rawAction, this.metadata.variant);
  }
  get hash() {
    return hashFuncs.hash(this.rawBoard);
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
    res += metadataFuncs.objToStr(this.metadata);
    var tmpBoard = boardFuncs.copy(boardFuncs.init(this.metadata.variant));
    for(var i = 0;i < this.rawActionHistory.length;i++) {
      for(var j = 0;j < this.rawActionHistory[i].length;j++) {
        var currMove = this.rawActionHistory[i][j];
        if(format.includes('notation')) {
          res += notationFuncs.moveNotation(tmpBoard, i, currMove, format.includes('short')).str + '\n';
        }
        boardFuncs.move(tmpBoard, currMove);
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
