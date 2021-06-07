require('module-alias/register');
const md5 = require('blueimp-md5');

const actionFuncs = require('@local/action');
const boardFuncs = require('@local/board');
const convertFuncs = require('@local/convert');
const copyFuncs = require('@local/copy');
const fenFuncs = require('@local/fen');
const hashFuncs = require('@local/hash');
const parseFuncs = require('@local/parse');
const pgnFuncs = require('@local/pgn');
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
      fenFuncs: fenFuncs,
      hashFuncs: hashFuncs,
      mateFuncs: mateFuncs,
      metadataFuncs: metadataFuncs,
      notationFuncs: notationFuncs,
      parseFuncs: parseFuncs,
      pgnFuncs: pgnFuncs,
      pieceFuncs: pieceFuncs,
      printFuncs: printFuncs,
      turnFuncs: turnFuncs,
      validateFuncs: validateFuncs
    };
    this.checkmateTimeout = 60000;
    this.skipDetection = false;
    this.checkmateCache = [];
    this.metadata = {
      board: 'standard',
      mode: '5D'
    };
    this.rawPromotionPieces = []; //TODO: Expose this variable as endpoint for getting available promotions options
    if(typeof input !== 'undefined') {
      this.import(input, variant);
    }
    else {
      if(typeof variant === 'string') {
        this.metadata.board = metadataFuncs.lookupVariant(variant);
        this.reset(this.metadata.board);
      }
      else if(typeof variant === 'object') {
        this.metadata.board = 'custom';
        this.reset(variant);
      }
      else {
        this.reset();
      }
    }
  }
  copy() {
    var newInstance = new Chess();
    newInstance.state(this.state());
    return newInstance;
  }
  state(state = null) {
    if(state === null) {
      var res = {};
      res.checkmateTimeout = this.checkmateTimeout;
      res.skipDetection = this.skipDetection;
      res.checkmateCache = this.checkmateCache.slice();
      res.metadata = Object.assign({}, this.metadata);
      res.rawAction = this.rawAction;
      res.rawStartingAction = this.rawStartingAction;
      res.rawBoardHistory = [];
      for(var i = 0;i < this.rawBoardHistory.length;i++) {
        res.rawBoardHistory.push(boardFuncs.copy(this.rawBoardHistory[i]));
      }
      res.rawBoard = boardFuncs.copy(this.rawBoard);
      res.rawActionHistory = copyFuncs.actions(this.rawActionHistory);
      res.rawMoveBuffer = copyFuncs.action(this.rawMoveBuffer);
      res.rawPromotionPieces = this.rawPromotionPieces.slice();
      return res;
    }
    else {
      this.checkmateTimeout = state.checkmateTimeout;
      this.skipDetection = state.skipDetection;
      this.checkmateCache = state.checkmateCache.slice();
      this.metadata = Object.assign({}, state.metadata);
      this.rawAction = state.rawAction;
      this.rawStartingAction = state.rawStartingAction;
      this.rawBoardHistory = [];
      for(var i = 0;i < state.rawBoardHistory.length;i++) {
        this.rawBoardHistory.push(boardFuncs.copy(state.rawBoardHistory[i]));
      }
      this.rawBoard = boardFuncs.copy(state.rawBoard);
      this.rawActionHistory = copyFuncs.actions(state.rawActionHistory);
      this.rawMoveBuffer = copyFuncs.action(state.rawMoveBuffer);
      this.rawPromotionPieces = state.rawPromotionPieces.slice();
    }
  }
  compare(input1, input2, type = 'board') {
    if(type === 'board') {
      var board1 = convertFuncs.board(input1);
      var board2 = convertFuncs.board(input2);
      return boardFuncs.compare(board1, board2);
    }
    if(type === 'move') {
      var move1 = convertFuncs.move(input1, this.rawBoard, this.rawAction, this.rawPromotionPieces);
      var move2 = convertFuncs.move(input2, this.rawBoard, this.rawAction, this.rawPromotionPieces);
      return mateFuncs.moveCompare(move1, move2);
    }
    throw 'Type not supported, valid types are \'board\' and \'move\'.';
  }
  reset(variant) {
    if(typeof variant === 'string') {
      this.metadata.board = metadataFuncs.lookupVariant(variant);
      this.rawBoard = boardFuncs.init(this.metadata.board);
    }
    else if(typeof variant === 'object') {
      this.metadata.board = 'custom';
      this.rawBoard = boardFuncs.init(variant);
    }
    else {
      this.rawBoard = boardFuncs.init(this.metadata.board);
    }
    this.rawAction = 0;
    if(typeof this.rawBoard[0] !== 'undefined' && this.rawBoard[0] !== null) {
      this.rawAction = this.rawBoard[0].length % 2 === 0 ? 1 : 0;
    }
    this.rawStartingAction = this.rawAction;
    this.rawBoardHistory = [boardFuncs.copy(this.rawBoard)];
    this.rawActionHistory = [];
    this.rawMoveBuffer = [];
    this.rawPromotionPieces = pieceFuncs.availablePromotionPieces(this.rawBoard);
  }
  import(input, variant) {
    //Reset everything to "Standard" first
    this.reset('standard');
    if(typeof input === 'string') {
      Object.assign(this.metadata, metadataFuncs.strToObj(input));
      if (typeof this.metadata.board === 'string') {
        this.reset(this.metadata.board);
      } else {
        this.reset(variant);
      }
    } else {
      this.reset(variant);
    }

    if (this.metadata.promotions) {
      this.rawPromotionPieces = [];
      for (let promotions of this.metadata.promotions.split(',')) {
        this.rawPromotionPieces.push(pieceFuncs.fromChar(promotions, 0));
        this.rawPromotionPieces.push(pieceFuncs.fromChar(promotions, 1));
      }
    }
    if(this.metadata.board === 'custom') {
      this.fen(input);
      if(typeof this.rawBoard[0] !== 'undefined' && this.rawBoard[0] !== null) {
        this.rawAction = this.rawBoard[0].length % 2 === 0 ? 1 : 0;
      }
      this.rawStartingAction = this.rawAction;
      this.rawBoardHistory = [boardFuncs.copy(this.rawBoard)];
    }
    try {
      var actions = convertFuncs.actions(input, this.rawBoardHistory[0], this.rawStartingAction, this.rawPromotionPieces);
      for(var i = 0;i < actions.length;i++) {
        for(var j = 0;j < actions[i].length;j++) {
          this.move(actions[i][j]);
        }
        if(i + 1 < actions.length) {
          this.submit();
        }
        else {
          try {
            this.submit();
          }
          catch(err) {
            console.error(err);
            console.log('Last action is not complete, importing as move buffer.');
          }
        }
      }
    }
    catch(err) {
      console.error(err);
      console.log('Error importing actions, skipping.');
    }
  }
  importable(input) {
    try {
      var newInstance = this.copy();
      newInstance.import(input);
      return true;
    }
    catch(err) { return false; }
  }
  fen(input, currentBoard = false) {
    if(typeof input === 'string') {
      // Read width and height
      let width = 8;
      let height = 8;

      let match;
      Object.assign(this.metadata, metadataFuncs.strToObj(input));
      if(match = /^(\d+)x(\d+)$/.exec(this.metadata.size || "")) {
        width = +match[1];
        height = +match[2];
      }
      var isTurnZero = input.includes('0:b]') || input.includes('0:w]');
      var isEvenTimeline = input.includes(':+0:') || input.includes(':-0:');
      // Look for 5DFEN strings and parse them
      for(var line of input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n')) {
        line = line.trim();
        if(line.startsWith('[') && line.endsWith(']') && !/\s/.exec(line)) {
          let [turn, l, t] = fenFuncs.fromFen(line, width, height, isTurnZero, isEvenTimeline);
          boardFuncs.setTurn(this.rawBoard, l, t, turn);
        }
      }
    }
    else if(!currentBoard) {
      var res = '';
      var firstBoard = this.rawBoardHistory[0];
      var isTurnZero = boardFuncs.isTurnZero(firstBoard);
      var isEvenTimeline = boardFuncs.isEvenTimeline(firstBoard);
      for(var l = 0;l < firstBoard.length;l++) {
        for(var t = 0;firstBoard[l] && t < firstBoard[l].length;t++) {
          if(firstBoard[l][t]) {
            res += fenFuncs.toFen(firstBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';
          }
        }
      }
      return res;
    }
    else {
      var res = '';
      var isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
      var isEvenTimeline = boardFuncs.isEvenTimeline(this.rawBoard);
      for(var l = this.rawBoard.length - 1;l > 0;l--) {
        if(this.rawBoard[l] && l % 2 !== 0) {
          for(var t = 0;t < this.rawBoard[l].length;t++) {
            if(this.rawBoard[l][t]) {
              res += fenFuncs.toFen(this.rawBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';
            }
          }
        }
      }
      for(var l = 0;l < this.rawBoard.length;l++) {
        if(this.rawBoard[l] && l % 2 === 0) {
          for(var t = 0;t < this.rawBoard[l].length;t++) {
            if(this.rawBoard[l][t]) {
              res += fenFuncs.toFen(this.rawBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';
            }
          }
        }
      }
      return res;
    }
  }
  fenable(input) {
    try {
      var newInstance = this.copy();
      newInstance.fen(input);
      return true;
    }
    catch(err) { return false; }
  }
  pass() {
    if(!this.skipDetection) {
      if(this.inCheckmate) {
        throw 'Cannot submit, currently in checkmate.';
      }
      if(this.inStalemate) {
        throw 'Cannot submit, currently in stalemate.';
      }
    }
    mateFuncs.blankAction(this.rawBoard, this.rawAction);
    this.submit();
  }
  passable() {
    try {
      var newInstance = this.copy();
      newInstance.pass;
      return true;
    }
    catch(err) { return false; }
  }
  action(input) {
    var moves = convertFuncs.action(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);
    for(var i = 0;i < moves.length;i++) {
      this.move(moves[i]);
    }
    this.submit();
  }
  actions(format = 'object', activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true) {
    var isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    var actions = actionFuncs.actions(this.rawBoard, this.rawAction, activeOnly, presentOnly, newActiveTimelinesOnly, this.metadata.board, this.rawPromotionPieces);
    if(format === 'raw') { return actions; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < actions.length;i++) {
        if(this.skipDetection || this.actionable(actions[i])) {
          for(var j = 0;j < actions[i].length;j++) {
            res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, actions[i][j], format.includes('short')).str + '\n';
          }
        }
      }
      return res;
    }
    if(format.includes('5dpgn')) {
      var res = '';
      for(var i = 0;i < actions.length;i++) {
        res += pgnFuncs.fromMove(
          actions[i],
          this.rawBoard,
          this.rawAction,
          '',
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        ) + '\n';
      }
      return res;
    }
    res = [];
    for(var i = 0;i < actions.length;i++) {
      if(this.skipDetection || this.actionable(actions[i])) {
        res.push(parseFuncs.fromAction(this.rawBoard, this.rawAction, actions[i], isTurnZero));
      }
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  actionable(input) {
    try {
      var newInstance = this.copy();
      newInstance.action(input);
      return true;
    }
    catch(err) { return false; }
  }
  move(input) {
    var move = convertFuncs.move(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);
    if(!this.skipDetection) {
      if(!this.moveable(move)) {
        var pgnStr = 'Move is invalid and an error has occurred with this move: ' + move;
        console.error(pgnStr);
        throw pgnStr;
      }
    }
    this.rawMoveBuffer.push(move);
    boardFuncs.move(this.rawBoard, move);
  }
  moves(format = 'object', activeOnly = true, presentOnly = true, spatialOnly = false) {
    var isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    if(!this.skipDetection) {
      if(this.inCheckmate) { return []; }
      if(this.inStalemate) { return []; }
    }
    var moves = boardFuncs.moves(this.rawBoard, this.rawAction, activeOnly, presentOnly, spatialOnly, this.rawPromotionPieces);
    if(format === 'raw') { return moves; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < moves.length;i++) {
        res += notationFuncs.moveNotation(this.rawBoard, this.rawAction, moves[i], format.includes('short')).str + '\n';
      }
      return res;
    }
    if(format.includes('5dpgn')) {
      var res = '';
      for(var i = 0;i < moves.length;i++) {
        res += pgnFuncs.fromMove(
          moves[i],
          this.rawBoard,
          this.rawAction,
          '',
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        ) + '\n';
      }
      return res;
    }
    res = [];
    for(var i = 0;i < moves.length;i++) {
      res.push(parseFuncs.fromMove(this.rawBoard, moves[i], isTurnZero));
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  moveable(input, moveGen = []) {
    try {
      if(this.skipDetection) {
        return true;
      }
      var move = convertFuncs.move(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);
      return validateFuncs.move(this.rawBoard, this.rawAction, move, moveGen, this.rawPromotionPieces);
    }
    catch(err) { return false; }
  }
  submit() {
    if(!this.skipDetection) {
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
    if(!this.submittable()) {
      throw 'Action is not complete, more moves are needed';
    }
    this.rawBoardHistory.push(boardFuncs.copy(this.rawBoard));
    this.rawActionHistory.push(copyFuncs.action(this.rawMoveBuffer));
    this.rawMoveBuffer = [];
    this.rawAction++;
  }
  submittable() {
    if(!this.skipDetection) {
      if(this.inCheckmate) { return false; }
      if(this.inStalemate) { return false; }
    }
    if(this.inCheck) { return false; }
    return boardFuncs.present(this.rawBoard, this.rawAction).length <= 0;
  }
  undo() {
    if(this.rawMoveBuffer.length > 0) {
      var tmpBuffer = copyFuncs.action(this.rawMoveBuffer);
      tmpBuffer.pop();
      var tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
      for(var i = 0;i < tmpBuffer.length;i++) {
        if(!this.skipDetection) {
          if(!validateFuncs.move(tmpBoard, this.rawAction, tmpBuffer[i], [], this.rawPromotionPieces)) {
            var pgnStr = 'Undo buffer is corrupted and an error has occurred with this move: ' + pgnFuncs.fromMove(tmpBuffer[i], tmpBoard, this.rawAction);
            console.error(pgnStr);
            throw pgnStr;
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
  undoable() {
    try {
      this.copy().undo();
      return true;
    }
    catch(err) { return false; }
  }
  checks(format = 'object') {
    var isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    var checks = mateFuncs.checks(this.rawBoard, this.rawAction, false);
    var tmpBoard = boardFuncs.copy(this.rawBoard);
    mateFuncs.blankAction(tmpBoard, this.rawAction);
    if(format === 'raw') { return checks; }
    if(format.includes('notation')) {
      var res = '';
      for(var i = 0;i < checks.length;i++) {
        res += notationFuncs.moveNotation(tmpBoard, this.rawAction, checks[i], format.includes('short')).str + '\n';
      }
      return res;
    }
    if(format.includes('5dpgn')) {
      var res = '';
      for(var i = 0;i < checks.length;i++) {
        res += pgnFuncs.fromMove(
          checks[i],
          tmpBoard,
          this.rawAction,
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        ) + '\n';
      }
      return res;
    }
    var res = [];
    for(var i = 0;i < checks.length;i++) {
      res.push(parseFuncs.fromMove(tmpBoard, checks[i], isTurnZero));
    }
    if(format === 'json') {
      return JSON.stringify(res);
    }
    return res;
  }
  get inCheckmate() {
    var latestBoard = this.rawBoardHistory[this.rawBoardHistory.length - 1];
    var hash = hashFuncs.hash(latestBoard);
    for(var i = 0;i < this.checkmateCache.length;i++) {
      if(hash === this.checkmateCache[i]) {
        return true;
      }
    }
    var res = mateFuncs.checkmate(latestBoard, this.rawAction, this.checkmateTimeout);
    if(res[0] && !res[1]) {
      this.checkmateCache.push(hash);
    }
    return res[0];
  }
  get inCheck() {
    return mateFuncs.checks(this.rawBoard, this.rawAction, true);
  }
  get inStalemate() {
    var latestBoard = this.rawBoardHistory[this.rawBoardHistory.length - 1];
    return mateFuncs.stalemate(latestBoard, this.rawAction, this.checkmateTimeout)[0];
  }
  get hash() {
    return md5(this.fen(null, true).replace(/\n/g,''));
  }
  export(format = '5dpgn') {
    var board = this.rawBoard;
    var isTurnZero = boardFuncs.isTurnZero(board);
    if(format === 'raw') { return this.rawActionHistory; }
    if(format === 'json') { return JSON.stringify(this.rawActionHistory.map((e,i) => {
      return parseFuncs.fromAction(this.rawBoardHistory[i], i, e, isTurnZero);
    })); }
    if(format === 'object') { return this.rawActionHistory.map((e,i) => {
      return parseFuncs.fromAction(this.rawBoardHistory[i], i, e, isTurnZero);
    }); }
    var res = '';
    res += metadataFuncs.objToStr(this.metadata);
    if(format.includes('notation')) {
      var tmpBoard = boardFuncs.copy(boardFuncs.init(this.metadata.board));
      for(var i = 0;i < this.rawActionHistory.length;i++) {
        for(var j = 0;j < this.rawActionHistory[i].length;j++) {
          var currMove = this.rawActionHistory[i][j];
          res += notationFuncs.moveNotation(tmpBoard, i, currMove, format.includes('short')).str + '\n';
          boardFuncs.move(tmpBoard, currMove);
        }
      }
    }
    if(format.includes('5dpgn')) {
      if(this.metadata.board === 'custom') {
        res += this.fen();
      }
      var suffixArr = []; //TODO implement check, checkmate, softmate
      res += pgnFuncs.fromActionHistory(
        this.rawActionHistory,
        this.rawBoardHistory[0],
        this.rawStartingAction,
        format.includes('inline') ? ' ' : '\n',
        suffixArr,
        format.includes('active'),
        format.includes('timeline'),
        format.includes('superphysical')
      );
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
      console.log('  ' + pgnFuncs.fromMove(this.rawMoveBuffer[i], this.rawBoard, this.rawAction));
    }
    console.log(printFuncs.printBoard(this.rawBoard));
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
    var board = this.rawBoard;
    var isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    var tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
    for(var i = 0;i < this.rawMoveBuffer.length;i++) {
      res.push(parseFuncs.fromMove(tmpBoard, this.rawMoveBuffer[i], isTurnZero));
      boardFuncs.move(tmpBoard, this.rawMoveBuffer[i]);
    }
    return res;
  }
  get player() {
    return (this.rawAction % 2 === 0 ? 'white' : 'black');
  }
  get variants() {
    return metadataFuncs.variantDict.map(v => {
      return {
        name: v[0],
        shortName: v[1]
      };
    });
  }
}

module.exports = Chess;
