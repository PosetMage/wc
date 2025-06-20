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

	let htmlString = '';

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

	function renderTree(nodes: TocNode[]): string {
		let out = '<ul class="pl-4 list-none">';
		for (const n of nodes) {
			const prefix = n.level === 2 ? '◇ ' : '';
			out += `<li class="my-1">
        <a href="#${n.id}" class="text-blue-600 no-underline text-sm block py-1 hover:underline hover:bg-blue-100">
          ${prefix}${n.text}
        </a>`;
			if (n.children.length) out += renderTree(n.children);
			out += '</li>';
		}
		out += '</ul>';
		return out;
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

		const tree = buildTree(headers);
		htmlString = tree.length ? renderTree(tree) : '';
	});
</script>

{#if htmlString}
	<nav class="block font-sans text-sm leading-snug">
		{htmlString}
	</nav>
{:else}
	<p class="text-gray-500 italic">No headings found.</p>
{/if}
