<template>
	<view class="page">
		<swiper class="swiperStyle" autoplay="true" indicator-dots="true" circular="true" indicator-active-color="white"
			indicator-color="grey">
			<swiper-item v-for="item in bannerItems" :key="item.id">
				<common-image v-bind:src="item.img" class="swiper-image"></common-image>
				<view class="swiper_bottom">
					<text class="swiper-item-text">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<block v-for="item in recommendItems" :key="item.albumId">
			<view class="album-top">
				<image style="width: 30px;height: 30px;" src="../../static/hot.png"></image>
				<text style="font-size: 16px; margin-left: 10rpx;">{{item.albumTitle}}</text>
				<view style="flex-grow: 1;"></view>

				<view style="display: flex;align-items: center;" @click="moreAlbum">
					<text style="font-size: 12px; margin-left: 10rpx;">更多</text>
					<image style="width: 20px;height: 20px;" src="../../static/right-arrow.png"></image>
				</view>
			</view>
			<view class="album-container" @click="gotoDetailPage">
				<view class="album-item" v-for="video in item.videoList" :key="video.videoId">
					<common-image v-bind:src="video.imgUrl" class="swiper-image"></common-image>
					<view class="video-bottom">
						<text class="video-bottom-text">{{video.title}}</text>
					</view>
				</view>
			</view>
		</block>
	<u-loadmore :status="loadMoreStatus" v-if="recommendItems.length > 0"></u-loadmore>
	</view>
</template>

<script>
	import swiperApi from '../../common/api/swiperapi.js'
	export default {
		data() {
			return {
				bannerItems: [],
				recommendItems: [],
				page: 0,
				loadMoreStatus : "loading"
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			imageError: function(e) {
				e.imgUrl = '/static/image_error_white.png'
				e.imageMode = 'center'
			},
			gotoDetailPage: function(e) {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			moreAlbum: function(e) {
				uni.navigateTo({
					url: '../hot/hot'
				})
			},
			refresh(page) {
				let bannerList = swiperApi.getSwiperList();
				let recomendList = swiperApi.getRecomendList();
				Promise.all([bannerList, recomendList]).then(res => {
					//banner
					let items = res[0];
					items.forEach(function(elem) {
						// #ifdef APP-PLUS
						elem.img = elem.img.replace(".webp", ".jpg")
						// #endif
					})
					this.bannerItems = items;

					//recommend
					let recommendList = res[1].items;
					this.replaceWebp(recommendList)
					this.recommendItems = recommendList;
					uni.stopPullDownRefresh()
					this.page = 1;
				}).catch(error => {
					console.log(error);
					uni.stopPullDownRefresh()
				});
			},
			loadMore(){
				this.loadMoreStatus = "loading"
				swiperApi.getRecomendList(this.page).then(res => {
					this.replaceWebp(res.items)
					this.recommendItems = this.recommendItems.concat(res.items)
					this.page++;
					if (this.page >= res.totalPages){
						this.loadMoreStatus = "nomore"
					}else{
						this.loadMoreStatus = "loadmore"
					}
				}).catch(error =>{
					this.loadMoreStatus = "loadmore"
				});
				
			},
			replaceWebp(recommendList){
				recommendList.forEach(function(item) {
					item.videoList.forEach(function(video) {
						video.imageMode = 'aspectFill';
						if (video.imgUrl.endsWith(".webp")) {
							// #ifdef APP-PLUS  
							video.imgUrl = video.imgUrl.replace(".webp", ".jpg")
							// #endif
						}
					})
				})
			}
			
		}
	}
</script>

<style>
	.swiperStyle {
		background-color: #cccccc;
		width: calc(100% - 30rpx);
		height: 400rpx;
		border-radius: 10rpx;
		box-shadow: 0px 0px 20px 0 rgba(50, 50, 50, 0.1);
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

	.album-top {
		/* 	margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx; */
		margin: 15rpx;
		display: flex;
		align-items: center;
		/* height: 60rpx; */
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
