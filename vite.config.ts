// vite.config.ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

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
			name: 'pomwc',
			entry: 'src/main.ts',
			formats: ['es'],
			fileName: (format) => `pomwc.${format}.js`
		}
	},

}));
