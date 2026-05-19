/* =============================================================================
 * KB Spor — High-fidelity prototype tokens & base styles
 * ============================================================================= */

:root {
  /* Spacing */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-14: 56px; --space-16: 64px; --space-20: 80px;
  --space-24: 96px; --space-30: 120px;

  /* Radii */
  --radius-s: 6px; --radius-m: 12px; --radius-l: 20px; --radius-pill: 999px;

  /* Type */
  --font-sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-display: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Motion */
  --d-instant: 0ms;
  --d-fast: 150ms; --d-base: 300ms; --d-slow: 600ms; --d-hero: 900ms;
  --ease-standard: cubic-bezier(0.2, 0.6, 0.2, 1);
  --ease-decel: cubic-bezier(0, 0, 0.2, 1);
  --ease-accel: cubic-bezier(0.4, 0, 1, 1);

  --maxw: 1440px;
  --gut: clamp(20px, 4vw, 56px);
}

/* ---------- KINETIC (default) — KB Spor root + global -------------------- */
:root,
[data-mood='kinetic'] {
  --bg: #0a0a0b;
  --bg-2: #0f0f12;
  --surface: #15151a;
  --surface-2: #1c1c22;
  --line: rgba(255, 255, 255, 0.08);
  --line-2: rgba(255, 255, 255, 0.16);
  --text: #f6f6f8;
  --muted: #8b8b94;
  --dim: #5a5a62;
  --accent: #ff4d2e;
  --accent-2: #ff7a55;
  --accent-soft: rgba(255, 77, 46, 0.12);
  --focus-ring: var(--accent);
}

/* ---------- FUTBOL — pitch energy, deep grass green undertone ----------- */
[data-mood='futbol'] {
  --bg: #07090a;
  --bg-2: #0c1110;
  --surface: #11181a;
  --surface-2: #182123;
  --line: rgba(255, 255, 255, 0.07);
  --line-2: rgba(255, 255, 255, 0.18);
  --text: #f4f7f4;
  --muted: #889089;
  --dim: #4f5a52;
  --accent: #ff4d2e;
  --accent-2: #ffa500;
  --pitch: #2dbf64;
  --pitch-line: rgba(255, 255, 255, 0.22);
  --accent-soft: rgba(255, 77, 46, 0.14);
  --focus-ring: var(--accent);
}

/* ---------- BASKET — parquet warmth, electric secondary ----------------- */
[data-mood='basket'] {
  --bg: #08080a;
  --bg-2: #0e0c10;
  --surface: #181318;
  --surface-2: #211a20;
  --line: rgba(255, 255, 255, 0.07);
  --line-2: rgba(255, 255, 255, 0.18);
  --text: #f7f4f0;
  --muted: #968a82;
  --dim: #5a4e46;
  --accent: #ff7a23;            /* basketball leather */
  --accent-2: #00d4ff;          /* electric secondary */
  --parquet: #c08a4c;
  --parquet-2: #8a5a2e;
  --accent-soft: rgba(255, 122, 35, 0.14);
  --focus-ring: var(--accent);
}

/* ---------- EDITORIAL — Maison KB Classic ------------------------------- */
[data-mood='editorial'] {
  --bg: #050403;
  --bg-2: #0d0904;
  --surface: #110a04;
  --surface-2: #1a0f04;
  --line: rgba(212, 175, 55, 0.18);
  --line-2: rgba(212, 175, 55, 0.36);
  --text: #ebd9a7;
  --muted: #a1936c;
  --dim: #6b5a36;
  --accent: #d4af37;
  --accent-2: #f3d27a;
  --gold-deep: #8a6a1f;
  --accent-soft: rgba(212, 175, 55, 0.12);
  --focus-ring: var(--accent-2);
}

/* ---------- LAB — KB.LAB builder, HUD ----------------------------------- */
[data-mood='lab'] {
  --bg: #06080c;
  --bg-2: #0a0d14;
  --surface: rgba(0, 240, 255, 0.04);
  --surface-2: rgba(0, 240, 255, 0.08);
  --line: rgba(0, 240, 255, 0.20);
  --line-2: rgba(0, 240, 255, 0.36);
  --grid: rgba(0, 240, 255, 0.07);
  --text: #e6f7ff;
  --muted: rgba(230, 247, 255, 0.62);
  --dim: rgba(230, 247, 255, 0.36);
  --accent: #00f0ff;
  --accent-2: #b1ff5b;
  --magenta: #ff2e9c;
  --accent-soft: rgba(0, 240, 255, 0.10);
  --focus-ring: var(--accent);
}

/* =============================================================================
 *  Reset & base
 * ============================================================================= */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; background: #000; }
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  line-height: 1.55;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background var(--d-slow) var(--ease-standard), color var(--d-slow) var(--ease-standard);
}
img, svg { display: block; max-width: 100%; }
button, input, select, textarea { font: inherit; color: inherit; }
button { background: none; border: 0; padding: 0; cursor: pointer; color: inherit; }
a { color: inherit; text-decoration: none; }
input, textarea, select { outline: none; background: transparent; border: 0; }
::selection { background: var(--accent); color: var(--bg); }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.18); }

/* =============================================================================
 *  Type utilities
 * ============================================================================= */
.eyebrow {
  font: 600 11px/1.2 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: var(--muted);
}
.eyebrow .eyebrow-dot {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); margin-right: 10px;
  vertical-align: middle; transform: translateY(-1px);
  animation: pulse 2.4s var(--ease-standard) infinite;
}
.h-display { font: 800 clamp(56px, 9.5vw, 156px)/0.9 var(--font-display); letter-spacing: -0.045em; margin: 0; }
.h-1 { font: 700 clamp(40px, 6vw, 84px)/0.98 var(--font-display); letter-spacing: -0.035em; margin: 0; }
.h-2 { font: 700 clamp(28px, 3.8vw, 50px)/1.05 var(--font-display); letter-spacing: -0.025em; margin: 0; }
.h-3 { font: 700 clamp(20px, 2vw, 28px)/1.15 var(--font-display); letter-spacing: -0.01em; margin: 0; }
.h-4 { font: 700 clamp(16px, 1.4vw, 20px)/1.2 var(--font-sans); margin: 0; }
.italic-display { font-family: var(--font-display); font-style: italic; font-weight: 400; }
.mono { font-family: var(--font-mono); letter-spacing: 0.04em; }
.muted { color: var(--muted); }
.dim { color: var(--dim); }
.text-micro { font: 600 10px/1.2 var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; }
.text-caption { font-size: 12px; line-height: 1.4; }
.text-small { font-size: 14px; line-height: 1.55; }
.text-body { font-size: 16px; line-height: 1.65; }
.text-lead { font-size: clamp(17px, 1.4vw, 20px); line-height: 1.6; }

/* =============================================================================
 *  Layout
 * ============================================================================= */
.container { max-width: var(--maxw); margin: 0 auto; padding: 0 var(--gut); }
.stack > * + * { margin-top: var(--gap, var(--space-4)); }
.row { display: flex; align-items: center; gap: var(--space-3); }
.divider { height: 1px; background: var(--line); border: 0; margin: 0; }
.divider-v { width: 1px; background: var(--line); align-self: stretch; }
.full-bleed { width: 100vw; margin-left: calc(50% - 50vw); }

/* =============================================================================
 *  Buttons
 * ============================================================================= */
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  height: 48px; padding: 0 22px;
  border-radius: var(--radius-m);
  font: 600 14px/1 var(--font-sans);
  letter-spacing: 0.01em;
  transition: all var(--d-fast) var(--ease-standard);
  cursor: pointer;
  white-space: nowrap;
}
.btn-primary { background: var(--accent); color: var(--bg); }
.btn-primary:hover { background: var(--accent-2); transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--line); }
.btn-ghost:hover { border-color: var(--line-2); background: var(--surface); }
.btn-quiet { color: var(--text); padding: 0; height: auto; gap: 6px; }
.btn-quiet:hover { color: var(--accent); }
.btn-quiet .arrow { transition: transform var(--d-fast); }
.btn-quiet:hover .arrow { transform: translateX(3px); }
.btn-sm { height: 36px; padding: 0 14px; font-size: 12px; }
.btn-lg { height: 56px; padding: 0 28px; font-size: 15px; }

/* =============================================================================
 *  Pill / chip
 * ============================================================================= */
.pill {
  display: inline-flex; align-items: center; gap: 6px;
  height: 28px; padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  font: 600 11px/1 var(--font-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--bg-2);
  transition: all var(--d-fast);
  cursor: pointer;
}
.pill:hover { color: var(--text); border-color: var(--line-2); }
.pill.is-active { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }

/* =============================================================================
 *  Card — generic
 * ============================================================================= */
.card {
  background: var(--bg);
  border: 1px solid var(--line);
  transition: border-color var(--d-fast), background var(--d-fast);
}
.card:hover { border-color: var(--line-2); }

/* =============================================================================
 *  Marquee
 * ============================================================================= */
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: var(--bg);
  padding: 14px 0;
}
.marquee-track {
  display: inline-flex; align-items: center; gap: 48px;
  white-space: nowrap;
  animation: marquee 38s linear infinite;
  font: 600 11px/1 var(--font-mono);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
}
.marquee-track .dot { color: var(--dim); }
.marquee-track .hi { color: var(--accent); }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes spin { to { transform: rotate(360deg); } }

/* Start visible — animation is enhancement only so reduced-motion users still
 * see content. Each route mount re-triggers the animation via React key prop. */
.fade-up { opacity: 1; animation: fade-up var(--d-slow) var(--ease-decel) both; }
.fade-in { opacity: 1; animation: fade-in var(--d-slow) var(--ease-decel) both; }
@media (prefers-reduced-motion: reduce) {
  .fade-up, .fade-in { animation: none; }
}

/* =============================================================================
 *  Decorative backgrounds — one per mood, applied to a hub's hero
 * ============================================================================= */
.bg-grid {
  background-image:
    linear-gradient(to right, var(--line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--line) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.5;
}
.bg-floodlight {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 240, 200, 0.10), transparent 60%),
    radial-gradient(ellipse 60% 50% at 50% 100%, rgba(45, 191, 100, 0.06), transparent 60%);
}
.bg-pitch-lines {
  background-image:
    /* center circle */
    radial-gradient(circle at 50% 50%, transparent 95px, var(--pitch-line) 95px, var(--pitch-line) 96px, transparent 97px),
    /* center spot */
    radial-gradient(circle at 50% 50%, var(--pitch-line) 2px, transparent 3px),
    /* horizontal center line */
    linear-gradient(to bottom, transparent calc(50% - 0.5px), var(--pitch-line) calc(50% - 0.5px), var(--pitch-line) calc(50% + 0.5px), transparent calc(50% + 0.5px));
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bg-parquet {
  background:
    repeating-linear-gradient(
      90deg,
      rgba(192, 138, 76, 0.06) 0 6px,
      rgba(138, 90, 46, 0.06) 6px 12px,
      rgba(192, 138, 76, 0.08) 12px 14px,
      rgba(138, 90, 46, 0.04) 14px 22px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0 48px,
      rgba(255, 255, 255, 0.04) 48px 49px
    );
}
.bg-lab-grid {
  background-image:
    linear-gradient(to right, var(--grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
  background-size: 32px 32px;
}
.bg-luxe-vignette {
  background:
    radial-gradient(ellipse at center, rgba(212, 175, 55, 0.06), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(212, 175, 55, 0.03), transparent 70%);
}

/* =============================================================================
 *  Cinematic page transition overlay
 * ============================================================================= */
.transition-overlay {
  position: fixed; inset: 0; z-index: 1000;
  pointer-events: none;
  display: grid; place-items: center;
  background: transparent;
}
.transition-overlay .panel {
  position: absolute; inset: 0;
  background: var(--panel-color, #000);
  transform: scaleY(0);
  transform-origin: bottom;
}
.transition-overlay.is-entering .panel {
  animation: t-enter 600ms cubic-bezier(0.7, 0, 0.3, 1) forwards;
}
.transition-overlay.is-exiting .panel {
  animation: t-exit 600ms cubic-bezier(0.7, 0, 0.3, 1) forwards;
}
.transition-overlay .label {
  position: relative; z-index: 2;
  opacity: 0;
  font: 800 clamp(42px, 8vw, 110px)/1 var(--font-display);
  letter-spacing: -0.04em;
  color: var(--panel-text, #fff);
  text-align: center;
}
.transition-overlay.is-entering .label { animation: t-label 600ms 80ms var(--ease-decel) forwards; }
.transition-overlay .sublabel {
  position: absolute; bottom: 10vh; left: 0; right: 0;
  text-align: center;
  font: 600 11px/1 var(--font-mono);
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--panel-text, #fff);
  opacity: 0;
}
.transition-overlay.is-entering .sublabel { animation: t-label 600ms 180ms var(--ease-decel) forwards; }

@keyframes t-enter {
  0% { transform: scaleY(0); transform-origin: bottom; }
  100% { transform: scaleY(1); transform-origin: bottom; }
}
@keyframes t-exit {
  0% { transform: scaleY(1); transform-origin: top; }
  100% { transform: scaleY(0); transform-origin: top; }
}
@keyframes t-label {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* =============================================================================
 *  Header
 * ============================================================================= */
.site-header {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in oklab, var(--bg) 80%, transparent);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid var(--line);
  transition: background var(--d-base), border-color var(--d-base);
}
.site-header .row-inner {
  height: 68px;
  display: flex; align-items: center; gap: var(--space-6);
  max-width: var(--maxw); margin: 0 auto;
  padding: 0 var(--gut);
}
.site-header .brand {
  display: flex; align-items: center; gap: 14px;
  flex-shrink: 0;
}
.site-header .brand .mark { width: 34px; height: 34px; color: var(--text); }
[data-mood='editorial'] .site-header .brand .mark { color: var(--accent); }
[data-mood='lab'] .site-header .brand .mark { color: var(--accent); }
.site-header .brand .word-row { display: flex; flex-direction: column; line-height: 1; }
.site-header .brand .word { font: 800 14px/1 var(--font-sans); letter-spacing: 0.18em; }
.site-header .brand .tag { font: 500 9px/1 var(--font-mono); letter-spacing: 0.2em; color: var(--muted); margin-top: 4px; text-transform: uppercase; }
.site-header nav { display: flex; align-items: center; gap: 26px; flex: 1; }
.site-header nav a {
  font: 500 14px/1 var(--font-sans);
  color: var(--muted);
  transition: color var(--d-fast);
  position: relative;
}
.site-header nav a:hover { color: var(--text); }
.site-header nav a.is-active { color: var(--text); }
.site-header nav a.is-active::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -24px; height: 2px;
  background: var(--accent);
}
.site-header .tools { display: flex; align-items: center; gap: 6px; margin-left: auto; }
.site-header .icon-btn {
  position: relative;
  width: 38px; height: 38px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-s); color: var(--text);
  transition: color var(--d-fast), background var(--d-fast);
}
.site-header .icon-btn:hover { color: var(--accent); background: var(--surface); }
.site-header .icon-btn .badge {
  position: absolute; top: 4px; right: 4px;
  min-width: 16px; height: 16px; padding: 0 4px;
  background: var(--accent); color: var(--bg);
  border-radius: 999px;
  font: 700 10px/16px var(--font-sans);
  text-align: center;
}
.site-header .locale-pill {
  display: inline-flex; align-items: center; gap: 6px;
  height: 30px; padding: 0 10px;
  border: 1px solid var(--line); border-radius: var(--radius-pill);
  font: 600 11px/1 var(--font-mono); letter-spacing: 0.16em;
  color: var(--muted);
  text-transform: uppercase;
}

/* =============================================================================
 *  Footer
 * ============================================================================= */
.site-footer { border-top: 1px solid var(--line); padding-block: 80px 32px; background: var(--bg); }
.site-footer .grid {
  max-width: var(--maxw); margin: 0 auto; padding: 0 var(--gut);
  display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px;
}
@media (max-width: 900px) { .site-footer .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .site-footer .grid { grid-template-columns: 1fr; } }
.site-footer h4 { font: 600 11px/1 var(--font-mono); letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin: 0 0 18px; }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.site-footer a { color: var(--text); font-size: 14px; }
.site-footer a:hover { color: var(--accent); }
.site-footer .about p { color: var(--muted); font-size: 14px; max-width: 36ch; }
.site-footer .legal {
  max-width: var(--maxw); margin: 56px auto 0; padding: 0 var(--gut);
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--line); padding-top: 24px;
  font: 600 11px/1 var(--font-mono); letter-spacing: 0.16em; color: var(--muted); text-transform: uppercase;
}

/* =============================================================================
 *  Product card / chip jersey
 * ============================================================================= */
.jersey-chip {
  aspect-ratio: 4 / 5;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-s);
  background:
    radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.05), transparent 60%),
    var(--surface);
  padding: 6px;
}
.jersey-chip svg { width: 100%; height: 100%; }

/* Product card */
.product-card {
  background: var(--bg);
  padding: 22px 22px 20px;
  border: 1px solid var(--line);
  transition: all var(--d-fast);
}
.product-card:hover { border-color: var(--line-2); transform: translateY(-2px); }
.product-card .title { font: 600 16px/1.2 var(--font-sans); margin-top: 14px; }
.product-card .sub { font: 400 13px/1.3 var(--font-sans); color: var(--muted); margin-top: 4px; }
.product-card .price { font: 500 12px/1 var(--font-mono); letter-spacing: 0.08em; color: var(--muted); margin-top: 12px; }
.product-card .league-tag {
  position: absolute; top: 12px; left: 12px; z-index: 2;
  height: 22px; padding: 0 8px;
  background: rgba(0,0,0,0.55); color: #fff;
  border-radius: 4px;
  font: 600 9px/22px var(--font-mono); letter-spacing: 0.18em; text-transform: uppercase;
}

/* =============================================================================
 *  Hero number / decorative big number
 * ============================================================================= */
.big-num {
  font: 800 clamp(120px, 22vw, 360px)/0.85 var(--font-display);
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px var(--line-2);
  user-select: none;
  pointer-events: none;
}

/* =============================================================================
 *  Misc bits
 * ============================================================================= */
.kicker-rule { display: inline-block; height: 1px; width: 48px; background: var(--accent); margin-bottom: 18px; vertical-align: middle; }
.dotted { background-image: radial-gradient(currentColor 1px, transparent 1px); background-size: 14px 14px; opacity: 0.18; }
.hide-mobile { @media (max-width: 720px) { display: none; } }

.scoreboard {
  display: inline-flex; align-items: stretch; gap: 0;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-s);
  background: rgba(0,0,0,0.4);
  font-family: var(--font-mono);
  overflow: hidden;
}
.scoreboard .seg { padding: 8px 14px; border-right: 1px solid var(--line); }
.scoreboard .seg:last-child { border-right: 0; }
.scoreboard .seg .lbl { display: block; font-size: 9px; letter-spacing: 0.22em; color: var(--muted); text-transform: uppercase; margin-bottom: 4px; }
.scoreboard .seg .val { font-size: 14px; font-weight: 700; color: var(--text); letter-spacing: 0.04em; }
.scoreboard .seg.is-live .val { color: var(--accent); }
.scoreboard .seg.is-live .lbl::before { content: '● '; color: var(--accent); animation: pulse 1.4s infinite; }
