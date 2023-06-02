<template>
	<div
		v-if="media"
		class="tml_media_box"
		:title="title"
	>
		<template v-if="preview">
			<img
				v-if="isImage"
				:src="media.thumb_url"
				v-bind="$attrs"
				
			/>

			<svg
				v-else
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				:width="svgwidth"
				:height="svgheight"
				viewBox="0 0 64 64"
				enable-background="new 0 0 64 64"
				xml:space="preserve"
				
			>
				<path
					fill="#231F20"
					d="M60,0H14c-2.211,0-4,1.789-4,4v27H4c-2.211,0-4,1.789-4,4v23c0,3.313,2.687,6,6,6h52c3.313,0,6-2.687,6-6V4
	C64,1.789,62.211,0,60,0z M10,58c0,2.209-1.791,4-4,4s-4-1.791-4-4V35c0-1.104,0.896-2,2-2h6V58z M21,13h15c0.553,0,1,0.447,1,1
	s-0.447,1-1,1H21c-0.553,0-1-0.447-1-1S20.447,13,21,13z M53,51H21c-0.553,0-1-0.447-1-1s0.447-1,1-1h32c0.553,0,1,0.447,1,1
	S53.553,51,53,51z M53,45H21c-0.553,0-1-0.447-1-1s0.447-1,1-1h32c0.553,0,1,0.447,1,1S53.553,45,53,45z M53,39H21
	c-0.553,0-1-0.447-1-1s0.447-1,1-1h32c0.553,0,1,0.447,1,1S53.553,39,53,39z M53,33H21c-0.553,0-1-0.447-1-1s0.447-1,1-1h32
	c0.553,0,1,0.447,1,1S53.553,33,53,33z M53,27H21c-0.553,0-1-0.447-1-1s0.447-1,1-1h32c0.553,0,1,0.447,1,1S53.553,27,53,27z M53,21
	H21c-0.553,0-1-0.447-1-1s0.447-1,1-1h32c0.553,0,1,0.447,1,1S53.553,21,53,21z"
				/>
			</svg>
		</template>

		<span
			v-if="info"
			class="tml-media-item-info"
		>
			<p class="tml-media-item-title truncate">
				{{ media.file_name }}
			</p>
			<span class="tml-media-item-subtitle">
				{{ media.size_readable }}
			</span>
		</span>
	</div>
</template>
<script>
	export default {
		props: {
			media: { default: null },
			svgwidth: { default: "120" },
			svgheight: { default: "120" },
			info: { default: false },
			preview: { default: true },
		},
		computed: {
			isImage() {
				// console.log(this.media);
				return (
					this.media &&
					this.media.mime_type &&
					this.media.mime_type.indexOf("image") >= 0
				);
			},
			title(){
				return this.media ? this.media.file_name + ' | ' + this.media.size_readable : 'File';
			}
		},
	};
</script>
