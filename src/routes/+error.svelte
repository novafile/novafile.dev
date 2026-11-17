<!--
Every error page, including the 404.html GitHub Pages serves for unknown paths.
-->
<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/atoms/Button.svelte';
	import Eyebrow from '#lib/components/atoms/Eyebrow.svelte';
	import { specUrl } from '#lib/content/site.ts';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} · NOVA</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="error">
	<Eyebrow>Error {page.status}</Eyebrow>
	<h1>{notFound ? 'This page does not exist.' : 'Something went wrong.'}</h1>
	<p class="lead">
		{notFound
			? 'The address may be mistyped, or the page has moved.'
			: 'Reload the page, or start again from the home page.'}
	</p>
	<div class="actions">
		<Button href="/">Go to the home page</Button>
		<Button href={specUrl()} variant="secondary">Read the spec</Button>
	</div>
</div>

<style>
	.error {
		max-width: var(--nv-size-content);
		margin: 0 auto;
		padding: var(--nv-space-20) var(--nv-space-6);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--nv-space-6);
	}

	h1 {
		font-size: var(--nv-font-size-display);
		line-height: 1.05;
		letter-spacing: var(--nv-letter-spacing-display);
	}

	.lead {
		font-size: var(--nv-font-size-lead);
		line-height: 1.55;
		color: var(--nv-color-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--nv-space-3);
	}
</style>
