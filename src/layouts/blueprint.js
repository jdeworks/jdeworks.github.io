// Blueprint — technical drawing style, grid background, palette-aware
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Blueprint";

export function render(d, cs, ts, hs) {
  const uid = 'bp' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; overflow: hidden;
      background: var(--bg) !important; color: var(--fg) !important;
      font-family: 'Courier New', monospace !important;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-grid {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        linear-gradient(color-mix(in srgb, var(--accent) 8%, transparent) 1px, transparent 1px),
        linear-gradient(90deg, color-mix(in srgb, var(--accent) 8%, transparent) 1px, transparent 1px),
        linear-gradient(color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px),
        linear-gradient(90deg, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px);
      background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
    }
    .${uid}-content { position: relative; z-index: 1; }
    .${uid}-box {
      border: 2px solid color-mix(in srgb, var(--accent) 50%, transparent);
      padding: 1.5rem; margin-bottom: 1.5rem; position: relative;
    }
    .${uid}-box::before {
      content: attr(data-label); position: absolute; top: -0.6rem; left: 1rem;
      background: var(--bg); padding: 0 0.5rem; font-size: 0.7rem;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent);
      font-weight: 700;
    }
    .${uid}-dim {
      position: relative; padding-left: 2rem;
    }
    .${uid}-dim::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      border-left: 1px dashed color-mix(in srgb, var(--accent) 35%, transparent);
    }
    .${uid}-dim::after {
      content: attr(data-dim); position: absolute; left: -0.5rem; top: 50%;
      transform: rotate(-90deg) translateX(-50%); transform-origin: left center;
      font-size: 0.6rem; color: var(--accent); opacity: 0.6; white-space: nowrap;
    }
    .${uid}-tag {
      font-size: 0.7rem; padding: 0.25rem 0.5rem; display: inline-block; margin: 0.1rem;
      border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
      color: var(--accent); font-weight: 700;
    }
    .${uid}-link { color: var(--accent) !important; text-decoration: none; font-weight: 700; }
    .${uid}-link:hover { text-decoration: underline; }
    .${uid}-circle {
      width: 10px; height: 10px; border: 2px solid var(--accent);
      border-radius: 50%; display: inline-block; margin-right: 0.5rem;
      vertical-align: middle;
    }
    .${uid}-accent { color: var(--accent); }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-grid"></div>
    <div class="${uid}-content" style="max-width:860px;margin:0 auto;padding:3rem 1.5rem;">

      <!-- Title block -->
      <div style="display:flex;justify-content:flex-end;margin-bottom:2rem;">
        <div style="border:2px solid color-mix(in srgb, var(--accent) 60%, transparent);padding:1rem 1.5rem;text-align:right;">
          <p style="font-size:0.65rem;margin:0;color:var(--accent);text-transform:uppercase;letter-spacing:0.15em;font-weight:700;">Project</p>
          <h1 style="font-size:clamp(1.5rem,4vw,2.5rem);margin:0.25rem 0;font-weight:700;color:var(--fg);">${d.name}</h1>
          <p style="font-size:0.85rem;margin:0;color:var(--fg2);">${d.role}</p>
          <p style="font-size:0.65rem;margin:0.5rem 0 0;color:var(--accent);opacity:0.7;">SCALE: 1:1 | REV: ${d.timeline.length}</p>
        </div>
      </div>

      <!-- Spec block -->
      <div class="${uid}-box" data-label="specifications">
        <div class="${uid}-dim" data-dim="bio">
          <p style="font-size:0.9rem;margin:0;line-height:1.7;color:var(--fg);">${d.bio}</p>
        </div>
        <div style="margin-top:1.25rem;border-top:1px dashed color-mix(in srgb, var(--accent) 25%, transparent);padding-top:1rem;">
          <div class="${uid}-dim" data-dim="philosophy">
            <p style="font-size:0.85rem;margin:0;line-height:1.7;font-style:italic;color:var(--fg2);">${d.take}</p>
          </div>
        </div>
      </div>

      <!-- Materials (tech) -->
      <div class="${uid}-box" data-label="materials">
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
          ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Assembly drawings (projects) -->
      <div class="${uid}-box" data-label="assembly drawings">
        ${d.projects.map((p, i) => `
          <div style="padding:1rem 0;${i < d.projects.length - 1 ? 'border-bottom:1px dashed color-mix(in srgb, var(--accent) 18%, transparent);' : ''}">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
              <h3 style="font-size:1rem;margin:0;font-weight:700;color:var(--fg);"><span class="${uid}-circle"></span>${p.name}</h3>
              <span class="${uid}-accent" style="font-size:0.65rem;opacity:0.6;">DWG-${String(i + 1).padStart(3, '0')}</span>
            </div>
            <p style="font-size:0.85rem;margin:0.4rem 0 0.6rem 1.75rem;line-height:1.6;color:var(--fg2);">${p.desc}</p>
            <div style="margin-left:1.75rem;">
              ${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
              <div style="margin-top:0.5rem;">${projectLinks(p)}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Revision history (timeline) -->
      <div class="${uid}-box" data-label="revision history">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <tr style="border-bottom:2px solid color-mix(in srgb, var(--accent) 30%, transparent);">
            <th style="text-align:left;padding:0.4rem 0;font-size:0.7rem;color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Rev</th>
            <th style="text-align:left;padding:0.4rem 0;font-size:0.7rem;color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Phase</th>
            <th style="text-align:left;padding:0.4rem 0;font-size:0.7rem;color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Description</th>
          </tr>
          ${d.timeline.map((t, i) => `
            <tr style="${i < d.timeline.length - 1 ? 'border-bottom:1px dashed color-mix(in srgb, var(--accent) 15%, transparent);' : ''}">
              <td style="padding:0.5rem 0.5rem 0.5rem 0;color:var(--accent);opacity:0.7;">${String(i + 1).padStart(2, '0')}</td>
              <td style="padding:0.5rem 0;color:var(--accent);font-weight:700;">${t.period}</td>
              <td style="padding:0.5rem 0;color:var(--fg2);">${t.label}</td>
            </tr>
          `).join('')}
        </table>
      </div>

      <!-- Notes -->
      <div class="${uid}-box" data-label="notes">
        <p style="font-size:0.85rem;margin:0;color:var(--fg2);font-style:italic;">${d.interests}</p>
        <p style="font-size:0.8rem;margin:0.75rem 0 0;color:var(--fg2);opacity:0.8;">${d.about}</p>
      </div>

      <footer style="text-align:right;padding-top:1rem;">
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(14)} <span style="margin-left:0.25rem;">${d.handle}</span>
        </a>
      </footer>
    </div>
  </div>`;
}
