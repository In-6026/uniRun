<template>
	<view>
		<view class="tab">
			<view v-for="week in weeks" class="cell head" :key="week">{{week}}</view>
		</view>
		<view v-for="sec in section" class="tab" :key="sec">
			<view v-for="week in weeks" class="cell body" :key="week">
				<view>{{course(week, sec)}}</view>
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
			return {
				weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				section: [1, 2, 3, 4]
			}
		},
		methods: {
			course(week, sec) {
				const cour = this.filterCourse.find(cour => cour.weekday === week && cour.lesson.includes(sec * 2))
				return cour ? cour.name : ''
			}
		},
		computed: {
			filterCourse() {
				return this.courses.filter((cour) => cour.selected)
			},
			...mapState({
				courses: state => state.courses
			}),
		}
	}
</script>

<style lang="scss">
	.tab {
		width: 100%;
		height: auto;
		display: flex;
		border: 1rpx solid $uni-text-color-grey;
		justify-content: space-around;

		.cell {
			flex: 1;
			min-height: 30px;
			font-size: 12px;
			line-height: 30px;
			height: auto;
			text-align: center;
			border-bottom: 1rpx solid $uni-text-color-grey;

		}

		.head {
			background: $uni-text-color-disable;
		}

		.body {
			background: $uni-text-color-disable;
		}
	}
</style>
