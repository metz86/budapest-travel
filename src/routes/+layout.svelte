<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import DarkModeToggle from '$lib/DarkModeToggle.svelte';
	let { children } = $props();

	const navSections = [
		{ id: 'hjem', label: 'Hjem' },
		{ id: 'dagsplan', label: 'Dagsplan' },
		{ id: 'budsjett', label: 'Budsjett' },
		{ id: 'forberedelser', label: 'Forberedelser' },
	];

	const scrollSections = [
		{ id: 'hjem', label: 'Hjem' },
		{ id: 'dag-1', label: 'Dag 1 — Fredag' },
		{ id: 'dag-2', label: 'Dag 2 — Lørdag' },
		{ id: 'dag-3', label: 'Dag 3 — Søndag' },
		{ id: 'dag-4', label: 'Dag 4 — Mandag' },
		{ id: 'restauranter', label: 'Restauranter' },
		{ id: 'budsjett', label: 'Budsjett' },
		{ id: 'sjekkliste', label: 'Sjekkliste' },
		{ id: 'praktisk', label: 'Praktisk info' },
		{ id: 'suvenirer', label: 'Suvenirer' },
	];

	let menuOpen = $state(false);
	let activeId = $state('hjem');
	let activeScrollIdx = $state(0);

	function toNavId(id: string): string {
		if (id.startsWith('dag-') || id === 'restauranter' || id === 'attraksjoner') return 'dagsplan';
		if (id === 'sjekkliste' || id === 'praktisk' || id === 'parlor' || id === 'suvenirer') return 'forberedelser';
		return id;
	}

	$effect(() => {
		activeScrollIdx = scrollSections.findIndex(s => s.id === activeId);
		if (activeScrollIdx < 0) activeScrollIdx = 0;
	});

	let prevSection = $derived(activeScrollIdx > 0 ? scrollSections[activeScrollIdx - 1] : null);
	let nextSection = $derived(activeScrollIdx < scrollSections.length - 1 ? scrollSections[activeScrollIdx + 1] : null);

	function handleNavClick(id: string) {
		activeId = id;
		menuOpen = false;
	}

	function goTo(id: string) {
		activeId = id;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	function updateActiveFromScroll() {
		const threshold = 120;
		let current = scrollSections[0].id;

		for (const s of scrollSections) {
			const el = document.getElementById(s.id);
			if (!el) continue;
			const rect = el.getBoundingClientRect();
			if (rect.top <= threshold) {
				current = s.id;
			} else {
				break;
			}
		}

		activeId = current;
	}

	onMount(() => {
		let ticking = false;
		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(() => {
					updateActiveFromScroll();
					ticking = false;
				});
				ticking = true;
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		updateActiveFromScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<title>Budapest 10.–13. april</title>
	<meta name="description" content="Reiseplan for Budapest-tur 10.–13. april" />
</svelte:head>

<header>
	<div class="header-inner">
		<a href="#hjem" class="logo" onclick={() => handleNavClick('hjem')}>Budapest</a>
		<span class="dates">10.–13. april</span>
		<DarkModeToggle />
		<button class="menu-toggle" onclick={() => menuOpen = !menuOpen} aria-label="Meny">
			{#if menuOpen}✕{:else}☰{/if}
		</button>
		<nav class:open={menuOpen}>
			{#each navSections as s}
				<a
					href="#{s.id}"
					class:active={toNavId(activeId) === s.id}
					onclick={() => handleNavClick(s.id)}
				>{s.label}</a>
			{/each}
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>

<!-- Section navigator -->
<div class="section-nav">
	{#if prevSection}
		<button class="nav-btn nav-up" onclick={() => goTo(prevSection.id)} aria-label="Forrige: {prevSection.label}">
			<svg width="20" height="20" viewBox="0 0 16 16" fill="none">
				<path d="M3 10L8 5L13 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<span class="nav-label">{prevSection.label}</span>
		</button>
	{/if}
	{#if nextSection}
		<button class="nav-btn nav-down" onclick={() => goTo(nextSection.id)} aria-label="Neste: {nextSection.label}">
			<span class="nav-label">{nextSection.label}</span>
			<svg width="20" height="20" viewBox="0 0 16 16" fill="none">
				<path d="M3 6L8 11L13 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	{/if}
</div>

<footer>
	<p>Budapest 2026 — God tur!</p>
</footer>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--header-bg);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}

	.header-inner {
		max-width: 800px;
		margin: 0 auto;
		padding: 0.75rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo {
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--text);
		text-decoration: none;
	}

	.dates {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-right: auto;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		font-size: 1.3rem;
		cursor: pointer;
		color: var(--text);
	}

	nav {
		display: flex;
		gap: 0.25rem;
	}

	nav a {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-muted);
		padding: 0.35rem 0.65rem;
		border-radius: 6px;
		transition: all 0.15s;
		text-decoration: none;
	}

	nav a:hover {
		background: var(--accent-light);
		color: var(--accent);
		text-decoration: none;
	}

	nav a.active {
		background: var(--accent);
		color: white;
	}

	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 1.5rem 1.25rem 4rem;
	}

	footer {
		text-align: center;
		padding: 2rem 1rem;
		font-size: 0.8rem;
		color: var(--text-muted);
		border-top: 1px solid var(--border);
	}

	/* Section navigator — desktop: anchored next to content */
	.section-nav {
		position: fixed;
		/* Place just to the right of the 800px content column */
		left: calc(50% + 420px);
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		z-index: 90;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 12px;
		box-shadow: var(--shadow-lg);
		cursor: pointer;
		color: var(--text-muted);
		font-size: 0.85rem;
		font-weight: 500;
		font-family: inherit;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.nav-btn:hover {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
		box-shadow: 0 4px 16px rgba(196, 85, 58, 0.25);
	}

	.nav-btn:hover svg {
		color: white;
	}

	.nav-btn svg {
		flex-shrink: 0;
		color: var(--accent);
		transition: color 0.2s;
	}

	/* Tablet — buttons still visible but compact */
	@media (max-width: 1100px) {
		.section-nav {
			position: fixed;
			left: auto;
			right: auto;
			left: 50%;
			top: auto;
			bottom: 1.25rem;
			transform: translateX(-50%);
			flex-direction: row;
			gap: 0.5rem;
		}

		.nav-label {
			display: none;
		}

		.nav-btn {
			padding: 0.7rem;
			border-radius: 50%;
			width: 44px;
			height: 44px;
			justify-content: center;
			background: var(--nav-btn-bg);
			backdrop-filter: blur(12px);
			box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
		}

		.nav-btn svg {
			width: 20px;
			height: 20px;
		}
	}

	@media (max-width: 700px) {
		.menu-toggle {
			display: block;
		}

		nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			background: var(--bg-card);
			border-bottom: 1px solid var(--border);
			padding: 0.5rem;
			box-shadow: var(--shadow-lg);
		}

		nav.open {
			display: flex;
		}

		nav a {
			padding: 0.6rem 1rem;
			font-size: 0.9rem;
		}
	}
</style>
