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
      if((destPiece === 11 || destPiece === 12) && destPiece % 2 === action % 2) {
        res.push(moves[i]);
      }
    }
  }
  return res;
}

exports.checkmate = (board, action) => {
  if(this.stalemate(board, action)) {
    return false;
  }
  var moves = boardFuncs.moves(board, action, false, false);
  var checks = this.checks(board, action);
  var checkedTimelines = [];
  if(checks.length > 0) {
    var lowestTurn = -1;
    for(var i = 0;i < checks.length;i++) {
      if(!checkedTimelines.includes(checks[i][1][0])) {
        checkedTimelines.push(checks[i][1][0]);
      }
      if(lowestTurn === -1 || checks[i][1][1] < lowestTurn) {
        lowestTurn = checks[i][1][1];
      }
    }
    if(lowestTurn !== -1) {
      for(var i = 0;i < moves.length;i++) {
        var tmpBoard = boardFuncs.copy(board);
        boardFuncs.move(tmpBoard, moves[i]);
        if(!checkedTimelines.includes(moves[i][0][0])) {
          var tmpPresentTimelines = boardFuncs.present(tmpBoard, action);
          if(tmpPresentTimelines.length > 0) {
            var tmpTimeline = tmpBoard[tmpPresentTimelines[0]];
            if((tmpTimeline.length - 1) < lowestTurn) {
              return false; //Not checkmate since it is possible to travel back further than earliest check with non-checked timeline
            }
          }
        }
      }
    }
  }
  var recurse = (board, action, checks) => {
    var moves = boardFuncs.moves(board, action, false, false);
    var checks = this.checks(board, action);
    if(checks.length <= 0) { return false; }
    for(var i = 0;i < moves.length;i++) {
      var tmpBoard = boardFuncs.copy(board);
      boardFuncs.move(tmpBoard, moves[i]);
      var tmpChecks = this.checks(tmpBoard, action);
      if(tmpChecks.length < checks.length) {
        if(!recurse(tmpBoard, action, tmpChecks)) {
          return false;
        }
      }
    }
    return true;
  }
  return recurse(board, action, checks);
}

exports.stalemate = (board, action) => {
  var moves = boardFuncs.moves(board, action, true, true);
  var checks = this.checks(board, action);
  var presentTimelines = boardFuncs.present(board, action);
  return moves.length <= 0 && checks.length <= 0 && presentTimelines.length > 0;
}
