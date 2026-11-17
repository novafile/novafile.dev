<!--
@component
Footer with the license summary and link columns.
-->
<script lang="ts">
	import Logo from '../atoms/Logo.svelte';
	import type { NavItem } from '#lib/content/site.ts';

	interface Props {
		columns: { title: string; links: NavItem[] }[];
		domain: string;
	}

	let { columns, domain }: Props = $props();
</script>

<footer class="site-footer">
	<div class="inner">
		<div class="about">
			<Logo size={18} text={domain} />
			<p>
				Specification and meta-schema under Apache-2.0. Examples and conformance vectors under
				CC0-1.0. Reference implementation under EUPL-1.2 or MPL-2.0.
			</p>
		</div>
		{#each columns as column (column.title)}
			<nav aria-label={column.title}>
				<h2>{column.title}</h2>
				<ul>
					{#each column.links as link (link.href)}
						<li>
							<a href={link.href} rel={link.external ? 'external' : undefined}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/each}
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--nv-color-line);
		font-size: var(--nv-font-size-small);
		color: var(--nv-color-muted);
	}

	.inner {
		max-width: var(--nv-size-content);
		margin: 0 auto;
		padding: var(--nv-space-12) var(--nv-space-6);
		display: flex;
		flex-wrap: wrap;
		gap: var(--nv-space-8) var(--nv-space-16);
	}

	.about {
		flex: 1 1 18rem;
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-3);
	}

	h2 {
		margin-bottom: var(--nv-space-2);
		font-size: var(--nv-font-size-small);
		letter-spacing: 0;
		color: var(--nv-color-ink);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-1);
	}
</style>
