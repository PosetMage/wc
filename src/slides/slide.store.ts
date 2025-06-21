// src/components/slide.store.ts
import { writable } from 'svelte/store';

export const currentSlideIndex = writable<number>(0);
export const slideIds: string[] = [];

export function initializeSlides() {
  // 1) Collect all <h2> headings as your “slides”
  const headers = Array.from(document.querySelectorAll<HTMLHeadingElement>('h2'));

  headers.forEach((h, idx) => {
    let id = h.id;
    if (!id) {
      id = `slide-${idx}`;
      h.id = id;
    }
    slideIds.push(id);
  });

  // 2) Hash → index converter
  const setIndexFromHash = () => {
    const hash = window.location.hash.slice(1);
    const idx = slideIds.indexOf(hash);
    currentSlideIndex.set(idx >= 0 ? idx : 0);
  };

  // 3) Run once on startup
  setIndexFromHash();

  // 4) Listen for hash changes
  window.addEventListener('hashchange', setIndexFromHash, false);
}
