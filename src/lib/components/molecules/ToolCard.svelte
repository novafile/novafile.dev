<!--
@component
A tool that exists today, with an optional list of subcommands or editors.
-->
<script lang="ts">
	interface Props {
		name: string;
		description: string;
		detail?: string;
		href?: string;
	}

	let { name, description, detail, href }: Props = $props();
</script>

<article class="tool">
	<h3>
		{#if href}<a {href}>{name}</a>{:else}{name}{/if}
	</h3>
	<p>{description}</p>
	{#if detail}<code>{detail}</code>{/if}
</article>

<style>
	.tool {
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-2);
		padding: 22px;
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-lg);
		background: var(--nv-color-surface);
	}

	h3 {
		font-family: var(--nv-font-mono);
		font-size: var(--nv-font-size-body);
		font-weight: var(--nv-font-weight-semibold);
		letter-spacing: 0;
	}

	h3 a {
		color: inherit;
	}

	p {
		font-size: var(--nv-font-size-small);
		line-height: 1.5;
		color: var(--nv-color-muted);
	}

	code {
		margin-top: var(--nv-space-2);
		font-size: var(--nv-font-size-caption);
		color: var(--nv-color-muted);
	}
</style>
