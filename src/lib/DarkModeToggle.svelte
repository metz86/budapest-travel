<script lang="ts">
	import { onMount } from 'svelte';

	let dark = $state(false);

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			dark = true;
		}
		applyTheme();
	});

	function applyTheme() {
		document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	function toggle() {
		dark = !dark;
		applyTheme();
	}
</script>

<button class="theme-toggle" onclick={toggle} aria-label={dark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}>
	{#if dark}
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<circle cx="9" cy="9" r="4" stroke="currentColor" stroke-width="1.5"/>
			<path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.3 3.3l1.4 1.4M13.3 13.3l1.4 1.4M3.3 14.7l1.4-1.4M13.3 4.7l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
		</svg>
	{:else}
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path d="M15.1 10.4A6.5 6.5 0 017.6 2.9a7 7 0 107.5 7.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-muted);
		padding: 0.35rem;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
	}

	.theme-toggle:hover {
		background: var(--accent-light);
		color: var(--accent);
	}
</style>
