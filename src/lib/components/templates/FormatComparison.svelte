<!--
@component
A whole "NOVA vs X" page from a `Comparison`: side by side, what changes,
migrating, when to stay, and questions. Pass the samples with their
highlighted `html` from `highlightComparison()`.
-->
<script lang="ts">
	import RichText from '../atoms/RichText.svelte';
	import CodeBlock from '../molecules/CodeBlock.svelte';
	import ComparisonTable from '../organisms/ComparisonTable.svelte';
	import FaqList from '../organisms/FaqList.svelte';
	import SideBySide from '../organisms/SideBySide.svelte';
	import ComparePage from './ComparePage.svelte';
	import type { Comparison, Sample, SpecNote } from '#lib/content/comparison.ts';
	import { specUrl } from '#lib/content/site.ts';

	type Highlighted = Sample & { html?: string };

	interface Props {
		comparison: Comparison;
		code: { before: Highlighted; after: Highlighted; migrate: Highlighted[] };
	}

	let { comparison: c, code }: Props = $props();

	const rows = $derived(
		c.changes.map((change) => ({
			topic: change.topic,
			theirs: change.theirs,
			nova: change.nova,
			sectionLabel: change.section === 'C' ? 'App. C' : `§${change.section}`,
			sectionHref: specUrl(change.section)
		}))
	);

	const outline = $derived([
		{ id: 'what-changes', label: 'What changes' },
		{ id: 'migrate', label: 'Migrating' },
		{ id: 'stay', label: c.stayTitle },
		{ id: 'faq', label: 'Questions' }
	]);
</script>

{#snippet specNote(note: SpecNote)}
	<p class="note">
		<RichText text={note.text} />
		<a href={specUrl(note.section)} rel="external">{note.label}</a>
	</p>
{/snippet}

<ComparePage
	format={c.format}
	title={c.meta.title}
	lead={c.meta.lead}
	{outline}
	related={c.related}
>
	<SideBySide before={code.before} after={code.after} variant={c.variant} stacked={c.stacked} />
	{#if c.afterNote}{@render specNote(c.afterNote)}{/if}

	<h2 id="what-changes">What changes</h2>
	<ComparisonTable format={c.format} {rows} />

	<h2 id="migrate">Migrating</h2>
	<p class="prose"><RichText text={c.migrate.intro} /></p>
	<div class="steps">
		{#each code.migrate as step, i (i)}
			<CodeBlock {...step} />
		{/each}
	</div>
	{#if c.migrate.note}{@render specNote(c.migrate.note)}{/if}

	<h2 id="stay">{c.stayTitle}</h2>
	<ul class="prose">
		{#each c.stay as reason (reason)}
			<li><RichText text={reason} /></li>
		{/each}
	</ul>

	<h2 id="faq">Questions</h2>
	<FaqList items={c.faq} />
</ComparePage>

<style>
	h2 {
		margin: var(--nv-space-16) 0 var(--nv-space-5);
		font-size: 1.75rem;
		scroll-margin-top: var(--nv-space-6);
	}

	.note {
		margin-top: var(--nv-space-4);
		font-size: var(--nv-font-size-small);
		color: var(--nv-color-muted);
		max-width: var(--nv-size-prose);
	}

	.prose {
		max-width: var(--nv-size-prose);
		margin-bottom: var(--nv-space-4);
	}

	ul.prose {
		padding-left: var(--nv-space-6);
	}

	li + li {
		margin-top: var(--nv-space-2);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-4);
	}
</style>
