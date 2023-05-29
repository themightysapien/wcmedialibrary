<template>
	<div class="tml-media-preview">
		<div v-if="activeItem">
			<div class="tml-media-preview-image-container">
				<Media :media="activeItem" class="tml-media-preview-image rounded"/>
				<!-- <img
					:src="activeItem.thumb_url"
					class="tml-media-preview-image rounded"
				/> -->
				<h2 class="text-lg ">{{ activeItem.file_name }}</h2>
				<p>{{ activeItem.size_readable }}</p>
			</div>
			<div class="tml-media-info-content">
				<h4>Information</h4>
				<dl class="">
					<!-- <div class="">
						<dt class="">Uploaded by</dt>
						<dd class="">Demo User</dd>
					</div> -->
					<div class="">
						<dt class="">Uploaded at</dt>
						<dd :title="activeItem.created_at" class="truncate">{{ activeItem.created_at }}</dd>
					</div>
					<!-- <div class="">
						<dt class="">Dimensions</dt>
						<dd class="">1920 x 1459</dd>
					</div> -->
					<div class="">
						<dt class="">ID</dt>
						<dd class="">{{ activeItem.id }}</dd>
					</div>
					<div class="">
						<dt class="">Thumb conversion generated</dt>
						<dd class="">Yes</dd>
					</div>
				</dl>
			</div>
		</div>
		<div
			v-else
			class="tml-media-preview-empty"
		>
			<h2 class="text-lg font-medium">
				<span style="word-break: break-word"> No Media Selected </span>
			</h2>
			<p class="text-sm font-medium">Select a media to view its information.</p>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, computed, watchEffect, inject } from "vue";
	import Media from './Media.vue';

	import useMediaStore from "../composables/media.store";

	// console.log(props);
	const uid = inject('uid')

	const { activeItem, activate } = useMediaStore(uid);

	onMounted(() => {});
</script>
<style></style>
