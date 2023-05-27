<template>
	<div>
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
						class="tml-modal-upload-btn"
						type="button"
					>
						Upload
					</button>
				</div>
				<div class="tml-modal-body">
					<Uploader />

					<div class="tml-gallery-preview-container rounded">
						<div>
							<Filter />
							<Gallery />
						</div>
						<div class="tml-preview-container">
							<Information />
						</div>
					</div>
				</div>
				<div class="tml-modal-footer"></div>
			</div>
		</section>
		<span @click="open">
			<slot> {{ label }} </slot>
		</span>
	</div>
</template>
<script>
	import Filter from "./Filter.vue";
	import Gallery from "./Gallery.vue";
	import Information from "./Information.vue";
	import Uploader from "./Uploader.vue";

	export default {
		components: { Uploader, Gallery, Filter, Information },
		props: {
			blocking: { default: false },
			label: { default: "Upload" },
		},
		data() {
			return {
				opened: true,
				_toChange: false,
			};
		},
		methods: {
			open() {
				this.opened = true;
				this._toChange = true;
				setTimeout(() => {
					this._toChange = false;
				}, 50);
			},
			_onModalBackgroundClick(e) {
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
	};
</script>
<style lang="scss">
	@import "../style.scss";
</style>
