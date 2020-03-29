<template>
	<view class="content">
		<view class="title">
			<vant-button :type="type1" @click="go(1)">支出</vant-button>
			<vant-button :type="type2" @click="go(0)">收入</vant-button>
		</view>
		<view class="int_box">
			<view class="int_left">
				<text class="iconfont iocn active" :class="class_name"></text>
				<text>{{ title }}</text>
			</view>
			<view class="int_right" @click="openKeyBoard('number')">{{ num }}</view>
		</view>
		<view class="class_list">
			<template v-for="(item, index) in classList">
				<view class="item" :key="index" @click="selectClass(index)">
					<text class="iconfont iocn" :class="[item.icon, item.isactive ? 'active' : '']"></text>
					<text>{{ item.title }}</text>
				</view>
			</template>
		</view>
		<view class="note">
			<view class="note_title">备注:</view>
			<view class="int1_box"><input type="text" @input="getNote" /></view>
		</view>
		<view class="btn_box"><vant-button type="priany" :disabled="disabled"  @click="save" >保存</vant-button></view>
		<keyboard-package ref="number" @onInput="onInput" @onDelete="onDelete" @onConfirm="onConfirm" :disableDot="true" />
	</view>
</template>

<script>
import keyboardPackage from '@/components/keyboard-package/keyboard-package.vue';
import { request } from '../../util/api.js';
import {url} from "@/util/http.js";

export default {
	components: {
		keyboardPackage
	},
	data() {
		return {
			type: 'number',
			type1: 'warning',
			type2: 'default',
			typeOf: '支出',
			class_name: 'icon-chihe',
			title: '吃喝',
			note: '',
			num: '0.00',
			disabled:false,
			classList: [
				{ id: 1, title: '吃喝', icon: 'icon-chihe', isactive: true },
				{ id: 2, title: '交通', icon: 'icon-jiaotong', isactive: false },
				{ id: 3, title: '日用品', icon: 'icon-riyongpin', isactive: false },
				{ id: 4, title: '红包', icon: 'icon-hongbao', isactive: false },
				{ id: 5, title: '服饰', icon: 'icon-fushi', isactive: false },
				{ id: 6, title: '买菜', icon: 'icon-maicai', isactive: false },
				{ id: 7, title: '网购', icon: 'icon-wanggoubuxingjie', isactive: false },
				{ id: 8, title: '话费', icon: 'icon-huafei', isactive: false },
				{ id: 9, title: '孩子', icon: 'icon-haizi', isactive: false },
				{ id: 10, title: '娱乐', icon: 'icon-yule1', isactive: false },
				{ id: 11, title: '医疗', icon: 'icon-yiliao', isactive: false },
				{ id: 12, title: '化妆护肤', icon: 'icon-huazhuanghufu', isactive: false },
				{ id: 13, title: '其他', icon: 'icon-qita', isactive: false }
			],
			numberList: [],
			length: 8
		};
	},
	methods: {
		getNote(e) {
			console.log(e);
			this.note = e.detail.value;
		},
		async save() {
			//获取类型、支出还是收入、消费金额、备注;
			const openid = uni.getStorageSync('openid');
			console.log(openid);
			if (openid == '' || openid == null) {
				return uni.switchTab({
					url: '../user/user'
				});
			}
			if(this.num=='0.00' || this.num=='0'){
				return uni.showToast({
					title:'请输入金额',
					icon:'none'
				})
			}
			this.disabled=true;
			const res = await request({
				url: url,
				method: 'POST',
				data: {
					openid: openid,
					typeOf: this.typeOf,
					money: this.num,
					type: this.title,
					note: this.note,
					icon: this.class_name
				}
			});
			console.log(res);
			const { code, msg } = res.data;
			if (code === 0) {
				uni.showToast({
					title:msg,
					icon:"success"
				})
				this.disabled=false;
			}else{
				this.disabled=false;
				uni.showToast({
					title:msg,
					icon:"success"
				})
			}
		},
		openKeyBoard(key) {
			this.type = key;
			this.$refs[key].open();
		},
		go(e) {
			if (e === 1) {
				this.type2 = 'default';
				this.type1 = 'warning';
				this.typeOf = '支出';
			} else {
				this.type2 = 'warning';
				this.type1 = 'default';
				this.typeOf = '收入';
			}
		},
		selectClass(e) {
			const class_item = this.classList.find((item, index) => index === e);
			(this.title = class_item.title), (this.class_name = class_item.icon);
			for (let i = 0; i < this.classList.length; i++) {
				if (i !== e) {
					this.classList[i].isactive = false;
				} else {
					this.classList[i].isactive = true;
				}
			}
		},
		onInput(e) {
			this.numberList.push(e);
			this.num = this.numberList.join('');
		},
		onConfirm(e) {
			uni.showToast({
				title: '完成输入！',
				duration: 2000,
				icon: 'none'
			});
		},
		onDelete() {
			this.numberList.pop();
			if (this.numberList.length === 0) {
				return (this.num = '0.00');
			}
			this.num = this.numberList.join('');
		},
		close() {
			this.$refs[this.type].close();
		}
	}
};
</script>

<style lang="scss">
.title {
	width: 100%;
	text-align: center;
	button {
		border-right: none;
		border-radius: 0;
		width: 200rpx;
		border: 2rpx solid #ff976a;
	}
	.van-button--default {
		color: #ff976a;
	}
}
.int_box {
	display: flex;
	align-items: center;
	width: 98%;
	padding: 20rpx;
	margin: 10rpx;
	box-sizing: border-box;
	background-color: #e5e5e5;
	border-radius: 10rpx;
	font-size: 47rpx;
	.int_left {
		display: flex;
		align-items: center;
		text:nth-child(1) {
			margin-right: 10rpx;
		}
		text:nth-child(2) {
			color: #222222;
		}
	}
	.int_right {
		flex: 1;
		text-align: right;
		color: #999999;
	}
}
.class_list {
	width: 100%;
	padding: 20rpx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	box-sizing: border-box;
	background-color: white;
	border-radius: 10rpx;
	.item {
		width: calc(100% / 5);
		text-align: center;
		margin-bottom: 20rpx;
		text {
			display: block;
			width: 100%;
		}
	}
}
.note {
	width: 98%;
	box-sizing: border-box;
	padding: 15rpx;
	margin: 0 10rpx;
	border-bottom: 4rpx solid #e5e5e5;
	display: flex;
	align-items: center;
	background-color: #e5e5e5;
	border-radius: 10rpx;
	.note_title {
		width: 15%;
		font-size: 40rpx;
		font-weight: 600;
		color: #424242;
	}
	.int1_box {
		width: 85%;
		box-sizing: border-box;
		input {
			width: 100%;
			border-radius: 10rpx;
			padding: 20rpx 0 20rpx 0;
			background: white;
		}
	}
}
.btn_box {
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
	text-align: center;
	button {
		width: 100%;
		font-size: 40rpx;
		background-color: #ff976a;
		color: white;
	}
}
.iocn {
	font-size: 80rpx;
	color: #e5e5e5;
}
.active {
	color: #ff976a;
}
</style>
