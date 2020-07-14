import Vue from 'vue'
import Router from 'vue-router'

const fallbackPage = () => import ("../components/fallbackPage");
const searchResult = () => import("../components/searchResult");
const pageControl = () => import( "../components/pageControl");

Vue.use(Router)

//push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
	return VueRouterReplace.call(this, to).catch(err => err)
}

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			meta: {
				title: 'searchDemo - A simple webpage for searching'
			}
		},
		{
			path: '/searchResult/:kw/:page?',
			name: 'search_result',
			components: {searchResult, pageControl},
			meta: {
				title: '{{kw}}的搜索结果'
			}
		},
		// 404 page
		{
			path: '*',
			name: 'fallback',
			component: fallbackPage,
			meta: {
				title: '你来到了一个不存在的页面'
			}
		}
	],
	// mode: 'history',
	base: '/',
	// fallback: true,
})
