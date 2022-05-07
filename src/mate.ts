const present = require('present');
import * as boardFuncs from './board';
import * as turnFuncs from './turn';
import { FullBoard, MoveArray, TimelineArray, TurnArray } from './types/chess';

export function blankAction(fullBoard: FullBoard, actionNum: number): void {
  const presentTimelines: number[] = boardFuncs.present(fullBoard, actionNum);

  for (const timeline of presentTimelines) {
    const currTimeline: TimelineArray = fullBoard[timeline];

    if (!currTimeline) continue;

    const newTurn: TurnArray = turnFuncs.copy(fullBoard, timeline, currTimeline.length - 1);

    // let latestTurn = currTimeline[currTimeline.length - 1];
    if ((currTimeline.length - 1) % 2 != actionNum % 2) continue;


    fullBoard[timeline][currTimeline.length] = newTurn;
  }
}

export function getChecks(fullBoard: FullBoard, actionNum: number, detectionOnly: boolean = false): MoveArray[] | boolean {
  const tmpBoard: FullBoard = boardFuncs.copy(fullBoard);
  const pieceColor: number = actionNum % 2;
  let checks: MoveArray[] = [];

  blankAction(tmpBoard, actionNum); // ;-;

  const moves: MoveArray[] = boardFuncs.moves(tmpBoard, actionNum + 1, false, false);

  for (const move of moves) {
    if (move.length === 2 && boardFuncs.positionExists(tmpBoard, move[1])) {
      const absDestPiece: number = Math.abs(tmpBoard[move[1][0]][move[1][1]][move[1][2]][move[1][3]]);

      if (
        (
          absDestPiece == 11 || absDestPiece == 12 // King
          || absDestPiece == 19 || absDestPiece == 20 // Royal queen
        ) && absDestPiece % 2 == pieceColor
      ) {

        if (detectionOnly) return true;

        checks.push(move);
      }
    }
  }

  if (detectionOnly) return false;

  return checks;
}

export function isCheckmate(fullBoard: FullBoard, actionNum: number, maxTime: number = 60000): boolean[] {
  const inCheck: boolean = getChecks(fullBoard, actionNum, true) as boolean;

  if (!inCheck) return [false, false];

  const start: number = present();

  // Super fast single pass looking for moves solving checks
  const moves: MoveArray[] = boardFuncs.moves(fullBoard, actionNum, false, false);

  for (const move of moves) {
    const tmpBoard: FullBoard = boardFuncs.copy(fullBoard);

    boardFuncs.move(tmpBoard, move);

    const inCheck: boolean = getChecks(tmpBoard, actionNum, true) as boolean;

    if (!inCheck) return [false, false];

    if ((present() - start) > maxTime) return [true, true];
  }

  // Fast pass looking for moves solving checks using DFS
  const recurse = (fullBoard: FullBoard, actionNum: number, checks: MoveArray[] = []): boolean[] => {
    const moves: MoveArray[] = boardFuncs.moves(fullBoard, actionNum, false, false);

    if (checks.length <= 0) checks = getChecks(fullBoard, actionNum) as MoveArray[];

    if (checks.length <= 0) return [false, false];

    if ((present() - start) > maxTime) return [true, true];

    for (const move of moves) {
      const tmpBoard: FullBoard = boardFuncs.copy(fullBoard);

      boardFuncs.move(tmpBoard, move);

      const tmpChecks: MoveArray[] = getChecks(tmpBoard, actionNum) as MoveArray[];
      const solvedACheck: boolean = tmpChecks.length < checks.length;

      if (solvedACheck && !recurse(tmpBoard, actionNum, tmpChecks)[0]) {

        return [false, false];
      }
    }

    return [true, false];
  }

  const recurseResult: boolean[] = recurse(fullBoard, actionNum);

  if (!recurseResult[0] || recurseResult[1]) return recurseResult;

  const checkSig = (checks: MoveArray[]): { length: number, sig: number[] } => {
    let sigObject: { length: number, sig: number[] } = {
      length: checks.length,
      sig: []
    };

    checks.sort(moveCompare);

    sigObject.sig = checks.flat(2);

    return sigObject;
  };

  let nodeSort = (node1: MoveTree, node2: MoveTree): number => {

    if (node1.checkSig.length != node2.checkSig.length) {

      return node1.checkSig.length - node2.checkSig.length;
    }

    if (node1.checkSig.sig.length != node2.checkSig.sig.length) {

      return node1.checkSig.sig.length - node2.checkSig.sig.length;
    }

    for (let i = 0; i < node1.checkSig.sig.length; i++) {
      if (node1.checkSig.sig[i] == node2.checkSig.sig[i]) continue;

      return node1.checkSig.sig[i] - node2.checkSig.sig[i];
    }

    return node1.board.length - node2.board.length;
  };

  // let exhausted = false;
  let moveTreeIndex: number = 0;

  type MoveTree = { board: FullBoard, checkSig: { length: number, sig: number[] } }

  let moveTree: MoveTree[] = [{
    board: fullBoard,
    checkSig: checkSig(getChecks(fullBoard, actionNum) as MoveArray[])
  }];

  //Slow BFS exhaustive search prioritizing check solving, check changing, then timeline changing moves
  while (moveTreeIndex < moveTree.length) {

    if ((present() - start) > maxTime) return [true, true];

    const currNode: MoveTree = moveTree[moveTreeIndex];

    if (currNode) {
      const moves: MoveArray[] = boardFuncs.moves(currNode.board, actionNum, false, false);
      let tmpMoveTree: MoveTree[] = [];

      for (const move of moves) {
        const tmpBoard: FullBoard = boardFuncs.copy(currNode.board);

        boardFuncs.move(tmpBoard, move);

        const tmpChecks: MoveArray[] = getChecks(tmpBoard, actionNum) as MoveArray[];

        if (tmpChecks.length <= 0) return [false, false];

        const tmpCheckSig: { length: number, sig: number[] } = checkSig(tmpChecks);

        tmpMoveTree.push({
          board: tmpBoard,
          checkSig: tmpCheckSig
        });
      }

      tmpMoveTree.sort((e1, e2) => nodeSort(currNode, e2) - nodeSort(currNode, e1));

      for (const tmpMoveNode of tmpMoveTree) {
        moveTree.push(tmpMoveNode);
      }

      moveTree.splice(0, 1);

      moveTreeIndex--;
    }

    moveTreeIndex++;
  }

  return [true, false];
}

export function isStalemate(fullBoard: FullBoard, actionNum: number, maxTime: number = 60000): boolean[] {
  //TODO: Add stalemate testing
  const inCheck: boolean = getChecks(fullBoard, actionNum, true) as boolean;
  const start: number = present();
  const moveTree: FullBoard[] = [fullBoard];

  if (inCheck) return [false, false];

  //DFS search for valid action
  while (moveTree.length > 0) {

    if ((present() - start) > maxTime) return [true, true];

    const currNode: FullBoard = moveTree[0];

    if (currNode) {
      const moves: MoveArray[] = boardFuncs.moves(currNode, actionNum, false, false);

      for (const move of moves) {
        const tmpBoard: FullBoard = boardFuncs.copy(currNode);

        boardFuncs.move(tmpBoard, move);

        const inCheck: boolean = getChecks(tmpBoard, actionNum, true) as boolean;

        if (inCheck) continue;

        const presentTimelines: number[] = boardFuncs.present(tmpBoard, actionNum);

        if (presentTimelines.length <= 0) return [false, false];

        moveTree.push(tmpBoard);
      }
    }

    moveTree.splice(0, 1);
  }

  return [true, false];
}

export function moveCompare(move1: MoveArray, move2: MoveArray): number {

  if (Array.isArray(move1)) {

    if (!Array.isArray(move2)) return -1;

    if (move1.length != move2.length) return move1.length - move2.length;


    for (let i = 0; i < move1.length; i++) {

      if (move1[i].length != move2[i].length) continue;

      for (let j = 0; j < move1[i].length; j++) {

        if (move1[i][j] != move2[i][j]) return move1[i][j] - move2[i][j];
      }

      return move1[i].length - move2[i].length;
    }
  }

  if (Array.isArray(move2)) return 1;

  return 0;
}
