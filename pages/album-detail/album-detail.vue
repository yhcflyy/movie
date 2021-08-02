<template>
	<view class="album-container">
		<view class="album-item" v-for="video in videos" :key="video.videoId">
			<image v-bind:src="video.imgUrl" webp="true" class="album-image" :lazy-load="true" :mode="video.imageMode"
				@error="imageError(video)"></image>
			<view class="video-bottom">
				<text class="video-bottom-text">{{video.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import swiperApi from '../../common/api/swiperapi.js'
	export default {
		data() {
			return {
				videos: [],
				imageMode: "aspectFill"
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.albumTitle
			})
			swiperApi.getAlbumList(option.albumId).then(res => {
				this.videos = res.videoList
			})
		},
		methods: {
			imageError: function(e) {
				e.imgUrl = '/static/image_error_white.png'
				e.imageMode = 'center'
			},
		}
	}
</script>

<style>
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

	.album-image {
		width: 100%;
		height: 100%;
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
