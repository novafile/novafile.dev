<!--
@component
The top bar: logo, main navigation, theme switch and GitHub link.
-->
<script lang="ts">
	import Logo from '../atoms/Logo.svelte';
	import Icon from '../atoms/Icon.svelte';
	import ThemeToggle from '../molecules/ThemeToggle.svelte';
	import type { NavItem } from '#lib/content/site.ts';

	interface Props {
		nav: NavItem[];
		/** Path of the current page, to mark the active link. */
		current?: string;
		github: string;
	}

	let { nav, current = '/', github }: Props = $props();

	const isCurrent = (href: string) =>
		!href.startsWith('http') && !href.includes('#') && current.startsWith(href);
</script>

<header class="site-header">
	<nav aria-label="Main">
		<a class="home" href="/" aria-label="NOVA home"><Logo size={22} /></a>
		<ul>
			{#each nav as item (item.href)}
				<li>
					<a
						href={item.href}
						aria-current={isCurrent(item.href) ? 'page' : undefined}
						rel={item.external ? 'external' : undefined}>{item.label}</a
					>
				</li>
			{/each}
		</ul>
		<div class="actions">
			<ThemeToggle />
			<a class="github" href={github} rel="external"><Icon name="github" /> GitHub</a>
		</div>
	</nav>
</header>

<style>
	.site-header {
		border-bottom: 1px solid var(--nv-color-line);
		background: var(--nv-color-ground);
	}

	nav {
		max-width: var(--nv-size-content);
		margin: 0 auto;
		padding: var(--nv-space-3) var(--nv-space-6);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--nv-space-2) var(--nv-space-8);
	}

	.home {
		display: inline-flex;
		min-height: var(--nv-size-touch);
		align-items: center;
		text-decoration: none;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--nv-space-1);
		flex: 1 1 auto;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	ul a,
	.github {
		display: inline-flex;
		align-items: center;
		gap: var(--nv-space-2);
		min-height: var(--nv-size-touch);
		padding: 0 var(--nv-space-3);
		border-radius: var(--nv-radius-md);
		color: var(--nv-color-ink);
		font-size: var(--nv-font-size-small);
		font-weight: var(--nv-font-weight-medium);
	}

	ul a:hover,
	.github:hover {
		background: var(--nv-color-sunken);
		text-decoration: none;
	}

	[aria-current='page'] {
		color: var(--nv-color-accent);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--nv-space-2);
	}
</style>
