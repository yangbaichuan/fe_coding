/**
 * 数组方法库
 * @description 原生js实现数组ES5和ES6方法。
 * 							由于工程原因，使用ES6的export进行导出
 */

// 检测是否为数组
export const isArray = function (data) {
	return Object.prototype.toString.call(data) === '[object Array]'
}