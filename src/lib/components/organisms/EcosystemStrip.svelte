<!--
@component
Implementations by language and whether they ship yet.
-->
<script lang="ts">
	import StatusPill from '../atoms/StatusPill.svelte';

	interface Props {
		id: string;
		title: string;
		lead: string;
		entries: { label: string; status: 'available' | 'planned' }[];
	}

	let { id, title, lead, entries }: Props = $props();
</script>

<div class="strip">
	<div class="text">
		<h2 {id}>{title}</h2>
		<p>{lead}</p>
	</div>
	<ul>
		{#each entries as entry (entry.label)}
			<li><StatusPill status={entry.status} label={entry.label} /></li>
		{/each}
	</ul>
</div>

<style>
	.strip {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--nv-space-6) var(--nv-space-12);
	}

	.text {
		flex: 1 1 20rem;
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-1);
	}

	h2 {
		font-size: var(--nv-font-size-h3);
		scroll-margin-top: var(--nv-space-6);
	}

	p {
		color: var(--nv-color-muted);
		font-size: var(--nv-font-size-small);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
