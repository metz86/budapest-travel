import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const url =
		'https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=47.4979&lon=19.0402&altitude=96';

	const res = await fetch(url, {
		headers: {
			'User-Agent': 'budapest-travel/1.0 github.com/budapest-travel',
		},
	});

	if (!res.ok) {
		return new Response(JSON.stringify({ error: 'Weather API error' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const data = await res.json();

	// Extract next 4 days of daily forecasts
	const timeseries = data.properties?.timeseries ?? [];

	// Group by date (Budapest is UTC+2 in April / CEST)
	const dailyMap = new Map<
		string,
		{ temps: number[]; mins: number[]; maxs: number[]; precip: number[]; symbols: string[] }
	>();

	for (const entry of timeseries) {
		// Convert to Budapest time (UTC+2)
		const utcDate = new Date(entry.time);
		const budapestDate = new Date(utcDate.getTime() + 2 * 60 * 60 * 1000);
		const dateStr = budapestDate.toISOString().slice(0, 10);

		if (!dailyMap.has(dateStr)) {
			dailyMap.set(dateStr, { temps: [], mins: [], maxs: [], precip: [], symbols: [] });
		}
		const day = dailyMap.get(dateStr)!;

		const instant = entry.data?.instant?.details;
		if (instant?.air_temperature != null) {
			day.temps.push(instant.air_temperature);
		}

		const next6 = entry.data?.next_6_hours;
		if (next6) {
			if (next6.details?.air_temperature_min != null) day.mins.push(next6.details.air_temperature_min);
			if (next6.details?.air_temperature_max != null) day.maxs.push(next6.details.air_temperature_max);
			if (next6.details?.precipitation_amount != null) day.precip.push(next6.details.precipitation_amount);
		}

		// Prefer next_12_hours symbol for midday, fallback to next_6_hours
		const hour = budapestDate.getUTCHours();
		if (hour >= 10 && hour <= 14) {
			const sym =
				entry.data?.next_12_hours?.summary?.symbol_code ??
				entry.data?.next_6_hours?.summary?.symbol_code;
			if (sym) day.symbols.push(sym);
		}
	}

	// Build 4-day forecast starting from today
	const today = new Date();
	const todayBudapest = new Date(today.getTime() + 2 * 60 * 60 * 1000);
	const todayStr = todayBudapest.toISOString().slice(0, 10);

	const days: {
		date: string;
		tempMin: number;
		tempMax: number;
		precip: number;
		symbol: string;
	}[] = [];

	for (let i = 0; i < 4; i++) {
		const d = new Date(todayBudapest);
		d.setDate(d.getDate() + i);
		const dateStr = d.toISOString().slice(0, 10);
		const day = dailyMap.get(dateStr);

		if (!day || day.temps.length === 0) continue;

		const tempMin =
			day.mins.length > 0 ? Math.round(Math.min(...day.mins)) : Math.round(Math.min(...day.temps));
		const tempMax =
			day.maxs.length > 0 ? Math.round(Math.max(...day.maxs)) : Math.round(Math.max(...day.temps));
		const precip = Math.round(day.precip.reduce((a, b) => a + b, 0) * 10) / 10;
		const symbol = day.symbols[0] ?? 'cloudy';

		days.push({ date: dateStr, tempMin, tempMax, precip, symbol });
	}

	return new Response(JSON.stringify({ days }), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=1800',
		},
	});
};
