// Recipe Card — cooking metaphor, ingredients/instructions/serves
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Recipe";

export function render(d, cs, ts, hs) {
  const uid = 'rc' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root { min-height: 100vh; background: var(--bg); font-family: var(--font-body); }
    .${uid}-card {
      max-width: 700px; margin: 2rem auto; background: var(--card);
      border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .${uid}-header {
      background: var(--accent); color: var(--bg); padding: 2rem;
      text-align: center; position: relative;
    }
    .${uid}-body { padding: 2rem; }
    .${uid}-section { margin-bottom: 2rem; }
    .${uid}-section-title {
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent); margin: 0 0 1rem;
      padding-bottom: 0.5rem; border-bottom: 2px solid var(--border);
      font-family: var(--font-head);
    }
    .${uid}-ingredient {
      display: flex; align-items: baseline; gap: 0.75rem;
      padding: 0.4rem 0; border-bottom: 1px dashed var(--border);
      font-size: 0.9rem; color: var(--fg2);
    }
    .${uid}-ingredient span:first-child {
      font-weight: 600; color: var(--accent); min-width: 20px; text-align: center;
    }
    .${uid}-step {
      display: flex; gap: 1rem; padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }
    .${uid}-step-num {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      background: color-mix(in srgb, var(--accent) 15%, transparent);
      color: var(--accent); font-weight: 700; font-size: 0.8rem;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-head);
    }
    .${uid}-note {
      background: color-mix(in srgb, var(--accent) 8%, transparent);
      border-left: 3px solid var(--accent); padding: 1rem;
      border-radius: 0 8px 8px 0; font-size: 0.85rem;
      color: var(--fg2); font-style: italic; line-height: 1.6;
    }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-card">
      <div class="${uid}-header">
        <p style="font-size:0.75rem;opacity:0.8;margin:0 0 0.5rem;letter-spacing:0.1em;text-transform:uppercase;">Recipe</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(1.75rem,5vw,2.5rem);margin:0;font-weight:700;')}">${d.name}</h1>
        <p style="font-size:0.9rem;margin:0.5rem 0 0;opacity:0.85;">${d.role}</p>
        <div style="display:flex;justify-content:center;gap:2rem;margin-top:1.5rem;font-size:0.8rem;opacity:0.8;">
          <span>Prep: ${d.timeline.length} chapters</span>
          <span>Yields: ${d.projects.length} projects</span>
          <span>Serves: the internet</span>
        </div>
      </div>
      <div class="${uid}-body">

        <div class="${uid}-section">
          <h2 class="${uid}-section-title">Ingredients</h2>
          ${d.tech.map(t => `
            <div class="${uid}-ingredient">
              <span>&#10003;</span>
              <span>${t}</span>
            </div>
          `).join('')}
        </div>

        <div class="${uid}-section">
          <h2 class="${uid}-section-title">Instructions</h2>
          ${d.timeline.map((t, i) => `
            <div class="${uid}-step">
              <div class="${uid}-step-num">${i + 1}</div>
              <div style="flex:1;">
                <p style="font-weight:600;color:var(--fg);margin:0 0 0.15rem;font-size:0.9rem;">${t.period}</p>
                <p style="color:var(--fg2);margin:0;font-size:0.85rem;line-height:1.5;">${t.label}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="${uid}-note">${d.take}</div>

        <div class="${uid}-section" style="margin-top:2rem;">
          <h2 class="${uid}-section-title">What came out of the oven</h2>
          ${d.projects.map(p => `
            <div style="padding:1rem 0;border-bottom:1px solid var(--border);">
              <h3 style="font-family:var(--font-head);font-size:1rem;margin:0 0 0.35rem;color:var(--fg);font-weight:600;">${p.name}</h3>
              <p style="color:var(--fg2);font-size:0.85rem;line-height:1.5;margin:0 0 0.5rem;">${p.desc}</p>
              <div>${projectLinks(p)}</div>
            </div>
          `).join('')}
        </div>

        <div class="${uid}-note" style="margin-top:1.5rem;">
          <strong style="color:var(--accent);">Chef's note:</strong> ${d.interests}
        </div>

        <footer style="text-align:center;padding:1.5rem 0 0.5rem;">
          <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:0.85rem;">${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span></a>
        </footer>
      </div>
    </div>
  </div>`;
}
