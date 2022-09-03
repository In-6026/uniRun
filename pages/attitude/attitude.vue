<template>
	<view class="con">
		<view>
			<text>旷课：</text>
			<text>{{courseAtitude.truant}}次</text>
		</view>
		<view>
			<text>病假：</text>
			<text>{{courseAtitude.sickLeave}}次</text>
		</view>
		<view>
			<text>事假：</text>
			<text>{{courseAtitude.personalLeave}}次</text>
		</view>
		<view>
			<text>迟到：</text>
			<text>{{courseAtitude.late}}次</text>
		</view>
		<view>
			<text>早退：</text>
			<text>{{courseAtitude.leaveEarly}}次</text>
		</view>
		<view>
			<text>不认真：</text>
			<text>{{courseAtitude.halfheartness}}次</text>
		</view>
		<view>
			<text>违反纪律：</text>
			<text>{{courseAtitude.discipline}}次</text>
		</view>
		<view>
			<text>着装不符合：</text>
			<text>{{courseAtitude.wrongDressing}}次</text>
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
		onLoad() {

		},
		methods: {

		},
		computed: {
			...mapState({
				courseAtitude: state => state.userinfo.courseAtitude
			})
		}
	}
</script>

<style lang="scss">
	.con {
		width: calc(100% - 20px);
		margin: auto;

		view {
			width: 100%;
			height: 30px;
			line-height: 30px;

			text {
				font-size: 14px;

				&:nth-child(1) {
					float: left;
				}

				&:nth-child(2) {
					float: right;

					&:after {
						clear: both;
					}
				}
			}
		}
	}
</style>
