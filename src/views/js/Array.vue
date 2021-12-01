<template>
	<a-page-header
			style="border: 1px solid rgb(235, 237, 240)"
			title="数组方法"
			sub-title="原生JS实现ES6及后续版本的数组方法"
		/>
	<a-list item-layout="vertical" >
		<a-list-item>
			<a-list-item-meta title="ES5方法：isArray" description="基于Object.prototype.toString.call()方法实现" />
			<div>运行结果：{{ isArrayResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="ES5方法：forEach" description="基于for循环实现" />
			<div>运行结果：{{ forEachResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="ES5方法：map" description="基于for循环实现" />
			<div>运行结果：{{ mapResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="ES5方法：filter" description="基于for循环实现" />
			<div>运行结果：{{ filterResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="ES5方法：reduce" description="基于for循环实现" />
			<div>运行结果：{{ reduceResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="ES5方法：reduceRight" description="基于for循环实现，循环初始值为数组长度-1，不断-1即可" />
			<div>运行结果：{{ reduceRightResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="ES5方法：every" description="基于for循环实现，默认为true，遇到不符合条件置为false，跳出循环" />
			<div>运行结果：{{ everyResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="some" description="基于for循环实现，默认为false，出现符合元素的值置为true，跳出循环" />
			<div>运行结果：{{ someResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="indexOf" description="基于for循环实现，默认为-1，出现符合元素的值置为下标，跳出循环" />
			<div>运行结果：{{ indexOfResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="lastIndexOf" description="基于for循环实现，默认为-1，循环初始值为数组长度-1，不断-1即可，出现符合元素的值置为下标，跳出循环" />
			<div>运行结果：{{ lastIndexOfResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="find" description="基于for循环实现，默认为undefined，出现符合元素的值置为数组元素，跳出循环" />
			<div>运行结果：{{ findResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="findIndex" description="基于for循环实现，默认为-1，出现符合元素的值置为下标，跳出循环" />
			<div>运行结果：{{ findIndexResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="includes" description="基于for循环实现，默认为false，出现符合元素的值置为true，跳出循环" />
			<div>运行结果：{{ someResult }}</div>
		</a-list-item>
		<a-list-item>
			<a-list-item-meta title="flat" description="基于递归实现，根据层级判断是否进入下一次循环" />
			<div>运行结果(1层)：{{ flatResult }}</div>
			<div>运行结果(2层)：{{ flatResult2 }}</div>
		</a-list-item>
	</a-list>
</template>

<script>
	import * as arrayUtil from '@/utils/array'
	export default {
		name: 'ArrayJs',
		data() {
			return {
				data: [ 1, 2, 3, 4, 5 ],
				data2: [ 1 ,2, [3, 4, [5, 6] ] ]
			}
		},
		computed: {
			isArrayResult () {
				return arrayUtil.isArray(this.data)
			},
			forEachResult () {
				let data = [];
				arrayUtil.forEach(this.data, function(val) {
					data.push(val + 1)
				})
				return data
			},
			mapResult () {
				return arrayUtil.map(this.data, function (val) {
					return val + 2
				})
			},
			filterResult () {
				return arrayUtil.filter(this.data, function (val) {
					return val > 2
				})
			},
			reduceResult () {
				return arrayUtil.reduce(this.data, function(val, res) {
					return (res + val)
				}, 0)
			},
			reduceRightResult () {
				return arrayUtil.reduceRight(this.data, function(val, res) {
					if (val > 2) {
						return (res + val)
					} else {
						return res
					}
				}, 0)
			},
			everyResult () {
				return arrayUtil.every(this.data, function (val) {
					return val > 2;
				})
			},
			someResult () {
				return arrayUtil.some(this.data, function (val) {
					return val > 2;
				})
			},
			indexOfResult () {
				return arrayUtil.indexOf(this.data, function (val) {
					return val > 2;
				})
			},
			lastIndexOfResult () {
				return arrayUtil.lastIndexOf(this.data, function (val) {
					return val > 0;
				})
			},
			findResult () {
				return arrayUtil.find(this.data, function (val) {
					return val > 0;
				})
			},
			findIndexResult () {
				return arrayUtil.findIndex(this.data, function (val) {
					return val > 0;
				})
			},
			includesResult () {
				return arrayUtil.includes(this.data, function (val) {
					return val > 2;
				})
			},
			flatResult () {
				return arrayUtil.flat(this.data2)
			},
			flatResult2 () {
				return arrayUtil.flat(this.data2, 2)
			}
		}
	}
</script>