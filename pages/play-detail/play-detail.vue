<template>
	<view>
		<view class="video-container">
			<video src="https://media.w3.org/2010/05/sintel/trailer.mp4" class="video" autoplay="true"></video>
		</view>
		<view class="bottom-container">
			<text class="text-style">{{video.title}}</text>
			<text class="text-style">{{video.actor}}</text>
		</view>
	</view>
</template>

<script>
	import swiperApi from "../../common/api/swiperapi.js"
	
	export default {
		data() {
			return {
				video : {}
			}
		},
		onLoad(option) {
			console.log(option)
			swiperApi.getVideoDetail(option.videoId).then(res =>{
				this.video = res
				console.log(res)
			}).catch(error =>{
				console.log(error)
			})
		},
		methods: {

		}
	}
</script>

<style>
	.video-container {
		position: relative;
		padding-top: 56.25%;//9/16
	}
	.video {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.bottom-container{
		background-color: #007AFF;
		width: 100%;
	}
	.text-style{
		display: block; 
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 10rpx;
	}
</style>
