<template>
	<div id="result_item">
		<h3><a :href="item.link_url" target="_blank">{{item.title}}</a>
			<a :href="item.link_url" target="_blank">
				<span class="small">&nbsp;&nbsp;详情...</span>
			</a>
		</h3>
		<div class="abstract">{{item.description}}</div>
		<div class="other_info">
			<span class="info-span user">
				<span class="iconfont iconline-user"></span>
				<span class="info_data_text">{{item.user_name}}</span>
			</span>
			<span class="info-span comment_count">
				<span class="iconfont iconline-news"></span>
				<span class="info_data_text">{{item.comments_count}}</span>
			</span>
			<span class="info-span create_time">
				<span class="iconfont iconline-calendar"></span>
				<span class="info_data_text">{{item.create_time | ts2dtString}}</span>
			</span>
			<span class="info-span delta_time">
				<span class="iconfont iconline-time"></span>
				<span class="info_data_text">{{item.create_time | toDelta('cn')}}</span>
			</span>
		</div>
		<div class="clearfix"></div>
		<div class="tags" v-if="item.tags && item.tags.length!==0">
			<div class="badge-wrapper" v-for="tag in item.tags">
				<span class="badge-basic" v-bind:class="[special.badges.find(v=>v === tag)?'badge-green':'badge']">{{tag}}</span>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
</template>

<script>
	export default {
		name: "search-result-item",
		props: {
			item: {
				required: true,
				type: Object
			}
		},
		data() {
			return {
				special: {
					// 这里放彩蛋！
					// badges - 标签含有特定值时，显示将与其他标签不同
					"badges": ["任子恒", "Jason Ren", "Vue.js", "Vue", "HTML5",
						"CSS3", "CSS 3", "JavaScript", "javascript", "字节跳动", "bytedance", "Bytedance"],
					// 有时间我就放这个↓
					// "badges":{
					// 	"badge-green":["任子恒","Jason Ren"],
					// 	"badge-blue":["Vue.js","Vue","Node.js","HTML5","HTML 5","CSS3","CSS 3","javascript","JavaScript"],
					// 	"badge-red":["bytedance","字节跳动","Bytedance"]
					// },
					// animations - 当使用这些词语作为查询词时，页面将显示特定动画
					"animations": ["bytedance", "字节跳动", "前端训练营"]
				}
			}
		},
		methods: {},
		filters: {
			/**
			 * receives timestamp data, transform it into localized string represent
			 * @param val
			 * @returns {*}
			 */
			ts2dtString(val) {
				return new Date(val).toLocaleDateString();
			},
			/**
			 * receives timestamp data, transform into localized delta representation
			 * e.g for Chinese it's '3天前/5秒前'
			 * @param val
			 * @returns {*}
			 */
			toDelta(val, locale) {
				const ONE_SECOND = 1000;
				const ONE_MINUTE = ONE_SECOND * 60;
				const ONE_HOUR = ONE_MINUTE * 60;
				const ONE_DAY = ONE_HOUR * 24;
				const date = new Date();
				const year = date.getFullYear();
				const now = date.getTime();
				const ONE_YEAR = (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) ? ONE_DAY * 366 : ONE_DAY * 365;
				const delta = now - val;
				if (ONE_SECOND <= delta && delta < ONE_MINUTE) {
					return Math.floor(delta / ONE_SECOND) + '秒前';
				} else if (ONE_MINUTE <= delta && delta < ONE_HOUR) {
					return Math.floor(delta / ONE_MINUTE) + '分钟前'
				} else if (ONE_HOUR <= delta && delta < ONE_DAY) {
					return Math.floor(delta / ONE_HOUR) + '小时前'
				} else if (ONE_DAY <= delta && delta < ONE_YEAR) {
					return Math.floor(delta / ONE_DAY) + '天前'
				} else if (delta >= ONE_YEAR) {
					return Math.floor(delta / ONE_YEAR) + '年前'
				} else {
					console.log(`delta: ${delta}`)
					return '';
				}
			}
		}
	}
</script>

<style scoped>
	.badge-basic {
		display: inline-block;
		min-width: 10px;
		padding: 3px 7px;
		font-size: 12px;
		font-weight: bold;
		line-height: 1;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 10px;
	}

	.badge-green {
		background-color: #01ff35;
		color: #fff;
	}

	.badge {
		color: #fff;
		background-color: #999;
	}

	.badge:empty, .badge-green:empty {
		display: none;
	}

	.badge-wrapper {
		margin: 0 0.2em;
		float: left;
	}

	.small, .other_info .info_data_text {
		color: #837f73;
		font-size: 90%;
	}

	.other_info {
		margin-top: 0.2em;
		float: right;
	}

	.info-span {
		margin-left: 0.7em;
	}

	.abstract {
		line-height: 1.4em;
		/* 两端对齐文字，最后一行左对齐 */
		text-justify: distribute-all-lines;
		-ms-text-align-last: left;
		text-align: justify;
		-moz-text-align-last: left;
	}

	#result_item {
		text-align: left;
		margin-left: 4em;
		min-height: 2em;
		width: 600px;
		padding: 0.2em;
	}

	@media screen and (max-width: 360px) {
		#result_item {
			margin-left: 1em;
			padding-left: 1.5em;
			max-width: 85%;
		}
	}

	@media screen and (min-width: 361px) and (max-width: 480px) {
		#result_item {
			margin-right: 1em;
			margin-left: 2em;
			max-width: 85%;
		}
	}

	@media screen and (min-width: 481px) and (max-width: 690px) {
		#result_item {
			margin-left: 3em;
			max-width: 85%;
			padding: 0.4em;
		}
	}


</style>
