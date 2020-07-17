<template>
	<footer class="footer">
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

		.author-area {
			padding: 0.1em 0.5em;
		}
	}
</style>
