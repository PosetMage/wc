<!-- src/components/slides-component.svelte -->
<svelte:options customElement={{ tag: 'slides-component', shadow: 'open' }} />

<script>
	import { onMount } from 'svelte';
	import { initializeSlides } from './slide.store';

	// register your other custom elements…
	import './slides-ui.svelte';
	import '../doc_ui/sidebar.svelte';
	import './table-of-slides.svelte';
	import './slides-env.svelte';
  

	onMount(() => {
		initializeSlides();
	});
</script>

<div class="wrapper">

	<slides-env></slides-env>
	<sidebar-component>
		<table-of-slides></table-of-slides>
	</sidebar-component>

	<div class="main">
		<slides-ui></slides-ui>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100%;
	}
	.main {
		position: relative;
		overflow: hidden;
	}
</style>
