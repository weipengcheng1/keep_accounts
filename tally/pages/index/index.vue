<template>
	<view class="content_box">
		<view class="header">
			<view class="date_box">
				<view class="year">{{ year }}年</view>
				<picker mode="date" :value="date" fields="month" @change="bindDateChange">
					<view class="picker">
						<view class="mounth_box">
							<text>{{ mounth }}</text>
							<text>月</text>
							<text class="iconfont icon-xiajiantou icon1"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="type_box">
				<view class="item">
					<text>收入</text>
					<text>0.0</text>
				</view>
				<view class="item">
					<text>支出</text>
					<text>0.0</text>
				</view>
			</view>
		</view>
		<view class="bill_list">
			<view class="table_head">
				<view>消费类型</view>
				<view>类型</view>
				<view>金额</view>
			</view>
			<template v-for="(item, index) in billArr">
				<view class="item1" :key="index" @click="lookDetail(item.id)">
					<view class="list">
						<view class="title">
							<text class="iconfont  icon" :class="item.icon ? item.icon : 'icon-xiajiantou'" style="font-size: 60rpx;"></text>
							<text>{{ item.type }}</text>
						</view>
						<view class="typeOf">{{ item.typeOf }}</view>
						<view class="money">{{ item.typeOf == '支出' ? '-' : '' }}{{ item.money }}</view>
					</view>
					<view class="time_box">{{ item.create_time }}</view>
				</view>
			</template>
		</view>
		<view class="marked_words">{{ marked_words }}</view>
	</view>
</template>
<script>
import { request } from '../../util/api.js';
import {url} from "@/util/http.js";
export default {
	data() {
		return {
			billArr: [],
			year: new Date().getFullYear(),
			mounth: new Date().getMonth() + 1 <= 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
			sort_pages: 5,
			nowPage: 1,
			pageInfo: {},
			openid: '',
			page: 1,
			marked_words: '上拉加载更多'
		};
	},
	onLoad() {
		const openid = uni.getStorageSync('openid');
		if (openid == '' || openid == null) {
			return uni.switchTab({
				url: '../user/user'
			});
		}
	},
	onShow() {
		this.billArr = [];
		this.nowPage = 1;
		this.page = 1;
		const openid = uni.getStorageSync('openid');
		this.openid = openid;
		this.getBill(openid, this.nowPage);
	},
	onReachBottom() {
		if (this.page > this.pageInfo.totalPage) {
			this.marked_words = '已经到底了，别拉了。。。';
		} else {
			this.getBill(this.openid, this.nowPage);
		}
	},
	methods: {
		bindDateChange(e) {
			const { value } = e.detail;
			(this.year = value.split('-')[0]), (this.mounth = value.split('-')[1]);
		},
		getBill(openid, page) {
			uni.showLoading({
				title: '加载中。。。'
			});
			request({
				url: url+'?op=getBill',
				data: { openid, page }
			}).then(resp => {
				console.log(resp);
				const { code, msg } = resp.data;
				if (code === 0) {
					this.billArr = [...this.billArr, ...resp.data.info];
					this.pageInfo = resp.data.pageInfo[0];
					this.nowPage = this.pageInfo.nextPage;
					this.page += 1;
					setInterval(function() {
						uni.hideLoading();
					}, 2000);
				} else {
					uni.showToast({
						title: msg
					});
				}
			});
		},
		lookDetail(e) {
			console.log(e);
		    uni.navigateTo({
		    	url:"../billdetail/billdetail?id="+e,
		    })
		}
	}
};
</script>
<style lang="scss" scoped>
.content_box {
	width: 100vw;
	height: 100vh;
	padding: 0rpx 10rpx;
	box-sizing: border-box;
}
.header {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	margin: 0 -10rpx;
	background-color: #ff976a;
	.date_box {
		flex: 0.5;
		margin: 0 0 20rpx 20rpx;
		.year {
			margin-bottom: 10rpx;
		}
		.picker {
			border-right: 2rpx solid #333333;
			padding-right: 60rpx;
			text:nth-child(1) {
				font-size: 44rpx;
			}
			text:nth-child(3) {
				margin-left: 10rpx;
			}
		}
	}
	.type_box {
		flex: 2;
		display: flex;
		margin-left: 20rpx;
		.item {
			flex: 1;
			text {
				display: block;
				text-align: center;
			}
			text:nth-child(1) {
				margin-bottom: 20rpx;
			}
		}
	}
}
.bill_list {
	box-sizing: border-box;
	.table_head {
		display: flex;
		align-items: center;
		background-color: #ff976a;
		margin: 0 -10rpx;
		padding: 10px;
		view {
			flex: 1;
		}
		view:nth-child(2),
		view:nth-child(3) {
			text-align: center;
		}
	}
	.item1 {
		padding: 10rpx 0;
		background-color: #e5e5e5;
		border-radius: 10rpx;
		margin: 20rpx 0;
		padding: 10rpx;
	}
	.list {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10rpx 0;
		view {
			flex: 1;
		}
		.title {
			display: flex;
			align-items: center;
			text:nth-child(1) {
				margin-right: 10rpx;
			}
		}
		.typeOf,
		.money {
			text-align: center;
		}
	}
	.time_box {
		width: 89%;
		text-align: right;
	}
}
.marked_words {
	width: 100%;
	padding: 20rpx 0;
	text-align: center;
	font-size: 30rpx;
	background-color: $uni-bg-color-hover;
	border-radius: 10rpx;
}
.icon1 {
	color: black;
}
</style>
