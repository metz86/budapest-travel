<script lang="ts">
	import '../app.css';
	let { children } = $props();

	const sections = [
		{ id: 'oversikt', label: 'Oversikt' },
		{ id: 'fly', label: 'Fly' },
		{ id: 'hotell', label: 'Hotell' },
		{ id: 'transport', label: 'Transport' },
		{ id: 'dagsplan', label: 'Dagsplan' },
		{ id: 'restauranter', label: 'Mat' },
		{ id: 'attraksjoner', label: 'Attraksjoner' },
		{ id: 'budsjett', label: 'Budsjett' },
	];

	let menuOpen = $state(false);
</script>

<svelte:head>
	<title>Budapest 10.–13. april</title>
	<meta name="description" content="Reiseplan for Budapest-tur 10.–13. april" />
</svelte:head>

<header>
	<div class="header-inner">
		<a href="#oversikt" class="logo">Budapest</a>
		<span class="dates">10.–13. april</span>
		<button class="menu-toggle" onclick={() => menuOpen = !menuOpen} aria-label="Meny">
			{#if menuOpen}✕{:else}☰{/if}
		</button>
		<nav class:open={menuOpen}>
			{#each sections as s}
				<a href="#{s.id}" onclick={() => menuOpen = false}>{s.label}</a>
			{/each}
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>

<footer>
	<p>Budapest 2025 — God tur!</p>
</footer>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(250, 249, 247, 0.92);
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
