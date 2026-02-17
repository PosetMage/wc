<!-- src/doc_ui/mermaid-renderer.svelte -->
<svelte:options customElement={{ tag: 'mermaid-renderer', shadow: 'open' }} />

<script lang="ts">
	import { onMount } from 'svelte';
	import mermaid from 'mermaid';

	onMount(() => {
		mermaid.initialize({ startOnLoad: false, theme: 'dark' });

		// Find all <pre><code class="language-mermaid"> blocks in the host page
		const codeBlocks = Array.from(
			document.querySelectorAll<HTMLElement>('pre > code.language-mermaid')
		);

		const targets: HTMLElement[] = [];

		for (const code of codeBlocks) {
			const pre = code.parentElement;
			if (!pre) continue;

			// Create a replacement <pre class="mermaid"> with the raw diagram text
			const mermaidPre = document.createElement('pre');
			mermaidPre.className = 'mermaid';
			mermaidPre.textContent = code.textContent || '';
			pre.replaceWith(mermaidPre);
			targets.push(mermaidPre);
		}

		if (targets.length > 0) {
			mermaid.run({ nodes: targets });
		}
	});
</script>

<slot />
