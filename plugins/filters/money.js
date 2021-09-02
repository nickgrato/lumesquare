/**
 *
 * @param {string} value
 */
 export const money = (value,symbole = '$',propper = false) => {
  if(value === null) return;

  if(propper) return `${symbole}${value}`;

  var str = String(parseFloat(value) / 100);
  str += (str.indexOf('.') < 0) ? '.00' : '00';
  return `${symbole}${str.substring(0, str.indexOf('.') + 3)}`;

}


export const moneyWithoutDecimals = (value,symbole = '$') => {
  const dollars = parseFloat(value) / 100;
  const str = String(dollars);
  if (value % 100 === 0) {
    return symbole + str;
  }
  if (dollars < 1) {
    return '$' + dollars.toFixed(2);
  }
  if (str.includes('.')) {
    return symbole + str.substring(0, str.indexOf('.') + 3);
  }
  return symbole + str.substring(0, str.length - 2);
}
