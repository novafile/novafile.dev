<!--
@component
One format a reader may be coming from, with the NOVA answer in a sentence.
Without `href` the card is shown as not written yet.
-->
<script lang="ts">
	import RichText from '../atoms/RichText.svelte';

	interface Props {
		name: string;
		/** The answer, in plain text; `code` spans may use backticks. */
		summary: string;
		href?: string;
		featured?: boolean;
	}

	let { name, summary, href, featured = false }: Props = $props();
</script>

{#snippet body()}
	<span class="name">{name}</span>
	<span class="summary"><RichText text={summary} /></span>
	{#if !href}<span class="soon">Page coming soon</span>{/if}
{/snippet}

{#if href}
	<a class="card" class:featured {href}>{@render body()}</a>
{:else}
	<div class="card pending">{@render body()}</div>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-2);
		height: 100%;
		padding: var(--nv-space-5) 22px;
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-lg);
		background: var(--nv-color-ground);
		color: var(--nv-color-ink);
		text-decoration: none;
	}

	/* The grid's light (see FormatGrid): a ring in the border and a faint wash behind the text. */
	a.card {
		--_light: radial-gradient(
			280px circle at var(--spot-x, 50%) var(--spot-y, 50%),
			var(--nv-color-accent),
			transparent
		);
		position: relative;
		isolation: isolate;
	}

	a.card::before,
	a.card::after {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		background: var(--_light);
		opacity: 0;
		transition: opacity 0.3s ease-out;
		pointer-events: none;
	}

	/* Border ring: the border box minus the content box leaves the 1px padding. */
	a.card::before {
		padding: 1px;
		mask:
			linear-gradient(#000 0 0) content-box exclude,
			linear-gradient(#000 0 0);
		opacity: var(--spot-on, 0);
	}

	a.card::after {
		z-index: -1;
		opacity: calc(var(--spot-on, 0) * 0.1);
	}

	/* Keyboard focus lights the focused card from its center. */
	a.card:focus-visible {
		--spot-x: 50%;
		--spot-y: 50%;
		--spot-on: 1;
	}

	a.card:hover {
		border-color: var(--nv-color-accent);
		text-decoration: none;
	}

	.featured {
		border-color: var(--nv-color-accent);
	}

	.name {
		font-family: var(--nv-font-mono);
		font-weight: var(--nv-font-weight-semibold);
		font-size: var(--nv-font-size-small);
	}

	.summary {
		font-size: var(--nv-font-size-small);
		line-height: 1.5;
		color: var(--nv-color-muted);
	}

	.soon {
		margin-top: auto;
		font-size: var(--nv-font-size-caption);
		color: var(--nv-color-muted);
	}
</style>
