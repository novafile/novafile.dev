<!--
@component
The layout every "NOVA vs X" page uses: breadcrumb, title, lead, sections, and
an aside with the page outline and related pages.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import RichText from '../atoms/RichText.svelte';

	interface Props {
		format: string;
		title: string;
		lead: string;
		outline: { id: string; label: string }[];
		related: { label: string; href: string }[];
		children: Snippet;
	}

	let { format, title, lead, outline, related, children }: Props = $props();
</script>

<div class="compare">
	<article>
		<nav aria-label="Breadcrumb" class="breadcrumb">
			<a href="/#coming-from">Compare</a> <span aria-hidden="true">/</span>
			<span aria-current="page">{format}</span>
		</nav>
		<h1>{title}</h1>
		<p class="lead"><RichText text={lead} /></p>
		{@render children()}
	</article>
	<aside aria-label="On this page">
		<h2>On this page</h2>
		<ul class="outline">
			{#each outline as entry (entry.id)}
				<li><a href="#{entry.id}">{entry.label}</a></li>
			{/each}
		</ul>
		{#if related.length}
			<h2>Also see</h2>
			<ul>
				{#each related as link (link.href)}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		{/if}
	</aside>
</div>

<style>
	.compare {
		max-width: var(--nv-size-content);
		margin: 0 auto;
		padding: var(--nv-space-12) var(--nv-space-6) var(--nv-space-20);
		display: flex;
		flex-wrap: wrap;
		gap: var(--nv-space-12);
	}

	article {
		flex: 999 1 40rem;
		min-width: 0;
	}

	aside {
		flex: 1 1 12rem;
		font-size: var(--nv-font-size-small);
	}

	.breadcrumb {
		margin-bottom: var(--nv-space-4);
		font-size: var(--nv-font-size-small);
		color: var(--nv-color-muted);
	}

	h1 {
		max-width: 48rem;
		margin-bottom: var(--nv-space-5);
		font-size: var(--nv-font-size-h1);
		line-height: var(--nv-line-height-tight);
		letter-spacing: var(--nv-letter-spacing-display);
	}

	.lead {
		max-width: var(--nv-size-prose);
		margin-bottom: var(--nv-space-10);
		font-size: var(--nv-font-size-lead);
		line-height: 1.55;
		color: var(--nv-color-muted);
	}

	aside h2 {
		margin-bottom: var(--nv-space-3);
		font-size: var(--nv-font-size-small);
		letter-spacing: 0;
	}

	aside ul {
		margin: 0 0 var(--nv-space-8);
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-2);
	}

	.outline {
		padding-left: var(--nv-space-3) !important;
		border-left: 1px solid var(--nv-color-line);
	}

	.outline a {
		color: var(--nv-color-muted);
	}

	@media (max-width: 40rem) {
		.compare {
			padding-inline: var(--nv-space-4);
		}

		h1 {
			font-size: 2.25rem;
		}
	}

	@media (min-width: 64rem) {
		aside {
			position: sticky;
			top: var(--nv-space-6);
			align-self: flex-start;
		}
	}
</style>
