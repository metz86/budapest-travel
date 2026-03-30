import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const VALID_KEYS = new Set(['checklist', 'itinerary', 'restaurants']);

// Module-level connection — reused across requests within the same serverless invocation
let sql: ReturnType<typeof postgres> | null = null;

function getSql() {
	if (sql) return sql;
	const url = env.DATABASE_URL;
	if (!url) return null;
	sql = postgres(url, {
		max: 1,
		idle_timeout: 20,
		connect_timeout: 10,
		prepare: false,
		ssl: 'require',
	});
	return sql;
}

export const GET: RequestHandler = async ({ params }) => {
	const { key } = params;
	if (!VALID_KEYS.has(key)) {
		return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 400 });
	}

	const db = getSql();
	if (!db) {
		return new Response(JSON.stringify({ error: 'No DATABASE_URL configured' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const rows = await db`select value from kv_store where key = ${key}`;
		const value = rows[0]?.value ?? {};
		return new Response(JSON.stringify(value), {
			headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
		});
	} catch (err) {
		console.error(`GET /api/state/${key} error:`, err);
		return new Response(JSON.stringify({ error: String(err) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const { key } = params;
	if (!VALID_KEYS.has(key)) {
		return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 400 });
	}

	const db = getSql();
	if (!db) {
		return new Response(JSON.stringify({ error: 'No DATABASE_URL configured' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const body = await request.json();

	try {
		await db`
			insert into kv_store (key, value, updated_at)
			values (${key}, ${JSON.stringify(body)}::jsonb, now())
			on conflict (key) do update set value = ${JSON.stringify(body)}::jsonb, updated_at = now()
		`;
		return new Response(JSON.stringify({ ok: true }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error(`PUT /api/state/${key} error:`, err);
		return new Response(JSON.stringify({ ok: false, error: String(err) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
