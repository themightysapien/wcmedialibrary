import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.includes("ts-medialibrary"),
				},
			},
		}),
	],
	build: {
		lib: {
			entry: "./src/main.ce.ts",
			name: "ts-medialibrary",
			// the proper extensions will be added
			fileName: "ts-media-library",
		},
	},
});
