<!--
@component
Two code blocks next to each other: the reader's format and NOVA. Stacks on narrow screens.
-->
<script lang="ts">
	import CodeBlock from '../molecules/CodeBlock.svelte';

	interface Side {
		code: string;
		html?: string;
		filename?: string;
		meta?: string;
		notes?: string[];
	}

	interface Props {
		before: Side;
		after: Side;
		/** Header colors: an annotated comparison, or "problem" and "fix" headers. */
		variant?: 'annotated' | 'problem-fix';
	}

	let { before, after, variant = 'annotated' }: Props = $props();
</script>

<div class="side-by-side">
	<CodeBlock
		{...before}
		tone={variant === 'problem-fix' ? 'problem' : 'neutral'}
		noteTone="problem"
	/>
	<CodeBlock {...after} tone={variant === 'problem-fix' ? 'fix' : 'accent'} noteTone="fix" />
</div>

<style>
	.side-by-side {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: var(--nv-space-4);
	}
</style>
