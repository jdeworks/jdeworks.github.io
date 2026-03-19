// Matrix (1999) — dense falling code rain with changing characters, palette-aware
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Matrix";

export function render(d, cs, ts, hs) {
  const uid = 'mx' + Math.random().toString(36).slice(2, 6);

  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; overflow: hidden;
      background: var(--bg) !important;
      font-family: 'Courier New', monospace !important;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-canvas {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 0; pointer-events: none;
    }
    .${uid}-content {
      position: relative; z-index: 2; color: var(--accent);
    }
    .${uid}-scrim {
      background: color-mix(in srgb, var(--bg) 80%, transparent);
      backdrop-filter: blur(3px); border-radius: 8px; padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
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
      background: color-mix(in srgb, var(--bg) 85%, transparent);
      backdrop-filter: blur(2px);
      transition: background 0.3s, border-color 0.3s;
    }
    .${uid}-card:hover {
      background: color-mix(in srgb, var(--bg) 92%, transparent);
      border-color: color-mix(in srgb, var(--accent) 25%, transparent);
    }
  </style>

  <div class="${uid}-root" id="${uid}-root">
    <canvas class="${uid}-canvas" id="${uid}-canvas"></canvas>

    <div class="${uid}-content" style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;">
      <div class="${uid}-scrim">
        <p class="${uid}-dim" style="font-size:0.8rem;margin:0 0 0.5rem;">wake up, neo...</p>
        <h1 class="${uid}-glow" style="font-size:clamp(2rem,5vw,3rem);margin:0;font-weight:400;color:var(--accent);">
          &gt; ${d.name}_
        </h1>
        <p class="${uid}-dim" style="font-size:0.9rem;margin:1rem 0 0;line-height:1.8;">${d.role}</p>
        <p style="font-size:0.9rem;margin:1rem 0 0;line-height:1.8;opacity:0.8;color:var(--fg);">${d.bio}</p>
      </div>

      <div class="${uid}-scrim" style="border-left:2px solid var(--accent);">
        <p style="font-size:0.85rem;margin:0;line-height:1.7;font-style:italic;color:var(--fg);opacity:0.9;">"${d.take}"</p>
      </div>

      <div class="${uid}-scrim">
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

      <div class="${uid}-scrim">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 0.75rem;">[SYSTEM] skills.dat</p>
        <div>${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
      </div>

      <div class="${uid}-scrim">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 0.75rem;">[LOG] history</p>
        ${d.timeline.map(t => `<p style="font-size:0.8rem;margin:0 0 0.35rem;color:var(--fg);"><span style="opacity:0.5;">${t.period}</span> <span class="${uid}-dim">→</span> ${t.label}</p>`).join('')}
      </div>

      <footer class="${uid}-scrim" style="border-top:1px solid color-mix(in srgb, var(--accent) 12%, transparent);">
        <p style="font-size:0.8rem;margin:0 0 0.75rem;color:var(--fg2);">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
        <p class="${uid}-dim" style="font-size:0.7rem;margin:1rem 0 0;">follow the white rabbit...</p>
      </footer>
    </div>
  </div>

  <matrix-rain data-canvas="${uid}-canvas" data-root="${uid}-root"></matrix-rain>`;
}
