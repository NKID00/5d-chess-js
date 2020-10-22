exports.strToObj = (str) => {
  var obj = {};
  var strArr = str.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n');
  for(var i = 0;i < strArr.length;i++) {
    var regex = strArr[i].match(/\[([\w\.\-]+)\s\"([\w\.\-\/\*\s]+)\"\]/);
    if(regex !== null) {
      obj[regex[1].toLowerCase()] = regex[2];
    }
  }
  return obj;
}

exports.objToStr = (obj) => {
  var str = '';
  var objArr = Object.keys(obj);
  for(var i = 0;i < objArr.length;i++) {
    str += '[' + objArr[i].charAt(0).toUpperCase() + objArr[i].substr(1) + ' \"' + obj[objArr[i]] + '\"]\n';
  }
  return str;
}
