<template>
	<view class="page">
		<swiper class="swiperStyle" autoplay="true" indicator-dots="true" circular="true" indicator-active-color="white" indicator-color="grey">
			<swiper-item v-for="item in items" :key="item.id">
				<image v-bind:src="item.img" class="swiper-image" mode="aspectFill" webp="true"></image>
				<view class="swiper_bottom">
					<text class="swiper-item-text">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import swiperApi from '../../common/api/swiperapi.js'
	
	export default{
		data(){
			return {
				items : []
			}
		},
		onLoad() {
			swiperApi.getSwiperList().then(res=>{
				this.items = res;
			})
		}
	}
</script>

<style>
	.swiperStyle{
		width: calc(100% - 40rpx);
		height: 400rpx;
		border-radius: 10rpx;
		box-shadow: 0 10px 20px 0 rgba(50,50,50,0.1);
		overflow: hidden;
		/* 修复wx圆角无效果 */
		transform: translateY(0);	
		/* 上右下左 */
		margin: 15rpx 15rpx 15rpx 15rpx;
	}
	.swiper-image{
		width: 100%;
		height: 100%;
	}
	.swiper_bottom{
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 120rpx;
		/* background-color: #4CD964; */
		background-image: linear-gradient(to top,black,transparent);
	}
	.swiper-item-text{
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
</style>
