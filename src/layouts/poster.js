// Poster — weathered gig poster, torn edges, faded ink, peeling off a wall
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Poster";

export function render(d, cs, ts, hs) {
  const uid = 'ps' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative;
      font-family: var(--font-body);
      background: color-mix(in srgb, var(--bg) 85%, #6b5a40);
    }
    /* Wall texture behind poster */
    .${uid}-root::before {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity: 0.08;
    }
    .${uid}-poster {
      max-width: 640px; margin: 1.5rem auto; position: relative;
      background: var(--card);
      border: 3px solid color-mix(in srgb, var(--fg) 70%, #8b7355);
      padding: 0; overflow: hidden;
      box-shadow: 8px 8px 0 rgba(0,0,0,0.2), 0 0 40px rgba(0,0,0,0.15);
      /* Torn top-right corner missing */
      clip-path: polygon(
        0% 0%, 88% 0%, 90% 1.5%, 91% 0.5%, 93% 2%, 94% 0%, 96% 1%, 100% 3%,
        100% 100%, 0% 100%
      );
    }
    .${uid}-poster::before {
      content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 10;
      background:
        linear-gradient(180deg, transparent 0%, transparent 70%, color-mix(in srgb, var(--card) 50%, transparent) 85%, var(--card) 100%),
        radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 30%, rgba(0,0,0,0.04) 0%, transparent 40%);
    }
    /* Tape holding poster to wall */
    .${uid}-tape {
      position: absolute; z-index: 11; width: 55px; height: 20px;
      background: rgba(210,195,140,0.35);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border-radius: 1px;
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
    .${uid}-body { padding: 2rem; position: relative; }
    /* Fade gradient over bottom half of body content */
    .${uid}-fade-zone { position: relative; }
    .${uid}-fade-zone::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 60%;
      background: linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--card) 30%, transparent) 40%, color-mix(in srgb, var(--card) 70%, transparent) 70%, var(--card) 100%);
      pointer-events: none; z-index: 5;
    }
    .${uid}-band {
      background: color-mix(in srgb, var(--fg) 90%, #6b5332); color: var(--bg); padding: 0.4rem 1rem;
      font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; text-align: center;
    }
    .${uid}-lineup {
      border: 2px solid color-mix(in srgb, var(--fg) 60%, #8b7355);
      padding: 1.25rem; margin-bottom: 1.25rem;
      text-align: center; position: relative;
    }
    .${uid}-lineup::before {
      content: attr(data-num); position: absolute; top: -0.6rem; right: 1rem;
      background: var(--card); padding: 0 0.5rem;
      font-size: 0.65rem; font-weight: 700;
      color: color-mix(in srgb, var(--accent) 70%, #8b7355);
      font-family: var(--font-head);
    }
    .${uid}-divider {
      display: flex; align-items: center; gap: 0.5rem; margin: 1.5rem 0;
    }
    .${uid}-divider::before, .${uid}-divider::after {
      content: ''; flex: 1; height: 2px;
      background: color-mix(in srgb, var(--fg) 50%, #8b7355);
    }
    .${uid}-divider span { font-size: 1rem; color: color-mix(in srgb, var(--fg) 60%, #8b7355); }
    .${uid}-tag {
      display: inline-block; font-size: 0.65rem; padding: 0.2rem 0.5rem;
      border: 1px solid color-mix(in srgb, var(--fg) 40%, #8b7355);
      margin: 0.15rem; text-transform: uppercase; letter-spacing: 0.08em;
      font-weight: 700; color: color-mix(in srgb, var(--fg) 60%, #8b7355);
    }
    .${uid}-link {
      color: color-mix(in srgb, var(--accent) 65%, #8b7355);
      text-decoration: none; font-weight: 700; font-size: 0.8rem;
    }
    .${uid}-link:hover { text-decoration: underline; }
    .${uid}-fine {
      font-size: 0.6rem; color: color-mix(in srgb, var(--fg2) 55%, #8b7355);
      text-align: center; line-height: 1.8; letter-spacing: 0.03em;
    }
    .${uid}-star { color: color-mix(in srgb, var(--accent) 60%, #8b7355); }
    .${uid}-faded { opacity: 0.55; }
    .${uid}-crease {
      position: absolute; width: 100%; height: 2px; left: 0;
      background: linear-gradient(90deg, transparent 10%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.06) 70%, transparent 90%);
      z-index: 8;
    }
  </style>

  <div class="${uid}-root">
    <div style="position:relative;max-width:700px;margin:0 auto;padding:1.5rem;">
      <!-- Tape strips -->
      <div class="${uid}-tape" style="top:0;left:15%;transform:rotate(-12deg);"></div>
      <div class="${uid}-tape" style="top:0;right:10%;transform:rotate(8deg);"></div>

      <div class="${uid}-poster">
        <!-- Fold creases -->
        <div class="${uid}-crease" style="top:33%;"></div>
        <div class="${uid}-crease" style="top:66%;"></div>

        <!-- Top banner -->
        <div class="${uid}-header">
          <p style="font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 1rem;opacity:0.8;">Presenting</p>
          <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,10vw,5rem);margin:0;font-weight:900;line-height:0.9;letter-spacing:-0.03em;text-transform:uppercase;')}">${d.name}</h1>
          <p style="font-size:1rem;margin:1rem 0 0;opacity:0.9;font-style:italic;">"${d.role}"</p>
        </div>

        <div class="${uid}-body">
          <div class="${uid}-band">Tonight's Feature</div>
          <div style="padding:1.25rem 0;">
            <p style="color:color-mix(in srgb, var(--fg) 75%, #8b7355);font-size:0.9rem;line-height:1.7;margin:0;text-align:center;">${d.bio}</p>
          </div>

          <div class="${uid}-divider"><span class="${uid}-star">★</span></div>

          <p style="color:color-mix(in srgb, var(--fg) 70%, #8b7355);font-size:1rem;line-height:1.6;margin:0;text-align:center;font-style:italic;font-family:var(--font-head);">"${d.take}"</p>

          <div class="${uid}-divider"><span class="${uid}-star">★ ★ ★</span></div>

          <div class="${uid}-band">Full Lineup</div>
          <div style="padding-top:1.25rem;">
            ${d.projects.map((p, i) => `
              <div class="${uid}-lineup" data-num="${String(i + 1).padStart(2, '0')}" style="opacity:${1 - i * 0.08};">
                <h3 style="font-family:var(--font-head);font-size:clamp(1.1rem,4vw,1.6rem);margin:0;color:color-mix(in srgb, var(--fg) 70%, #8b7355);font-weight:900;text-transform:uppercase;">${p.name}</h3>
                <p style="color:color-mix(in srgb, var(--fg2) 60%, #8b7355);font-size:0.8rem;line-height:1.5;margin:0.5rem 0;">${p.desc}</p>
                <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
                <div>${projectLinks(p)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom section fades out like torn/worn bottom -->
          <div class="${uid}-fade-zone">
            <div class="${uid}-divider"><span class="${uid}-star">★</span></div>

            <div class="${uid}-band ${uid}-faded">Instruments</div>
            <div style="padding:1rem 0;text-align:center;" class="${uid}-faded">
              ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
            </div>

            <div class="${uid}-divider ${uid}-faded"><span class="${uid}-star">★ ★</span></div>

            <div class="${uid}-band ${uid}-faded">Tour Dates</div>
            <div style="padding:1rem 0;" class="${uid}-faded">
              ${d.timeline.map(t => `
                <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px dashed color-mix(in srgb, var(--fg) 15%, #8b7355);">
                  <span style="font-weight:700;color:color-mix(in srgb, var(--accent) 55%, #8b7355);font-size:0.85rem;font-family:var(--font-head);">${t.period}</span>
                  <span style="color:color-mix(in srgb, var(--fg2) 50%, #8b7355);font-size:0.8rem;">${t.label}</span>
                </div>
              `).join('')}
            </div>

            <p class="${uid}-fine ${uid}-faded" style="margin-top:1rem;">${d.interests}</p>
            <p class="${uid}-fine ${uid}-faded" style="margin-top:1rem;">
              <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link">${githubIcon(14)} ${d.handle}</a>
              ${d.links.map(l => ` · <a href="${l.url}" target="_blank" rel="noopener" class="${uid}-link">${l.label}</a>`).join('')}
            </p>
            <p class="${uid}-fine ${uid}-faded" style="margin-top:0.75rem;opacity:0.3;">ALL RIGHTS RESERVED · NO REFUNDS · DOORS OPEN AT LOCALHOST:3000</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
