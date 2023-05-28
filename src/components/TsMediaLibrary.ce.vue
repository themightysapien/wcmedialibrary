<template>
	<div v-if="url">
		<section
			v-if="opened"
			:class="modalClass"
			@click="_onModalBackgroundClick"
			@transitionend="onAnimationEnd"
			id="tml-backgroundmodal"
		>
			<div
				class="tml-content rounded"
				@click="onContentClick"
			>
				<div class="tml-modal-header">
					<h3>Media Library</h3>
					<button
						class="btn-primary"
						type="button"
					>
						<svg
							class="tml-modal-button-icon w-5 h-5 mr-1 -ml-2 rtl:ml-1 rtl:-mr-2"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
							></path>
						</svg>
						Upload
					</button>
					<a
						tabindex="-1"
						type="button"
						class="tml-modal-close-link"
						@click="close"
						title="Close"
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
						<span class="sr-only"> Close </span>
					</a>
				</div>
				<div class="tml-modal-body">
					<Uploader
						:multiple="multiple"
						:autoHide="autoHide"
					/>

					<div class="tml-gallery-preview-container rounded">
						<div class="w-full">
							<Filter />
							<Gallery />
						</div>
						<div class="tml-preview-container">
							<Information />
						</div>
					</div>
				</div>
				<div class="tml-modal-footer">
					<div class="ml-auto">
						<button
							type="button"
							style="margin-right: 0.5rem"
							class="btn-secondary"
							@click.prevent="close"
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn-primary"
						>
							Save & Close
						</button>
					</div>
				</div>
			</div>
		</section>
		<span @click="open">
			<slot> {{ label }} </slot>
		</span>
	</div>
</template>
<script lang="ts">
	import Filter from "./Filter.vue";
	import Gallery from "./Gallery.vue";
	import Information from "./Information.vue";
	import Uploader from "./Uploader.vue";
	import useMediaStore from "../composables/media.store";
	import { defineComponent } from "vue";

	export default defineComponent({
		components: { Uploader, Gallery, Filter, Information },
		setup() {
			const { setUrl } = useMediaStore();

			return { setUrl };
		},
		props: {
			blocking: { default: false },
			label: { default: "Upload" },
			multiple: { default: 0 },
			url: { required: true },
			autoHide: { default: false },
			removeConfirm: { default: true },
			allowFiles: { default: 0 },
			removeConfirmText: {
				default: "Are you sure you want to remove this file?",
			},
		},
		data() {
			return {
				opened: true,
				_toChange: false,
			};
		},
		beforeMount() {
			// console.log(this.url);
			if (this.url) {
				this.setUrl(this.url);
			}
		},
		methods: {
			open() {
				this.opened = true;
				this._toChange = true;
				setTimeout(() => {
					this._toChange = false;
				}, 50);
			},
			_onModalBackgroundClick(e: any) {
				if (
					!this.blocking &&
					e.target &&
					e.target.getAttribute("id") === "tml-backgroundmodal"
				) {
					this.close();
					this.$emit("tml-modal-background-closed", {
						bubbles: true,
						composed: true,
						detail: this,
					});
				}
			},
			onContentClick(e: any) {
				console.log(e);
			},

			close() {
				this.opened = false;
				this._toChange = true;
				this.$emit("tml-modal-closed", {
					bubbles: true,
					composed: true,
					detail: this,
				});
			},

			onAnimationEnd() {
				this._toChange = false;
			},
		},
		computed: {
			modalClass() {
				if (!this.opened && !this._toChange) {
					return "transparent";
				}
				if (this.opened && this._toChange) {
					return "transparent opened";
				}
				if (this.opened && !this._toChange) {
					return "opaque";
				}
				if (!this.opened && this._toChange) {
					return "transparent opened";
				}
			},
		},
	});
</script>
<style lang="scss">
	@import "../style.scss";
</style>
