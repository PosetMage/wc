<!-- src/components/table-of-slides.svelte -->
<svelte:options customElement={{ tag: 'table-of-slides', shadow: 'open' }} />

<script lang="ts">
  import { onMount } from 'svelte';

  interface TocItem {
    id: string;
    text: string;
  }

  let items: TocItem[] = [];

  onMount(() => {
    // Collect all <h2> headings
    const headers = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('h2')
    );

    items = headers.map((h, index) => {
      // Ensure each header has an ID
      let id = h.id;
      if (!id) {
        id = `slide-${index}`;
        h.id = id;
      }
      return { id, text: h.textContent?.trim() ?? '' };
    });
  });

  // Update the URL hash without scrolling
  function updateUrl(id: string) {
    const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, '', newUrl);
  }
</script>

<nav>
  <ul>
    {#each items as item}
      <li>
        <a href={'#' + item.id} on:click|preventDefault={() => updateUrl(item.id)}>
          {item.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  :host {
    display: block;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  nav li {
    margin: 0.25rem 0;
  }
  nav a {
    color: #0366d6;
    text-decoration: none;
    display: block;
    padding: 0.25rem 0;
  }
  nav a:hover {
    text-decoration: underline;
    background-color: #ebf8ff;
  }
</style>
