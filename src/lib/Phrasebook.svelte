<script lang="ts">
	let open = $state(false);

	const phrases = [
		{ no: 'Hei', hu: 'Szia', pron: 'see-ah' },
		{ no: 'God morgen', hu: 'Jó reggelt', pron: 'yoh reg-gelt' },
		{ no: 'God kveld', hu: 'Jó estét', pron: 'yoh esh-tayt' },
		{ no: 'Takk', hu: 'Köszönöm', pron: 'kuh-suh-nuhm' },
		{ no: 'Vær så snill', hu: 'Kérem', pron: 'kay-rem' },
		{ no: 'Ja / Nei', hu: 'Igen / Nem', pron: 'ee-gen / nem' },
		{ no: 'Unnskyld', hu: 'Elnézést', pron: 'el-nay-zaysht' },
		{ no: 'Snakker du engelsk?', hu: 'Beszél angolul?', pron: 'be-sayl on-go-lul' },
		{ no: 'Regningen, takk', hu: 'Számlát kérek', pron: 'saam-laat kay-rek' },
		{ no: 'En øl, takk', hu: 'Egy sört kérek', pron: 'edj shuhrt kay-rek' },
		{ no: 'Vann', hu: 'Víz', pron: 'veez' },
		{ no: 'Kaffe', hu: 'Kávé', pron: 'kaa-vay' },
		{ no: 'Hvor er…?', hu: 'Hol van…?', pron: 'hol von' },
		{ no: 'Toalettet', hu: 'A mosdó', pron: 'ah mosh-doh' },
		{ no: 'Hvor mye koster det?', hu: 'Mennyibe kerül?', pron: 'men-nyi-be ke-ruhl' },
		{ no: 'Skål!', hu: 'Egészségedre!', pron: 'eg-ays-shay-ged-re' },
	];
</script>

<div class="phrasebook">
	<button class="phrasebook-toggle" onclick={() => open = !open}>
		<span class="phrasebook-title">Ungarsk parlør</span>
		<span class="phrasebook-count">{phrases.length} fraser</span>
		<svg class="chevron" class:open width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
	{#if open}
		<div class="phrasebook-list">
			{#each phrases as p}
				<div class="phrase">
					<div class="phrase-no">{p.no}</div>
					<div class="phrase-hu">{p.hu}</div>
					<div class="phrase-pron">{p.pron}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.phrasebook {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.phrasebook-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.25rem;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
	}

	.phrasebook-title {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--text);
	}

	.phrasebook-count {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-left: auto;
	}

	.chevron {
		color: var(--text-muted);
		transition: transform 0.2s;
		flex-shrink: 0;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.phrasebook-list {
		padding: 0 1.25rem 1rem;
	}

	.phrase {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.5rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.85rem;
	}

	.phrase:last-child {
		border-bottom: none;
	}

	.phrase-no {
		color: var(--text-muted);
	}

	.phrase-hu {
		font-weight: 600;
		color: var(--text);
	}

	.phrase-pron {
		color: var(--accent);
		font-style: italic;
		font-size: 0.8rem;
	}

	@media (max-width: 500px) {
		.phrase {
			grid-template-columns: 1fr 1fr;
		}

		.phrase-pron {
			grid-column: 1 / -1;
		}
	}
</style>
