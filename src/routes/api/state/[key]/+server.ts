import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { RequestHandler } from './$types';

const VALID_KEYS = new Set(['checklist', 'itinerary', 'restaurants']);

function getFilePath(key: string): string {
	return resolve('data', `${key}.json`);
}

export const GET: RequestHandler = async ({ params }) => {
	const { key } = params;
	if (!VALID_KEYS.has(key)) {
		return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 400 });
	}

	try {
		const content = await readFile(getFilePath(key), 'utf-8');
		return new Response(content, {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch {
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

	try {
		const body = await request.json();
		await writeFile(getFilePath(key), JSON.stringify(body, null, 2), 'utf-8');
		return new Response(JSON.stringify({ ok: true }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		return new Response(JSON.stringify({ ok: false, error: String(err) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
