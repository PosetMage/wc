<!-- src/components/slides-component.svelte -->
<svelte:options customElement={{ tag: 'slides-component', shadow: 'open' }} />

<script>
  // Import the custom elements so they're registered
  import './slides-ui.svelte';
  import '../doc_ui/sidebar.svelte';
  import './table-of-slides.svelte';
</script>

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

<div class="wrapper">
  <!-- Sidebar with the table of contents -->
  <sidebar-component>
    <table-of-slides></table-of-slides>
  </sidebar-component>

  <!-- Slides UI in the main area -->
  <div class="main">
    <slides-ui></slides-ui>
  </div>
</div>
