<!--
@component
The agent interaction: ask for a projection, get it with a revision, write a patch.
-->
<script lang="ts">
	import StepCard from '../molecules/StepCard.svelte';

	interface Props {
		steps: { title: string; code: string; html?: string }[];
	}

	let { steps }: Props = $props();
</script>

<ol class="loop">
	{#each steps as step, i (step.title)}
		<li><StepCard step={i + 1} {...step} /></li>
	{/each}
</ol>

<style>
	.loop {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
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
