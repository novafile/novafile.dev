<!--
@component
Renders a short string in which `backticks` mark inline code. Content strings
stay plain text in the content files, so no HTML is ever injected.
-->
<script lang="ts">
	let { text }: { text: string } = $props();

	const parts = $derived(text.split(/(`[^`]+`)/g).filter(Boolean));
</script>

{#each parts as part, i (i)}{#if part.startsWith('`')}<code>{part.slice(1, -1)}</code
		>{:else}{part}{/if}{/each}

<style>
	code {
		font-size: 0.92em;
		padding: 0 0.2em;
		border-radius: var(--nv-radius-sm);
		background: var(--nv-color-sunken);
	}
</style>
