<template>
	<view>
		<map id="Lmap" class="map" scale="18"></map>
		<view class="switch-case">
			<view class="has-run">{{formatHasRun}} km</view>
			<view @click="getMyPosition()" class="switch">
				<i>
					<view class="swt-icon">
						<u-icon class="a" :name="runningType" top="15px" color="#fff" size="40"></u-icon>
					</view>
				</i>
				<view class="time">{{formatTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Url from '@/utils/baseUrl.js'
	import Getdate from '@/utils/Getdate.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				mapCtx: undefined,
				longitude: undefined,
				latitude: undefined,
				speed: 0,
				timer: undefined,
				time: 0,
				hasRun: 0,
				running: false,
				runTime: 0,
				runningType: 'play-left-fill' //'pause'
			}
		},
		created() {
			uni.authorize({
				scope: 'scope.userLocation',
				success: (res) => {
					this.reSetPosition();
				}
			})
		},
		mounted() {
			this.mapCtx = uni.createMapContext('Lmap')
		},
		methods: {
			async getLocation() {
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						success: (data) => {
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
						console.log("position: ", data)
						this.longitude = data.longitude
						this.latitude = data.latitude
						this.mapCtx.moveToLocation({
							longitude: data.longitude,
							latitude: data.latitude
						})
					}).catch(err => {
						throw err
					})
			},
			_locationChangeFn(res) {
				const now = new Date().getTime()
				const time = (now - this.time) / 1000
				const adSpeed = (res.speed - this.speed) / time
				this.hasRun += res.speed > 0 ? this.speed * time + (adSpeed * time ** 2) / 2 : 0
				this.speed = res.speed
				this.time = now
				this.longitude = res.longitude
				this.latitude = res.latitude
			},
			stopRunning() {
				const runInfo = {
					mile: this.hasRun,
					dur: this.runTime,
					date: Getdate.formDate()
				}
				uni.request({
					url: Url + '/recoderun',
					method: 'PUT',
					data: {
						id: this.userinfo.id,
						run: JSON.stringify(runInfo)
					},
					success: (res) => {
						const data = res.data
						if (data.code === 1) {
							this.setExerciseAchive(runInfo)
							uni.showToast({
								title: data.msg,
								icon: 'success'
							})
						} else {
							uni.showToast({
								title: '服务器故障',
								icon: 'error'
							})
						}
					}
				})
				clearInterval(this.timer)
				this.runTime = 0
				wx.offLocationChange(this._locationChangeFn)
				this.runningType = 'play-left-fill'
			},
			getMyPosition() {
				if (this.running) {
					return this.stopRunning()
				}
				this.getLocation()
					.catch(err => {
						throw err
					}).finally(() => {
						wx.startLocationUpdate({
							type: 'gcj02',
							success: (res) => {
								this.time = new Date().getTime()
								this.timer = setInterval(() => {
									this.runTime += 1
								}, 1000)
								this.running = true
								this.runningType = 'pause'
								wx.onLocationChange(this._locationChangeFn)
							},
							fail: (err) => {
								throw err
							}
						})
					})
			},
			formatTime() {
				console.log(this.runTime)
				const minit = Math.floor(this.runTime / 60)
				if (minit > 0) {
					this.runTime -= minit * 60
				}
				return `${minit}:${this.runTime}`
			},
			...mapMutations(['setExerciseAchive'])
		},
		computed: {
			formatHasRun() {
				const res = this.hasRun.toFixed(2)
				return res > 0 ? res : 0
			},
			...mapState({
				userinfo: state => state.userinfo
			})
		}
	}
</script>

<style lang="scss">
	.map {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100% - 150px);
	}

	.switch-case {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 150px;
		background: white;

		.has-run {
			position: absolute;
			left: 0;
			top: 0;
			padding: 20px;
			font-size: 25px;
			font-weight: bolder;
		}

		.switch {
			position: absolute;
			right: 20px;
			top: 0;
			width: 70px;
			height: 100%;
			text-align: center;

			i {
				display: block;
				margin-top: -35px;
				width: 70px;
				height: 70px;
				border-radius: 100%;
				background: $uni-color-uniapp;

				.swt-icon {
					width: 40px;
					height: 40px;
					margin: 15px;
				}
			}

			.time {
				margin-top: 10px;
			}
		}
	}
</style>
