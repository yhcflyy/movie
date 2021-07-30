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

function getRecomendList(page,pageSize) {
	if (page === undefined) page = 0
	if (pageSize == undefined) pageSize = 5
	return request({
		method: "GET",
		url: "/tomato/gae/video/home",
		data: {
			"page": page,
			"size": pageSize,
		}
	})
}

export default {
	getSwiperList,
	getRecomendList,
}
