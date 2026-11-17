<!--
@component
A full-width band with centered content. Alternate `ground` and `surface` to separate sections.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tone?: 'ground' | 'surface';
		/** Id of the heading that names this section. */
		labelledby?: string;
		divider?: boolean;
		padding?: 'normal' | 'compact';
		children: Snippet;
	}

	let {
		tone = 'ground',
		labelledby,
		divider = true,
		padding = 'normal',
		children
	}: Props = $props();
</script>

<section class="section {tone} {padding}" class:divider aria-labelledby={labelledby}>
	<div class="inner">{@render children()}</div>
</section>

<style>
	.ground {
		background: var(--nv-color-ground);
	}

	.surface {
		background: var(--nv-color-surface);
	}

	.divider {
		border-top: 1px solid var(--nv-color-line);
	}

	.inner {
		max-width: var(--nv-size-content);
		margin: 0 auto;
		padding: var(--nv-space-16) var(--nv-space-6);
	}

	.compact .inner {
		padding-block: var(--nv-space-12);
	}

	@media (max-width: 40rem) {
		.inner {
			padding: var(--nv-space-12) var(--nv-space-4);
		}
	}
</style>
