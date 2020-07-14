<template>
	<div class="error-message-wrapper">
		<div class="error-message" v-bind:style="{color:'red'}"><p>怎么会误入不存在的页面呢？</p></div>
		<router-link :to="{name:'home'}">回到首页</router-link>
	</div>
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
