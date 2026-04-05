import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Sidebar";

export function render(d, cs, ts, hs) {
  return `
  <div style="display:flex;min-height:100vh;flex-direction:row;" class="layout-sidebar">
    <style>.layout-sidebar { flex-direction: row; } @media(max-width:768px){ .layout-sidebar { flex-direction: column !important; } .layout-sidebar > aside { width: 100% !important; position: relative !important; min-height: auto !important; padding: 1.5rem !important; } .layout-sidebar > main { padding: 1.5rem !important; } }</style>
    <aside style="width:320px;min-height:100vh;background:var(--bg2);padding:3rem 2rem;display:flex;flex-direction:column;position:sticky;top:0;align-self:flex-start;border-right:1px solid var(--border);box-sizing:border-box;overflow-wrap:break-word;word-break:break-word;">
      <div style="width:64px;height:64px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:var(--bg);font-family:var(--font-head);font-weight:700;font-size:1.5rem;margin-bottom:1.5rem;">${d.name[0]}</div>
      <h1 style="${headingStyle(hs, 'font-size:1.75rem;margin:0 0 0.25rem;color:var(--fg);font-weight:700;')}">${d.name}</h1>
      <p style="color:var(--accent);font-size:0.9rem;margin:0 0 1.25rem;font-family:var(--font-head);">${d.role}</p>
      <p style="color:var(--fg2);font-size:0.9rem;line-height:1.65;margin:0 0 1.5rem;">${d.bio}</p>
      <blockquote style="margin:0 0 2rem;padding:0.75rem 0 0.75rem 1rem;border-left:3px solid var(--accent);font-size:0.85rem;color:var(--fg2);line-height:1.6;font-style:italic;">${d.take}</blockquote>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:2rem;">
        ${d.tech.map(t => tagHTML(t, ts)).join("")}
      </div>
      <div style="margin-top:auto;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} ${d.handle}</a>
      </div>
    </aside>
    <main style="flex:1;padding:3rem;display:flex;flex-direction:column;align-items:center;">
      <div style="width:100%;max-width:700px;">
        <h2 style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 2rem;color:var(--fg);')}">Projects</h2>
        <div style="display:flex;flex-direction:column;gap:1.5rem;">
          ${d.projects.map(p => `
            <div style="background:var(--card);border-radius:12px;padding:1.75rem;${cardCSS(cs)}">
              <h3 style="font-family:var(--font-head);font-size:1.1rem;margin:0 0 0.5rem;color:var(--fg);">${p.name}</h3>
              <p style="color:var(--fg2);font-size:0.875rem;line-height:1.65;margin:0 0 1rem;">${p.desc}</p>
              <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
              <div>${projectLinks(p)}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </main>
  </div>`;
}
