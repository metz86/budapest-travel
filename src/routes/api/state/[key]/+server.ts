import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const VALID_KEYS = new Set(['checklist', 'itinerary', 'restaurants']);

function getSql() {
	const url = env.DATABASE_URL;
	if (!url) return null;
	return postgres(url, { max: 1 });
}

export const GET: RequestHandler = async ({ params }) => {
	const { key } = params;
	if (!VALID_KEYS.has(key)) {
		return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 400 });
	}

	const sql = getSql();
	if (!sql) {
		// Fallback to local JSON files when no DB configured
		try {
			const { readFile } = await import('fs/promises');
			const { resolve } = await import('path');
			const content = await readFile(resolve('data', `${key}.json`), 'utf-8');
			return new Response(content, { headers: { 'Content-Type': 'application/json' } });
		} catch {
			return new Response(JSON.stringify({}), { headers: { 'Content-Type': 'application/json' } });
		}
	}

	try {
		const rows = await sql`select value from kv_store where key = ${key}`;
		await sql.end();
		const value = rows[0]?.value ?? {};
		return new Response(JSON.stringify(value), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		return new Response(JSON.stringify({}), {
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const { key } = params;
	if (!VALID_KEYS.has(key)) {
		return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 400 });
	}

	const body = await request.json();

	const sql = getSql();
	if (!sql) {
		// Fallback to local JSON files
		try {
			const { writeFile } = await import('fs/promises');
			const { resolve } = await import('path');
			await writeFile(resolve('data', `${key}.json`), JSON.stringify(body, null, 2), 'utf-8');
			return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
		} catch (err) {
			return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
		}
	}

	try {
		await sql`
			insert into kv_store (key, value, updated_at)
			values (${key}, ${JSON.stringify(body)}::jsonb, now())
			on conflict (key) do update set value = ${JSON.stringify(body)}::jsonb, updated_at = now()
		`;
		await sql.end();
		return new Response(JSON.stringify({ ok: true }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
	}
};
