<!-- src/components/slides-component.svelte -->
<svelte:options customElement={{ tag: 'slides-component', shadow: 'open' }} />

<script>
  // Import the custom element class so it's registered
  import './slides-ui.svelte';

  // If you have other *internal* Svelte components (not custom elements)
  // that you want to render, import them normally:
  import Sidebar from '../doc_ui/sidebar.svelte';
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
  }
  .main {
    position: relative;
    overflow: hidden;
  }
</style>

<div class="wrapper">
  <!-- top bar, menu, whatever -->
  <Sidebar />

  <!-- slides-ui lives in the middle -->
  <div class="main">
    <slides-ui></slides-ui>
  </div>


</div>
