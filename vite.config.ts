// vite.config.ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import devtoolsJson from 'vite-plugin-devtools-json';
import { resolve } from 'path';

export default defineConfig(() => ({
	plugins: [
		svelte({
			compilerOptions: {
				customElement: true
			}
		}),
		devtoolsJson()
	],
	build: {
		lib: {
			// map each entry to its desired bundle name
			entry: {
				algo: resolve(__dirname, 'src/algo/main.ts'),
				documents: resolve(__dirname, 'src/documents/main.ts'),
				wc: resolve(__dirname, 'src/wc/main.ts')
			},
			formats: ['es'],
			// use the entry key when naming the output file
			fileName: (format, entryName) => `${entryName}.${format}.js`
		}
	}
}));
