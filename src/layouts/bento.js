import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Bento Grid";

export function render(d, cs, ts, hs) {
  return `
  <div style="max-width:960px;margin:0 auto;padding:2rem 1.5rem;min-height:100vh;">
    <style>
      .bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
      .bento > .span2 { grid-column: span 2; }
      @media(max-width:768px) { .bento { grid-template-columns: 1fr !important; } .bento > .span2 { grid-column: span 1 !important; } }
    </style>
    <div class="bento">
      <div class="span2" style="background:var(--card);border-radius:16px;padding:2rem;${cardCSS(cs)};display:flex;flex-direction:column;justify-content:center;">
        <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.5rem;font-family:var(--font-head);">${d.handle}</p>
        <h1 style="${headingStyle(hs, 'font-size:2.5rem;margin:0;color:var(--fg);font-weight:700;')}">${d.name}</h1>
        <p style="color:var(--fg2);font-size:1rem;margin:0.5rem 0 0;">${d.role}</p>
      </div>
      <div style="background:var(--card);border-radius:16px;padding:2rem;${cardCSS(cs)};display:flex;flex-direction:column;justify-content:center;align-items:center;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg);text-decoration:none;font-size:2rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg)'">${githubIcon(40)}</a>
        <p style="color:var(--fg2);font-size:0.8rem;margin:0.75rem 0 0;">${d.handle}</p>
      </div>
      <div style="background:var(--card);border-radius:16px;padding:2rem;${cardCSS(cs)};">
        <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--fg2);margin:0 0 1rem;')}">About</h2>
        <p style="color:var(--fg2);font-size:0.875rem;line-height:1.65;margin:0;">${d.about}</p>
      </div>
      <div class="span2" style="background:var(--card);border-radius:16px;padding:2rem;${cardCSS(cs)};">
        <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--fg2);margin:0 0 0.75rem;')}">Perspective</h2>
        <p style="color:var(--fg2);font-size:0.875rem;line-height:1.65;margin:0;font-style:italic;">${d.take}</p>
      </div>
      <div class="span2" style="background:var(--card);border-radius:16px;padding:2rem;${cardCSS(cs)};">
        <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--fg2);margin:0 0 1rem;')}">Tech</h2>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">${d.tech.map(t => tagHTML(t, ts)).join("")}</div>
      </div>
      ${d.projects.map(p => `
        <div style="background:var(--card);border-radius:16px;padding:1.75rem;${cardCSS(cs)}">
          <h3 style="font-family:var(--font-head);font-size:1rem;margin:0 0 0.5rem;color:var(--fg);">${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.8rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
          <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
          <div>${projectLinks(p)}</div>
        </div>
      `).join("")}
    </div>
  </div>`;
}
