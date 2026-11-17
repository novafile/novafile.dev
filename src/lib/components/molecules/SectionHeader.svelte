<!--
@component
Eyebrow, heading and lead paragraph at the top of a page section.
-->
<script lang="ts">
	import Eyebrow from '../atoms/Eyebrow.svelte';

	interface Props {
		id: string;
		title: string;
		eyebrow?: string;
		lead?: string;
		level?: 2 | 3;
	}

	let { id, title, eyebrow, lead, level = 2 }: Props = $props();
</script>

<header class="section-header">
	{#if eyebrow}<Eyebrow tone="accent">{eyebrow}</Eyebrow>{/if}
	<svelte:element this={`h${level}`} {id}>{title}</svelte:element>
	{#if lead}<p class="lead">{lead}</p>{/if}
</header>

<style>
	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-2);
		margin-bottom: var(--nv-space-8);
		max-width: var(--nv-size-prose);
	}

	h2 {
		font-size: var(--nv-font-size-h2);
		scroll-margin-top: var(--nv-space-6);
	}

	h3 {
		font-size: var(--nv-font-size-h3);
	}

	.lead {
		color: var(--nv-color-muted);
	}
</style>
