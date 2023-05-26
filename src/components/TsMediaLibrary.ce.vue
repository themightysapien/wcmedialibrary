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
				class="tml-content"
				@click="onContentClick"
			>
				<span
					class="tml-modal-close"
					@click="onClose"
				></span>
				<article class="">
					<Uploader />
				</article>
			</div>
		</section>
		<span @click="open">
			<slot> {{ label }} </slot>
		</span>
	</div>
</template>
<script>
	import Uploader from "./Uploader.vue";

	export default {
		components: { Uploader },
		props: {
			blocking: { default: false },
			label: { default: "Upload" },
		},
		data() {
			return {
				opened: false,
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
<style scoped>
	* {
		box-sizing: border-box;
	}
	:host {
		--tml-close-icon-template-color: var(--tml-modal-close-icon-color, #888);
	}
	section {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100vw;
		display: none;
		transition: opacity var(--tml-modal-animation-duration, 0.3s) ease-in;
		-webkit-transition: opacity var(--tml-modal-animation-duration, 0.3s) ease-in;
		align-items: center;
		justify-content: center;
		z-index: var(--tml-modal-z-index, 100);
		background-color: var(--tml-modal-background-color, rgba(30, 30, 30, 0.8));
	}
	.tml-content {
		display: block;
		position: relative;
		z-index: var(--tml-modal-content-z-index, 101);
		width: var(--tml-modal-width, 280px);
		min-width: var(--tml-modal-min-width, 250px);
		max-width: var(--tml-modal-max-width, 100vw);
		height: var(--tml-modal-height, auto);
		min-height: var(--tml-modal-min-height, auto);
		max-height: var(--tml-modal-max-height, 100vh);
		background-color: var(--tml-modal-content-background-color, #fff);
		box-shadow: var(--tml-modal-content-shadow-displacement, 6px)
			var(--tml-modal-content-shadow-displacement, 6px)
			var(--tml-modal-content-shadow-blur, 16px)
			var(--tml-modal-content-shadow-color, #000);
		border-radius: var(--tml-modal-border-radius, 15px);
		padding: var(--tml-modal-content-padding, 1em) 0
			var(--tml-modal-content-padding, 1em) var(--tml-modal-content-padding, 1em);
	}
	article {
		overflow: auto;
		max-height: 100%;
		height: 100%;
		padding-right: var(--tml-modal-content-padding, 1em);
	}
	.transparent {
		opacity: 0;
	}
	.opaque {
		opacity: 1;
		display: flex !important;
	}
	.opened {
		display: flex !important;
	}
	.tml-modal-close {
		position: absolute;
		display: inline-block;
		top: var(--tml-modal-close-icon-top, 5px);
		right: var(--tml-modal-close-icon-right, 18px);
		z-index: var(--tml-modal-close-icon-z-index, 1002);
		width: var(--tml-modal-close-icon-size, 24px);
		height: var(--tml-modal-close-icon-size, 24px);
		cursor: var(--tml-modal-close-icon-cursor, pointer);
	}
	.contentIconSeparation {
		padding-top: var(--tml-modal-extra-top-separation-when-icon, 10px);
	}
</style>
