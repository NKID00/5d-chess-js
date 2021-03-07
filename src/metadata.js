exports.strToObj = (str) => {
  var obj = {};
  var strArr = str.replace(/\r\n/g, '\n').split('\n');
  for(var i = 0;i < strArr.length;i++) {
    var regex = strArr[i].match(/\[([^\s]+)\s+\"([^\"]*)\"\]/);
    if(regex !== null) {
      obj[regex[1].toLowerCase()] = regex[2];
      if(regex[1].toLowerCase() === 'board') {
        obj[regex[1].toLowerCase()] = this.lookupVariant(regex[2]);
      }
      try {
        var tmp = JSON.parse(regex[2]);
        obj[regex[1].toLowerCase()] = tmp;
      }
      catch(err) {}
    }
  }
  return obj;
}

exports.objToStr = (obj) => {
  var str = '';
  var objArr = Object.keys(obj);
  for(var i = 0;i < objArr.length;i++) {
    if(typeof obj[objArr[i]] === 'object') {
      str += '[' + objArr[i].charAt(0).toUpperCase() + objArr[i].substr(1) + ' \"' + JSON.stringify(obj[objArr[i]]).replace(/\"/g, '\'') + '\"]\n';
    }
    else if(objArr[i] === 'board') {
      str += '[' + objArr[i].charAt(0).toUpperCase() + objArr[i].substr(1) + ' \"' + this.lookupVariantFull(obj[objArr[i]]) + '\"]\n';
    }
    else {
      str += '[' + objArr[i].charAt(0).toUpperCase() + objArr[i].substr(1) + ' \"' + obj[objArr[i]] + '\"]\n';
    }
  }
  return str;
}

const variantDict = [
  ['Standard', 'standard'],
  ['Standard - Defended Pawn', 'defended_pawn'],
  ['Standard - Half Reflected', 'half_reflected'],
  ['Standard - Princess', 'princess'],
  ['Standard - Turn Zero', 'turn_zero'],
  ['Custom', 'custom']
]

exports.lookupVariant = (variantPrettyStr) => {
  //More lenient input since its used frequently in front facing application.
  for(var i = 0;i < variantDict.length;i++) {
    if(variantDict[i][0].toLocaleLowerCase().includes(variantPrettyStr.toLocaleLowerCase().replace(/_/g, ' '))) {
      return variantDict[i][1];
    }
    if(variantDict[i][1] === this.lookupVariantFull(variantPrettyStr) && variantDict[i][1] !== 'Standard') {
      return variantDict[i][1];
    }
  }
  return 'standard';
}

exports.lookupVariantFull = (variantStr) => {
  for(var i = 0;i < variantDict.length;i++) {
    if(variantDict[i][1] === variantStr) {
      return variantDict[i][0];
    }
  }
  return 'Standard';
}
