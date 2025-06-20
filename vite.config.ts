// vite.config.ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { resolve } from 'path';

export default defineConfig(() => ({
	plugins: [
		svelte({
			compilerOptions: {
				customElement: true
			}
		}),
		tailwindcss(),
		devtoolsJson()
	],
	build: {
		lib: {
			// map each entry to its desired bundle name
			entry: {
				pomwc: resolve(__dirname, 'src/main.ts'),
				aaaa: resolve(__dirname, 'src/aaaa.ts')
			},
			formats: ['es'],
			// use the entry key when naming the output file
			fileName: (format, entryName) => `${entryName}.${format}.js`
		}
	}
}));
