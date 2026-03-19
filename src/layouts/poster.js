// Poster — gig poster / concert flyer aesthetic. Bold type, layered, distressed
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Poster";

export function render(d, cs, ts, hs) {
  const uid = 'ps' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative;
      font-family: var(--font-body);
      background: var(--bg);
    }
    .${uid}-poster {
      max-width: 640px; margin: 1.5rem auto; position: relative;
      background: var(--card);
      border: 3px solid var(--fg);
      padding: 0; overflow: hidden;
      box-shadow: 8px 8px 0 color-mix(in srgb, var(--fg) 20%, transparent);
    }
    .${uid}-header {
      background: var(--accent); color: var(--bg); padding: 2.5rem 2rem;
      text-align: center; position: relative; overflow: hidden;
    }
    .${uid}-header::before {
      content: '★ ${d.role.toUpperCase()} ★ ${d.role.toUpperCase()} ★ ${d.role.toUpperCase()} ★ ${d.role.toUpperCase()} ★';
      position: absolute; top: 0; left: 0; right: 0;
      font-size: 0.55rem; letter-spacing: 0.2em; padding: 0.3rem 0;
      background: var(--bg); color: var(--accent);
      white-space: nowrap; overflow: hidden;
    }
    .${uid}-header::after {
      content: '★ ${d.role.toUpperCase()} ★ ${d.role.toUpperCase()} ★ ${d.role.toUpperCase()} ★ ${d.role.toUpperCase()} ★';
      position: absolute; bottom: 0; left: 0; right: 0;
      font-size: 0.55rem; letter-spacing: 0.2em; padding: 0.3rem 0;
      background: var(--bg); color: var(--accent);
      white-space: nowrap; overflow: hidden;
    }
    .${uid}-body { padding: 2rem; }
    .${uid}-band {
      background: var(--fg); color: var(--bg); padding: 0.4rem 1rem;
      font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; text-align: center;
    }
    .${uid}-lineup {
      border: 2px solid var(--fg); padding: 1.25rem; margin-bottom: 1.25rem;
      text-align: center; position: relative;
    }
    .${uid}-lineup::before {
      content: attr(data-num); position: absolute; top: -0.6rem; right: 1rem;
      background: var(--card); padding: 0 0.5rem;
      font-size: 0.65rem; font-weight: 700; color: var(--accent);
      font-family: var(--font-head);
    }
    .${uid}-divider {
      display: flex; align-items: center; gap: 0.5rem; margin: 1.5rem 0;
    }
    .${uid}-divider::before, .${uid}-divider::after {
      content: ''; flex: 1; height: 2px; background: var(--fg);
    }
    .${uid}-divider span {
      font-size: 1rem; color: var(--fg);
    }
    .${uid}-tag {
      display: inline-block; font-size: 0.65rem; padding: 0.2rem 0.5rem;
      border: 1px solid var(--fg); margin: 0.15rem;
      text-transform: uppercase; letter-spacing: 0.08em;
      font-weight: 700; color: var(--fg);
    }
    .${uid}-link { color: var(--accent); text-decoration: none; font-weight: 700; font-size: 0.8rem; }
    .${uid}-link:hover { text-decoration: underline; }
    .${uid}-fine {
      font-size: 0.6rem; color: var(--fg2); text-align: center;
      line-height: 1.8; letter-spacing: 0.03em;
    }
    .${uid}-star { color: var(--accent); }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-poster">
      <!-- Top banner -->
      <div class="${uid}-header">
        <p style="font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 1rem;opacity:0.8;">Presenting</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(3rem,10vw,5rem);margin:0;font-weight:900;line-height:0.9;letter-spacing:-0.03em;text-transform:uppercase;')}">${d.name}</h1>
        <p style="font-size:1rem;margin:1rem 0 0;opacity:0.9;font-style:italic;">"${d.role}"</p>
      </div>

      <div class="${uid}-body">
        <!-- Bio as event description -->
        <div class="${uid}-band">Tonight's Feature</div>
        <div style="padding:1.25rem 0;">
          <p style="color:var(--fg);font-size:0.9rem;line-height:1.7;margin:0;text-align:center;">${d.bio}</p>
        </div>

        <div class="${uid}-divider"><span class="${uid}-star">★</span></div>

        <!-- Philosophy -->
        <p style="color:var(--fg);font-size:1rem;line-height:1.6;margin:0;text-align:center;font-style:italic;font-family:var(--font-head);">"${d.take}"</p>

        <div class="${uid}-divider"><span class="${uid}-star">★ ★ ★</span></div>

        <!-- Lineup (projects) -->
        <div class="${uid}-band">Full Lineup</div>
        <div style="padding-top:1.25rem;">
          ${d.projects.map((p, i) => `
            <div class="${uid}-lineup" data-num="${String(i + 1).padStart(2, '0')}">
              <h3 style="font-family:var(--font-head);font-size:clamp(1.2rem,4vw,1.8rem);margin:0;color:var(--fg);font-weight:900;text-transform:uppercase;">${p.name}</h3>
              <p style="color:var(--fg2);font-size:0.8rem;line-height:1.5;margin:0.5rem 0;">${p.desc}</p>
              <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
              <div>${projectLinks(p)}</div>
            </div>
          `).join('')}
        </div>

        <div class="${uid}-divider"><span class="${uid}-star">★</span></div>

        <!-- Tech -->
        <div class="${uid}-band">Instruments</div>
        <div style="padding:1rem 0;text-align:center;">
          ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
        </div>

        <div class="${uid}-divider"><span class="${uid}-star">★ ★</span></div>

        <!-- Timeline -->
        <div class="${uid}-band">Tour Dates</div>
        <div style="padding:1rem 0;">
          ${d.timeline.map(t => `
            <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px dashed color-mix(in srgb, var(--fg) 20%, transparent);">
              <span style="font-weight:700;color:var(--accent);font-size:0.85rem;font-family:var(--font-head);">${t.period}</span>
              <span style="color:var(--fg2);font-size:0.8rem;">${t.label}</span>
            </div>
          `).join('')}
        </div>

        <div class="${uid}-divider"><span class="${uid}-star">★ ★ ★</span></div>

        <!-- Fine print -->
        <p class="${uid}-fine">${d.interests}</p>
        <p class="${uid}-fine" style="margin-top:1rem;">
          <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link">${githubIcon(14)} ${d.handle}</a>
          ${d.links.map(l => ` · <a href="${l.url}" target="_blank" rel="noopener" class="${uid}-link">${l.label}</a>`).join('')}
        </p>
        <p class="${uid}-fine" style="margin-top:0.75rem;opacity:0.4;">ALL RIGHTS RESERVED · NO REFUNDS · DOORS OPEN AT LOCALHOST:3000</p>
      </div>
    </div>
  </div>`;
}
