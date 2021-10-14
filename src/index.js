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
      parseFuncs: parseFuncs,
      pgnFuncs: pgnFuncs,
      pieceFuncs: pieceFuncs,
      printFuncs: printFuncs,
      turnFuncs: turnFuncs,
      validateFuncs: validateFuncs
    };

    this.checkmateTimeout = 60000;
    this.skipDetection = false;
    this.enableConsole = false;
    this.checkmateCache = [];
    this.metadata = {
      board: 'standard',
      mode: '5D'
    };

    this.rawPromotionPieces = []; //TODO: Expose this variable as endpoint for getting available promotions options

    if (typeof input != 'undefined') {
      this.import(input, variant);
    }
    else {

      if (typeof variant == 'string') {
        this.metadata.board = metadataFuncs.lookupVariant(variant);
        this.reset(this.metadata.board);
      }
      else if (typeof variant == 'object') {
        this.metadata.board = 'custom';
        this.reset(variant);
      }
      else {
        this.reset();
      }
    }
  }

  copy() {
    let newInstance = new Chess();

    newInstance.state(this.state());

    return newInstance;
  }

  state(state = null) {
    if (state == null) {
      let res = {}

      res.checkmateTimeout = this.checkmateTimeout;
      res.skipDetection = this.skipDetection;
      res.enableConsole = this.enableConsole;
      res.checkmateCache = this.checkmateCache.slice();
      res.metadata = Object.assign({}, this.metadata);
      res.rawAction = this.rawAction;
      res.rawStartingAction = this.rawStartingAction;
      res.rawBoardHistory = [];
      for (let i = 0; i < this.rawBoardHistory.length; i++) {
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
      this.enableConsole = state.enableConsole;
      this.checkmateCache = state.checkmateCache.slice();
      this.metadata = Object.assign({}, state.metadata);
      this.rawAction = state.rawAction;
      this.rawStartingAction = state.rawStartingAction;
      this.rawBoardHistory = [];
      for (let i = 0; i < state.rawBoardHistory.length; i++) {
        this.rawBoardHistory.push(boardFuncs.copy(state.rawBoardHistory[i]));
      }
      this.rawBoard = boardFuncs.copy(state.rawBoard);
      this.rawActionHistory = copyFuncs.actions(state.rawActionHistory);
      this.rawMoveBuffer = copyFuncs.action(state.rawMoveBuffer);
      this.rawPromotionPieces = state.rawPromotionPieces.slice();
    }
  }

  compare(input1, input2, type = 'board') {
    switch (type) {

      case 'board':
        const board1 = convertFuncs.board(input1);
        const board2 = convertFuncs.board(input2);
        return boardFuncs.compare(board1, board2);

      case 'move':
        const move1 = convertFuncs.move(input1, this.rawBoard, this.rawAction, this.rawPromotionPieces);
        const move2 = convertFuncs.move(input2, this.rawBoard, this.rawAction, this.rawPromotionPieces);
        return mateFuncs.moveCompare(move1, move2);

      default:
        throw new Error('Type not supported, valid types are \'board\' and \'move\'.');
    }
  }

  reset(variant) {
    if (typeof variant == 'string') {
      this.metadata.board = metadataFuncs.lookupVariant(variant);
      this.rawBoard = boardFuncs.init(this.metadata.board);
    }
    else if (typeof variant == 'object') {
      this.metadata.board = 'custom';
      this.rawBoard = boardFuncs.init(variant);
    }
    else {
      this.rawBoard = boardFuncs.init(this.metadata.board);
    }

    this.rawAction = 0;

    if (typeof this.rawBoard[0] != 'undefined' && this.rawBoard[0] != null) {
      this.rawAction = this.rawBoard[0].length % 2 == 0 ? 1 : 0;
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

    if (typeof input == 'string') {

      Object.assign(this.metadata, metadataFuncs.strToObj(input));

      if (typeof this.metadata.board == 'string') {

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

    if (this.metadata.board == 'custom') {

      this.fen(input);

      if (typeof this.rawBoard[0] !== 'undefined' && this.rawBoard[0] !== null) {
        this.rawAction = this.rawBoard[0].length % 2 === 0 ? 1 : 0;
      }

      this.rawStartingAction = this.rawAction;
      this.rawBoardHistory = [boardFuncs.copy(this.rawBoard)];
    }

    try {
      let actions = convertFuncs.actions(input, this.rawBoardHistory[0], this.rawStartingAction, this.rawPromotionPieces);

      for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < actions[i].length; j++) {
          this.move(actions[i][j]);
        }

        if (i + 1 < actions.length) {
          this.submit();
        } else {

          try {

            this.submit();

          } catch (err) {

            if(this.enableConsole) {
              console.error(err);
              console.log('Last action is not complete, importing as move buffer.');
            }
          }
        }
      }
    } catch (err) {

      if(this.enableConsole) {
        console.error(err);
        console.log('Error importing actions, skipping.');
      }
    }
  }

  importable(input) {
    try {
      let newInstance = this.copy();

      newInstance.import(input);

      return true;
    }
    catch (err) { return false; }
  }

  fen(input, currentBoard = false) {
    if (typeof input === 'string') {
      // Read width and height
      let width = 8;
      let height = 8;

      let match;

      Object.assign(this.metadata, metadataFuncs.strToObj(input));

      if (match = /^(\d+)x(\d+)$/.exec(this.metadata.size || "")) {

        width = +match[1];
        height = +match[2];
      }

      const isTurnZero = input.includes('0:b]') || input.includes('0:w]');
      const isEvenTimeline = input.includes(':+0:') || input.includes(':-0:');

      // Look for 5DFEN strings and parse them
      for (let line of input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n')) {

        line = line.trim();

        if (line.startsWith('[') && line.endsWith(']') && !/\s/.exec(line)) {

          let [turn, l, t] = fenFuncs.fromFen(line, width, height, isTurnZero, isEvenTimeline);

          boardFuncs.setTurn(this.rawBoard, l, t, turn);
        }
      }
    } else if (!currentBoard) {
      const firstBoard = this.rawBoardHistory[0];
      const isTurnZero = boardFuncs.isTurnZero(firstBoard);
      const isEvenTimeline = boardFuncs.isEvenTimeline(firstBoard);
      let res = '';

      for (let l = 0; l < firstBoard.length; l++) {
        for (let t = 0; firstBoard[l] && t < firstBoard[l].length; t++) {

          if (firstBoard[l][t]) res += fenFuncs.toFen(firstBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';

        }
      }

      return res;

    } else {
      const isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
      const isEvenTimeline = boardFuncs.isEvenTimeline(this.rawBoard);
      let res = '';

      for (let l = this.rawBoard.length - 1; l > 0; l--) {

        if (this.rawBoard[l] && l % 2 == 0) continue;

        for (let t = 0; t < this.rawBoard[l].length; t++) {

          if (this.rawBoard[l][t]) res += fenFuncs.toFen(this.rawBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';

        }
      }

      for (let l = 0; l < this.rawBoard.length; l++) {

        if (this.rawBoard[l] && l % 2 != 0) continue;

        for (let t = 0; t < this.rawBoard[l].length; t++) {

          if (this.rawBoard[l][t]) res += fenFuncs.toFen(this.rawBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';

        }
      }
      return res;
    }
  }

  fenable(input) {
    try {
      let newInstance = this.copy();

      newInstance.fen(input);

      return true;
    }
    catch (err) { return false; }
  }

  pass() {
    if (!this.skipDetection) {

      if (this.inCheckmate) throw new Error('Cannot submit, currently in checkmate.');

      if (this.inStalemate) throw new Error('Cannot submit, currently in stalemate.');

    }

    mateFuncs.blankAction(this.rawBoard, this.rawAction);

    this.submit();
  }

  passable() {
    try {
      let newInstance = this.copy();

      newInstance.pass();

      return true;
    }
    catch (err) { return false; }
  }

  action(input) {
    const moves = convertFuncs.action(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);

    for (let i = 0; i < moves.length; i++) {
      this.move(moves[i]);
    }

    this.submit();
  }

  actions(format = 'object', activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true) {
    const isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    const actions = actionFuncs.actions(this.rawBoard, this.rawAction, activeOnly, presentOnly, newActiveTimelinesOnly, this.rawPromotionPieces);

    if (format === 'raw') return actions;

    if (format.includes('notation') || format.includes('5dpgn')) {
      let res = '';

      for (let i = 0; i < actions.length; i++) {

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
    for (let i = 0; i < actions.length; i++) {

      if (this.skipDetection || this.actionable(actions[i])) {
        res.push(parseFuncs.fromAction(this.rawBoard, this.rawAction, actions[i], isTurnZero));
      }

    }

    if (format == 'json') return JSON.stringify(res);

    return res;
  }

  actionable(input) {
    try {
      let newInstance = this.copy();

      newInstance.action(input);

      return true;
    }
    catch (err) { return false; }
  }

  move(input) {
    const move = convertFuncs.move(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);

    if (!this.skipDetection && !this.moveable(move)) {

      const pgnStr = 'Move is invalid and an error has occurred with this move: ' + move;

      if(this.enableConsole) {
        console.error(pgnStr);
      }

      throw new Error(pgnStr);

    }

    this.rawMoveBuffer.push(move);

    boardFuncs.move(this.rawBoard, move);
  }

  moves(format = 'object', activeOnly = true, presentOnly = true, spatialOnly = false) {
    const isTurnZero = boardFuncs.isTurnZero(this.rawBoard);

    if (!this.skipDetection) {
      if (this.inCheckmate || this.inStalemate) return [];
    }

    const moves = boardFuncs.moves(this.rawBoard, this.rawAction, activeOnly, presentOnly, spatialOnly, this.rawPromotionPieces);

    if (format == 'raw') return moves;

    if (format.includes('notation') || format.includes('5dpgn')) {
      let res = '';

      for (const move of moves) {

        res += pgnFuncs.fromMove(
          move,
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

    let res = [];

    for (const move of moves) {
      res.push(parseFuncs.fromMove(this.rawBoard, move, isTurnZero));
    }

    if (format == 'json') return JSON.stringify(res);

    return res;
  }

  moveable(input, moveGen = []) {
    try {
      if (this.skipDetection) return true;

      const move = convertFuncs.move(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);

      return validateFuncs.move(this.rawBoard, this.rawAction, move, moveGen, this.rawPromotionPieces);

    } catch (err) { return false; }
  }

  submit() {
    if (!this.skipDetection) {

      if (this.inCheckmate) throw new Error('Cannot submit, currently in checkmate.');

      if (this.inStalemate) throw new Error('Cannot submit, currently in stalemate.');

      if (this.inCheck) throw new Error('Cannot submit, currently in check.');

    }

    if (!this.submittable()) throw new Error('Action is not complete, more moves are needed');

    this.rawBoardHistory.push(boardFuncs.copy(this.rawBoard));
    this.rawActionHistory.push(copyFuncs.action(this.rawMoveBuffer));
    this.rawMoveBuffer = [];
    this.rawAction++;
  }

  submittable() {
    if (!this.skipDetection) {

      if (this.inCheckmate || this.inStalemate) return false;

    }

    if (this.inCheck) return false;

    return boardFuncs.present(this.rawBoard, this.rawAction).length <= 0;
  }

  undo() {
    if (this.rawMoveBuffer.length > 0) {
      let tmpBuffer = copyFuncs.action(this.rawMoveBuffer);
      tmpBuffer.pop();

      const tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);

      for (let i = 0; i < tmpBuffer.length; i++) {

        if (!this.skipDetection) {

          if (!validateFuncs.move(tmpBoard, this.rawAction, tmpBuffer[i], [], this.rawPromotionPieces)) {
            const pgnStr = 'Undo buffer is corrupted and an error has occurred with this move: ' + pgnFuncs.fromMove(tmpBuffer[i], tmpBoard, this.rawAction);

            if(this.enableConsole) {
              console.error(pgnStr);
            }

            throw new Error(pgnStr);
          }
        }

        boardFuncs.move(tmpBoard, tmpBuffer[i]);
      }

      this.rawBoard = boardFuncs.copy(tmpBoard);
      this.rawMoveBuffer = copyFuncs.action(tmpBuffer);
    } else {
      throw new Error('No moves to undo.');
    }
  }

  undoable() {
    try {
      this.copy().undo();

      return true;
    }
    catch (err) { return false; }
  }

  checks(format = 'object') {
    const isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    const checks = mateFuncs.checks(this.rawBoard, this.rawAction, false);
    const tmpBoard = boardFuncs.copy(this.rawBoard);

    mateFuncs.blankAction(tmpBoard, this.rawAction);

    if (format == 'raw') return checks;

    if (format.includes('notation') || format.includes('5dpgn')) {
      let res = '';

      for (const check of checks) {
        res += pgnFuncs.fromMove(
          check,
          tmpBoard,
          this.rawAction,
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        ) + '\n';
      }

      return res;
    }

    let res = [];

    for (const check of checks) {
      res.push(parseFuncs.fromMove(tmpBoard, check, isTurnZero));
    }

    if (format === 'json') return JSON.stringify(res);

    return res;
  }

  get inCheckmate() {
    const latestBoard = this.rawBoardHistory[this.rawBoardHistory.length - 1];
    const hash = hashFuncs.hash(latestBoard);

    for (const checkmate of this.checkmateCache) {

      if (hash == checkmate) return true;

    }

    let res = mateFuncs.checkmate(latestBoard, this.rawAction, this.checkmateTimeout);

    if (res[0] && !res[1]) this.checkmateCache.push(hash);

    return res[0];
  }

  get inCheck() {

    return mateFuncs.checks(this.rawBoard, this.rawAction, true);

  }

  get inStalemate() {

    const latestBoard = this.rawBoardHistory[this.rawBoardHistory.length - 1];

    return mateFuncs.stalemate(latestBoard, this.rawAction, this.checkmateTimeout)[0];

  }

  get hash() {

    return md5(this.fen(null, true).replace(/\n/g, ''));

  }

  export(format = '5dpgn') {
    const board = this.rawBoard;
    const isTurnZero = boardFuncs.isTurnZero(board);

    if (format == 'raw') return this.rawActionHistory;

    if (format == 'json') {

      return JSON.stringify(this.rawActionHistory.map((e, i) => {

        return parseFuncs.fromAction(this.rawBoardHistory[i], i, e, isTurnZero);

      }));
    }

    if (format == 'object') {

      return this.rawActionHistory.map((e, i) => {

        return parseFuncs.fromAction(this.rawBoardHistory[i], i, e, isTurnZero);

      });
    }

    let res = '' + metadataFuncs.objToStr(this.metadata);

    if (format.includes('notation') || format.includes('5dpgn')) {
      if (this.metadata.board == 'custom') res += this.fen();

      const suffixArr = []; //TODO implement check, checkmate, softmate

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
    let res = ''
    res += 'Current Player: ' + (this.rawAction % 2 === 0 ? 'White' : 'Black') + '\n';
    res += 'Action Number: ' + (Math.ceil(this.rawAction / 2) + 1) + '\n';

    if (this.rawMoveBuffer.length > 0) res += 'Move Stack:\n';

    for (const rawMove of this.rawMoveBuffer) {

      res += '  ' + pgnFuncs.fromMove(rawMove, this.rawBoard, this.rawAction) + '\n';

    }

    res += printFuncs.printBoard(this.rawBoard);

    if(this.enableConsole) {
      console.log(res);
    }

    return res;
  }

  print2() {
    console.log('Current Player: ' + (this.rawAction % 2 === 0 ? 'White' : 'Black'));
    console.log('Action Number: ' + (Math.ceil(this.rawAction / 2) + 1));

    if (this.rawMoveBuffer.length > 0) console.log('Move Stack:');

    for (const rawMove of this.rawMoveBuffer) {

      console.log('  ' + pgnFuncs.fromMove(rawMove, this.rawBoard, this.rawAction));

    }

    console.log(printFuncs.printBoard(this.rawBoard));
  }

  get board() {

    return parseFuncs.fromBoard(this.rawBoard, this.rawAction);

  }

  get actionNumber() {

    return Math.floor(this.rawAction / 2) + 1;

  }

  get boardHistory() {
    let res = [];

    for (let i = 0; i < this.rawBoardHistory.length; i++) {

      res.push(parseFuncs.fromBoard(this.rawBoardHistory[i], i));
    }

    return res;
  }

  get actionHistory() {

    return this.export('object');

  }

  get moveBuffer() {
    const isTurnZero = boardFuncs.isTurnZero(this.rawBoard);
    const tmpBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
    let res = [];

    for (const rawMove of this.rawMoveBuffer) {

      res.push(parseFuncs.fromMove(tmpBoard, rawMove, isTurnZero));

      boardFuncs.move(tmpBoard, rawMove);

    }

    return res;
  }

  get player() {

    return (this.rawAction % 2 == 0 ? 'white' : 'black');

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
