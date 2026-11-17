<!--
@component
One value shown in each NOVA representation, as keyboard-accessible tabs.
-->
<script lang="ts">
	interface Item {
		id: string;
		label: string;
		caption: string;
		sectionLabel: string;
		sectionHref: string;
		command?: string;
		code: string;
		html?: string;
	}

	interface Props {
		items: Item[];
		/** Id of the tab shown first. */
		initial?: string;
	}

	let { items, initial }: Props = $props();

	let chosen = $state<string>();
	const selected = $derived(chosen ?? initial ?? items[0]?.id);
	const active = $derived(items.find((i) => i.id === selected) ?? items[0]);
	const tabs: HTMLButtonElement[] = $state([]);

	function onkeydown(event: KeyboardEvent, index: number) {
		const keys: Record<string, number> = {
			ArrowRight: index + 1,
			ArrowLeft: index - 1,
			Home: 0,
			End: items.length - 1
		};
		if (!(event.key in keys)) return;
		event.preventDefault();
		const next = (keys[event.key] + items.length) % items.length;
		chosen = items[next].id;
		tabs[next]?.focus();
	}
</script>

<div class="switcher">
	<div class="tabs" role="tablist" aria-label="Representations">
		{#each items as item, i (item.id)}
			<button
				bind:this={tabs[i]}
				type="button"
				role="tab"
				id="tab-{item.id}"
				aria-selected={item.id === selected}
				aria-controls="panel-{item.id}"
				tabindex={item.id === selected ? 0 : -1}
				onclick={() => (chosen = item.id)}
				onkeydown={(e) => onkeydown(e, i)}>{item.label}</button
			>
		{/each}
	</div>
	{#each items as item (item.id)}
		<div
			class="panel"
			role="tabpanel"
			id="panel-{item.id}"
			aria-labelledby="tab-{item.id}"
			hidden={item.id !== active.id}
		>
			{#if item.command}
				<pre class="command"><code><span aria-hidden="true">$ </span>{item.command}</code></pre>
			{/if}
			{#if item.html}{@html item.html}{:else}<pre><code>{item.code}</code></pre>{/if}
		</div>
	{/each}
	<p class="caption">
		{active.caption} <a href={active.sectionHref} rel="external">{active.sectionLabel}</a>
	</p>
</div>

<style>
	.switcher {
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-xl);
		background: var(--nv-color-surface);
		overflow: hidden;
		min-width: 0;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: var(--nv-space-1);
		padding: var(--nv-space-2);
		border-bottom: 1px solid var(--nv-color-line);
		background: var(--nv-color-sunken);
	}

	[role='tab'] {
		min-height: var(--nv-size-touch);
		padding: 0 14px;
		border: 1px solid transparent;
		border-radius: var(--nv-radius-md);
		background: transparent;
		color: var(--nv-color-muted);
		font: inherit;
		font-size: var(--nv-font-size-small);
		font-weight: var(--nv-font-weight-medium);
		cursor: pointer;
	}

	[role='tab']:hover {
		color: var(--nv-color-ink);
	}

	[role='tab'][aria-selected='true'] {
		border-color: var(--nv-color-line);
		background: var(--nv-color-surface);
		color: var(--nv-color-ink);
	}

	.panel {
		min-height: 22rem;
		padding: var(--nv-space-6);
		background: var(--nv-color-code);
		overflow-x: auto;
	}

	.panel :global(pre) {
		margin: 0;
		background: transparent !important;
		font-size: var(--nv-font-size-code);
		line-height: var(--nv-line-height-code);
	}

	.command {
		color: var(--nv-syntax-fg);
		margin-bottom: var(--nv-space-2) !important;
	}

	.command span {
		color: var(--nv-syntax-comment);
	}

	.caption {
		padding: 14px var(--nv-space-6);
		border-top: 1px solid var(--nv-color-line);
		font-size: var(--nv-font-size-small);
		color: var(--nv-color-muted);
	}
</style>
