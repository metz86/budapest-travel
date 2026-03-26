<script lang="ts">
	let { text, label = '' } = $props();
	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => copied = false, 1500);
	}
</script>

<button class="copy-btn" onclick={copy} title="Kopier til utklippstavle">
	{#if label}<span class="copy-text">{label}</span>{/if}
	<span class="copy-icon">{copied ? '✓' : '⧉'}</span>
</button>

<style>
	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: none;
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
		font-family: inherit;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.15s;
	}

	.copy-btn:hover {
		background: var(--accent-light);
		border-color: var(--accent);
		color: var(--accent);
	}

	.copy-icon {
		font-size: 0.85rem;
		line-height: 1;
	}
</style>
