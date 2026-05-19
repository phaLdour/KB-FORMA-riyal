/* =============================================================================
 * config.js — Site-level configuration.
 * Edit the values below and commit. Loaded BEFORE everything else so any
 * script can read window.KB_CONFIG.
 * =============================================================================
 *
 *  HOW TO TURN ON THE AI ASSISTANT (KB Asistan) ON GITHUB PAGES
 *  -----------------------------------------------------------
 *  1) Visit https://aistudio.google.com/app/apikey
 *  2) Click "Create API key" (free, requires a Google account)
 *  3) Copy the key (starts with "AIza…")
 *  4) Paste it below between the quotes, replacing the empty string
 *  5) Commit + push. The KB Asistan will work for all visitors.
 *
 *  Free tier limits (as of 2026): ~15 requests/minute on gemini-2.0-flash,
 *  generous daily quotas. Plenty for a portfolio prototype.
 *
 *  ⚠ SECURITY NOTE
 *  Because this is a static site, the key will be visible to anyone who
 *  inspects the source. Treat it as semi-public. Use a Google account that
 *  doesn't bill, and rotate the key if you see abuse on the Google Cloud
 *  console. For a production site, proxy through a backend instead.
 *
 * ============================================================================= */

window.KB_CONFIG = {
  // Paste your Google AI Studio (Gemini) key here:
  geminiKey: 'AIzaSyDPNGJp5ooWcmUq9u9XGbKqAA6JuRzc_VQ',

  // Model — leave as is unless Google deprecates it.
  geminiModel: 'gemini-2.0-flash',
};
