<script lang="ts">
	import { onMount } from 'svelte';

	// Trip dates in Budapest time (UTC+2 CEST for April)
	const tripDays = [
		new Date('2026-04-10T00:00:00+02:00'),
		new Date('2026-04-11T00:00:00+02:00'),
		new Date('2026-04-12T00:00:00+02:00'),
		new Date('2026-04-13T00:00:00+02:00'),
	];
	const tripStart = tripDays[0];
	const tripEnd = new Date('2026-04-14T00:00:00+02:00');

	let now = $state(new Date());
	let status = $derived(getStatus(now));

	function getStatus(date: Date) {
		if (date < tripStart) {
			const diff = tripStart.getTime() - date.getTime();
			const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
			return { type: 'before' as const, days, dayNum: 0 };
		}
		if (date >= tripEnd) {
			return { type: 'after' as const, days: 0, dayNum: 0 };
		}
		// During trip
		let dayNum = 1;
		for (let i = tripDays.length - 1; i >= 0; i--) {
			if (date >= tripDays[i]) {
				dayNum = i + 1;
				break;
			}
		}
		return { type: 'during' as const, days: 0, dayNum };
	}

	onMount(() => {
		const interval = setInterval(() => { now = new Date(); }, 60000);
		return () => clearInterval(interval);
	});
</script>

<div class="now-indicator">
	{#if status.type === 'before'}
		<div class="now-badge countdown">
			<span class="now-num">{status.days}</span>
			<span class="now-text">{status.days === 1 ? 'dag igjen' : 'dager igjen'}</span>
		</div>
	{:else if status.type === 'during'}
		<div class="now-badge active">
			<span class="now-pulse"></span>
			<span class="now-text">Dag {status.dayNum} av 4</span>
		</div>
	{:else}
		<div class="now-badge past">
			<span class="now-text">Reisen er fullført</span>
		</div>
	{/if}
</div>

<style>
	.now-indicator {
		display: inline-flex;
	}

	.now-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.now-badge.countdown {
		background: var(--accent-light);
		color: var(--accent);
	}

	.now-num {
		font-size: 1.1rem;
		font-weight: 700;
	}

	.now-badge.active {
		background: #e8f5e9;
		color: #2e7d32;
	}

	:global([data-theme="dark"]) .now-badge.active {
		background: #1b3d1f;
		color: #66bb6a;
	}

	.now-pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #4caf50;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.now-badge.past {
		background: var(--border);
		color: var(--text-muted);
	}
</style>
