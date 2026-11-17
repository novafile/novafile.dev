<!--
@component
Availability of an implementation: solid when it ships, dashed when planned.
-->
<script lang="ts">
	interface Props {
		status: 'available' | 'planned';
		label: string;
	}

	let { status, label }: Props = $props();
</script>

<span class="pill {status}">
	{#if status === 'available'}<span class="dot" aria-hidden="true"></span>{/if}
	{label}<span class="status"> · {status}</span>
</span>

<style>
	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--nv-space-2);
		padding: 6px 14px;
		border-radius: var(--nv-radius-pill);
		font-size: var(--nv-font-size-small);
		line-height: 1.3;
	}

	.available {
		border: 1px solid var(--nv-color-accent);
		font-weight: var(--nv-font-weight-medium);
	}

	.planned {
		border: 1px dashed var(--nv-color-line);
		color: var(--nv-color-muted);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--nv-color-ok);
	}

	.status {
		color: var(--nv-color-muted);
		font-weight: var(--nv-font-weight-regular);
	}
</style>
