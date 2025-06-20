<!-- src/components/heading-id-injector.svelte -->
<svelte:options customElement={{ tag: 'heading-id-injector', shadow: 'open' }} />

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const headers = Array.from(
			document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6')
		);
		headers.forEach((h, i) => {
			if (!h.id) {
				h.id = `heading-${i + 1}`;
			}
		});
	});
</script>

<!-- nothing visual, just pass through any children you wrap -->
<slot />
