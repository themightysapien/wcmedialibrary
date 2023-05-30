<template>
	<div v-if="media">
		<img
			:src="media.thumb_url"
			v-bind="$attrs"
			:title="media.file_name"
		/>
	</div>
</template>
<script>
	export default {
		props: {
			media: { default: null },
		},
		computed: {
			isImage() {
				return this.media && this.media.mime_type.indexOf("image") >= 0;
			},
		},
	};
</script>
