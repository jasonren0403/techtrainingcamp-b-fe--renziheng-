<template>
<div id="app">
	<router-link to="/"><h1>小小搜索</h1></router-link>
	<search-form></search-form>
	<router-view></router-view>
<!--	<div class="scroller"><span class="iconfont iconxiangxiazhanhang"></span>回到顶部</div>-->
	<search-result v-if="this.$route.params.kw!==undefined&&this.$route.params.kw.length>0"></search-result>
	<page-footer></page-footer>
</div>
</template>

<script>
	const searchForm = () => import('./components/searchForm');
	const PageFooter = () => import ("./components/pageFooter");
	const fallbackPage = () => import ("./components/fallbackPage");
	const searchResult = () => import("./components/searchResult");

	export default {
		name: 'App',
		components: {
			PageFooter,
			searchForm,
			fallbackPage,
			searchResult
		},
		mounted() {
			document.title = 'searchDemo - A simple webpage for searching';
		},
		watch: {
			'$route'(to, from) {
				if (this.$route.fullPath.indexOf('/searchResult') === -1)
					document.title = 'searchDemo - A simple webpage for searching';
			}
		}
	}
</script>

<style>
	@import '../static/css/main.css';
	@import '../static/css/normalize.css';

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 2em;
	}

	a, .router-link-active, a:active, a:hover {
		color: black;
		text-decoration: none;
	}

	.scroller {
		position: fixed;
		right: 10%;
		bottom: 100px;
		border: 1px solid black;
		border-radius: 4px;
		-webkit-border-radius: 4px;
	}
</style>
