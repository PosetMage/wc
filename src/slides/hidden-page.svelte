<!-- src/components/hidden-page.svelte -->
<svelte:options customElement={{ tag: 'hidden-page', shadow: 'open' }} />

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// Inject a global style to hide all page content
		const styleEl = document.createElement('style');
		styleEl.id = 'hidden-page-global-style';
		styleEl.textContent = `
      /* Hide everything in the body */
      body > * { display: none !important; }
    `;
		document.head.appendChild(styleEl);
	});
</script>

<!-- No visual output: this element itself remains hidden -->
<slot />

<style>
	/* Hide the host element, just in case */
	:host {
		display: none !important;
	}
</style>
