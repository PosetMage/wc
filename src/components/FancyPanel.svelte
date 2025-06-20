<!-- src/components/FancyPanel.svelte-->
<svelte:options customElement="fancy-panel" />

<script lang="ts">
	export let title: string = 'Note';
	export let color: string = 'gold';
</script>

<div class="panel" style="--bg: {color}">
	<h3>{title}</h3>
	<div class="content"><slot /></div>
</div>

<style>
	.panel {
		padding: 1rem;
		border: 2px solid black;
		background: var(--bg, gold); /* default background if not overridden */
	}
	.panel h3 {
		margin: 0 0 0.5rem 0;
	}
</style>
