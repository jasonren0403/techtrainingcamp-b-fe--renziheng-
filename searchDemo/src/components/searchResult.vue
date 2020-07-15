<template>
	<div @pageChange="pageChange" id="searchResult" v-bind:style="{'min-height':'400px'}">
		<transition-group :key="1" id="searchItems" name="fade"
						  tag="div" v-if="result&&result.length > 0">
			<search-result-item :item="data"
								:key="data.create_time"
								style="animation-duration: 0.3s"
								v-for="data in result">
			</search-result-item>
		</transition-group>
		<div :key="2" id="search-msg" v-else>{{msg}}</div>

		<page-control :cur_page='cur_page' :max_page='max_page'></page-control>
	</div>
</template>

<script>
	const searchResultItem = () => import( "./searchResultItem");
	const pageControl = () => import( "./pageControl");
	export default {
		name: "search-result",
		components: {
			pageControl, searchResultItem
		},
		created() {
			console.log('loading');
			const offset = Number(this.$route.params.page) - 1 || 0;
			this.keyword = (this.$route.params.kw === undefined) ? '' : this.$route.params.kw;
			this.fetchResult(offset, this.keyword);
		},
		data() {
			return {
				cur_page: 1,
				max_page: 1,
				result: [],
				msg: "",
				keyword: ""
			}
		},
		methods: {
			fetchResult(offset, kw) {
				// reset the search results
				this.msg = "";
				this.cur_page = 1;
				this.max_page = 1;
				const keyword = (this.$route.params.kw === undefined) ? kw : this.$route.params.kw;
				console.log('[fetchResult] offset: ' + offset + ' keyword: ' + keyword);
				const that = this;
				if (keyword.length > 0) {
					this.$axios.get('https://i.snssdk.com/search/api/study/', {
						params: {keyword: keyword, offset: offset}
					}).then(function (response) {
						if (response.data && response.data.code === 0) {
							// console.log(response.data.data);
							const total = response.data.total;
							that.result = response.data.data;
							if (total === 0) {
								that.msg = '啊这……没有结果显示啊ヾ(ﾟ∀ﾟゞ)，换个别的试试？';
							} else {
								that.max_page = Math.ceil(total / 10); //10 results per page
								that.cur_page = Math.min(offset + 1, that.max_page);
								document.title = 'searchDemo - ' + keyword + '的搜索结果';
							}
						}
					}).catch(function (error) {
						console.log(error);
						that.msg = '搜索失败了呢ヽ(≧□≦)ノ，待会再试吧';
					})
				}
			},
			pageChange(page, keyword) {
				console.log("[pageChange] " + page + " " + keyword);
				this.fetchResult(page - 1 || 0);
			}
		},
		watch: {
			'$route'(to, from) {
				console.log("[SearchResult] From " + from.params.page +
					" To " + to.params.page + " max " + this.max_page);
				let toPage = to.params.page;
				let fromPage = from.params.page;
				if (toPage <= this.max_page && toPage >= 1) {
					this.fetchResult(toPage - 1, to.params.keyword);
					console.log("[SearchResult] new result fetched: page " + to.params.page);
					return;
				}
				this.$router.back();
			},
			keyword(newval, oldval) {
				if (newval !== undefined && newval.length > 0) {
					console.log(newval);
					// console.log(this.$route.params);
					this.fetchResult(this.$route.params.page - 1 || 0, newval);
				}
			}
		}
	}
</script>

<style scoped>
	#search-msg {
		margin-top: 1em;
		position: relative;
		left: -0.5em;
		line-height: 1.2em;
	}

	@media screen and (max-width: 767px) {
		#search-msg {
			position: relative;
			left: 0;
			padding: 0 0.4em;
		}
	}
</style>
