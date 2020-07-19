<template>
	<div id="page-controls-wrapper" ref="control">
		<div id="page-controls">
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:1}}">
				<span class="iconfont icondiyiye" v-bind:class="[cur_page<=1?'disabled-page-control':'']"></span>
			</router-link>
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:cur_page-1}}"><span
				class="iconfont iconzuojiantou"
				v-bind:class="[cur_page<=1?'disabled-page-control':'']"></span></router-link>
			<span>第{{cur_page}}页/共{{max_page}}页</span>
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:cur_page+1}}"><span
				class="iconfont iconyoujiantou"
				v-bind:class="[cur_page>=max_page?'disabled-page-control':'']"></span></router-link>
			<router-link :to="{name:'search_result',params:{kw:current_kw,page:max_page}}"><span
				class="iconfont iconzuihouyiye" v-bind:class="[cur_page>=max_page?'disabled-page-control':'']"></span>
			</router-link>
		</div>
		<div class="page-jump">
			<p>快速到第<input :max="max_page" :placeholder="cur_page" :style="{width:'4em'}"
						  @keydown.enter="perform_jump(jump_page)" min="1"
						  type="number"
						  v-model="jump_page"/>页
				<button :style="{'margin-left':'0.4em'}" @click="perform_jump(jump_page)">Go</button>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "pageControl",
		props: {
			max_page: {   // for max_page prop we can do a lot to optimize that... like storing with states like vuex
				type: Number,
				required: true,
				default: 1
			},
		},
		data() {
			return {
				jump_page: this.cur_page
			}
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
				if (to.params.page != from.params.page && to.params.page <= this.max_page && to.params.page >= 1) {
					console.log('pageChange emit');
					const that = this;
					this.$nextTick(() => {
						that.$smoothscroll.polyfill();
						window && window.scrollTo({
							top: 0,
							behavior: "smooth"
						})
					})
					if (this.cur_page !== to.params.page) this.$set('cur_page', to.params.page);
					this.$emit('pageChange', to.params.kw || '');
				}
			}
		},
		methods: {
			perform_jump(goal_page) {
				if (this.cur_page !== goal_page)
					this.$router.push({
						name: 'search_result',
						params: {kw: this.current_kw, page: goal_page}
					})
			}
		}
	}
</script>

<style scoped>
	#page-controls {
		margin: 0.5em 0;
		padding: 0.5em 0;
	}

	#page-controls-wrapper {
		padding: 1em;
		display: inline;
		text-align: center;
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
