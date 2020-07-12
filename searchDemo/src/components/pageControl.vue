<template>
	<div id="page-controls" ref="control">
		<div id="page-controls-wrapper">
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:1}}">
				<span class="iconfont icondiyiye" v-bind:class="[cur_page===1?'disabled-page-control':'']"></span>
			</router-link>
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:cur_page-1}}"><span
				class="iconfont iconzuojiantou"
				v-bind:class="[cur_page===1?'disabled-page-control':'']"></span></router-link>
			<span>第{{cur_page}}页/共{{max_page}}页</span>
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:cur_page+1}}"><span
				class="iconfont iconyoujiantou"
				v-bind:class="[cur_page===max_page?'disabled-page-control':'']"></span></router-link>
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:max_page}}"><span
				class="iconfont iconzuihouyiye" v-bind:class="[cur_page===max_page?'disabled-page-control':'']"></span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "pageControl",
		props: {
			max_page: {
				type: Number,
				required: true,
				default: 1
			},
		},
		computed: {
			current_kw() {
				return this.$route.params.kw || '';
			},
			cur_page: {
				get() {
					return Number(this.$route.params.page) || 1;
				},
				set(val) {
					this.cur_page = this.$route.params.page || val || 1;
				}
			}
		},
		watch: {
			'$route'(to, from) {
				console.log("[PageControl] From " + from.params.page);
				console.log("[PageControl] To " + to.params.page);
				this.$emit('pageChange', to.params.kw || '');
			}
		}
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

	a, .router-link-active, a:active, a:hover {
		color: black;
		text-decoration: none;
	}
</style>
