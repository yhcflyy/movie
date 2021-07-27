<template>
	<view class="page">
		<swiper class="swiperStyle" autoplay="true" interval="3000" indicator-dots="true" circular="true">
			<swiper-item v-for="item in items" :key="item.id">
				<image v-bind:src="item.img" class="swiper-image" mode="aspectFill" webp="true"></image>
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
		width: 100%;
		height: 400rpx;
	}
	.swiper-image{
		width: 100%;
		height: 100%;
	}
</style>
