import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Magazine";

export function render(d, cs, ts, hs) {
  const uid = 'mg' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-quote-row { display: flex; gap: 2.5rem; flex-wrap: wrap; }
    .${uid}-quote-row > * { flex: 1; min-width: 0; }
    .${uid}-project { display: flex; gap: 2rem; align-items: flex-start; }
    .${uid}-project > div:first-child { width: 280px; flex-shrink: 0; }
    @media (max-width: 640px) {
      .${uid}-quote-row { flex-direction: column; gap: 1.5rem; }
      .${uid}-project { flex-direction: column !important; gap: 0.75rem; }
      .${uid}-project > div:first-child { width: 100% !important; }
    }
  </style>
  <div style="min-height:100vh;">
    <header style="padding:clamp(3rem,10vw,6rem) clamp(1rem,5vw,4rem);max-width:1100px;margin:0 auto;">
      <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 1rem;font-family:var(--font-head);">${d.role}</p>
      <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,8vw,6rem);margin:0;color:var(--fg);font-weight:700;line-height:1.05;letter-spacing:-0.02em;')}">${d.name}</h1>
      <div style="width:60px;height:4px;background:var(--accent);margin:2rem 0;border-radius:2px;"></div>
      <p style="color:var(--fg2);font-size:clamp(1rem,2vw,1.25rem);line-height:1.7;max-width:600px;">${d.bio}</p>
    </header>
    <section style="padding:0 clamp(1rem,5vw,4rem) 4rem;max-width:1100px;margin:0 auto;">
      <div class="${uid}-quote-row" style="margin-bottom:3rem;">
        <blockquote style="margin:0;padding:1.25rem 0 1.25rem 1.5rem;border-left:4px solid var(--accent);font-size:1.05rem;color:var(--fg);line-height:1.65;font-style:italic;">${d.take}</blockquote>
        <p style="color:var(--fg2);font-size:0.95rem;line-height:1.7;margin:0;">${d.about}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:3rem;">
        ${d.tech.map(t => tagHTML(t, ts)).join("")}
      </div>
      <h2 style="${headingStyle(hs, 'font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 2rem;')}">Selected Work</h2>
      ${d.projects.map((p, i) => `
        <div class="${uid}-project" style="padding:2rem 0;${i < d.projects.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
          <div>
            <h3 style="font-family:var(--font-head);font-size:1.35rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
            <div>${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
          </div>
          <div style="flex:1;min-width:0;">
            <p style="color:var(--fg2);font-size:0.95rem;line-height:1.7;margin:0 0 1rem;">${p.desc}</p>
            <div>${projectLinks(p)}</div>
          </div>
        </div>
      `).join("")}
    </section>
    <footer style="padding:2rem clamp(1rem,5vw,4rem);border-top:1px solid var(--border);max-width:1100px;margin:0 auto;">
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
    </footer>
  </div>`;
}
