<template>
	<view class="content1">
		<view class="title">
			<text class="iconfont" :class="billDetail.icon"></text>
			<text>{{ billDetail.type }}</text>
		</view>
		<view class="detail">
			<view class="type">
				<text>消费类型：</text>
				<text>{{ billDetail.typeOf }}</text>
			</view>
			<view class="money">
				<text>金额:</text>
				<text>{{ billDetail.money }}</text>
			</view>
			<view class="time">
				<text>消费时间:</text>
				<text>{{ billDetail.create_time }}</text>
			</view>
			<view class="note">
				<text>备注：</text>
				<text>{{ billDetail.note }}</text>
			</view>
		</view>
		<view class="tab_bar">
			<view class="compile">编辑</view>
			<view class="delete" @click="deleteBill(billDetail.id)">删除</view>
		</view>
	</view>
</template>

<script>
import { request } from '@/util/api.js';
import { url } from '@/util/http.js';
export default {
	data() {
		return {
			billDetail: {}
		};
	},
	onLoad(option) {
		console.log(option);
		this.getBillDetail(option.id);
	},
	methods: {
		async getBillDetail(id) {
			const detail = await request({ url: url + '?op=getdetail&id=' + id });
			console.log(detail);
			if (detail.data.code == 0) {
				this.billDetail = detail.data.info[0];
			} else {
				uni.showToast({
					title: detail.data.msg,
					success() {
						uni.navigateBack({});
					}
				});
			}
		},
		deleteBill(e) {
			uni.showModal({
				title: '是否删除该订单？',
				async success() {
					const resp = await request({ url: url + '?op=deteleBill&id=' + e });
					console.log(resp);
					if (resp.data.code === 0) {
						uni.showToast({
							title: resp.data.msg,
							icon: 'success',
							success() {
								uni.navigateBack({});
							}
						});
					} else {
						uni.showToast({
							title: resp.data.msg
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	width: 100%;
	background-color: #ff976a;
	text-align: center;
	box-sizing: border-box;
	text {
		display: block;
		width: 100%;
		font-size: 40rpx;
	}
	text:nth-child(1) {
		font-size: 80rpx;
		color: white;
		padding: 10rpx 0;
	}
	text:nth-child(2) {
		padding: 0 0 20rpx 0;
	}
}
.detail {
	padding: 10rpx;
	box-sizing: border-box;
	view {
		padding: 20rpx 0;
		border-bottom: 2rpx solid #e3e3e3;
		text:nth-child(1) {
			margin-right: 20rpx;
		}
	}
}
.tab_bar {
	position: fixed;
	bottom: 0;
	width: 100%;
	border-top: 2rpx solid #c8c7cc;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	text-align: center;
	color: white;
	.compile {
		width: 50%;
		padding: 20rpx;
		border-right: 2rpx solid #c8c7cc;
		background-color: #409eff;
	}
	.delete {
		width: 50%;
		padding: 20rpx;
		background-color: #ff976a;
	}
}
</style>
