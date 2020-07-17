<template>
	<div class="error-message-wrapper" v-bind:style="{'min-height':'100px'}">
		<div class="error-message" v-bind:style="{color:'red'}"><p>咦？我这是在哪里？</p></div>
		<button class='btn' onclick="history.go(-1)">回到上一页</button>
		<router-link :to="{name:'home'}" tag="button" active-class="btn btn-active">回到首页</router-link>
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
	.btn {
		border-radius: 8px;
		padding: 0.4em;
		margin: 0.2em;
		cursor: pointer;
	}

	.btn-active {
		background-color: blue;
		color: white;
	}
</style>
