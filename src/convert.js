require('module-alias/register');

const notationFuncs = require('@local/notation');
const parseFuncs = require('@local/parse');
const validateFuncs = require('@local/validate');

exports.actions = (input) => {
  /*
    Supported input:
     - 2D Array of moves (raw or object)
     - Array of action object
     - JSON of either above
     - Multiple actions as expressed in notation
  */
  var res = [];
  if(typeof input === 'string') {
    var tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
    if(tmp === null) {
      var splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').map(e => e.trim()).filter(e => !e.includes('[') && e !== '');
      var tmpAction = [];
      var tmpCurrAction = null;
      for(var i = 0;i < splitStr.length;i++) {
        if(splitStr[i].length > 0) {
          var tmpNotation = {};
          try {
            if(validateFuncs.notation(splitStr[i])) {
              tmpNotation = notationFuncs.moveNotation(null, 0, splitStr[i]);
            }
            else {
              console.error('Line is not considered notation: ' + splitStr[i]);
            }
          }
          catch(err) {
            console.error(err);
            throw 'Notation invalid and an error has occurred at line: ' + splitStr[i];
          }
          if(tmpCurrAction === null) {
            tmpCurrAction = tmpNotation.action;
          }
          if(tmpNotation.action > tmpCurrAction) {
            if(tmpAction.length > 0) {
              res.push(tmpAction);
              tmpAction = [];
            }
            tmpCurrAction = tmpNotation.action;
          }
          tmpAction.push(tmpNotation.arr);
        }
      }
      if(tmpAction.length > 0) {
        res.push(tmpAction);
      }
    }
    else {
      input = tmp;
    }
  }
  if(Array.isArray(input)) {
    for(var i = 0;i < input.length;i++) {
      res.push(this.action(input[i]));
    }
  }
  return res;
}

exports.action = (input) => {
  /*
    Supported input:
     - Array of moves (raw or object)
     - Action object
     - JSON of either above
     - Single action as expressed in notation
  */
  var res = [];
  if(typeof input === 'string') {
    var tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
    if(tmp === null) {
      var splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
      var tmpAction = [];
      for(var i = 0;i < splitStr.length;i++) {
        if(splitStr[i].length > 0) {
          var tmpNotation = {};
          try {
            if(validateFuncs.notation(splitStr[i])) {
              tmpNotation = notationFuncs.moveNotation(null, 0, splitStr[i]);
            }
            else {
              console.error('Line is not considered notation: ' + splitStr[i]);
            }
          }
          catch(err) {
            console.error(err);
            throw 'Notation invalid and an error has occurred at line: ' + splitStr[i];
          }
          tmpAction.push(tmpNotation.arr);
        }
      }
      if(tmpAction.length > 0) {
        res = tmpAction;
      }
    }
    else {
      input = tmp;
    }
  }
  if(!Array.isArray(input) && typeof input === 'object') {
    input = input.moves;
  }
  if(Array.isArray(input)) {
    if(input.length > 0 && !Array.isArray(input[0])) {
      for(var i = 0;i < input.length;i++) {
        res.push(parseFuncs.toMove(input[i]));
      }
    }
    else {
      res = input;
    }
  }
  return res;
}

exports.move = (input) => {
  /*
    Supported input:
     - Move (raw or object)
     - JSON of either above
     - Single move as expressed in notation
  */
  var res = [];
  if(typeof input === 'string') {
    var tmp = null;
    try {
      tmp = JSON.parse(input);
    }
    catch(err) {}
    if(tmp === null) {
      var splitStr = input.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
      if(splitStr.length > 0) {
        if(validateFuncs.notation(splitStr[0])) {
          res = notationFuncs.moveNotation(null, 0, splitStr[0]).arr;
        }
      }
    }
    else {
      input = tmp;
    }
  }
  if(Array.isArray(input)) {
    res = input;
  }
  else if(typeof input === 'object') {
    res = parseFuncs.toMove(input);
  }
  return res;
}
