// Sync utility: optimistic localStorage + server JSON files
// Components update localStorage instantly, then sync to server in background.
// On load, server state wins (it's the shared truth).

type DataFile = 'checklist' | 'itinerary' | 'restaurants';

export async function loadState<T>(file: DataFile): Promise<T | null> {
	try {
		const res = await fetch(`/api/state/${file}`);
		if (res.ok) {
			return await res.json();
		}
	} catch {}
	return null;
}

export async function saveState<T>(file: DataFile, data: T): Promise<boolean> {
	try {
		const res = await fetch(`/api/state/${file}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		return res.ok;
	} catch {
		return false;
	}
}
