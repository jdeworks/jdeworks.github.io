import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Centered Hero";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;max-width:800px;margin:0 auto;">
    <p style="color:var(--accent);font-size:0.875rem;letter-spacing:0.1em;margin:0 0 0.75rem;font-family:var(--font-head);">${d.handle}</p>
    <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,6vw,4rem);margin:0;color:var(--fg);font-weight:700;')}">${d.name}</h1>
    <p style="color:var(--fg2);font-size:1.15rem;margin:0.75rem 0 0;font-weight:500;">${d.role}</p>
    <p style="color:var(--fg2);font-size:1rem;margin:1.5rem 0 1rem;line-height:1.7;max-width:560px;">${d.bio}</p>
    <p style="color:var(--fg2);font-size:0.9rem;margin:0 0 2.5rem;line-height:1.7;max-width:560px;opacity:0.85;">${d.about}</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;margin-bottom:3rem;">
      ${d.tech.map(t => tagHTML(t, ts)).join("")}
    </div>
    <div style="width:100%;text-align:left;">
      <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:0 0 1.5rem;color:var(--fg);text-align:center;')}">Projects</h2>
      <div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));">
        ${d.projects.map(p => `
          <div style="background:var(--card);border-radius:12px;padding:1.5rem;${cardCSS(cs)}">
            <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;color:var(--fg);">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.875rem;line-height:1.6;margin:0 0 1rem;">${p.desc}</p>
            <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
            <div>${projectLinks(p)}</div>
          </div>
        `).join("")}
      </div>
    </div>
    <footer style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);width:100%;text-align:center;">
      <p style="color:var(--fg2);font-size:0.85rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
        ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${l.label}</a>`).join("")}
      </div>
    </footer>
  </div>`;
}
