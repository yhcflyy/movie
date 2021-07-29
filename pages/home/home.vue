<template>
	<view class="page">
		<swiper class="swiperStyle" autoplay="true" indicator-dots="true" circular="true" indicator-active-color="white"
			indicator-color="grey">
			<swiper-item v-for="item in bannerItems" :key="item.id">
				<image v-bind:src="item.img" class="swiper-image" mode="aspectFill" webp="true" :lazy-load="true"></image>
				<!-- <u-image width="100%" height="100%" :src="item.img" mode="aspectFill" :lazy-load="true"></u-image> -->
				<view class="swiper_bottom">
					<text class="swiper-item-text">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="album" v-for="item in recommendItems" :key="item.albumId">
			<view class="album-top">{{item.albumTitle}}</view>
			<view class="album-container">
				<view class="album-item" v-for="video in item.videoList" :key="video.videoId">
					<image v-bind:src="video.imgUrl" :mode="video.imageMode" webp="true" class="swiper-image"
						:lazy-load="true" @error="imageError(video)"></image>
					<view class="video-bottom">
						<text class="video-bottom-text">{{video.title}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import swiperApi from '../../common/api/swiperapi.js'
	export default {
		data() {
			return {
				bannerItems: [],
				recommendItems: []
			}
		},
		onLoad() {
			swiperApi.getSwiperList().then(res => {
				let items = res;
				items.forEach(function(elem){
					// #ifdef APP-PLUS
						elem.img = elem.img.replace(".webp",".jpg")
					// #endif
				})
				this.bannerItems = res;
			})
			swiperApi.getRecomendList().then(res => {
				let items = res.items;
				items.forEach(function(item) {
					item.videoList.forEach(function(video) {
						video.imageMode = 'aspectFill';
						if (video.imgUrl.endsWith(".webp")) {
							// #ifdef APP-PLUS  
								video.imgUrl = video.imgUrl.replace(".webp",".jpg")
							// #endif
						}
					})
				})
				this.recommendItems = res.items;
			})
		},
		methods: {
			imageError: function(e) {
				e.imgUrl = '/static/image_error_white.png'
				e.imageMode = 'center'
				console.log(e.imgUrl)
			}
		}
	}
</script>

<style>
	.swiperStyle {
		width: calc(100% - 30rpx);
		height: 400rpx;
		border-radius: 10rpx;
		box-shadow: 0 10px 20px 0 rgba(50, 50, 50, 0.1);
		overflow: hidden;
		/* 修复wx圆角无效果 */
		transform: translateY(0);
		/* 上右下左 */
		margin: 15rpx 15rpx 15rpx 15rpx;
	}

	.swiper-image {
		width: 100%;
		height: 100%;
	}

	.swiper_bottom {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 120rpx;
		/* background-color: #4CD964; */
		background-image: linear-gradient(to top, #00000066, transparent);
	}

	.swiper-item-text {
		position: absolute;
		bottom: 45rpx;
		left: 15rpx;
		right: 15rpx;
		color: white;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
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

	.video-bottom {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 60rpx;
		/* background-color: #4CD964; */
		background-image: linear-gradient(to top, #00000021, transparent);
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
