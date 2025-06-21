<!-- src/components/slides-env.svelte -->
<svelte:options customElement={{ tag: 'slides-env', shadow: 'open' }} />

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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

	// Arrow-key navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			currentSlideIndex.update((n) => Math.min(n + 1, totalSlides - 1));
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			currentSlideIndex.update((n) => Math.max(n - 1, 0));
		}
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

		// 4) Listen for hash and keyboard events
		window.addEventListener('hashchange', handleHashChange);
		window.addEventListener('keydown', handleKeydown);

		return () => {
			unsubscribe();
			window.removeEventListener('hashchange', handleHashChange);
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<!--
  This component intentionally renders nothing—
  it simply wires up the slide environment.
-->
