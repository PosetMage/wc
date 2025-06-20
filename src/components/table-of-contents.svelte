<!-- src/components/table-of-contents.svelte -->
<svelte:options customElement={{ tag: 'table-of-contents', shadow: 'open' }} />

<script lang="ts">
	import { onMount } from 'svelte';

	interface TocNode {
		id: string;
		text: string;
		level: number;
		children: TocNode[];
	}

	// `nodes` holds the current level's TOC entries; defaults empty until onMount
	export let nodes: TocNode[] = [];

	function buildTree(items: TocNode[]): TocNode[] {
		const root: TocNode[] = [];
		const stack: TocNode[] = [];

		for (const item of items) {
			while (stack.length && stack[stack.length - 1].level >= item.level) {
				stack.pop();
			}
			if (!stack.length) {
				root.push(item);
			} else {
				stack[stack.length - 1].children.push(item);
			}
			stack.push(item);
		}

		return root;
	}

	onMount(() => {
		const headers = Array.from(
			document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6')
		).map((h) => ({
			id: h.id!,
			text: h.textContent?.trim() || '',
			level: parseInt(h.tagName.slice(1), 10),
			children: [] as TocNode[]
		}));

		// initialize `nodes` for the top-level render
		nodes = buildTree(headers);
	});
</script>

{#if nodes.length}
	<nav>
		<ul>
			{#each nodes as node (node.id)}
				<li>
					<a href={'#' + node.id}>
						{node.level === 2 ? '◇ ' : ''}{node.text}
					</a>
					{#if node.children.length}
						<!-- recursive rendering via svelte:self -->
						<svelte:self nodes={node.children} />
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{:else}
	<nav>
		<p>No headings found.</p>
	</nav>
{/if}

<style>
	:host {
		display: block;
		font-family: system-ui, sans-serif;
		font-size: 0.875rem;
		line-height: 1.375;
	}
	nav ul {
		padding-left: 1rem;
		list-style: none;
		margin: 0;
	}
	nav li {
		margin: 0.25rem 0;
	}
	nav a {
		color: #2563eb;
		text-decoration: none;
		display: block;
		padding: 0.25rem 0;
		font-size: inherit;
	}
	nav a:hover {
		text-decoration: underline;
		background-color: #ebf8ff;
	}
	nav p {
		color: #6b7280;
		font-style: italic;
		margin: 0;
	}
</style>
