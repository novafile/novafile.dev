<!--
@component
The "Coming from another format?" grid. A light follows the mouse across the
grid and shows in the borders and faintly on the faces of the linked cards.
-->
<script lang="ts">
	import FormatCard from '../molecules/FormatCard.svelte';

	interface Props {
		formats: { name: string; summary: string; href?: string }[];
	}

	let { formats }: Props = $props();

	/** Writes the pointer position, relative to each card, as `--spot-x/y`; at most once per frame. */
	function spotlight(grid: HTMLElement) {
		let raf = 0;
		let x = 0;
		let y = 0;
		const frame = () => {
			raf = 0;
			for (const card of grid.querySelectorAll<HTMLElement>('a')) {
				const r = card.getBoundingClientRect();
				card.style.setProperty('--spot-x', `${Math.round(x - r.left)}px`);
				card.style.setProperty('--spot-y', `${Math.round(y - r.top)}px`);
			}
		};
		const move = (e: PointerEvent) => {
			// A finger has no hover, so the light would only flash under it.
			if (e.pointerType === 'touch') return;
			x = e.clientX;
			y = e.clientY;
			grid.style.setProperty('--spot-on', '1');
			raf ||= requestAnimationFrame(frame);
		};
		const leave = () => grid.style.removeProperty('--spot-on');
		grid.addEventListener('pointermove', move);
		grid.addEventListener('pointerleave', leave);
		return () => {
			grid.removeEventListener('pointermove', move);
			grid.removeEventListener('pointerleave', leave);
			cancelAnimationFrame(raf);
		};
	}
</script>

<ul class="grid" {@attach spotlight}>
	{#each formats as format (format.name)}
		<li><FormatCard {...format} /></li>
	{/each}
</ul>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: var(--nv-space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
