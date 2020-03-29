<script>
	import { request, login } from '@/util/api.js';
export default {
	 onLaunch: async function() {
		const login1 = await login();
		const getOpenid = await request({
			url:
				'https://api.weixin.qq.com/sns/jscode2session?appid=wx4480d5c5ad542ffb&secret=879b3914023fdc9f102ab4825143d1d7&js_code=' +
				login1.code +
				'&grant_type=authorization_code'
		});
		const {openid}=getOpenid.data;
		uni.setStorageSync('openid',openid);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>
<style src="@/static/css/iconfont.css"></style>
<style lang="scss">
/*每个页面公共css */
.content:before {
	width: 100vw;
	height: 100vh;
	padding: 0rpx 10rpx;
	content: '';
	box-sizing: border-box;
	background: #f8f8f8;
	background-size: cover;
}
.icon {
	color: $uni-color-warning;
	font-size: 40rpx;
}
</style>
