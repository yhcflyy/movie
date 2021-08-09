<template>
	<view>
		<view class="video-container" :style="{height: bottomHeight + 'rpx'}">
			<video id="videoView" src="http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4" class="video"
				autoplay="true"></video>
		</view>
		<scroll-view class="bottom-container" :style="{top: bottomHeight + 'rpx'}" scroll-y="true">
			<view style="margin-left: 15rpx;margin-right: 15rpx;margin-top: 10rpx;">
				<text class="text-style" style="font-size: 16px; font-weight: bold;">{{video.title}}</text>
				<text class="text-style">主演：{{video.actor}}</text>
				<text class="text-style" style="font-size: 16px; font-weight: bold;">简介</text>
				<text >{{video.introduction}}</text>
				<text class="text-style" style="font-size: 16px; font-weight: bold;">推荐</text>
			</view>

			<view class="album-container">
				<view class="album-item" v-for="(video,index) in suggestVideos" :key="index">
					<common-image :src="video.imgUrl"></common-image>
					<view class="video-bottom">
						<text class="video-bottom-text">{{video.title}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import swiperApi from "../../common/api/swiperapi.js"

	export default {
		data() {
			return {
				video: {},
				suggestVideos: [],
				bottomHeight: 400
			}
		},
		onLoad(option) {
			console.log(option)
			swiperApi.getVideoDetail(option.videoId).then(res => {
				this.video = res
				console.log(res)
			}).catch(error => {
				console.log(error)
			})
			swiperApi.getSuggestion(option.videoId).then(res => {
				this.suggestVideos = res.items
				console.log(this.suggestVideos)
			}).catch(error => {
				console.log(error)
			})
		},
		mounted() {
			// var _this = this
			// uni.getSystemInfo({
			// 	success: function(res) { // res - 各种参数
			// 		let obj = uni.createSelectorQuery().select('.video-container')
			// 		obj.boundingClientRect(function(data) { // data - 各种参数
			// 			_this.bottomHeight =  data.height + 'rpx'
			// 			console.log(res.windowHeight)
			// 		}).exec()
			// 	}
			// })
			// this.bottomHeight = 400;
		},
		methods: {

		}
	}
</script>

<style>
	.video-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		/* position: relative;
		padding-top: 42%; //56.25% 9/16 */
	}

	.video {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.bottom-container {
		position: relative;
		width: 100%;
		/* top: 332rpx; */
	}

	.text-style {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.album-container {
		margin: 0rpx 15rpx 0rpx 15rpx;
		display: grid;
		grid-template-columns: repeat(auto-fill, 230rpx);
		grid-auto-rows: 350rpx;
		row-gap: 15rpx;
		column-gap: 15rpx;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}

	.album-item {
		border-radius: 10rpx;
		overflow: hidden;
		/* 修复wx圆角无效果 */
		transform: translateY(0);
		background-color: #C8C7CC;
	}

	.album-top {
		/* 	margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx; */
		margin: 15rpx;
		display: flex;
		align-items: center;
		/* height: 60rpx; */
	}

	.video-bottom {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 60rpx;
		/* background-color: #4CD964; */
		background-image: linear-gradient(to top, #00000088, transparent);
	}

	.video-bottom-text {
		position: absolute;
		bottom: 10rpx;
		left: 15rpx;
		right: 15rpx;
		color: white;
		font-size: 12px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
