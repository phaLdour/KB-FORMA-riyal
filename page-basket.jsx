/* =============================================================================
 * page-auth.jsx — Kayıt (register), Giriş (login), Hesap (account)
 * Real localStorage-backed auth. No backend.
 * ============================================================================= */

const { useState: useSAu, useEffect: useEAu } = React;

/* ─────────────────────────── KAYIT ─────────────────────────────────────── */
function RegisterPage() {
  const auth = useAuth();
  const { navigate } = useRouter();
  const [name, setName] = useSAu('');
  const [email, setEmail] = useSAu('');
  const [phone, setPhone] = useSAu('');
  const [password, setPassword] = useSAu('');
  const [password2, setPassword2] = useSAu('');
  const [agree, setAgree] = useSAu(false);
  const [bulten, setBulten] = useSAu(true);
  const [err, setErr] = useSAu(null);
  const [busy, setBusy] = useSAu(false);

  // If already logged in, redirect
  useEAu(() => { if (auth.user) navigate('/hesap'); }, [auth.user]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    if (!agree) { setErr('Devam etmek için Mesafeli Satış ve KVKK onayını işaretleyin.'); return; }
    if (password !== password2) { setErr('Şifreler eşleşmiyor.'); return; }
    setBusy(true);
    setTimeout(() => {
      const res = auth.register({ name, email, phone, password });
      setBusy(false);
      if (res.ok) navigate('/hesap');
      else setErr(res.error);
    }, 350);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="auth-page-grid">
      {/* LEFT — editorial copy panel */}
      <aside style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)', padding: 'clamp(40px, 6vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="auth-side">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,77,46,0.10), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,240,255,0.06), transparent 60%)' }} />
        <div className="bg-grid" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        <div style={{ position: 'relative' }}>
          <Link to="/" className="row" style={{ gap: 12, marginBottom: 48 }}>
            <BrandMark size={34} />
            <span style={{ font: '800 14px/1 var(--font-sans)', letterSpacing: '0.18em' }}>KB SPOR</span>
          </Link>
          <div className="eyebrow" style={{ marginBottom: 14 }}><span className="eyebrow-dot" />KAYIT · YENİ HESAP</div>
          <h1 className="h-1" style={{ maxWidth: '14ch', marginBottom: 24 }}>
            Atölyeye <span className="italic-display" style={{ color: 'var(--accent)' }}>davetlisiniz</span>.
          </h1>
          <p className="text-body muted" style={{ maxWidth: '44ch' }}>
            Bir KB Spor hesabı; siparişlerinizi takip etmek, KB.LAB'da tasarladıklarınızı saklamak ve sezona özel parçaları ilk siz görmek için.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '40px 0 0', display: 'grid', gap: 14 }}>
            {[
              { l: 'TASARIM', v: 'KB.LAB build\'leriniz kalır' },
              { l: 'SİPARİŞ', v: 'Üretim adımlarını canlı takip' },
              { l: 'BİLDİRİM', v: 'Yeni koleksiyon · WhatsApp + e-posta' },
              { l: 'GÜVENLİK', v: 'iyzico KDV %20 dahil' },
            ].map((item) => (
              <li key={item.l} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
                <span className="text-micro" style={{ color: 'var(--accent)' }}>{item.l}</span>
                <span className="text-small">{item.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ position: 'relative', marginTop: 48 }}>
          <p className="text-micro muted">ZATEN HESABINIZ VAR?</p>
          <Link to="/giris" className="btn btn-ghost" style={{ marginTop: 10 }}>Giriş yap <IconArrow size={14} /></Link>
        </div>
      </aside>

      {/* RIGHT — form */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 560, width: '100%', margin: '0 auto' }}>
        <h2 className="h-2" style={{ marginBottom: 8 }}>Hesap oluştur</h2>
        <p className="text-small muted" style={{ marginBottom: 32 }}>Bilgiler bu cihazda saklanır — gerçek bir hesap servisine bağlı değildir (prototip).</p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 18 }}>
          <Field label="AD SOYAD" type="text" placeholder="Mehmet Yılmaz" value={name} onChange={setName} autoComplete="name" required />
          <Field label="E-POSTA" type="email" placeholder="siz@ornek.com" value={email} onChange={setEmail} autoComplete="email" required />
          <Field label="TELEFON (opsiyonel)" type="tel" placeholder="+90 ____" value={phone} onChange={setPhone} autoComplete="tel" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="ŞİFRE" type="password" placeholder="En az 6 karakter" value={password} onChange={setPassword} autoComplete="new-password" required />
            <Field label="ŞİFRE TEKRAR" type="password" placeholder="Tekrar yazın" value={password2} onChange={setPassword2} autoComplete="new-password" required />
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: 16, height: 16, marginTop: 3, accentColor: 'var(--accent)' }} />
            <span className="text-small muted">
              <strong style={{ color: 'var(--text)' }}>Mesafeli Satış Sözleşmesi</strong> ve <strong style={{ color: 'var(--text)' }}>KVKK Aydınlatma Metni</strong>'ni okudum, onaylıyorum.
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
            <input type="checkbox" checked={bulten} onChange={(e) => setBulten(e.target.checked)} style={{ width: 16, height: 16, marginTop: 3, accentColor: 'var(--accent)' }} />
            <span className="text-small muted">Yeni koleksiyon ve KB.LAB güncellemelerini almak istiyorum.</span>
          </label>

          {err && (
            <div style={{ padding: '12px 14px', background: 'rgba(255, 77, 46, 0.08)', border: '1px solid rgba(255, 77, 46, 0.4)', borderRadius: 8, color: '#ff7a55', font: '500 13px/1.4 var(--font-sans)' }}>
              {err}
            </div>
          )}

          <button type="submit" disabled={busy} className="btn btn-primary btn-lg" style={{ marginTop: 8, opacity: busy ? 0.6 : 1 }}>
            {busy ? 'Kaydediliyor…' : 'Hesabı oluştur'} <IconArrow size={14} />
          </button>

          <p className="text-caption muted" style={{ textAlign: 'center', marginTop: 8 }}>
            Hesap oluşturarak <Link to="/gizlilik" style={{ textDecoration: 'underline' }}>gizlilik politikamızı</Link> kabul etmiş olursunuz.
          </p>
        </form>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .auth-page-grid { grid-template-columns: 1fr !important; }
          .auth-side { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── GİRİŞ ─────────────────────────────────────── */
function LoginPage() {
  const auth = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useSAu('');
  const [password, setPassword] = useSAu('');
  const [err, setErr] = useSAu(null);
  const [busy, setBusy] = useSAu(false);

  useEAu(() => { if (auth.user) navigate('/hesap'); }, [auth.user]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    setTimeout(() => {
      const res = auth.login({ email, password });
      setBusy(false);
      if (res.ok) navigate('/hesap');
      else setErr(res.error);
    }, 250);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="auth-page-grid">
      <aside style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)', padding: 'clamp(40px, 6vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="auth-side">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,77,46,0.10), transparent 60%)' }} />
        <div className="bg-grid" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        <div style={{ position: 'relative' }}>
          <Link to="/" className="row" style={{ gap: 12, marginBottom: 48 }}>
            <BrandMark size={34} />
            <span style={{ font: '800 14px/1 var(--font-sans)', letterSpacing: '0.18em' }}>KB SPOR</span>
          </Link>
          <div className="eyebrow" style={{ marginBottom: 14 }}><span className="eyebrow-dot" />HESAP · GİRİŞ</div>
          <h1 className="h-1" style={{ maxWidth: '14ch', marginBottom: 24 }}>
            Geri <span className="italic-display" style={{ color: 'var(--accent)' }}>hoşgeldiniz</span>.
          </h1>
          <p className="text-body muted" style={{ maxWidth: '44ch' }}>
            Siparişlerinize, tasarımlarınıza ve favorilerinize buradan ulaşın.
          </p>
        </div>

        <div style={{ position: 'relative', marginTop: 48 }}>
          <p className="text-micro muted">HENÜZ HESABINIZ YOK MU?</p>
          <Link to="/kayit" className="btn btn-ghost" style={{ marginTop: 10 }}>Yeni hesap oluştur <IconArrow size={14} /></Link>
        </div>
      </aside>

      <section style={{ padding: 'clamp(40px, 6vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 480, width: '100%', margin: '0 auto' }}>
        <h2 className="h-2" style={{ marginBottom: 8 }}>Giriş yap</h2>
        <p className="text-small muted" style={{ marginBottom: 32 }}>E-posta ve şifrenizle hesabınıza erişin.</p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 18 }}>
          <Field label="E-POSTA" type="email" placeholder="siz@ornek.com" value={email} onChange={setEmail} autoComplete="email" required />
          <Field label="ŞİFRE" type="password" placeholder="••••••" value={password} onChange={setPassword} autoComplete="current-password" required />

          {err && (
            <div style={{ padding: '12px 14px', background: 'rgba(255, 77, 46, 0.08)', border: '1px solid rgba(255, 77, 46, 0.4)', borderRadius: 8, color: '#ff7a55', font: '500 13px/1.4 var(--font-sans)' }}>
              {err}
            </div>
          )}

          <button type="submit" disabled={busy} className="btn btn-primary btn-lg" style={{ marginTop: 8, opacity: busy ? 0.6 : 1 }}>
            {busy ? 'Kontrol ediliyor…' : 'Giriş yap'} <IconArrow size={14} />
          </button>

          <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/kayit" className="text-small" style={{ color: 'var(--muted)', textDecoration: 'underline' }}>Hesap oluştur</Link>
            <button type="button" className="text-small" style={{ color: 'var(--muted)', textDecoration: 'underline' }} onClick={() => alert('Şifre sıfırlama bağlantısı e-postanıza gönderilecek (prototip).')}>Şifremi unuttum</button>
          </div>
        </form>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .auth-page-grid { grid-template-columns: 1fr !important; }
          .auth-side { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── HESAP ─────────────────────────────────────── */
function HesapPage() {
  const auth = useAuth();
  const { navigate } = useRouter();
  const cart = useCart();

  useEAu(() => { if (!auth.user) navigate('/giris'); }, [auth.user]);
  if (!auth.user) return null;

  const initial = auth.user.name.trim().split(/\s+/).map((s) => s[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="container" style={{ paddingBlock: 'clamp(40px, 6vw, 80px)', minHeight: '70vh' }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>HESAP · HOŞGELDİNİZ</div>
      <h1 className="h-1" style={{ marginBottom: 36 }}>
        Merhaba <span className="italic-display" style={{ color: 'var(--accent)' }}>{auth.user.name.split(' ')[0]}</span>.
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 2fr', gap: 32 }} className="hesap-grid">
        {/* Profile card */}
        <aside style={{ padding: 32, border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
          <div style={{ display: 'inline-grid', placeItems: 'center', width: 64, height: 64, borderRadius: 50, background: 'var(--accent)', color: 'var(--bg)', font: '700 22px/1 var(--font-sans)', marginBottom: 18 }}>
            {initial}
          </div>
          <div style={{ font: '600 18px/1.2 var(--font-display)', marginBottom: 4 }}>{auth.user.name}</div>
          <div className="text-small muted" style={{ marginBottom: 4 }}>{auth.user.email}</div>
          {auth.user.phone && <div className="text-small muted">{auth.user.phone}</div>}

          <hr className="divider" style={{ margin: '24px 0' }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 4 }}>
            <HesapNavLink to="/hesap">Genel bakış</HesapNavLink>
            <HesapNavLink to="/hesap/siparisler">Siparişlerim</HesapNavLink>
            <HesapNavLink to="/hesap/tasarimlarim">KB.LAB Tasarımlarım</HesapNavLink>
            <HesapNavLink to="/hesap/adresler">Adreslerim</HesapNavLink>
            <HesapNavLink to="/favoriler">Favoriler</HesapNavLink>
          </ul>

          <button onClick={auth.logout} className="btn btn-ghost btn-sm" style={{ marginTop: 24, width: '100%' }}>
            Çıkış yap
          </button>
        </aside>

        {/* Body */}
        <div style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}>
            <StatCard lbl="SİPARİŞ" val={cart.count} unit="adet · sepette" />
            <StatCard lbl="FAVORİ" val={cart.favorites} unit="kayıt" />
            <StatCard lbl="ÜYELİK" val="GOLD" unit="seviye" />
          </div>

          <div style={{ padding: 'clamp(28px, 3vw, 40px)', border: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>HIZLI BAŞLANGIÇ</div>
            <h2 className="h-3" style={{ marginBottom: 20, maxWidth: '24ch' }}>Önce ne yapmak istersiniz?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="qs-grid">
              <QuickStart to="/futbol/builder" label="Tasarla" sub="KB.LAB'a gir" panelLabel="KB.LAB" panelColor="#06080c" panelText="#00f0ff" />
              <QuickStart to="/futbol" label="Vitrin" sub="KB Futbol koleksiyonu" panelLabel="KB FUTBOL" panelColor="#0a0a0b" panelText="#ff4d2e" />
              <QuickStart to="/futbol/klasik" label="Maison" sub="Klasik koleksiyon" panelLabel="MAISON KB" panelColor="#050403" panelText="#d4af37" />
            </div>
          </div>

          <div style={{ padding: 'clamp(28px, 3vw, 40px)', border: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>SON SİPARİŞLER</div>
            <p className="text-small muted" style={{ marginBottom: 24 }}>Henüz hiç siparişiniz yok. İlk parçanızı bulalım mı?</p>
            <Link to="/futbol" className="btn btn-primary" transitionLabel="KB FUTBOL" transitionSub="Crafted for Champions" panelColor="#0a0a0b" panelText="#ff4d2e">
              KB Futbol'a gir <IconArrow size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hesap-grid { grid-template-columns: 1fr !important; }
          .qs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function HesapNavLink({ to, children }) {
  const { path } = useRouter();
  const active = path === to;
  return (
    <li>
      <Link to={to} style={{ display: 'block', padding: '10px 12px', font: '500 13px/1.2 var(--font-sans)', borderRadius: 6, background: active ? 'var(--surface)' : 'transparent', color: active ? 'var(--accent)' : 'var(--text)' }}>
        {children}
      </Link>
    </li>
  );
}
function StatCard({ lbl, val, unit }) {
  return (
    <div style={{ padding: 24, background: 'var(--bg)' }}>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 8 }}>{lbl}</div>
      <div style={{ font: '700 32px/1 var(--font-display)', color: 'var(--accent)', letterSpacing: '-0.02em' }}>{val}</div>
      <div className="text-caption muted" style={{ marginTop: 4 }}>{unit}</div>
    </div>
  );
}
function QuickStart({ to, label, sub, panelLabel, panelColor, panelText }) {
  return (
    <Link to={to} transitionLabel={panelLabel} panelColor={panelColor} panelText={panelText} style={{ display: 'block', padding: 18, border: '1px solid var(--line)', textAlign: 'left' }}>
      <div className="text-micro" style={{ color: 'var(--accent)', marginBottom: 8 }}>→</div>
      <div style={{ font: '600 15px/1.2 var(--font-sans)', marginBottom: 4 }}>{label}</div>
      <div className="text-caption muted">{sub}</div>
    </Link>
  );
}

/* ─────────────────────────── Field ─────────────────────────────────────── */
function Field({ label, type, value, onChange, placeholder, autoComplete, required }) {
  return (
    <label style={{ display: 'block' }}>
      <div className="text-micro" style={{ color: 'var(--muted)', marginBottom: 8 }}>{label}{required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        style={{
          width: '100%', padding: '14px 16px',
          background: 'var(--bg)', border: '1px solid var(--line)',
          font: '500 14px/1 var(--font-sans)', color: 'var(--text)',
          borderRadius: 8,
          transition: 'border-color var(--d-fast)',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
      />
    </label>
  );
}

Object.assign(window, { RegisterPage, LoginPage, HesapPage });
