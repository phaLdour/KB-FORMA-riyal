/* =============================================================================
 * app.jsx — Boot, router, layout, Tweaks panel integration
 * ============================================================================= */

const { useState: useSA, useEffect: useEA, useMemo: useMSA } = React;

function footerVariantForPath(path) {
  if (path.startsWith('/futbol')) return 'futbol';
  if (path.startsWith('/basket')) return 'basket';
  return 'spor';
}

function renderRoute(path) {
  const futbolPdp = path.match(/^\/futbol\/(?:pdp|formalar|klasik)\/([^/]+)$/);
  const basketPdp = path.match(/^\/basket\/(?:pdp|nba|bsl)\/([^/]+)$/);

  if (path === '/futbol') return <FutbolPage />;
  if (path === '/basket') return <BasketPage />;
  if (path === '/futbol/klasik') return <ClassicPage />;
  if (path === '/futbol/builder') return <BuilderPage />;
  if (futbolPdp) return <PDPPage slug={futbolPdp[1]} />;
  if (basketPdp) return <PDPPage slug={basketPdp[1]} />;

  // Auth
  if (path === '/kayit') return <RegisterPage />;
  if (path === '/giris') return <LoginPage />;
  if (path === '/hesap' || path.startsWith('/hesap/')) return <HesapPage />;

  // Contact / assistant
  if (path === '/iletisim') return <IletisimPage />;

  if (path === '/' || path === '') return <HubSporPage />;

  return <PlaceholderPage path={path} />;
}

function PlaceholderPage({ path }) {
  const titles = {
    '/hakkimizda': 'Hakkımızda',
    '/atolye': 'Atölye',
    '/surdurulebilirlik': 'Sürdürülebilirlik',
    '/iletisim': 'İletişim',
    '/yardim/beden': 'Beden Tablosu',
    '/yardim/kargo': 'Kargo & Teslimat',
    '/yardim/iade': 'İade & Değişim',
  };
  return (
    <section className="container" style={{ paddingBlock: 'clamp(80px, 12vw, 140px)', minHeight: '60vh' }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>YAKINDA · BU SAYFA</div>
      <h1 className="h-1" style={{ maxWidth: '18ch', marginBottom: 24 }}>{titles[path] || 'Sayfa'}</h1>
      <p className="text-lead muted" style={{ maxWidth: '54ch' }}>
        Bu prototipte sadece KB Spor anasayfası, KB Futbol, KB Basket, Maison KB ve KB.LAB sayfaları geliştirildi. Bu sayfalar lansman sürecinde gelecek.
      </p>
      <div style={{ marginTop: 32 }}>
        <Link to="/" className="btn btn-primary">KB Spor anasayfa <IconArrow size={14} /></Link>
      </div>
    </section>
  );
}

/* =============================================================================
 *  Tweaks defaults
 * ============================================================================= */
const KB_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "moodOverride": "auto",
  "accentColor": "auto",
  "density": "comfortable",
  "showHubBadge": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  '#ff4d2e',  // kinetic orange
  '#ff7a23',  // basket leather
  '#d4af37',  // luxe gold
  '#00f0ff',  // lab neon
  '#2dbf64',  // pitch green
  '#ff2e9c',  // magenta
];

/* =============================================================================
 *  Inner app component (so useTweaks can drive moods + density + accent)
 * ============================================================================= */
function AppInner() {
  const { path } = useRouter();
  const [tw, setTweak] = useTweaks(KB_TWEAK_DEFAULTS);

  // Density tweak — applies via CSS var
  useEA(() => {
    document.documentElement.style.setProperty('--gut', tw.density === 'compact' ? 'clamp(14px, 2.4vw, 36px)' : 'clamp(20px, 4vw, 56px)');
  }, [tw.density]);

  const footerVariant = useMSA(() => footerVariantForPath(path), [path]);

  const accentForRoot = tw.accentColor === 'auto' ? null : tw.accentColor;

  return (
    <MoodFromRoute
      path={path}
      tweakMood={tw.moodOverride}
      tweakAccent={accentForRoot}
    >
      <Header />
      <main key={path} className="kb-main">
        <div className="fade-in">
          {renderRoute(path)}
        </div>
      </main>
      <Footer variant={footerVariant} />

      <TweaksPanel title="Tweaks · KB Spor">
        <TweakSection label="Hub Mood">
          <TweakSelect
            label="Aktif mood"
            value={tw.moodOverride}
            options={[
              { value: 'auto',     label: 'Otomatik (sayfaya göre)' },
              { value: 'kinetic',  label: 'Kinetic (KB Spor)' },
              { value: 'futbol',   label: 'Futbol (saha)' },
              { value: 'basket',   label: 'Basket (parke)' },
              { value: 'editorial',label: 'Editorial (Maison KB)' },
              { value: 'lab',      label: 'Lab (KB.LAB)' },
            ]}
            onChange={(v) => setTweak('moodOverride', v)}
          />
        </TweakSection>

        <TweakSection label="Renk">
          <TweakColor
            label="Accent"
            value={tw.accentColor === 'auto' ? '#ff4d2e' : tw.accentColor}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak('accentColor', v)}
          />
          <TweakButton label="Otomatik renge dön" secondary onClick={() => setTweak('accentColor', 'auto')} />
        </TweakSection>

        <TweakSection label="Yoğunluk">
          <TweakRadio
            label="Spacing"
            value={tw.density}
            options={[
              { value: 'compact',     label: 'Sıkı' },
              { value: 'comfortable', label: 'Ferah' },
            ]}
            onChange={(v) => setTweak('density', v)}
          />
        </TweakSection>

        <TweakSection label="Hızlı Geçiş">
          <div style={{ display: 'grid', gap: 6 }}>
            <RouteShortcut to="/"><span>KB Spor · Anasayfa</span></RouteShortcut>
            <RouteShortcut to="/futbol" label="KB FUTBOL" panelColor="#0a0a0b" panelText="#ff4d2e">KB Futbol</RouteShortcut>
            <RouteShortcut to="/basket" label="KB BASKET" panelColor="#0a0a0b" panelText="#ff7a23">KB Basket</RouteShortcut>
            <RouteShortcut to="/futbol/klasik" label="MAISON KB" panelColor="#050403" panelText="#d4af37">Maison KB · Klasik</RouteShortcut>
            <RouteShortcut to="/futbol/builder" label="KB.LAB" panelColor="#06080c" panelText="#00f0ff">KB.LAB · Builder</RouteShortcut>
            <RouteShortcut to="/kayit">Kayıt / Giriş</RouteShortcut>
            <RouteShortcut to="/iletisim">İletişim · KB Asistan</RouteShortcut>
            <RouteShortcut to="/futbol/pdp/galatasaray">PDP · Örnek (Galatasaray)</RouteShortcut>
            <RouteShortcut to="/futbol/klasik/mar86" label="MAISON KB" panelColor="#050403" panelText="#d4af37">PDP · Maradona '86</RouteShortcut>
          </div>
        </TweakSection>
      </TweaksPanel>
    </MoodFromRoute>
  );
}

function RouteShortcut({ to, children, label, panelColor, panelText }) {
  return (
    <Link
      to={to}
      transitionLabel={label}
      panelColor={panelColor}
      panelText={panelText}
      className="route-shortcut"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 10px',
        background: 'rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6,
        font: '500 12px/1 var(--font-sans)',
        color: 'var(--text)',
      }}
    >
      {children}
      <IconArrow size={12} />
    </Link>
  );
}

/* =============================================================================
 *  Root
 * ============================================================================= */
function App() {
  const router = useHashRoute();
  return (
    <RouterCtx.Provider value={router}>
      <AuthProvider>
        <CartProvider>
          <TransitionProvider>
            <AppInner />
          </TransitionProvider>
        </CartProvider>
      </AuthProvider>
    </RouterCtx.Provider>
  );
}

function boot() {
  const mount = document.getElementById('root');
  if (!mount) { console.error('No #root mount point'); return; }
  const root = ReactDOM.createRoot(mount);
  root.render(<App />);
}

// Babel-standalone runs <script type="text/babel"> AFTER DOMContentLoaded,
// so just boot synchronously now.
boot();
