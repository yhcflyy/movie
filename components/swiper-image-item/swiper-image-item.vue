<template>
	<swiper-item>
		<image v-bind:src="src"></image>
	</swiper-item>
</template>

<script>
	export default {
		name:"swiper-image-item",
		data() {
			return {
				
			};
		},
		props:{
			src:{
				type:String,
				default:""
			}
		}
	}
</script>

<style>

</style>
