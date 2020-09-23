const boardFuncs = require('@local/board');

exports.checks = (board, action) => {
  var res = [];
  var activeTimelines = boardFuncs.active(board);
  for(var i = 0;i < activeTimelines.length;i++) {
    if(board[activeTimelines[i]]) {
      var currTimeline = board[activeTimelines[i]];
      var latestTurn = currTimeline[currTimeline.length - 1];
      if((currTimeline.length - 1) % 2 === action % 2) {
        for(var r = 0;latestTurn && r < latestTurn.length;r++) {
          for(var f = 0;latestTurn[r] && f < latestTurn[r].length;f++) {
            if(Math.abs(latestTurn[r][f]) % 2 === action % 2) {
              var moves = pieceFuncs.moves(board, [activeTimelines[i], currTimeline.length - 1, r, f]);
              for(var j = 0;j < moves.length;j++) {
                res.push(moves[j]);
              }
            }
          }
        }
      }
    }
  }
}