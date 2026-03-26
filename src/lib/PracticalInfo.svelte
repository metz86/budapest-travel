<script lang="ts">
	import CopyButton from './CopyButton.svelte';
</script>

<div class="practical">
	<div class="practical-grid">
		<div class="info-card emergency">
			<div class="info-icon">&#128680;</div>
			<div class="info-title">Nødnummer</div>
			<div class="info-value">112</div>
			<p class="info-note">Fungerer i hele EU</p>
		</div>

		<div class="info-card">
			<div class="info-icon">&#127963;</div>
			<div class="info-title">Norsk ambassade</div>
			<div class="info-detail">
				<p>Ostrom utca 13, 1015 Budapest</p>
				<p class="info-phone">+36 1 325 3300</p>
				<CopyButton text="+36 1 325 3300" label="Kopier tlf" />
			</div>
		</div>

		<div class="info-card">
			<div class="info-icon">&#128660;</div>
			<div class="info-title">Taxi / Transport</div>
			<div class="info-detail">
				<p><strong>Bolt</strong> — anbefalt taxi-app</p>
				<p class="info-note">Billigere og tryggere enn gatebil</p>
			</div>
		</div>

		<div class="info-card">
			<div class="info-icon">&#128176;</div>
			<div class="info-title">Tips / Drikkepenger</div>
			<div class="info-detail">
				<p><strong>Restaurant:</strong> 10–15 %</p>
				<p><strong>Bar/kafé:</strong> Rund opp</p>
				<p><strong>Taxi:</strong> Rund opp</p>
				<p class="info-note">Sjekk om service er inkludert</p>
			</div>
		</div>

		<div class="info-card">
			<div class="info-icon">&#128138;</div>
			<div class="info-title">Apotek (Gyógyszertár)</div>
			<div class="info-detail">
				<p>Finnes i sentrum, se etter grønt kors</p>
				<p class="info-note">Åpent hverdager 08–18, lørdag 08–13</p>
			</div>
		</div>

		<div class="info-card">
			<div class="info-icon">&#128241;</div>
			<div class="info-title">Nyttige apper</div>
			<div class="info-detail">
				<p><strong>BudapestGO</strong> — kollektivtransport</p>
				<p><strong>Bolt</strong> — taxi</p>
				<p><strong>Google Translate</strong> — ungarsk er vanskelig!</p>
			</div>
		</div>
	</div>
</div>

<style>
	.practical-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 0.75rem;
	}

	.info-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		box-shadow: var(--shadow);
	}

	.info-card.emergency {
		text-align: center;
	}

	.info-icon {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.info-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--accent);
		margin-bottom: 0.35rem;
	}

	.info-value {
		font-size: 1.8rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.info-detail p {
		font-size: 0.85rem;
		margin-bottom: 0.2rem;
	}

	.info-phone {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.info-note {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
	}
</style>
