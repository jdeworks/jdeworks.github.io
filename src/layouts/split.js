import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Split";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;display:flex;flex-direction:row;" class="split-wrap">
    <style>
      .split-wrap { flex-direction: row; }
      @media(max-width:768px) { .split-wrap { flex-direction: column !important; } .split-wrap > section { width: 100% !important; min-height: auto !important; padding: 2.5rem 1.5rem !important; } }
    </style>
    <section style="width:45%;min-height:100vh;display:flex;flex-direction:column;padding:4rem 3rem;background:var(--bg2);">
      <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,5vw,3.5rem);margin:0;color:var(--fg);font-weight:700;')}">${d.name}</h1>
      <p style="color:var(--accent);font-size:1.1rem;margin:0.5rem 0 1.5rem;font-family:var(--font-head);">${d.role}</p>
      <p style="color:var(--fg2);font-size:1rem;line-height:1.7;margin:0 0 1rem;">${d.bio}</p>
      <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0 0 1.25rem;opacity:0.85;">${d.about}</p>
      <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 2rem;font-style:italic;">${d.interests}</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:2rem;">
        ${d.tech.map(t => tagHTML(t, ts)).join("")}
      </div>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.9rem;display:inline-flex;align-items:center;gap:0.5rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} ${d.handle}</a>
    </section>
    <section style="width:55%;padding:4rem 3rem;display:flex;flex-direction:column;justify-content:center;">
      <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:0 0 1.75rem;color:var(--fg);')}">Projects</h2>
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        ${d.projects.map(p => `
          <div style="background:var(--card);border-radius:12px;padding:1.5rem;${cardCSS(cs)}">
            <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;color:var(--fg);">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.875rem;line-height:1.6;margin:0 0 1rem;">${p.desc}</p>
            <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
            <div>${projectLinks(p)}</div>
          </div>
        `).join("")}
      </div>
    </section>
  </div>`;
}
