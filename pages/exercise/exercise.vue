<template>
	<view class="con">
		<view v-for="r in run" class="stepCard" :key="r.date">
			<view class="time">
				<i></i>
				<text>{{r.date}}</text>
			</view>
			<view class="body">
				<view>跑步里程：{{r.mile}}米</view>
				<view>跑步时长：{{formSeconds(r.dur)}}</view>
			</view>
		</view>
		<view v-if="!run.length">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			formSeconds(second) {
				console.log('second: ', second)
				const minute = Math.floor(second / 60)
				const seconds = second - minute * 60
				return `${minute}.${Math.ceil(seconds/60)}分钟`
			}
		},
		computed: {
			...mapState({
				run: state => state.userinfo.run
			})
		},
	}
</script>

<style lang="scss">
	.con {
		width: calc(100% - 20px);
		margin: auto;

		.stepCard {
			width: 100%;
			height: 60px;

			.time {
				height: 20px;
				font-size: 12px;
				line-height: 20px;

				i {
					display: inline-block;
					margin: 4px 10px 4px -4px;
					width: 10px;
					height: 10px;
					border-radius: 100%;
					box-sizing: border-box;
					border: 2px solid $uni-color-uniapp;
				}
			}

			.body {
				line-height: 20px;
				font-size: 14px;
				padding-left: 20px;
				border-left: 1px dashed $uni-text-color-placeholder;
			}
		}
	}
</style>
