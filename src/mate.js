const present = require('present');
const boardFuncs = require('@local/board');
const turnFuncs = require('@local/turn');

exports.blankAction = (board, actionNum) => {
  //Pass on all present boards
  var presentTimelines = boardFuncs.present(board, actionNum);
  for(var i = 0;i < presentTimelines.length;i++) {
    if(board[presentTimelines[i]]) {
      var currTimeline = board[presentTimelines[i]];
      var latestTurn = currTimeline[currTimeline.length - 1];
      if((currTimeline.length - 1) % 2 === actionNum % 2) {
        var newTurn = turnFuncs.copy(board, presentTimelines[i], currTimeline.length - 1);
        board[presentTimelines[i]][currTimeline.length] = newTurn;
      }
    }
  }
}

exports.hasLegalAction = (board, actionNum, maxTime = 60000) => {
  var startTime = present();
  //Using penteract's hypercuboid search algorithm found here: https://github.com/penteract/cwmtt/blob/master/Game/Chess/TimeTravel/FastCheckmate.lhs
  var tmpBoard = boardFuncs.copy(board);
  /*
    Possible hypercuboid data:
     - Spatial only moves:
        - type: 'spatial'
        - move: move array
     - Arriving:
        - type: 'arrive'
        - move: move array
     - Leaving:
        - type: 'leave'
        - pos: [L,T,R,F]
     - Pass:
        - type: 'pass'
        - pos: [L,T]
  */
}

exports.checks = (board, actionNum, detectionOnly = false) => {
  var res = [];
  var tmpBoard = boardFuncs.copy(board);
  this.blankAction(tmpBoard, actionNum);
  var moves = boardFuncs.moves(tmpBoard, actionNum + 1, false, false);
  for(var i = 0;i < moves.length;i++) {
    if(moves[i].length === 2 && boardFuncs.positionExists(tmpBoard, moves[i][1])) {
      var destPiece = tmpBoard[moves[i][1][0]][moves[i][1][1]][moves[i][1][2]][moves[i][1][3]];
      if(
        (
          Math.abs(destPiece) === 11 || Math.abs(destPiece) === 12 // King
          || Math.abs(destPiece) === 19 || Math.abs(destPiece) === 20 // Royal queen
        ) && Math.abs(destPiece) % 2 === actionNum % 2
      ) {
        if(detectionOnly) { return true; }
        res.push(moves[i]);
      }
    }
  }
  if(detectionOnly) { return false; }
  return res;
}

exports.checkmate = (board, actionNum, maxTime = 60000) => {
  var inCheck = this.checks(board, actionNum, true);
  if(!inCheck) {
    return [false, false];
  }
  var start = present();

  // Super fast single pass looking for moves solving checks
  var moves = boardFuncs.moves(board, actionNum, false, false);
  for(var i = 0;i < moves.length;i++) {
    var tmpBoard = boardFuncs.copy(board);
    boardFuncs.move(tmpBoard, moves[i]);
    var inCheck = this.checks(tmpBoard, actionNum, true);
    if(!inCheck) { return [false, false]; }
    if((present() - start) > maxTime) { return [true, true]; }
  }
  // Fast pass looking for moves solving checks using DFS
  var recurse = (board, actionNum, checks = []) => {
    var moves = boardFuncs.moves(board, actionNum, false, false);
    if(checks.length <= 0) { checks = this.checks(board, actionNum); }
    if(checks.length <= 0) { return [false, false]; }
    if((present() - start) > maxTime) { return [true, true]; }
    for(var i = 0;i < moves.length;i++) {
      var tmpBoard = boardFuncs.copy(board);
      boardFuncs.move(tmpBoard, moves[i]);
      var tmpChecks = this.checks(tmpBoard, actionNum);
      var solvedACheck = tmpChecks.length < checks.length;
      if(solvedACheck) {
        if(!recurse(tmpBoard, actionNum, tmpChecks)[0]) {
          return [false, false];
        }
      }
    }
    return [true, false];
  }
  var r = recurse(board, actionNum);
  if(!r[0] || r[1]) { return r; }

  var checkSig = (checks) => {
    var res = {
      length: checks.length,
      sig: []
    };
    checks.sort(this.moveCompare);
    res.sig = checks.flat(2);
    return res;
  };
  var nodeSort = (n1, n2) => {
    if(n1.checkSig.length !== n2.checkSig.length) {
      return n1.checkSig.length - n2.checkSig.length;
    }
    if(n1.checkSig.sig.length !== n2.checkSig.sig.length) {
      return n1.checkSig.sig.length - n2.checkSig.sig.length;
    }
    for(var i = 0;i < n1.checkSig.sig.length;i++) {
      if(n1.checkSig.sig[i] !== n2.checkSig.sig[i]) {
        return n1.checkSig.sig[i] - n2.checkSig.sig[i];
      }
    }
    return n1.board.length - n2.board.length;
  };

  var exhausted = false;
  var moveTree = [{
    board: board,
    checkSig: checkSig(this.checks(board, actionNum))
  }];
  var moveTreeIndex = 0;
  //Slow BFS exhaustive search prioritizing check solving, check changing, then timeline changing moves
  while(moveTreeIndex < moveTree.length) {
    if((present() - start) > maxTime) { return [true, true]; }
    var currNode = moveTree[moveTreeIndex];
    if(currNode) {
      var moves = boardFuncs.moves(currNode, actionNum, false, false);
      var tmpMoveTree = [];
      for(var i = 0;i < moves.length;i++) {
        var tmpBoard = boardFuncs.copy(currNode);
        boardFuncs.move(tmpBoard, moves[i]);
        var tmpChecks = this.checks(tmpBoard, actionNum);
        if(tmpChecks.length <= 0) { return [false, false]; }
        var tmpCheckSig = checkSig(tmpChecks);
        tmpMoveTree.push({
          board: tmpBoard,
          checkSig: tmpCheckSig
        });
      }
      tmpMoveTree.sort((e1, e2) => nodeSort(currNode, e2) - nodeSort(currNode, e1));
      for(var i = 0;i < tmpMoveTree.length;i++) {
        moveTree.push(tmpMoveTree[i]);
      }
      moveTree.splice(0, 1);
      moveTreeIndex--;
    }
    moveTreeIndex++;
  }
  return [true, false];
}

exports.stalemate = (board, actionNum, maxTime = 60000) => {
  //TODO: Add stalemate testing
  var inCheck = this.checks(board, actionNum, true);
  if(inCheck) {
    return [false, false];
  }
  var start = present();

  var moveTree = [board];
  //DFS search for valid action
  while(moveTree.length > 0) {
    if((present() - start) > maxTime) { return [true, true]; }
    var currNode = moveTree[0];
    if(currNode) {
      var moves = boardFuncs.moves(currNode, actionNum, false, false);
      for(var i = 0;i < moves.length;i++) {
        var tmpBoard = boardFuncs.copy(currNode);
        boardFuncs.move(tmpBoard, moves[i]);
        var inCheck = this.checks(tmpBoard, actionNum, true);
        if(!inCheck) {
          var presentTimelines = boardFuncs.present(tmpBoard, actionNum);
          if(presentTimelines.length <= 0) {
            return [false, false];
          }
          moveTree.push(tmpBoard);
        }
      }
    }
    moveTree.splice(0, 1);
  }
  return [true, false];
}

exports.moveCompare = (move1, move2) => {
  if(Array.isArray(move1)) {
    if(Array.isArray(move2)) {
      if(move1.length === move2.length) {
        for(var i = 0;i < move1.length;i++) {
          if(move1[i].length === move2[i].length) {
            for(var j = 0;j < move1[i].length;j++) {
              if(move1[i][j] !== move2[i][j]) {
                return move1[i][j] - move2[i][j];
              }
            }
          }
          else {
            return move1[i].length - move2[i].length;
          }
        }
      }
      else {
        return move1.length - move2.length;
      }
    }
    else {
      return -1;
    }
  }
  else {
    if(Array.isArray(move2)) {
      return 1;
    }
    else {
      return 0;
    }
  }
  return 0;
}
