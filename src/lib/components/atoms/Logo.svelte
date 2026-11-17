<!--
@component
The NOVA mark: a four-pointed star, optionally with the lowercase wordmark.
-->
<script lang="ts">
	interface Props {
		/** Height of the mark in pixels. */
		size?: number;
		/** Show the "nova" wordmark next to the star. */
		wordmark?: boolean;
		/** Text for the wordmark, e.g. "novafile.dev" in the footer. */
		text?: string;
	}

	let { size = 22, wordmark = true, text = 'nova' }: Props = $props();
</script>

<span class="logo" style:--logo-size="{size}px">
	<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
		<path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
	</svg>
	{#if wordmark}
		<span class="wordmark">{text}</span>
	{/if}
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: calc(var(--logo-size) * 0.45);
		color: var(--nv-color-ink);
	}

	svg {
		flex: none;
		fill: var(--nv-color-accent);
	}

	.wordmark {
		font-family: var(--nv-font-mono);
		font-weight: var(--nv-font-weight-semibold);
		font-size: calc(var(--logo-size) * 0.92);
		letter-spacing: -0.02em;
		line-height: 1;
	}
</style>
