<!--
@component
Title, description, canonical URL, social cards and optional JSON-LD for a page.
-->
<script lang="ts">
	import { site } from '#lib/content/site.ts';

	interface Props {
		title: string;
		description: string;
		/** Path with trailing slash, e.g. `/vs/yaml/`. */
		path: string;
		jsonLd?: Record<string, unknown>;
	}

	let { title, description, path, jsonLd }: Props = $props();

	const url = $derived(new URL(path, site.url).href);
	const fullTitle = $derived(path === '/' ? title : `${title} · NOVA`);
	const ld = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` +
					'script>'
			: ''
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="NOVA" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
	{@html ld}
</svelte:head>
