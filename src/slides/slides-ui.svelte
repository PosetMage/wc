<!-- src/components/slides-ui.svelte -->
<svelte:options customElement={{ tag: 'slides-ui', shadow: 'open' }} />

<script>
  import { currentSlideIndex } from './slide.store';

</script>

<style>
  .nav-button {
    position: fixed;
    bottom: 10px;
    font-size: 2em;
    padding: 0.5em;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 100;
    transition: all 0.2s ease;
  }

  .nav-button:hover:not(:disabled) {
    background: #f0f0f0;
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

<!-- Previous slide button -->
<button
  class="nav-button prev-button"
  on:click={() => { $currentSlideIndex = $currentSlideIndex - 1 }}
  title="Previous slide (← key)"
>
  ←
</button>

<!-- Next slide button -->
<button
  class="nav-button next-button"
  on:click={() => { $currentSlideIndex = $currentSlideIndex + 1 }}
  title="Next slide (→ key)"
>
  →
</button>
