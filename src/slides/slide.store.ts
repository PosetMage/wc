// src/components/slide.store.ts
import { writable } from 'svelte/store';

export const currentSlideIndex = writable<number>(0);