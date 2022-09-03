<template>
	<view class="con">
		<view>
			<text>BMI</text>
			<text>--</text>
			<text>{{achievement.bmi}}</text>
		</view>
		<view>
			<text>肺活量</text>
			<text>--</text>
			<text>{{achievement.vitalCapacity}}</text>
		</view>
		<view>
			<text>立定跳远</text>
			<text>--</text>
			<text>{{achievement.standingLongJump}}</text>
		</view>
		<view>
			<text>50米跑</text>
			<text>--</text>
			<text>{{achievement.fiftyMeterRun}}</text>
		</view>
		<view>
			<text>1000米跑</text>
			<text>--</text>
			<text>{{achievement.kilometerRun}}</text>
		</view>
		<view>
			<text>引体向上</text>
			<text>--</text>
			<text>{{achievement.hardwareUp}}</text>
		</view>
		<view>
			<text>坐位体前屈</text>
			<text>--</text>
			<text>{{achievement.settingBodyFlexion}}</text>
		</view>
		<view>
			<text>身高</text>
			<text>--</text>
			<text>{{achievement.height}}</text>
		</view>
		<view>
			<text>体重</text>
			<text>--</text>
			<text>{{achievement.weight}}</text>
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
		computed: {
			...mapState({
				achievement: state => state.userinfo.achievement
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.con {
		width: calc(100% - 20px);
		margin: auto;

		view {
			display: flex;
			height: 30px;
			line-height: 30px;
			justify-content: space-around;

			text {
				flex: 1;
				font-size: 14px;

				&:nth-child(1) {
					text-align: left;
				}

				&:nth-child(2) {
					text-align: center;
				}

				&:nth-child(3) {
					text-align: right;
					color: $uni-color-uniapp;
				}
			}
		}
	}
</style>
