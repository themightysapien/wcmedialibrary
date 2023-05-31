<template>
	<div class="tml-gallery-filter">
		<div class="tml-gallery-breadcrumb">
			<p
				class="text-sm"
				v-if="selectedItems && selectedItems.length"
			>
				<span class="text-lg text-primary font-bold">{{
					selectedItems.length
				}}</span>
				{{ selectedItems.length > 1 ? "files" : "file" }} selected
			</p>
		</div>
		<div class="tml-gallery-controls">
			<select
				class="control"
				@change="onSortChange"
			>
				<option value="">Sort By</option>
				<option value="latest">Latest</option>
				<option value="oldest">Oldest</option>
				<option value="alphabetical">A-Z</option>
			</select>
			<input
				type="text"
				class="control"
				v-model="form.value"
				@keyup="onKeyUp"
				placeholder="Search"
			/>
			<a
				v-if="state.filter.keyword"
				@click.prevent="clear"
				class="tml-filter-clear"
				title="Clear"
			>
				<svg
					tabindex="-1"
					class=""
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					></path>
				</svg>
			</a>
		</div>
	</div>
</template>
<script setup>
	import useMediaStore from "../composables/media.store";
	import { inject, reactive } from "vue";
	import { debounce } from "../helpers";
	const uid = inject("uid");
	const { state, selectedItems, resetFilter } = useMediaStore(uid);

	const form = reactive({
		value: "",
		sort: "",
	});

	const onKeyUp = debounce((e) => {
		state.filter.keyword = form.value;
	}, 500);

	const onSortChange = (e) => {
		// console.log(e.target.value);
		if (e.target.value) {
			state.filter.sort = e.target.value;
		}
	};

	const clear = () => {
		resetFilter();
		form.value = "";
	};
</script>
<style></style>
