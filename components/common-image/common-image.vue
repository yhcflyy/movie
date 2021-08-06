<template>
	<view class="view-container">
		<image :src="src" :class='isImageError ? "image-error" : "image-normal"' webp="true" mode="aspectFill"
			@error="errorEvent" @load="successEvent"></image>
	</view>
</template>

<script>
	export default {
		name: "common-image",
		data() {
			return {
				isImageError: false
			};
		},
		props: {
			src: String,
			default: "",
			required: true
		},
		methods: {
			errorEvent: function(e) {
				this.isImageError = true
			},
			successEvent: function(e) {
				this.isImageError = false
			}
		}
	}
</script>

<style>
	.view-container {
		display: inline;
	}

	.image-normal {
		width: 100%;
		height: 100%;
	}

	.image-error {
		width: 100%;
		height: 100%;
		background-image: url(../../static/image_error_white.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100rpx 100rpx;
	}
</style>
