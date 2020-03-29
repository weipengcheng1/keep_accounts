<template>
	<view class="content1">
		<view class="title">
			<image src="../../static/icon/erwei.jpg" ></image>
		</view>
		<button class="share-btn" @tap="shareEvn">分享</button>
		<!-- 分享弹窗-->
		<view class="share-pro">
			<view class="share-pro-mask" v-if="deliveryFlag"></view>
			<view class="share-pro-dialog" :class="deliveryFlag ? 'open' : 'close'">
				<view class="close-btn" @tap="closeShareEvn"><span class="font_family">&#xe6e6;</span></view>
				<view class="share-pro-title">分享</view>
				<view class="share-pro-body">
					<view class="share-item">
						<button open-type="share">
							<view class="font_family share-icon">&#xe6fa;</view>
							<view>分享给好友</view>
						</button>
					</view>
					<view class="share-item" @tap="createCanvasImageEvn">
						<view class="font_family share-icon">&#xe6f9;</view>
						<view>生成分享图片</view>
					</view>
				</view>
			</view>
		</view>
		<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData" />
		<view :hidden="canvasFlag">
			<!-- 海报 要放外面放组件里面 会找不到 canvas-->
			<canvas class="canvas" canvas-id="myCanvas"></canvas>
			<!-- 海报 -->
		</view>
	</view>
</template>

<script>
import hchPoster from '../../wxcomponents/hch-poster/hch-poster.vue';
export default {
	components: {
		hchPoster
	},
	data() {
		return {
			deliveryFlag: false,
			canvasFlag: true,
			posterData: {}
		};
	},
	onLoad() {},
	methods: {
		createCanvasImageEvn() {
			// 这个是固定写死的小程序码
			Object.assign(this.posterData, {
				url: 'http://39.108.141.129:8002/images/bg.jpg', //商品主图
				title: '小榔头,记一次记账小程序出生经历', //标题
				code: 'http://39.108.141.129:8002/images/erwei.jpg' //小程序码
			});
			this.$forceUpdate(); //强制渲染数据
			setTimeout(() => {
				this.canvasFlag = false; //显示canvas海报
				this.deliveryFlag = false; //关闭分享弹窗
				this.$refs.hchPoster.createCanvasImage(); //调用子组件的方法
			}, 500);
		},
		// 分享弹窗
		shareEvn() {
			this.deliveryFlag = true;
		},
		// 关闭分享弹窗
		closeShareEvn() {
			this.deliveryFlag = false;
		},
		// 取消海报
		canvasCancel(val) {
			this.canvasFlag = val;
		}
	}
};
</script>

<style lang="scss" scoped>
/*每个页面公共css 放app.vue页面的 */
@font-face {
	font-family: 'font_family'; /* project id 1065286 */
	src: url('//at.alicdn.com/t/font_1065286_3bsye5aijur.eot');
	src: url('//at.alicdn.com/t/font_1065286_3bsye5aijur.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1065286_3bsye5aijur.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.woff') format('woff'), url('//at.alicdn.com/t/font_1065286_3bsye5aijur.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.svg#font_family') format('svg');
}
.font_family {
	font-family: 'font_family' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
/* 按钮去掉边框 */
button::after {
	border: none;
}
button {
	margin-left: 0;
	margin-right: 0;
	padding-left: 0;
	padding-right: 0;
	line-height: 1;
	color: #1c1c1c;
	font-size: 28rpx;
	background: none;
}
.button-hover {
	color: #1c1c1c;
	background: none;
}
/*每个页面公共css */
.content1 {
	text-align: center;
	height: 100%;
}
.share-btn {
	padding: 30upx 60upx;
	background-color: $uni-btn-color;
	color: $uni-text-color-inverse;
}
.share-pro {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	z-index: 5;
	line-height: 1;
	box-sizing: border-box;
	.share-pro-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
	.share-pro-dialog {
		width: 750rpx;
		height: 310rpx;
		overflow: hidden;
		background-color: #fff;
		border-radius: 24rpx 24rpx 0px 0px;
		position: relative;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		.close-btn {
			padding: 20rpx 15rpx;
			position: absolute;
			top: 0rpx;
			right: 29rpx;
		}
		.share-pro-title {
			font-size: 28rpx;
			color: #1c1c1c;
			padding: 28rpx 41rpx;
			background-color: #f7f7f7;
		}

		.share-pro-body {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			font-size: 28rpx;
			color: #1c1c1c;
			.share-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				justify-content: space-around;
				.share-icon {
					text-align: center;
					font-size: 70rpx;
					margin-top: 39rpx;
					margin-bottom: 16rpx;
					color: #42ae3c;
				}
				&:nth-child(2) {
					.share-icon {
						color: #ff5f33;
					}
				}
			}
		}
	}

	/* 显示或关闭内容时动画 */

	.open {
		transition: all 0.3s ease-out;
		transform: translateY(0);
	}

	.close {
		transition: all 0.3s ease-out;
		transform: translateY(310rpx);
	}
}
.canvas {
	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	display: block !important;
	width: 100% !important;
	height: 100% !important;
	z-index: 10;
}
.title {
	width: 100%;
	height: 89vh;
	background: url("https://ae01.alicdn.com/kf/Hc2efe90ddbd240889ab036f105fe776e7.jpg");
	background-size: 100% 100%;
	margin-bottom: 30rpx;
	position: relative;
	image{
		position: absolute;
		bottom: 18rpx;
		width: 200rpx;
		height: 200rpx;
		right: 293rpx;
	}
}
</style>
