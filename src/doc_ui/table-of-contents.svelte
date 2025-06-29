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

	// Incoming nodes prop; empty array only for the root instance
	export let nodes: TocNode[] = [];

	// Internal storage for the tree built at the root
	let rootNodes: TocNode[] = [];

	// Determine if this is the top-level instance (no nodes passed in)
	const isRoot = nodes.length === 0;

	// Build a nested tree from a flat list of headers
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

	// Only the root instance collects headers and builds the tree
	onMount(() => {
		if (isRoot) {
			const headers = Array.from(
				document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6')
			).map((h) => ({
				id: h.id!,
				text: h.textContent?.trim() || '',
				level: parseInt(h.tagName.slice(1), 10),
				children: [] as TocNode[]
			}));

			rootNodes = buildTree(headers);
		}
	});

	// Decide which set to render: the built tree at root, or passed-in nodes for children
	$: rendered = isRoot ? rootNodes : nodes;
</script>

{#if rendered.length}
	<nav>
		<ul>
			{#each rendered as node (node.id)}
				<li>
					<a href={'#' + node.id}>
						{node.level === 2 ? '◇ ' : ''}{node.text}
					</a>
					{#if node.children.length}
						<!-- recurse with the child nodes, but these won't rebuild the tree -->
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
	* {
		color: white;
		background: rgb(51, 51, 51);
	}
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
		text-decoration: none;
		display: block;
		padding: 0.25rem 0;
		font-size: inherit;
	}
	nav a:hover {
		text-decoration: underline;
		background: rgb(33, 33, 33);
	}
	nav p {
		font-style: italic;
		margin: 0;
	}
</style>
