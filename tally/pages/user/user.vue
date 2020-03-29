<template>
	<view class="content1">
		<view class="user_info" v-if="isshow">
			<view class="headimg"><image :src="userInfo.avatarUrl" mode=""></image></view>
			<view class="nicke_name">{{ userInfo.nickName }}</view>
		</view>
		<view class="btn_box" v-if="!isshow"><button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button></view>
		<view class="menu_list">
			<template v-for="(item, index) in menu_list">
				<view class="item" :key="index">
					<text class="iconfont  icon" :class="item.class_name"></text>
					<text>{{ item.menu }}</text>
					<button v-if="item.id==3" open-type="feedback" class="btnitem iconfont icon-iconleft"></button>
					<navigator v-else :url="item.url" class="iconfont icon-iconleft"></navigator>
				</view>
			</template>
		</view>
		<view class="share">
			
		</view>
	</view>
</template>

<script>

import { request, login } from '@/util/api.js';
export default {
	data() {
		return {
			openid: '',
			isshow: false,
			userInfo:{},
			menu_list: [
				{ id: 1, menu: '记账提醒', class_name: 'icon-naozhong',url:"../remind/remind"},
				{ id: 2, menu: '设置', class_name: 'icon-shezhi' },
				{ id: 3, menu: '帮助与反馈', class_name: 'icon-bangzhu'  },
				{ id: 4, menu: '分享给好友', class_name: 'icon-fenxiang',url:"../hch-poster/hch-poster" },
				{ id: 5, menu: '关于我们', class_name: 'icon-guanyuwomen' }
				
			]
		};
	},
	created() {
		//获取openid
		const userinfo=uni.getStorageSync('userinfo');
		if(userinfo==null || userinfo==''){
			this.isshow=false;
		}else{
			this.isshow=true;
			this.userInfo=userinfo;
		}
	},
	methods: {
		 getUserInfo(e) {
			console.log(e);
			const {userInfo}=e.detail;
			this.userInfo=userInfo;
			this.isshow=true;
			uni.setStorageSync('userinfo',userInfo)
		}

	}
};
</script>

<style lang="scss" scoped>
.user_info {
	padding: 50rpx 0 10rpx 0;
	width: 100%;
	background: url(../../static/icon/bg.jpg) no-repeat;
	.headimg {
		width: 100%;
		text-align: center;
		image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 6rpx solid white;
		}
	}
	.nicke_name {
		width: 100%;
		padding: 20rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: 600;
		box-sizing: border-box;
	}
}

.btn_box {
	width: 100%;
	height: 300rpx;
	padding: 20rpx;
	text-align: center;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	button {
		background-color: $uni-color-warning;
		width: 200rpx;
		color: #ffffff;
		line-height: 70rpx;
	}
}
.menu_list {
	padding: 10rpx;
	box-sizing: border-box;
	.item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 34rpx;
		background-color: #f3f3f3;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		text:nth-child(1) {
			margin-right: 20rpx;
		}
		navigator {
			flex: 1;
			text-align: right;
		}
	}
}

.btnitem{
  flex-direction:row;
  align-items: center;
  position: relative;
  text-align:right;
  text-decoration:none;
  border: none;
  border-radius: 0;
  line-height: 1;
  padding-right: 0;
  flex: 1;
  background:none
}
.btnitem::after {
  border: none;
  border-radius: 0;
  background:none;
}
</style>
