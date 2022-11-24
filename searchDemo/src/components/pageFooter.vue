<template>
	<footer class="footer">
		<div class="note">
			注意：所请求的数据接口已经无法使用，请查看
			<a href="https://github.com/jasonren0403/techtrainingcamp-b-fe--PRIVATED-#readme" target="_blank">项目README</a>
			以获知演示效果，这里仅展示前端交互效果。
		</div>
		<div style="padding: .2em"></div>
		<div class="author-area">
			<span class="author">{{ author }}&copy; </span> <span class="time">,{{ year }} </span> <span class="tool"> Using {{ tool }}</span>
		</div>
	</footer>
</template>

<script>
export default {
	name: "pageFooter",
	computed: {
		year: {
			get() {
				return 2020;
			}
		}
	},
	data() {
		return {
			tool: 'Vue.js & Node.js',
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

@media screen and (max-width: 767px) {
	.footer {
		margin-top: 2em;
	}

	.author-area, .note {
		padding: 0.1em 0.5em;
	}
}
</style>
