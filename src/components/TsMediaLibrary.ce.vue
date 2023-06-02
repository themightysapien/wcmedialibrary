<template>
	<div
		v-if="url"
		class="tml-media-library"
	>
		<Toasts />
		<section
			v-if="opened"
			:class="modalClass"
			@click="_onModalBackgroundClick"
			@transitionend="onAnimationEnd"
			id="tml-backgroundmodal"
		>
			<div class="tml-content rounded">
				<div class="tml-modal-header">
					<h3>{{ title || "Media Library" }}</h3>
					<button
						class="btn-primary"
						type="button"
						@click.prevent="
							uploadVisible = !uploadVisible;
							scrollToTop();
						"
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
				<div
					class="tml-modal-body"
					ref="tml_modal_body"
				>
					<div class="tml-gallery-preview-container rounded">
						<div class="w-full">
							<Uploader
								v-model:visible="uploadVisible"
								:multiple="multiple"
								:autoHide="autoHide"
								:allow-files="allowFiles"
								:accept="accept"
							/>
							<div style="clear: both"></div>
							<div class="tml-gallery">
								<Filter v-if="state.items.length" />
								<Gallery :multiple="multiple" />
							</div>
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
							@click.prevent="onSaveClick"
						>
							Save & Close
						</button>
					</div>
				</div>
			</div>
		</section>
		<div >
			<selected-preview
				v-if="preview"
				:info="true"
				:collection="selectedItems"
				:previewLink="previewLink"
			/>
			<slot v-if="isBtnVisible || !selectedItems || !selectedItems.length">
				<button class="btn-primary" @click="open">
					{{ selectedItems && selectedItems.length ? updateLabel : label }}
				</button>
			</slot>
		</div>
	</div>
</template>
<script lang="ts">
	import Filter from "./Filter.vue";
	import Gallery from "./Gallery.vue";
	import Information from "./Information.vue";
	import Uploader from "./Uploader.vue";
	import useMediaStore from "../composables/media.store";
	import { defineComponent } from "vue";
	import SelectedPreview from "./SelectedPreview.vue";
	import Toasts from "./Toasts.vue";

	export default defineComponent({
		components: {
			Uploader,
			Gallery,
			Filter,
			Information,
			SelectedPreview,
			Toasts,
		},
		setup(props) {
			const { initStore, state, selectedItems } = useMediaStore(props.uid);

			return { initStore, state, selectedItems };
		},
		enits: ["tml-modal-background-closed", "updated"],
		props: {
			blocking: { default: false },
			preview: { default: true },
			label: { default: "Select File" },
			updateLabel: { default: "Click To Change" },
			multiple: { default: 0, type: [Boolean, String, Number] },
			previewLink: { default: 1, type: [Boolean, String, Number] },
			url: { required: true },
			autoHide: { default: false },
			removeConfirm: { default: true },
			allowFiles: { default: 0 },
			maxLength: { default: 5 },
			accept: {
				default:
					"image/*, audio/*, video/*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, .doc, .docx, .csv, .txt",
			},
			removeConfirmText: {
				default: "Are you sure you want to remove this file?",
			},
			uid: { default: "default" },
			title: { default: "Media Library" },
		},
		provide() {
			// use function syntax so that we can access `this`
			return {
				uid: this.uid,
			};
		},
		expose: ['open'],
		data() {
			return {
				opened: false,
				_toChange: false,
				uploadVisible: false,
			};
		},
		beforeMount() {
			// console.log(this.multiple);
			// console.log(this.url);
			if (this.url) {
				this.initStore(this.url, this.uid, this.multiple);
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
			scrollToTop() {
				if (this.uploadVisible) {
					this.$refs["tml_modal_body"].scrollTop = 0;
				}
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

			onSaveClick() {
				// console.log(this.selectedItems);
				this.output();
				// this.$emit("updated", this.selectedItems);
				this.close();
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
			output() {
				this.$emit("updated", this.selectedItems);
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
			isBtnVisible() {
				// if (
				// 	this.multiple &&
				// 	this.maxLength > 0 &&
				// 	this.selectedItems &&
				// 	this.selectedItems.length >= this.maxLength
				// ) {
				// 	return false;
				// }
				return !this.autoHide;
			},
		},
	});
</script>
<style lang="scss">
	@import "../style.scss";
</style>
