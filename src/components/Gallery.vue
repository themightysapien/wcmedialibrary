<template>
	<div class="tml-gallery">
		<div
			class="custom-check"
			v-for="(no, i) of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="i"
		>
			<input
				class="form-check-input"
				type="radio"
				name="media"
                :id="`media-${no}`"
				:value="no"
			/>
			<label class="tml-gallery-item rounded" :for="`media-${no}`">
				<img
					src="https://placehold.co/300x250"
					class="tml-gallery-image object-cover"
				/>
				<span class="tml-gallery-item-info">
					<p class="tml-gallery-item-title truncate">
						Image abcd is the one and it shall go on {{ no }}
					</p>
					<span class="tml-gallery-item-subtitle"> 230KB </span>
				</span>
			</label>
		</div>
	</div>
</template>
<script>
	export default {};
</script>
<style></style>
