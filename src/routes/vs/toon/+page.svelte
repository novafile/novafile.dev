<script lang="ts">
	import FormatComparison from '#lib/components/templates/FormatComparison.svelte';
	import { comparison } from '#lib/content/vs-toon.ts';
	import { faqPage } from '#lib/seo/faq.ts';
	import Seo from '#lib/seo/Seo.svelte';

	let { data } = $props();
</script>

<Seo
	title={comparison.meta.title}
	description={comparison.meta.description}
	path={comparison.path}
	jsonLd={faqPage(comparison.faq)}
/>

<FormatComparison {comparison} code={data} />
