<template>
	<view>
		<u-tabs :list="tabList" @change="changeTab($event)" :activeStyle="{
            fontWeight: 'bolder'
        }" :current="tabCurrent"></u-tabs>
		<view v-if="tabCurrent==0">
			<view class="pic">运动奏响生命，运动点燃激情</view>
			<view class="process">
				<u-line-progress :percentage="finished" activeColor="#439947"></u-line-progress>
			</view>
			<view class="process-txt">
				<text>已参加 0 次</text>
				<text>目标 4 次</text>
			</view>

			<view class="club-course-tle">
				<text class="txt">俱乐部课程</text>
				<view @click="navTo('exercise')" class="arrow">
					<text>查看记录</text>
					<u-icon name="arrow-right" color="$uni-text-color-grey" size="14"></u-icon>
				</view>
			</view>
			<view v-if="courses.length">
				<u-tabs :list="filterCourses" :activeStyle="{
				    fontWeight: 'bold'
				}" :inactiveStyle="{
				    color: '#000'
				}" @click="choseClub()"></u-tabs>
				<view class="date">
					<view class="week">
						<text v-for="(item,index) in nextSevenDay" :class="{nextD:  index === timeIndex}"
							:key="item.getDate()">{{item.getDate()}}</text>
					</view>
					<view class="day">
						<text v-for="(item,index) in nextSevenWeekDay" :class="{nextD: isThisWeekDay(item)===index}"
							:key="item">{{item}}</text>
					</view>
				</view>
			</view>
			<view class="pic2"></view>
		</view>

		<view v-if="tabCurrent==1">
			<view v-for="cour in filterCourses" class="card" :key="cour.id">
				<view>课程：{{cour.name}}</view>
				<view>老师：{{cour.teacher.nickName}}</view>
				<view>地点：{{cour.place}}</view>
				<view>时间：{{cour.weekday}} 第{{cour.lesson.join(',')}}节</view>
			</view>
			<view v-if="!filterCourses.length">
				<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import Url from '@/utils/baseUrl.js'
	import Getdate from '@/utils/Getdate.js'
	export default {
		data() {
			return {
				tabCurrent: 0,
				tabList: [{
					name: '俱乐部'
				}, {
					name: '我的俱乐部'
				}],
				finished: 0,
				clubCurrent: 0,
				nextSevenDay: Getdate.nextSevenDay(),
				timeIndex: 0
			}
		},
		methods: {
			navTo(name) {
				uni.navigateTo({
					url: `/pages/${name}/${name}`
				});
			},
			changeTab(event) {
				this.tabCurrent = event.index;
			},
			choseClub(item) {
				this.clubCurrent = this.filterCourses.findIndex(cour => cour.name === item.name);
			},
			isThisWeekDay(weekday) {
				const currentCour = this.filterCourses[
					this.clubCurrent
				]
				if(!currentCour) {
					return;
				}
				const week = currentCour.weekday
				this.timeIndex = this.nextSevenWeekDay.indexOf(week)
				return this.timeIndex
			},
			...mapMutations(['selectCourse', 'dropOutCourse'])
		},
		computed: {
			nextSevenWeekDay() {
				return this.nextSevenDay.map(item => {
					return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][item.getDay()]
				})
			},
			filterCourses() {
				return this.courses.filter(cour => cour.selected)
			},
			...mapState({
				userinfo: state => state.userinfo,
				courses: state => state.courses
			}),
		}
	}
</script>

<style lang="scss">
	.pic,
	.pic2 {
		text-align: center;
		color: $uni-text-color-grey;
		font-size: 12px;
		width: 100%;
		height: 200px;
	}

	.pic {
		background: url('../../static/img/sport.png') no-repeat center;
		background-size: contain;
	}

	.pic2 {
		margin: 10px auto;
		background: url('../../static/img/sport2.png') no-repeat center;
		background-size: contain;
	}

	.process {
		width: calc(100% - 10px);
		margin: 10px 5px;
	}

	.process-txt {
		width: calc(100%-10px);
		height: 20px;
		margin: 0 5px;

		text {
			font-size: 13px;

			&:nth-child(1) {
				float: left;
			}

			&:nth-child(2) {
				float: right;

				&::after {
					clear: both;
				}
			}
		}
	}

	.club-course-tle {
		width: calc(100%-5px);
		height: 30px;
		margin: 15px 0 15px 5px;

		.txt {
			float: left;
			font-size: 15px;
			font-weight: bolder;
			line-height: 30px;
		}

		.arrow {
			float: right;
			font-size: 14px;
			line-height: 30px;
			display: flex;
			color: $uni-text-color-grey;
		}
	}

	.date {
		width: 100%;
		height: 80px;

		.now {
			font-weight: bold;
			color: $uni-color-primary;
		}

		.week,
		.day {
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 40px;
			line-height: 40px;

			text {
				text-align: center;
				line-height: 40px;
				font-size: 14px;
			}

			.nextD {
				font-weight: bold;
				color: $uni-color-warning;
			}
		}
	}

	.card {
		width: calc(100% - 20px);
		height: auto;
		padding: 5px 10px;
		margin: 10px;
		box-sizing: border-box;
		box-shadow: 0 0 3px $uni-text-color-placeholder;
		font-size: 13px;
	}
</style>
