<template>
	<view class="con">
		<view>
			<u-toast ref="uToast" />
		</view>
		<text>昵称:</text>
		<u--input border="surround" clearable v-model="userinfo.nickName"></u--input>
		<text>学院:</text>
		<u--input border="surround" clearable v-model="userinfo.fanculty"></u--input>
		<text>专业:</text>
		<u--input border="surround" clearable v-model="userinfo.major"></u--input>
		<text>班级:</text>
		<u--input border="surround" clearable v-model="userinfo.class"></u--input>
		<text>性别:</text>
		<u-radio-group v-model="userinfo.gender">
			<view v-for="(item, index) in list" :key="index" class="radio">
				<text>{{genderFormat(item.name)}}</text>
				<u-radio :name="item.name">
				</u-radio>
			</view>
		</u-radio-group>
		<view class="subbtn">
			<u-button type="primary" @click="submit()">提交</u-button>
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
				list: [{
						name: 1
					},
					{
						name: 0
					},
					{
						name: -1
					}
				]
			}
		},
		methods: {
			genderFormat(value) {
				switch (value) {
					case 1:
						return '男'
					case 0:
						return '女'
					case -1:
						return '不展示'
				}
			},
			submit() {
				const data = {
					nickName: this.userinfo.nickName,
					fanculty: this.userinfo.fanculty,
					major: this.userinfo.major,
					class: this.userinfo.grades,
					gender: this.userinfo.gender,
					id: this.userinfo.id
				}
				uni.request({
					url: Url + '/edituserinfo',
					method: 'PUT',
					data,
					success: (res) => {
						const data = res.data
						if (data.code === 1) {
							uni.showToast({
								title: data.msg,
								type: 'success'
							})
						} else {
							uni.showToast({
								title: '服务器故障',
								icon: 'error'
							})
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络连接失败',
							icon: 'error'
						})
					}
				})
			},
			...mapMutations(['setSingleUIAttr'])
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo
			})
		}
	}
</script>

<style lang="scss">
	.con {
		width: 100%;
		padding: 0 5px;
		box-sizing: border-box;

		text {
			font-size: 15px;
			font-weight: bold;
		}

		.radio {
			width: auto;
			display: flex;
			padding: 5px 10px 0 0;
		}

		.subbtn {
			margin-top: 30px;
		}
	}
</style>
