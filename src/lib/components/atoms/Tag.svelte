<!--
@component
A short monospace label: a spec section reference, or a "Proposed" marker for
features that are not normative yet.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tone?: 'accent' | 'proposed' | 'neutral';
		children: Snippet;
	}

	let { tone = 'accent', children }: Props = $props();
</script>

<span class="tag {tone}">{@render children()}</span>

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		padding: 2px var(--nv-space-2);
		border-radius: var(--nv-radius-sm);
		font-family: var(--nv-font-mono);
		font-size: var(--nv-font-size-caption);
		font-weight: var(--nv-font-weight-semibold);
		line-height: 1.5;
		white-space: nowrap;
	}

	.accent {
		background: var(--nv-color-accent-soft);
		color: var(--nv-color-accent);
	}

	.proposed {
		background: var(--nv-color-warn-soft);
		color: var(--nv-color-warn);
		text-transform: uppercase;
	}

	.neutral {
		background: var(--nv-color-sunken);
		color: var(--nv-color-muted);
	}
</style>
