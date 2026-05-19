/* =============================================================================
 * page-spor.jsx — KB Spor parent-brand hub (landing)
 * Mood: kinetic (default)
 * ============================================================================= */

const { useState: useStateSpor, useEffect: useEffectSpor, useRef: useRefSpor } = React;

const SPOR_FEATURED = [
  { to: '/futbol/pdp/galatasaray', title: 'Galatasaray',   sub: 'Süper Lig · 26/27', price: '2.299,00 ₺', primary: '#A90432', secondary: '#FFB81C', accent: '#FFB81C', crest: 'GS', num: '10', pattern: 'half', tag: 'Süper Lig' },
  { to: '/futbol/pdp/fenerbahce',  title: 'Fenerbahçe',     sub: 'Süper Lig · 26/27', price: '2.299,00 ₺', primary: '#0F3F8C', secondary: '#FCD116', accent: '#fff', crest: 'FB', num: '7',  pattern: 'stripes-v', tag: 'Süper Lig' },
  { to: '/futbol/pdp/real-madrid', title: 'Real Madrid',    sub: 'La Liga · 26/27',   price: '2.599,00 ₺', primary: '#F5F5F5', secondary: '#FEBE10', accent: '#0a0a0b', crest: 'RM', num: '9',  pattern: 'plain', tag: 'La Liga' },
  { to: '/futbol/pdp/barcelona',   title: 'Barcelona',     sub: 'La Liga · 26/27',   price: '2.599,00 ₺', primary: '#A50044', secondary: '#004D98', accent: '#FCD116', crest: 'FCB', num: '10', pattern: 'stripes-v', tag: 'La Liga' },
  { to: '/futbol/klasik/mar86',    title: 'Maradona ’86',   sub: 'Maison KB',         price: '14.999,00 ₺', primary: '#75AADB', secondary: '#F6B40E', accent: '#0a0a0b', crest: 'ARG', num: '10', pattern: 'stripes-v', tag: 'Heritage' },
  { to: '/futbol/klasik/zid98',    title: 'Zidane ’98',     sub: 'Maison KB',         price: '14.999,00 ₺', primary: '#0055A4', secondary: '#EF4135', accent: '#fff', crest: 'FRA', num: '10', pattern: 'plain', tag: 'Heritage' },
  { to: '/basket/nba/lakers',      title: 'LA Lakers',     sub: 'NBA · 26/27',       price: '2.799,00 ₺', primary: '#552583', secondary: '#FDB927', accent: '#FDB927', crest: 'LAL', num: '23', pattern: 'plain', tag: 'NBA' },
  { to: '/basket/bsl/anadolu-efes',title: 'Anadolu Efes',   sub: 'BSL · 26/27',       price: '2.499,00 ₺', primary: '#003478', secondary: '#FFFFFF', accent: '#fff', crest: 'EFS', num: '8',  pattern: 'half', tag: 'BSL' },
];

function HubSporPage() {
  return (
    <div style={{ paddingTop: 0 }}>

      {/* =================================================================
            HERO — split editorial layout. Big italic word "aitsiniz."
         ================================================================= */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        {/* decorative bg layers */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(255,77,46,0.16), transparent 60%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 50% at 90% 80%, rgba(0,240,255,0.08), transparent 60%)' }} />
          <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
        </div>

        {/* big background number */}
        <div aria-hidden="true" style={{ position: 'absolute', right: 'calc(-1 * var(--gut))', top: '6vh', pointerEvents: 'none' }}>
          <span className="big-num">26<span style={{ color: 'var(--accent)', WebkitTextStroke: 0 }}>/</span>27</span>
        </div>

        <div className="container" style={{ position: 'relative', width: '100%', display: 'grid', gridTemplateColumns: '1fr', gap: 32, paddingBlock: 'clamp(72px, 11vw, 140px)' }}>
          <Reveal>
            <div className="eyebrow"><span className="eyebrow-dot" />YENİ SEZON · FW 26 / 27 · İSTANBUL</div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="h-display" style={{ maxWidth: '14ch' }}>
              Sahaya<br />
              <span className="italic-display" style={{ color: 'var(--accent)' }}>aitsiniz.</span><br />
              Formayı siz seçin.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-lead muted" style={{ maxWidth: '58ch' }}>
              Avrupa'nın en büyük kulüpleri ve milli takımlardan ilham alan, İtalyan kumaşıyla İstanbul'da dokunan formalar. Ya da kendi renginizi, kendi numaranızı taşıyan tek parçayı tasarlayın.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="row" style={{ flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
              <Link to="/futbol" className="btn btn-primary btn-lg" transitionLabel="KB FUTBOL" transitionSub="Crafted for Champions" panelColor="#0a0a0b" panelText="#ff4d2e">
                Futbol koleksiyonu <IconArrow size={16} />
              </Link>
              <Link to="/basket" className="btn btn-ghost btn-lg" transitionLabel="KB BASKET" transitionSub="Parke. Çember. Bir takım." panelColor="#0a0a0b" panelText="#ff7a23">
                Basket koleksiyonu <IconArrow size={16} />
              </Link>
              <Link to="/futbol/builder" className="btn-quiet" transitionLabel="KB.LAB" transitionSub="// SYSTEM ONLINE" panelColor="#06080c" panelText="#00f0ff" style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                // KB.LAB'da kendinizinkini tasarlayın <IconArrow size={14} />
              </Link>
            </div>
          </Reveal>

          {/* live status row — KB-style scoreboard */}
          <Reveal delay={480}>
            <div className="row" style={{ marginTop: 40, flexWrap: 'wrap', gap: 12 }}>
              <div className="scoreboard">
                <div className="seg is-live"><span className="lbl">CANLI</span><span className="val">ATÖLYE</span></div>
                <div className="seg"><span className="lbl">SİPARİŞ</span><span className="val">142 / GÜN</span></div>
                <div className="seg"><span className="lbl">ÜRETİM</span><span className="val">7–14 GÜN</span></div>
                <div className="seg"><span className="lbl">KARGO</span><span className="val">1–3 GÜN</span></div>
                <div className="seg"><span className="lbl">KDV</span><span className="val">DAHİL %20</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={[
        'CRAFTED FOR CHAMPIONS', { text: 'KB SPOR', hi: true }, 'EST 2020', 'İSTANBUL', 'FW 26 / 27', 'MAISON KB', 'KB.LAB', 'MADE-TO-ORDER', 'İTALYAN KUMAŞ',
      ]} />

      {/* =================================================================
            HUB SPLIT — Futbol / Basket
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>İKİ DESTİNASYON · BİR SEPET</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 56 }}>Spordan iki dil. <span className="italic-display muted">Aynı dokuma.</span></h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)' }} className="hub-split-grid">
          <HubSplitPane
            to="/futbol"
            eyebrow="KB FUTBOL"
            title="Saha. Tribün. Bir parça."
            description="Avrupa'nın en iyi kulüpleri, milli takımlar, klasikler ve sizin için tek parça forma. Krampon ve top koleksiyonu da burada."
            bullets={['Klasik · Takım · Ülke formaları (made-to-order)', 'Krampon, top, antrenman aksesuarları', 'KB.LAB — 3D custom forma tasarımı']}
            accentColor="#ff4d2e"
            ctaLabel="KB Futbol'a gir"
            transitionLabel="KB FUTBOL"
            transitionSub="Crafted for Champions"
            panelColor="#0a0a0b"
            panelText="#ff4d2e"
            decoration="futbol"
          />
          <HubSplitPane
            to="/basket"
            eyebrow="KB BASKET"
            title="Parke. Çember. Bir takım."
            description="NBA ve BSL takımlarının formaları, profesyonel basketbol topları, ve yakında — performans ayakkabısı."
            bullets={['NBA ve BSL takım formaları (made-to-order)', 'Profesyonel basketbol topları (gerçek stok)', 'Basketbol ayakkabısı — yakında']}
            accentColor="#ff7a23"
            ctaLabel="KB Basket'a gir"
            transitionLabel="KB BASKET"
            transitionSub="Parke. Çember. Bir takım."
            panelColor="#0a0a0b"
            panelText="#ff7a23"
            decoration="basket"
          />
        </div>
      </section>

      {/* =================================================================
            THREE WORLDS — Maison KB, KB.LAB, Atölye narrative
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(40px, 6vw, 80px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>ÜÇ DÜNYA · BİR ATÖLYE</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 56 }}>Hangi koltukta oturmak istersiniz?</h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }} className="three-worlds-grid">
          <WorldCard
            to="/futbol/klasik"
            eyebrow="MAISON KB · HERITAGE"
            title="Bir kez dokunmuş."
            body="Maradona '86, Zidane '98, Cristiano '07. Numaralandırılmış, sertifikalandırılmış, el işçiliğiyle yeniden dokunmuş efsane formalar."
            tone="gold"
            transitionLabel="MAISON KB"
            transitionSub="Heritage · Crafted Once"
            panelColor="#050403"
            panelText="#d4af37"
            accent={<MaisonAccent />}
          />
          <WorldCard
            to="/futbol/builder"
            eyebrow="// KB.LAB"
            title="Tek parça spesifikasyon."
            body="4 şablon, 3 kumaş, sınırsız renk. Gerçek zamanlı 3D — paylaşabileceğiniz bir URL ile saklayın, üretime gönderin."
            tone="neon"
            transitionLabel="KB.LAB"
            transitionSub="// SYSTEM ONLINE"
            panelColor="#06080c"
            panelText="#00f0ff"
            accent={<LabAccent />}
          />
          <WorldCard
            to="/atolye"
            eyebrow="ATÖLYE · BEŞİKTAŞ"
            title="Önce ip, sonra forma."
            body="Levent Atölye'de her forma elle dikilir. Sipariş geldikten 7–14 gün sonra üretim biter, 1–3 gün sonra kapınızda."
            tone="kinetic"
            accent={<AtolyeAccent />}
          />
        </div>
      </section>

      {/* =================================================================
            FEATURED DROPS — combined products from both hubs
         ================================================================= */}
      <Section
        eyebrow="ÖNE ÇIKANLAR · BU HAFTA"
        heading={<>Bu hafta <span className="italic-display muted">vitrinde</span>.</>}
        cta={<Link to="/futbol" className="btn-quiet"><span style={{ font: '600 13px/1 var(--font-sans)' }}>Tüm koleksiyon</span> <IconArrow className="arrow" size={14} /></Link>}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }} className="featured-grid">
          {SPOR_FEATURED.map((item, i) => (
            <li key={item.to} className="product-card" style={{ position: 'relative', padding: 22 }}>
              <Link to={item.to}>
                <span className="league-tag">{item.tag}</span>
                <JerseyChip primary={item.primary} secondary={item.secondary} accent={item.accent} crest={item.crest} num={item.num} pattern={item.pattern} />
                <div className="title">{item.title}</div>
                <div className="sub">{item.sub}</div>
                <div className="price">{item.price}</div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* =================================================================
            VOICE / Strapline closer
         ================================================================= */}
      <section className="full-bleed" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 'clamp(80px, 12vw, 160px) var(--gut)', background: 'var(--bg-2)' }}>
        <div className="container" style={{ textAlign: 'center', padding: 0 }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>STRAPLINE · EST 2020</div>
            <h2 className="h-display" style={{ maxWidth: '14ch', margin: '0 auto', textAlign: 'center' }}>
              <span className="italic-display">Şampiyonlar</span> için<br />dokunmuş.
            </h2>
            <p className="text-lead muted" style={{ maxWidth: '52ch', margin: '32px auto 0' }}>
              Made-to-order. İtalyan kumaşı. İstanbul'da, Levent atölyesinde tek tek üretilir. Stok yok — sadece sizin için dokunan parça.
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hub-split-grid, .three-worlds-grid { grid-template-columns: 1fr !important; }
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ---------- HubSplitPane ----------------------------------------------- */
function HubSplitPane({ to, eyebrow, title, description, bullets, accentColor, ctaLabel, transitionLabel, transitionSub, panelColor, panelText, decoration }) {
  const [hover, setHover] = useStateSpor(false);
  return (
    <Link
      to={to}
      transitionLabel={transitionLabel}
      transitionSub={transitionSub}
      panelColor={panelColor}
      panelText={panelText}
      className="hub-pane"
      style={{
        position: 'relative', overflow: 'hidden',
        background: hover ? 'var(--bg-2)' : 'var(--bg)',
        padding: 'clamp(36px, 5vw, 64px)',
        minHeight: 460,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transition: 'all var(--d-base) var(--ease-standard)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Decoration */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: hover ? 1 : 0.5, transition: 'opacity var(--d-base)' }}>
        {decoration === 'futbol' && <FutbolPaneDeco color={accentColor} />}
        {decoration === 'basket' && <BasketPaneDeco color={accentColor} />}
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ height: 1, width: 48, background: accentColor, marginBottom: 18 }} />
        <div className="eyebrow" style={{ marginBottom: 22 }}>{eyebrow}</div>
        <h3 className="h-1" style={{ marginBottom: 18, maxWidth: '14ch' }}>{title}</h3>
        <p className="text-body muted" style={{ maxWidth: '40ch', marginBottom: 24 }}>{description}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          {bullets.map((b) => (
            <li key={b} className="text-small" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-block', width: 12, height: 1, background: 'var(--line-2)' }} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ position: 'relative', marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="row" style={{ font: '600 16px/1 var(--font-sans)', color: hover ? accentColor : 'var(--text)', transition: 'color var(--d-fast)' }}>
          {ctaLabel} <IconArrow size={16} />
        </span>
        <span className="text-micro" style={{ color: 'var(--dim)' }}>01 / 02</span>
      </div>
    </Link>
  );
}

/* ---------- decorations for the hub-split panes ------------------------ */
function FutbolPaneDeco({ color }) {
  return (
    <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="fp-glow" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="460" fill="url(#fp-glow)" />
      {/* pitch arc */}
      <circle cx="540" cy="80" r="180" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.25" />
      <circle cx="540" cy="80" r="100" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.18" />
      <circle cx="540" cy="80" r="40" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.10" />
      {/* corner flag triangles */}
      <path d="M0 440 L40 440 L0 400 Z" fill={color} fillOpacity="0.10" />
    </svg>
  );
}
function BasketPaneDeco({ color }) {
  return (
    <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="bp-glow" cx="85%" cy="80%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="460" fill="url(#bp-glow)" />
      {/* hoop */}
      <ellipse cx="510" cy="380" rx="80" ry="22" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
      <ellipse cx="510" cy="380" rx="80" ry="22" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.20" transform="translate(0 -2)" />
      {/* net */}
      {[0,1,2,3,4,5,6,7,8].map((i) => (
        <line key={i} x1={440 + i*16} y1="380" x2={450 + i*12 + 12} y2="440" stroke={color} strokeWidth="0.6" strokeOpacity="0.4" />
      ))}
      <line x1="430" y1="378" x2="590" y2="378" stroke={color} strokeWidth="1" strokeOpacity="0.18" />
    </svg>
  );
}

/* ---------- WorldCard --------------------------------------------------- */
function WorldCard({ to, eyebrow, title, body, tone, accent, transitionLabel, transitionSub, panelColor, panelText }) {
  const palette = {
    gold: { rule: '#d4af37', bg: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06), transparent 60%)' },
    neon: { rule: '#00f0ff', bg: 'radial-gradient(ellipse at center, rgba(0,240,255,0.08), transparent 60%)' },
    kinetic: { rule: '#ff4d2e', bg: 'radial-gradient(ellipse at center, rgba(255,77,46,0.05), transparent 60%)' },
  }[tone];
  return (
    <Link
      to={to}
      transitionLabel={transitionLabel}
      transitionSub={transitionSub}
      panelColor={panelColor}
      panelText={panelText}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg)',
        padding: 'clamp(32px, 4vw, 48px)',
        minHeight: 360,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transition: 'background var(--d-fast)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: palette.bg, pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ height: 1, width: 36, background: palette.rule, marginBottom: 18 }} />
        <div className="eyebrow" style={{ marginBottom: 22, color: palette.rule }}>{eyebrow}</div>
        <h3 className="h-2" style={{ marginBottom: 16, maxWidth: '14ch' }}>{title}</h3>
        <p className="text-body muted" style={{ maxWidth: '36ch' }}>{body}</p>
      </div>
      <div style={{ position: 'relative', marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {accent}
        <span className="row" style={{ font: '600 14px/1 var(--font-sans)' }}>Keşfet <IconArrow size={14} /></span>
      </div>
    </Link>
  );
}

function MaisonAccent() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92">
      <defs>
        <radialGradient id="m-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="46" cy="46" r="40" fill="url(#m-g)" />
      <circle cx="46" cy="46" r="36" fill="none" stroke="#d4af37" strokeWidth="0.8" />
      <text x="46" y="51" textAnchor="middle" fontFamily="Playfair Display, serif" fontWeight="700" fontSize="14" fill="#d4af37" fontStyle="italic">Maison</text>
      <text x="46" y="66" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="2" fill="#d4af37" opacity="0.7">N°001/12</text>
    </svg>
  );
}
function LabAccent() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92">
      <rect x="6" y="6" width="80" height="80" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="2 4" />
      <path d="M20 20 H32 M20 20 V32 M72 20 H60 M72 20 V32 M20 72 H32 M20 72 V60 M72 72 H60 M72 72 V60" stroke="#00f0ff" strokeWidth="1.2" />
      <text x="46" y="50" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9" letterSpacing="2" fill="#00f0ff">// KB.LAB</text>
      <text x="46" y="62" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1.5" fill="#b1ff5b">RENDER_OK</text>
    </svg>
  );
}
function AtolyeAccent() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92">
      <circle cx="46" cy="46" r="36" fill="none" stroke="#8b8b94" strokeWidth="0.6" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
        const a = (i / 12) * Math.PI * 2;
        return <line key={i} x1={46 + Math.cos(a)*32} y1={46 + Math.sin(a)*32} x2={46 + Math.cos(a)*36} y2={46 + Math.sin(a)*36} stroke="#8b8b94" strokeWidth="0.8" />;
      })}
      <line x1="46" y1="46" x2="46" y2="26" stroke="#ff4d2e" strokeWidth="1.5" />
      <line x1="46" y1="46" x2="62" y2="46" stroke="#f6f6f8" strokeWidth="1" />
      <circle cx="46" cy="46" r="2" fill="#ff4d2e" />
    </svg>
  );
}

Object.assign(window, { HubSporPage });
