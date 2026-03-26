<script lang="ts">
	import { onMount } from 'svelte';

	type CheckItem = { id: string; text: string; checked: boolean };
	type CheckGroup = { title: string; items: CheckItem[] };

	const STORAGE_KEY = 'budapest-checklist';

	const defaultGroups: CheckGroup[] = [
		{
			title: 'Før avreise',
			items: [
				{ id: 'book-vibe', text: 'Book VIBE Budapest', checked: false },
				{ id: 'book-mazel', text: 'Book Mazel Tov', checked: false },
				{ id: 'dl-budapestgo', text: 'Last ned BudapestGO-appen', checked: false },
				{ id: 'travel-card', text: 'Sjekk 72-timers Travelcard', checked: false },
				{ id: 'travel-insurance', text: 'Reiseforsikring i orden', checked: false },
				{ id: 'notify-bank', text: 'Gi beskjed til banken (utenlandsbruk)', checked: false },
				{ id: 'exchange-rate', text: 'Sjekk valutakurs HUF/NOK', checked: false },
			],
		},
		{
			title: 'Pakkeliste',
			items: [
				{ id: 'passport', text: 'Pass / ID', checked: false },
				{ id: 'boarding', text: 'Boardingkort (DY1550 / DY1551)', checked: false },
				{ id: 'hotel-confirm', text: 'Hotellbekreftelse (D8 Hotel)', checked: false },
				{ id: 'charger', text: 'Lader + powerbank', checked: false },
				{ id: 'swimwear', text: 'Badetøy (Széchenyi termalbad)', checked: false },
				{ id: 'comfy-shoes', text: 'Gode gåsko', checked: false },
				{ id: 'adapter', text: 'Reiseadapter (Type C/F)', checked: false },
				{ id: 'meds', text: 'Medisiner / personlige ting', checked: false },
			],
		},
	];

	let groups = $state<CheckGroup[]>(defaultGroups);
	let loaded = $state(false);

	onMount(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Record<string, boolean>;
				for (const group of groups) {
					for (const item of group.items) {
						if (parsed[item.id] !== undefined) {
							item.checked = parsed[item.id];
						}
					}
				}
			} catch {}
		}
		loaded = true;
	});

	function save() {
		const state: Record<string, boolean> = {};
		for (const group of groups) {
			for (const item of group.items) {
				state[item.id] = item.checked;
			}
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}

	function toggle(item: CheckItem) {
		item.checked = !item.checked;
		save();
	}

	function checkedCount(items: CheckItem[]): number {
		return items.filter(i => i.checked).length;
	}

	function resetAll() {
		for (const group of groups) {
			for (const item of group.items) {
				item.checked = false;
			}
		}
		save();
	}
</script>

{#if loaded}
<div class="checklist">
	{#each groups as group}
		<div class="check-group">
			<div class="check-group-header">
				<span class="check-group-title">{group.title}</span>
				<span class="check-group-count">{checkedCount(group.items)}/{group.items.length}</span>
			</div>
			<div class="check-group-progress">
				<div class="check-group-bar" style="width:{(checkedCount(group.items) / group.items.length) * 100}%"></div>
			</div>
			{#each group.items as item}
				<button class="check-item" class:checked={item.checked} onclick={() => toggle(item)}>
					<span class="check-box">
						{#if item.checked}
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
								<path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						{/if}
					</span>
					<span class="check-text">{item.text}</span>
				</button>
			{/each}
		</div>
	{/each}
	<button class="reset-btn" onclick={resetAll}>Nullstill alt</button>
</div>
{/if}

<style>
	.checklist {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		box-shadow: var(--shadow);
	}

	.check-group {
		margin-bottom: 1.25rem;
	}

	.check-group:last-of-type {
		margin-bottom: 0.5rem;
	}

	.check-group-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.35rem;
	}

	.check-group-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--accent);
	}

	.check-group-count {
		font-size: 0.7rem;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.check-group-progress {
		height: 3px;
		background: var(--border);
		border-radius: 2px;
		margin-bottom: 0.5rem;
		overflow: hidden;
	}

	.check-group-bar {
		height: 100%;
		background: var(--accent);
		border-radius: 2px;
		transition: width 0.2s;
	}

	.check-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.45rem 0;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.85rem;
		color: var(--text);
		text-align: left;
		transition: opacity 0.15s;
	}

	.check-item.checked {
		opacity: 0.5;
	}

	.check-item.checked .check-text {
		text-decoration: line-through;
	}

	.check-box {
		width: 20px;
		height: 20px;
		border: 2px solid var(--border);
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.15s;
		color: white;
	}

	.check-item.checked .check-box {
		background: var(--accent);
		border-color: var(--accent);
	}

	.check-item:hover .check-box {
		border-color: var(--accent);
	}

	.reset-btn {
		margin-top: 0.5rem;
		background: none;
		border: none;
		font-family: inherit;
		font-size: 0.75rem;
		color: var(--text-muted);
		cursor: pointer;
		padding: 0.25rem 0;
	}

	.reset-btn:hover {
		color: var(--accent);
	}
</style>
