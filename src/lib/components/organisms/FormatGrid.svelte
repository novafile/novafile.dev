<!--
@component
The "Coming from another format?" grid.
-->
<script lang="ts">
	import FormatCard from '../molecules/FormatCard.svelte';

	interface Props {
		formats: { name: string; summary: string; href?: string }[];
	}

	let { formats }: Props = $props();
</script>

<ul class="grid">
	{#each formats as format (format.name)}
		<li><FormatCard {...format} featured={!!format.href} /></li>
	{/each}
</ul>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: var(--nv-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
