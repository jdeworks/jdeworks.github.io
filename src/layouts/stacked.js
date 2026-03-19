// Inspired by make-it-look-good: portfolio/clean (numbered sections, full-width blocks)
// Full-width alternating sections, numbered headings, clean structure
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Stacked";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;">
    <nav style="max-width:1000px;margin:0 auto;padding:1.5rem clamp(1.5rem,4vw,3rem);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-head);font-weight:700;color:var(--fg);">${d.name}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;color:var(--fg2);text-decoration:none;font-size:0.85rem;border:1px solid var(--border);border-radius:8px;padding:0.4rem 1rem;transition:border-color 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">${githubIcon(16)} ${d.handle}</a>
    </nav>

    <section style="background:var(--bg2);padding:clamp(3rem,8vw,6rem) clamp(1.5rem,4vw,3rem);margin-top:1rem;">
      <div style="max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:3rem;align-items:center;">
        <div style="flex:1;min-width:300px;">
          <p style="font-family:monospace;font-size:0.8rem;color:var(--accent);margin:0 0 1rem;">// about</p>
          <h1 style="${headingStyle(hs, 'font-size:clamp(2rem,5vw,3rem);margin:0;color:var(--fg);font-weight:700;line-height:1.15;')}">${d.role}</h1>
          <p style="color:var(--fg2);font-size:1rem;margin:1.25rem 0 0;line-height:1.7;">${d.bio}</p>
          <p style="color:var(--fg2);font-size:0.9rem;margin:1rem 0 0;line-height:1.7;opacity:0.85;">${d.about}</p>
        </div>
        <div style="flex-shrink:0;">
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
            ${d.tech.map(t => tagHTML(t, ts)).join("")}
          </div>
        </div>
      </div>
    </section>

    <section style="padding:clamp(2rem,6vw,4rem) clamp(1.5rem,4vw,3rem);">
      <div style="max-width:1000px;margin:0 auto;">
        <h2 style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 2rem;color:var(--fg);')}">
          <span style="font-family:monospace;font-size:0.8rem;color:var(--accent);display:block;margin-bottom:0.5rem;">// timeline</span>
          The journey
        </h2>
        <div style="display:flex;flex-wrap:wrap;gap:1rem;">
          ${d.timeline.map(t => `
            <div style="flex:1;min-width:180px;padding:1rem;background:var(--card);border:1px solid var(--border);border-radius:8px;">
              <p style="font-family:monospace;font-size:0.75rem;color:var(--accent);margin:0 0 0.35rem;font-weight:600;">${t.period}</p>
              <p style="color:var(--fg2);font-size:0.8rem;margin:0;line-height:1.5;">${t.label}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section style="padding:clamp(3rem,8vw,5rem) clamp(1.5rem,4vw,3rem);">
      <div style="max-width:1000px;margin:0 auto;">
        <h2 style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 2.5rem;color:var(--fg);')}">
          <span style="font-family:monospace;font-size:0.8rem;color:var(--accent);display:block;margin-bottom:0.5rem;">// projects</span>
          What I've built
        </h2>
        <div style="display:flex;flex-direction:column;gap:0;">
          ${d.projects.map((p, i) => `
            <div style="display:grid;grid-template-columns:auto 1fr;gap:2rem;padding:2rem 0;${i < d.projects.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}" class="stacked-row">
              <style>@media(max-width:640px){.stacked-row{grid-template-columns:1fr !important;gap:0.75rem !important;} .stacked-row > div:first-child {display:none !important;}}</style>
              <div style="font-family:monospace;font-size:2.5rem;font-weight:700;color:color-mix(in srgb, var(--accent) 25%, transparent);line-height:1;padding-top:0.25rem;">0${i + 1}</div>
              <div>
                <h3 style="font-family:var(--font-head);font-size:1.25rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
                <p style="color:var(--fg2);font-size:0.9rem;line-height:1.65;margin:0 0 1rem;">${p.desc}</p>
                <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
                <div>${projectLinks(p)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <footer style="background:var(--bg2);padding:2rem clamp(1.5rem,4vw,3rem);">
      <div style="max-width:1000px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:0.8rem;color:var(--fg2);">${d.name} · ${d.handle}</span>
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()}</a>
      </div>
    </footer>
  </div>`;
}
