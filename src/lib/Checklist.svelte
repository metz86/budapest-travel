<script lang="ts">
	import { onMount } from 'svelte';
	import { loadState, saveState } from './sync';

	type CheckItem = { id: string; text: string; checked: boolean };
	type CheckGroup = { title: string; key: string; items: CheckItem[] };

	type ChecklistData = {
		checked: Record<string, boolean>;
		custom: Record<string, { id: string; text: string }[]>;
		hidden: boolean;
	};

	const defaultGroups: CheckGroup[] = [
		{
			title: 'Før avreise', key: 'pre',
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
			title: 'Dokumenter & Elektronikk', key: 'docs',
			items: [
				{ id: 'passport', text: 'Pass / ID', checked: false },
				{ id: 'boarding', text: 'Boardingkort (DY1550 / DY1551)', checked: false },
				{ id: 'hotel-confirm', text: 'Hotellbekreftelse (D8 Hotel)', checked: false },
				{ id: 'charger', text: 'Lader + powerbank', checked: false },
				{ id: 'headphones', text: 'Hodetelefoner', checked: false },
				{ id: 'adapter', text: 'Reiseadapter (Type C/F)', checked: false },
			],
		},
		{
			title: 'Klær — pakk lett!', key: 'clothes',
			items: [
				{ id: 'vibe-outfit', text: 'Pent antrekk til VIBE (fre) — skjorte/bluse, pen bukse, pene sko', checked: false },
				{ id: 'casual-dinner', text: 'Casual kveldstøy til Mazel Tov (lør) + Beerstro14 (søn)', checked: false },
				{ id: 'daywear-1', text: 'Dagstøy dag 1–2 — t-skjorte/topp, jeans/chinos', checked: false },
				{ id: 'daywear-2', text: 'Dagstøy dag 3–4 — t-skjorte/topp, shorts/bukse', checked: false },
				{ id: 'light-jacket', text: 'Lett jakke (april kan være kjølig om kvelden)', checked: false },
				{ id: 'comfy-shoes', text: 'Gode gåsko (mye gåing!)', checked: false },
				{ id: 'nice-shoes', text: 'Pene sko til VIBE-middag', checked: false },
				{ id: 'flip-flops', text: 'Flip-flops (termalbad + hotell)', checked: false },
				{ id: 'underwear', text: 'Undertøy og sokker (4 dager)', checked: false },
			],
		},
		{
			title: 'Aktiviteter & Diverse', key: 'misc',
			items: [
				{ id: 'swimwear', text: 'Badetøy (Széchenyi termalbad)', checked: false },
				{ id: 'gym-wear', text: 'Lett treningstøy (morgentur / gym)', checked: false },
				{ id: 'sunglasses', text: 'Solbriller', checked: false },
				{ id: 'meds', text: 'Medisiner / personlige ting', checked: false },
			],
		},
	];

	let { onhide = () => {} }: { onhide?: () => void } = $props();

	let groups = $state<CheckGroup[]>(structuredClone(defaultGroups));
	let loaded = $state(false);
	let editing = $state(false);
	let hidden = $state(false);
	let newItemTexts = $state<Record<string, string>>({});
	let toast = $state('');

	onMount(async () => {
		const data = await loadState<ChecklistData>('checklist');
		if (data) {
			// Apply custom items
			if (data.custom) {
				for (const group of groups) {
					const extras = data.custom[group.key];
					if (extras) {
						for (const e of extras) {
							if (!group.items.some(i => i.id === e.id)) {
								group.items.push({ id: e.id, text: e.text, checked: false });
							}
						}
					}
				}
			}
			// Apply checked state
			if (data.checked) {
				for (const group of groups) {
					for (const item of group.items) {
						if (data.checked[item.id] !== undefined) item.checked = data.checked[item.id];
					}
				}
			}
			// Apply hidden
			if (data.hidden) hidden = true;
		}
		loaded = true;
	});

	function getStateSnapshot(): ChecklistData {
		const checked: Record<string, boolean> = {};
		for (const group of groups) {
			for (const item of group.items) {
				checked[item.id] = item.checked;
			}
		}
		const custom: Record<string, { id: string; text: string }[]> = {};
		const defaultIds = new Set(defaultGroups.flatMap(g => g.items.map(i => i.id)));
		for (const group of groups) {
			const extras = group.items.filter(i => !defaultIds.has(i.id));
			if (extras.length > 0) {
				custom[group.key] = extras.map(i => ({ id: i.id, text: i.text }));
			}
		}
		return { checked, custom, hidden };
	}

	async function save() {
		const ok = await saveState('checklist', getStateSnapshot());
		if (!ok) showToast('Kunne ikke lagre — prøv igjen');
	}

	function toggle(item: CheckItem) {
		item.checked = !item.checked;
		save();
	}

	function addItem(group: CheckGroup) {
		const text = newItemTexts[group.key]?.trim();
		if (!text) return;
		const id = `custom-${group.key}-${Date.now()}`;
		group.items.push({ id, text, checked: false });
		newItemTexts[group.key] = '';
		save();
	}

	function removeItem(group: CheckGroup, item: CheckItem) {
		const idx = group.items.indexOf(item);
		if (idx >= 0) group.items.splice(idx, 1);
		save();
	}

	function checkedCount(items: CheckItem[]): number {
		return items.filter(i => i.checked).length;
	}

	function hideChecklist() {
		hidden = true;
		onhide();
		save();
	}

	export function restore() {
		hidden = false;
		save();
	}

	function showToast(msg: string) {
		toast = msg;
		setTimeout(() => toast = '', 2500);
	}

	function isCustom(id: string): boolean {
		return id.startsWith('custom-');
	}
</script>

{#if loaded && !hidden}
<div class="checklist">
	<div class="checklist-header">
		<button class="edit-btn" onclick={() => editing = !editing}>
			{editing ? 'Ferdig' : 'Rediger'}
		</button>
	</div>
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
				<div class="check-row">
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
					{#if editing && isCustom(item.id)}
						<button class="remove-btn" onclick={() => removeItem(group, item)} aria-label="Fjern">&#215;</button>
					{/if}
				</div>
			{/each}
			{#if editing}
				<form class="add-form" onsubmit={(e) => { e.preventDefault(); addItem(group); }}>
					<input
						type="text"
						placeholder="Legg til..."
						bind:value={newItemTexts[group.key]}
					/>
					<button type="submit" class="add-btn">+</button>
				</form>
			{/if}
		</div>
	{/each}
	<div class="checklist-footer">
		{#if editing}
			<button class="hide-btn" onclick={hideChecklist}>Skjul sjekkliste</button>
		{/if}
	</div>
</div>
{/if}

{#if toast}
	<div class="toast">{toast}</div>
{/if}

<style>
	.checklist {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		box-shadow: var(--shadow);
	}

	.checklist-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 0.5rem;
	}

	.edit-btn {
		background: none;
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.25rem 0.65rem;
		font-size: 0.75rem;
		font-weight: 500;
		font-family: inherit;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.15s;
	}

	.edit-btn:hover {
		color: var(--accent);
		border-color: var(--accent);
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

	.check-row {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.check-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex: 1;
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

	.check-item.checked { opacity: 0.5; }
	.check-item.checked .check-text { text-decoration: line-through; }

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

	.remove-btn {
		background: none;
		border: none;
		font-size: 1.1rem;
		color: var(--text-muted);
		cursor: pointer;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		line-height: 1;
		transition: all 0.15s;
	}

	.remove-btn:hover {
		color: #c62828;
		background: #fce4ec;
	}

	.add-form {
		display: flex;
		gap: 0.35rem;
		margin-top: 0.35rem;
	}

	.add-form input {
		flex: 1;
		padding: 0.4rem 0.6rem;
		border: 1px dashed var(--border);
		border-radius: 6px;
		font-size: 0.8rem;
		font-family: inherit;
		background: var(--bg);
		color: var(--text);
		outline: none;
	}

	.add-form input:focus {
		border-color: var(--accent);
		border-style: solid;
	}

	.add-form input::placeholder {
		color: var(--text-muted);
		opacity: 0.6;
	}

	.add-btn {
		background: var(--accent);
		color: white;
		border: none;
		border-radius: 6px;
		width: 30px;
		height: 30px;
		font-size: 1.1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.15s;
	}

	.add-btn:hover { opacity: 0.8; }

	.checklist-footer {
		display: flex;
		justify-content: center;
		margin-top: 0.5rem;
	}

	.hide-btn {
		background: none;
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 0.35rem 0.75rem;
		font-size: 0.75rem;
		font-family: inherit;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.15s;
	}

	.hide-btn:hover {
		color: #c62828;
		border-color: #c62828;
	}

	.toast {
		position: fixed;
		bottom: 5rem;
		left: 50%;
		transform: translateX(-50%);
		background: #c62828;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.8rem;
		font-weight: 500;
		z-index: 200;
		animation: toast-in 0.2s ease;
	}

	@keyframes toast-in {
		from { opacity: 0; transform: translateX(-50%) translateY(10px); }
		to { opacity: 1; transform: translateX(-50%) translateY(0); }
	}
</style>
