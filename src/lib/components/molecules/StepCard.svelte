<!--
@component
A numbered step with a short code sample, used for the agent loop.
-->
<script lang="ts">
	interface Props {
		step: number;
		title: string;
		code: string;
		html?: string;
	}

	let { step, title, code, html }: Props = $props();
</script>

<article class="step">
	<h3><span class="number">{step}</span> {title}</h3>
	<div class="code">
		{#if html}{@html html}{:else}<pre><code>{code}</code></pre>{/if}
	</div>
</article>

<style>
	.step {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-lg);
		overflow: hidden;
		background: var(--nv-color-surface);
		min-width: 0;
	}

	h3 {
		display: flex;
		gap: var(--nv-space-3);
		padding: var(--nv-space-3) 18px;
		border-bottom: 1px solid var(--nv-color-line);
		font-size: var(--nv-font-size-small);
		font-weight: var(--nv-font-weight-semibold);
		letter-spacing: 0;
	}

	.number {
		font-family: var(--nv-font-mono);
		color: var(--nv-color-accent);
	}

	.code {
		flex: 1;
		padding: 18px;
		background: var(--nv-color-code);
		overflow-x: auto;
	}

	.code :global(pre) {
		margin: 0;
		background: transparent !important;
		font-size: var(--nv-font-size-code);
		line-height: var(--nv-line-height-code);
	}
</style>
