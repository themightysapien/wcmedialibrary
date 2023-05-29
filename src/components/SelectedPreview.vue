<template>
	<div
		class="tml-selections-preview"
		v-if="collection && collection.length"
	>
		<div class="tml-selection-item"
			v-for="(media, i) of collection"
			:key="i"
		>
			<Media :media="media" />
		</div>
	</div>
</template>
<script>
	import Media from "./Media.vue";
	export default {
		components: { Media },
		props: {
			collection: { default: () => [] },
		},
	};
</script>
<style lang=""></style>
