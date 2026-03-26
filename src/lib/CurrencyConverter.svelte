<script lang="ts">
	const RATE = 0.034; // 1 HUF ≈ 0.034 NOK

	let huf = $state('');
	let nok = $derived(huf ? Math.round(parseFloat(huf) * RATE) : '');

	let direction = $state<'huf' | 'nok'>('huf');
	let nokInput = $state('');
	let hufFromNok = $derived(nokInput ? Math.round(parseFloat(nokInput) / RATE) : '');
</script>

<div class="converter">
	<div class="converter-header">Valutakalkulator</div>
	<div class="converter-row">
		<div class="converter-field">
			<label for="huf-input">HUF</label>
			<input
				id="huf-input"
				type="number"
				inputmode="numeric"
				placeholder="f.eks. 5000"
				bind:value={huf}
			/>
		</div>
		<span class="converter-arrow">→</span>
		<div class="converter-field">
			<span class="field-label">NOK</span>
			<div class="converter-result">{nok || '—'}</div>
		</div>
	</div>
	<div class="converter-row">
		<div class="converter-field">
			<label for="nok-input">NOK</label>
			<input
				id="nok-input"
				type="number"
				inputmode="numeric"
				placeholder="f.eks. 200"
				bind:value={nokInput}
			/>
		</div>
		<span class="converter-arrow">→</span>
		<div class="converter-field">
			<span class="field-label">HUF</span>
			<div class="converter-result">{hufFromNok ? hufFromNok.toLocaleString('no-NO') : '—'}</div>
		</div>
	</div>
	<div class="converter-note">Kurs: 1 HUF ≈ 0,034 NOK</div>
</div>

<style>
	.converter {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		box-shadow: var(--shadow);
	}

	.converter-header {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.converter-row {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
		margin-bottom: 0.6rem;
	}

	.converter-field {
		flex: 1;
	}

	.converter-field label,
	.converter-field .field-label {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--text-muted);
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.converter-field input {
		width: 100%;
		padding: 0.5rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		font-size: 1rem;
		font-family: inherit;
		font-variant-numeric: tabular-nums;
		background: var(--bg);
		color: var(--text);
		outline: none;
		transition: border-color 0.15s;
	}

	.converter-field input:focus {
		border-color: var(--accent);
	}

	.converter-field input::placeholder {
		color: var(--border);
	}

	.converter-result {
		padding: 0.5rem 0.65rem;
		font-size: 1rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--text);
	}

	.converter-arrow {
		color: var(--text-muted);
		font-size: 1rem;
		padding-bottom: 0.5rem;
	}

	.converter-note {
		font-size: 0.7rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
	}
</style>
