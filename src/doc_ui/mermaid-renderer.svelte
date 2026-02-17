<!-- src/doc_ui/mermaid-renderer.svelte -->
<svelte:options customElement={{ tag: 'mermaid-renderer', shadow: 'open' }} />

<script lang="ts">
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';

	let svgContent = $state('');
	let anchor: HTMLDivElement;

	onMount(() => {
		mermaid.initialize({ startOnLoad: false, theme: 'dark' });

		const host = (anchor.getRootNode() as ShadowRoot).host as HTMLElement;
		const definition = host.textContent?.trim() || '';

		if (definition) {
			const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
			mermaid.render(id, definition).then(({ svg }) => {
				svgContent = svg;
			});
		}
	});
</script>

<div bind:this={anchor}>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted mermaid.render() output -->
	{@html svgContent}
</div>
