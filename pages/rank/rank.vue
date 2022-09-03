<template>
	<view>
		<u-tabs :list="tabList" @change="changeTab($event)" :activeStyle="{
		    fontWeight: 'bolder'
		}" :current="tabCurrent"></u-tabs>

		<view class="case">
			<view v-if="tabCurrent===1">
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
			</view>


			<view v-if="tabCurrent===0">
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
	export default {
		data() {
			return {
				tabList: [{
					name: '女生榜'
				}, {
					name: '男生榜'
				}],
				tabCurrent: 0,
				girls: [],
				boys: []
			}
		},
		onLoad() {
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
		methods: {
			changeTab(event) {
				this.tabCurrent = event.index
			},
			totalRun(who) {
				const run = who.run
				let count = 0;
				for (let i = 0; i < run.length; i++) {
					count += run[i].mile
				}
				return (count / 1000).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.case {
		width: 100%;
		height: auto;

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
</style>
