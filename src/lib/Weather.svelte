<script lang="ts">
	import { onMount } from 'svelte';

	type DayForecast = {
		date: string;
		tempMin: number;
		tempMax: number;
		precip: number;
		symbol: string;
	};

	let days = $state<DayForecast[]>([]);
	let loading = $state(true);
	let error = $state(false);

	const dayNames: Record<number, string> = {
		0: 'Søn',
		1: 'Man',
		2: 'Tir',
		3: 'Ons',
		4: 'Tor',
		5: 'Fre',
		6: 'Lør',
	};

	function formatDate(dateStr: string): { day: string; date: string; isToday: boolean } {
		const d = new Date(dateStr + 'T12:00:00');
		const now = new Date();
		const isToday =
			d.getDate() === now.getDate() &&
			d.getMonth() === now.getMonth() &&
			d.getFullYear() === now.getFullYear();
		return {
			day: isToday ? 'I dag' : dayNames[d.getDay()] ?? '',
			date: `${d.getDate()}.${d.getMonth() + 1}`,
			isToday,
		};
	}

	function iconUrl(symbol: string): string {
		return `https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/${symbol}.svg`;
	}

	onMount(async () => {
		try {
			const res = await fetch('/api/weather');
			if (!res.ok) throw new Error();
			const data = await res.json();
			days = data.days;
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="weather-loading">Henter vær...</div>
{:else if error}
	<div class="weather-error">
		<p>Kunne ikke hente værdata.</p>
		<a href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-3054643/Ungarn/Budapest/Budapest" target="_blank" rel="noopener">Se på yr.no &#8599;</a>
	</div>
{:else}
	<div class="weather">
		<div class="weather-header">
			<span class="weather-title">Vær i Budapest</span>
			<a class="weather-link" href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-3054643/Ungarn/Budapest/Budapest" target="_blank" rel="noopener">yr.no &#8599;</a>
		</div>
		<div class="weather-grid">
			{#each days as day}
				{@const fmt = formatDate(day.date)}
				<div class="weather-day" class:today={fmt.isToday}>
					<span class="weather-day-name">{fmt.day}</span>
					<span class="weather-day-date">{fmt.date}</span>
					<img src={iconUrl(day.symbol)} alt={day.symbol} class="weather-icon" width="40" height="40" />
					<div class="weather-temps">
						<span class="temp-max">{day.tempMax}°</span>
						<span class="temp-min">{day.tempMin}°</span>
					</div>
					{#if day.precip > 0}
						<span class="weather-precip">{day.precip} mm</span>
					{/if}
				</div>
			{/each}
		</div>
		<p class="weather-credit">Data fra <a href="https://www.met.no/" target="_blank" rel="noopener">MET Norway</a></p>
	</div>
{/if}

<style>
	.weather {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		box-shadow: var(--shadow);
	}

	.weather-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.weather-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--accent);
	}

	.weather-link {
		font-size: 0.75rem;
		font-weight: 500;
	}

	.weather-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
		text-align: center;
	}

	.weather-day {
		padding: 0.5rem 0.25rem;
		border-radius: 8px;
		transition: background 0.15s;
	}

	.weather-day.today {
		background: var(--accent-light);
	}

	.weather-day-name {
		display: block;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.weather-day-date {
		display: block;
		font-size: 0.7rem;
		color: var(--text-muted);
		margin-bottom: 0.35rem;
	}

	.weather-icon {
		display: block;
		margin: 0 auto 0.25rem;
	}

	.weather-temps {
		display: flex;
		justify-content: center;
		gap: 0.35rem;
		font-size: 0.85rem;
		font-variant-numeric: tabular-nums;
	}

	.temp-max {
		font-weight: 700;
	}

	.temp-min {
		color: var(--text-muted);
	}

	.weather-precip {
		display: block;
		font-size: 0.7rem;
		color: #1565c0;
		margin-top: 0.15rem;
	}

	:global([data-theme="dark"]) .weather-precip {
		color: #64b5f6;
	}

	.weather-credit {
		font-size: 0.65rem;
		color: var(--text-muted);
		margin-top: 0.5rem;
		text-align: right;
	}

	.weather-loading, .weather-error {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		box-shadow: var(--shadow);
		font-size: 0.85rem;
		color: var(--text-muted);
		text-align: center;
	}
</style>
