<template>
	<div class="tml-gallery">
		<template v-if="loading"> Loading... </template>
		<template v-else>
			<div
				class="tml-gallery-grid"
				v-if="state.items.length"
			>
				<div
					class="custom-check"
					v-for="(media, no) of state.items"
					:key="no"
				>
					<input
						class="form-check-input"
						type="checkbox"
						name="media"
						:id="`media-${no}`"
						:value="no"
					/>
					<label
						class="tml-gallery-item rounded"
						:for="`media-${no}`"
					>
						<div class="tml-gallery-item-preview-container">
							<img
								:src="`https://placehold.co/250x250`"
								class="tml-gallery-image object-cover"
							/>
						</div>
						<span class="tml-gallery-item-info">
							<p class="tml-gallery-item-title truncate">
								Image abcd is the one and it shall go on {{ no }}
							</p>
							<span class="tml-gallery-item-subtitle"> 230KB </span>
						</span>
					</label>
				</div>
			</div>
			<div
				v-else
				class="tml-gallery-empty"
			>
				<div class="text-center">
					<svg
						class=""
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							vector-effect="non-scaling-stroke"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						></path>
					</svg>
					<h3 class="text-sm font-medium">
						No images found
					</h3>
					<p class="text-sm">
						Get started by uploading your first item.
					</p>
				</div>
			</div>
		</template>
	</div>
</template>
<script setup>
	import { onMounted } from "vue";
	import useMediaStore from "../composables/media.store";

	const { state, loading, fetchOnce } = useMediaStore();

	onMounted(() => {
		fetchOnce();
	});
</script>
<style></style>
