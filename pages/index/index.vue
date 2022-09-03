<template>
	<view>
		<view class="head">
			<text>首页</text>
			<view @click="navTo('notify')" class="chat-icon">
				<view>
					<u-icon name="chat" color="#000" size="28"></u-icon>
				</view>
				<view v-if="hasNewAffiche()">
					<u-badge isDot="true" type="error"></u-badge>
				</view>
			</view>
		</view>
		<u-swiper :list="sweperList" indicator indicatorMode="line" circular></u-swiper>
		<view class="scorll-case">
			<view v-for="item in scrollList" @click="navTo(item.nav)" class="scorll-item" :key="item.txt">
				<image :src="item.src"></image>
				<view class="text">{{item.txt}}</view>
			</view>
		</view>
		<view class="rank">
			<view class="rank-title">
				<text class="tle">校园跑排行榜</text>
				<view @click="navTo('rank')" class="tle-i">
					<text class="tle-i-txt">
						全部
					</text>
					<u-icon name="arrow-right" color="#000" size="14"></u-icon>
				</view>
			</view>
			<view class="case">
				<text class="gender">男生榜</text>
				<view v-for="(boy,index) in boys" class="card" :key="boy.id">
					<view class="No" :class="{No1: index == 0,No2: index == 1,No3: index == 2}">1</view>
					<view class="txt-info">
						<view class="name-times">
							<text>{{boy.nickName}}</text>
							<text>{{boy.run.length}}次</text>
						</view>
						<view class="class-klmt">
							<text>{{boy.fanculty}}-{{boy.major}}-{{boy.class}}</text>
							<text>{{totalRun(boy)}}公里</text>
						</view>
					</view>
				</view>
				<view v-if="!boys.length">
					<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
				</view>
				<text class="gender">女生榜</text>
				<view v-for="(girl,index) in girls" class="card" :key="girl.id">
					<view class="No" :class="{No1: index == 0,No2: index == 1,No3: index == 2}">1</view>
					<view class="txt-info">
						<view class="name-times">
							<text>{{girl.nickName}}</text>
							<text>{{girl.run.length}}次</text>
						</view>
						<view class="class-klmt">
							<text>{{girl.fanculty}}-{{girl.major}}-{{girl.class}}</text>
							<text>{{totalRun(girl)}}公里</text>
						</view>
					</view>
				</view>
				<view v-if="!girls.length">
					<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Url from '@/utils/baseUrl.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				sweperList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				scrollList: [{
						src: require("../../static/img/getCourse.png"),
						txt: "选课",
						nav: "courseSelection"
					},
					{
						src: require("../../static/img/courseList.png"),
						txt: "我的课表",
						nav: "timeTable"
					},
					{
						src: require("../../static/img/notice.png"),
						txt: "公告",
						nav: "notify"
					},
					{
						src: require("../../static/img/infoCollect.png"),
						txt: "信息设置",
						nav: "setting"
					}
				],
				boys: [],
				girls: []
			}
		},
		beforeCreate() {
			new Promise((resolve, reject) => {
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						resolve(loginRes)
					},
					fail: (err) => {
						reject(err);
					}
				})
			}).then((loginRes) => {
				const url =
					'https://api.weixin.qq.com/sns/jscode2session?appid=wxd84fa65bb8506c82&secret=7cd789f8f705c776cf8de5856619d771&js_code=' +
					loginRes.code
				uni.request({
					url,
					method: 'GET',
					success: (userInfo) => {
						console.log(userInfo.data.openid)
						uni.request({
							url: Url + '/login',
							method: 'GET',
							data: {
								openid: userInfo.data.openid
							},
							success: (res) => {
								const data = res.data
								if (data.code === -1) {
									uni.showToast({
										title: '服务器故障',
										icon: 'error'
									})
								} else {
									this.setUserInfo(data.studentInfo)
									this.getAllCourse()
									console.log(this.userinfo)
								}
							},
							fail: (loginFail) => {
								uni.showToast({
									title: '网络连接故障',
									icon: 'error'
								})
								throw loginFail
							}
						})
					}
				})
			}).catch((err) => {
				throw err
			})


			const affiches = uni.getStorageSync('affiches')
			let length = affiches ? affiches.length : 0;
			uni.request({
				url: Url + '/affiche',
				method: 'GET',
				data: {
					length,
				},
				success: (res) => {
					const data = res.data
					const len = data.affiches.length;
					for (let i = 0; i < len; i++) {
						data.affiches[len - i - 1].wasRead = i < data.code ? false : true;
					}
					this.setNotify(data.affiches)
					uni.setStorageSync('affiches', data.affiches)
				},
				fail: (reson) => {
					throw '获取公告失败' + reson
				}
			})

			uni.request({
				url: Url + '/runrank',
				method: 'GET',
				data: {
					top: 3
				},
				success: (res) => {
					const data = res.data
					if (data.code === 1) {
						this.girls = data.girls
						this.boys = data.boys
					}
				},
				fail: (err) => {
					throw err
				}
			})
			
			
		},
		computed: {
			...mapState({
				notify: state => state.notify,
				userinfo: state => state.userinfo
			})
		},
		methods: {
			totalRun(who) {
				const run = who.run
				let count = 0;
				for (let i = 0; i < run.length; i++) {
					count += run[i].mile
				}
				return (count / 1000).toFixed(2)
			},
			navTo(name) {
				uni.navigateTo({
					url: `/pages/${name}/${name}`
				});
			},
			hasNewAffiche() {
				return this.notify.filter(n => !n.wasRead).length
			},
			getAllCourse() {
				uni.request({
					url: Url + '/getcourses',
					method: 'GET',
					data: {
						id: this.userinfo.id
					},
					success: (res) => {
						const data = res.data
						if (data.code === 1) {
							this.setCourses(data.courses)
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '网络连接故障',
							icon: 'error'
						})
					}
				})
			},
			...mapMutations(['setNotify', 'setUserInfo', 'setCourses'])
		}
	}
</script>

<style lang="scss">
	.head {
		width: 100%;
		height: 30px;
		line-height: 30px;

		text {
			float: left;
			font-size: 16px;
			margin-left: 5px;
			font-weight: bolder;
		}

		.chat-icon {
			position: relative;
			float: right;
			width: 28px;
			height: 28px;
			margin-right: 5px;

			view:nth-child(1) {
				position: absolute;
				width: 28px;
				height: 28px;
			}

			view:nth-child(2) {
				position: absolute;
				top: 0;
				right: 0;
				width: 10px;
				height: 10px;
			}

			&::after {
				clear: both;
			}
		}
	}

	.scorll-case {
		display: flex;
		width: 100%;
		height: 134rpx;
		margin-top: 20rpx;
		justify-content: space-around;

		.scorll-item {
			width: 100rpx;
			height: 100%;

			image {
				margin-left: 3rpx;
				width: 94rpx;
				height: 94rpx;
			}

			.text {
				line-height: 40rpx;
				font-size: 24rpx;
				text-align: center;
				height: 40rpx;
			}
		}
	}

	.rank {
		width: calc(100% - 10px);
		margin: 10px 5px;
		height: auto;

		.rank-title {
			width: 100%;
			height: 30px;
			line-height: 30px;

			.tle {
				float: left;
				font-size: 14px;
				font-weight: bolder;
			}

			.tle-i {
				float: right;
				width: auto;
				height: 100%;
				display: flex;

				.tle-i-txt {
					height: 100%;
					font-size: 14px;
				}

				&::after {
					clear: both;
				}
			}
		}

		.my-rank {
			height: 20px;
			font-size: 13px;
			line-height: 20px;
		}

		.case {
			width: 100%;
			height: auto;

			.gender {
				font-size: 13px;
				font-weight: bolder;
				padding-left: 10px;
			}

			.card {
				display: flex;
				width: 100%;
				height: 60px;
				border-radius: 3px;
				background: #eee;
				margin-bottom: 10px;

				.No {
					width: 60px;
					height: 100%;
					line-height: 60px;
					text-align: center;
					font-size: 15px;
					font-weight: bold;
				}

				.No1 {
					color: $uni-color-error;
				}

				.No2 {
					color: $uni-color-warning;
				}

				.No3 {
					color: $uni-color-success;
				}

				.txt-info {
					width: calc(100% - 60px);
					height: 100%;

					.name-times {
						height: 40px;
						width: 100%;
						line-height: 40px;
						font-size: 13px;
						font-weight: bolder;

						text:nth-child(2) {
							float: right;
							padding-right: 5px;

							&::after {
								clear: both;
							}
						}
					}

					.class-klmt {
						height: 20px;
						width: 100%;
						font-size: 12px;
						color: $uni-text-color-grey;

						text:nth-child(2) {
							float: right;
							padding-right: 5px;

							&::after {
								clear: both;
							}
						}
					}
				}
			}
		}
	}
</style>
