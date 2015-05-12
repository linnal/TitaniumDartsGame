module.exports = {
  format: format,
  padNumber: padNumber
}

function format(timestamp){
  var date = new Date(timestamp);
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (date.getUTCDate()) + " " + (month[date.getMonth()]) + " " + date.getFullYear() + " " + padNumber(date.getUTCHours()) + ":"+ padNumber(date.getUTCMinutes()) ;
}

function padNumber(number, max) {
  max = max || 2
  number = '' + number
  return number.length < max ? padNumber('0' + number, max) : number;
}
