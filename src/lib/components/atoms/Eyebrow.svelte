<!--
@component
A small monospace line above a heading.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tone?: 'muted' | 'accent';
		children: Snippet;
	}

	let { tone = 'muted', children }: Props = $props();
</script>

<p class="eyebrow {tone}">{@render children()}</p>

<style>
	.eyebrow {
		margin: 0;
		font-family: var(--nv-font-mono);
		font-size: var(--nv-font-size-caption);
		letter-spacing: 0.02em;
	}

	.muted {
		color: var(--nv-color-muted);
	}

	.accent {
		color: var(--nv-color-accent);
		font-weight: var(--nv-font-weight-medium);
	}
</style>
