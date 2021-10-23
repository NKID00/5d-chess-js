exports.move = (move) => {
  let res = [];

  for (let i = 0; i < move.length; i++) {
    res.push(move[i].slice());
  }

  return res;
}

exports.action = (action) => {
  let res = [];

  for (let i = 0; i < action.length; i++) {
    res.push(this.move(action[i]));
  }

  return res;
}

exports.actions = (actions) => {
  let res = [];

  for (let i = 0; i < actions.length; i++) {
    res.push(this.action(actions[i]));
  }

  return res;
}