<template>
	<div v-bind:style="{color:'red'}">怎么会误入不存在的页面呢？</div>
</template>

<script>
	export default {
		name: "fallback",
		mounted() {
			document.title = 'searchDemo - 你来到了一个不存在的页面'
		}
	}
</script>

<style scoped>

</style>
