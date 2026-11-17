<script lang="ts">
	import '@fontsource/ibm-plex-sans/400.css';
	import '@fontsource/ibm-plex-sans/500.css';
	import '@fontsource/ibm-plex-sans/600.css';
	import '@fontsource/ibm-plex-sans/700.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/600.css';
	import '#lib/styles/global.css';
	import { page } from '$app/state';
	import SiteShell from '#lib/components/templates/SiteShell.svelte';

	let { children } = $props();
</script>

<SiteShell current={page.url.pathname}>
	{@render children()}
</SiteShell>
