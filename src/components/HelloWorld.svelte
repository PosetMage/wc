<!-- src/components/HelloWorld.svelte-->
<svelte:options customElement="hello-world" />

<script lang="ts">
	// Define a prop (note: use lowercase for prop names to map to HTML attributes)
	export let name: string = 'world';
</script>

<h1 class="greeting">Hello {name}!</h1>
<slot />

<!-- allows projecting child content into this component -->

<style>
	/* Component styles are scoped to its shadow DOM by default */
	.greeting {
		font-weight: bold;
		color: royalblue;
	}
</style>
