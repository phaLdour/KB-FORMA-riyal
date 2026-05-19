/* =============================================================================
 * page-classic.jsx — Maison KB · Heritage cabinet (Editorial mood)
 * Mood: editorial (gold + cream, Vogue-style)
 * Identity: museum cabinet, numbered pieces, certificate cards
 * ============================================================================= */

const { useState: useSC } = React;

const CLASSIC_PIECES = [
  {
    to: '/futbol/klasik/mar86', no: '01', title: 'Maradona', year: '1986',
    nation: 'Arjantin · México Mundial', subtitle: 'Yarı final · 22 Haziran 1986',
    bullets: ['Tek bir kez · 12 nüsha', 'Akrilik panel kutu', 'Numaralı sertifika'],
    quote: `"Tanrı'nın eli." Aynı saatte, ikinci gol — futbol tarihinin en güzel solo koşusu.`,
    primary: '#75AADB', secondary: '#F6B40E', num: '10', accent: '#0a0a0b', pattern: 'stripes-v',
    price: '14.999,00 ₺',
  },
  {
    to: '/futbol/klasik/zid98', no: '02', title: 'Zidane', year: '1998',
    nation: 'Fransa · Coupe du Monde', subtitle: 'Final · 12 Temmuz 1998 · Stade de France',
    bullets: ['Tek bir kez · 12 nüsha', 'Linen astar', 'Hand-stitched isim'],
    quote: `İki kafa. 27. dakika. 45+1'inci dakika. Sonra — taç.`,
    primary: '#0055A4', secondary: '#EF4135', num: '10', accent: '#fff', pattern: 'plain',
    price: '14.999,00 ₺',
  },
  {
    to: '/futbol/klasik/ron02', no: '03', title: 'Ronaldo', year: '2002',
    nation: 'Brezilya · 日韓 World Cup', subtitle: 'Final · 30 Haziran 2002 · Yokohama',
    bullets: ['Tek bir kez · 12 nüsha', 'Sarı-yeşil paspol', 'Brezilya el dokuması bordür'],
    quote: 'O ünlü saç kesiminden sonra iki gol. 32. ve 79. dakika.',
    primary: '#FEDF00', secondary: '#009C3B', num: '9', accent: '#002776', pattern: 'plain',
    price: '14.999,00 ₺',
  },
  {
    to: '/futbol/klasik/cr07', no: '04', title: 'Cristiano', year: '2007',
    nation: 'Manchester United · Premier League', subtitle: 'Şampiyonluk sezonu',
    bullets: ['Tek bir kez · 12 nüsha', 'Şeftali tonu kumaş', 'Pre-spray patch'],
    quote: 'Pep önce keşfetti, sonra dünya. 17 lig golü.',
    primary: '#DA291C', secondary: '#FBE122', num: '7', accent: '#fff', pattern: 'plain',
    price: '14.999,00 ₺',
  },
  {
    to: '/futbol/klasik/mes09', no: '05', title: 'Messi', year: '2009',
    nation: 'FC Barcelona · UEFA Champions', subtitle: 'Final · 27 Mayıs 2009 · Roma',
    bullets: ['Tek bir kez · 12 nüsha', 'Bordo-mavi şerit', 'Roma final iz çıkışı'],
    quote: `Beş Ballon d'Or'un başlangıcı. Altıpas, kafa, ağ.`,
    primary: '#A50044', secondary: '#004D98', num: '10', accent: '#FCD116', pattern: 'stripes-v',
    price: '14.999,00 ₺',
  },
  {
    to: '/futbol/klasik/tot06', no: '06', title: 'Totti', year: '2006',
    nation: 'AS Roma · Lupa kalbi', subtitle: 'Roma Derbisi serisi',
    bullets: ['Tek bir kez · 12 nüsha', 'Olympico Roma kırmızısı', 'Lupa hand-stitched'],
    quote: 'Bir şehir, bir takım, bir 10 numara.',
    primary: '#8A2129', secondary: '#FBE122', num: '10', accent: '#FBE122', pattern: 'plain',
    price: '14.999,00 ₺',
  },
];

function ClassicPage() {
  return (
    <div>
      {/* =================================================================
            HERO — editorial. Big italic display, gold rule, "cabinet" plaque.
         ================================================================= */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--bg-2)' }} />
        <div aria-hidden="true" className="bg-luxe-vignette" style={{ position: 'absolute', inset: 0 }} />

        {/* Decorative left margin number */}
        <div aria-hidden="true" style={{ position: 'absolute', left: 'calc(-1 * var(--gut))', bottom: '8vh', pointerEvents: 'none' }}>
          <span className="big-num" style={{ fontStyle: 'italic', WebkitTextStroke: '1px var(--gold-deep)' }}>VI</span>
        </div>

        <div className="container" style={{ position: 'relative', width: '100%', paddingBlock: 'clamp(96px, 12vw, 160px)' }}>
          <Reveal>
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>MAISON KB · CABINET № VI · İSTANBUL</div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="h-display" style={{ maxWidth: '12ch', marginTop: 28 }}>
              <span className="italic-display">Bir kez</span><br />
              dokunmuş.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-lead" style={{ maxWidth: '50ch', marginTop: 40, fontFamily: 'var(--font-serif)', fontSize: 'clamp(19px, 1.6vw, 24px)', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--text)', opacity: 0.85 }}>
              Maison KB, futbolun mührünü taşıyan altı efsane formayı — Maradona &lsquo;86&rsquo;dan Totti &lsquo;06&rsquo;ya — el işçiliğiyle yeniden dokur. Her parça tek bir kez üretilir. Her parça numaralandırılır. Her parça, sahibinin adıyla kayıtlıdır.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="row" style={{ gap: 36, marginTop: 56, flexWrap: 'wrap' }}>
              <a href="#cabinet" className="btn btn-primary btn-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }} onClick={(e) => { e.preventDefault(); document.getElementById('cabinet')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Vitrini görün <IconArrow size={16} />
              </a>
              <div>
                <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 8 }}>BU PARÇA</div>
                <div style={{ font: '700 16px/1 var(--font-display)', letterSpacing: '-0.01em', fontStyle: 'italic' }}>14.999,00 ₺</div>
                <div className="text-caption muted" style={{ marginTop: 4 }}>Akrilik kutu · Sertifika · Beden 04 → 56</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom-right plaque — Maison emblem */}
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 'var(--gut)', right: 'var(--gut)', textAlign: 'right' }} className="hide-on-tablet">
          <div className="text-micro" style={{ color: 'var(--gold-deep)', marginBottom: 6 }}>MAISON KB · EST. 2026</div>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ display: 'inline-block' }}>
            <circle cx="60" cy="60" r="56" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <circle cx="60" cy="60" r="48" fill="none" stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="2 4" />
            <text x="60" y="56" textAnchor="middle" fontFamily="Playfair Display" fontWeight="800" fontSize="28" letterSpacing="-1" fill="var(--accent)">KB</text>
            <text x="60" y="74" textAnchor="middle" fontFamily="Playfair Display" fontStyle="italic" fontSize="11" fill="var(--accent)">Maison</text>
            <text x="60" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" letterSpacing="2" fill="var(--accent)" opacity="0.7">CRAFTED · ONCE</text>
          </svg>
        </div>
      </section>

      {/* =================================================================
            CABINET — pieces in editorial detail
         ================================================================= */}
      <section id="cabinet" className="container" style={{ paddingBlock: 'clamp(80px, 10vw, 120px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--accent)' }}>VITRIN · 6 PARÇA · 72 NÜSHA</div>
          <h2 className="h-1" style={{ maxWidth: '18ch', marginBottom: 24, fontStyle: 'italic' }}>
            Tarihten <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>seçilmiş</span> altı an.
          </h2>
          <p className="text-lead" style={{ maxWidth: '54ch', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text)', opacity: 0.78 }}>
            Her forma, kaybedilen değil — kazanılan bir andan dokunur. Her detay restore edilir, her sayı yeniden işlenir, her etiket atölyede dikilir.
          </p>
        </Reveal>

        <div style={{ marginTop: 80, display: 'grid', gap: 1, background: 'var(--line)' }}>
          {CLASSIC_PIECES.map((p, i) => (
            <PieceRow key={p.no} piece={p} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* =================================================================
            PROVENANCE — certificate sample + craft notes
         ================================================================= */}
      <section className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--accent)' }}>SERTİFİKA · PROVENANCE</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 48 }}>
            Her parça <span className="italic-display" style={{ color: 'var(--accent)' }}>imzalı</span> gelir.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }} className="provenance-grid">
          <CertificatePreview />
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 24 }}>
              {[
                { lbl: 'NÜSHA', val: '12 — Aşılmaz', body: 'Her form tarihten yalnızca on iki nüsha üretilir, sonra kalıp imha edilir.' },
                { lbl: 'KUTU', val: 'Akrilik panel', body: 'Restorasyona uygun, asitsiz iç astar, kapaklı plaka.' },
                { lbl: 'KUMAŞ', val: 'İtalyan jakar', body: 'Como bölgesinden, 280 g/m². Dönemine sadık doku.' },
                { lbl: 'SİPARİŞ', val: '7–14 gün', body: 'Talep alındıktan sonra üretim. Made-to-order — stok değil, mühür.' },
              ].map((item) => (
                <li key={item.lbl} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, paddingBottom: 22, borderBottom: '1px solid var(--line)' }}>
                  <div>
                    <div className="text-micro" style={{ color: 'var(--accent)', marginBottom: 6 }}>{item.lbl}</div>
                    <div style={{ font: '700 16px/1.2 var(--font-display)', fontStyle: 'italic' }}>{item.val}</div>
                  </div>
                  <p className="text-small" style={{ color: 'var(--text)', opacity: 0.78, fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic' }}>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =================================================================
            CLOSER — editorial pull-quote
         ================================================================= */}
      <section className="full-bleed" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 'clamp(80px, 12vw, 140px) var(--gut)', background: 'var(--bg-2)', position: 'relative' }}>
        <div aria-hidden="true" className="bg-luxe-vignette" style={{ position: 'absolute', inset: 0 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center', padding: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 28, color: 'var(--accent)', justifyContent: 'center' }}>MAISON KB · ATÖLYE NOTU</div>
          <p style={{ font: '400 clamp(28px, 4vw, 56px)/1.15 var(--font-display)', fontStyle: 'italic', maxWidth: '24ch', margin: '0 auto', color: 'var(--text)' }}>
            "Bir formayı yeniden dokurken, bir anı dokuyoruz. Sayı, yıl, dakika — herşey aynı."
          </p>
          <div className="text-micro muted" style={{ marginTop: 32, color: 'var(--accent)' }}>— KB ATÖLYE · LEVENT</div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .piece-row { grid-template-columns: 1fr !important; }
          .piece-row .piece-img { order: -1; }
          .provenance-grid { grid-template-columns: 1fr !important; }
          .hide-on-tablet { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── Piece row (editorial) ───────────────────── */
function PieceRow({ piece, flip }) {
  return (
    <article
      className="piece-row"
      style={{
        display: 'grid',
        gridTemplateColumns: flip ? '1fr 1.2fr' : '1.2fr 1fr',
        gap: 1,
        background: 'var(--bg)',
        padding: 0,
        alignItems: 'stretch',
      }}
    >
      {/* COPY */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: flip ? 2 : 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
          <span style={{ font: 'italic 800 clamp(56px, 8vw, 120px)/0.9 var(--font-display)', color: 'var(--accent)', letterSpacing: '-0.06em' }}>{piece.no}</span>
          <span className="text-micro muted">/ 06 PIECE</span>
        </div>
        <h3 className="h-1" style={{ marginBottom: 4, fontStyle: 'italic' }}>{piece.title}</h3>
        <div style={{ font: '600 clamp(22px, 2.4vw, 32px)/1 var(--font-display)', color: 'var(--accent)', marginBottom: 16 }}>'{piece.year.slice(2)}</div>
        <div className="text-small muted" style={{ marginBottom: 4 }}>{piece.nation}</div>
        <div className="text-small" style={{ color: 'var(--text)', opacity: 0.78, marginBottom: 28 }}>{piece.subtitle}</div>

        <blockquote style={{ borderLeft: '1px solid var(--accent)', paddingLeft: 18, margin: '0 0 28px', font: 'italic 400 clamp(16px, 1.4vw, 19px)/1.6 var(--font-serif)', color: 'var(--text)', opacity: 0.86, maxWidth: '40ch' }}>
          {piece.quote}
        </blockquote>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gap: 8 }}>
          {piece.bullets.map((b) => (
            <li key={b} className="text-small" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)', opacity: 0.82 }}>
              <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--accent)' }} />
              {b}
            </li>
          ))}
        </ul>

        <div className="row" style={{ gap: 24, flexWrap: 'wrap' }}>
          <Link to={piece.to} className="btn btn-ghost" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Sertifika başvurusu <IconArrow size={14} />
          </Link>
          <div>
            <div className="text-micro" style={{ color: 'var(--muted)' }}>FİYAT</div>
            <div style={{ font: '600 16px/1.2 var(--font-display)', fontStyle: 'italic' }}>{piece.price}</div>
          </div>
        </div>
      </div>

      {/* "PHOTOGRAPH" — chip jersey rendered editorial */}
      <div className="piece-img" style={{
        position: 'relative',
        padding: 'clamp(40px, 5vw, 80px)',
        background: `linear-gradient(${flip ? '225deg' : '135deg'}, rgba(212,175,55,0.08), transparent 60%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        order: flip ? 1 : 2,
        borderLeft: flip ? '0' : '1px solid var(--line)',
        borderRight: flip ? '1px solid var(--line)' : '0',
      }}>
        <div style={{ position: 'relative', width: '78%', maxWidth: 420 }}>
          {/* corner numerals */}
          <span style={{ position: 'absolute', top: -28, left: -8, font: '600 11px/1 var(--font-mono)', letterSpacing: '0.18em', color: 'var(--accent)' }}>N° {piece.no} / 06</span>
          <span style={{ position: 'absolute', bottom: -28, right: -8, font: '600 11px/1 var(--font-mono)', letterSpacing: '0.18em', color: 'var(--accent)' }}>0X / 12 NÜSHA</span>
          <JerseyChip primary={piece.primary} secondary={piece.secondary} accent={piece.accent} crest={piece.title.slice(0,3).toUpperCase()} num={piece.num} pattern={piece.pattern} />
          {/* gold frame */}
          <div style={{ position: 'absolute', inset: -14, border: '1px solid var(--accent)', pointerEvents: 'none', opacity: 0.45 }} />
          <div style={{ position: 'absolute', inset: -22, border: '1px solid var(--accent)', pointerEvents: 'none', opacity: 0.2 }} />
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────── Certificate preview ─────────────────────── */
function CertificatePreview() {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #1a0f04 0%, #0d0904 100%)',
      border: '1px solid var(--accent)',
      padding: 'clamp(40px, 5vw, 64px)',
      minHeight: 480,
    }}>
      <div style={{ position: 'absolute', inset: 12, border: '1px solid var(--accent)', opacity: 0.35, pointerEvents: 'none' }} />

      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
        <div>
          <div className="text-micro" style={{ color: 'var(--accent)', marginBottom: 4 }}>MAISON KB · SERTİFİKA</div>
          <div style={{ font: '600 11px/1.4 var(--font-mono)', color: 'var(--muted)' }}>CERTIFICATE OF AUTHENTICITY</div>
        </div>
        <svg width="56" height="56" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="30" y="36" textAnchor="middle" fontFamily="Playfair Display" fontWeight="800" fontSize="20" fill="var(--accent)">KB</text>
        </svg>
      </div>

      <h3 style={{ font: 'italic 700 clamp(38px, 4vw, 56px)/1 var(--font-display)', color: 'var(--text)', margin: 0, letterSpacing: '-0.03em' }}>Maradona '86</h3>
      <div style={{ font: '600 14px/1 var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.16em', marginTop: 10 }}>YARI FİNAL · 22.06.1986 · MÉXICO</div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <CertField lbl="NÜSHA" val="N° 03 / 12" />
        <CertField lbl="ATÖLYE" val="LEVENT, IST" />
        <CertField lbl="KUMAŞ" val="JAKAR · ITA" />
        <CertField lbl="USTA" val="K. BERKANT" />
        <CertField lbl="TARİH" val="2026 · 05 · 18" />
        <CertField lbl="SAHİP" val="________________" />
      </div>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <svg width="120" height="40" viewBox="0 0 120 40">
            <path d="M5 30 Q15 8 30 22 Q40 32 50 18 Q60 4 75 24 Q85 36 100 18 Q110 8 115 22" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div className="text-micro muted" style={{ marginTop: 4, color: 'var(--accent)' }}>K. BERKANT · USTA</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="text-micro" style={{ color: 'var(--muted)' }}>QR · DOĞRULAMA</div>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(7, 6px)', gridTemplateRows: 'repeat(7, 6px)', gap: 1, marginTop: 6 }}>
            {Array.from({length: 49}, (_, i) => (
              <div key={i} style={{ background: (i*7 + i % 3 === 0 || i % 5 === 0) ? 'var(--accent)' : 'transparent', width: 6, height: 6 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function CertField({ lbl, val }) {
  return (
    <div>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 4 }}>{lbl}</div>
      <div style={{ font: '600 14px/1.2 var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.04em' }}>{val}</div>
    </div>
  );
}

Object.assign(window, { ClassicPage });
