<template>
	<div id="page-controls" ref="control">
		<div id="page-controls-wrapper">
			<a href="javascript:this.backToFirstPage(current_kw);"><span class="iconfont icondiyiye"></span></a>
			<a href="javascript:this.performPageControl(this.cur_page-1,current_kw);"><span
				class="iconfont iconzuojiantou"
				v-bind:class="[cur_page===1?'disabled-page-control':'']"></span></a>
			<span>第{{cur_page}}页/共{{max_page}}页</span>
			<a href="javascript:this.performPageControl(this.cur_page+1,this.current_kw);"><span
				class="iconfont iconyoujiantou"
				v-bind:class="[cur_page===max_page?'disabled-page-control':'']"></span></a>
			<a href="javascript:this.scrollToLastPage(this.current_kw);"><span
				class="iconfont iconzuihouyiye"></span></a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "pageControl",
		props: {
			cur_page: {
				type: Number,
				required: true,
				default: 1
			},
			max_page: {
				type: Number,
				required: true,
				default: 1
			},
		},
		computed: {
			current_kw() {
				return this.$route.params.kw || '';
			}
		},
		methods: {
			backToFirstPage(kw) {
				alert(`back to first page control ${this.current_kw}`)
				this.performPageControl(1, kw);
			},
			scrollToLastPage(kw) {
				alert(`scroll to last page control ${this.current_kw}`)
				this.performPageControl(this.max_page, kw);
			},
			performPageControl(pp, kw) {
				alert(`perform page control ${this.current_kw}`)
				this.$router.push({
					name: 'search_result',
					params: {
						kw: kw,
						page: pp
					}
				})
				this.cur_page = pp;
				this.$emit('pageChange', pp, kw);
			},
		}
		// created() {
		// 	console.log(this.cur_page,this.max_page)
		// }
	}
</script>

<style scoped>
	#page-controls {
		color: black;
		margin: 2em;
		padding: 2em;
	}

	#page-controls-wrapper {
		position: relative;
		left: 420px;
		width: 350px;
		padding: 1em;
		border: 1px solid black;
		border-radius: 1em;
	}

	.disabled-page-control {
		color: gray;
		cursor: not-allowed;
	}
</style>
