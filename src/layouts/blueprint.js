// Blueprint — technical drawing style, grid background, white on blue, annotations
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Blueprint";

export function render(d, cs, ts, hs) {
  const uid = 'bp' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; overflow: hidden;
      background: #0a3161 !important; color: #d4e6f6 !important;
      font-family: 'Courier New', monospace !important;
    }
    .${uid}-root * { font-family: inherit; color: inherit; }
    .${uid}-grid {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
    }
    .${uid}-content { position: relative; z-index: 1; }
    .${uid}-box {
      border: 1px solid rgba(255,255,255,0.3); padding: 1.5rem; margin-bottom: 1.5rem;
      position: relative;
    }
    .${uid}-box::before {
      content: attr(data-label); position: absolute; top: -0.5rem; left: 1rem;
      background: #0a3161; padding: 0 0.5rem; font-size: 0.65rem;
      letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5);
    }
    .${uid}-dim {
      position: relative; padding-left: 2rem;
    }
    .${uid}-dim::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 0; border-left: 1px dashed rgba(255,255,255,0.2);
    }
    .${uid}-dim::after {
      content: attr(data-dim); position: absolute; left: -0.5rem; top: 50%;
      transform: rotate(-90deg) translateX(-50%); transform-origin: left center;
      font-size: 0.55rem; color: rgba(255,255,255,0.35); white-space: nowrap;
    }
    .${uid}-tag {
      font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-block; margin: 0.1rem;
      border: 1px solid rgba(255,255,255,0.25); color: #d4e6f6;
    }
    .${uid}-link { color: #8ec8f0 !important; text-decoration: none; }
    .${uid}-link:hover { color: #fff !important; }
    .${uid}-circle {
      width: 8px; height: 8px; border: 1px solid rgba(255,255,255,0.4);
      border-radius: 50%; display: inline-block; margin-right: 0.5rem;
    }
    .${uid}-crosshair::before, .${uid}-crosshair::after {
      content: ''; position: absolute; background: rgba(255,255,255,0.15);
    }
    .${uid}-crosshair::before { width: 1px; height: 20px; top: -10px; left: 50%; }
    .${uid}-crosshair::after { width: 20px; height: 1px; top: 50%; left: calc(50% - 10px); }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-grid"></div>
    <div class="${uid}-content" style="max-width:860px;margin:0 auto;padding:3rem 1.5rem;">

      <!-- Title block (bottom-right style) -->
      <div style="display:flex;justify-content:flex-end;margin-bottom:2rem;">
        <div style="border:1px solid rgba(255,255,255,0.4);padding:1rem 1.5rem;text-align:right;">
          <p style="font-size:0.6rem;margin:0;opacity:0.5;text-transform:uppercase;letter-spacing:0.15em;">Project</p>
          <h1 style="font-size:clamp(1.5rem,4vw,2.5rem);margin:0.25rem 0;font-weight:400;color:#fff;">${d.name}</h1>
          <p style="font-size:0.8rem;margin:0;opacity:0.7;">${d.role}</p>
          <p style="font-size:0.6rem;margin:0.5rem 0 0;opacity:0.4;">SCALE: 1:1 | REV: ${d.timeline.length}</p>
        </div>
      </div>

      <!-- Spec block -->
      <div class="${uid}-box" data-label="specifications">
        <div class="${uid}-dim" data-dim="bio">
          <p style="font-size:0.85rem;margin:0;line-height:1.7;opacity:0.85;">${d.bio}</p>
        </div>
        <div style="margin-top:1.25rem;border-top:1px dashed rgba(255,255,255,0.15);padding-top:1rem;">
          <div class="${uid}-dim" data-dim="philosophy">
            <p style="font-size:0.8rem;margin:0;line-height:1.7;font-style:italic;opacity:0.75;">${d.take}</p>
          </div>
        </div>
      </div>

      <!-- Materials (tech) -->
      <div class="${uid}-box" data-label="materials">
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
          ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Assembly drawings (projects) -->
      <div class="${uid}-box" data-label="assembly drawings">
        ${d.projects.map((p, i) => `
          <div style="padding:1rem 0;${i < d.projects.length - 1 ? 'border-bottom:1px dashed rgba(255,255,255,0.12);' : ''}">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
              <h3 style="font-size:0.95rem;margin:0;font-weight:400;"><span class="${uid}-circle"></span>${p.name}</h3>
              <span style="font-size:0.6rem;opacity:0.4;">DWG-${String(i + 1).padStart(3, '0')}</span>
            </div>
            <p style="font-size:0.8rem;margin:0.4rem 0 0.6rem 1.5rem;line-height:1.6;opacity:0.75;">${p.desc}</p>
            <div style="margin-left:1.5rem;">
              ${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
              <div style="margin-top:0.5rem;">${projectLinks(p)}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Revision history (timeline) -->
      <div class="${uid}-box" data-label="revision history">
        <table style="width:100%;border-collapse:collapse;font-size:0.8rem;">
          <tr style="border-bottom:1px solid rgba(255,255,255,0.15);">
            <th style="text-align:left;padding:0.4rem 0;font-size:0.65rem;opacity:0.5;font-weight:400;text-transform:uppercase;letter-spacing:0.1em;">Rev</th>
            <th style="text-align:left;padding:0.4rem 0;font-size:0.65rem;opacity:0.5;font-weight:400;text-transform:uppercase;letter-spacing:0.1em;">Phase</th>
            <th style="text-align:left;padding:0.4rem 0;font-size:0.65rem;opacity:0.5;font-weight:400;text-transform:uppercase;letter-spacing:0.1em;">Description</th>
          </tr>
          ${d.timeline.map((t, i) => `
            <tr style="${i < d.timeline.length - 1 ? 'border-bottom:1px dashed rgba(255,255,255,0.08);' : ''}">
              <td style="padding:0.5rem 0.5rem 0.5rem 0;opacity:0.5;">${String(i + 1).padStart(2, '0')}</td>
              <td style="padding:0.5rem 0;color:#8ec8f0;">${t.period}</td>
              <td style="padding:0.5rem 0;opacity:0.75;">${t.label}</td>
            </tr>
          `).join('')}
        </table>
      </div>

      <!-- Notes -->
      <div class="${uid}-box" data-label="notes">
        <p style="font-size:0.8rem;margin:0;opacity:0.65;font-style:italic;">${d.interests}</p>
        <p style="font-size:0.75rem;margin:0.5rem 0 0;opacity:0.45;">${d.about}</p>
      </div>

      <footer style="text-align:right;padding-top:1rem;">
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.8rem;">
          ${githubIcon(14)} <span style="margin-left:0.25rem;">${d.handle}</span>
        </a>
      </footer>
    </div>
  </div>`;
}
