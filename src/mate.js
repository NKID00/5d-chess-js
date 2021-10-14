const present = require('present');
const boardFuncs = require('@local/board');
const turnFuncs = require('@local/turn');

exports.blankAction = (fullBoard, actionNum) => {
  const presentTimelines = boardFuncs.present(fullBoard, actionNum);

  for (const timeline of presentTimelines) {
    const currTimeline = fullBoard[timeline];

    if (!currTimeline) continue;

    const newTurn = turnFuncs.copy(fullBoard, timeline, currTimeline.length - 1);

    // let latestTurn = currTimeline[currTimeline.length - 1];
    if ((currTimeline.length - 1) % 2 != actionNum % 2) continue;


    fullBoard[timeline][currTimeline.length] = newTurn;
  }
}

exports.checks = (fullBoard, actionNum, detectionOnly = false) => {
  const tmpBoard = boardFuncs.copy(fullBoard);
  const pieceColor = actionNum % 2;
  let res = [];

  this.blankAction(tmpBoard, actionNum); // ;-;

  const moves = boardFuncs.moves(tmpBoard, actionNum + 1, false, false);

  for (const move of moves) {
    if (move.length === 2 && boardFuncs.positionExists(tmpBoard, move[1])) {
      const absDestPiece = Math.abs(tmpBoard[move[1][0]][move[1][1]][move[1][2]][move[1][3]]);

      if (
        (
          absDestPiece == 11 || absDestPiece == 12 // King
          || absDestPiece == 19 || absDestPiece == 20 // Royal queen
        ) && absDestPiece % 2 == pieceColor
      ) {

        if (detectionOnly) return true;

        res.push(move);
      }
    }
  }

  if (detectionOnly) return false;

  return res;
}

exports.checkmate = (fullBoard, actionNum, maxTime = 60000) => {
  const inCheck = this.checks(fullBoard, actionNum, true);

  if (!inCheck) return [false, false];

  const start = present();

  // Super fast single pass looking for moves solving checks
  const moves = boardFuncs.moves(fullBoard, actionNum, false, false);

  for (const move of moves) {
    const tmpBoard = boardFuncs.copy(fullBoard);

    boardFuncs.move(tmpBoard, move);

    const inCheck = this.checks(tmpBoard, actionNum, true);

    if (!inCheck) return [false, false];

    if ((present() - start) > maxTime) return [true, true];
  }

  // Fast pass looking for moves solving checks using DFS
  let recurse = (fullBoard, actionNum, checks = []) => {
    const moves = boardFuncs.moves(fullBoard, actionNum, false, false);

    if (checks.length <= 0) checks = this.checks(fullBoard, actionNum);

    if (checks.length <= 0) return [false, false];

    if ((present() - start) > maxTime) return [true, true];

    for (const move of moves) {
      const tmpBoard = boardFuncs.copy(fullBoard);

      boardFuncs.move(tmpBoard, move);

      const tmpChecks = this.checks(tmpBoard, actionNum);
      const solvedACheck = tmpChecks.length < checks.length;

      if (solvedACheck && !recurse(tmpBoard, actionNum, tmpChecks)[0]) {

        return [false, false];
      }
    }

    return [true, false];
  }

  const recurseResult = recurse(fullBoard, actionNum);

  if (!recurseResult[0] || recurseResult[1]) return recurseResult;

  const checkSig = (checks) => {
    let res = {
      length: checks.length,
      sig: []
    };

    checks.sort(this.moveCompare);

    res.sig = checks.flat(2);

    return res;
  };

  let nodeSort = (n1, n2) => {

    if (n1.checkSig.length != n2.checkSig.length) {

      return n1.checkSig.length - n2.checkSig.length;
    }

    if (n1.checkSig.sig.length != n2.checkSig.sig.length) {

      return n1.checkSig.sig.length - n2.checkSig.sig.length;
    }

    for (let i = 0; i < n1.checkSig.sig.length; i++) {
      if (n1.checkSig.sig[i] == n2.checkSig.sig[i]) continue;

      return n1.checkSig.sig[i] - n2.checkSig.sig[i];
    }

    return n1.board.length - n2.board.length;
  };

  // let exhausted = false;
  let moveTreeIndex = 0;
  let moveTree = [{
    board: fullBoard,
    checkSig: checkSig(this.checks(fullBoard, actionNum))
  }];

  //Slow BFS exhaustive search prioritizing check solving, check changing, then timeline changing moves
  while (moveTreeIndex < moveTree.length) {

    if ((present() - start) > maxTime) return [true, true];

    const currNode = moveTree[moveTreeIndex];

    if (currNode) {
      const moves = boardFuncs.moves(currNode, actionNum, false, false);
      let tmpMoveTree = [];

      for (const move of moves) {
        const tmpBoard = boardFuncs.copy(currNode);

        boardFuncs.move(tmpBoard, move);

        const tmpChecks = this.checks(tmpBoard, actionNum);

        if (tmpChecks.length <= 0) return [false, false];

        const tmpCheckSig = checkSig(tmpChecks);

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

exports.stalemate = (fullBoard, actionNum, maxTime = 60000) => {
  //TODO: Add stalemate testing
  const inCheck = this.checks(fullBoard, actionNum, true);
  const start = present();
  const moveTree = [fullBoard];

  if (inCheck) return [false, false];

  //DFS search for valid action
  while (moveTree.length > 0) {

    if ((present() - start) > maxTime) return [true, true];

    const currNode = moveTree[0];

    if (currNode) {
      const moves = boardFuncs.moves(currNode, actionNum, false, false);

      for (const move of moves) {
        const tmpBoard = boardFuncs.copy(currNode);

        boardFuncs.move(tmpBoard, move);

        const inCheck = this.checks(tmpBoard, actionNum, true);

        if (inCheck) continue;

        const presentTimelines = boardFuncs.present(tmpBoard, actionNum);

        if (presentTimelines.length <= 0) return [false, false];

        moveTree.push(tmpBoard);
      }
    }

    moveTree.splice(0, 1);
  }

  return [true, false];
}

exports.moveCompare = (move1, move2) => {

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
