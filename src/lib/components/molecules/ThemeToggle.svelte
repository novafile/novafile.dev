<!--
@component
Switches between light and dark. The choice is stored per browser; without one
the site follows the system setting.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../atoms/Icon.svelte';

	let dark = $state(false);

	onMount(() => {
		const explicit = document.documentElement.dataset.theme;
		dark = explicit ? explicit === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('nv-theme', theme);
		} catch {
			// Storage can be unavailable; the choice then lasts for this page only.
		}
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
>
	<Icon name={dark ? 'sun' : 'moon'} />
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--nv-size-touch);
		height: var(--nv-size-touch);
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-md);
		background: var(--nv-color-surface);
		color: var(--nv-color-ink);
		cursor: pointer;
	}

	button:hover {
		border-color: var(--nv-color-muted);
	}
</style>
