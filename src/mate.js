const present = require('present');
const boardFuncs = require('@local/board');
const turnFuncs = require('@local/turn');

exports.blankAction = (board, action) => {
  var presentTimelines = boardFuncs.present(board, action);
  for(var i = 0;i < presentTimelines.length;i++) {
    if(board[presentTimelines[i]]) {
      var currTimeline = board[presentTimelines[i]];
      var latestTurn = currTimeline[currTimeline.length - 1];
      if((currTimeline.length - 1) % 2 === action % 2) {
        var newTurn = turnFuncs.copy(board, presentTimelines[i], currTimeline.length - 1);
        board[presentTimelines[i]][currTimeline.length] = newTurn;
      }
    }
  }
}

exports.checks = (board, action) => {
  var res = [];
  var tmpBoard = boardFuncs.copy(board);
  this.blankAction(tmpBoard, action);
  var moves = boardFuncs.moves(tmpBoard, action + 1, false, false);
  for(var i = 0;i < moves.length;i++) {
    if(moves[i].length === 2 && boardFuncs.positionExists(tmpBoard, moves[i][1])) {
      var destPiece = tmpBoard[moves[i][1][0]][moves[i][1][1]][moves[i][1][2]][moves[i][1][3]];
      if((Math.abs(destPiece) === 11 || Math.abs(destPiece) === 12) && Math.abs(destPiece) % 2 === action % 2) {
        res.push(moves[i]);
      }
    }
  }
  return res;
}

exports.checkmate = (board, action, maxTime = 60000) => {
  if(this.stalemate(board, action)) {
    return false;
  }

  // Super fast single pass looking for moves solving checks
  var moves = boardFuncs.moves(board, action, false, false);
  for(var i = 0;i < moves.length;i++) {
    var tmpBoard = boardFuncs.copy(board);
    boardFuncs.move(tmpBoard, moves[i]);
    var tmpChecks = this.checks(tmpBoard, action);
    if(tmpChecks.length <= 0) { return false; }
  }
  // Fast pass looking for moves solving checks using DFS
  var recurse = (board, action, checks = []) => {
    var moves = boardFuncs.moves(board, action, false, false);
    if(checks.length <= 0) { checks = this.checks(board, action); }
    if(checks.length <= 0) { return false; }
    for(var i = 0;i < moves.length;i++) {
      var tmpBoard = boardFuncs.copy(board);
      boardFuncs.move(tmpBoard, moves[i]);
      var tmpChecks = this.checks(tmpBoard, action);
      var solvedACheck = tmpChecks.length < checks.length;
      if(solvedACheck) {
        if(!recurse(tmpBoard, action, tmpChecks)) {
          return false;
        }
      }
    }
    return true;
  }
  if(!recurse(board, action)) { return false; }

  var checkSig = (checks) => {
    var res = {
      length: checks.length,
      sig: []
    };
    checks.sort(this.moveCompare);
    res.sig = checks.flat(2);
    return res;
  };
  var nodeSort = (n2, n1) => {
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
    checkSig: checkSig(this.checks(board, action))
  }];
  var moveTreeIndex = 0;
  //Slow BFS exhaustive search prioritizing check solving, check changing, then timeline changing moves
  var start = present();
  while(moveTreeIndex < moveTree.length) {
    if(present() - start > maxTime) { return true; }
    var currNode = moveTree[moveTreeIndex];
    if(currNode) {
      var moves = boardFuncs.moves(currNode.board, action, false, false);
      var tmpMoveTree = [];
      for(var i = 0;i < moves.length;i++) {
        var tmpBoard = boardFuncs.copy(currNode.board);
        boardFuncs.move(tmpBoard, moves[i]);
        var tmpChecks = this.checks(tmpBoard, action);
        if(tmpChecks.length <= 0) { return false; }
        var tmpCheckSig = checkSig(tmpChecks);
        tmpMoveTree.push({
          board: tmpBoard,
          checkSig: tmpCheckSig
        });
      }
      tmpMoveTree.sort(nodeSort);
      for(var i = 0;i < tmpMoveTree.length;i++) {
        moveTree.push(tmpMoveTree[i]);
      }
      moveTree.splice(0, 1);
      moveTreeIndex--;
    }
    moveTreeIndex++;
  }
  return true;
}

exports.stalemate = (board, action) => {
  var moves = boardFuncs.moves(board, action, true, true);
  var checks = this.checks(board, action);
  var presentTimelines = boardFuncs.present(board, action);
  return moves.length <= 0 && checks.length <= 0 && presentTimelines.length > 0;
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
