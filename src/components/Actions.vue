<template>
	<div class="tml-item-actions">
		<template v-if="canRemove && deleting">
			<div>
				<p>
					Are you sure you want to permanently delete
					<strong>{{ media.file_name }}</strong
					>?
				</p>
				<div class="tml-item-actions-primary">
					<button
						type="button"
						class="btn-danger"
						@click.prevent="onRemoveConfirm"
						:disabled="isLoading"
					>
						{{ isLoading ? "Deleting..." : "Confirm" }}
					</button>
					<button
						type="button"
						style="margin-right: 0.5rem"
						class="btn-secondary"
						@click.prevent="toggleDeleting"
					>
						Cancel
					</button>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="tml-item-actions-primary">
				<button
					class="btn btn-primary"
					type="button"
					title="View"
				>
					<a
						:href="media.url"
						target="_blank"
					>
						View
					</a>
				</button>
				<button
				v-if="canRemove"
					title="Delete Media"
					type="button"
					style="margin-right: 0.5rem"
					class="btn-secondary"
					@click.prevent="toggleDeleting"
				>
					Delete
				</button>
			</div>
		</template>
	</div>
</template>
<script>
	import useMediaStore from "../composables/media.store";
	import useLoader from "../composables/useLoader";
	export default {
		setup() {
			const { loading, isLoading } = useLoader();
			const { remove } = useMediaStore();

            return {loading, isLoading, remove};
		},
		props: {
			media: { default: null },
			canRemove: { default: 0, type: [Boolean, String, Number] },

		},
		emits: ['deleted'],
		data() {
			return {
				deleting: false,
			};
		},
		methods: {
			toggleDeleting() {
				this.deleting = !this.deleting;
			},

			onRemoveConfirm() {
				this.loading(true);
				// let $this = this;
			
				// this.$emit('deleted');
				this.remove(this.media.id).then(
					(resp) => {
						// debugger;
						this.loading(false);
						this.reset();
						// console.log('emited');
						this.$parent.$emit('removed');
						// this.$emit('deleted');

					},
					(er) => {
						// console.log(er);
						this.loading(false);
					}
				);
			},
			reset(){
				this.deleting = false;
			}
		},
		watch: {
			media(val) {
				this.reset();
			},
		},
	};
</script>
<style></style>
