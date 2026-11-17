<!--
@component
Lists the design tokens of one group with their CSS variable, values and a preview.
-->
<script lang="ts">
	import { tokens } from '#lib/tokens/tokens.generated.ts';

	interface Props {
		/** Token group, e.g. `color`, `syntax`, `space`. */
		group: string;
	}

	let { group }: Props = $props();

	const rows = $derived(tokens.filter((t) => t.group === group));
</script>

<table>
	<thead>
		<tr>
			<th scope="col">Preview</th>
			<th scope="col">Token</th>
			<th scope="col">Light</th>
			<th scope="col">Dark</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as token (token.cssVar)}
			<tr>
				<td>
					{#if token.type === 'color'}
						<span class="swatch" style:background="var({token.cssVar})"></span>
					{:else if group === 'space' || group === 'size'}
						<span class="bar" style:width="min(var({token.cssVar}), 16rem)"></span>
					{:else if group === 'radius'}
						<span class="radius" style:border-radius="var({token.cssVar})"></span>
					{:else if group === 'font' || group === 'font-size' || group === 'font-weight'}
						<span
							style:font-family={group === 'font' ? `var(${token.cssVar})` : undefined}
							style:font-size={group === 'font-size' ? `var(${token.cssVar})` : undefined}
							style:font-weight={group === 'font-weight' ? `var(${token.cssVar})` : undefined}
							>NOVA 0.1</span
						>
					{/if}
				</td>
				<td>
					<code>{token.cssVar}</code>
					{#if token.description}<div class="description">{token.description}</div>{/if}
				</td>
				<td><code>{token.value}</code></td>
				<td><code>{token.dark ?? '–'}</code></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--nv-font-size-small);
		color: var(--nv-color-ink);
	}

	th,
	td {
		padding: var(--nv-space-2) var(--nv-space-3);
		border-bottom: 1px solid var(--nv-color-line);
		text-align: left;
		vertical-align: middle;
	}

	th {
		font-weight: var(--nv-font-weight-semibold);
	}

	code {
		font-size: var(--nv-font-size-caption);
	}

	.description {
		color: var(--nv-color-muted);
		font-size: var(--nv-font-size-caption);
	}

	.swatch {
		display: block;
		width: 3rem;
		height: 2rem;
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-sm);
	}

	.bar {
		display: block;
		height: 0.75rem;
		background: var(--nv-color-accent);
		border-radius: 2px;
	}

	.radius {
		display: block;
		width: 3rem;
		height: 2rem;
		border: 2px solid var(--nv-color-accent);
	}
</style>
