import request from '../request.js'

function getSwiperList() {
	return request({
		method: "GET", // 请求方式
		url: '/tomato/app/banner/home/list', // 请求url
		data: {
			'platform': 'ios',
			'ver': '1.0.4'
		}
	})
}

function getRecomendList() {
	return request({
		method: "GET",
		url: "/tomato/gae/video/home",
		data: {
			"page": 0,
			"size": 10
		}
	})
}

export default {
	getSwiperList,
	getRecomendList,
}
