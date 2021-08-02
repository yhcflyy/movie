<template>
	<view>
		<view>
			<block v-for="album in albums" :key='album.albumId'>
				<view class="item" @click="albumDetail(album)">
					<image class="item-image" :src="album.albumImageUrl" webp="true" mode="aspectFill"></image>
					<text class="item-title">{{album.albumTitle}}</text>
					<text class="item-subtitle">{{album.albumDes}}</text>
				</view>
			</block>
		</view>
		<u-loadmore :status="loadMoreStatus" v-if="albums.length > 0"></u-loadmore>
	</view>
</template>

<script>
	import swiperApi from '../../common/api/swiperapi.js'

	export default {
		data() {
			return {
				albums: [],
				loadMoreStatus: "loadmore",
				page: 0,
				totalPage: 0,
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.page = 0
			this.loadMore(0)
		},
		onReachBottom() {
			if (this.page >= this.totalPage) return;
			this.page++
			this.loadMore(this.page)
		},
		methods: {
			loadMore(page) {
				this.loadMoreStatus = "loading"
				swiperApi.getDiscoveryList(page).then(res => {
					if (page >= res.totalPages) {
						this.loadMoreStatus = "nomore"
					} else {
						this.loadMoreStatus = "loadmore"
					}
					uni.stopPullDownRefresh()
					this.totalPage = res.totalPages
					res.items.forEach(function(item) {
						// #ifdef APP-PLUS  
						item.albumImageUrl = item.albumImageUrl.replace(".webp", ".jpg")
						// #endif
					})
					if (page === 0) {
						this.albums = res.items
					} else {
						this.albums = this.albums.concat(res.items)
					}
				}).catch(err => {
					this.loadMoreStatus = "loadmore"
					uni.stopPullDownRefresh()
				})
			},
			albumDetail(param){
				console.log(param)
				uni.navigateTo({
					url: '../album-detail/album-detail?albumId=' + param.albumId+"&albumTitle=" + param.albumTitle,
				})
			}
		}
	}
</script>

<style>
	.item {
		height: 510rpx;
		padding-bottom: 15rpx;
		border-radius: 10rpx;
		box-shadow: 0px 0px 30rpx 10rpx rgba(50, 50, 50, 0.1);
		overflow: hidden;
		transform: translateY(0);
		margin: 15rpx;
	}

	.item-image {
		width: 100%;
		height: 390rpx;
	}

	.item-title {
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-bottom: 0rpx;
		display: block;
		font-size: 14px;
		font-weight: 400;
		color: #333333;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.item-subtitle {
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		display: block;
		font-size: 12px;
		color: #666666;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
