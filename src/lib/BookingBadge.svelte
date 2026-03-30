<script lang="ts">
	import { onMount } from 'svelte';

	let { id, defaultText, defaultColor }: { id: string; defaultText: string; defaultColor: 'success' | 'warning' | 'error' } = $props();

	const STORAGE_KEY = 'budapest-restaurant-status';

	const colorOptions = [
		{ value: 'success' as const, label: 'Grønn' },
		{ value: 'warning' as const, label: 'Gul' },
		{ value: 'error' as const, label: 'Rød' },
	];

	let text = $state(defaultText);
	let color = $state(defaultColor);
	let showEditor = $state(false);
	let editText = $state('');

	onMount(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Record<string, { text: string; color: string }>;
				if (parsed[id]) {
					text = parsed[id].text;
					color = parsed[id].color as typeof color;
				}
			} catch {}
		}
	});

	function save() {
		let all: Record<string, { text: string; color: string }> = {};
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) { try { all = JSON.parse(saved); } catch {} }
		all[id] = { text, color };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
	}

	function openEditor() {
		editText = text;
		showEditor = true;
	}

	function confirm() {
		if (editText.trim()) text = editText.trim();
		showEditor = false;
		save();
	}

	function setColor(c: typeof color) {
		color = c;
		save();
	}
</script>

{#if showEditor}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="badge-overlay" onclick={() => showEditor = false} onkeydown={() => {}}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="badge-editor" onclick={(e) => e.stopPropagation()} onkeydown={() => {}}>
			<input type="text" bind:value={editText} class="badge-input" onkeydown={(e) => { if (e.key === 'Enter') confirm(); }} />
			<div class="badge-colors">
				{#each colorOptions as opt}
					<button
						class="color-btn {opt.value}"
						class:active={color === opt.value}
						onclick={() => setColor(opt.value)}
					>{opt.label}</button>
				{/each}
			</div>
			<button class="badge-save" onclick={confirm}>OK</button>
		</div>
	</div>
{/if}

<button class="booking-badge {color}" onclick={openEditor} title="Klikk for å endre status">
	{text}
</button>

<style>
	.booking-badge {
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		white-space: nowrap;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.15s;
	}

	.booking-badge:hover { opacity: 0.8; }

	.booking-badge.error { background: #fce4ec; color: #c62828; }
	:global([data-theme="dark"]) .booking-badge.error { background: #3e1416; color: #ef9a9a; }
	.booking-badge.warning { background: #fff3e0; color: #e65100; }
	:global([data-theme="dark"]) .booking-badge.warning { background: #3e2612; color: #ffb74d; }
	.booking-badge.success { background: #e8f5e9; color: #2e7d32; }
	:global([data-theme="dark"]) .booking-badge.success { background: #1b3d1f; color: #81c784; }

	.badge-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.3);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.badge-editor {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 8px 32px rgba(0,0,0,0.2);
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		min-width: 220px;
	}

	.badge-input {
		padding: 0.45rem 0.6rem;
		border: 1px solid var(--border);
		border-radius: 6px;
		font-size: 0.85rem;
		font-family: inherit;
		background: var(--bg);
		color: var(--text);
		outline: none;
	}

	.badge-input:focus { border-color: var(--accent); }

	.badge-colors {
		display: flex;
		gap: 0.35rem;
	}

	.color-btn {
		flex: 1;
		padding: 0.35rem;
		border: 2px solid transparent;
		border-radius: 6px;
		font-size: 0.7rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}

	.color-btn.success { background: #e8f5e9; color: #2e7d32; }
	.color-btn.warning { background: #fff3e0; color: #e65100; }
	.color-btn.error { background: #fce4ec; color: #c62828; }
	.color-btn.active { border-color: currentColor; }

	.badge-save {
		background: var(--accent);
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.4rem;
		font-size: 0.8rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
	}

	.badge-save:hover { opacity: 0.8; }
</style>
