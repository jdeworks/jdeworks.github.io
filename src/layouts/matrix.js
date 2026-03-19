// Matrix (1999) — falling code rain, palette-aware colors, full-screen rain
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Matrix";

export function render(d, cs, ts, hs) {
  const uid = 'mx' + Math.random().toString(36).slice(2, 6);
  // Generate columns covering full width
  const cols = Array.from({length: 40}, (_, i) => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const col = Array.from({length: 35}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const left = (i * 2.6) + Math.random() * 1.5;
    const dur = 6 + Math.random() * 14;
    const delay = Math.random() * -20;
    const size = 11 + Math.random() * 5;
    return `<span class="${uid}-col" style="left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;font-size:${size}px;">${col}</span>`;
  }).join('');

  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; overflow: hidden;
      background: var(--bg) !important;
      font-family: 'Courier New', monospace !important;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-rain {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 0;
      pointer-events: none; overflow: hidden;
    }
    .${uid}-col {
      position: absolute; top: -100%;
      color: var(--accent); opacity: 0.2; writing-mode: vertical-rl;
      animation: ${uid}-fall linear infinite;
      text-shadow: 0 0 8px var(--accent);
    }
    @keyframes ${uid}-fall {
      0% { transform: translateY(-100vh); }
      100% { transform: translateY(200vh); }
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-col { animation: none; opacity: 0.08; transform: translateY(50vh); }
    }
    .${uid}-content { position: relative; z-index: 1; color: var(--accent); }
    .${uid}-glow { text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 40px var(--accent2); }
    .${uid}-dim { color: var(--accent2) !important; opacity: 0.7; }
    .${uid}-link { color: var(--accent) !important; text-decoration: none; transition: text-shadow 0.2s; }
    .${uid}-link:hover { text-shadow: 0 0 12px var(--accent), 0 0 24px var(--accent); }
    .${uid}-tag {
      font-size: 0.75rem; padding: 0.2rem 0.5rem; display: inline-block; margin: 0.15rem;
      border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
      color: var(--accent); border-radius: 2px;
    }
    .${uid}-card {
      border: 1px solid color-mix(in srgb, var(--accent) 12%, transparent);
      padding: 1.5rem; margin-bottom: 1rem;
      background: color-mix(in srgb, var(--accent) 3%, transparent);
      transition: background 0.3s, border-color 0.3s;
    }
    .${uid}-card:hover {
      background: color-mix(in srgb, var(--accent) 6%, transparent);
      border-color: color-mix(in srgb, var(--accent) 25%, transparent);
    }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-rain">${cols}</div>

    <div class="${uid}-content" style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;">
      <div style="margin-bottom:3rem;">
        <p class="${uid}-dim" style="font-size:0.8rem;margin:0 0 0.5rem;">wake up, neo...</p>
        <h1 class="${uid}-glow" style="font-size:clamp(2rem,5vw,3rem);margin:0;font-weight:400;color:var(--accent);">
          &gt; ${d.name}_
        </h1>
        <p class="${uid}-dim" style="font-size:0.9rem;margin:1rem 0 0;line-height:1.8;">${d.role}</p>
        <p style="font-size:0.9rem;margin:1rem 0 0;line-height:1.8;opacity:0.8;color:var(--fg);">${d.bio}</p>
      </div>

      <div style="margin-bottom:3rem;padding:1.5rem;border-left:2px solid var(--accent);background:color-mix(in srgb, var(--accent) 3%, transparent);">
        <p style="font-size:0.85rem;margin:0;line-height:1.7;font-style:italic;color:var(--fg);opacity:0.9;">"${d.take}"</p>
      </div>

      <div style="margin-bottom:2rem;">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 1rem;">[SYSTEM] loading repositories...</p>
        ${d.projects.map(p => `
          <div class="${uid}-card">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
              <h3 style="font-size:1rem;margin:0;font-weight:400;color:var(--accent);">&gt; ${p.name}</h3>
              ${p.soon
                ? `<span class="${uid}-dim" style="font-size:0.75rem;">[CLASSIFIED]</span>`
                : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.8rem;">access &rarr;</a>`}
            </div>
            <p style="font-size:0.8rem;margin:0.5rem 0 0.75rem;line-height:1.6;color:var(--fg2);">${p.desc}</p>
            <div>${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.8rem;display:inline-block;margin-top:0.5rem;">demo &rarr;</a>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom:2rem;">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 0.75rem;">[SYSTEM] skills.dat</p>
        <div>${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
      </div>

      <div style="margin-bottom:2rem;">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 0.75rem;">[LOG] history</p>
        ${d.timeline.map(t => `<p style="font-size:0.8rem;margin:0 0 0.35rem;color:var(--fg);"><span style="opacity:0.5;">${t.period}</span> <span class="${uid}-dim">→</span> ${t.label}</p>`).join('')}
      </div>

      <footer style="border-top:1px solid color-mix(in srgb, var(--accent) 12%, transparent);padding-top:1.5rem;margin-top:2rem;">
        <p style="font-size:0.8rem;margin:0 0 0.75rem;color:var(--fg2);">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
        <p class="${uid}-dim" style="font-size:0.7rem;margin:1rem 0 0;">follow the white rabbit...</p>
      </footer>
    </div>
  </div>`;
}
