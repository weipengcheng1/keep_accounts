export const request = ({
	url,
	method,
	data
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method ? method : 'GET',
			data: data,
			success(res) {
				resolve(res);
			},
			fail(error) {
				reject(error);
			}
		})
	})
}
//用户登录
export const login = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: "weixin",
			success(resp) {
				resolve(resp);
			},
			fail(error) {
				reject(error);
			}
		})
	})
}
//获取用户信息
export const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			success(resp) {
				resolve(resp);
			},
			fail(error) {
				reject(error);
			}
		})
	})

}
