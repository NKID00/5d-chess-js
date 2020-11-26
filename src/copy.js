exports.move = (move) => {
  var res = [];
  for(var i = 0;i < move.length;i++) {
    res.push(move[i].slice());
  }
  return res;
}

exports.action = (action) => {
  var res = [];
  for(var i = 0;i < action.length;i++) {
    res.push(this.move(action[i]));
  }
  return res;
}

exports.actions = (actions) => {
  var res = [];
  for(var i = 0;i < actions.length;i++) {
    res.push(this.action(actions[i]));
  }
  return res;
}