// src/components/slide.store.ts

import { writable, get } from 'svelte/store';

export const currentSlideIndex = writable<number>(0);
export const slideIds: string[] = [];
export const totalSlides = writable<number>(0);

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

/** Jump to the given slide index (clamped) by setting the hash */
export function goToSlide(idx: number) {
	const clamped = Math.max(0, Math.min(idx, slideIds.length - 1));
	window.location.hash = slideIds[clamped];
}

/** Advance one slide */
export function nextSlide() {
	const current = get(currentSlideIndex);
	const total = get(totalSlides);
	if (current < total - 1) {
		goToSlide(current + 1);
	}
}

/** Go back one slide */
export function prevSlide() {
	const current = get(currentSlideIndex);
	if (current > 0) {
		goToSlide(current - 1);
	}
}
