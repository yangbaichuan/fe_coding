/**
 * 原生JS实现ES6及后续版本的数组方法
 * @description 由于工程原因，使用ES6的export进行导出
 */

export function isArray (data) {
  return Object.prototype.toString.call(data) === '[object Array]'
}

export function forEach(data, callback) {
  for (var i = 0; i < data.length; i++) {
    callback(data[i], i)
  }
}

export function map(data, callback) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    result.push(callback(data[i], i))
  }
  return result;
}

export function filter(data, callback) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    if (callback(data[i])) {
      res.push(data[i])
    }
  }
  return res;
}

export function reduce(data, callback, res) {
  var result = typeof res === 'undefined' ? data[0] : res;
  for (var i = 0; i < data.length; i++) {
    result = callback(data[i], result)
  }
  return result;
}

export function reduceRight(data, callback, res) {
  var result = typeof res === 'undefined' ? data[0] : res;
  for (var i = data.length - 1; i >= 0; i--) {
    result = callback(data[i], result)
  }
  return result;
}

export function every(data, callback) {
  var result = true;
  for (var i = 0; i < data.length; i++) {
    if (!callback(data[i])) {
      result = false;
      break;
    }
  }
  return result;
}

export function some(data, callback) {
  var result = false;
  for (var i = 0; i < data.length; i++) {
    if (callback(data[i])) {
      result = true;
      break;
    }
  }
  return result;
}

export function indexOf(data, callback) {
  var result = -1;
  for (var i = 0; i < data.length; i++) {
    if (callback(data[i])) {
      result = i;
      break;
    }
  }
  return result;
}

export function lastIndexOf(data, callback) {
  var result = -1;
  for (var i = data.length - 1; i >= 0; i--) {
    if (callback(data[i])) {
      result = i;
      break;
    }
  }
  return result;
}

export function find(data, callback) {
  var result = undefined;
  for (var i = 0; i < data.length; i++) {
    if (callback(data[i])) {
      result = data[i];
      break;
    }
  }
  return result;
}

export function findIndex(data, callback) {
  var result = -1;
  for (var i = 0; i < data.length; i++) {
    if (callback(data[i])) {
      result = i;
      break;
    }
  }
  return result;
}

export function includes(data, value) {
  var result = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i] === value) {
      result = true;
      break;
    }
  }
  return result;
}