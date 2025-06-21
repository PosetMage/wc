<!-- src/components/slides-env.svelte -->
<svelte:options customElement={{ tag: 'slides-env', shadow: 'open' }} />

<script lang="ts">
	import { onMount } from 'svelte';
	import { currentSlideIndex, slideIds, initializeSlides } from './slide.store';

	let slideElements: HTMLElement[] = [];
	let totalSlides = 0;

	// Utility: replace just the hash without reloading
	function updateURL(id: string) {
		const newHash = `#${id}`;
		window.history.replaceState(
			null,
			'',
			`${window.location.pathname}${window.location.search}${newHash}`
		);
	}

	// Show only the active slide
	function showSlide(idx: number) {
		slideElements.forEach((el, i) => {
			if (i === idx) {
				el.style.display = 'block';
				el.classList.add('active');
			} else {
				el.style.display = 'none';
				el.classList.remove('active');
			}
		});
	}

	// Respond to external hash changes
	function handleHashChange() {
		const hash = window.location.hash.slice(1);
		const idx = slideIds.indexOf(hash);
		currentSlideIndex.set(idx >= 0 ? idx : 0);
	}

	onMount(() => {
		// 1) Grab all slides in the document
		slideElements = Array.from(document.querySelectorAll<HTMLElement>('.slide'));
		totalSlides = slideElements.length;

		// 2) Let the store assign IDs and set the initial index
		initializeSlides();

		// 3) Whenever the index changes, show/hide and sync URL+scroll
		const unsubscribe = currentSlideIndex.subscribe((idx) => {
			showSlide(idx);
			if (slideIds[idx]) updateURL(slideIds[idx]);
			window.scrollTo(0, 0);
		});

		// 4) Listen for hash changes
		window.addEventListener('hashchange', handleHashChange);

		return () => {
			unsubscribe();
			window.removeEventListener('hashchange', handleHashChange);
		};
	});
</script>

<!--
  This component intentionally renders nothing—
  it simply wires up the slide environment.
-->
