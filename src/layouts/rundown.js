// Rundown — weathered, dusty, decayed aesthetic. Cracked textures, stained paper, faded ink.
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Rundown";

export function render(d, cs, ts, hs) {
  const uid = 'rd' + Math.random().toString(36).slice(2, 6);
  // Generate random stain positions
  const stains = Array.from({length: 6}, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 80 + Math.random() * 200, opacity: 0.015 + Math.random() * 0.03,
  }));

  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative;
      background: color-mix(in srgb, var(--bg) 90%, #8b7355);
      font-family: var(--font-body);
    }
    /* Grain overlay */
    .${uid}-root::before {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 2;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity: 0.06; mix-blend-mode: overlay;
    }
    /* Vignette */
    .${uid}-root::after {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 1;
      background: radial-gradient(ellipse at center, transparent 50%, color-mix(in srgb, var(--bg) 80%, #000) 100%);
    }
    .${uid}-content { position: relative; z-index: 3; }
    .${uid}-panel {
      background: color-mix(in srgb, var(--card) 85%, #a08060);
      border: 1px solid color-mix(in srgb, var(--border) 70%, #8b7355);
      padding: 1.5rem; margin-bottom: 1.5rem; position: relative;
      box-shadow: 2px 3px 8px rgba(0,0,0,0.15), inset 0 0 30px rgba(0,0,0,0.04);
    }
    /* Torn/rough top edge */
    .${uid}-torn {
      clip-path: polygon(
        0% 2%, 2% 0%, 5% 1.5%, 8% 0.5%, 12% 2%, 15% 0%, 20% 1%, 25% 0.5%,
        30% 2%, 35% 0%, 40% 1.5%, 45% 0%, 50% 1%, 55% 0.5%, 60% 2%, 65% 0%,
        70% 1.5%, 75% 0%, 80% 1%, 85% 2%, 90% 0.5%, 95% 1.5%, 98% 0%, 100% 1%,
        100% 98%, 98% 100%, 95% 98.5%, 92% 100%, 88% 98%, 85% 100%, 80% 99%,
        75% 100%, 70% 98%, 65% 100%, 60% 99%, 55% 100%, 50% 98%, 45% 100%,
        40% 99%, 35% 100%, 30% 98%, 25% 100%, 20% 99%, 15% 100%, 10% 98%,
        5% 100%, 2% 99%, 0% 100%
      );
      padding: 2rem 1.5rem;
    }
    .${uid}-faded { opacity: 0.75; }
    .${uid}-stain {
      position: absolute; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, #8b7355) 0%, transparent 70%);
    }
    .${uid}-stamp {
      display: inline-block; padding: 0.3rem 0.65rem; font-size: 0.7rem;
      border: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
      color: color-mix(in srgb, var(--accent) 80%, var(--fg2));
      border-radius: 2px; transform: rotate(${-2 + Math.random() * 4}deg);
      margin: 0.15rem; opacity: 0.8;
      font-family: var(--font-head); letter-spacing: 0.03em;
    }
    .${uid}-heading {
      color: color-mix(in srgb, var(--fg) 85%, #8b7355);
      font-family: var(--font-head);
    }
    .${uid}-text { color: color-mix(in srgb, var(--fg2) 90%, #8b7355); }
    .${uid}-accent { color: color-mix(in srgb, var(--accent) 75%, #8b7355); }
    .${uid}-link {
      color: color-mix(in srgb, var(--accent) 70%, #8b7355);
      text-decoration: underline; text-decoration-style: wavy;
      text-decoration-color: color-mix(in srgb, var(--accent) 30%, transparent);
      text-underline-offset: 3px;
    }
    .${uid}-link:hover { opacity: 0.7; }
    .${uid}-crack {
      height: 1px; margin: 1.5rem 0; position: relative;
      background: linear-gradient(90deg,
        transparent 0%, color-mix(in srgb, var(--border) 40%, #8b7355) 15%,
        color-mix(in srgb, var(--border) 60%, #8b7355) 40%,
        transparent 42%, transparent 58%,
        color-mix(in srgb, var(--border) 50%, #8b7355) 60%,
        color-mix(in srgb, var(--border) 30%, #8b7355) 85%,
        transparent 100%
      );
    }
    .${uid}-scratch { text-decoration: line-through; text-decoration-color: color-mix(in srgb, var(--fg) 25%, transparent); opacity: 0.4; font-size: 0.75rem; }
  </style>

  <div class="${uid}-root">
    <!-- Random stains -->
    ${stains.map(s => `<div class="${uid}-stain" style="left:${s.x}%;top:${s.y}%;width:${s.size}px;height:${s.size}px;opacity:${s.opacity};"></div>`).join('')}

    <div class="${uid}-content" style="max-width:780px;margin:0 auto;padding:3rem 1.5rem;">
      <!-- Header — torn paper -->
      <div class="${uid}-panel ${uid}-torn" style="text-align:center;margin-bottom:2rem;">
        <p class="${uid}-accent" style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;opacity:0.6;">[ worn credentials ]</p>
        <h1 class="${uid}-heading" style="${headingStyle(hs, 'font-size:clamp(2rem,5vw,3rem);margin:0;font-weight:700;')}">${d.name}</h1>
        <p class="${uid}-text" style="font-size:0.95rem;margin:0.5rem 0 0;">${d.role}</p>
        <p class="${uid}-scratch" style="margin:0.5rem 0 0;">CLASSIFIED · DO NOT DISTRIBUTE</p>
      </div>

      <!-- Bio -->
      <div class="${uid}-panel">
        <p class="${uid}-text" style="font-size:0.9rem;line-height:1.8;margin:0;">${d.bio}</p>
      </div>

      <div class="${uid}-crack"></div>

      <!-- Philosophy — stained -->
      <div class="${uid}-panel" style="position:relative;">
        <div class="${uid}-stain" style="right:-20px;top:-20px;width:120px;height:120px;opacity:0.04;"></div>
        <blockquote style="margin:0;padding:0 0 0 1rem;border-left:3px solid color-mix(in srgb, var(--accent) 40%, #8b7355);">
          <p class="${uid}-text" style="font-size:0.9rem;line-height:1.7;margin:0;font-style:italic;">"${d.take}"</p>
        </blockquote>
      </div>

      <div class="${uid}-crack"></div>

      <!-- Background -->
      <div class="${uid}-panel ${uid}-faded">
        <p class="${uid}-accent" style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;opacity:0.5;">[ faded records ]</p>
        <p class="${uid}-text" style="font-size:0.85rem;line-height:1.7;margin:0;">${d.about}</p>
      </div>

      <div class="${uid}-crack"></div>

      <!-- Projects -->
      <p class="${uid}-accent" style="font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 1.25rem;opacity:0.6;">[ salvaged files ]</p>
      ${d.projects.map((p, i) => `
        <div class="${uid}-panel" style="transform:rotate(${-0.5 + Math.random()}deg);">
          <h3 class="${uid}-heading" style="font-size:1rem;margin:0 0 0.5rem;font-weight:600;">${p.name}</h3>
          <p class="${uid}-text" style="font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
          <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-stamp">${t}</span>`).join('')}</div>
          <div>${p.soon
            ? `<span class="${uid}-text" style="font-size:0.8rem;font-style:italic;opacity:0.5;">[REDACTED]</span>`
            : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">source</a>${p.demo ? ` <a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;margin-left:0.75rem;">demo</a>` : ''}`
          }</div>
        </div>
      `).join('')}

      <div class="${uid}-crack"></div>

      <!-- Tech as faded stamps -->
      <div class="${uid}-panel ${uid}-faded">
        <p class="${uid}-accent" style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;opacity:0.5;">[ tool marks ]</p>
        <div style="display:flex;flex-wrap:wrap;gap:0.25rem;">
          ${d.tech.map((t, i) => `<span class="${uid}-stamp" style="transform:rotate(${-3 + Math.random() * 6}deg);opacity:${0.5 + Math.random() * 0.4};">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Footer -->
      <footer style="text-align:center;padding:2rem 0 1rem;">
        <p class="${uid}-text" style="font-size:0.8rem;margin:0 0 1rem;font-style:italic;opacity:0.6;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
        <p class="${uid}-scratch" style="margin:1.5rem 0 0;">PAGE ${Math.floor(Math.random() * 90) + 10} OF [ILLEGIBLE]</p>
      </footer>
    </div>
  </div>`;
}
