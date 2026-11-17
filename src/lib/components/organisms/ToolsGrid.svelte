<!--
@component
Tools and editor support that exist today.
-->
<script lang="ts">
	import ToolCard from '../molecules/ToolCard.svelte';

	interface Props {
		tools: { name: string; description: string; detail?: string; href?: string }[];
	}

	let { tools }: Props = $props();
</script>

<ul class="grid">
	{#each tools as tool (tool.name)}
		<li><ToolCard {...tool} /></li>
	{/each}
</ul>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		gap: var(--nv-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
	}

	li > :global(*) {
		flex: 1;
	}
</style>
