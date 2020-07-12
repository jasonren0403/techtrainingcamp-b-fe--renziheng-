<template>
	<footer class="footer">
		<div class="back-area">
			<span class="area-wrapper"><router-link to="/"><span
				class="iconfont iconfanhui"></span>&nbsp;&nbsp;返回到主页</router-link></span>
		</div>
		<div class="author-area">
			<span class="author">{{author}}&copy; </span> <span class="time">,{{year}} </span> <span class="tool"> Using {{tool}}</span>
		</div>
	</footer>
</template>

<script>
	export default {
		name: "pageFooter",
		computed: {
			year: {
				get() {
					return new Date().getFullYear();
				},
				set() {

				}
			}
		},
		data() {
			return {
				tool: 'Vue.js & node.js',
				author: 'Jason Ren'
			}
		}
	}
</script>

<style scoped>
	a, .router-link-active, a:active, a:hover {
		color: black;
		text-decoration: none;
	}

	.footer {
		height: 100px;
		width: 100%;
	}

	.back-area {
		margin: 1em auto;
	}

	.area-wrapper {
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		background-color: #b6bca5;
		box-shadow: #ddd9c3;
	}
</style>
