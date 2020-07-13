<template>
	<div @blur="[toggleStyle('outfocus'),search_performed = false]" @focus="toggleStyle('focused')"
		 @keydown.enter="subSearch(searchtxt)"
		 id="searchForm">
		<div id="form-wrap">
			<div id="input-wrap" v-bind:class="colorstyle" v-bind:style="{display:'inline'}">
				<span class="search-logo iconfont iconfangdajing"></span>
				<input @focus="[toggleStyle('focused'),search_performed=false]"
					   autocomplete="off" id="searchWord" maxlength="100" placeholder="请输入要查找的关键词"
					   type="text" v-bind:style="{border:'none'}"
					   v-model="searchtxt">
				<button @click.stop="subSearch(searchtxt)" id="search_button" type="button">Go!</button>
			</div>
			<div class="clearfix"></div>
		</div>
		<div id="recommended" v-if="display_recommend_list">
			<div class="list-wrapper">
				<ul v-if="search_performed">
					<li :key="item.keyword" @click="subSearch(item.keyword)" v-for="item in list">
						{{item.keyword}}
					</li>
				</ul>
			</div>
		</div>
		<div class="notice-area" v-else>
			<div class="notice" v-bind:style="{color:'red'}" v-if="searchtxt.length===0&&search_performed">还没有输入任何东西呢~
			</div>
			<div class="notice" v-bind:style="{color:'red'}" v-else-if="error_fetching_list">获取推荐词列表时出错</div>
			<div class="notice" v-bind:style="{color:'grey'}" v-else-if="list.length===0&&search_performed">
				还未找到内容，再试试？
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "searchForm",
		data() {
			return {
				searchtxt: '',
				error_fetching_list: false,
				list_available: false,
				list: [],
				// next two lines is for test, not used in production
				// list: [{keyword: 'sample'}, {keyword: 'sample2'}],
				// list_available: true,
				search_performed: false,
				colorstyle: 'outfocus',
			}
		},
		computed: {
			display_recommend_list() {
				return this.list_available && this.list.length > 0 /*&& this.$route.fullPath.indexOf('searchResult') === -1*/
			}
		},
		watch: {
			searchtxt: function (newval, oldval) {
				this.search_performed = false;
				this.error_fetching_list = false;
				if (newval.length === 0) {
					if (this.list_available) {
						this.list_available = false;
					}
					this.toggleStyle('failed');
					this.list = [];
					return;
				}
				if (newval.length >= 1) {
					this.list_available = true;
					this.search_performed = true;
					//search recommend word with newval, then update #recommend element with returned api data
					const that = this;
					this.$axios.get('https://i.snssdk.com/search/api/sug/', {
						params: {keyword: newval}
					}).then(function (response) {
						// console.log(response.data);
						if (response.data && response.data.code === 0) {
							const total = response.data.total;
							that.list = response.data.data;
							if (total === 0) {
								that.show_len_error = true;
								that.show_not_found = true;
							} else {
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
			}
		},
		methods: {
			subSearch: function (kw) {
				// fetch result from api with this.searchtxt, then jump to result page
				this.search_performed = true;
				// clear the search list
				this.list = [];
				this.list_available = false;
				if (typeof kw != 'undefined' && kw.length !== 0) {
					this.toggleStyle('succeed');
					this.searchtxt = '';
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
				if (this.colorstyle === 'outfocus') {
					/* moving focus from the outside a form should indicate that
					 * a new search is being performed
					 */
					this.search_performed = false;
					this.searchtxt = '';
					this.list = [];
				}
				this.colorstyle = _nstyle;
				this.list_available = _nstyle !== 'outfocus';
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

	.list-wrapper > ul {
		background-color: white;
		width: 360px;
		position: relative;
		left: 438px;
		top: -26px;
		border-left: 1px solid blue;
		border-bottom: 1px solid blue;
		border-right: 1px solid blue;
	}

	.list-wrapper > ul:empty {
		display: none;
	}

	li {
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

	li:hover {
		cursor: pointer;
		background: #dceecd;
		box-shadow: #999999;
		color: cadetblue;
	}

	#recommended {
		z-index: 999;
	}

	#recommended > .notice, .notice {
		padding-top: 0.4em;
	}

	#recommended > .list-wrapper {
		padding: 10px 0 12px 14px
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

	@media screen and (max-width: 360px) {
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

	@media screen and (min-width: 361px) and (max-width: 482px) {
		input {
			width: 275px;
		}
	}

	@media screen and (min-width: 483px) and (max-width: 767px) {
		input {
			width: 325px;
		}
	}



</style>
