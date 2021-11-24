<template>
	<div>
		<h3>检测是否为数组</h3>
		<ul>
			<li>{{isArray}}</li>
		</ul>
	</div>
</template>

<script>
	import * as arrayUtil from '@/utils/array'
	export default {
		name: 'Array',
		data() {
			return {
				datas1: [1, 3, 4, 2, 5, 3, 8, 1, 0]
			}
		},
		computed: {
			isArray () {
				return arrayUtil.isArray(datas1)
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>