<!--
@component
Questions and answers as disclosure widgets. The page adds FAQPage structured data.
-->
<script lang="ts">
	import RichText from '../atoms/RichText.svelte';

	interface Props {
		items: { question: string; answer: string }[];
		/** Open the first answer. */
		openFirst?: boolean;
	}

	let { items, openFirst = true }: Props = $props();
</script>

<div class="faq">
	{#each items as item, i (item.question)}
		<details open={openFirst && i === 0}>
			<summary><RichText text={item.question} /></summary>
			<p><RichText text={item.answer} /></p>
		</details>
	{/each}
</div>

<style>
	.faq {
		border-bottom: 1px solid var(--nv-color-line);
	}

	details {
		border-top: 1px solid var(--nv-color-line);
		padding: var(--nv-space-4) 0;
	}

	summary {
		padding: 10px 0;
		font-weight: var(--nv-font-weight-semibold);
		cursor: pointer;
	}

	p {
		margin-top: var(--nv-space-2);
		color: var(--nv-color-muted);
		max-width: var(--nv-size-prose);
	}
</style>
