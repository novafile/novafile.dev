<!--
@component
Every page: header, main content, footer, and a skip link.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteHeader from '../organisms/SiteHeader.svelte';
	import SiteFooter from '../organisms/SiteFooter.svelte';
	import { footerColumns, mainNav, site } from '#lib/content/site.ts';

	interface Props {
		current?: string;
		children: Snippet;
	}

	let { current = '/', children }: Props = $props();
</script>

<a class="skip" href="#main">Skip to content</a>
<SiteHeader nav={mainNav} {current} github={site.github} />
<main id="main">{@render children()}</main>
<SiteFooter columns={footerColumns} domain={site.domain} />

<style>
	.skip {
		position: absolute;
		left: var(--nv-space-4);
		top: -4rem;
		z-index: 10;
		padding: var(--nv-space-2) var(--nv-space-4);
		border-radius: var(--nv-radius-md);
		background: var(--nv-color-accent);
		color: var(--nv-color-on-accent);
	}

	.skip:focus {
		top: var(--nv-space-4);
	}

	main {
		display: block;
	}
</style>
