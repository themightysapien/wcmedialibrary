<template>
	<div>
		<input
			type="file"
			ref="auto_file_input"
			style="display: none"
			@change="fileChanged"
			:multiple="multiple"
		/>

		<span
			:class="inputContainerClass"
			@click="$refs['auto_file_input'].click()"
		>
			<slot v-if="(fileList && fileList.length == 0) || isBtnVisible">
				<button
					type="button"
					class="btn btn-primary"
				>
					Upload
				</button>
			</slot>
		</span>

		<Progress
			
			:value="progressBar.completed"
		/>
		<!-- <ProgressBar v-if="showProgress && progressBar.visible" :value="progressBar.completed">
      <strong>{{ progressBar.completed }}</strong>
    </ProgressBar> -->

		<!-- <template v-if="preview && fileList.length">
      <span v-for="(file, $index) in fileList" :key="'file_url_' + file.id + '_' + $index"
        class="preview flex items-center">
        <slot name="preview" v-if="preview" v-bind:file="file">
          <img :src="file.thumb_url" class="rounded-circle" alt="..." @click.prevent="$emit('imageClicked', file)"
            :style="{ width: previewSize, height: previewSize }" />
        </slot>
        <span @click.prevent="removeItem(file, $index)">
          <slot name="remove">
            <a class="preview_remove">
              <span class="badge badge-pill">X</span>
            </a>
          </slot>
        </span>
      </span>
    </template> -->
	</div>
</template>

<script>
	import useMediaStore from "../composables/media.store";
	import Progress from "./Progress.vue";
	// import ProgressBar from "primevue/progressbar";
	// import * as mediaAPI from "@app/services/mediaAPI";
	// import { buildFormData } from "@app/helpers";
	export default {
		components: { Progress },
		setup() {
			const { store } = useMediaStore();

			return { store };
		},
		props: {
			autoHide: { default: false },
			multiple: { default: 0 },
			preview: { default: true },
			allowFiles: { default: 0 },
			inputContainerClass: { default: "" },
			previewContainerClass: { default: "" },
			resetFilesOnUpload: { default: true },
			showProgress: { default: true },
			name: { default: "files[]" },
			params: {
				default: function () {
					return {};
				},
			},
			files: {
				default: function () {
					return [];
				},
			},
			maxLength: { default: 0 },
		},
		emits: ["changed"],
		data() {
			return {
				//   name: "files[]",
				data: null,
				fileList: [],
				progressBar: {
					visible: false,
					total: 100,
					completed: 0,
					completed_byte: 0,
				},
			};
		},
		methods: {
			fileChanged($event) {
				let formData = new FormData();
				//   console.log(this.$refs["auto_file_input"].files);
				if (this.multiple) {
					Array.from(Array(this.$refs["auto_file_input"].files.length).keys()).map(
						(x) => {
							formData.append(
								this.name,
								this.$refs["auto_file_input"].files[x],
								this.$refs["auto_file_input"].files[x].name
							);
						}
					);
				} else {
					formData.append(
						this.name,
						this.$refs["auto_file_input"].files[0],
						this.$refs["auto_file_input"].files[0].name
					);
				}
				formData.append("allowFiles", this.allowFiles);

				this.upload(formData);
			},
			upload(data) {
				// data = buildFormData(data, this.params);
				this.progressBar.visible = true;
				this.store(data, {
					onUploadProgress: (progressEvent) => {
						var percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						this.progressBar.completed = percentCompleted;
						// console.log(progressEvent.loaded, this.progressBar.completed);
					},
				})
					.then((resp) => {
						if (!resp["success"]) {
							return;
						}
						if (this.multiple) {
							this.fileList = this.fileList.concat(resp.items);
						} else {
							this.fileList = resp.items;
						}
						this.progressBar.visible = false;
						this.output();
						this.reset();
					})
					.catch((e) => {
						this.progressBar.visible = false;
					});
			},
			output() {
				// console.log(this.getFileData());
				this.$emit("changed", this.getFileData());
			},
			reset() {
				this.$refs["auto_file_input"].value = null;
				if (this.resetFilesOnUpload) {
					this.fileList = [];
				}
			},
			// removeItem(file, index) {
			//   // console.log(index);
			//   if (this.removeConfirm && !confirm(this.removeConfirmText)) {
			//     return;
			//   }
			//   mediaAPI.remove(file.id).then((resp) => {
			//     this.fileList.splice(index, 1);
			//     this.output();
			//   });
			// },
			clear() {
				this.reset();
				this.fileList = [];
			},
			getFileData() {
				return this.fileList;
			},
		},
		mounted() {},
		computed: {
			isBtnVisible() {
				if (
					this.multiple &&
					this.maxLength > 0 &&
					this.fileList.length >= this.maxLength
				) {
					return false;
				}
				return !this.autoHide;
			},
		},
	};
</script>

<style lang="scss"></style>
