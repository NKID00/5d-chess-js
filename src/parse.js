const notationFuncs = require('@local/notation');

exports.toPosition = (positionObj) => {
  var res = [];
  if(positionObj.timeline >= 0) {
    res[0] = (positionObj.timeline*2);
  }
  else if(positionObj.timeline < 0) {
    res[0] = ((-positionObj.timeline)*2) - 1;
  }
  res[1] = ((positionObj.turn - 1) * 2) + (positionObj.turnPlayer === 'white' ? 0 : 1);
  var coord = notationFuncs.sanCoord(positionObj.coordinate);
  res[2] = coord.arr[0];
  res[3] = coord.arr[1];
  return res;
}

exports.fromPosition = (position) => {
  var res = {};
  if(position[0] === 0) {
    res.timeline = 0;
  }
  else if(position[0] % 2 === 0) {
    res.timeline = Math.ceil(position[0]/2);
  }
  else {
    res.timeline = -Math.ceil(position[0]/2);
  }
  res.turn = Math.floor(position[1]/2) + 1;
  res.turnPlayer = (position[1] % 2 === 0 ? 'white' : 'black');
  res.coordinate = notationFuncs.sanCoord([position[2], position[3]]).str;
  res.rank = 8 - position[2];
  res.file = position[3] + 1;
  return res;
}

exports.toMove = (moveObj) => {

}
exports.fromMove = (move) => {
  var res = {};
  return res;
}