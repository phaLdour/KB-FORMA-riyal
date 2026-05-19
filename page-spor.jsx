/* =============================================================================
 * page-pdp.jsx — Product detail page (forma)
 * Works for any slug; pulls metadata from a dictionary so we can demo classic
 * (editorial mood) and current-season (kinetic mood) variants from the same component.
 * ============================================================================= */

const { useState: useSP, useEffect: useEP } = React;

// Tiny catalog covering the slugs we link to from hubs/featured
const PDP_CATALOG = {
  galatasaray: { title: 'Galatasaray',   league: 'Süper Lig · 2026/27', primary: '#A90432', secondary: '#FFB81C', accent: '#FFB81C', crest: 'GS', num: '10', pattern: 'half',      price: '2.299,00 ₺', mood: 'futbol', context: 'futbol', city: 'İstanbul', stadium: 'Rams Park', story: 'Aslanların bu sezonki iç saha forması — kırmızı-sarı yarım renk bloklaması, italyan jakar kumaş, made-to-order üretim.' },
  fenerbahce:  { title: 'Fenerbahçe',     league: 'Süper Lig · 2026/27', primary: '#0F3F8C', secondary: '#FCD116', accent: '#FCD116', crest: 'FB', num: '7',  pattern: 'stripes-v', price: '2.299,00 ₺', mood: 'futbol', context: 'futbol', city: 'İstanbul', stadium: 'Şükrü Saracoğlu', story: 'Lacivert-sarı şeritlerin yeniden yorumu — klasik kanaryalı kesim, prima jakar kumaş.' },
  besiktas:    { title: 'Beşiktaş',       league: 'Süper Lig · 2026/27', primary: '#000000', secondary: '#FFFFFF', accent: '#fff', crest: 'BJK', num: '14', pattern: 'stripes-v', price: '2.299,00 ₺', mood: 'futbol', context: 'futbol', city: 'İstanbul', stadium: 'Tüpraş Stadyumu', story: 'Kartalın siyah-beyaz şeritleri, Boğaz manzaralı atölyede yeniden dokundu.' },
  'real-madrid': { title: 'Real Madrid',  league: 'La Liga · 2026/27',   primary: '#F5F5F5', secondary: '#FEBE10', accent: '#0a0a0b', crest: 'RM', num: '9',  pattern: 'plain',      price: '2.599,00 ₺', mood: 'futbol', context: 'futbol', city: 'Madrid',  stadium: 'Santiago Bernabéu', story: 'Beyaz şehrin elitleri için — altın detaylar, ipek dokuma yaka, beyaz baz.' },
  barcelona:   { title: 'Barcelona',      league: 'La Liga · 2026/27',   primary: '#A50044', secondary: '#004D98', accent: '#FCD116', crest: 'FCB', num: '10', pattern: 'stripes-v', price: '2.599,00 ₺', mood: 'futbol', context: 'futbol', city: 'Barcelona', stadium: 'Camp Nou', story: 'Blaugrana çizgilerinin son yorumu — derin bordo ve mavi, Katalan ipliğinden geçirilmiş.' },
  liverpool:   { title: 'Liverpool',      league: 'Premier League',      primary: '#C8102E', secondary: '#00B2A9', accent: '#FAC03A', crest: 'LFC', num: '9',  pattern: 'plain',      price: '2.599,00 ₺', mood: 'futbol', context: 'futbol', city: 'Liverpool', stadium: 'Anfield', story: 'Mersey kıyısının kırmızısı — altın amblem, açık-deniz ipliği.' },
  'man-city':  { title: 'Man City',       league: 'Premier League',      primary: '#6CABDD', secondary: '#1C2C5B', accent: '#fff', crest: 'MCI', num: '17', pattern: 'plain',      price: '2.599,00 ₺', mood: 'futbol', context: 'futbol', city: 'Manchester', stadium: 'Etihad', story: 'Sky blue — şehrin gökyüzünden ödünç alınmış bir renk.' },
  arsenal:     { title: 'Arsenal',        league: 'Premier League',      primary: '#EF0107', secondary: '#FFFFFF', accent: '#fff', crest: 'ARS', num: '8',  pattern: 'plain',      price: '2.599,00 ₺', mood: 'futbol', context: 'futbol', city: 'London',  stadium: 'Emirates', story: 'Topçuların kırmızı-beyaz uniforması — Londra dikiş atölyesinden yorumlandı.' },
  bayern:      { title: 'Bayern Münih',   league: 'Bundesliga',          primary: '#DC052D', secondary: '#0066B2', accent: '#fff', crest: 'FCB', num: '13', pattern: 'plain',      price: '2.499,00 ₺', mood: 'futbol', context: 'futbol', city: 'München', stadium: 'Allianz Arena', story: 'Bavyera kırmızısı, Alman dikiş hatları, savaş arabası kesimi.' },
  juventus:    { title: 'Juventus',       league: 'Serie A',             primary: '#000000', secondary: '#FFFFFF', accent: '#fff', crest: 'JUV', num: '10', pattern: 'stripes-v', price: '2.499,00 ₺', mood: 'futbol', context: 'futbol', city: 'Torino',  stadium: 'Allianz Stadium', story: 'Zebreli klasik — Torino atölyesinin bir selamı.' },
  psg:         { title: 'Paris SG',       league: 'Ligue 1',              primary: '#004170', secondary: '#DA291C', accent: '#fff', crest: 'PSG', num: '10', pattern: 'plain',      price: '2.599,00 ₺', mood: 'futbol', context: 'futbol', city: 'Paris',  stadium: 'Parc des Princes', story: 'Lacivert temel, kırmızı-beyaz kuşak — Hechter klasiği yeniden.' },
  turkiye:     { title: 'Türkiye',        league: 'Milli Takım',          primary: '#E30A17', secondary: '#FFFFFF', accent: '#fff', crest: 'TR',  num: '10', pattern: 'plain',      price: '2.199,00 ₺', mood: 'futbol', context: 'futbol', city: 'Ay-Yıldız', stadium: 'Atatürk Olimpiyat', story: 'Ay-yıldızın taşıyıcısı — bayrağın kırmızısı, dokumanın saygısı.' },
  trabzonspor: { title: 'Trabzonspor',    league: 'Süper Lig · 2026/27', primary: '#8E1538', secondary: '#1A3F94', accent: '#fff', crest: 'TS', num: '11', pattern: 'stripes-v', price: '2.299,00 ₺', mood: 'futbol', context: 'futbol', city: 'Trabzon', stadium: 'Şenol Güneş', story: 'Karadeniz dalgasının renkleri — bordo-mavi, dik yaka.' },
  atletico:    { title: 'Atlético Madrid', league: 'La Liga',            primary: '#C8102E', secondary: '#FFFFFF', accent: '#fff', crest: 'ATM', num: '7',  pattern: 'stripes-v', price: '2.499,00 ₺', mood: 'futbol', context: 'futbol', city: 'Madrid',  stadium: 'Metropolitano', story: 'Indios rojiblancos — kırmızı-beyaz şerit, sokağın disiplini.' },
  dortmund:    { title: 'Dortmund',       league: 'Bundesliga',          primary: '#FDE100', secondary: '#000000', accent: '#0a0a0b', crest: 'BVB', num: '9',  pattern: 'plain',      price: '2.499,00 ₺', mood: 'futbol', context: 'futbol', city: 'Dortmund', stadium: 'Westfalen', story: 'Sarı duvar — Westfalen tribünlerinin sesi formaya işlendi.' },
  inter:       { title: 'Inter',          league: 'Serie A',             primary: '#0033A0', secondary: '#010E80', accent: '#fff', crest: 'INT', num: '10', pattern: 'stripes-v', price: '2.499,00 ₺', mood: 'futbol', context: 'futbol', city: 'Milano',  stadium: 'San Siro', story: 'Milano nerazzurri — siyah-mavi şeridin son hali.' },

  // Maison KB Classic
  mar86: { title: 'Maradona ’86',     league: 'Maison KB · Heritage', primary: '#75AADB', secondary: '#F6B40E', accent: '#0a0a0b', crest: 'ARG', num: '10', pattern: 'stripes-v', price: '14.999,00 ₺', mood: 'editorial', context: 'classic', city: 'México', stadium: 'Estadio Azteca', story: 'Tanrı’nın eli ve futbol tarihinin en güzel solo koşusu. 22 Haziran 1986. 12 nüsha, numaralı sertifika.' },
  zid98: { title: 'Zidane ’98',       league: 'Maison KB · Heritage', primary: '#0055A4', secondary: '#EF4135', accent: '#fff', crest: 'FRA', num: '10', pattern: 'plain', price: '14.999,00 ₺', mood: 'editorial', context: 'classic', city: 'Paris',  stadium: 'Stade de France', story: 'İki kafa. 27\'nci ve 45+1\'inci dakika. Sonra — taç. 12 nüsha, hand-stitched isim.' },

  // Basket
  lakers:      { title: 'LA Lakers',  league: 'NBA · 2026/27',  primary: '#552583', secondary: '#FDB927', accent: '#FDB927', crest: 'LAL', num: '23', pattern: 'plain', price: '2.799,00 ₺', mood: 'basket', context: 'basket', city: 'Los Angeles', stadium: 'Crypto.com Arena', story: 'Showtime\'ın renkleri — mor-altın, ipek kumaş, kolsuz parke kalıp.' },
  warriors:    { title: 'Golden State', league: 'NBA · 2026/27', primary: '#1D428A', secondary: '#FFC72C', accent: '#FFC72C', crest: 'GSW', num: '30', pattern: 'plain', price: '2.799,00 ₺', mood: 'basket', context: 'basket', city: 'San Francisco', stadium: 'Chase Center', story: 'Körfez köprüsünün kahraman renkleri.' },
  celtics:     { title: 'Boston Celtics', league: 'NBA · 2026/27', primary: '#007A33', secondary: '#BA9653', accent: '#BA9653', crest: 'BOS', num: '0', pattern: 'plain', price: '2.799,00 ₺', mood: 'basket', context: 'basket', city: 'Boston', stadium: 'TD Garden', story: 'Şampiyonun yeşili — bronz amblem ile.' },
  efes:        { title: 'Anadolu Efes', league: 'BSL · 2026/27', primary: '#003478', secondary: '#FFFFFF', accent: '#fff', crest: 'EFS', num: '8', pattern: 'half', price: '2.499,00 ₺', mood: 'basket', context: 'basket', city: 'İstanbul', stadium: 'Sinan Erdem', story: 'Mavi-beyaz disiplin — Anadolu’nun parke devi.' },
  'fb-beko':   { title: 'Fenerbahçe Beko', league: 'BSL · 2026/27', primary: '#0F3F8C', secondary: '#FCD116', accent: '#FCD116', crest: 'FBB', num: '4', pattern: 'stripes-h', price: '2.499,00 ₺', mood: 'basket', context: 'basket', city: 'İstanbul', stadium: 'Ülker Spor', story: 'Sarı-lacivert parke kimliği — yatay şerit yorumu.' },
};

const PDP_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

function PDPPage({ slug }) {
  const p = PDP_CATALOG[slug];
  const [size, setSize] = useSP('L');
  const [qty, setQty] = useSP(1);
  const [view, setView] = useSP('front'); // front | back
  const [withName, setWithName] = useSP(false);
  const [customName, setCustomName] = useSP('');
  const [customNum, setCustomNum] = useSP('');
  const [tab, setTab] = useSP('story');
  const cart = useCart();

  if (!p) {
    return (
      <div className="container" style={{ paddingBlock: 120, textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16, justifyContent: 'center' }}>BULUNAMADI</div>
        <h1 className="h-1" style={{ maxWidth: '18ch', margin: '0 auto' }}>Bu forma envantere yüklenmemiş.</h1>
        <p className="muted" style={{ marginTop: 16 }}>Aradığınız parça bir koleksiyon parçası ya da yakında. Hub'a dönüp seçebilirsiniz.</p>
        <Link to="/futbol" className="btn btn-primary" style={{ marginTop: 32 }}>KB Futbol'a dön <IconArrow size={14} /></Link>
      </div>
    );
  }

  const isEditorial = p.mood === 'editorial';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container" style={{ paddingBlock: '24px 0', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', paddingBottom: 18 }}>
          <Link to="/" style={{ color: 'var(--muted)' }}>KB Spor</Link>
          <IconChevron size={11} />
          <Link to={p.context === 'basket' ? '/basket' : p.context === 'classic' ? '/futbol/klasik' : '/futbol'} style={{ color: 'var(--muted)' }}>
            {p.context === 'basket' ? 'KB Basket' : p.context === 'classic' ? 'Maison KB' : 'KB Futbol'}
          </Link>
          <IconChevron size={11} />
          <span style={{ color: 'var(--text)' }}>{p.title}</span>
        </div>
      </div>

      {/* MAIN */}
      <section className="container" style={{ paddingBlock: 'clamp(40px, 5vw, 80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'flex-start' }} className="pdp-grid">

          {/* GALLERY */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ position: 'relative', background: isEditorial ? 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent 60%)' : 'var(--bg-2)', minHeight: 600, padding: 'clamp(28px, 4vw, 56px)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}>
              {/* corner labels */}
              <div style={{ position: 'absolute', top: 14, left: 18, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: isEditorial ? 'var(--accent)' : 'var(--muted)' }}>
                {view.toUpperCase()} · {p.league.toUpperCase()}
              </div>
              <div style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: isEditorial ? 'var(--accent)' : 'var(--muted)' }}>
                {p.city.toUpperCase()} · {p.stadium.toUpperCase()}
              </div>

              <div style={{ position: 'relative', width: '70%', maxWidth: 420 }}>
                <JerseyChip
                  primary={p.primary}
                  secondary={p.secondary}
                  accent={p.accent}
                  crest={p.crest}
                  num={view === 'back' ? (withName && customNum ? customNum : p.num) : p.num}
                  pattern={p.pattern}
                  view={view}
                  name={withName && customName ? customName.toUpperCase() : (view === 'back' ? p.title.toUpperCase() : null)}
                />
                {isEditorial && (
                  <>
                    <div style={{ position: 'absolute', inset: -12, border: '1px solid var(--accent)', opacity: 0.45 }} />
                    <div style={{ position: 'absolute', inset: -20, border: '1px solid var(--accent)', opacity: 0.2 }} />
                  </>
                )}
              </div>

              <div style={{ position: 'absolute', bottom: 14, left: 18, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: isEditorial ? 'var(--accent)' : 'var(--muted)' }}>
                {isEditorial ? `N° 03 / 12 NÜSHA` : 'KB.PDP'}
              </div>
            </div>

            {/* View thumbs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {['front', 'back'].map((v) => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: '14px', background: view === v ? 'var(--surface)' : 'transparent', border: '1px solid', borderColor: view === v ? 'var(--accent)' : 'var(--line)',
                  font: '600 11px/1 var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: view === v ? 'var(--accent)' : 'var(--muted)',
                }}>
                  {v === 'front' ? 'ÖN' : 'ARKA'}
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 14, color: isEditorial ? 'var(--accent)' : 'var(--muted)' }}>{p.league}</div>
            <h1 className="h-1" style={{ marginBottom: 12, fontStyle: isEditorial ? 'italic' : 'normal' }}>{p.title}</h1>

            {/* Lead-time banner */}
            <div style={{ marginTop: 10, marginBottom: 28, padding: '14px 18px', border: '1px solid var(--line)', background: 'var(--bg-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--text)' }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent)' }} />
                MADE-TO-ORDER
              </span>
              <span className="text-small muted">Üretim 7–14 gün · Kargo 1–3 gün · KDV %20 dahil</span>
            </div>

            <p className="text-body" style={{ color: 'var(--text)', opacity: 0.88, maxWidth: '54ch', fontStyle: isEditorial ? 'italic' : 'normal', fontFamily: isEditorial ? 'var(--font-serif)' : 'var(--font-sans)' }}>
              {p.story}
            </p>

            {/* Price */}
            <div style={{ marginTop: 32, marginBottom: 32, display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ font: '700 clamp(28px, 3vw, 42px)/1 var(--font-display)', fontStyle: isEditorial ? 'italic' : 'normal', color: isEditorial ? 'var(--accent)' : 'var(--text)' }}>{p.price}</span>
              <span className="text-small muted">KDV dahil</span>
            </div>

            {/* Size picker */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span className="text-micro" style={{ color: 'var(--muted)' }}>BEDEN</span>
                <Link to="/yardim/beden" className="btn-quiet" style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Beden tablosu <IconArrow className="arrow" size={11} /></Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                {PDP_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      padding: '14px 0', font: '700 13px/1 var(--font-mono)', letterSpacing: '0.04em',
                      border: '1px solid', borderColor: size === s ? (isEditorial ? 'var(--accent)' : 'var(--accent)') : 'var(--line)',
                      background: size === s ? (isEditorial ? 'rgba(212,175,55,0.08)' : 'var(--surface)') : 'transparent',
                      color: size === s ? (isEditorial ? 'var(--accent)' : 'var(--accent)') : 'var(--text)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Name/number printing (futbol/basket only, not Maison) */}
            {!isEditorial && (
              <div style={{ marginBottom: 32, padding: 18, border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={withName} onChange={(e) => setWithName(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
                  <span style={{ font: '600 13px/1 var(--font-mono)', letterSpacing: '0.04em' }}>İSİM · NUMARA BASKILI</span>
                  <span className="text-caption muted" style={{ marginLeft: 'auto' }}>+ 150,00 ₺</span>
                </label>
                {withName && (
                  <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 90px', gap: 8 }}>
                    <input
                      type="text" placeholder="İSİM" value={customName} maxLength={12}
                      onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                      style={{ padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', font: '700 14px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--text)' }}
                    />
                    <input
                      type="text" placeholder="NO" value={customNum} maxLength={2}
                      onChange={(e) => setCustomNum(e.target.value.replace(/\D/g, '').slice(0,2))}
                      style={{ padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', font: '700 14px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--text)', textAlign: 'center' }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Quantity + Add */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', height: 56 }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 44, height: '100%', color: 'var(--muted)' }} aria-label="Azalt"><IconMinus size={14} /></button>
                <span style={{ width: 36, textAlign: 'center', font: '600 14px/1 var(--font-mono)' }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} style={{ width: 44, height: '100%', color: 'var(--muted)' }} aria-label="Artır"><IconPlus size={14} /></button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ flex: 1, height: 56, ...(isEditorial ? { background: 'var(--accent)', color: 'var(--bg)' } : null) }}
                onClick={() => cart.add()}
              >
                {isEditorial ? 'Sertifika başvurusu' : 'Sepete ekle'} · {p.price}
              </button>
              <button className="btn btn-ghost btn-lg" style={{ height: 56, width: 56, padding: 0 }} aria-label="Favorilere ekle" onClick={() => cart.fav()}>
                <IconHeart size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 40 }}>
              <Mini lbl="ÜRETİM" val="7–14 GÜN" />
              <Mini lbl="KARGO" val="1–3 GÜN" />
              <Mini lbl="İADE" val="14 GÜN" />
            </div>

            {/* Tabs */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}>
              <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--line)' }}>
                {[
                  { id: 'story', label: 'Hikâye' },
                  { id: 'fabric', label: 'Kumaş' },
                  { id: 'care', label: 'Bakım' },
                  { id: 'ship', label: 'Kargo & İade' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{
                      padding: '14px 18px', font: '600 12px/1 var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: tab === t.id ? 'var(--accent)' : 'var(--muted)',
                      borderBottom: tab === t.id ? '1px solid var(--accent)' : '1px solid transparent',
                      marginBottom: -1,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div style={{ minHeight: 120 }}>
                {tab === 'story' && (
                  <p className="text-body muted" style={{ maxWidth: '52ch' }}>
                    {p.story} Her parça siparişten sonra atölyemizde dokunur — ilk olmadan üretmiyoruz. Bu yüzden 7-14 gün üretim süresi gerekiyor, ama buna karşılık bedeniniz size özel.
                  </p>
                )}
                {tab === 'fabric' && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
                    <li className="text-small"><strong style={{ color: 'var(--text)' }}>Üst:</strong> <span className="muted">{isEditorial ? 'İtalyan jakar · Como bölgesi · 280 g/m²' : 'Performans polyester · İtalyan tedarik · 240 g/m²'}</span></li>
                    <li className="text-small"><strong style={{ color: 'var(--text)' }}>Astar:</strong> <span className="muted">Mesh yapı · ter geçişi</span></li>
                    <li className="text-small"><strong style={{ color: 'var(--text)' }}>Etiket:</strong> <span className="muted">Atölyede dokunmuş etiket · KB.SPOR</span></li>
                    <li className="text-small"><strong style={{ color: 'var(--text)' }}>Dikim:</strong> <span className="muted">Düz dikiş yan, omuzda taşıyıcı bant</span></li>
                  </ul>
                )}
                {tab === 'care' && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                    <li className="text-small muted">30°C ters yüz yıkayın, ütüleme yapmayın.</li>
                    <li className="text-small muted">Beyazlatıcı kullanmayın. Kuru temizleme önerilmez.</li>
                    <li className="text-small muted">Baskıyı korumak için ters yüz kurutun.</li>
                  </ul>
                )}
                {tab === 'ship' && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                    <li className="text-small muted">Yurt içi tüm siparişlerde Yurtiçi Kargo ile teslimat.</li>
                    <li className="text-small muted">14 gün içinde iade hakkı (baskısız formalar için).</li>
                    <li className="text-small muted">İsim/numara baskılı formalar üretildikten sonra iade edilemez.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related — quietly pulled from same context */}
      <Related current={slug} ctx={p.context} />

      <style>{`
        @media (max-width: 900px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pdp-grid > div:first-child { position: relative !important; }
        }
      `}</style>
    </div>
  );
}

function Mini({ lbl, val }) {
  return (
    <div style={{ padding: 14, border: '1px solid var(--line)', textAlign: 'center' }}>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 4 }}>{lbl}</div>
      <div style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--accent)' }}>{val}</div>
    </div>
  );
}

function Related({ current, ctx }) {
  const items = Object.entries(PDP_CATALOG)
    .filter(([slug, v]) => v.context === ctx && slug !== current)
    .slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>BİRLİKTE BAKILDI</div>
      <h2 className="h-2" style={{ marginBottom: 32 }}>Benzer parçalar.</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }} className="related-grid">
        {items.map(([slug, p]) => (
          <li key={slug} className="product-card" style={{ padding: 22, background: 'var(--bg)', position: 'relative' }}>
            <Link to={`/${ctx === 'basket' ? 'basket' : 'futbol'}/pdp/${slug}`}>
              <span className="league-tag">{p.league.split('·')[0]}</span>
              <JerseyChip primary={p.primary} secondary={p.secondary} accent={p.accent} crest={p.crest} num={p.num} pattern={p.pattern} />
              <div className="title">{p.title}</div>
              <div className="sub">{p.league}</div>
              <div className="price">{p.price}</div>
            </Link>
          </li>
        ))}
      </ul>
      <style>{`
        @media (max-width: 720px) { .related-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

Object.assign(window, { PDPPage });
