<template>
	<view class="con">
		<view v-for="(item,index) in courses" class="card" :key="item.id">
			<view class="info">
				<view class="name">{{item.name}}</view>
				<view class="range">
					<text>周二{{item.lesson.join(',')}}节</text>
					<text>共{{item.courseTimes}}个课时</text>
				</view>
				<view class="place">{{item.place}}</view>
			</view>
			<view class="select">
				<view>
					<u-button type="primary" @click="select(item.id,index)" :disabled="item.selected" size="mini">选课
					</u-button>
				</view>
				<view>
					<u-button type="warning" @click="dropCourse(item.id,index);dropOutCourse(index)"
						:disabled="!item.selected" size="mini">退课
					</u-button>
				</view>
			</view>
		</view>
		<view v-if="!courses.length">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
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

			}
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo,
				courses: state => state.courses
			}),
		},
		methods: {
			select(id, index) {
				uni.request({
					url: Url + '/courseselection',
					method: 'PUT',
					data: {
						id,
						//这里比较特殊，就是要json，不必改
						student: JSON.stringify({
							id: this.userinfo.id,
							nickName: this.userinfo.nickName,
							fanculty: this.userinfo.fanculty,
							major: this.userinfo.major,
							class: this.userinfo.class,
						})
					},
					success: (res) => {
						const data = res.data
						if (data.code === 1) {
							this.selectCourse(index)
							uni.showToast({
								title: '选课成功',
								icon: 'success'
							})
						}
					}
				})
			},
			dropCourse(id, index) {
				uni.request({
					url: Url + '/dropcourse',
					method: 'GET',
					data: {
						id,
						stuid: this.userinfo.id
					},
					success: (res) => {
						const data = res.data
						if (data.code === 1) {
							this.dropOutCourse(index)
							uni.showToast({
								title: '退课成功',
								icon: 'success'
							})
						}
					}
				})
			},
			...mapMutations(['selectCourse', 'dropOutCourse'])
		}
	}
</script>

<style lang="scss">
	.con {
		width: calc(100% - 20px);
		margin: auto;

		.card {
			box-sizing: border-box;
			width: 100%;
			height: 105px;
			padding: 10px;
			box-shadow: 0 0 5px $uni-text-color-placeholder;

			.info {
				height: 60px;
				width: 100%;

				.name {
					height: 20px;
					font-size: 15px;
					font-weight: bold;
				}

				.range,
				.place {
					height: 20px;
					font-size: 13px;
					line-height: 20px;

					text {
						margin-right: 20px;
					}
				}
			}

			.select {
				width: 100%;
				height: 20px;
				margin-top: 5px;
				display: flex;

				view {
					width: 60px;
					height: 100%;
					margin-right: 20px;
				}
			}
		}
	}
</style>
