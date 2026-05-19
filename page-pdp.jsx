/* =============================================================================
 * page-iletisim.jsx — Contact page with KB Asistan (AI concierge)
 * Powered by window.claude.complete.
 * The assistant is grounded with a KB Spor system prompt and outputs
 * inline action chips of the form [ACTION: label | path] that we parse
 * into clickable buttons that navigate within the site.
 * ============================================================================= */

const { useState: useSCt, useEffect: useECt, useRef: useRCt } = React;

const KB_SYSTEM_PROMPT = `Sen KB Spor'un yapay zekâ destekli müşteri asistanısın — adın "KB Asistan". Türkçe, "siz"li, sıcak ama profesyonel bir tonda yanıt verirsin. Asla "merhaba size nasıl yardımcı olabilirim" gibi şablon ifadeler kullanma — direkt soruya gir.

KB SPOR, İstanbul Levent'te bir futbol & basketbol forma markasıdır (EST 2020). İki ana hub'ı vardır:
- KB FUTBOL: Süper Lig, Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Milli Takımlar — tüm formalar made-to-order. Ayrıca krampon (FG/AG/IC), top, antrenman ekipmanları.
- KB BASKET: NBA (30 takım), BSL (16 takım) formaları, profesyonel basketbol topları. Performans ayakkabısı yakında (sonbahar 2027).

Özel koleksiyonlar:
- MAISON KB (Editorial): Tarihten 6 efsane forma — Maradona '86, Zidane '98, Ronaldo '02, Cristiano '07, Messi '09, Totti '06. Her parça yalnızca 12 nüsha, numaralı sertifika ve özel kutu ile. Fiyat 14.999 ₺.
- KB.LAB (3D Konfigüratör): Müşteri kendi formasını şablon + kumaş + renk + isim + numara + amblem seçerek tasarlar. 3 kumaş seçeneği: Match Pro (2.999 ₺, İtalyan jakar 280 g/m²), Training Air (2.299 ₺, mesh 180 g/m²), Heritage (3.499 ₺, pamuk-poly 320 g/m²).

Üretim & teslimat:
- Tüm formalar made-to-order. Üretim 7–14 gün, kargo 1–3 gün. Stok sayacı yoktur.
- Top ve krampon gerçek stoktan.
- KDV %20 fiyata dahildir.
- İade 14 gün (baskısız formalar için; isim/numara baskılı formalar üretildikten sonra iade edilemez).

Ödeme: iyzico ile güvenli ödeme. TRY varsayılan; EN versiyonunda USD/EUR seçici (TCMB kuru, günlük güncel).

Atölye & iletişim:
- Adres: Levent Mh. Spor Cad. No:8 · Beşiktaş, İstanbul
- Telefon: +90 850 KB FORMA
- E-posta: merhaba@kbspor.com.tr
- WhatsApp: +90 555 KB FORMA (sipariş durumu için)
- Mesai: Hafta içi 09:00–18:00

Bedenler: XS — 3XL. Beden tablosu /yardim/beden adresinde.
Şampiyonlar için dokunmuş.

KURALLAR:
1. Sorulan şeyi yanıtla, gereksiz uzatma. 2–4 cümleyle kapanıyorsa öyle yap.
2. Kullanıcıya gerçekten yardımcı olacak yönlendirme yaparken, mesajının SONUNA aşağıdaki formatla 1–3 action chip ekle:
   [ACTION: Etiket | path]
   Geçerli path'ler: / · /futbol · /basket · /futbol/klasik · /futbol/builder · /futbol/pdp/<slug> · /kayit · /giris · /hesap · /yardim/beden · /yardim/kargo · /yardim/iade · /iletisim
   Örnek slug'lar: galatasaray, fenerbahce, real-madrid, barcelona, liverpool, lakers, celtics, mar86, zid98
   Örnek: [ACTION: KB.LAB'da tasarla | /futbol/builder]
3. Sadece KB Spor ile ilgili konularda yardım et. Müşteri başka bir konu açarsa kibarca yönlendir.
4. Asla fiyat, sürec veya hizmet konusunda yalan söyleme — bilmediğini söyle ve insan temsilciye yönlendir.
5. Asla emoji kullanma.`;

const SUGGESTED_PROMPTS = [
  'Kendi formamı tasarlamak istiyorum, nasıl başlarım?',
  'Galatasaray forması ne kadar ve ne kadar sürede gelir?',
  'NBA ayakkabısı ne zaman çıkacak?',
  'Maradona \'86 formasından nasıl alabilirim?',
  '15 kişilik takımım için toplu sipariş veriyor musunuz?',
  'İade politikanız nedir?',
];

function IletisimPage() {
  return (
    <div className="container" style={{ paddingBlock: 'clamp(40px, 5vw, 80px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}><span className="eyebrow-dot" />İLETİŞİM · CANLI</div>
        <h1 className="h-1" style={{ maxWidth: '18ch', marginBottom: 18 }}>
          Sorunuza <span className="italic-display" style={{ color: 'var(--accent)' }}>cevap</span> hemen burada.
        </h1>
        <p className="text-lead muted" style={{ maxWidth: '60ch' }}>
          KB Asistan size formalar, üretim süresi, KB.LAB ve kargo hakkında her şeyi anlatır. Sipariş özel bir konuysa ekibimize bağlanabilirsiniz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'flex-start' }} className="iletisim-grid">
        {/* Chat */}
        <KBAssistant />

        {/* Right column: human contact */}
        <aside style={{ display: 'grid', gap: 16, position: 'sticky', top: 100 }}>
          <ContactCard
            eyebrow="ATÖLYE"
            title="Levent · İstanbul"
            body="Levent Mh. Spor Cad. No:8 · Beşiktaş, İstanbul"
            extra="Hafta içi 09:00 — 18:00"
          />
          <ContactCard
            eyebrow="TELEFON"
            title="+90 850 KB FORMA"
            body="Sipariş, fatura ve hesap soruları için."
            extra="Yanıt: ~5 dk"
            href="tel:+908505236762"
          />
          <ContactCard
            eyebrow="WHATSAPP"
            title="+90 555 KB FORMA"
            body="Sipariş durumu, üretim aşaması bildirimleri."
            extra="Yanıt: ~30 dk"
            href="https://wa.me/9055552376762"
          />
          <ContactCard
            eyebrow="E-POSTA"
            title="merhaba@kbspor.com.tr"
            body="Detaylı talepler, toplu sipariş, basın."
            extra="Yanıt: 1 iş günü"
            href="mailto:merhaba@kbspor.com.tr"
          />

          <div style={{ padding: 20, border: '1px dashed var(--line-2)' }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>KULÜP · TAKIM TALEPLERİ</div>
            <p className="text-small muted" style={{ marginBottom: 14 }}>
              10+ kişilik takımlar için özel fiyat ve teslim takvimi.
            </p>
            <a className="btn btn-ghost btn-sm" href="mailto:b2b@kbspor.com.tr">b2b@kbspor.com.tr →</a>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .iletisim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ContactCard({ eyebrow, title, body, extra, href }) {
  const inner = (
    <>
      <div className="text-micro" style={{ color: 'var(--accent)', marginBottom: 8 }}>{eyebrow}</div>
      <div style={{ font: '700 18px/1.2 var(--font-display)', marginBottom: 6 }}>{title}</div>
      <p className="text-small muted">{body}</p>
      {extra && <p className="text-caption" style={{ color: 'var(--dim)', marginTop: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{extra}</p>}
    </>
  );
  if (href) return <a href={href} style={{ display: 'block', padding: 20, border: '1px solid var(--line)', background: 'var(--bg)', transition: 'border-color var(--d-fast)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--line-2)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}>{inner}</a>;
  return <div style={{ padding: 20, border: '1px solid var(--line)', background: 'var(--bg)' }}>{inner}</div>;
}

/* ─────────────────────────── KB Asistan ─────────────────────────────── */
function KBAssistant() {
  const { navigate } = useRouter();
  const [messages, setMessages] = useSCt([
    {
      role: 'assistant',
      text: 'KB Asistan burada. Formalar, KB.LAB konfigüratörü, üretim süresi, kargo, iade ve atölyemiz hakkında her şeyi sorabilirsiniz.',
      actions: [
        { label: 'Kendi formamı tasarla', path: '/futbol/builder' },
        { label: 'Koleksiyona göz at', path: '/futbol' },
      ],
    },
  ]);
  const [input, setInput] = useSCt('');
  const [busy, setBusy] = useSCt(false);
  const [err, setErr] = useSCt(null);
  const scrollRef = useRCt(null);
  const inputRef = useRCt(null);

  useECt(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const send = async (text) => {
    text = (text || '').trim();
    if (!text || busy) return;
    setErr(null);
    const next = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setBusy(true);

    try {
      // Build the conversation history. Our KB_AI shim accepts the same
      // {system, messages} shape regardless of which provider is wired up
      // (Claude in the sandbox, Gemini on GitHub Pages, fallback otherwise).
      const apiMessages = next.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      }));
      const reply = await window.KB_AI.complete({
        system: KB_SYSTEM_PROMPT,
        messages: apiMessages,
      });

      // Parse out [ACTION: label | path] chips from the reply
      const { text: clean, actions } = parseActions(reply || '');
      setMessages((m) => [...m, { role: 'assistant', text: clean, actions }]);
    } catch (e) {
      console.error('KB Asistan error', e);
      setErr('Şu anda bağlanamıyorum. Lütfen WhatsApp veya e-posta ile ulaşın.');
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--bg-2)', display: 'flex', flexDirection: 'column', height: '70vh', minHeight: 560, maxHeight: 820 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 38, height: 38, display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', borderRadius: 50 }}>
            <BrandMark size={22} className="mark" />
            <span style={{ position: 'absolute', right: -2, bottom: -2, width: 12, height: 12, borderRadius: 50, background: '#2dbf64', border: '2px solid var(--bg-2)', boxShadow: '0 0 8px #2dbf64' }} />
          </div>
          <div>
            <div style={{ font: '600 14px/1 var(--font-sans)' }}>KB Asistan</div>
            <div className="text-caption" style={{ color: '#2dbf64', marginTop: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>● ÇEVRİMİÇİ · YANIT &lt; 5 SN</div>
          </div>
        </div>
        <span className="text-micro muted" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          AI · {window.KB_AI?.provider === 'claude' ? 'CLAUDE HAIKU' : window.KB_AI?.provider === 'gemini' ? 'GEMINI 2.0' : 'OFFLINE'}
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} actions={m.actions} onAction={navigate} />
        ))}
        {busy && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)' }}>
            <span style={{ display: 'inline-block', width: 26, height: 26 }} aria-hidden="true">
              <BrandMark size={18} className="mark" />
            </span>
            <Typing />
          </div>
        )}
        {err && <div className="text-small" style={{ color: '#ff7a55' }}>{err}</div>}
      </div>

      {/* Suggested prompts (only show when conversation is short) */}
      {messages.length <= 2 && !busy && (
        <div style={{ padding: '0 22px 14px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SUGGESTED_PROMPTS.slice(0, 4).map((p) => (
            <button key={p} className="pill" onClick={() => send(p)} style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: '0.02em', height: 30, padding: '0 14px' }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--line)', padding: 12, background: 'var(--bg)' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sorunuzu yazın… (örn. ‘Liverpool formasının kumaşı nedir?’)"
          style={{ flex: 1, padding: '14px 16px', font: '500 14px/1 var(--font-sans)', color: 'var(--text)' }}
          disabled={busy}
        />
        <button type="submit" className="btn btn-primary" disabled={busy || !input.trim()} style={{ borderRadius: 8, opacity: busy ? 0.5 : 1 }}>
          {busy ? '…' : <>Gönder <IconArrow size={14} /></>}
        </button>
      </form>
    </div>
  );
}

function MessageBubble({ role, text, actions, onAction }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-start' }}>
      {!isUser && (
        <div style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: 50, background: 'var(--accent-soft)', flexShrink: 0, marginTop: 4 }}>
          <BrandMark size={16} />
        </div>
      )}
      <div style={{ maxWidth: '78%' }}>
        <div
          style={{
            padding: '12px 16px',
            background: isUser ? 'var(--accent)' : 'var(--surface)',
            color: isUser ? 'var(--bg)' : 'var(--text)',
            borderRadius: 12,
            borderTopLeftRadius: isUser ? 12 : 4,
            borderTopRightRadius: isUser ? 4 : 12,
            font: '500 14px/1.55 var(--font-sans)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {text}
        </div>
        {actions && actions.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={() => onAction(a.path)}
                className="pill is-active"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: '0.02em', height: 30, padding: '0 14px' }}
              >
                {a.label} →
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '8px 14px', background: 'var(--surface)', borderRadius: 12 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6, height: 6, borderRadius: 50, background: 'var(--muted)',
            animation: `typing-pulse 1.2s ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing-pulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); } 40% { opacity: 1; transform: scale(1); } }
      `}</style>
    </span>
  );
}

/* Parse `[ACTION: Label | /path]` chips from the model's text and return
 * stripped text + parsed actions array. */
function parseActions(raw) {
  const re = /\[ACTION:\s*([^|\]]+?)\s*\|\s*([^\]]+?)\s*\]/g;
  const actions = [];
  const text = raw.replace(re, (_m, label, path) => {
    actions.push({ label: label.trim(), path: path.trim() });
    return '';
  }).trim();
  return { text, actions };
}

Object.assign(window, { IletisimPage });
