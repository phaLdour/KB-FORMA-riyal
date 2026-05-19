/* =============================================================================
 * page-basket.jsx — KB Basket hub
 * Mood: basket (custom — court parquet, NBA prime-time, electric secondary)
 * ============================================================================= */

const { useState: useSB, useMemo: useMSB } = React;

const BASKET_CONFERENCES = [
  { id: 'all', label: 'Tümü' },
  { id: 'east', label: 'Doğu' },
  { id: 'west', label: 'Batı' },
  { id: 'bsl',  label: 'BSL · Türkiye' },
];

const BASKET_PRODUCTS = [
  { to: '/basket/pdp/lakers',     title: 'LA Lakers',     sub: 'NBA Batı · 26/27',  price: '2.799,00 ₺', primary: '#552583', secondary: '#FDB927', accent: '#FDB927', crest: 'LAL', num: '23', pattern: 'plain',     conf: 'west', tag: 'NBA · West' },
  { to: '/basket/pdp/warriors',   title: 'Golden State',  sub: 'NBA Batı · 26/27',  price: '2.799,00 ₺', primary: '#1D428A', secondary: '#FFC72C', accent: '#FFC72C', crest: 'GSW', num: '30', pattern: 'plain',     conf: 'west', tag: 'NBA · West' },
  { to: '/basket/pdp/nuggets',    title: 'Denver Nuggets', sub: 'NBA Batı · 26/27', price: '2.799,00 ₺', primary: '#0E2240', secondary: '#FEC524', accent: '#FEC524', crest: 'DEN', num: '15', pattern: 'plain',     conf: 'west', tag: 'NBA · West' },
  { to: '/basket/pdp/suns',       title: 'Phoenix Suns',  sub: 'NBA Batı · 26/27',  price: '2.799,00 ₺', primary: '#1D1160', secondary: '#E56020', accent: '#E56020', crest: 'PHX', num: '1',  pattern: 'plain',     conf: 'west', tag: 'NBA · West' },
  { to: '/basket/pdp/mavericks',  title: 'Dallas Mavericks', sub: 'NBA Batı · 26/27', price: '2.799,00 ₺', primary: '#00538C', secondary: '#002B5E', accent: '#fff', crest: 'DAL', num: '77', pattern: 'plain',     conf: 'west', tag: 'NBA · West' },
  { to: '/basket/pdp/celtics',    title: 'Boston Celtics', sub: 'NBA Doğu · 26/27', price: '2.799,00 ₺', primary: '#007A33', secondary: '#BA9653', accent: '#BA9653', crest: 'BOS', num: '0',  pattern: 'plain',     conf: 'east', tag: 'NBA · East' },
  { to: '/basket/pdp/heat',       title: 'Miami Heat',    sub: 'NBA Doğu · 26/27',  price: '2.799,00 ₺', primary: '#98002E', secondary: '#F9A01B', accent: '#F9A01B', crest: 'MIA', num: '22', pattern: 'plain',     conf: 'east', tag: 'NBA · East' },
  { to: '/basket/pdp/bucks',      title: 'Milwaukee Bucks', sub: 'NBA Doğu · 26/27', price: '2.799,00 ₺', primary: '#00471B', secondary: '#EEE1C6', accent: '#EEE1C6', crest: 'MIL', num: '34', pattern: 'plain',     conf: 'east', tag: 'NBA · East' },
  { to: '/basket/pdp/knicks',     title: 'New York Knicks', sub: 'NBA Doğu · 26/27', price: '2.799,00 ₺', primary: '#006BB6', secondary: '#F58426', accent: '#F58426', crest: 'NYK', num: '11', pattern: 'plain',     conf: 'east', tag: 'NBA · East' },
  { to: '/basket/pdp/sixers',     title: 'Philadelphia 76ers', sub: 'NBA Doğu · 26/27', price: '2.799,00 ₺', primary: '#006BB6', secondary: '#ED174C', accent: '#ED174C', crest: 'PHI', num: '21', pattern: 'plain',     conf: 'east', tag: 'NBA · East' },
  { to: '/basket/pdp/efes',       title: 'Anadolu Efes',  sub: 'BSL · 26/27',        price: '2.499,00 ₺', primary: '#003478', secondary: '#FFFFFF', accent: '#fff', crest: 'EFS', num: '8',  pattern: 'half',      conf: 'bsl',  tag: 'BSL' },
  { to: '/basket/pdp/fb-beko',    title: 'Fenerbahçe Beko', sub: 'BSL · 26/27',      price: '2.499,00 ₺', primary: '#0F3F8C', secondary: '#FCD116', accent: '#FCD116', crest: 'FBB', num: '4',  pattern: 'stripes-h', conf: 'bsl',  tag: 'BSL' },
  { to: '/basket/pdp/gs-nef',     title: 'Galatasaray NEF', sub: 'BSL · 26/27',      price: '2.499,00 ₺', primary: '#A90432', secondary: '#FFB81C', accent: '#FFB81C', crest: 'GSN', num: '9',  pattern: 'half',      conf: 'bsl',  tag: 'BSL' },
  { to: '/basket/pdp/bahcesehir', title: 'Bahçeşehir Kol.', sub: 'BSL · 26/27',      price: '2.499,00 ₺', primary: '#7A1F2E', secondary: '#FFFFFF', accent: '#fff', crest: 'BAH', num: '5',  pattern: 'plain',     conf: 'bsl',  tag: 'BSL' },
];

function BasketPage() {
  const [conf, setConf] = useSB('all');
  const filtered = useMSB(
    () => conf === 'all' ? BASKET_PRODUCTS : BASKET_PRODUCTS.filter((p) => p.conf === conf),
    [conf]
  );
  const [email, setEmail] = useSB('');
  const [emailDone, setEmailDone] = useSB(false);

  return (
    <div>
      {/* =================================================================
            HERO — court overhead view, basketball + hoop
         ================================================================= */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,122,35,0.16), transparent 60%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 10% 80%, rgba(0,212,255,0.10), transparent 60%)' }} />
          <div className="bg-parquet" style={{ position: 'absolute', inset: 'auto 0 0 0', height: '40%', opacity: 0.18 }} />
        </div>

        {/* Right-side: court half-circle key + hoop seen from court */}
        <div aria-hidden="true" style={{ position: 'absolute', right: 'calc(-1 * var(--gut))', top: '5vh', opacity: 0.6, pointerEvents: 'none' }} className="hide-on-tablet">
          <BasketCourtKey />
        </div>

        <div className="container" style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(80px, 11vw, 140px)' }}>
          <Reveal>
            <div className="eyebrow"><span className="eyebrow-dot" />KB BASKET · FW 26 / 27 · TIPOFF</div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="h-display" style={{ maxWidth: '12ch', marginTop: 32 }}>
              Parke.<br />
              <span className="italic-display" style={{ color: 'var(--accent)' }}>Çember.</span><br />
              Bir takım.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-lead muted" style={{ maxWidth: '56ch', marginTop: 32 }}>
              NBA'in 30 takımı, BSL'nin tüm büyükleri, premium kumaşla made-to-order. Profesyonel basketbol topları gerçek stokta. Ve yakında — performans ayakkabısı.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="row" style={{ flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
              <a href="#nba" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('nba')?.scrollIntoView({ behavior: 'smooth' }); }}>
                NBA Formaları <IconArrow size={16} />
              </a>
              <button className="btn btn-ghost btn-lg" onClick={() => { setConf('bsl'); document.getElementById('nba')?.scrollIntoView({ behavior: 'smooth' }); }}>
                BSL Formaları <IconArrow size={16} />
              </button>
              <a href="#shoes" className="btn-quiet" onClick={(e) => { e.preventDefault(); document.getElementById('shoes')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-2)' }}>
                Yakında · ayakkabı <IconArrow size={14} />
              </a>
            </div>
          </Reveal>

          {/* Tipoff scoreboard — basketball flavor */}
          <Reveal delay={480}>
            <div className="row" style={{ marginTop: 44, flexWrap: 'wrap', gap: 12 }}>
              <div className="scoreboard">
                <div className="seg is-live"><span className="lbl">TIPOFF</span><span className="val">SEZON AÇIK</span></div>
                <div className="seg"><span className="lbl">NBA</span><span className="val">30 TAKIM</span></div>
                <div className="seg"><span className="lbl">BSL</span><span className="val">16 TAKIM</span></div>
                <div className="seg"><span className="lbl">BEDEN</span><span className="val">XS — 3XL</span></div>
                <div className="seg"><span className="lbl">AYAKKABI</span><span className="val" style={{ color: 'var(--accent-2)' }}>YAKINDA</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={[
        'KB BASKET', { text: 'PARKE · ÇEMBER · TAKIM', hi: true }, 'NBA · BSL', '30 + 16 TAKIM',
        'MADE-TO-ORDER', '7–14 GÜN', 'COMING SOON · SHOES', 'İSTANBUL', 'XS — 3XL',
      ]} />

      {/* =================================================================
            CONFERENCE SPLIT — visual divider East vs West vs BSL
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>İKİ KONFERANS · BİR LİG · ARTI TÜRKİYE</div>
          <h2 className="h-2" style={{ maxWidth: '22ch', marginBottom: 56 }}>
            Doğu, batı, ve <span className="italic-display muted">Süper Lig</span>.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }} className="conf-grid">
          <ConferencePane
            onClick={() => { setConf('east'); document.getElementById('nba')?.scrollIntoView({ behavior: 'smooth' }); }}
            eyebrow="NBA · DOĞU KONFERANSI"
            title="Atlantic, Central, Southeast."
            desc="Celtics, Bucks, Heat, Knicks, Sixers ve diğer 10 doğu takımı."
            count="15 TAKIM"
            color="#ff7a23"
          />
          <ConferencePane
            onClick={() => { setConf('west'); document.getElementById('nba')?.scrollIntoView({ behavior: 'smooth' }); }}
            eyebrow="NBA · BATI KONFERANSI"
            title="Northwest, Pacific, Southwest."
            desc="Lakers, Warriors, Nuggets, Suns, Mavericks ve diğer 10 batı takımı."
            count="15 TAKIM"
            color="#00d4ff"
          />
          <ConferencePane
            onClick={() => { setConf('bsl'); document.getElementById('nba')?.scrollIntoView({ behavior: 'smooth' }); }}
            eyebrow="BSL · TÜRKİYE"
            title="Yerel parke."
            desc="Anadolu Efes, FB Beko, GS NEF, Bahçeşehir Koleji ve diğer BSL takımları."
            count="16 TAKIM"
            color="#e85d24"
            isBSL
          />
        </div>
      </section>

      {/* =================================================================
            CONFERENCE PILLS + JERSEY GRID
         ================================================================= */}
      <section id="nba" className="container" style={{ paddingBlock: 'clamp(40px, 5vw, 80px)' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>FORMALAR · {filtered.length} ÜRÜN</div>
              <h2 className="h-2" style={{ maxWidth: '20ch' }}>Parkenin tüm üniformları.</h2>
            </div>
            <span className="text-micro" style={{ color: 'var(--dim)' }}>NBA: full kit · BSL: home + road</span>
          </div>
        </Reveal>

        {/* Conference pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
          {BASKET_CONFERENCES.map((c) => (
            <button
              key={c.id}
              className={`pill ${conf === c.id ? 'is-active' : ''}`}
              onClick={() => setConf(c.id)}
            >
              {c.label}
              {conf === c.id && <span style={{ color: 'var(--dim)', marginLeft: 4 }}>
                · {c.id === 'all' ? BASKET_PRODUCTS.length : BASKET_PRODUCTS.filter(p => p.conf === c.id).length}
              </span>}
            </button>
          ))}
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }} className="basket-products-grid">
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
            BALLS — real stock highlight
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 14 }}>TOPLAR · GERÇEK STOK</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 40 }}>Maç gününde sahanın merkezinde.</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }} className="balls-grid">
          <BallCard title="KB Pro" sub="Maç topu · İç saha" price="999,00 ₺" tag="MAÇ KALİTESİ" tone="primary" />
          <BallCard title="KB Court" sub="Antrenman · Çift yüzey" price="699,00 ₺" tag="ANTRENMAN" tone="muted" />
          <BallCard title="KB Street" sub="Açık saha · Sentetik" price="499,00 ₺" tag="STREET" tone="secondary" />
        </div>
      </section>

      {/* =================================================================
            COMING SOON — Basketball Shoes (the big marquee surface)
         ================================================================= */}
      <section id="shoes" className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--bg-2)', minHeight: 480 }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 30%, rgba(0,212,255,0.18), transparent 60%), radial-gradient(ellipse at 20% 90%, rgba(255,122,35,0.10), transparent 60%)' }} />
          <div aria-hidden="true" className="bg-parquet" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 32, padding: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }} className="shoes-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 18, color: 'var(--accent-2)' }}>YAKINDA · COMING SOON</div>
              <h2 className="h-1" style={{ maxWidth: '14ch', marginBottom: 20 }}>
                Basketbol<br />
                <span className="italic-display" style={{ color: 'var(--accent-2)' }}>ayakkabıları</span>.
              </h2>
              <p className="text-body muted" style={{ maxWidth: '48ch', marginBottom: 32 }}>
                KB Basket'in ilk performans ayakkabısı koleksiyonu üretim sürecinde. Profesyonel parke ve outdoor için iki ayrı kalıp. E-posta bırakın, lansman gününü ilk siz öğrenin.
              </p>

              {/* Email capture */}
              {!emailDone ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setEmailDone(true); }}
                  style={{ display: 'flex', gap: 0, maxWidth: 460, border: '1px solid var(--line-2)', background: 'var(--bg)', borderRadius: 12 }}
                >
                  <input
                    type="email"
                    placeholder="e-posta@adresiniz.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flex: 1, padding: '0 18px', height: 52, fontSize: 14, color: 'var(--text)' }}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 12px 12px 0', height: 52 }}>
                    Bildirim al <IconArrow size={14} />
                  </button>
                </form>
              ) : (
                <div className="row" style={{ gap: 12, padding: '16px 18px', border: '1px solid var(--accent-2)', borderRadius: 12, background: 'rgba(0,212,255,0.06)', maxWidth: 460 }}>
                  <IconCheck size={20} />
                  <span style={{ fontSize: 14 }}>Listeye eklendiniz. İlk haberi alacaksınız.</span>
                </div>
              )}

              <div className="row" style={{ marginTop: 28, gap: 28, flexWrap: 'wrap' }}>
                <Spec lbl="HEDEF" val="SONBAHAR 27" />
                <Spec lbl="KALIP" val="2 (INDOOR · OUTDOOR)" />
                <Spec lbl="TR ÜRETİM" val="EVET" />
              </div>
            </div>

            <div style={{ position: 'relative', textAlign: 'center' }}>
              <ShoeMockup />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
            CLOSER — court oath
         ================================================================= */}
      <section className="full-bleed" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 'clamp(80px, 12vw, 140px) var(--gut)', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, rgba(255,122,35,0.06), transparent 60%)' }} />
        <div aria-hidden="true" className="bg-parquet" style={{ position: 'absolute', inset: 0, opacity: 0.10 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center', padding: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center' }}><span className="eyebrow-dot" />PARKE · 19:30 · İSTANBUL</div>
          <h2 className="h-display" style={{ maxWidth: '16ch', margin: '0 auto' }}>
            48 dakika için <span className="italic-display" style={{ color: 'var(--accent)' }}>dokunmuş</span>.
          </h2>
          <p className="text-lead muted" style={{ maxWidth: '52ch', margin: '28px auto 0' }}>
            KB Basket formaları parkenin yoğunluğuna dayanan kumaşla, made-to-order üretilir. Bedeniniz size özel, numaranız sizin.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .conf-grid, .balls-grid { grid-template-columns: 1fr !important; }
          .basket-products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .shoes-grid { grid-template-columns: 1fr !important; }
          .hide-on-tablet { display: none !important; }
        }
        @media (max-width: 540px) {
          .basket-products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Spec({ lbl, val }) {
  return (
    <div>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 6 }}>{lbl}</div>
      <div style={{ font: '700 14px/1 var(--font-mono)', letterSpacing: '0.04em' }}>{val}</div>
    </div>
  );
}

function ConferencePane({ onClick, eyebrow, title, desc, count, color, isBSL }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative', overflow: 'hidden', background: 'var(--bg)',
        padding: 'clamp(28px, 4vw, 44px)', minHeight: 280, textAlign: 'left',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transition: 'background var(--d-fast)', cursor: 'pointer',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}
    >
      {/* decorative hoop */}
      <svg aria-hidden="true" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.35 }} width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="80" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
        {isBSL ? (
          <text x="90" y="98" textAnchor="middle" fontFamily="Playfair Display" fontWeight="800" fontSize="58" fill={color} fillOpacity="0.7">TR</text>
        ) : (
          <text x="90" y="106" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="80" letterSpacing="-3" fill={color} fillOpacity="0.7">{eyebrow.includes('DOĞU') ? 'E' : 'W'}</text>
        )}
      </svg>

      <div style={{ position: 'relative' }}>
        <div style={{ height: 1, width: 36, background: color, marginBottom: 16 }} />
        <div className="eyebrow" style={{ marginBottom: 18, color }}>{eyebrow}</div>
        <h3 className="h-3" style={{ marginBottom: 12 }}>{title}</h3>
        <p className="text-small muted" style={{ maxWidth: '34ch' }}>{desc}</p>
      </div>
      <div style={{ position: 'relative', marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="row" style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--text)' }}>Görüntüle <IconArrow size={14} /></span>
        <span className="text-micro" style={{ color }}>{count}</span>
      </div>
    </button>
  );
}

function BallCard({ title, sub, price, tag, tone }) {
  const color = tone === 'primary' ? 'var(--accent)' : tone === 'secondary' ? 'var(--accent-2)' : 'var(--muted)';
  return (
    <div className="card" style={{ padding: 'clamp(28px, 3.5vw, 40px)', background: 'var(--bg)', minHeight: 320, position: 'relative' }}>
      <div style={{ height: 1, width: 36, background: color, marginBottom: 16 }} />
      <div className="text-micro" style={{ color, marginBottom: 18 }}>{tag}</div>
      <h3 className="h-3" style={{ marginBottom: 8 }}>{title}</h3>
      <p className="text-small muted">{sub}</p>
      <div style={{ marginTop: 24, opacity: 0.9 }}>
        <BasketballSVG color={color} />
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="price">{price}</span>
        <span className="text-micro" style={{ color: 'var(--dim)' }}>STOKTA</span>
      </div>
    </div>
  );
}

function BasketballSVG({ color = 'var(--accent)' }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="bgrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#bgrad)" />
      <path d="M50 8 V92" stroke="#0a0a0b" strokeWidth="1.2" />
      <path d="M8 50 H92" stroke="#0a0a0b" strokeWidth="1.2" />
      <path d="M14 26 Q50 42 86 26" fill="none" stroke="#0a0a0b" strokeWidth="1.2" />
      <path d="M14 74 Q50 58 86 74" fill="none" stroke="#0a0a0b" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />
    </svg>
  );
}

function ShoeMockup() {
  return (
    <svg width="380" height="280" viewBox="0 0 380 280" style={{ maxWidth: '100%' }}>
      <defs>
        <linearGradient id="sh-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15151a" />
          <stop offset="100%" stopColor="#0a0a0b" />
        </linearGradient>
        <linearGradient id="sh-strike" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#ff7a23" />
        </linearGradient>
      </defs>

      {/* parquet stripe under shoe */}
      <rect x="40" y="220" width="300" height="8" fill="#c08a4c" opacity="0.18" />
      <rect x="40" y="232" width="300" height="3" fill="#8a5a2e" opacity="0.18" />

      {/* shoe body — silhouette of a high-top basketball shoe */}
      <path d="M40 220 Q40 180 80 170 L140 160 Q170 140 200 140 L260 142 Q310 148 330 175 Q345 195 345 215 L340 222 Q260 230 40 222 Z" fill="url(#sh-g)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
      {/* swoosh-like strike */}
      <path d="M120 200 Q200 165 300 195" fill="none" stroke="url(#sh-strike)" strokeWidth="6" strokeLinecap="round" />
      {/* laces */}
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.2">
        <line x1="160" y1="170" x2="200" y2="160" />
        <line x1="170" y1="178" x2="210" y2="168" />
        <line x1="180" y1="186" x2="220" y2="176" />
        <line x1="190" y1="194" x2="230" y2="184" />
      </g>
      {/* outsole */}
      <rect x="40" y="218" width="300" height="6" fill="#1a1a20" />
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.6">
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((i) => (
          <line key={i} x1={50 + i*22} y1="218" x2={50 + i*22} y2="224" />
        ))}
      </g>

      {/* HUD blueprint marks */}
      <g stroke="rgba(0,212,255,0.7)" strokeWidth="0.5" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(0,212,255,0.85)" letterSpacing="2">
        <line x1="40" y1="240" x2="40" y2="260" />
        <line x1="340" y1="240" x2="340" y2="260" />
        <line x1="40" y1="255" x2="340" y2="255" />
        <text x="190" y="270" textAnchor="middle">// KB BASKET · PROTOTYPE A</text>
      </g>
    </svg>
  );
}

function BasketCourtKey() {
  return (
    <svg width="520" height="480" viewBox="0 0 520 480">
      <defs>
        <linearGradient id="court-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c08a4c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8a5a2e" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      {/* parquet panel */}
      <rect x="20" y="40" width="480" height="400" fill="url(#court-g)" />
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none">
        {/* baseline */}
        <line x1="20" y1="440" x2="500" y2="440" />
        {/* free throw lane */}
        <rect x="160" y="280" width="200" height="160" />
        {/* free throw circle */}
        <circle cx="260" cy="280" r="56" />
        <path d="M204 280 A56 56 0 0 1 316 280" stroke="rgba(255,255,255,0.36)" />
        {/* three point arc */}
        <path d="M40 440 Q40 180 260 180 Q480 180 480 440" />
        {/* hoop */}
        <line x1="240" y1="420" x2="280" y2="420" stroke="var(--accent)" strokeWidth="2" />
        <circle cx="260" cy="420" r="9" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
      </g>
      {/* annotations */}
      <text x="260" y="68" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="3" fill="rgba(255,255,255,0.6)">FRONTCOURT · KB BASKET</text>
      <text x="260" y="232" textAnchor="middle" fontFamily="Playfair Display" fontWeight="800" fontSize="42" letterSpacing="-2" fill="rgba(255,255,255,0.10)" fontStyle="italic">çember</text>
    </svg>
  );
}

Object.assign(window, { BasketPage });
