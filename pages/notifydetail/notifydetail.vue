<template>
	<view class="con">
		<view class="title">{{notify.title}}</view>
		<view class="text">{{notify.text}}</view>
		<view class="author">{{notify.author.nickName}}</view>
		<view class="date">{{notify.publicTime}}</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				notify: {}
			}
		},
		onLoad() {
			const EventChannel = this.getOpenerEventChannel()
			EventChannel.on('notify', (notify) => {
				this.notify = notify
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.con {
		width: 100%;
		height: auto;
		padding: 0 5px;
		box-sizing: border-box;

		view {
			width: 100%;
			height: auto;
		}

		.title {
			height: auto;
			padding: 10px 0;
			font-size: 16px;
			font-weight: bold;
		}

		.text {
			font-size: 13px;
		}

		.author {
			margin-top: 10px;
			font-size: 14px;
			font-weight: bold;
			text-align: right;
		}

		.date {
			font-size: 14px;
			text-align: right;
		}
	}
</style>
