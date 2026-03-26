<script lang="ts">
	let { text, label = '' }: { text: string; label?: string } = $props();
	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => copied = false, 1500);
	}
</script>

<button class="copyable" onclick={copy} title="Kopier til utklippstavle">
	<span class="copy-text">{label || text}</span>
	<span class="copy-icon">
		{#if copied}
			<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
				<path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		{:else}
			<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
				<rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
				<path d="M3 11V3C3 2.44772 3.44772 2 4 2H12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
			</svg>
		{/if}
	</span>
</button>

<style>
	.copyable {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		padding: 0;
		border-bottom: 1px dashed var(--border);
		transition: all 0.15s;
	}

	.copyable:hover {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	.copy-icon {
		display: flex;
		align-items: center;
		color: var(--text-muted);
		opacity: 0.5;
		transition: opacity 0.15s;
	}

	.copyable:hover .copy-icon {
		opacity: 1;
		color: var(--accent);
	}
</style>
