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

function getDiscoveryList(page,pageSize){
	if (page === undefined) page = 0
	if (pageSize == undefined) pageSize = 5
	return request({
		method: "GET",
		url: "/tomato/gae/video/discovery",
		data: {
			"page": page,
			"size": pageSize,
		}
	})
}

function getAlbumList(albumId){
	return request({
		method: "GET",
		url: "/tomato/gae/video/album",
		data: {
			"albumId": albumId,
		}
	})
}

function getVideoDetail(videoId){
	return request({
		method: "GET",
		url: "/tomato/gae/video/detail",
		data: {
			"videoId": videoId,
		}
	})
}

function getSuggestion(videoId){
	return request({
		method: "GET",
		url: "/tomato/gae/video/suggest",
		data: {
			"videoId": videoId,
		}
	})
}

export default {
	getSwiperList,
	getRecomendList,
	getDiscoveryList,
	getAlbumList,
	getVideoDetail,
	getSuggestion,
}
