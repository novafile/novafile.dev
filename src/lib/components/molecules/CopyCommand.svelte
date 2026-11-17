<!--
@component
A shell command with a copy button, e.g. the install line in the hero.
-->
<script lang="ts">
	import Icon from '../atoms/Icon.svelte';

	interface Props {
		command: string;
	}

	let { command }: Props = $props();
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}
</script>

<div class="copy-command">
	<code><span class="prompt" aria-hidden="true">$</span> {command}</code>
	<button type="button" onclick={copy} aria-label={copied ? 'Copied' : 'Copy command'}>
		<Icon name={copied ? 'check' : 'copy'} />
	</button>
	<span class="visually-hidden" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
</div>

<style>
	.copy-command {
		display: flex;
		align-items: center;
		gap: var(--nv-space-3);
		max-width: 26rem;
		padding: 2px 2px 2px var(--nv-space-4);
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-md);
		background: var(--nv-color-code);
	}

	code {
		flex: 1 1 auto;
		min-width: 0;
		overflow-x: auto;
		white-space: nowrap;
		font-size: var(--nv-font-size-small);
	}

	.prompt {
		color: var(--nv-syntax-comment);
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--nv-size-touch);
		height: var(--nv-size-touch);
		border: 0;
		border-radius: var(--nv-radius-md);
		background: transparent;
		color: var(--nv-color-muted);
		cursor: pointer;
	}

	button:hover {
		background: var(--nv-color-sunken);
		color: var(--nv-color-ink);
	}
</style>
