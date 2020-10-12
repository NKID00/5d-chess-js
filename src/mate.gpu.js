const { GPU } = require('gpu.js');
const boardFuncs = require('@local/board');
const turnFuncs = require('@local/turn');
const mateFuncs = require('@local/mate');

const gpu = new GPU({ mode: 'gpu' });
gpu.addFunction(mateFuncs.moveCompare);
gpu.addFunction(mateFuncs.checks);

const reduceToSolvedFast = gpu.createKernel(`function(board, tmpBoardArr, action) {
  if(this.thread.x >= tmpBoardArr.length) { return 0; }
  if(mateFuncs.checks(board, action).length < mateFuncs.checks(tmpBoardArr[this.thread.x], action).length) {
    return 1;
  }
  return 0;
}`, { output: { x: 512 } });

/*
const reduceToSolvedSlow = gpu.createKernel(function(board, tmpBoardArr, action) {
  if(this.thread.x >= tmpBoardArr.length) { return 0; }
  var checks = mateFuncs.checks(board, action);
  var tmpBoard = tmpBoardArr[this.thread.x];
  var tmpChecks = mateFuncs.checks(tmpBoard, action);
  var solvedACheck = false;
  for(var j = 0;!solvedACheck && j < checks.length;j++) {
    var containsCurr = false;
    for(var k = 0;!containsCurr && k < tmpChecks.length;k++) {
      if(mateFuncs.moveCompare(checks[j], tmpChecks[k]) === 0) { containsCurr = true; }
    }
    if(!containsCurr) { solvedACheck = true; }
  }
  return solvedACheck ? 1 : 0;
}, { output: { x: 512 } });
*/

exports.checkmate = (board, action) => {
  if(mateFuncs.stalemate(board, action)) {
    return false;
  }
  // Super fast single pass looking for moves solving checks
  /*
  var moves = boardFuncs.moves(board, action, false, false);
  var checks = mateFuncs.checks(board, action);
  if(checks.length <= 0) { return false; }
  for(var i = 0;i < moves.length;i++) {
    var tmpBoard = boardFuncs.copy(board);
    boardFuncs.move(tmpBoard, moves[i]);
    var tmpChecks = mateFuncs.checks(tmpBoard, action);
    if(tmpChecks.length <= 0) { return false; }
  }
  */
  var recurse = (board, action) => {
    var moves = boardFuncs.moves(board, action, false, false);
    var checks = mateFuncs.checks(board, action);
    if(checks.length <= 0) { return false; }
    var boardArr = [];
    for(var i = 0;i < moves.length;i++) {
      var tmpBoard = boardFuncs.copy(board);
      boardFuncs.move(tmpBoard, moves[i]);
      boardArr.push(tmpBoard);
    }
    movesSolvedArr = reduceToSolvedFast(board, boardArr, action);
    for(var i = 0;i < moves.length;i++) {
      if(movesSolvedArr[i] === 1) {
        if(!recurse(boardArr[i], action)) {
          return false;
        }
      }
    }
    return true;
  }
  return recurse(board, action);
}
