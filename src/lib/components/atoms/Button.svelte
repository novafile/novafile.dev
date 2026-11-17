<!--
@component
A call to action. Renders a link when `href` is set, otherwise a button.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost';
		href?: string;
		type?: HTMLButtonAttributes['type'];
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let { variant = 'primary', href, type = 'button', onclick, children }: Props = $props();
</script>

{#if href}
	<a class="button {variant}" {href}>{@render children()}</a>
{:else}
	<button class="button {variant}" {type} {onclick}>{@render children()}</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--nv-space-2);
		min-height: var(--nv-size-control);
		padding: 0 var(--nv-space-5);
		border-radius: var(--nv-radius-md);
		border: 1px solid transparent;
		font: inherit;
		font-size: var(--nv-font-size-body);
		font-weight: var(--nv-font-weight-semibold);
		line-height: 1;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 120ms ease,
			border-color 120ms ease;
	}

	.button:hover {
		text-decoration: none;
	}

	.primary {
		background: var(--nv-color-accent);
		color: var(--nv-color-on-accent);
	}

	.primary:hover {
		background: color-mix(in srgb, var(--nv-color-accent) 88%, var(--nv-color-ink));
	}

	.secondary {
		background: var(--nv-color-surface);
		border-color: var(--nv-color-line);
		color: var(--nv-color-ink);
	}

	.secondary:hover {
		border-color: var(--nv-color-muted);
	}

	.ghost {
		background: transparent;
		color: var(--nv-color-ink);
	}

	.ghost:hover {
		background: var(--nv-color-sunken);
	}
</style>
