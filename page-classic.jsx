/* =============================================================================
 * page-builder.jsx — KB.LAB · interactive 3D-feel jersey configurator
 * Mood: lab (cyan HUD)
 * Real interactive: template, fabric, colors, name, number, crest, all update the preview.
 * ============================================================================= */

const { useState: useSL, useMemo: useMSL, useEffect: useESL, useRef: useRSL } = React;

const TEMPLATES = [
  { id: 'classic',  label: 'Klasik',   desc: 'Geleneksel V-yaka, düz kesim',           pattern: 'plain' },
  { id: 'modern',   label: 'Modern',   desc: 'Yarım yaka, ergonomik kesim',            pattern: 'stripes-v' },
  { id: 'stripes',  label: 'Şeritli',   desc: 'Dikey şeritler, klasik Avrupa',          pattern: 'stripes-v' },
  { id: 'split',    label: 'İki Renk',  desc: 'Yarım/yarım renk bloklaması',            pattern: 'half' },
];
const FABRICS = [
  { id: 'pro',      label: 'Match Pro',     desc: 'İtalyan jakar · 280 g/m²',  price: 2999 },
  { id: 'training', label: 'Training Air', desc: 'Mesh polyester · 180 g/m²',  price: 2299 },
  { id: 'heritage', label: 'Heritage',      desc: 'Pamuk-poly · 320 g/m²',     price: 3499 },
];
const PRESET_PALETTES = [
  { primary: '#ff4d2e', secondary: '#0a0a0b', label: 'Atölye' },
  { primary: '#A90432', secondary: '#FFB81C', label: 'Sarı-Kırmızı' },
  { primary: '#0F3F8C', secondary: '#FCD116', label: 'Lacivert-Sarı' },
  { primary: '#000000', secondary: '#FFFFFF', label: 'Siyah-Beyaz' },
  { primary: '#007A33', secondary: '#FFFFFF', label: 'Yeşil-Beyaz' },
  { primary: '#0055A4', secondary: '#EF4135', label: 'Tricolore' },
  { primary: '#552583', secondary: '#FDB927', label: 'Mor-Altın' },
  { primary: '#00f0ff', secondary: '#06080c', label: 'Lab' },
];

function BuilderPage() {
  const [tpl, setTpl] = useSL('classic');
  const [fab, setFab] = useSL('pro');
  const [primary, setPrimary] = useSL('#ff4d2e');
  const [secondary, setSecondary] = useSL('#0a0a0b');
  const [name, setName] = useSL('SİZ');
  const [num, setNum] = useSL('10');
  const [crest, setCrest] = useSL('KB');
  const [view, setView] = useSL('front'); // front | back
  const [rot, setRot] = useSL(0);
  const cart = useCart();

  // Auto-rotate when user is on the page idle
  useESL(() => {
    let raf, last = performance.now();
    const tick = (t) => {
      const dt = (t - last) / 1000; last = t;
      setRot((r) => (r + dt * 8) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const tplObj = TEMPLATES.find((t) => t.id === tpl);
  const fabObj = FABRICS.find((f) => f.id === fab);
  const total = fabObj.price.toLocaleString('tr-TR') + ',00 ₺';

  const shareId = useMSL(() => Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Lab grid background everywhere */}
      <div aria-hidden="true" className="bg-lab-grid" style={{ position: 'fixed', inset: 0, opacity: 0.8, pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(0,240,255,0.10), transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(177,255,91,0.05), transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* HEADER STRIP — system status */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ paddingBlock: 'clamp(28px, 4vw, 48px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 14 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent-2)', borderRadius: 50, marginRight: 10, boxShadow: '0 0 12px var(--accent-2)', verticalAlign: 'middle' }} />
                // KB.LAB · SYSTEM ONLINE · BUILD {shareId}
              </div>
              <h1 className="h-1" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'} </span>
                Tek parça spesifikasyon.
              </h1>
              <p className="text-body" style={{ color: 'var(--muted)', maxWidth: '52ch', marginTop: 16, fontFamily: 'var(--font-mono)' }}>
                Şablon, kumaş, renk, isim, numara. Sağdaki HUD'da gerçek zamanlı görün. URL'yi paylaşın — biz üretelim.
              </p>
            </div>

            {/* HUD scoreboard */}
            <div style={{ display: 'inline-flex', border: '1px solid var(--line-2)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
              <HudCell lbl="LATENCY" val="12ms" />
              <HudCell lbl="POLY" val="48k" />
              <HudCell lbl="FABRIC" val={fabObj.id.toUpperCase()} />
              <HudCell lbl="BUILD" val={shareId} />
              <HudCell lbl="STATUS" val="READY" hi />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN GRID — controls left, preview right */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ paddingBlock: 'clamp(20px, 3vw, 40px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 32 }} className="builder-grid">

            {/* CONTROLS */}
            <div style={{ display: 'grid', gap: 1, background: 'var(--line)', alignSelf: 'start' }}>
              <Panel title="01 · ŞABLON" hint={tplObj.desc}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} className={`tpl-btn ${tpl === t.id ? 'is-active' : ''}`} onClick={() => setTpl(t.id)}>
                      <TemplateGlyph id={t.id} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </Panel>

              <Panel title="02 · KUMAŞ" hint={`${fabObj.desc} · ${fabObj.price.toLocaleString('tr-TR')},00 ₺`}>
                <div style={{ display: 'grid', gap: 6 }}>
                  {FABRICS.map((f) => (
                    <button key={f.id} className={`row-btn ${fab === f.id ? 'is-active' : ''}`} onClick={() => setFab(f.id)}>
                      <span style={{ flex: 1, textAlign: 'left' }}>
                        <span style={{ display: 'block', font: '600 13px/1 var(--font-mono)', letterSpacing: '0.06em' }}>{f.label}</span>
                        <span className="text-caption muted" style={{ fontFamily: 'var(--font-mono)' }}>{f.desc}</span>
                      </span>
                      <span style={{ font: '700 12px/1 var(--font-mono)', color: fab === f.id ? 'var(--accent)' : 'var(--muted)' }}>{f.price.toLocaleString('tr-TR')} ₺</span>
                    </button>
                  ))}
                </div>
              </Panel>

              <Panel title="03 · RENK" hint="Birincil + ikincil renk">
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <ColorField label="BİRİNCİL" value={primary} onChange={setPrimary} />
                  <ColorField label="İKİNCİL" value={secondary} onChange={setSecondary} />
                </div>
                <div className="text-micro muted" style={{ marginBottom: 8 }}>HAZIR PALETLER</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {PRESET_PALETTES.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => { setPrimary(p.primary); setSecondary(p.secondary); }}
                      title={p.label}
                      style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        height: 32, padding: 0, overflow: 'hidden',
                        border: primary === p.primary && secondary === p.secondary ? '1px solid var(--accent)' : '1px solid var(--line)',
                        borderRadius: 4,
                      }}
                    >
                      <span style={{ background: p.primary }} />
                      <span style={{ background: p.secondary }} />
                    </button>
                  ))}
                </div>
              </Panel>

              <Panel title="04 · İSİM · NUMARA" hint="Sırt yazısı ve numara">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 8 }}>
                  <LabInput label="İSİM" value={name} onChange={(v) => setName(v.toUpperCase())} maxLength={12} />
                  <LabInput label="NO" value={num} onChange={(v) => setNum(v.replace(/\D/g, '').slice(0, 2))} maxLength={2} />
                </div>
              </Panel>

              <Panel title="05 · AMBLEM" hint="3 karakter, göğüs ortasında">
                <LabInput label="CREST" value={crest} onChange={(v) => setCrest(v.toUpperCase().slice(0, 3))} maxLength={3} />
              </Panel>

              <Panel title="06 · ÖZET" hint={null}>
                <div style={{ display: 'grid', gap: 6, marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  <SummaryRow lbl="TEMPLATE" val={tplObj.label} />
                  <SummaryRow lbl="FABRIC" val={fabObj.label} />
                  <SummaryRow lbl="PRIMARY" val={primary} swatch={primary} />
                  <SummaryRow lbl="SECONDARY" val={secondary} swatch={secondary} />
                  <SummaryRow lbl="NAME · #" val={`${name || '—'} · ${num || '—'}`} />
                  <SummaryRow lbl="CREST" val={crest || '—'} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, paddingTop: 14, borderTop: '1px dashed var(--line-2)' }}>
                  <span className="text-micro" style={{ color: 'var(--muted)' }}>TOPLAM</span>
                  <span style={{ font: '700 24px/1 var(--font-mono)', color: 'var(--accent)', letterSpacing: '-0.01em' }}>{total}</span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', background: 'var(--accent)', color: 'var(--bg)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
                  onClick={() => cart.add()}
                >
                  // SEPETE EKLE <IconArrow size={14} />
                </button>
                <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }} onClick={() => navigator.clipboard?.writeText(`https://kbspor.com.tr/lab/${shareId}`).then(() => alert('URL kopyalandı: https://kbspor.com.tr/lab/' + shareId))}>
                  // PAYLAŞ · /{shareId}
                </button>
              </Panel>
            </div>

            {/* PREVIEW */}
            <div style={{ position: 'relative', minHeight: 720 }}>
              <div style={{ position: 'sticky', top: 100, border: '1px solid var(--line)', background: 'rgba(0, 240, 255, 0.02)', overflow: 'hidden' }}>
                {/* HUD chrome */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'rgba(0,0,0,0.4)' }}>
                  <span className="text-micro" style={{ color: 'var(--accent)' }}>// PREVIEW · {view === 'front' ? 'ÖN' : 'ARKA'} · ROT {Math.round(rot)}°</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className={`pill ${view === 'front' ? 'is-active' : ''}`} onClick={() => setView('front')} style={{ height: 26 }}>ÖN</button>
                    <button className={`pill ${view === 'back' ? 'is-active' : ''}`} onClick={() => setView('back')} style={{ height: 26 }}>ARKA</button>
                  </div>
                </div>

                {/* The 3D-feel jersey */}
                <div style={{ position: 'relative', minHeight: 600, display: 'grid', placeItems: 'center', padding: 'clamp(24px, 4vw, 56px)' }}>
                  {/* Floor reflection */}
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 'auto 0 0 0', height: '40%', background: 'radial-gradient(ellipse at center top, rgba(0,240,255,0.10), transparent 70%)' }} />

                  {/* The jersey, rotating gently in 3D feel via perspective */}
                  <div style={{ perspective: 1200 }}>
                    <div style={{ transform: `rotateY(${Math.sin(rot * Math.PI / 180) * 14}deg) rotateX(2deg)`, transformStyle: 'preserve-3d', transition: 'transform 60ms linear' }}>
                      <LabJersey
                        template={tpl}
                        primary={primary}
                        secondary={secondary}
                        name={name}
                        num={num}
                        crest={crest}
                        view={view}
                        rot={rot}
                      />
                    </div>
                  </div>

                  {/* HUD overlay marks */}
                  <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <g stroke="var(--accent)" strokeWidth="0.6" fill="none" opacity="0.5">
                      <path d="M16 16 L48 16 M16 16 L16 48" />
                      <path d="M-16 16 L-48 16 M-16 16 L-16 48" transform="translate(100% 0)" />
                      <path d="M16 -16 L48 -16 M16 -16 L16 -48" transform="translate(0 100%)" />
                      <path d="M-16 -16 L-48 -16 M-16 -16 L-16 -48" transform="translate(100% 100%)" />
                    </g>
                  </svg>

                  {/* Bottom HUD readouts */}
                  <div style={{ position: 'absolute', left: 18, bottom: 14, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--accent)', opacity: 0.7 }}>
                    PRIMARY {primary.toUpperCase()} · SECONDARY {secondary.toUpperCase()}
                  </div>
                  <div style={{ position: 'absolute', right: 18, bottom: 14, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--accent-2)', opacity: 0.7 }}>
                    RENDER · OK
                  </div>
                </div>

                {/* Specs strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--line)' }}>
                  <PreviewSpec lbl="BEDEN" val="L → 4-XL" />
                  <PreviewSpec lbl="ÜRETİM" val="7–14 GÜN" />
                  <PreviewSpec lbl="KARGO" val="1–3 GÜN" />
                  <PreviewSpec lbl="İADE" val="14 GÜN" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom command bar — explanatory steps */}
      <section style={{ position: 'relative', zIndex: 1, marginTop: 80, borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ paddingBlock: 'clamp(60px, 8vw, 100px)' }}>
          <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--accent)' }}>// SÜREÇ · END-TO-END</div>
          <h2 className="h-2" style={{ maxWidth: '20ch', marginBottom: 48, fontFamily: 'var(--font-display)' }}>
            Tasarımdan kapınıza, <span style={{ color: 'var(--accent)' }}>tek pipeline</span>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }} className="steps-grid">
            {[
              { no: '01', title: 'Tasarla', body: 'KB.LAB\'da 3D olarak. URL\'yi paylaşıp arkadaşına gönder.' },
              { no: '02', title: 'Sipariş', body: 'iyzico ile güvenli ödeme. TRY · USD · EUR.' },
              { no: '03', title: 'Üretim', body: 'Levent atölyesinde 7–14 gün. WhatsApp ile durum bildirimi.' },
              { no: '04', title: 'Kargo', body: '1–3 gün içinde kapıda. KDV %20 fiyata dahil.' },
            ].map((s) => (
              <div key={s.no} style={{ padding: 'clamp(28px, 3vw, 40px)', background: 'var(--bg)' }}>
                <div style={{ font: '700 14px/1 var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: 18 }}>// {s.no}</div>
                <h3 className="h-3" style={{ marginBottom: 10, fontFamily: 'var(--font-mono)' }}>{s.title}</h3>
                <p className="text-small muted" style={{ fontFamily: 'var(--font-mono)' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .builder-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .tpl-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 12px 8px; border: 1px solid var(--line);
          font: 600 11px/1 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--muted); background: transparent;
          transition: all var(--d-fast);
        }
        .tpl-btn:hover { color: var(--text); border-color: var(--line-2); }
        .tpl-btn.is-active { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
        .row-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border: 1px solid var(--line);
          background: transparent;
          transition: all var(--d-fast);
          color: var(--muted);
        }
        .row-btn:hover { border-color: var(--line-2); color: var(--text); }
        .row-btn.is-active { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── HUD bits ──────────────────────────────── */
function HudCell({ lbl, val, hi }) {
  return (
    <div style={{ padding: '10px 14px', borderRight: '1px solid var(--line)', minWidth: 92 }}>
      <div style={{ font: '600 9px/1 var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.18em', marginBottom: 4 }}>{lbl}</div>
      <div style={{ font: '700 12px/1 var(--font-mono)', color: hi ? 'var(--accent-2)' : 'var(--text)', letterSpacing: '0.06em' }}>
        {hi && '●  '}{val}
      </div>
    </div>
  );
}
function Panel({ title, hint, children }) {
  return (
    <div style={{ background: 'var(--bg-2)', padding: '20px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, paddingBottom: 12, borderBottom: '1px dashed var(--line)' }}>
        <span style={{ font: '700 11px/1 var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.16em' }}>{title}</span>
        {hint && <span style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.08em' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}
function ColorField({ label, value, onChange }) {
  return (
    <label style={{ display: 'block', flex: 1, cursor: 'pointer' }}>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', padding: '6px 10px', background: 'var(--bg)' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 28, height: 28, border: 0, padding: 0, background: 'transparent', cursor: 'pointer' }}
        />
        <span style={{ font: '600 12px/1 var(--font-mono)', letterSpacing: '0.04em' }}>{value.toUpperCase()}</span>
      </div>
    </label>
  );
}
function LabInput({ label, value, onChange, maxLength }) {
  return (
    <label style={{ display: 'block' }}>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 6 }}>{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        style={{
          width: '100%', padding: '10px 12px',
          background: 'var(--bg)', border: '1px solid var(--line)',
          font: '700 14px/1 var(--font-mono)', letterSpacing: '0.04em',
          color: 'var(--text)',
        }}
      />
    </label>
  );
}
function SummaryRow({ lbl, val, swatch }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: 'var(--muted)' }}>{lbl}</span>
      <span style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
        {swatch && <span style={{ display: 'inline-block', width: 12, height: 12, background: swatch, border: '1px solid var(--line-2)' }} />}
        {val}
      </span>
    </div>
  );
}
function PreviewSpec({ lbl, val }) {
  return (
    <div style={{ padding: '14px 18px', borderRight: '1px solid var(--line)', textAlign: 'center' }}>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 4 }}>{lbl}</div>
      <div style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--accent)' }}>{val}</div>
    </div>
  );
}

/* ─────────────────────────── Template glyph ─────────────────────────── */
function TemplateGlyph({ id }) {
  const stroke = 'currentColor';
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
      <path d="M3 6 L9 4 Q18 8 27 4 L33 6 L36 12 L33 14 L33 36 Q18 39 3 36 L3 14 L0 12 Z" stroke={stroke} strokeWidth="1" />
      {id === 'stripes' && <g stroke={stroke} strokeWidth="1" opacity="0.7">
        <line x1="10" y1="6" x2="10" y2="36" />
        <line x1="18" y1="6" x2="18" y2="36" />
        <line x1="26" y1="6" x2="26" y2="36" />
      </g>}
      {id === 'split' && <path d="M18 6 L18 36" stroke={stroke} strokeWidth="1.4" />}
      {id === 'modern' && <path d="M14 4 L18 8 L22 4" stroke={stroke} strokeWidth="1" />}
    </svg>
  );
}

/* ─────────────────────────── LabJersey — central preview ────────────── */
// Reuses the global JerseyArt component so placement matches product chips
// and PDP hero exactly. The builder owns template→pattern mapping and the
// build-tag corner labels overlaid on top of the SVG.
function LabJersey({ template, primary, secondary, name, num, crest, view, rot }) {
  const pattern = template === 'stripes' ? 'stripes-v'
                : template === 'split'   ? 'half'
                : template === 'modern'  ? 'sash'
                : 'plain';

  return (
    <div style={{
      position: 'relative',
      width: 'min(380px, 78%)',
      filter: 'drop-shadow(0 30px 60px rgba(0,240,255,0.10))',
    }}>
      <JerseyArt
        primary={primary}
        secondary={secondary}
        accent="#ffffff"
        pattern={pattern}
        view={view}
        crest={crest || 'KB'}
        num={num || (view === 'back' ? '10' : null)}
        name={name || 'SİZ'}
        brandTag="// KB.LAB"
      />

      {/* HUD blueprint corners overlaid OUTSIDE the SVG so they don't crowd
          the jersey artwork itself. */}
      <span style={{ position: 'absolute', top: -2, left: -2, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.18em', color: 'var(--accent)' }}>
        // KB.LAB
      </span>
      <span style={{ position: 'absolute', top: -2, right: -2, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.18em', color: 'var(--accent-2)' }}>
        BUILD · LIVE
      </span>
      <span style={{ position: 'absolute', bottom: -2, left: -2, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.18em', color: 'var(--muted)' }}>
        VIEW · {view === 'front' ? 'ÖN' : 'ARKA'}
      </span>
      <span style={{ position: 'absolute', bottom: -2, right: -2, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.18em', color: 'var(--muted)' }}>
        {template.toUpperCase()} · {pattern.toUpperCase()}
      </span>
    </div>
  );
}

Object.assign(window, { BuilderPage });
