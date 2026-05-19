/* =============================================================================
 * ai.js — Single entrypoint the chat uses to talk to whatever LLM is
 * available. Tries providers in this order:
 *
 *   1) window.claude.complete         (when running in claude.ai sandbox)
 *   2) Google Gemini                  (when KB_CONFIG.geminiKey is set)
 *
 * Falls back to a friendly help message that tells the deployer what to do.
 *
 * Public API:
 *   await window.KB_AI.complete({ system, messages })   → string
 *   window.KB_AI.provider                                → 'claude' | 'gemini' | 'none'
 * ============================================================================= */

(function () {
  const cfg = window.KB_CONFIG || {};

  const hasClaude = typeof window.claude !== 'undefined' && typeof window.claude.complete === 'function';
  const hasGemini = !!cfg.geminiKey && cfg.geminiKey.startsWith('AIza');

  const provider = hasClaude ? 'claude' : hasGemini ? 'gemini' : 'none';

  async function complete({ system, messages }) {
    if (provider === 'claude') {
      return await window.claude.complete({ system, messages });
    }
    if (provider === 'gemini') {
      return await callGemini({ system, messages });
    }
    // Not configured — return a useful static reply
    return [
      'Şu anda yapay zekâ asistanı bu sayfada yapılandırılmamış.',
      '',
      'Sitenin sahibi: KB Asistan\'ı çalıştırmak için src/config.js dosyasına Google Gemini API anahtarınızı ekleyin.',
      '',
      'Geçici çözüm olarak doğrudan iletişime geçebilirsiniz:',
      '• WhatsApp: +90 555 KB FORMA',
      '• E-posta: merhaba@kbspor.com.tr',
      '',
      '[ACTION: WhatsApp ile yaz | /iletisim] [ACTION: KB.LAB\'da tasarla | /futbol/builder]',
    ].join('\n');
  }

  // ---- Google Gemini call --------------------------------------------------
  async function callGemini({ system, messages }) {
    const model = cfg.geminiModel || 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cfg.geminiKey)}`;

    // Convert OpenAI/Claude-style messages → Gemini's contents.
    // Gemini uses role: 'user' | 'model'. System lives separately.
    const contents = messages
      .filter((m) => m && m.content)
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    const body = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topP: 0.9,
      },
    };
    if (system) {
      body.system_instruction = { parts: [{ text: system }] };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      let parsed = null;
      try { parsed = JSON.parse(errBody); } catch {}
      const msg = parsed?.error?.message || errBody || `HTTP ${res.status}`;
      throw new Error('Gemini API: ' + msg);
    }

    const data = await res.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') ||
      data?.candidates?.[0]?.output ||
      '';

    if (!text) {
      // Some Gemini safety blocks return empty candidates with a finishReason
      const reason = data?.candidates?.[0]?.finishReason || data?.promptFeedback?.blockReason;
      throw new Error('Gemini boş bir yanıt döndü' + (reason ? ' (' + reason + ')' : '') + '.');
    }
    return text;
  }

  window.KB_AI = { complete, provider };
})();
