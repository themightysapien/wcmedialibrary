<template>
	<div
		class="tml-selections-preview"
		v-if="collection && collection.length"
	>
		<div
			v-for="(media, i) of collection"
			:key="i"
		>
			<div class="tml-selection-item">
				<Media
					:info="false"
					:media="media"
				/>
			</div>
			<Media
				v-if="info"
				:preview="false"
				:info="true"
				:media="media"
			/>
		</div>
	</div>
</template>
<script>
	import Media from "./Media.vue";
	export default {
		components: { Media },
		props: {
			collection: { default: () => [] },
			info: { default: false },
			preview: { default: true },
		},
	};
</script>
<style lang=""></style>
