import request from '../request.js'

function getSwiperList (data) {
	return request({
		method: "GET", // 请求方式
		url: '/tomato/app/banner/home/list', // 请求url
		data: {"platform":"ios","ver":"1.0.4"} // 参数
	})
}

export default{
	getSwiperList,
}