<script lang="ts">
	import NowIndicator from '$lib/NowIndicator.svelte';
	import CopyButton from '$lib/CopyButton.svelte';
	import CurrencyConverter from '$lib/CurrencyConverter.svelte';
	import Phrasebook from '$lib/Phrasebook.svelte';
	import Checklist from '$lib/Checklist.svelte';
	import PracticalInfo from '$lib/PracticalInfo.svelte';
	import Weather from '$lib/Weather.svelte';

	async function share() {
		const data = {
			title: 'Budapest 10.–13. april 2026',
			text: 'Reiseplan for Budapest-tur!',
			url: window.location.href,
		};
		if (navigator.share) {
			await navigator.share(data);
		} else {
			await navigator.clipboard.writeText(window.location.href);
			alert('Link kopiert!');
		}
	}
</script>

<!-- ============================================ -->
<!-- HJEM — Hero + Reisedetaljer                  -->
<!-- ============================================ -->
<section id="hjem" class="hero">
	<h1>Budapest</h1>
	<p class="subtitle">10.–13. april 2026 &middot; 3 netter</p>
	<div class="now-row">
		<NowIndicator />
	</div>
	<div class="hero-actions">
		<button class="hero-btn" onclick={share}>
			<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 8V13C4 13.55 4.45 14 5 14H11C11.55 14 12 13.55 12 13V8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V10M8 2L5.5 4.5M8 2L10.5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
			Del reiseplan
		</button>
		<a class="hero-btn" href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-3054643/Ungarn/Budapest/Budapest" target="_blank" rel="noopener">
			<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M8 9C8 9 3 12 3 13.5C3 14.33 5.24 15 8 15C10.76 15 13 14.33 13 13.5C13 12 8 9 8 9Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
			Vær i Budapest
		</a>
	</div>
	<div class="quick-facts">
		<div class="fact">
			<span class="fact-icon">&#9992;</span>
			<span>DY1550 / DY1551</span>
		</div>
		<div class="fact">
			<span class="fact-icon">&#127976;</span>
			<span>D8 Hotel, Belváros</span>
		</div>
		<div class="fact">
			<span class="fact-icon">&#127905;</span>
			<span>Termalbad, Ruin Bars, Fine Dining</span>
		</div>
	</div>

	<!-- Weather -->
	<div class="home-block">
		<Weather />
	</div>

	<!-- Reisedetaljer -->
	<div class="home-block">
		<h2>Reisedetaljer</h2>

		<div class="card-grid">
			<div class="card">
				<div class="card-label">Utreise &middot; 10. april</div>
				<div class="card-title">DY1550</div>
				<div class="flight-row">
					<div class="flight-point">
						<span class="time">09:45</span>
						<span class="airport">OSL</span>
					</div>
					<div class="flight-arrow">&#8594;</div>
					<div class="flight-point">
						<span class="time">12:05</span>
						<span class="airport">BUD</span>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-label">Retur &middot; 13. april</div>
				<div class="card-title">DY1551</div>
				<div class="flight-row">
					<div class="flight-point">
						<span class="time">13:00</span>
						<span class="airport">BUD</span>
					</div>
					<div class="flight-arrow">&#8594;</div>
					<div class="flight-point">
						<span class="time">15:25</span>
						<span class="airport">OSL</span>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-title">D8 Hotel</div>
			<p class="card-address">
				Dorottya u. 8, 1051 Budapest
				<CopyButton text="Dorottya u. 8, 1051 Budapest" label="Kopier" />
			</p>
			<div class="detail-grid">
				<div><strong>Innsjekk:</strong> 14:00</div>
				<div><strong>Utsjekk:</strong> 11:00</div>
				<div><strong>Frokost:</strong> Inkludert</div>
				<div><strong>Område:</strong> Belváros (sentrum)</div>
			</div>
			<p class="card-note">Gangavstand til Donau, Váci utca og hovedattraksjoner.</p>
			<a href="https://maps.google.com/?q=D8+Hotel+Budapest+Dorottya+u.+8" target="_blank" rel="noopener" class="map-link">Vis på kart &#8599;</a>
		</div>

		<div class="card-grid">
			<div class="card">
				<div class="card-label">Til/fra flyplass</div>
				<div class="card-title">100E Buss</div>
				<p>Budapest flyplass &harr; Deák Ferenc tér</p>
				<div class="detail-grid">
					<div><strong>Pris:</strong> 2 500 HUF (~85 NOK)</div>
					<div><strong>Reisetid:</strong> 35–40 min</div>
				</div>
				<p class="card-note">Kjøp billett i automat på flyplassen eller i appen.</p>
			</div>
			<div class="card">
				<div class="card-label">Lokal transport</div>
				<div class="card-title">BudapestGO</div>
				<div class="highlight">
					<strong>72-timers Travelcard:</strong> 5 750 HUF (~195 NOK) — ubegrenset i 3 dager.
				</div>
				<div class="link-row">
					<a href="https://play.google.com/store/apps/details?id=hu.webvalto.bkkfutar" target="_blank" rel="noopener">Google Play &#8599;</a>
					<a href="https://apps.apple.com/app/budapestgo/id916193835" target="_blank" rel="noopener">App Store &#8599;</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ============================================ -->
<!-- DAGSPLAN — Itinerary + Restaurants + Sights  -->
<!-- ============================================ -->
<section id="dagsplan">
	<h2>Dagsplan</h2>

	<!-- DAG 1 -->
	<div id="dag-1" class="day">
		<div class="day-header">
			<span class="day-number">Dag 1</span>
			<span class="day-date">Fredag 10. april</span>
			<span class="day-theme">Ankomst & Sentrum</span>
		</div>
		<div class="timeline">
			<div class="tl-item"><div class="tl-time">12:05</div><div class="tl-content"><strong>Ankomst Budapest</strong><p>Landet! Hent bagasje og finn 100E buss.</p></div></div>
			<div class="tl-item"><div class="tl-time">12:30</div><div class="tl-content"><strong>100E buss til sentrum</strong><p>Kjøp billett i automat. Ca. 35–40 min til Deák Ferenc tér.</p></div></div>
			<div class="tl-item"><div class="tl-time">13:15</div><div class="tl-content"><strong>Gange til D8 Hotel</strong><p>Ca. 5 min fra Deák Ferenc tér. Lever bagasje / tidlig innsjekk.</p></div></div>
			<div class="tl-item"><div class="tl-time">14:00</div><div class="tl-content"><strong>Innsjekk D8 Hotel</strong><p>Frisk opp, bytt klær, klar for byen!</p></div></div>
			<div class="tl-item"><div class="tl-time">14:30</div><div class="tl-content"><strong>Lunsj / snack i sentrum</strong><p>Grip noe lett å spise — dere har en stor middag senere.</p></div></div>
			<div class="tl-item"><div class="tl-time">15:30</div><div class="tl-content"><strong>Shopping & rusletur</strong><ul><li><a href="https://maps.google.com/?q=Váci+utca+Budapest" target="_blank" rel="noopener">Váci utca</a> — hovedhandlegate</li><li><a href="https://maps.google.com/?q=Deák+Ferenc+utca+Budapest" target="_blank" rel="noopener">Deák Ferenc utca</a> — butikker og byliv</li><li><a href="https://maps.google.com/?q=Paloma+Budapest" target="_blank" rel="noopener">Paloma Artspace</a> — design, kunst, lokale produkter</li><li><a href="https://maps.google.com/?q=Párisi+Udvar+Budapest" target="_blank" rel="noopener">Párisi Udvar</a> — historisk shoppingarkade</li></ul></div></div>
			<div class="tl-item"><div class="tl-time">18:00</div><div class="tl-content"><strong>Drink: High Note SkyBar</strong><p>Rooftop-bar med panoramautsikt over Budapest. Perfekt start på kvelden!</p><div class="tl-links"><a href="https://highnoteskybar.hu/" target="_blank" rel="noopener">highnoteskybar.hu &#8599;</a><a href="https://maps.google.com/?q=High+Note+SkyBar+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div></div>
			<div class="tl-item"><div class="tl-time">20:00</div><div class="tl-content"><strong>Middag: VIBE Budapest</strong><p>Moderne fine dining / tasting menu. Ca. 6 min gange fra hotellet.</p><p class="cost">~46 000 HUF / ~1 550 NOK per pers. (inkl. service)</p><div class="tl-links"><a href="https://vibebudapest.com/en" target="_blank" rel="noopener">vibebudapest.com &#8599;</a><a href="https://maps.google.com/?q=VIBE+Budapest+restaurant" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div></div>
		</div>
	</div>

	<!-- DAG 2 -->
	<div id="dag-2" class="day">
		<div class="day-header">
			<span class="day-number">Dag 2</span>
			<span class="day-date">Lørdag 11. april</span>
			<span class="day-theme">Jødisk kvarter & Ruin Bars</span>
		</div>
		<div class="timeline">
			<div class="tl-item"><div class="tl-time">07:30</div><div class="tl-content"><strong>Frokost på hotellet</strong></div></div>
			<div class="tl-item"><div class="tl-time">08:15</div><div class="tl-content"><strong>Fisherman's Bastion</strong><p>Best lys og minst folk tidlig. Ta trikk/buss over til Buda-siden.</p><a href="https://maps.google.com/?q=Fisherman's+Bastion+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">09:30</div><div class="tl-content"><strong>Tilbake til Pest-siden</strong><p>Trikk/buss tilbake over Donau.</p></div></div>
			<div class="tl-item"><div class="tl-time">10:00</div><div class="tl-content"><strong>Arán Bakery Budapest</strong><p>Kaffe og noe søtt. Perfekt pause før resten av dagen.</p><a href="https://maps.google.com/?q=Arán+Bakery+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">11:00</div><div class="tl-content"><strong>Neverland Bar & Escape Room</strong><p>Escape room-opplevelse i ruin bar-området. Ca. 60–90 min.</p><p class="cost">~11 000 HUF / ~370 NOK per pers.</p><a href="https://maps.google.com/?q=Neverland+Escape+Room+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">12:30</div><div class="tl-content"><strong>Lunsj i området</strong><p>Mange muligheter rundt Gozsdu Udvar og det jødiske kvarteret.</p></div></div>
			<div class="tl-item"><div class="tl-time">13:30</div><div class="tl-content"><strong>Gozsdu Udvar</strong><p>Spaser gjennom passasjen — restauranter, barer og butikker.</p><a href="https://maps.google.com/?q=Gozsdu+Udvar+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">14:15</div><div class="tl-content"><strong>Den store synagogen</strong><p>Europas største synagoge + Livets tre-minnemonument (utvendig).</p><a href="https://maps.google.com/?q=Dohány+Street+Synagogue+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">15:00</div><div class="tl-content"><strong>Utforsk kvarteret</strong><p>Rolig tempo — street art, kafeer, butikker i det jødiske kvarteret.</p></div></div>
			<div class="tl-item"><div class="tl-time">16:30</div><div class="tl-content"><strong>Szimpla Kert</strong><p>Budapests mest kjente ruin bar. Verd et besøk mens det fortsatt er dagslys!</p><a href="https://maps.google.com/?q=Szimpla+Kert+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">18:00</div><div class="tl-content"><strong>Tilbake til hotellet</strong><p>Hvil og frisk opp før middagen.</p></div></div>
			<div class="tl-item"><div class="tl-time">20:00</div><div class="tl-content"><strong>Middag: Mazel Tov</strong><p>Moderne middelhavs-mat i vakre omgivelser. Booking anbefales!</p><p class="cost">~40–50 EUR / ~450–560 NOK per pers.</p><a href="https://maps.google.com/?q=Mazel+Tov+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">22:00</div><div class="tl-content"><strong>360 Bar</strong><p>Rooftop-drink med utsikt over byen.</p><a href="https://maps.google.com/?q=360+Bar+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">23:30</div><div class="tl-content"><strong>Spasertur tilbake</strong><p>Via Operaen og St. Stephen's Basilica (opplyst). Ca. 15–20 min.</p></div></div>
		</div>
	</div>

	<!-- DAG 3 -->
	<div id="dag-3" class="day">
		<div class="day-header">
			<span class="day-number">Dag 3</span>
			<span class="day-date">Søndag 12. april</span>
			<span class="day-theme">Spa & Avslapping</span>
		</div>
		<div class="timeline">
			<div class="tl-item"><div class="tl-time">08:00</div><div class="tl-content"><strong>Frokost på hotellet</strong></div></div>
			<div class="tl-item"><div class="tl-time">09:00</div><div class="tl-content"><strong>Széchenyi Termalbad</strong><p>Europas største termalbad. Kom tidlig for å unngå køer! Ta metro M1 (gul linje) til Széchenyi fürdő.</p><div class="tl-links"><a href="https://www.szechenyibath.hu/" target="_blank" rel="noopener">szechenyibath.hu &#8599;</a><a href="https://maps.google.com/?q=Széchenyi+thermal+bath+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div></div>
			<div class="tl-item"><div class="tl-time">12:30</div><div class="tl-content"><strong>Lunsj ved Városliget</strong><p>Spis i nærheten av Helteplassen / Byparken før dere drar tilbake.</p></div></div>
			<div class="tl-item"><div class="tl-time">14:00</div><div class="tl-content"><strong>Rolig tempo</strong><p>Tilbake til sentrum. Spasertur langs Donau, kafé, shopping — nyt byen i rolig tempo.</p></div></div>
			<div class="tl-item"><div class="tl-time">16:00</div><div class="tl-content"><strong>Hvil på hotellet</strong><p>Slapp av etter spa-dagen. Frisk opp før middag.</p></div></div>
			<div class="tl-item"><div class="tl-time">20:00</div><div class="tl-content"><strong>Middag: Beerstro14 Steak House</strong><p>Steakhouse, ca. 13 min gange fra hotellet. Avslappet avslutning etter spa-dag.</p><p class="cost">~25 000 HUF / ~850 NOK per pers.</p><a href="https://maps.google.com/?q=Beerstro14+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a></div></div>
			<div class="tl-item"><div class="tl-time">22:00</div><div class="tl-content"><strong>Siste kveld</strong><p>Rolig spasertur tilbake langs Donau. Tidlig kveld — flydag i morgen!</p></div></div>
		</div>
	</div>

	<!-- DAG 4 -->
	<div id="dag-4" class="day">
		<div class="day-header">
			<span class="day-number">Dag 4</span>
			<span class="day-date">Mandag 13. april</span>
			<span class="day-theme">Hjemreise</span>
		</div>
		<div class="timeline">
			<div class="tl-item"><div class="tl-time">08:00</div><div class="tl-content"><strong>Frokost på hotellet</strong><p>Siste frokost — nyt den!</p></div></div>
			<div class="tl-item"><div class="tl-time">09:00</div><div class="tl-content"><strong>Siste rusletur / kaffe</strong><p>Kort tur i nabolaget. Siste sjanse for suvenirer!</p></div></div>
			<div class="tl-item"><div class="tl-time">10:30</div><div class="tl-content"><strong>Pakk og gjør klar</strong><p>Dobbeltsjekk rommet.</p></div></div>
			<div class="tl-item"><div class="tl-time">11:00</div><div class="tl-content"><strong>Utsjekk D8 Hotel</strong></div></div>
			<div class="tl-item"><div class="tl-time">11:10</div><div class="tl-content"><strong>100E buss til flyplassen</strong><p>Gå til Deák Ferenc tér (5 min). Buss ca. 35–40 min. Vær på flyplassen ~11:50.</p></div></div>
			<div class="tl-item"><div class="tl-time">13:00</div><div class="tl-content"><strong>Fly DY1551 &rarr; Oslo</strong><p>Ankomst Gardermoen 15:25. Velkomne hjem!</p></div></div>
		</div>
	</div>

	<!-- Restauranter — quick reference -->
	<div id="restauranter" class="subsection">
		<h3>Restauranter</h3>
		<div class="card-stack">
			<div class="card restaurant">
				<div class="card-top-row">
					<div class="card-label">Dag 1 &middot; Fredag kveld</div>
					<span class="booking-badge must-book">Må bookes</span>
				</div>
				<div class="card-title">VIBE Budapest</div>
				<p>Moderne fine dining / tasting menu</p>
				<div class="detail-grid">
					<div><strong>Pris:</strong> ~1 550 NOK/pers</div>
					<div><strong>Avstand:</strong> 6 min gange</div>
					<div><strong>Booking:</strong> Obligatorisk</div>
					<div><strong>Notat:</strong> Minsteforbruk fre/lør</div>
				</div>
				<div class="link-row">
					<a href="https://vibebudapest.com/en" target="_blank" rel="noopener">Nettside &#8599;</a>
					<a href="https://maps.google.com/?q=VIBE+Budapest+restaurant" target="_blank" rel="noopener">Vis på kart &#8599;</a>
				</div>
			</div>
			<div class="card restaurant">
				<div class="card-top-row">
					<div class="card-label">Dag 2 &middot; Lørdag kveld</div>
					<span class="booking-badge should-book">Anbefalt booking</span>
				</div>
				<div class="card-title">Mazel Tov</div>
				<p>Moderne middelhavs-mat i ruin bar-stil innergård</p>
				<div class="detail-grid">
					<div><strong>Pris:</strong> ~450–560 NOK/pers</div>
					<div><strong>Booking:</strong> Anbefales</div>
				</div>
				<div class="link-row">
					<a href="https://mazeltov.hu/" target="_blank" rel="noopener">Nettside &#8599;</a>
					<a href="https://maps.google.com/?q=Mazel+Tov+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a>
				</div>
			</div>
			<div class="card restaurant">
				<div class="card-top-row">
					<div class="card-label">Dag 3 &middot; Søndag kveld</div>
					<span class="booking-badge walk-in">Walk-in</span>
				</div>
				<div class="card-title">Beerstro14 Steak House</div>
				<p>Steakhouse — avslappet avslutning etter spa-dag</p>
				<div class="detail-grid">
					<div><strong>Pris:</strong> ~850 NOK/pers</div>
					<div><strong>Avstand:</strong> 13 min gange</div>
				</div>
				<div class="link-row">
					<a href="https://beerstro14.hu/" target="_blank" rel="noopener">Nettside &#8599;</a>
					<a href="https://maps.google.com/?q=Beerstro14+Budapest" target="_blank" rel="noopener">Vis på kart &#8599;</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Attraksjoner — quick reference -->
	<div id="attraksjoner" class="subsection">
		<h3>Attraksjoner & Opplevelser</h3>
		<div class="card-grid">
			<div class="card attraction"><div class="card-emoji">&#9832;</div><div class="card-title">Széchenyi Termalbad</div><p>Søndag formiddag</p><p class="card-note">Europas største termalbad. Kom tidlig!</p><a href="https://www.szechenyibath.hu/" target="_blank" rel="noopener">Kjøp billett &#8599;</a></div>
			<div class="card attraction"><div class="card-emoji">&#127984;</div><div class="card-title">Fisherman's Bastion</div><p>Lørdag morgen</p><p class="card-note">Fantastisk utsikt over Donau og Pest-siden.</p></div>
			<div class="card attraction"><div class="card-emoji">&#11044;</div><div class="card-title">Den store synagogen</div><p>Lørdag formiddag</p><p class="card-note">Europas største + Livets tre-minnemonument.</p></div>
			<div class="card attraction"><div class="card-emoji">&#127866;</div><div class="card-title">Ruin Bars</div><p>Lørdag ettermiddag/kveld</p><p class="card-note">Szimpla Kert, Gozsdu Udvar, 360 Bar (rooftop).</p></div>
			<div class="card attraction"><div class="card-emoji">&#128274;</div><div class="card-title">Neverland Escape Room</div><p>Lørdag formiddag</p><p class="card-note">~370 NOK per person.</p></div>
			<div class="card attraction"><div class="card-emoji">&#127979;</div><div class="card-title">Operaen & St. Stephen's Basilica</div><p>Lørdag kveld (spasertur)</p><p class="card-note">Vakkert opplyst om kvelden.</p></div>
		</div>
	</div>
</section>

<!-- ============================================ -->
<!-- BUDSJETT                                     -->
<!-- ============================================ -->
<section id="budsjett">
	<h2>Budsjett</h2>
	<p class="section-note">Per person, basert på planlagte aktiviteter.</p>
	<div class="card budget-card">
		<table>
			<thead><tr><th>Post</th><th>NOK</th></tr></thead>
			<tbody>
				<tr><td>VIBE Budapest (dag 1)</td><td>1 550</td></tr>
				<tr><td>Mazel Tov (dag 2)</td><td>~500</td></tr>
				<tr><td>Beerstro14 (dag 3)</td><td>850</td></tr>
				<tr><td>Escape Room</td><td>370</td></tr>
				<tr><td>Széchenyi Termalbad</td><td>~250</td></tr>
				<tr><td>100E buss (tur/retur)</td><td>170</td></tr>
				<tr><td>72-timers Travelcard</td><td>195</td></tr>
				<tr><td>Diverse (kaffe, drikke, snacks)</td><td>~500</td></tr>
			</tbody>
			<tfoot><tr><td><strong>Totalt estimat</strong></td><td><strong>~4 385</strong></td></tr></tfoot>
		</table>
		<p class="card-note">Ekskl. fly og hotell. Valutakurs: ~0,034 NOK/HUF.</p>
	</div>
	<div class="budget-tools">
		<CurrencyConverter />
	</div>
</section>

<!-- ============================================ -->
<!-- FORBEREDELSER — Checklist + Praktisk + Parlør -->
<!-- ============================================ -->
<section id="forberedelser">
	<h2>Forberedelser & Tips</h2>

	<div id="sjekkliste" class="subsection">
		<h3>Sjekkliste</h3>
		<Checklist />
	</div>

	<div id="praktisk" class="subsection">
		<h3>Praktisk info</h3>
		<PracticalInfo />
	</div>

	<div class="subsection">
		<h3>Ungarsk parlør</h3>
		<Phrasebook />
	</div>
</section>

<style>
	/* Hero */
	.hero {
		text-align: center;
		padding: 3rem 0 0;
	}

	h1 {
		font-size: 2.8rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.subtitle {
		color: var(--text-muted);
		font-size: 1rem;
		margin-top: 0.25rem;
	}

	.now-row {
		margin-top: 0.75rem;
		display: flex;
		justify-content: center;
	}

	.hero-actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
		flex-wrap: wrap;
	}

	.hero-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.85rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 8px;
		font-size: 0.8rem;
		font-weight: 500;
		font-family: inherit;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.15s;
		text-decoration: none;
	}

	.hero-btn:hover {
		background: var(--accent-light);
		color: var(--accent);
		border-color: var(--accent);
		text-decoration: none;
	}

	.hero-btn svg {
		flex-shrink: 0;
	}

	.quick-facts {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 1.5rem;
		flex-wrap: wrap;
	}

	.fact {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.fact-icon {
		font-size: 1.1rem;
	}

	.home-block {
		margin-top: 2rem;
		text-align: left;
	}

	/* Sections */
	section {
		margin-top: 3rem;
		scroll-margin-top: 4rem;
	}

	h2 {
		font-size: 1.4rem;
		font-weight: 700;
		margin-bottom: 1rem;
		letter-spacing: -0.01em;
	}

	h3 {
		font-size: 1.1rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		letter-spacing: -0.01em;
	}

	.section-note {
		color: var(--text-muted);
		font-size: 0.85rem;
		margin-top: -0.5rem;
		margin-bottom: 1rem;
	}

	.subsection {
		margin-top: 2rem;
		scroll-margin-top: 4rem;
	}

	/* Cards */
	.card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		box-shadow: var(--shadow);
		margin-bottom: 0.75rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 0.75rem;
	}

	.card-stack {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--accent);
		margin-bottom: 0.25rem;
	}

	.card-title {
		font-size: 1.15rem;
		font-weight: 700;
		margin-bottom: 0.35rem;
	}

	.card-address {
		color: var(--text-muted);
		font-size: 0.85rem;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.card-note {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: 0.5rem;
	}

	.card-emoji {
		font-size: 1.6rem;
		margin-bottom: 0.35rem;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.3rem 1rem;
		font-size: 0.85rem;
		margin: 0.5rem 0;
	}

	.highlight {
		background: var(--accent-light);
		padding: 0.75rem 1rem;
		border-radius: 8px;
		font-size: 0.85rem;
		margin: 0.5rem 0;
	}

	.link-row {
		display: flex;
		gap: 1rem;
		font-size: 0.85rem;
	}

	.card-top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.booking-badge {
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		white-space: nowrap;
	}

	.booking-badge.must-book { background: #fce4ec; color: #c62828; }
	:global([data-theme="dark"]) .booking-badge.must-book { background: #3e1416; color: #ef9a9a; }
	.booking-badge.should-book { background: #fff3e0; color: #e65100; }
	:global([data-theme="dark"]) .booking-badge.should-book { background: #3e2612; color: #ffb74d; }
	.booking-badge.walk-in { background: #e8f5e9; color: #2e7d32; }
	:global([data-theme="dark"]) .booking-badge.walk-in { background: #1b3d1f; color: #81c784; }

	.map-link {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.cost {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--accent);
		margin: 0.25rem 0;
	}

	/* Flight card */
	.flight-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 0.75rem;
	}

	.flight-point {
		display: flex;
		flex-direction: column;
	}

	.flight-point .time {
		font-size: 1.3rem;
		font-weight: 700;
	}

	.flight-point .airport {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.flight-arrow {
		font-size: 1.2rem;
		color: var(--text-muted);
	}

	/* Day plan */
	.day {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		box-shadow: var(--shadow);
		margin-bottom: 1rem;
		scroll-margin-top: 4rem;
	}

	.day-header {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.day-number {
		font-weight: 700;
		font-size: 1rem;
		background: var(--accent);
		color: white;
		padding: 0.15rem 0.6rem;
		border-radius: 6px;
	}

	.day-date { font-weight: 600; font-size: 0.9rem; }
	.day-theme { color: var(--text-muted); font-size: 0.8rem; margin-left: auto; }

	/* Timeline */
	.timeline { position: relative; padding-left: 1rem; }
	.timeline::before { content: ''; position: absolute; left: 0; top: 0.5rem; bottom: 0.5rem; width: 2px; background: var(--border); }

	.tl-item { display: flex; gap: 0.75rem; padding: 0.5rem 0; position: relative; }
	.tl-item::before { content: ''; position: absolute; left: -1rem; top: 0.85rem; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); margin-left: -3px; }

	.tl-time { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); min-width: 70px; padding-top: 0.1rem; }
	.tl-content { flex: 1; }
	.tl-content strong { font-size: 0.9rem; }
	.tl-content p { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem; }
	.tl-content ul { margin: 0.35rem 0 0 1rem; font-size: 0.8rem; }
	.tl-content li { margin-bottom: 0.2rem; }
	.tl-content a { font-size: 0.8rem; font-weight: 500; }
	.tl-links { display: flex; gap: 1rem; margin-top: 0.25rem; }

	/* Attraction cards */
	.attraction { text-align: center; }
	.attraction p { font-size: 0.85rem; color: var(--text-muted); }

	/* Budget */
	.budget-card { overflow-x: auto; }
	.budget-tools { margin-top: 1rem; }

	table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
	th { text-align: left; padding: 0.5rem 0; border-bottom: 2px solid var(--border); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); }
	th:last-child { text-align: right; }
	td { padding: 0.45rem 0; border-bottom: 1px solid var(--border); }
	td:last-child { text-align: right; font-variant-numeric: tabular-nums; }
	tfoot td { border-bottom: none; border-top: 2px solid var(--text); padding-top: 0.6rem; }

	/* Responsive */
	@media (max-width: 500px) {
		h1 { font-size: 2rem; }
		.day-theme { margin-left: 0; display: block; width: 100%; }
		.detail-grid { grid-template-columns: 1fr; }
	}
</style>
