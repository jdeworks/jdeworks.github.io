// Inspired by make-it-look-good: editorial-blog
// Serif display headings, narrow column, pull-quote styling, understated elegance
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Editorial";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;max-width:680px;margin:0 auto;padding:0 1.5rem;">
    <nav style="padding:2rem 0;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-head);font-size:1.5rem;font-weight:700;color:var(--fg);">${d.name}</span>
      <span style="font-size:0.75rem;color:var(--fg2);letter-spacing:0.05em;">${d.role}</span>
    </nav>

    <section style="padding:clamp(3rem,8vw,5rem) 0;">
      <p style="font-family:var(--font-head);font-size:clamp(1.5rem,4vw,2.25rem);color:var(--fg);line-height:1.4;font-weight:400;margin:0;font-style:italic;">&ldquo;${d.take}&rdquo;</p>
      <div style="width:48px;height:3px;background:var(--accent);margin:2.5rem 0;"></div>
      <p style="color:var(--fg2);font-size:0.95rem;line-height:1.7;margin:0 0 2rem;">${d.bio}</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        ${d.tech.map(t => tagHTML(t, ts)).join("")}
      </div>
    </section>

    <section style="padding-bottom:clamp(3rem,8vw,5rem);">
      <h2 style="${headingStyle(hs, 'font-size:0.7rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--fg2);margin:0 0 2rem;')}">Work</h2>
      ${d.projects.map((p, i) => `
        <article style="padding:2rem 0;${i < d.projects.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
          <h3 style="font-family:var(--font-head);font-size:1.5rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.9rem;line-height:1.75;margin:0 0 1rem;">${p.desc}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">
            ${p.tags.map(t => tagHTML(t, ts)).join("")}
          </div>
          <div style="display:flex;gap:1.5rem;">
            ${p.soon ? `<span style="font-size:0.85rem;color:var(--fg2);font-style:italic;">Coming soon</span>` : `<a href="${p.url}" target="_blank" rel="noopener" style="color:var(--fg);font-size:0.85rem;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px;text-decoration-color:var(--border);transition:text-decoration-color 0.2s;" onmouseover="this.style.textDecorationColor='var(--accent)'" onmouseout="this.style.textDecorationColor='var(--border)'">Source</a>
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" style="color:var(--fg);font-size:0.85rem;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px;text-decoration-color:var(--border);transition:text-decoration-color 0.2s;" onmouseover="this.style.textDecorationColor='var(--accent)'" onmouseout="this.style.textDecorationColor='var(--border)'">Demo</a>` : ''}`}
          </div>
        </article>
      `).join("")}
    </section>

    <footer style="padding:1.5rem 0 3rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:0.75rem;color:var(--fg2);font-style:italic;">${d.handle}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()}</a>
    </footer>
  </div>`;
}
