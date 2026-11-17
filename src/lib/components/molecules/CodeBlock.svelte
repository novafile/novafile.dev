<!--
@component
A code sample. Pass `html` from `highlight()` for syntax colors; without it the
`code` is shown as plain text.
-->
<script lang="ts">
	interface Props {
		code: string;
		/** Highlighted markup from `#lib/highlight`. */
		html?: string;
		/** Shown in the header bar, e.g. `config.nova`. */
		filename?: string;
		/** Right side of the header bar. */
		meta?: string;
		/** Header color: neutral, a problem, the fix, or the NOVA side of a comparison. */
		tone?: 'neutral' | 'problem' | 'fix' | 'accent';
		/** Aligned notes, one per line of code; empty strings leave a line blank. */
		notes?: string[];
		/** Color of the notes. */
		noteTone?: 'problem' | 'fix';
	}

	let { code, html, filename, meta, tone = 'neutral', notes, noteTone = 'fix' }: Props = $props();
</script>

<figure class="code-block {tone}">
	{#if filename || meta}
		<figcaption>
			{#if filename}<code class="filename">{filename}</code>{/if}
			{#if meta}<span class="meta">{meta}</span>{/if}
		</figcaption>
	{/if}
	<div class="body" class:annotated={notes}>
		<div class="code">
			{#if html}
				{@html html}
			{:else}
				<pre><code>{code}</code></pre>
			{/if}
		</div>
		{#if notes}
			<div class="notes" aria-label="What each line means">
				{#each notes as note, i (i)}
					<div class="note">
						{#if note}<span class="mark {noteTone}">{note}</span>{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</figure>

<style>
	.code-block {
		margin: 0;
		border: 1px solid var(--nv-color-line);
		border-radius: var(--nv-radius-lg);
		overflow: hidden;
		background: var(--nv-color-code);
		min-width: 0;
	}

	.accent {
		border-color: var(--nv-color-accent);
	}

	figcaption {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--nv-space-1) var(--nv-space-4);
		padding: 10px 18px;
		border-bottom: 1px solid var(--nv-color-line);
		background: var(--nv-color-sunken);
		font-size: var(--nv-font-size-small);
		font-weight: var(--nv-font-weight-semibold);
	}

	.accent figcaption {
		background: var(--nv-color-accent-soft);
	}

	.problem figcaption {
		background: var(--nv-color-warn-soft);
		color: var(--nv-color-warn);
	}

	.fix figcaption {
		background: var(--nv-color-ok-soft);
		color: var(--nv-color-ok);
	}

	.filename {
		font-size: var(--nv-font-size-small);
	}

	.meta {
		color: var(--nv-color-muted);
		font-weight: var(--nv-font-weight-regular);
	}

	.body {
		padding: var(--nv-space-5) 18px;
	}

	.body.annotated {
		display: grid;
		grid-template-columns: max-content minmax(0, 1fr);
		gap: var(--nv-space-6);
		overflow-x: auto;
	}

	.code {
		min-width: 0;
		overflow-x: auto;
	}

	.annotated .code {
		overflow: visible;
	}

	.code :global(pre) {
		margin: 0;
		background: transparent !important;
		font-size: var(--nv-font-size-code);
		line-height: var(--nv-line-height-code);
		tab-size: 2;
	}

	.code :global(pre:focus-visible) {
		outline-offset: 6px;
	}

	.notes {
		font-family: var(--nv-font-mono);
		font-size: var(--nv-font-size-code);
		line-height: var(--nv-line-height-code);
	}

	.note {
		height: calc(var(--nv-line-height-code) * 1em);
		white-space: nowrap;
	}

	.mark {
		padding: 0 4px;
		border-radius: 3px;
	}

	.mark.problem {
		background: var(--nv-color-warn-soft);
		color: var(--nv-color-warn);
	}

	.mark.fix {
		background: var(--nv-color-ok-soft);
		color: var(--nv-color-ok);
	}
</style>
