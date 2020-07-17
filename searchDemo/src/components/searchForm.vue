<template>
	<div @keydown.down="toggleCurrentIndex('down',1)"
		 @keydown.enter="subSearch(searchtxt)"
		 @keydown.up="toggleCurrentIndex('up',1)"
		 id="searchForm">
		<div id="form-wrap" @mouseleave="[notice_available = false,list_available=false]">
			<div id="input-wrap" v-bind:class="colorstyle" v-bind:style="{display:'inline'}">
				<span class="search-logo iconfont iconfangdajing"></span>
				<input :placeholder="placeholder"
					   @blur="toggleStyle('outfocus')"
					   @focus="toggleStyle('focused')" autocomplete="off"
					   id="searchWord"
					   maxlength="100"
					   type="text" v-bind:style="{border:'none'}"
					   v-model="searchtxt">
				<button @click.stop="subSearch(searchtxt)" id="search_button" type="button">
					Go!
				</button>
			</div>
			<div class="clearfix"></div>
			<div class="notice-or-recommend" v-bind:style="{'min-height':'1.0em'}"
				 v-if="notice_available || list_available">
				<div id="recommended" v-if="list_available">
					<div class="list-wrapper"
						 v-if="display_recommend_list">
						<ul>
							<li :key="item.keyword" @click="subSearch(item.keyword)"
								v-bind:class="[index===current?'hovered-li':'']"
								v-for="(item,index) in list">
								{{item.keyword}}
							</li>
						</ul>
					</div>
				</div>
				<div class="notice-area" v-if="notice_available">
					<div class="notice" v-bind:style="{color:'red'}" v-if="searchtxt && searchtxt.trim().length===0">
						还没有输入任何文字呢~
					</div>
					<div class="notice" v-bind:style="{color:'red'}" v-else-if="error_fetching_list">获取推荐词列表时出错</div>
					<div class="notice" v-bind:style="{color:'grey'}" v-else-if="list.length===0 && list_available">
						还未找到内容，再试试？
					</div>
					<div class="notice" v-bind:style="{color:'grey'}" v-else></div>
				</div>
			</div>
			<div v-bind:style="{'min-height':'1.8em'}" v-else></div>
		</div>

	</div>
</template>

<script>
	// import {debounce} from '../../static/js/utils.js'
	const delay = (function () {
		let timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();
	export default {
		name: "searchForm",
		data() {
			return {
				current: -1,
				searchtxt: '',
				error_fetching_list: false,
				list_available: false,
				list: [],
				// next two lines is for test, not used in production
				// list: [{keyword: 'sample'}, {keyword: 'sample2'}],
				// list_available: true,
				colorstyle: 'outfocus',
				placeholder: '',
				display_recommend_list: false,
				notice_available: false
			}
		},
		beforeMount() {
			this.clear();
		},
		beforeRouteEnter(to, from, next) {
			this.clear();
			next();
		},
		// computed: {
		// 	display_recommend_list() {
		// 		return this.list_available && this.list.length > 0
		// 	}
		// },
		watch: {
			searchtxt: function (newval, oldval) {
				this.notice_available = true;
				this.error_fetching_list = false;
				if (newval && newval.trim() && newval.trim().length === 0) {
					this.list = [];
					this.display_recommend_list = false;
					if (this.list_available) {
						this.list_available = false;
					}
					this.toggleStyle('failed');
					return;
				}
				if (newval.length >= 1) {

					this.list_available = true;
					// search recommend word with newval, then update #recommend element with returned api data
					const that = this;
					// search action should be debounced
					delay(async () => {
						{
							that.search_performed = true;
							that.$axios.get('https://i.snssdk.com/search/api/sug/', {
								params: {keyword: newval}
							}).then(function (response) {
								// console.log(response.data);
								if (response.data && response.data.code === 0) {
									const total = response.data.total;
									that.list = response.data.data;
									if (total === 0) {
										that.toggleStyle('warning');
										that.list = [];
										that.display_recommend_list = false;
									} else {
										that.display_recommend_list = true;
										that.toggleStyle('succeed')
									}
								} else {
									that.error_fetching_list = true;
									that.toggleStyle('failed');
								}
							}).catch(function (error) {
								console.log(error);
								that.$data.error_fetching_list = true;
								that.toggleStyle('failed');
							})
						}
					}, 500);
				}
			}
		},
		methods: {
			toggleCurrentIndex(dir, step) {
				if (!this.list_available) return;
				switch (dir) {
					case 'up':
						this.current = (this.current <= 0) ? this.list.length - step : this.current - step
						break;
					case 'down':
						this.current = (this.current + step) % this.list.length
						break;
					default: // will do nothing
						break;
				}
			},
			subSearch: function (kw) {
				// fetch result from api with this.searchtxt, then jump to result page
				// clear the search list
				if (typeof kw != 'undefined' && kw.length !== 0) {
					console.log('submitted: ' + kw);
					this.toggleStyle('succeed');
					this.notice_available = false;
					this.list_available = false;
					this.searchtxt = '';
					this.current = -1;
					this.$router.push({
						name: 'search_result',
						params: {
							kw: kw,
							page: 1
						}
					});
					return;
				}

				this.toggleStyle('failed');
			},
			toggleStyle: function (_nstyle) {
				this.colorstyle = _nstyle;
				this.notice_available = true;
				switch (_nstyle) {
					case 'outfocus':
						this.placeholder = '请输入要查找的关键词';
						break;
					case 'failed':
						this.placeholder = '请重新输入关键词';
						break;
					case 'warning':
						this.placeholder = '加把劲，再想想要找什么ヾ(ﾟ∀ﾟゞ)';
						break;
					case 'succeed':
					default:
						this.placeholder = '';
						break;
				}
			},
			clear: function () {
				this.current = -1;
				this.searchtxt = '';
				this.list = [];
				this.list_available = false;
				this.display_recommend_list = false;
				this.error_fetching_list = false;
				this.notice_available = false;
			}
		}
	}
</script>

<style scoped>
	input {
		background: none;
		outline: none;
		border: none;
		width: 375px;
	}

	.search-logo {
		margin-right: 4px;
	}

	.list-wrapper {
		position: relative;
		display: inline-block;
	}

	.list-wrapper > ul {
		position: relative;
		display: inline-block;
		background-color: white;
		border-left: 1px solid blue;
		border-bottom: 1px solid blue;
		border-right: 1px solid blue;
		width: 350px;
		left: -17px;
		top: -23px;
	}

	.list-wrapper > ul:empty {
		display: none;
	}

	.list-wrapper > ul > li {
		list-style-type: none;
		font-size: 0.8em;
		margin: 0.25em;
		padding: 0.25em;
		text-align: left;
		max-width: 375px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		z-index: auto;
	}

	li:hover, .hovered-li {
		cursor: pointer;
		background: #dceecd;
		box-shadow: #999999;
		color: cadetblue;
	}

	#recommended {
		z-index: 999;
	}

	.notice-or-recommend {
		padding-top: 0.4em;
		padding-bottom: 0.4em;
	}

	#input-wrap {
		padding: 10px 10px 10px 5px;
	}

	.outfocus {
		border: 1px solid gray;
		border-radius: 1em 1em 1em 1em;
	}

	.focused {
		border: 1px solid blue;
		border-radius: 1em 1em 1em 1em;
	}

	.failed {
		border: 1px solid red;
		border-radius: 1em 1em 1em 1em;
	}

	.succeed {
		border: 1px solid green;
		border-radius: 1em 1em 1em 1em;
	}

	.warning {
		border: 1px solid #a7aa00;
		border-radius: 1em 1em 1em 1em;
	}

	#search_button {
		position: relative;
		right: -10px;
		outline: none;
		border: none;
		border-radius: 0 1em 1em 0;
		cursor: pointer;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		background-color: blue;
		color: white;
	}

	#search_button:active {
		border: none;
		outline: none;
	}

	@media screen and (max-width: 361px) {
		.list-wrapper > ul {
			width: 175px;
			left: -5px;
		}

		input {
			width: 200px;
		}

		#search_button {
			padding: 5px 10px;
		}

		#input-wrap {
			padding: 5px 5px 5px 3px;
		}
	}

	@media screen and (min-width: 362px) and (max-width: 482px) {
		.list-wrapper > ul {
			width: 225px;
		}

		input {
			width: 250px;
		}
	}

	@media screen and (min-width: 483px) and (max-width: 767px) {
		.list-wrapper > ul {
			width: 295px;
			left: -15px;
		}

		input {
			width: 325px;
		}
	}


</style>
