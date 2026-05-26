import Image from 'next/image';
import Link from 'next/link';

const competitors = [
  {
    name: 'Mollie POS',
    logo: 'M',
    color: '#000',
    tagline: 'Betrouwbaar, alles-in-één MKB',
    hardware: 'NFC-reader €95 (geen scherm) of handheld terminal €350–€550',
    placement: 'Medewerker brengt terminal naar klant',
    pricing: '€0–€20/maand + €20/terminal actief + 1,50%–2,90% per transactie',
    contract: 'Maandelijks of 1 jaar',
    target: 'Brede MKB — retail, horeca, kappers, zzp',
    pros: ['Geen opstartkosten', 'Omnichannel dashboard', 'Bekende naam'],
    cons: ['Goedkope reader heeft geen scherm', 'Niet specifiek voor horeca', 'Transactietarieven tot 2,90%', 'Medewerker blijft nodig bij elke betaling'],
  },
  {
    name: 'Buckaroo',
    logo: 'B',
    color: '#00a0a0',
    tagline: 'De goedkoopste leverancier',
    hardware: '6 klassieke handheld modellen, €169–€490 koop',
    placement: 'Medewerker brengt terminal naar klant',
    pricing: 'Koop €169–€490 + €58 registratie + €12,85–€20,10/maand',
    contract: 'Koop, lease (1–5 jaar) of huur per dag',
    target: 'MKB, retail, evenementen, pop-up',
    pros: ['Snelle levering (24 uur)', '30 dagen proefperiode', 'Flexibele contractvormen'],
    cons: ['Klassiek handheld — klant interacteert niet zelf', 'Veel modellen, ondoorzichtige pricing', 'Geen hospitality-specifieke features', 'Registratiekosten bovenop aanschafprijs'],
  },
  {
    name: 'Adyen POS',
    logo: 'A',
    color: '#1a1a2e',
    tagline: 'Enterprise unified commerce',
    hardware: 'Handheld, counter, unattended — geen openbare specs of prijzen',
    placement: 'Medewerker brengt terminal naar klant',
    pricing: 'Geen publieke prijzen — enterprise contract vereist',
    contract: 'Enterprise, minimale volumes van toepassing',
    target: 'Grote ketens: Subway, LUSH, Hugo Boss, CitizenM',
    pros: ['Eén platform wereldwijd', 'Offline betalingen', 'Krachtige data & rapportage'],
    cons: ['Geen transparante pricing', 'Niet geschikt voor kleine horeca', 'Complexe API-integratie vereist', 'Maanden implementatietijd'],
  },
];

const comparisonRows = [
  { label: 'Staat permanent op tafel', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Klant betaalt zelf (zelfbediening)', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Scherm zichtbaar voor klant', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Specifiek voor horeca gebouwd', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Transparante pricing', tappy: true, mollie: true, buckaroo: true, adyen: false },
  { label: 'Geen medewerker nodig per betaling', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Saldo = fooi voor de zaak', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Werkt zonder POS-koppeling', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Realtime inzicht per tafel', tappy: true, mollie: false, buckaroo: false, adyen: false },
  { label: 'Plug & play installatie', tappy: true, mollie: true, buckaroo: true, adyen: false },
];

const advantages = [
  {
    icon: '🪑',
    title: 'Altijd op tafel. Klaar voor gebruik.',
    desc: 'Tappy staat permanent op tafel — geen terminal ophalen, geen medewerker die wacht. De gast tikt wanneer hij klaar is. Dat versnelt elk moment van de avond.',
  },
  {
    icon: '🙌',
    title: 'De gast betaalt zelf.',
    desc: 'Bij Mollie, Buckaroo en Adyen initieert altijd een medewerker de betaling. Bij Tappy tikt de gast zelf. Minder werk, minder wachten, betere gastbeleving.',
  },
  {
    icon: '💸',
    title: 'Resterend saldo wordt fooi.',
    desc: 'Laad een bedrag op Tappy. Gasten betalen hun deel. Wat overblijft gaat direct als fooi naar de zaak. Een feature die geen enkele concurrent biedt.',
  },
  {
    icon: '⚡',
    title: 'Gebouwd voor drukke omgevingen.',
    desc: 'Vrijdagavond vol café, festival, sportkantine — Tappy is ontworpen voor precies die momenten. Niet voor de kapperszaak of de webshop, maar voor jou.',
  },
  {
    icon: '📊',
    title: 'Realtime inzicht per tafel.',
    desc: 'Zie live hoeveel er per tafel geïnd is, wanneer, en door wie. Geen einde-avond verassingen. Geen kassaverschillen. Gewoon duidelijkheid.',
  },
  {
    icon: '🔌',
    title: 'Geen IT-afdeling nodig.',
    desc: 'Adyen vereist een API-integratie. Buckaroo heeft registratiekosten en leasecontracten. Tappy: plug in, stel in, klaar. Geschikt voor iedere ondernemer.',
  },
];

function Check({ value }: { value: boolean }) {
  return value ? (
    <div className="w-6 h-6 rounded-full bg-[#C6FF3B] flex items-center justify-center mx-auto">
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <path d="M3 8l3.5 3.5 6.5-7" stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ) : (
    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
        <path d="M4 4l8 8M12 4l-8 8" stroke="#8B949E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function VergelijkingPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA]">

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={80} height={23} />
        </Link>
        <span className="text-xs text-[#8B949E]">Interne analyse — niet geïndexeerd</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">Concurrentieanalyse</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Tappy vs. de rest.
          </h1>
          <p className="text-lg text-[#8B949E] max-w-2xl mx-auto leading-relaxed">
            Mollie, Buckaroo en Adyen bieden allemaal tap-to-pay aan. Maar geen van hen heeft een product dat écht voor de horeca is gemaakt. Dit is het verschil.
          </p>
        </div>

        {/* The core difference */}
        <div className="bg-[#1E242D] rounded-3xl p-8 md:p-12 mb-20 border border-[#C6FF3B]/20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">Het fundamentele verschil</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Zij brengen een terminal.<br />
                <span className="text-[#C6FF3B]">Tappy staat er al.</span>
              </h2>
              <p className="text-[#8B949E] leading-relaxed mb-6">
                Bij elke concurrent brengt een medewerker de terminal naar de gast. Dat kost tijd, vereist aandacht en betekent dat de gast altijd wacht op iemand.
              </p>
              <p className="text-[#8B949E] leading-relaxed">
                Tappy staat permanent op tafel. De gast ziet het bedrag, tikt zijn kaart of telefoon, en is klaar. Geen wachten. Geen medewerker nodig. Dat is het verschil.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
                <div className="text-2xl mb-3">🏃</div>
                <div className="text-sm font-semibold text-white mb-1">Traditioneel model</div>
                <div className="text-xs text-[#8B949E]">Gast vraagt om rekening → medewerker loopt naar kassa → terminal ophalen → terminal naar tafel → gast betaalt → receipt → medewerker loopt terug</div>
              </div>
              <div className="bg-[#0D1117] rounded-2xl p-5 border border-[#C6FF3B]/20">
                <div className="text-2xl mb-3">⚡</div>
                <div className="text-sm font-semibold text-[#C6FF3B] mb-1">Tappy model</div>
                <div className="text-xs text-[#8B949E]">Gast is klaar → tikt kaart op Tappy → betaald. Dat is het.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitor cards */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Wat bieden de anderen?</h2>
          <p className="text-[#8B949E] text-center mb-10">Een eerlijk overzicht van de drie grootste spelers in tap-to-pay voor horeca.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitors.map((c) => (
              <div key={c.name} className="bg-[#1E242D] rounded-2xl p-6 border border-white/5 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: c.color }}>
                    {c.logo}
                  </div>
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-xs text-[#8B949E]">{c.tagline}</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#8B949E] mb-5 flex-1">
                  <div><span className="text-white/50 uppercase tracking-wide text-[10px]">Hardware</span><br />{c.hardware}</div>
                  <div><span className="text-white/50 uppercase tracking-wide text-[10px]">Plaatsing</span><br />{c.placement}</div>
                  <div><span className="text-white/50 uppercase tracking-wide text-[10px]">Kosten</span><br />{c.pricing}</div>
                  <div><span className="text-white/50 uppercase tracking-wide text-[10px]">Contract</span><br />{c.contract}</div>
                  <div><span className="text-white/50 uppercase tracking-wide text-[10px]">Doelgroep</span><br />{c.target}</div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-white/50 mb-1.5">Sterk</div>
                    {c.pros.map((p) => (
                      <div key={p} className="flex items-start gap-1.5 text-xs text-[#8B949E] mb-1">
                        <span className="text-green-400 mt-0.5">+</span> {p}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-white/50 mb-1.5">Zwak</div>
                    {c.cons.map((p) => (
                      <div key={p} className="flex items-start gap-1.5 text-xs text-[#8B949E] mb-1">
                        <span className="text-red-400 mt-0.5">−</span> {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Vergelijkingstabel</h2>
          <p className="text-[#8B949E] text-center mb-10">Feature voor feature.</p>
          <div className="bg-[#1E242D] rounded-2xl overflow-hidden border border-white/5">
            <div className="grid grid-cols-5 gap-0">
              {/* Header */}
              <div className="p-4 border-b border-white/5" />
              {['Tappy', 'Mollie', 'Buckaroo', 'Adyen'].map((name, i) => (
                <div key={name} className={`p-4 border-b border-white/5 text-center ${i === 0 ? 'bg-[#C6FF3B]/5 border-l border-[#C6FF3B]/20' : ''}`}>
                  <span className={`text-sm font-bold ${i === 0 ? 'text-[#C6FF3B]' : 'text-white'}`}>{name}</span>
                </div>
              ))}
              {/* Rows */}
              {comparisonRows.map((row, ri) => (
                <>
                  <div key={`label-${ri}`} className={`px-4 py-3 text-sm text-[#8B949E] border-b border-white/5 ${ri === comparisonRows.length - 1 ? 'border-b-0' : ''}`}>
                    {row.label}
                  </div>
                  {[row.tappy, row.mollie, row.buckaroo, row.adyen].map((val, ci) => (
                    <div key={`val-${ri}-${ci}`} className={`px-4 py-3 border-b border-white/5 ${ri === comparisonRows.length - 1 ? 'border-b-0' : ''} ${ci === 0 ? 'bg-[#C6FF3B]/5 border-l border-[#C6FF3B]/20' : ''}`}>
                      <Check value={val} />
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Advantages */}
        <div className="mb-20">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4 text-center">Waarom Tappy</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            Zes voordelen die niemand anders biedt.
          </h2>
          <p className="text-[#8B949E] text-center mb-10">Geen marketing, gewoon feiten.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((a) => (
              <div key={a.title} className="bg-[#1E242D] rounded-2xl p-6 border border-white/5 hover:border-[#C6FF3B]/20 transition-colors">
                <div className="text-3xl mb-4">{a.icon}</div>
                <h3 className="text-white font-bold mb-2">{a.title}</h3>
                <p className="text-sm text-[#8B949E] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* White space section */}
        <div className="bg-gradient-to-r from-[#C6FF3B]/10 to-[#C6FF3B]/5 border border-[#C6FF3B]/20 rounded-3xl p-8 md:p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">Witte vlek in de markt</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Niemand doet wat Tappy doet.
            </h2>
            <p className="text-[#8B949E] leading-relaxed mb-4">
              Alle drie de concurrenten opereren op hetzelfde model: een medewerker brengt hardware naar de klant. Dat is het model van 1990. Niemand heeft een product gebouwd dat <em className="text-white not-italic">op tafel staat en wacht op de gast</em>.
            </p>
            <p className="text-[#8B949E] leading-relaxed mb-4">
              Het meest vergelijkbare product van Adyen is hun "Unattended" categorie — maar dat zijn grote kiosken voor supermarkten en parkeergarages. Niet een compact, stijlvol device op een barkruk in Amsterdam.
            </p>
            <p className="text-white font-medium leading-relaxed">
              Tappy speelt in een categorie die niet bestaat. Dat is de kans.
            </p>
          </div>
        </div>

        {/* Pricing transparency section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Kostenplaatje vergeleken</h2>
          <p className="text-[#8B949E] text-center mb-10 max-w-2xl mx-auto">
            Wat betaal je werkelijk als je kiest voor een van de bestaande oplossingen? We rekenen door voor een café met 20 tafels en 500 transacties per maand.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                name: 'Mollie POS', color: 'border-white/5',
                items: ['Hardware: €95 (NFC-reader, 1 terminal)', 'Abonnement: €20/maand', 'Transacties: ~€125–175/maand (1,50%–2,90% van gem. €17)', 'Totaal: ~€145–€195/maand'],
                note: 'Per terminal. Bij 20 tafels: 20 terminals nodig = €400/maand alleen abonnement.',
                highlight: false,
              },
              {
                name: 'Buckaroo', color: 'border-white/5',
                items: ['Hardware: €169 (Buck Mini) eenmalig', 'Registratie: €58 eenmalig', 'Abonnement: €12,85–€20,10/maand', 'Transacties: via acquirer (apart contract)'],
                note: 'Transactietarieven afhankelijk van bestaande bankrelatie — niet transparant.',
                highlight: false,
              },
              {
                name: 'Adyen POS', color: 'border-white/5',
                items: ['Hardware: onbekend', 'Abonnement: onbekend', 'Transacties: onbekend', 'Contract: enterprise minimum volumes'],
                note: 'Geen publieke pricing. Implementatie duurt maanden. Niet geschikt voor klein café.',
                highlight: false,
              },
              {
                name: 'Tappy', color: 'border-[#C6FF3B]/30',
                items: ['Hardware: één device per tafel', 'Eenvoudige pricing — geen verborgen kosten', 'Transacties: eerlijk tarief', 'Geen jaarcontract vereist'],
                note: 'Exacte pricing volgt bij lancering. Transparant, eerlijk, klaar voor horeca.',
                highlight: true,
              },
            ].map((col) => (
              <div key={col.name} className={`bg-[#1E242D] rounded-2xl p-6 border ${col.color} flex flex-col`}>
                <div className={`font-bold mb-4 ${col.highlight ? 'text-[#C6FF3B]' : 'text-white'}`}>{col.name}</div>
                <ul className="space-y-2 text-xs text-[#8B949E] flex-1 mb-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className={col.highlight ? 'text-[#C6FF3B]' : 'text-white/30'}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={`text-xs italic ${col.highlight ? 'text-[#C6FF3B]/70' : 'text-white/30'}`}>{col.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="text-center py-12 border-t border-white/5">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">Conclusie</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            De markt wacht op Tappy.
          </h2>
          <p className="text-[#8B949E] max-w-2xl mx-auto leading-relaxed mb-8">
            Mollie, Buckaroo en Adyen zijn goede producten — maar voor de horecaondernemer die wil dat gasten zelf betalen, zonder wachten, zonder gedoe, is er vandaag geen oplossing. Tappy is die oplossing.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#C6FF3B] text-[#0D1117] font-semibold px-8 py-3 rounded-full hover:bg-[#d4ff5a] transition-colors"
          >
            Bekijk Tappy →
          </Link>
        </div>

      </div>
    </div>
  );
}
