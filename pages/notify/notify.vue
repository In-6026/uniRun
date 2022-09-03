<template>
	<view class="con">
		<view v-for="(item, index) in notify" class="card" @click="navTo('notifydetail', item, index)" :key="item.text">
			<view class="date">{{item.date}}</view>
			<view class="Info">
				<view class="title">
					<view v-if="ifWasRead(index)">
						<u-badge isDot="true" type="error"></u-badge>
					</view>
					{{item.title}}
				</view>
				<view class="detail">
					<view class="text">{{item.text}}</view>
					<view class="more">查看详情></view>
				</view>
			</view>
		</view>
		<view v-if="!notify.length">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
	</view>
</template>

<script>
	import Url from '@/utils/baseUrl.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				notify: state => state.notify
			})
		},
		methods: {
			navTo(url, data, index) {
				uni.navigateTo({
					url: `/pages/${url}/${url}`,
					success: (res) => {
						res.eventChannel.emit('notify', data)
						this.$store.commit('markNotifyWasRead', index)
					}
				})
			},
			ifWasRead(index) {
				return !this.$store.state.notify[index].wasRead
			}
		}
	}
</script>

<style lang="scss">
	.con {
		padding-bottom: 50px;
	}

	.card {
		width: 90%;
		height: 90px;
		margin: 0 auto 10px auto;
		box-shadow: 0 0 3px $uni-text-color-placeholder;

		.date {
			height: 20px;
			font-size: 13px;
			line-height: 20px;
			text-align: center;
		}

		.Info {
			width: 100%;
			height: 70px;
			padding: 0 5px;
			box-sizing: border-box;
			background: white;
			border-radius: 2px;

			.title {
				display: flex;
				width: 100%;
				height: 40px;
				font-size: 15px;
				font-weight: bold;
			}

			.detail {
				width: 100%;
				height: 20px;

				.text {
					float: left;
					width: 80%;
					font-size: 13px;
					line-height: 30px;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.more {
					float: right;
					font-size: 13px;
					line-height: 30px;
					color: $uni-color-uniapp;
				}
			}
		}
	}
</style>
