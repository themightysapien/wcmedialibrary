/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
