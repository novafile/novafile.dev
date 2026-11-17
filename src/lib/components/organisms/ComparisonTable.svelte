<!--
@component
"What changes" between another format and NOVA, each row linked to the spec.
-->
<script lang="ts">
	import RichText from '../atoms/RichText.svelte';

	interface Row {
		topic: string;
		theirs: string;
		nova: string;
		sectionLabel: string;
		sectionHref: string;
	}

	interface Props {
		/** Name of the other format, used as a column header. */
		format: string;
		rows: Row[];
	}

	let { format, rows }: Props = $props();
</script>

<div class="scroll" role="region" aria-label="{format} compared with NOVA" tabindex="-1">
	<table>
		<thead>
			<tr>
				<th scope="col">Topic</th>
				<th scope="col">{format}</th>
				<th scope="col">NOVA</th>
				<th scope="col">Spec</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.topic)}
				<tr>
					<th scope="row">{row.topic}</th>
					<td class="theirs"><RichText text={row.theirs} /></td>
					<td><RichText text={row.nova} /></td>
					<td><a href={row.sectionHref} rel="external">{row.sectionLabel}</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.scroll {
		overflow-x: auto;
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-lg);
	}

	table {
		width: 100%;
		min-width: 38rem;
		border-collapse: collapse;
		font-size: var(--nv-font-size-small);
	}

	th,
	td {
		padding: var(--nv-space-3) 18px;
		text-align: left;
		vertical-align: top;
		border-bottom: 1px solid var(--nv-color-line);
	}

	tbody tr:last-child > * {
		border-bottom: 0;
	}

	thead th {
		background: var(--nv-color-sunken);
		font-weight: var(--nv-font-weight-semibold);
	}

	tbody th {
		font-weight: var(--nv-font-weight-medium);
	}

	.theirs {
		color: var(--nv-color-muted);
	}
</style>
