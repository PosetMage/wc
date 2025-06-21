<!-- src/components/table-of-slides.svelte -->
<svelte:options customElement={{ tag: 'table-of-slides', shadow: 'open' }} />

<script lang="ts">
  import { onMount } from 'svelte';

  interface TocItem { id: string; text: string; }
  let items: TocItem[] = [];

  onMount(() => {
    const headers = Array.from(document.querySelectorAll<HTMLHeadingElement>('h2'));
    items = headers.map((h, i) => {
      let id = h.id;
      if (!id) {
        id = `slide-${i}`;
        h.id = id;
      }
      return { id, text: h.textContent?.trim() ?? '' };
    });
  });

  function updateUrl(id: string) {
    // trigger hashchange
    window.location.hash = id;
  }
</script>

<nav>
  <ul>
    {#each items as item}
      <li>
        <a href={'#' + item.id}
           on:click|preventDefault={() => updateUrl(item.id)}
        >
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

