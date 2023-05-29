<template>
	<div class="tml-uploader-container" :class="{active: visible}">
		<div
			id="tml-file-upload-form"
			class="uploader"
		>
			<input
				type="file"
				id="tml-uploader-file-input"
				ref="auto_file_input"
				style="display: none"
				@change="fileChanged"
				:multiple="multiple"
				:accept="inputAccept"
			/>
			<!-- <input id="file-upload" type="file" name="fileUpload" accept="image/*" /> -->

			<label
				for="tml-uploader-file-input"
				id="tml-uploader-file-drag"
				:class="inputContainerClass"
				@dragover="onDragOver"
				@dragleave="onDragOver"
				@drop="onDrop"
				ref="dragbox"
			>
				<div>
					<svg
						width="40px"
						height="40px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z"
							fill="#000000"
						/>
					</svg>
					<p>Select a file or drag here</p>

					<button
						id="file-upload-btn"
						class="btn-primary"
						@click="$refs['auto_file_input'].click()"
					>
						Select a file
					</button>
				</div>
			</label>
		</div>

		<div
			class="tml-uploader-progress-container"
			v-if="showProgress && progressBar.visible"
		>
			<div>
				<Progress :value="progressBar.completed" />
				<p style="margin: 0">Uploading {{ $refs["auto_file_input"].files.length }} files</p>
			</div>
		</div>
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
	import { inject } from "vue";
	// import ProgressBar from "primevue/progressbar";
	// import * as mediaAPI from "@app/services/mediaAPI";
	// import { buildFormData } from "@app/helpers";
	export default {
		components: { Progress },
		setup() {
			const uid = inject("uid");
			const { store } = useMediaStore(uid);

			return { store };
		},
		inject: ["uid"],
		props: {
			visible: {default: false},
			autoHide: { default: false },
			multiple: { default: 0 },
			preview: { default: true },
			allowFiles: { default: 0 },
			accept: { default: '' },
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
		emits: ["changed", 'update:visible'],
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
						// console.log(resp);
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
				this.$emit("update:visible", false);
			},
			reset() {
				this.$refs["auto_file_input"].value = '';
				
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
			onDragOver(e) {
				
				e.stopPropagation();
				e.preventDefault();

				this.$refs['dragbox'].className =
					e.type === "dragover" ? "hover" : "";
			},
			onDrop(e){
				var files = e.target.files || e.dataTransfer.files;

    			// Cancel event and hover styling
    			this.onDragOver(e);

				this.$refs["auto_file_input"].files = files;
				this.$refs["auto_file_input"].dispatchEvent(new Event('change'));
			}
		},
		mounted() {},
		computed: {
			
			inputAccept(){
				if(this.allowFiles){
					return this.accept;
				}

				return 'image/*';
			}
		},
	};
</script>

<style lang="scss"></style>
