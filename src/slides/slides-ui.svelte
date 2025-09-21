<svelte:options customElement={{ tag: 'slides-ui', shadow: 'open' }} />

<script lang="ts">
	import { currentSlideIndex, totalSlides, nextSlide, prevSlide } from './slide.store';

	// Arrow-key handler
	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			nextSlide();
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			prevSlide();
		}
	}
</script>

<!-- Listen at window level for arrow-keys -->
<svelte:window on:keydown={onKeydown} />

<button
	class="nav-button prev-button"
	on:click={prevSlide}
	disabled={$currentSlideIndex === 0}
	title="Previous slide (← key)"
>
	←
</button>

<button
	class="nav-button next-button"
	on:click={nextSlide}
	disabled={$currentSlideIndex >= $totalSlides - 1}
	title="Next slide (→ key)"
>
	→
</button>

<style>
	* {
		color: white;
		background: rgb(51, 51, 51);
	}
	.nav-button {
		position: fixed;
		bottom: 5px;
		font-size: 1em;
		padding: 0.25em;
		border-radius: 4px;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 30;
		transition: all 0.2s ease;
	}

	.nav-button:hover:not(:disabled) {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.nav-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.prev-button {
		left: 10px;
	}

	.next-button {
		right: 10px;
	}
</style>
