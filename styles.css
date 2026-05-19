/* =============================================================================
 * shared.jsx — common shell: brand, header, footer, router, transition, hooks
 * Exposes everything to window so other Babel script files can use it.
 * ============================================================================= */

const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

/* ─────────────────────────── Icons ──────────────────────────────────────── */
const Icon = ({ d, size = 18, stroke = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const IconHeart = (p) => <Icon {...p} d={<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />} />;
const IconBag = (p) => <Icon {...p} d={<><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8a3 3 0 0 1 6 0" /></>} />;
const IconUser = (p) => <Icon {...p} d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />;
const IconArrow = (p) => <Icon {...p} d={<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>} />;
const IconSearch = (p) => <Icon {...p} d={<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>} />;
const IconMenu = (p) => <Icon {...p} d={<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>} />;
const IconCheck = (p) => <Icon {...p} d={<path d="m5 12 4 4 10-10" />} />;
const IconPlus = (p) => <Icon {...p} d={<><path d="M12 5v14" /><path d="M5 12h14" /></>} />;
const IconMinus = (p) => <Icon {...p} d={<path d="M5 12h14" />} />;
const IconChevron = (p) => <Icon {...p} d={<path d="m9 6 6 6-6 6" />} />;

/* ─────────────────────────── Brand Mark ─────────────────────────────────── */
function BrandMark({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="KB Spor" className={className} style={{ color: 'currentColor' }}>
      <g fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter">
        <circle cx="50" cy="50" r="44" strokeWidth="1.8" />
        <path d="M24 30 V70" strokeWidth="3" />
        <path d="M24 50 L39 30" strokeWidth="2.5" />
        <path d="M24 50 L39 70" strokeWidth="2.5" />
        <path d="M55 30 V70" strokeWidth="3" />
        <path d="M55 30 H63 a9 9 0 0 1 0 18 H55" strokeWidth="2.5" />
        <path d="M55 48 H65 a11 11 0 0 1 0 22 H55" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/* ─────────────────────────── Hash router ────────────────────────────────── */
// Routes: /, /futbol, /basket, /futbol/klasik, /futbol/builder, /futbol/pdp/<slug>
function useHashRoute() {
  const get = () => (window.location.hash.replace(/^#/, '') || '/').replace(/\/$/, '') || '/';
  const [path, setPath] = useState(get);
  useEffect(() => {
    const onHash = () => setPath(get());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = useCallback((to) => {
    if (to.startsWith('#')) to = to.slice(1);
    window.location.hash = to;
  }, []);
  return { path, navigate };
}

const RouterCtx = createContext({ path: '/', navigate: () => {} });
const useRouter = () => useContext(RouterCtx);

/* Link wraps an <a> so we can trigger the cinematic transition before nav */
function Link({ to, children, className, style, transitionLabel, transitionSub, panelColor, panelText, onClick }) {
  const { navigate } = useRouter();
  const transition = useTransition();
  return (
    <a
      href={'#' + to}
      className={className}
      style={style}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (onClick) onClick();
        if (transitionLabel) {
          transition.run({ label: transitionLabel, sub: transitionSub, panelColor, panelText, onMidway: () => navigate(to) });
        } else {
          navigate(to);
        }
      }}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────── Cinematic Transition ───────────────────────── */
const TransitionCtx = createContext(null);
const useTransition = () => useContext(TransitionCtx);

function TransitionProvider({ children }) {
  const [state, setState] = useState({ phase: 'idle', label: '', sub: '', panelColor: '#000', panelText: '#fff' });

  const run = useCallback(({ label, sub, panelColor = '#000', panelText = '#fff', onMidway }) => {
    setState({ phase: 'entering', label, sub, panelColor, panelText });
    setTimeout(() => {
      if (onMidway) onMidway();
      window.scrollTo({ top: 0, behavior: 'auto' });
      setState((s) => ({ ...s, phase: 'exiting' }));
      setTimeout(() => setState((s) => ({ ...s, phase: 'idle' })), 600);
    }, 700);
  }, []);

  return (
    <TransitionCtx.Provider value={{ run }}>
      {children}
      {state.phase !== 'idle' && (
        <div
          className={`transition-overlay is-${state.phase}`}
          style={{ '--panel-color': state.panelColor, '--panel-text': state.panelText }}
          aria-hidden="true"
        >
          <div className="panel" />
          <div>
            <div className="label">{state.label}</div>
            {state.sub && <div className="sublabel">{state.sub}</div>}
          </div>
        </div>
      )}
    </TransitionCtx.Provider>
  );
}

/* ─────────────────────────── Cart context ──────────────────────────────── */
const CartCtx = createContext(null);
const useCart = () => useContext(CartCtx);
function CartProvider({ children }) {
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const add = useCallback(() => setCount((c) => c + 1), []);
  const fav = useCallback(() => setFavorites((f) => f + 1), []);
  return <CartCtx.Provider value={{ count, favorites, add, fav }}>{children}</CartCtx.Provider>;
}

/* ─────────────────────────── Auth context ──────────────────────────────── */
// Local-only auth: users persisted in localStorage under "kb-spor.users",
// current session under "kb-spor.session". No backend — this is a prototype.
const AUTH_USERS_KEY = 'kb-spor.users';
const AUTH_SESSION_KEY = 'kb-spor.session';
const AuthCtx = createContext(null);
const useAuth = () => useContext(AuthCtx);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem(AUTH_SESSION_KEY); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  const readUsers = () => {
    try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '{}'); }
    catch { return {}; }
  };
  const writeUsers = (u) => { try { localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(u)); } catch {} };

  const setSession = (u) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(u));
      else localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {}
  };

  // Returns { ok, error }
  const register = useCallback(({ name, email, phone, password }) => {
    if (!name || name.trim().length < 2) return { ok: false, error: 'Adınızı en az 2 karakter olarak girin.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')) return { ok: false, error: 'Geçerli bir e-posta adresi girin.' };
    if (!password || password.length < 6) return { ok: false, error: 'Şifreniz en az 6 karakter olmalı.' };
    const users = readUsers();
    if (users[email.toLowerCase()]) return { ok: false, error: 'Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.' };
    const u = { name: name.trim(), email: email.toLowerCase(), phone: phone || '', password, createdAt: Date.now() };
    users[email.toLowerCase()] = u;
    writeUsers(users);
    const session = { name: u.name, email: u.email, phone: u.phone };
    setSession(session);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    if (!email || !password) return { ok: false, error: 'E-posta ve şifre gerekli.' };
    const users = readUsers();
    const u = users[email.toLowerCase()];
    if (!u) return { ok: false, error: 'Bu e-posta için kayıt bulamadık.' };
    if (u.password !== password) return { ok: false, error: 'Şifre yanlış.' };
    const session = { name: u.name, email: u.email, phone: u.phone };
    setSession(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => setSession(null), []);

  return (
    <AuthCtx.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

/* ─────────────────────────── Mood context ──────────────────────────────── */
// Mood is driven primarily by route. Tweaks can pin it.
const MoodCtx = createContext({ mood: 'kinetic', accent: null });

function MoodFromRoute({ path, children, tweakMood, tweakAccent }) {
  const auto = useMemo(() => {
    if (path.startsWith('/futbol/klasik')) return 'editorial';
    if (path.startsWith('/futbol/builder')) return 'lab';
    if (path.startsWith('/futbol')) return 'futbol';
    if (path.startsWith('/basket')) return 'basket';
    return 'kinetic';
  }, [path]);
  const mood = tweakMood && tweakMood !== 'auto' ? tweakMood : auto;
  useEffect(() => {
    document.documentElement.setAttribute('data-mood', mood);
    if (tweakAccent) document.documentElement.style.setProperty('--accent', tweakAccent);
    else document.documentElement.style.removeProperty('--accent');
  }, [mood, tweakAccent]);
  return <MoodCtx.Provider value={{ mood }}>{children}</MoodCtx.Provider>;
}

/* ─────────────────────────── Header ─────────────────────────────────────── */
function Header() {
  const { path } = useRouter();
  const cart = useCart();
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/',         label: 'Anasayfa' },
    { to: '/futbol',   label: 'KB Futbol', transitionLabel: 'KB FUTBOL', transitionSub: 'Crafted for Champions', panelColor: '#0a0a0b', panelText: '#ff4d2e' },
    { to: '/basket',   label: 'KB Basket', transitionLabel: 'KB BASKET', transitionSub: 'Parke. Çember. Bir takım.', panelColor: '#0a0a0b', panelText: '#ff7a23' },
    { to: '/futbol/klasik',  label: 'Maison KB', transitionLabel: 'MAISON KB', transitionSub: 'Heritage · Crafted Once', panelColor: '#050403', panelText: '#d4af37' },
    { to: '/futbol/builder', label: 'KB.LAB', transitionLabel: 'KB.LAB', transitionSub: '// SYSTEM ONLINE', panelColor: '#06080c', panelText: '#00f0ff' },
    { to: '/iletisim', label: 'İletişim' },
  ];
  const isActive = (to) => {
    if (to === '/') return path === '/';
    if (to === '/futbol/klasik') return path.startsWith('/futbol/klasik');
    if (to === '/futbol/builder') return path.startsWith('/futbol/builder');
    if (to === '/futbol') return path === '/futbol' || (path.startsWith('/futbol') && !path.startsWith('/futbol/klasik') && !path.startsWith('/futbol/builder'));
    return path.startsWith(to);
  };

  // Close the user menu on route change
  useEffect(() => { setMenuOpen(false); }, [path]);
  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => { if (!e.target.closest?.('.user-menu-anchor')) setMenuOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="row-inner">
        <Link to="/" className="brand">
          <BrandMark size={34} className="mark" />
          <div className="word-row">
            <span className="word">KB SPOR</span>
            <span className="tag">Crafted for Champions</span>
          </div>
        </Link>

        <nav aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={isActive(l.to) ? 'is-active' : ''}
              transitionLabel={l.transitionLabel}
              transitionSub={l.transitionSub}
              panelColor={l.panelColor}
              panelText={l.panelText}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="tools">
          <span className="locale-pill"><span style={{ color: 'var(--text)' }}>TR</span> / <span>EN</span></span>
          <span className="locale-pill"><span style={{ color: 'var(--text)' }}>₺</span> TRY</span>
          <button className="icon-btn" aria-label="Ara"><IconSearch size={18} /></button>
          <button className="icon-btn" aria-label="Favoriler">
            <IconHeart size={18} />
            {cart.favorites > 0 && <span className="badge">{cart.favorites}</span>}
          </button>
          <button className="icon-btn" aria-label="Sepet">
            <IconBag size={18} />
            {cart.count > 0 && <span className="badge">{cart.count}</span>}
          </button>

          <div className="user-menu-anchor" style={{ position: 'relative' }}>
            {auth.user ? (
              <button
                className="icon-btn"
                aria-label={`Hesabım — ${auth.user.name}`}
                onClick={() => setMenuOpen((o) => !o)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 10px', width: 'auto' }}
              >
                <span style={{ display: 'inline-grid', placeItems: 'center', width: 26, height: 26, borderRadius: 50, background: 'var(--accent)', color: 'var(--bg)', font: '700 11px/1 var(--font-sans)' }}>
                  {auth.user.name.trim().split(/\s+/).map((s) => s[0]).join('').slice(0, 2).toUpperCase()}
                </span>
                <span className="hide-on-mobile" style={{ font: '600 12px/1 var(--font-mono)', letterSpacing: '0.06em' }}>
                  {auth.user.name.split(' ')[0].toUpperCase()}
                </span>
              </button>
            ) : (
              <button className="icon-btn" aria-label="Giriş yap / kayıt ol" onClick={() => setMenuOpen((o) => !o)}>
                <IconUser size={18} />
              </button>
            )}

            {menuOpen && <UserMenu onClose={() => setMenuOpen(false)} />}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- User dropdown menu ---------- */
function UserMenu({ onClose }) {
  const auth = useAuth();
  const { navigate } = useRouter();
  const go = (to) => { onClose(); navigate(to); };
  return (
    <div
      role="menu"
      style={{
        position: 'absolute', right: 0, top: 'calc(100% + 12px)', minWidth: 240,
        background: 'var(--bg-2)', border: '1px solid var(--line-2)',
        borderRadius: 10, padding: 8, zIndex: 100,
        boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
      }}
    >
      {auth.user ? (
        <>
          <div style={{ padding: '12px 14px 14px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ font: '600 14px/1.2 var(--font-sans)', color: 'var(--text)' }}>{auth.user.name}</div>
            <div className="text-caption muted" style={{ marginTop: 2 }}>{auth.user.email}</div>
          </div>
          <MenuItem onClick={() => go('/hesap')}>Hesabım</MenuItem>
          <MenuItem onClick={() => go('/hesap/siparisler')}>Siparişlerim</MenuItem>
          <MenuItem onClick={() => go('/hesap/tasarimlarim')}>Tasarımlarım</MenuItem>
          <MenuItem onClick={() => { auth.logout(); onClose(); }} danger>Çıkış yap</MenuItem>
        </>
      ) : (
        <>
          <div style={{ padding: '12px 14px 8px' }}>
            <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 6 }}>HESAP</div>
            <div className="text-small" style={{ color: 'var(--muted)' }}>
              Siparişlerinizi ve tasarımlarınızı takip edin.
            </div>
          </div>
          <MenuItem onClick={() => go('/giris')}><strong>Giriş yap</strong> →</MenuItem>
          <MenuItem onClick={() => go('/kayit')}>Yeni hesap oluştur →</MenuItem>
        </>
      )}
    </div>
  );
}
function MenuItem({ onClick, children, danger }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '10px 14px',
        font: '500 13px/1.3 var(--font-sans)',
        color: danger ? '#ff7a55' : 'var(--text)',
        borderRadius: 6,
        transition: 'background 120ms',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────── Footer ─────────────────────────────────────── */
function Footer({ variant = 'spor' }) {
  const COLUMNS_BY_VARIANT = {
    spor: [
      { heading: 'Alışveriş', links: [
        { to: '/futbol', label: 'KB Futbol' },
        { to: '/basket', label: 'KB Basket' },
        { to: '/futbol/klasik', label: 'Maison KB' },
        { to: '/futbol/builder', label: 'KB.LAB Tasarla' },
      ]},
      { heading: 'Yardım', links: [
        { to: '/yardim/beden', label: 'Beden Tablosu' },
        { to: '/yardim/kargo', label: 'Kargo & Teslimat' },
        { to: '/yardim/iade', label: 'İade & Değişim' },
        { to: '/iletisim', label: 'İletişim' },
      ]},
      { heading: 'Marka', links: [
        { to: '/hakkimizda', label: 'Hakkımızda' },
        { to: '/atolye', label: 'Atölye' },
        { to: '/surdurulebilirlik', label: 'Sürdürülebilirlik' },
      ]},
    ],
    futbol: [
      { heading: 'Futbol', links: [
        { to: '/futbol/formalar', label: 'Tüm Formalar' },
        { to: '/futbol/klasik', label: 'Maison KB · Klasik' },
        { to: '/futbol/builder', label: 'KB.LAB Tasarla' },
        { to: '/futbol/krampon', label: 'Krampon' },
        { to: '/futbol/top', label: 'Toplar' },
        { to: '/futbol/milli-takimlar', label: 'Milli Takımlar' },
      ]},
      { heading: 'Yardım', links: [
        { to: '/yardim/beden', label: 'Beden Tablosu' },
        { to: '/yardim/kargo', label: 'Kargo & Teslimat' },
        { to: '/yardim/iade', label: 'İade & Değişim' },
      ]},
      { heading: 'Marka', links: [
        { to: '/hakkimizda', label: 'Hakkımızda' },
        { to: '/atolye', label: 'Atölye' },
      ]},
    ],
    basket: [
      { heading: 'Basket', links: [
        { to: '/basket/nba', label: 'NBA' },
        { to: '/basket/bsl', label: 'BSL' },
        { to: '/basket/top', label: 'Toplar' },
        { to: '/basket/ayakkabi', label: 'Ayakkabı (Yakında)' },
      ]},
      { heading: 'Yardım', links: [
        { to: '/yardim/beden', label: 'Beden Tablosu' },
        { to: '/yardim/kargo', label: 'Kargo & Teslimat' },
        { to: '/yardim/iade', label: 'İade & Değişim' },
      ]},
      { heading: 'Marka', links: [
        { to: '/hakkimizda', label: 'Hakkımızda' },
        { to: '/atolye', label: 'Atölye' },
      ]},
    ],
  };
  const columns = COLUMNS_BY_VARIANT[variant] || COLUMNS_BY_VARIANT.spor;
  const aboutCopy = {
    spor: "İstanbul'dan dünyaya — premium forma üretimi ve tek parça koleksiyon. Şampiyonlar için dokunmuş.",
    futbol: "KB Futbol — Avrupa'nın elit kulüpleri, milli takımlar, klasikler ve sizin için tek parça forma.",
    basket: "KB Basket — NBA ve BSL formaları, profesyonel basketbol topları, yakında performans ayakkabısı.",
  }[variant];

  return (
    <footer className="site-footer">
      <div className="grid">
        <div className="about">
          <Link to="/" className="row" style={{ marginBottom: 16, gap: 12 }}>
            <BrandMark size={32} />
            <span style={{ font: '800 14px/1 var(--font-sans)', letterSpacing: '0.18em' }}>KB SPOR</span>
          </Link>
          <p>{aboutCopy}</p>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>Levent Mh. Spor Cad. No:8 · Beşiktaş, İstanbul</p>
          <p style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em' }}>+90 850 KB FORMA</p>
        </div>
        {columns.map((col) => (
          <div key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>{col.links.map((l) => (<li key={l.to}><Link to={l.to}>{l.label}</Link></li>))}</ul>
          </div>
        ))}
      </div>
      <div className="legal">
        <span>© 2026 KB Spor</span>
        <span>KVKK · GİZLİLİK · ÇEREZ POLİTİKASI</span>
        <span style={{ color: 'var(--dim)' }}>Şampiyonlar için dokunmuş.</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Marquee ────────────────────────────────────── */
function Marquee({ items, color = 'muted' }) {
  // items: array of strings. We duplicate so the loop seam is invisible.
  const fragment = items.map((it, i) => (
    <React.Fragment key={i}>
      <span className={typeof it === 'object' && it.hi ? 'hi' : ''}>{typeof it === 'object' ? it.text : it}</span>
      <span className="dot">●</span>
    </React.Fragment>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {fragment}
        {fragment}
      </div>
    </div>
  );
}

/* ─────────────────────────── Jersey art ────────────────────────────────── */
// One SVG silhouette used everywhere — product chips, PDP hero, lab preview.
// Sized via a viewBox so it scales without changing proportions. Supports
// front (crest + small chest number) and back (NAME + big NUMBER).
function JerseyArt({
  primary = '#444', secondary = '#222', accent = '#fff', cuff,
  pattern = 'plain',       // 'plain' | 'stripes-v' | 'stripes-h' | 'half' | 'sash'
  view = 'front',          // 'front' | 'back'
  crest,                   // 2–3 char string (e.g. "GS")
  num,                     // 1–2 char string
  name,                    // back-of-jersey nameplate string (uppercase)
  brandTag = 'KB · SPOR',  // hem tag
  className,
  style,
}) {
  const W = 200, H = 250;
  // Body path with proper V-neck, shoulders, and curved hem.
  const BODY = 'M40 30 L70 25 L100 56 L130 25 L160 30 L195 56 L184 96 L160 88 L162 236 Q100 248 38 236 L40 88 L16 96 L5 56 Z';
  // Inner cut used as clip for patterns (slightly inset so patterns don't show on collar/sleeves)
  const cuffColor = cuff || secondary;

  // Use safe ids per instance so multiple jerseys on a page don't collide.
  const uid = React.useId ? React.useId().replace(/[^a-z0-9]/gi, '') : Math.random().toString(36).slice(2, 8);

  // Number sizing — single digit can be bigger; two digits scaled down a touch
  const numLen = String(num || '').length;
  const bigNumSize = numLen >= 2 ? 100 : 116;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
      role="img"
      aria-label={view === 'back' ? `Forma · ${name || ''} ${num || ''}` : `Forma · ${crest || ''}`}
    >
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={shadeHex(primary, -0.18)} />
        </linearGradient>
        <radialGradient id={`hi-${uid}`} cx="38%" cy="22%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id={`shd-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.22)" />
          <stop offset="50%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}><path d={BODY} /></clipPath>
      </defs>

      {/* Base body */}
      <path d={BODY} fill={`url(#g-${uid})`} />

      {/* Patterns clipped to body */}
      <g clipPath={`url(#clip-${uid})`}>
        {pattern === 'stripes-v' && (
          [0,1,2,3,4,5].map((i) => (
            <rect key={i} x={20 + i * 30} y={0} width={14} height={H} fill={secondary} opacity={0.78} />
          ))
        )}
        {pattern === 'stripes-h' && (
          [0,1,2,3,4,5,6].map((i) => (
            <rect key={i} x={0} y={40 + i * 30} width={W} height={14} fill={secondary} opacity={0.78} />
          ))
        )}
        {pattern === 'half' && (
          <rect x={W / 2} y={0} width={W / 2} height={H} fill={secondary} />
        )}
        {pattern === 'sash' && (
          <polygon points={`0,140 ${W},40 ${W},80 0,180`} fill={secondary} opacity={0.85} />
        )}
      </g>

      {/* Sleeve cuff stripes */}
      <rect x={4} y={88} width={20} height={5} fill={cuffColor} />
      <rect x={176} y={88} width={20} height={5} fill={cuffColor} />

      {/* Collar — V-neck outline + inner fill ribbon */}
      <path d="M70 26 L100 56 L130 26" fill="none" stroke={cuffColor} strokeWidth="3" strokeLinejoin="round" />
      <path d="M73 28 L100 55 L127 28 Z" fill={cuffColor} opacity={0.35} />

      {/* Highlight + edge shadow */}
      <path d={BODY} fill={`url(#hi-${uid})`} pointerEvents="none" />
      <path d={BODY} fill={`url(#shd-${uid})`} pointerEvents="none" opacity={0.4} />

      {/* Body outline for definition */}
      <path d={BODY} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />

      {/* CONTENT — front vs back */}
      {view === 'front' ? (
        <>
          {/* Crest badge — left chest panel */}
          {crest && (
            <g>
              <rect x={60} y={86} width={36} height={42} rx={3} fill="rgba(0,0,0,0.22)" stroke="rgba(255,255,255,0.32)" strokeWidth="0.6" />
              <text
                x={78} y={111}
                textAnchor="middle"
                fontFamily="Playfair Display, serif"
                fontWeight="800"
                fontSize={crest.length >= 3 ? 13 : 17}
                letterSpacing="-0.5"
                fill={accent === '#fff' || accent === '#FFFFFF' ? '#fff' : accent}
              >{crest}</text>
              <text x={78} y={123} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="4" letterSpacing="0.6" fill="rgba(255,255,255,0.7)">EST 2020</text>
            </g>
          )}
          {/* Right-chest tag / sponsor block — small KB.SPOR plate */}
          <g>
            <rect x={114} y={92} width={42} height={14} fill="rgba(0,0,0,0.18)" />
            <text x={135} y={102} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6.5" letterSpacing="1.4" fill="rgba(255,255,255,0.9)">KB · SPOR</text>
          </g>
          {/* Optional small number under sponsor — gives the front character */}
          {num && (
            <text x={135} y={132} textAnchor="middle" fontFamily="Playfair Display, serif" fontWeight="800" fontSize="22" letterSpacing="-1" fill="rgba(255,255,255,0.92)">{num}</text>
          )}
        </>
      ) : (
        <>
          {/* Back: NAME (upper back) + big NUMBER */}
          {name && (
            <text
              x={W / 2} y={100}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="800"
              fontSize={Math.max(8, 16 - Math.max(0, (name.length - 6)) * 0.8)}
              letterSpacing="3"
              fill={accent}
            >{name.toUpperCase()}</text>
          )}
          {num && (
            <text
              x={W / 2} y={195}
              textAnchor="middle"
              fontFamily="Playfair Display, serif"
              fontWeight="800"
              fontSize={bigNumSize}
              letterSpacing="-5"
              fill="rgba(255,255,255,0.96)"
            >{num}</text>
          )}
        </>
      )}

      {/* Hem brand strip — small KB tag at very bottom center */}
      <rect x={W/2 - 24} y={232} width={48} height={9} fill="rgba(0,0,0,0.35)" />
      <text x={W/2} y={239} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="5.5" letterSpacing="1.6" fill="rgba(255,255,255,0.85)">{brandTag}</text>
    </svg>
  );
}

// Shade a hex color (positive = lighter, negative = darker). Used by both
// JerseyArt and the builder; kept on window so it doesn't get re-declared
// per Babel scope.
function shadeHex(hex, amount) {
  try {
    const c = String(hex).replace('#', '');
    const num = parseInt(c.length === 3 ? c.split('').map((x) => x + x).join('') : c, 16);
    let r = (num >> 16) + Math.round(255 * amount);
    let g = ((num >> 8) & 0xff) + Math.round(255 * amount);
    let b = (num & 0xff) + Math.round(255 * amount);
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  } catch { return hex; }
}

/* JerseyChip — back-compat wrapper used in product cards. Same look as
 * JerseyArt, sized 4:5 to fit product grid tiles. */
function JerseyChip({ primary = '#444', secondary = '#222', accent = '#fff', crest, num, pattern = 'plain', name, view = 'front', brandTag }) {
  return (
    <div className="jersey-chip" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <JerseyArt
        primary={primary} secondary={secondary} accent={accent}
        pattern={pattern} view={view}
        crest={crest} num={num} name={name}
        brandTag={brandTag}
      />
    </div>
  );
}

/* ─────────────────────────── Reveal-on-mount ────────────────────────────── */
// Simpler than IntersectionObserver: fade in shortly after mount, staggered by `delay`.
// IO fails in capture contexts and reduced-motion environments — this is more reliable.
function Reveal({ children, delay = 0, style, className = '' }) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSeen(true), 30 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 700ms cubic-bezier(0,0,0.2,1), transform 700ms cubic-bezier(0,0,0.2,1)`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── Section / common chrome ────────────────────── */
function Section({ children, eyebrow, heading, cta, className = '', style }) {
  return (
    <section className={`container ${className}`} style={{ paddingBlock: 'clamp(64px, 9vw, 120px)', ...style }}>
      {(eyebrow || heading || cta) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            {eyebrow && <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>}
            {heading && <h2 className="h-2" style={{ maxWidth: '24ch' }}>{heading}</h2>}
          </div>
          {cta}
        </div>
      )}
      {children}
    </section>
  );
}

/* Expose to global */
Object.assign(window, {
  // hooks/ctx
  useHashRoute, useRouter, RouterCtx, useTransition, TransitionProvider,
  useCart, CartProvider, useAuth, AuthProvider, MoodCtx, MoodFromRoute,
  // components
  BrandMark, Link, Header, Footer, Marquee, JerseyArt, JerseyChip, Reveal, Section,
  // utils
  shadeHex,
  // icons
  IconHeart, IconBag, IconUser, IconArrow, IconSearch, IconMenu, IconCheck, IconPlus, IconMinus, IconChevron,
});
