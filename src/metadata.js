exports.strToObj = (str) => {
  var obj = {};
  var strArr = str.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n');
  for(var i = 0;i < strArr.length;i++) {
    var regex = strArr[i].match(/\[([\w\.\-]+)\s\"([\w\.\-\/\*\s]+)\"\]/);
    if(regex !== null) {
      obj[regex[1].toLowerCase()] = regex[2];
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
      str += '[' + objArr[i].charAt(0).toUpperCase() + objArr[i].substr(1) + ' \"' + JSON.stringify(obj[objArr[i]]) + '\"]\n';
    }
    else {
      str += '[' + objArr[i].charAt(0).toUpperCase() + objArr[i].substr(1) + ' \"' + obj[objArr[i]] + '\"]\n';
    }
  }
  return str;
}
