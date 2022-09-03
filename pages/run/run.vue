<template>
	<view>
		<view class="map-bg">
			<map id="map" class="map" scale="18"></map>
			<view @click="reSetPosition()" class="re-set-pos">
				<u-icon name="map" color="#43ee47" size="20"></u-icon>
			</view>
		</view>
		<view class="run-kilmts">
			<text class="has-times">已经 {{userinfo.run.length}} 次</text>
			<view class="has-kilomt">
				<text>本学期已跑</text>
				<text>{{totalRun}}</text>
				<text>km</text>
			</view>
			<text class="aim-times">目标 15 次</text>
		</view>
		<view class="say-hi">晚上好，{{userinfo.nickName}}</view>
		<view @click="navTo('counting')" class="run-icon">RUN</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				mapCtx: undefined,
				canGetLocation: false,
				longitude: undefined,
				latitude: undefined,
				speed: 0,
				time: 0,
				hasRun: 0
			}
		},
		created() {
			uni.authorize({
				scope: 'scope.userLocation',
				success: (res) => {
					this.canGetLocation = true
					this.reSetPosition();
				}
			})
		},
		mounted() {
			this.mapCtx = uni.createMapContext('map')
		},
		methods: {
			async getLocation() {
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						success: (data) => {
							console.log(data)
							resolve(data)
						},
						fail: (err) => {
							console.log('failed')
							reject("获取定位失败 ", err)
						}
					})
				})
			},
			reSetPosition() {
				this.getLocation()
					.then((data) => {
						this.longitude = data.longitude
						this.latitude = data.latitude
						this.mapCtx.moveToLocation({
							longitude: data.longitude,
							latitude: data.latitude
						})
					})
			},
			navTo(url) {
				uni.navigateTo({
					url: `/pages/${url}/${url}`
				})
			}
		},
		computed: {
			totalRun() {
				if(!this.userinfo.run.length) {
					return 0
				}
				let total = 0
				for (let i of this.userinfo.run) {
					total += i.mile
				}
				return (total / 1000).toFixed(2)
			},
			...mapState({
				userinfo: state => state.userinfo
			})
		}
	}
</script>

<style lang="scss">
	.map-bg {
		position: relative;
		background: #eee;

		.re-set-pos {
			position: absolute;
			left: 10px;
			bottom: 10px;
		}

		.map {
			width: 100%;
			height: 200px;
		}
	}

	.run-kilmts {
		position: relative;
		height: 50px;
		width: 100%;

		.has-times {
			position: absolute;
			left: 5px;
			font-size: 13px;
			color: $uni-color-uniapp;
		}

		.has-kilomt {
			position: absolute;
			left: 0;
			right: 0;
			margin: -50px auto 0 auto;
			width: 100px;
			height: 100px;
			border-radius: 100%;
			background: #fff;
			box-shadow: 0 1px 1px rgba(43, 153, 47, 0.5);
			text-align: center;

			text {
				display: block;
			}

			text:nth-child(1) {
				margin-top: 30px;
				font-size: 12px;
				color: $uni-text-color-grey;
			}

			text:nth-child(2) {
				font-size: 15px;
				font-weight: bolder;
			}

			text:nth-child(3) {
				font-size: 12px;
				color: $uni-text-color-grey;
			}
		}

		.aim-times {
			position: absolute;
			right: 5px;
			font-size: 13px;
			color: $uni-color-uniapp;
		}
	}

	.say-hi {
		width: 100%;
		margin-top: 10px;
		font-weight: bolder;
		text-align: center;
	}

	.run-icon {
		position: fixed;
		width: 100px;
		height: 100px;
		border-radius: 100%;
		line-height: 100px;
		text-align: center;
		color: #fff;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 50px;
		background: linear-gradient(to bottom, $uni-color-uniapp, #43ee47);
		box-shadow: 0 1px 1px rgba(43, 153, 47, 0.5);
	}
</style>
