<template>
	<div
		class="tml-selections-preview"
		v-if="collection && collection.length"
	>
		<div
			v-for="(media, i) of collection"
			:key="i"
		>
			<a class="tml-selection-item" @click="onClick" :href="media.url" target="_blank">
				<Media
					:info="info"
					:media="media"
					svgwidth="100"
					svgheight="100"
				/>
			</a>
		</div>
	</div>
</template>
<script>
	import Media from "./Media.vue";
	export default {
		components: { Media },
		props: {
			previewLink: { default: 0, type: [Boolean, String, Number] },
			collection: { default: () => [] },
			info: { default: false },
			preview: { default: true },
		},
		methods:{
			onClick(e){
				// console.log(this.previewLink);
				if(!this.previewLink){
					e.preventDefault();
					return;
				}
				

			}
		}
	};
</script>
<style lang=""></style>
