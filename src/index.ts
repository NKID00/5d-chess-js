require('module-alias/register');
const md5 = require('blueimp-md5');

import * as convertFuncs from './convert';
import * as actionFuncs from './action';
import * as boardFuncs from './board';
import * as copyFuncs from './copy';
import * as fenFuncs from './fen';
import * as hashFuncs from './hash';
import * as parseFuncs from './parse';
import * as pgnFuncs from './pgn';
import * as pieceFuncs from './piece';
import * as printFuncs from './print';
import * as mateFuncs from './mate';
import * as metadataFuncs from './metadata';
import * as turnFuncs from './turn';
import * as validateFuncs from './validate';

import { Action, ActionArray, Board, FullBoard, Move, MoveArray, State } from './types/chess';
import { type } from 'os';

export class Chess {
  raw: {
    actionFuncs: Object;
    boardFuncs: Object;
    convertFuncs: Object;
    fenFuncs: Object;
    hashFuncs: Object;
    mateFuncs: Object;
    metadataFuncs: Object;
    parseFuncs: any;
    pgnFuncs: Object;
    pieceFuncs: Object;
    printFuncs: Object;
    turnFuncs: Object;
    validateFuncs: Object;
  }
  checkmateTimeout: number;
  skipDetection: boolean;
  enableConsole: boolean;
  checkmateCache: any[];
  metadata: {
    board: string;
    mode: string;
    promotions?: string;
    size?: string;
  };
  rawPromotionPieces: number[];
  rawAction: number;
  rawStartingAction: number;
  rawBoardHistory: FullBoard[];
  rawBoard: FullBoard;
  rawActionHistory: ActionArray[];
  rawMoveBuffer: any;

  constructor(input?: undefined | string, variant?: string | Object | undefined) {
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

    if (typeof input === 'undefined') {

      switch (typeof variant) {
        case 'string':
          this.metadata.board = metadataFuncs.lookupVariant(variant);
          this.reset(this.metadata.board);
          break;
        case 'object':
          this.metadata.board = 'custom';
          this.reset(variant);
          break;
        default:
          this.reset();
          break;
      }
    } else {
      this.import(input, variant);
    }
  }

  copy(): Chess {
    let newInstance: Chess = new Chess();

    newInstance.setState(this.getState());

    return newInstance;
  }

  /**
 * @deprecated The method should not be used
 */
  state(state = null) {
    if (state == null) {
      let currentState: State = {
        checkmateTimeout: this.checkmateTimeout,
        skipDetection: this.skipDetection,
        enableConsole: this.enableConsole,
        checkmateCache: this.checkmateCache.slice(),
        metadata: Object.assign({}, this.metadata),
        rawAction: this.rawAction,
        rawStartingAction: this.rawStartingAction,
        rawBoardHistory: [] as FullBoard[],
        rawBoard: boardFuncs.copy(this.rawBoard),
        rawActionHistory: copyFuncs.actions(this.rawActionHistory),
        rawMoveBuffer: copyFuncs.action(this.rawMoveBuffer),
        rawPromotionPieces: this.rawPromotionPieces.slice()
      } as State;

      for (const board of this.rawBoardHistory) {
        currentState.rawBoardHistory.push(boardFuncs.copy(board));
      }

      return currentState
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

  setState(state: State) {
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

  getState(): State {
    let currentState: State = {
      checkmateTimeout: this.checkmateTimeout,
      skipDetection: this.skipDetection,
      enableConsole: this.enableConsole,
      checkmateCache: this.checkmateCache.slice(),
      metadata: Object.assign({}, this.metadata),
      rawAction: this.rawAction,
      rawStartingAction: this.rawStartingAction,
      rawBoardHistory: [] as FullBoard[],
      rawBoard: boardFuncs.copy(this.rawBoard),
      rawActionHistory: copyFuncs.actions(this.rawActionHistory),
      rawMoveBuffer: copyFuncs.action(this.rawMoveBuffer),
      rawPromotionPieces: this.rawPromotionPieces.slice()
    } as State;

    for (const board of this.rawBoardHistory) {
      currentState.rawBoardHistory.push(boardFuncs.copy(board));
    }

    return currentState
  }

  compare(input1: string | FullBoard | Board | MoveArray | Move, input2: string | FullBoard | Board | MoveArray | Move, type: 'board' | 'move' = 'board'): number {

    switch (type) {

      case 'board':
        const board1: FullBoard = convertFuncs.board(input1 as string | FullBoard | Board);
        const board2: FullBoard = convertFuncs.board(input2 as string | FullBoard | Board);
        return boardFuncs.compare(board1, board2);

      case 'move':
        const move1: MoveArray = convertFuncs.move(input1 as string | MoveArray | Move, this.rawBoard, this.rawAction, this.rawPromotionPieces) as MoveArray;
        const move2: MoveArray = convertFuncs.move(input2 as string | MoveArray | Move, this.rawBoard, this.rawAction, this.rawPromotionPieces) as MoveArray;
        return mateFuncs.moveCompare(move1, move2);

      default:
        throw new Error('Type not supported, valid types are \'board\' and \'move\'.');
    }
  }

  reset(variant?: string | Object): void {
    this.rawAction = 0;
    this.rawActionHistory = [];
    this.rawMoveBuffer = [];

    switch (typeof variant) {
      case 'string':
        this.metadata.board = metadataFuncs.lookupVariant(variant);
        this.rawBoard = boardFuncs.init(this.metadata.board);
        break;
      case 'object':
        this.metadata.board = 'custom';
        this.rawBoard = boardFuncs.init(variant);
        break;
      default:
        this.rawBoard = boardFuncs.init(this.metadata.board);
    }

    if (Array.isArray(this.rawBoard[0])) {
      this.rawAction = this.rawBoard[0].length % 2 == 0 ? 1 : 0;
    }

    this.rawStartingAction = this.rawAction;
    this.rawBoardHistory = [boardFuncs.copy(this.rawBoard)];
    this.rawPromotionPieces = pieceFuncs.getAvailablePromotionPieces(this.rawBoard);
  }

  import(input: string | Action[], variant?: string | Object, actionsRequired: boolean = false): void {
    //Reset everything to "Standard" as a default
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

        if (i + 1 >= actions.length) {
          try {

            this.submit();

          } catch (err) {

            if (this.enableConsole) {
              console.error(err);
              console.log('Last action is not complete, importing as move buffer.');
            }
          }
        } else {
          this.submit();
        }
      }
    } catch (err) {
      if (this.enableConsole) {
        console.error(err);
        if (!actionsRequired) {
          console.log('Error importing actions, skipping...');
        }
      }
      if (actionsRequired) {
        throw err;
      }
    }
  }

  importable(input: string | Action[], variant: any, actionsRequired: boolean = false): boolean {
    try {
      let newInstance: Chess = this.copy();

      newInstance.import(input, variant, actionsRequired);

      return true;
    }
    catch (err) { return false; }
  }

  fen(input?: string | any, currentBoard: boolean = false): string {

    if (typeof input === 'string') {

      const isTurnZero: boolean = input.includes('0:b]') || input.includes('0:w]');
      const isEvenTimeline: boolean = input.includes(':+0:') || input.includes(':-0:');

      // Read width and height
      let width: number = 8;
      let height: number = 8;

      let match: string | string[];

      Object.assign(this.metadata, metadataFuncs.strToObj(input));

      if (match = /^(\d+)x(\d+)$/.exec(this.metadata.size || "")) {

        width = +match[1];
        height = +match[2];
      }


      // Look for 5DFEN strings and parse them
      for (let line of input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n')) {

        line = line.trim();

        if (line.startsWith('[') && line.endsWith(']') && !/\s/.exec(line)) {

          let [turn, l, t] = fenFuncs.fromFen(line, width, height, isTurnZero, isEvenTimeline) as any[];

          boardFuncs.setTurn(this.rawBoard, l, t, turn);
        }
      }
    } else if (!currentBoard) {
      const firstBoard: FullBoard = this.rawBoardHistory[0];
      const isTurnZero: boolean = boardFuncs.isTurnZero(firstBoard);
      const isEvenTimeline: boolean = boardFuncs.isEvenTimeline(firstBoard);
      let res: string = '';

      for (let l = 0; l < firstBoard.length; l++) {
        for (let t = 0; firstBoard[l] && t < firstBoard[l].length; t++) {

          if (firstBoard[l][t]) res += fenFuncs.toFen(firstBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';

        }
      }

      return res;

    } else {
      const isTurnZero: boolean = boardFuncs.isTurnZero(this.rawBoard);
      const isEvenTimeline: boolean = boardFuncs.isEvenTimeline(this.rawBoard);
      let res: string = '';

      for (let l = this.rawBoard.length - 1; l > 0; l--) {

        if (!this.rawBoard[l] || l % 2 == 0) continue;

        for (let t = 0; t < this.rawBoard[l].length; t++) {

          if (this.rawBoard[l][t]) res += fenFuncs.toFen(this.rawBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';

        }
      }

      for (let l = 0; l < this.rawBoard.length; l++) {

        if (!this.rawBoard[l] || l % 2 != 0) continue;

        for (let t = 0; t < this.rawBoard[l].length; t++) {

          if (this.rawBoard[l][t]) res += fenFuncs.toFen(this.rawBoard[l][t], l, t, isTurnZero, isEvenTimeline) + '\n';

        }
      }
      return res;
    }
  }

  fenable(input: any): boolean {
    try {
      let newInstance: Chess = this.copy();

      newInstance.fen(input);

      return true;
    }
    catch (err) { return false; }
  }

  pass(): void {
    if (!this.skipDetection) {

      if (this.inCheckmate) throw new Error('Cannot submit, currently in checkmate.');

      if (this.inStalemate) throw new Error('Cannot submit, currently in stalemate.');

    }

    mateFuncs.blankAction(this.rawBoard, this.rawAction);

    this.submit();
  }

  passable(): boolean {
    try {
      let newInstance: Chess = this.copy();

      newInstance.pass();

      return true;
    }
    catch (err) { return false; }
  }

  action(input: string | Action | Move[]): void {
    const moves: MoveArray[] = convertFuncs.action(input, this.rawBoard, this.rawAction, this.rawPromotionPieces);

    for (const move of moves) {
      this.move(move);
    }

    this.submit();
  }

  actions(format: string = 'object', activeOnly: boolean = true, presentOnly: boolean = true, newActiveTimelinesOnly: boolean = true): string | Action[] {
    const isTurnZero: boolean = boardFuncs.isTurnZero(this.rawBoard);
    const actions: any = actionFuncs.actions(this.rawBoard, this.rawAction, activeOnly, presentOnly, newActiveTimelinesOnly, this.rawPromotionPieces);

    if (format === 'raw') return actions;

    if (format.includes('notation') || format.includes('5dpgn')) {
      let pgn: string = '';

      for (const action of actions) {

        const actionPgn = pgnFuncs.fromMove(
          action,
          this.rawBoard,
          this.rawAction,
          '',
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        )

        pgn += `${actionPgn}\n`;

      }
      return pgn;
    }

    let actionList: Action[] = [];
    for (let i = 0; i < actions.length; i++) {

      if (this.skipDetection || this.actionable(actions[i])) {
        actionList.push(parseFuncs.fromAction(this.rawBoard, this.rawAction, actions[i], isTurnZero));
      }

    }

    return (format == 'json') ? JSON.stringify(actionList) : actionList;
  }

  actionable(input: string | Move[]): boolean {
    try {
      let newInstance = this.copy();

      newInstance.action(input);

      return true;
    }
    catch (err) { return false; }
  }

  move(input: string | Move | MoveArray): void {
    const move: MoveArray = convertFuncs.move(input, this.rawBoard, this.rawAction, this.rawPromotionPieces) as MoveArray;

    if (!this.skipDetection && !this.moveable(move)) {

      const pgnStr = `Move is invalid and an error has occurred with this move: ${move}`;

      if (this.enableConsole) {
        console.error(pgnStr);
      }

      throw new Error(pgnStr);

    }

    this.rawMoveBuffer.push(move);

    boardFuncs.move(this.rawBoard, move);
  }

  //TODO: fix, this is broken when calling string object functions directly on the function call, as is the fix is to set output 'as string'
  moves(format: string = 'object', activeOnly = true, presentOnly = true, spatialOnly = false): string | Move[] | MoveArray[] {

    if (!this.skipDetection && (this.inCheckmate || this.inStalemate)) return [];

    const moves: MoveArray[] = boardFuncs.moves(this.rawBoard, this.rawAction, activeOnly, presentOnly, spatialOnly, this.rawPromotionPieces);

    if (format == 'raw') return moves;

    const isTurnZero: boolean = boardFuncs.isTurnZero(this.rawBoard);

    if (format.includes('notation') || format.includes('5dpgn')) {
      let pgn = '';

      for (const move of moves) {

        const movePgn = `${pgnFuncs.fromMove(
          move,
          this.rawBoard,
          this.rawAction,
          '',
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        )}\n`;

        pgn += movePgn

      }

      return pgn;
    }

    let actionList = [];

    for (const move of moves) {
      actionList.push(parseFuncs.fromMove(this.rawBoard, move, isTurnZero));
    }

    return (format == 'json') ? JSON.stringify(actionList) : actionList;
  }

  moveable(input: string | Move | MoveArray, moveGen = []): boolean {
    try {
      if (this.skipDetection) return true;

      const move: MoveArray = convertFuncs.move(input, this.rawBoard, this.rawAction, this.rawPromotionPieces) as MoveArray;

      return validateFuncs.move(this.rawBoard, this.rawAction, move, moveGen, this.rawPromotionPieces);

    } catch (err) { return false; }
  }

  submit(): void {
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

  submittable(): boolean {

    if (!this.skipDetection && (this.inCheckmate || this.inStalemate) || this.inCheck) return false;

    return boardFuncs.present(this.rawBoard, this.rawAction).length <= 0;
  }

  undo(): void {
    if (this.rawMoveBuffer.length <= 0) throw new Error('No moves to undo.');

    let tmpBuffer: MoveArray[] = copyFuncs.action(this.rawMoveBuffer);
    tmpBuffer.pop();

    const tmpBoard: FullBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);

    for (const move of tmpBuffer) {

      if (!this.skipDetection) {

        if (!validateFuncs.move(tmpBoard, this.rawAction, move, [], this.rawPromotionPieces)) {
          const pgnStr: string = 'Undo buffer is corrupted and an error has occurred with this move: ' + pgnFuncs.fromMove(move, tmpBoard, this.rawAction);

          if (this.enableConsole) {
            console.error(pgnStr);
          }

          throw new Error(pgnStr);
        }
      }

      boardFuncs.move(tmpBoard, move);
    }

    this.rawBoard = boardFuncs.copy(tmpBoard);
    this.rawMoveBuffer = copyFuncs.action(tmpBuffer);

  }

  undoable(): boolean {
    try {
      this.copy().undo();

      return true;
    }
    catch (err) { return false; }
  }

  checks(format: string = 'object'): Move[] | MoveArray[] | string {
    const isTurnZero: boolean = boardFuncs.isTurnZero(this.rawBoard);
    const checks: MoveArray[] = mateFuncs.getChecks(this.rawBoard, this.rawAction, false) as MoveArray[];
    const tmpBoard: FullBoard = boardFuncs.copy(this.rawBoard);

    mateFuncs.blankAction(tmpBoard, this.rawAction);

    if (format == 'raw') return checks;

    if (format.includes('notation') || format.includes('5dpgn')) {
      let res: string = '';

      for (const check of checks) {
        res += pgnFuncs.fromMove(
          check,
          tmpBoard,
          this.rawAction,
          undefined,
          format.includes('active'),
          format.includes('timeline'),
          format.includes('superphysical')
        ) + '\n';
      }

      return res;
    }

    let res: Move[] = [];

    for (const check of checks) {
      res.push(parseFuncs.fromMove(tmpBoard, check, isTurnZero));
    }

    return (format === 'json') ? JSON.stringify(res) : res;

  }

  get inCheckmate(): boolean {
    const latestBoard: FullBoard = this.rawBoardHistory[this.rawBoardHistory.length - 1];
    const hash: string = hashFuncs.hash(latestBoard);

    for (const checkmate of this.checkmateCache) {

      if (hash == checkmate) return true;

    }

    let res: boolean[] = mateFuncs.isCheckmate(latestBoard, this.rawAction, this.checkmateTimeout);

    if (res[0] && !res[1]) this.checkmateCache.push(hash);

    return res[0];
  }

  get inCheck(): boolean {

    return mateFuncs.getChecks(this.rawBoard, this.rawAction, true) as boolean;

  }

  get inStalemate(): boolean {

    const latestBoard: FullBoard[] = this.rawBoardHistory[this.rawBoardHistory.length - 1];

    return mateFuncs.isStalemate(latestBoard, this.rawAction, this.checkmateTimeout)[0];

  }

  get hash(): string {

    return md5(this.fen(null, true).replace(/\n/g, ''));

  }

  export(format: string = '5dpgn'): string | ActionArray[] | Action[] {
    const fullBoard: FullBoard = this.rawBoard;
    const isTurnZero: boolean = boardFuncs.isTurnZero(fullBoard);

    if (format == 'raw') return this.rawActionHistory;

    if (format == 'json') {

      return JSON.stringify(this.rawActionHistory.map((e, i) => {

        return parseFuncs.fromAction(this.rawBoardHistory[i], i, e, isTurnZero);

      }));
    }

    if (format == 'object') {

      return this.rawActionHistory.map((e, i) => {

        const action = parseFuncs.fromAction(this.rawBoardHistory[i], i, e, isTurnZero);

        return action

      });
    }

    let rawString: string = `${metadataFuncs.objToStr(this.metadata)}`;

    if (format.includes('5dpgn')) {
      if (this.metadata.board == 'custom') rawString += this.fen();

      const suffixArr = []; //TODO implement check, checkmate, softmate

      rawString += pgnFuncs.fromActionHistory(
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

    return rawString;
  }

  print(): string {
    let res: string = `Current Player: ${this.rawAction % 2 === 0 ? 'White' : 'Black'}\nAction Number: ${Math.ceil(this.rawAction / 2) + 1}\n`;

    if (this.rawMoveBuffer.length > 0) res += 'Move Stack:\n';

    for (const rawMove of this.rawMoveBuffer) {

      res += `  ${pgnFuncs.fromMove(rawMove, this.rawBoard, this.rawAction)}\n`;

    }

    res += printFuncs.printBoard(this.rawBoard);

    if (this.enableConsole) {
      console.log(res);
    }

    return res;
  }

  //ask
  print2() {
    console.log('Current Player: ' + (this.rawAction % 2 === 0 ? 'White' : 'Black'));
    console.log('Action Number: ' + (Math.ceil(this.rawAction / 2) + 1));

    if (this.rawMoveBuffer.length > 0) console.log('Move Stack:');

    for (const rawMove of this.rawMoveBuffer) {

      console.log('  ' + pgnFuncs.fromMove(rawMove, this.rawBoard, this.rawAction));

    }

    console.log(printFuncs.printBoard(this.rawBoard));
  }

  get board(): Board {

    return parseFuncs.fromBoard(this.rawBoard, this.rawAction);

  }

  get actionNumber(): number {

    return Math.floor(this.rawAction / 2) + 1;

  }

  get boardHistory(): Board[] {
    let res: Board[] = [];

    for (let i = 0; i < this.rawBoardHistory.length; i++) {

      res.push(parseFuncs.fromBoard(this.rawBoardHistory[i], i));
    }

    return res;
  }

  get actionHistory(): Action[] {

    return this.export('object') as Action[];

  }

  //TODO:
  get moveBuffer(): Move[] {
    const isTurnZero: boolean = boardFuncs.isTurnZero(this.rawBoard);
    const tmpBoard: FullBoard = boardFuncs.copy(this.rawBoardHistory[this.rawBoardHistory.length - 1]);
    let moveBuffer = [];

    for (const rawMove of this.rawMoveBuffer) {

      moveBuffer.push(parseFuncs.fromMove(tmpBoard, rawMove, isTurnZero));

      boardFuncs.move(tmpBoard, rawMove);

    }

    return moveBuffer;
  }

  get player(): 'white' | 'black' {

    return (this.rawAction % 2 == 0 ? 'white' : 'black');

  }

  get variants(): { name: string, shortName: string }[] {

    return metadataFuncs.variantDict().map(v => {

      return {
        name: v[0],
        shortName: v[1]
      };

    });
  }
}