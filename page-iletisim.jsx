/* =============================================================================
 * page-futbol.jsx — KB Futbol hub
 * Mood: futbol (custom kinetic with pitch energy)
 * Identity: stadium night, pitch lines, league filtering, club crests
 * ============================================================================= */

const { useState: useSF, useMemo: useMSF } = React;

const FUTBOL_LEAGUES = [
  { id: 'all', label: 'Tümü' },
  { id: 'sl',  label: 'Süper Lig' },
  { id: 'pl',  label: 'Premier League' },
  { id: 'll',  label: 'La Liga' },
  { id: 'bl',  label: 'Bundesliga' },
  { id: 'sa',  label: 'Serie A' },
  { id: 'l1',  label: 'Ligue 1' },
  { id: 'nt',  label: 'Milli Takımlar' },
];

const FUTBOL_PRODUCTS = [
  { to: '/futbol/pdp/galatasaray', title: 'Galatasaray',   sub: 'İç Saha · 26/27', price: '2.299,00 ₺', primary: '#A90432', secondary: '#FFB81C', accent: '#FFB81C', crest: 'GS', num: '10', pattern: 'half',       league: 'sl', tag: 'Süper Lig' },
  { to: '/futbol/pdp/fenerbahce',  title: 'Fenerbahçe',     sub: 'İç Saha · 26/27', price: '2.299,00 ₺', primary: '#0F3F8C', secondary: '#FCD116', accent: '#fff', crest: 'FB', num: '7',  pattern: 'stripes-v', league: 'sl', tag: 'Süper Lig' },
  { to: '/futbol/pdp/besiktas',    title: 'Beşiktaş',       sub: 'İç Saha · 26/27', price: '2.299,00 ₺', primary: '#000000', secondary: '#FFFFFF', accent: '#fff', crest: 'BJK', num: '14', pattern: 'stripes-v', league: 'sl', tag: 'Süper Lig' },
  { to: '/futbol/pdp/trabzonspor', title: 'Trabzonspor',    sub: 'İç Saha · 26/27', price: '2.299,00 ₺', primary: '#8E1538', secondary: '#1A3F94', accent: '#fff', crest: 'TS', num: '11', pattern: 'stripes-v', league: 'sl', tag: 'Süper Lig' },
  { to: '/futbol/pdp/liverpool',   title: 'Liverpool',      sub: 'Anfield · 26/27', price: '2.599,00 ₺', primary: '#C8102E', secondary: '#00B2A9', accent: '#FAC03A', crest: 'LFC', num: '9',  pattern: 'plain',      league: 'pl', tag: 'Premier' },
  { to: '/futbol/pdp/man-city',    title: 'Man City',       sub: 'Etihad · 26/27',  price: '2.599,00 ₺', primary: '#6CABDD', secondary: '#1C2C5B', accent: '#fff', crest: 'MCI', num: '17', pattern: 'plain',      league: 'pl', tag: 'Premier' },
  { to: '/futbol/pdp/arsenal',     title: 'Arsenal',        sub: 'Emirates · 26/27',price: '2.599,00 ₺', primary: '#EF0107', secondary: '#FFFFFF', accent: '#fff', crest: 'ARS', num: '8',  pattern: 'plain',      league: 'pl', tag: 'Premier' },
  { to: '/futbol/pdp/real-madrid', title: 'Real Madrid',    sub: 'Bernabéu · 26/27', price: '2.599,00 ₺', primary: '#F5F5F5', secondary: '#FEBE10', accent: '#0a0a0b', crest: 'RM', num: '9',  pattern: 'plain',      league: 'll', tag: 'La Liga' },
  { to: '/futbol/pdp/barcelona',   title: 'Barcelona',      sub: 'Camp Nou · 26/27', price: '2.599,00 ₺', primary: '#A50044', secondary: '#004D98', accent: '#FCD116', crest: 'FCB', num: '10', pattern: 'stripes-v', league: 'll', tag: 'La Liga' },
  { to: '/futbol/pdp/atletico',    title: 'Atlético Madrid', sub: 'Metropolitano · 26/27', price: '2.499,00 ₺', primary: '#C8102E', secondary: '#FFFFFF', accent: '#fff', crest: 'ATM', num: '7',  pattern: 'stripes-v', league: 'll', tag: 'La Liga' },
  { to: '/futbol/pdp/bayern',      title: 'Bayern Münih',   sub: 'Allianz · 26/27', price: '2.499,00 ₺', primary: '#DC052D', secondary: '#0066B2', accent: '#fff', crest: 'FCB', num: '13', pattern: 'plain',      league: 'bl', tag: 'Bundesliga' },
  { to: '/futbol/pdp/dortmund',    title: 'Dortmund',       sub: 'Westfalen · 26/27', price: '2.499,00 ₺', primary: '#FDE100', secondary: '#000000', accent: '#0a0a0b', crest: 'BVB', num: '9',  pattern: 'plain',      league: 'bl', tag: 'Bundesliga' },
  { to: '/futbol/pdp/juventus',    title: 'Juventus',       sub: 'Allianz · 26/27', price: '2.499,00 ₺', primary: '#000000', secondary: '#FFFFFF', accent: '#fff', crest: 'JUV', num: '10', pattern: 'stripes-v', league: 'sa', tag: 'Serie A' },
  { to: '/futbol/pdp/inter',       title: 'Inter',          sub: 'San Siro · 26/27', price: '2.499,00 ₺', primary: '#0033A0', secondary: '#010E80', accent: '#fff', crest: 'INT', num: '10', pattern: 'stripes-v', league: 'sa', tag: 'Serie A' },
  { to: '/futbol/pdp/psg',         title: 'Paris SG',       sub: 'Parc des Princes · 26/27', price: '2.599,00 ₺', primary: '#004170', secondary: '#DA291C', accent: '#fff', crest: 'PSG', num: '10', pattern: 'plain', league: 'l1', tag: 'Ligue 1' },
  { to: '/futbol/pdp/turkiye',     title: 'Türkiye',        sub: 'Milli Takım · 26/27', price: '2.199,00 ₺', primary: '#E30A17', secondary: '#FFFFFF', accent: '#fff', crest: 'TR', num: '10', pattern: 'plain', league: 'nt', tag: 'Milli' },
];

function FutbolPage() {
  const [activeLeague, setActiveLeague] = useSF('all');
  const filtered = useMSF(
    () => activeLeague === 'all' ? FUTBOL_PRODUCTS : FUTBOL_PRODUCTS.filter((p) => p.league === activeLeague),
    [activeLeague]
  );

  return (
    <div>
      {/* =================================================================
            HERO — stadium night, scoreboard band on top, big italic word
         ================================================================= */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        {/* Floodlight wash + pitch lines */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 240, 200, 0.10), transparent 55%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 10% 80%, rgba(45, 191, 100, 0.10), transparent 60%)' }} />
          <div className="bg-pitch-lines" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        </div>

        {/* Top scoreboard strip — floats outside container */}
        <div style={{ position: 'absolute', top: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <FutbolScoreboard />
        </div>

        <div className="container" style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(96px, 12vw, 160px)' }}>
          <Reveal>
            <div className="eyebrow"><span className="eyebrow-dot" />KB FUTBOL · FW 26 / 27 · MADE-TO-ORDER</div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="h-display" style={{ maxWidth: '14ch', marginTop: 32 }}>
              Avrupa'nın<br />
              <span className="italic-display" style={{ color: 'var(--accent)' }}>elitleri.</span><br />
              İtalya'dan kumaş,<br />
              <span style={{ color: 'var(--muted)' }}>İstanbul'da dokuma.</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-lead muted" style={{ maxWidth: '56ch', marginTop: 32 }}>
              Süper Lig, Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Milli Takımlar — premium kumaşla, made-to-order olarak üretilir. Ya da KB.LAB'a girin, kendinizinkini tasarlayın.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="row" style={{ flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
              <a href="#featured" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Tüm formalar <IconArrow size={16} />
              </a>
              <Link to="/futbol/builder" className="btn btn-ghost btn-lg" transitionLabel="KB.LAB" transitionSub="// SYSTEM ONLINE" panelColor="#06080c" panelText="#00f0ff">
                Tasarlamaya başla <IconArrow size={16} />
              </Link>
              <Link to="/futbol/klasik" className="btn-quiet" transitionLabel="MAISON KB" transitionSub="Heritage · Crafted Once" panelColor="#050403" panelText="#d4af37" style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Maison KB · Heritage <IconArrow size={14} />
              </Link>
            </div>
          </Reveal>

          {/* Accent column — large jersey silhouette */}
          <div style={{ position: 'absolute', right: 'var(--gut)', top: '20%', opacity: 0.8 }} className="hide-on-tablet">
            <FutbolHeroJersey />
          </div>
        </div>

        {/* Bottom corner: pitch corner flag detail */}
        <svg aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.5 }} width="220" height="180" viewBox="0 0 220 180">
          <path d="M0 180 L220 180 L0 60 Z" fill="none" stroke="var(--pitch-line)" strokeWidth="1" />
          <path d="M40 180 Q40 140 0 140" fill="none" stroke="var(--pitch-line)" strokeWidth="1" />
          <line x1="0" y1="170" x2="30" y2="170" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="40" y="174" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" letterSpacing="2">CORNER · KB</text>
        </svg>
      </section>

      <Marquee items={[
        'KB FUTBOL', { text: 'CRAFTED FOR CHAMPIONS', hi: true }, 'MADE-TO-ORDER', '7–14 GÜN ÜRETİM',
        'İTALYAN KUMAŞ', 'İSTANBUL', 'SÜPER LİG', 'PREMIER', 'LA LIGA', 'BUNDESLIGA', 'SERIE A', 'LİGUE 1',
      ]} />

      {/* =================================================================
            HUB SPLIT — Maison KB · KB.LAB
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>İKİ YOL · BİR FORMA</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 56 }}>
            Tarihten <span className="italic-display muted">seçin</span>, ya da<br/>kendinizinkini yapın.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)' }} className="futbol-split-grid">
          <Link
            to="/futbol/klasik"
            transitionLabel="MAISON KB" transitionSub="Heritage · Crafted Once" panelColor="#050403" panelText="#d4af37"
            style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: 'clamp(36px, 5vw, 64px)', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12), transparent 60%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ height: 1, width: 48, background: '#d4af37', marginBottom: 18 }} />
              <div className="eyebrow" style={{ marginBottom: 22, color: '#d4af37' }}>MAISON KB · HERITAGE</div>
              <h3 className="h-1" style={{ marginBottom: 18, maxWidth: '14ch' }}>Tek bir kez<br /><span className="italic-display">dokunmuş.</span></h3>
              <p className="text-body muted" style={{ maxWidth: '40ch', marginBottom: 16 }}>
                Maradona '86, Zidane '98, Cristiano '07, Messi '09 — numaralı sertifika, özel kutu, el işçiliği.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 8 }}>
                {['Her parça tek bir kez üretilir', 'Numaralı sertifika · 01–12 / 12', 'Özel kutu, özel ipek bayrak'].map((b) => (
                  <li key={b} className="text-small" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ display: 'inline-block', width: 12, height: 1, background: '#d4af37' }} /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative', marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span className="row" style={{ font: '600 16px/1 var(--font-sans)', color: '#d4af37' }}>Cabinet'e gir <IconArrow size={16} /></span>
              <span className="text-micro" style={{ color: 'var(--dim)' }}>HERITAGE</span>
            </div>
          </Link>

          <Link
            to="/futbol/builder"
            transitionLabel="KB.LAB" transitionSub="// SYSTEM ONLINE" panelColor="#06080c" panelText="#00f0ff"
            style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: 'clamp(36px, 5vw, 64px)', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.10), transparent 60%)' }} />
            <div aria-hidden="true" className="bg-lab-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ height: 1, width: 48, background: '#00f0ff', marginBottom: 18 }} />
              <div className="eyebrow" style={{ marginBottom: 22, color: '#00f0ff' }}>// KB.LAB · CONFIGURATOR</div>
              <h3 className="h-1" style={{ marginBottom: 18, maxWidth: '14ch' }}>Sahaya aitsiniz,<br /><span className="italic-display">formanız da.</span></h3>
              <p className="text-body muted" style={{ maxWidth: '40ch', marginBottom: 16 }}>
                Şablon, kumaş, renk, isim, numara, amblem — siz seçin. 3D olarak görün, paylaşın, üretime gönderin.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 8 }}>
                {['4 şablon · 3 kumaş tipi · sınırsız renk', 'Gerçek zamanlı 3D — paylaşılabilir URL', 'Üretim 7–14 gün, kargo 1–3 gün'].map((b) => (
                  <li key={b} className="text-small" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)' }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, border: '1px solid #00f0ff' }} /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative', marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span className="row" style={{ font: '600 16px/1 var(--font-mono)', color: '#00f0ff', letterSpacing: '0.08em' }}>// KB.LAB'a gir <IconArrow size={16} /></span>
              <span className="text-micro" style={{ color: '#b1ff5b' }}>STATUS · ONLINE</span>
            </div>
          </Link>
        </div>
      </section>

      {/* =================================================================
            LEAGUE PILLS + GRID
         ================================================================= */}
      <section id="featured" className="container" style={{ paddingBlock: 'clamp(40px, 5vw, 80px)' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>FORMALAR · {filtered.length} ÜRÜN</div>
              <h2 className="h-2" style={{ maxWidth: '20ch' }}>Bu sezon en çok aranan kulüpler.</h2>
            </div>
            <Link to="/futbol/builder" className="btn-quiet" transitionLabel="KB.LAB" transitionSub="// SYSTEM ONLINE" panelColor="#06080c" panelText="#00f0ff" style={{ font: '600 13px/1 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Aradığınız yoksa // KB.LAB <IconArrow className="arrow" size={14} />
            </Link>
          </div>
        </Reveal>

        {/* League pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
          {FUTBOL_LEAGUES.map((l) => (
            <button
              key={l.id}
              className={`pill ${activeLeague === l.id ? 'is-active' : ''}`}
              onClick={() => setActiveLeague(l.id)}
            >
              {l.label}
              {activeLeague === l.id && <span style={{ color: 'var(--dim)', marginLeft: 4 }}>
                · {l.id === 'all' ? FUTBOL_PRODUCTS.length : FUTBOL_PRODUCTS.filter(p => p.league === l.id).length}
              </span>}
            </button>
          ))}
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }} className="futbol-products-grid">
          {filtered.map((item) => (
            <li key={item.to} className="product-card" style={{ position: 'relative', padding: 22, background: 'var(--bg)' }}>
              <Link to={item.to}>
                <span className="league-tag">{item.tag}</span>
                <JerseyChip primary={item.primary} secondary={item.secondary} accent={item.accent} crest={item.crest} num={item.num} pattern={item.pattern} />
                <div className="title">{item.title}</div>
                <div className="sub">{item.sub}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <span className="price">{item.price}</span>
                  <span className="text-micro" style={{ color: 'var(--dim)' }}>7–14 GÜN</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* =================================================================
            BOOTS + BALLS + COMING SOON triple panel
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 14 }}>SAHA EKİPMANI · GERÇEK STOK</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 40 }}>Krampondan topa, ayağınızın yanında.</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }} className="boots-grid">
          <EquipmentCard to="/futbol/krampon" eyebrow="KRAMPON" title="Sahaya hazır." body="FG, AG, IC — profesyonel kalıp, premium yüzey." cta="Krampon koleksiyonu" icon={<KramponSVG />} />
          <EquipmentCard to="/futbol/top" eyebrow="TOP" title="Maç topu kalitesi." body="Profesyonel sahalarda kullanılan dokuma — antrenmandan kupaya." cta="Top koleksiyonu" icon={<TopSVG />} />
          <EquipmentCard eyebrow="YAKINDA" title="Antrenman ekipmanları." body="Conlar, file, top arabası, elektronik formenler — sezon ortasında." cta="Bültene kaydolun" dashed icon={<TrainingSVG />} />
        </div>
      </section>

      {/* =================================================================
            STADIUM CLOSER — atmosphere
         ================================================================= */}
      <section className="full-bleed" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 'clamp(80px, 12vw, 140px) var(--gut)', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, rgba(255, 240, 200, 0.06), transparent 60%), radial-gradient(ellipse at bottom, rgba(45, 191, 100, 0.05), transparent 60%)' }} />
        <div aria-hidden="true" className="bg-pitch-lines" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center', padding: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center' }}><span className="eyebrow-dot" />SAHA · 21:45 · İSTANBUL</div>
          <h2 className="h-display" style={{ maxWidth: '16ch', margin: '0 auto' }}>
            Bir formanın <span className="italic-display" style={{ color: 'var(--accent)' }}>en güzel</span> yeri,<br />sırtınızdadır.
          </h2>
          <p className="text-lead muted" style={{ maxWidth: '52ch', margin: '28px auto 0' }}>
            KB Futbol formaları üretildikten 7–14 gün sonra kapınızda. Stok yok — sadece sizin için dokunan parça.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .futbol-split-grid, .boots-grid { grid-template-columns: 1fr !important; }
          .futbol-products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hide-on-tablet { display: none !important; }
        }
        @media (max-width: 540px) {
          .futbol-products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── Scoreboard ─────────────────────────────── */
function FutbolScoreboard() {
  const [tick, setTick] = useSF(0);
  React.useEffect(() => { const i = setInterval(() => setTick((t) => t + 1), 1500); return () => clearInterval(i); }, []);
  const minute = 45 + ((tick % 45));
  return (
    <div className="scoreboard" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}>
      <div className="seg is-live"><span className="lbl">CANLI · {minute}'</span><span className="val">FW 26/27</span></div>
      <div className="seg"><span className="lbl">SEZON</span><span className="val">AÇILIŞ HF · 3</span></div>
      <div className="seg"><span className="lbl">VİTRİN</span><span className="val">16 KULÜP</span></div>
      <div className="seg"><span className="lbl">TESLİMAT</span><span className="val">7–14 GÜN</span></div>
    </div>
  );
}

/* ─────────────────────────── Hero jersey silhouette ────────────────── */
function FutbolHeroJersey() {
  return (
    <svg width="280" height="340" viewBox="0 0 280 340">
      <defs>
        <linearGradient id="jg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff4d2e" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1a0a07" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="jglow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <path d="M70 30 L100 20 Q140 38 180 20 L210 30 L260 60 L240 100 L210 90 L210 300 Q140 320 70 300 L70 90 L40 100 L20 60 Z" fill="url(#jg)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
      <path d="M70 30 L100 20 Q140 38 180 20 L210 30 L260 60 L240 100 L210 90 L210 300 Q140 320 70 300 L70 90 L40 100 L20 60 Z" fill="url(#jglow)" />
      {/* collar */}
      <path d="M120 30 Q140 50 160 30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      {/* number */}
      <text x="140" y="200" textAnchor="middle" fontFamily="Playfair Display, serif" fontWeight="800" fontSize="100" fill="rgba(255,255,255,0.92)" letterSpacing="-4">10</text>
      <text x="140" y="245" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="14" letterSpacing="3" fill="rgba(255,255,255,0.65)">SİZ</text>
      {/* sleeve stripe */}
      <rect x="22" y="78" width="20" height="6" fill="#FFB81C" opacity="0.9" />
      <rect x="238" y="78" width="20" height="6" fill="#FFB81C" opacity="0.9" />
    </svg>
  );
}

/* ─────────────────────────── Equipment cards ───────────────────────── */
function EquipmentCard({ to, eyebrow, title, body, cta, icon, dashed }) {
  const Wrap = to ? Link : 'div';
  const props = to ? { to } : {};
  return (
    <Wrap {...props} style={{ display: 'block', padding: 'clamp(32px, 4vw, 48px)', background: 'var(--bg)', minHeight: 320, position: 'relative', border: dashed ? '1px dashed var(--line-2)' : '0' }}>
      <div style={{ height: 1, width: 48, background: dashed ? 'var(--line-2)' : 'var(--accent)', marginBottom: 16 }} />
      <div className="eyebrow" style={{ marginBottom: 22 }}>{eyebrow}</div>
      <h3 className="h-3" style={{ marginBottom: 12 }}>{title}</h3>
      <p className="text-small muted" style={{ maxWidth: '34ch' }}>{body}</p>
      <div style={{ marginTop: 24, opacity: 0.85 }}>{icon}</div>
      <div style={{ marginTop: 24, font: dashed ? '600 11px/1 var(--font-mono)' : '600 14px/1 var(--font-sans)', letterSpacing: dashed ? '0.18em' : 'normal', textTransform: dashed ? 'uppercase' : 'none', color: dashed ? 'var(--muted)' : 'var(--text)' }}>
        {cta} →
      </div>
    </Wrap>
  );
}

function KramponSVG() {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60">
      <path d="M5 40 Q15 20 50 18 L85 18 Q105 18 110 30 L110 42 Q108 50 100 50 L20 50 Q10 50 5 40 Z" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
      {[1,2,3,4,5,6,7,8].map((i) => (
        <rect key={i} x={20 + i*10} y="48" width="3" height="8" fill="var(--accent)" />
      ))}
      <path d="M40 25 L70 25 M40 32 L70 32" stroke="var(--accent)" strokeWidth="0.6" />
      <text x="60" y="13" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="2" fill="var(--muted)">FG · AG · IC</text>
    </svg>
  );
}
function TopSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
      {/* pentagons */}
      <polygon points="40,16 49,24 46,36 34,36 31,24" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
      <polygon points="20,38 32,40 30,52 18,52 14,42" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
      <polygon points="60,38 66,42 62,52 50,52 48,40" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
      <polygon points="40,40 46,52 40,62 34,52" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
    </svg>
  );
}
function TrainingSVG() {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60">
      {[0,1,2,3,4].map((i) => (
        <g key={i} transform={`translate(${i * 24} 0)`}>
          <path d="M10 50 L20 20 L30 50 Z" fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="2 3" />
        </g>
      ))}
      <text x="60" y="12" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="2" fill="var(--muted)">CONLAR · FİLE</text>
    </svg>
  );
}

Object.assign(window, { FutbolPage });
