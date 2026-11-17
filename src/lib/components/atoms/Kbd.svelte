<!--
@component
A keyboard key.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<kbd>{@render children()}</kbd>

<style>
	kbd {
		display: inline-block;
		min-width: 1.5em;
		padding: 0 6px;
		border: 1px solid var(--nv-color-line);
		border-bottom-width: 2px;
		border-radius: var(--nv-radius-sm);
		background: var(--nv-color-surface);
		font-size: var(--nv-font-size-caption);
		line-height: 1.6;
		text-align: center;
	}
</style>
