const variantDict = [
  ['Standard', 'standard'],
  ['Standard - Defended Pawn', 'defended_pawn'],
  ['Standard - Half Reflected', 'half_reflected'],
  ['Standard - Princess', 'princess'],
  ['Standard - Turn Zero', 'turn_zero'],
  ['Standard - Two Timelines', 'two_timelines'],
  ['Standard - Reversed Royalty', 'reversed_royalty'],
  ['Custom', 'custom']
]

exports.strToObj = (str) => {
  const strArr = str.replace(/\r\n/g, '\n').replace(/\]\[/g, ']\n[').split('\n');
  let obj = {};

  for (const string of strArr) {
    let regex = string.match(/\[([^\s]+)\s+\"([^\"]*)\"\]/);

    if (regex == null) continue;

    obj[regex[1].toLowerCase()] = regex[2];

    if (regex[1].toLowerCase() == 'board') {
      obj[regex[1].toLowerCase()] = this.lookupVariant(regex[2]);
    }

    try {
      const tmp = JSON.parse(regex[2]);

      obj[regex[1].toLowerCase()] = tmp;
    } catch (err) { }
  }

  return obj;
}

exports.objToStr = (obj) => {
  let objArr = Object.keys(obj);
  let str = '';

  for (const key of objArr) {

    if (typeof obj[key] === 'object') {

      str += '[' + key.charAt(0).toUpperCase() + key.substr(1) + ' \"' + JSON.stringify(obj[key]).replace(/\"/g, '\'') + '\"]\n';
    } else if (key === 'board') {

      str += '[' + key.charAt(0).toUpperCase() + key.substr(1) + ' \"' + this.lookupVariantFull(obj[key]) + '\"]\n';
    } else {

      str += '[' + key.charAt(0).toUpperCase() + key.substr(1) + ' \"' + obj[key] + '\"]\n';
    }
  }

  return str;
}

exports.lookupVariant = (variantPrettyStr) => {
  //More lenient input since its used frequently in front facing application.
  for (const variant of variantDict) {

    if (variant[0].toLocaleLowerCase().includes(variantPrettyStr.toLocaleLowerCase().replace(/_/g, ' '))) {
      return variant[1];
    }

    if (variant[1] == this.lookupVariantFull(variantPrettyStr) && variant[1] != 'Standard') {
      return variant[1];
    }
  }

  return 'standard';
}

exports.lookupVariantFull = (variantStr) => {

  for (const variant of variantDict) {

    if (variant[1] == variantStr) return variant[0];

  }

  return 'Standard';
}

exports.variantDict = variantDict;