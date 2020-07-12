<template>
<div id="app">
	<router-link to="/"><h1>小小搜索</h1></router-link>
	<search-form></search-form>
	<router-view></router-view>
	<search-result v-if="this.$route.params.kw!==undefined&&this.$route.params.kw.length>0"></search-result>
	<page-footer></page-footer>
</div>
</template>

<script>
	import searchForm from './components/searchForm';
	import PageFooter from "./components/pageFooter";
	import fallbackPage from "./components/fallbackPage";
	import pageControl from "./components/pageControl";
	import searchResultItem from "./components/searchResultItem";
	import searchResult from "./components/searchResult";

	export default {
		name: 'App',
		components: {
			PageFooter,
			searchForm,
			fallbackPage,
			pageControl,
			searchResultItem,
			searchResult
		},
		mounted() {
			document.title = 'searchDemo - A simple webpage for searching';
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
</style>
