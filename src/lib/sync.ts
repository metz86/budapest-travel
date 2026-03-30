// Sync utility: reads/writes to server API backed by Supabase PostgreSQL.
// On window focus, components can re-poll to pick up changes from other devices.

type DataFile = 'checklist' | 'itinerary' | 'restaurants';

export async function loadState<T>(file: DataFile): Promise<T | null> {
	try {
		const res = await fetch(`/api/state/${file}`, {
			cache: 'no-store',
		});
		if (res.ok) {
			return await res.json();
		}
		console.warn(`loadState(${file}) failed:`, res.status, await res.text());
	} catch (err) {
		console.warn(`loadState(${file}) error:`, err);
	}
	return null;
}

export async function saveState<T>(file: DataFile, data: T): Promise<boolean> {
	try {
		const res = await fetch(`/api/state/${file}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			cache: 'no-store',
		});
		if (!res.ok) {
			console.warn(`saveState(${file}) failed:`, res.status, await res.text());
		}
		return res.ok;
	} catch (err) {
		console.warn(`saveState(${file}) error:`, err);
		return false;
	}
}

// Helper: call a refresh function when the window regains focus
export function onFocusRefresh(refreshFn: () => void): () => void {
	const handler = () => refreshFn();
	window.addEventListener('focus', handler);
	return () => window.removeEventListener('focus', handler);
}
