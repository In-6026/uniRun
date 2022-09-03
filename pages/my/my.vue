<template>
	<view class="my">
		<view @click="navTo('setting')" class="setIcon">
			<u-icon name="setting" color="#000" size="24"></u-icon>
		</view>
		<view class="profile">
			<view class="name-id">
				<u-icon name="man-add-fill" color="#fff" size="20"></u-icon>
				<text class="name">{{userinfo.nickName}}</text>
			</view>
			<view class="id-icon">
				<text class="id">id: {{userinfo.id}}</text>
			</view>
			<view class="profiletxt">
				<view>学校: 成都信息工程大学</view>
				<view>学院: {{userinfo.fanculty}}</view>
			</view>
			<view class="profiletxt">
				<view>专业: {{userinfo.major}}</view>
				<view>班级: {{userinfo.class}}</view>
			</view>
		</view>
		<view class="nav">
			<view @click="navTo('timeTable')">
				<text>我的课表</text>
				<text>学期课表</text>
			</view>
			<view @click="navTo('achievement')">
				<text>体育课成绩</text>
				<text>体育课总成绩</text>
			</view>
			<view @click="navTo('exercise')">
				<text>课外锻炼</text>
				<text>跑步和俱乐部记录</text>
			</view>
			<view @click="navTo('attitude')">
				<text>课堂态度</text>
				<text>出勤和课堂表现记录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		methods: {
			navTo(name) {
				uni.navigateTo({
					url: `/pages/${name}/${name}`
				})
			}
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo
			})
		},
	}
</script>

<style lang="scss">
	.my {
		width: calc(100% - 10px);
		height: auto;
		margin: 0 auto;

		.setIcon {
			width: 24px;
			height: 24px;
			margin-left: calc(100% - 24px);
		}

		.profile {
			border-radius: 3px;
			width: 100%;
			height: 150px;
			background: $uni-color-uniapp;

			.name-id {
				width: 100%;
				height: 50px;
				line-height: 50px;
				display: flex;
				align-items: bottom;
				margin-left: 20px;

				image {
					width: 20px;
					height: 20px;
					margin-left: 20px;
				}

				.name {
					color: white;
					font-size: 18px;
					margin-left: 10px;
				}

			}

			.id-icon {
				display: flex;
				height: 30px;

				.id {
					color: white;
					font-size: 12px;
					margin-left: 20px;
				}
			}

			.profiletxt {
				color: white;
				height: 40px;
				width: calc(100% - 40px);
				margin-left: 20px;
				display: flex;

				view {
					width: 50%;
					height: 100%;
					font-size: 13px;
				}
			}
		}

		.nav {
			width: 100%;
			height: auto;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			margin-top: 10px;

			view {
				width: calc(50% - 1px);
				height: 60px;
				border-radius: 3px;
				margin-top: 2px;
				background: $uni-bg-color-grey;

				text {
					display: block;
					padding-left: 10px;

					&:nth-child(1) {
						height: 34px;
						line-height: 34px;
						font-size: 16px;
						font-weight: bolder;
					}

					&:nth-child(2) {
						font-size: 13px;
						color: gray;
					}
				}
			}
		}
	}
</style>
