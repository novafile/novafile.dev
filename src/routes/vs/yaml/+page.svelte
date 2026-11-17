<script lang="ts">
	import RichText from '#lib/components/atoms/RichText.svelte';
	import CodeBlock from '#lib/components/molecules/CodeBlock.svelte';
	import ComparisonTable from '#lib/components/organisms/ComparisonTable.svelte';
	import FaqList from '#lib/components/organisms/FaqList.svelte';
	import SideBySide from '#lib/components/organisms/SideBySide.svelte';
	import ComparePage from '#lib/components/templates/ComparePage.svelte';
	import { changes, faq, meta, related, stayWithYaml } from '#lib/content/vs-yaml.ts';
	import { specUrl } from '#lib/content/site.ts';
	import Seo from '#lib/seo/Seo.svelte';

	let { data } = $props();

	const rows = changes.map((c) => ({
		topic: c.topic,
		theirs: c.yaml,
		nova: c.nova,
		sectionLabel: `§${c.section}`,
		sectionHref: specUrl(c.section)
	}));

	const outline = [
		{ id: 'what-changes', label: 'What changes' },
		{ id: 'migrate', label: 'Migrating' },
		{ id: 'stay', label: 'When to stay with YAML' },
		{ id: 'faq', label: 'Questions' }
	];

	const plain = (s: string) => s.replace(/`/g, '');
</script>

<Seo
	title={meta.title}
	description={meta.description}
	path="/vs/yaml/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: plain(f.answer) }
		}))
	}}
/>

<ComparePage format="YAML" title={meta.title} lead={meta.lead} {outline} {related}>
	<SideBySide before={data.yaml} after={data.nova} />
	<p class="note">
		In NOVA, three spaces of indentation are an error, not a different structure.
		<a href={specUrl('4.4')} rel="external">Token classification, spec §4.4</a>
	</p>

	<h2 id="what-changes">What changes</h2>
	<ComparisonTable format="YAML" {rows} />

	<h2 id="migrate">Migrating</h2>
	<p class="prose">
		Convert a file, review the loss report, then rename keys at your own pace. The converter marks
		the result <code>@compat yaml</code> so lints leave the names alone.
	</p>
	<CodeBlock {...data.migrate} />
	<p class="note">
		Merge keys (<code>&lt;&lt;</code>) and custom tags are rejected on import; move that reuse into
		a template. Aliases are expanded under an output budget.
		<a href={specUrl('11.2')} rel="external">YAML mapping, spec §11.2</a>
	</p>

	<h2 id="stay">When to stay with YAML</h2>
	<ul class="prose">
		{#each stayWithYaml as reason (reason)}
			<li><RichText text={reason} /></li>
		{/each}
	</ul>

	<h2 id="faq">Questions</h2>
	<FaqList items={faq} />
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

	code {
		font-size: 0.92em;
	}
</style>
