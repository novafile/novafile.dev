import { createRawSnippet } from 'svelte';

/** A text-only snippet for passing `children` to components in stories. */
export const text = (value: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${value.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`
	}));
