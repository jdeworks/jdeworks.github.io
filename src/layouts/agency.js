// Inspired by make-it-look-good: agency-landing + agency-portfolio
// Giant display type, gradient mesh, service-row hover effects, dramatic scale
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Agency";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 10% 40%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 90% 80%, color-mix(in srgb, var(--accent2) 6%, transparent) 0%, transparent 60%);"></div>
    <div style="position:relative;max-width:1100px;margin:0 auto;padding:0 clamp(1.5rem,4vw,4rem);">
      <nav style="padding:2rem 0;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-family:var(--font-head);font-weight:700;font-size:1.1rem;color:var(--fg);">${d.handle}</span>
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">GitHub</span></a>
      </nav>

      <section style="padding:clamp(4rem,12vw,8rem) 0 clamp(3rem,8vw,5rem);">
        <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 1.5rem;font-family:var(--font-head);">${d.role}</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(3.5rem,10vw,7rem);margin:0;color:var(--fg);font-weight:700;line-height:0.95;letter-spacing:-0.03em;')}">${d.name}</h1>
      </section>

      <section style="padding:2rem 0 3rem;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
        <p style="color:var(--fg2);font-size:clamp(1rem,2vw,1.2rem);line-height:1.7;max-width:600px;">${d.bio}</p>
        <p style="color:var(--fg2);font-size:0.95rem;line-height:1.7;max-width:600px;margin-top:1rem;">${d.about}</p>
        <blockquote style="margin:2rem 0 0;padding:1.5rem 0 1.5rem 2rem;border-left:4px solid var(--accent);font-family:var(--font-head);font-size:clamp(1.1rem,2vw,1.4rem);color:var(--fg);line-height:1.5;font-style:italic;max-width:700px;">${d.take}</blockquote>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1.5rem;">
          ${d.tech.map(t => tagHTML(t, ts)).join("")}
        </div>
      </section>

      <section style="padding:clamp(3rem,8vw,5rem) 0;">
        <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 2.5rem;')}">Selected Work</h2>
        <style>@media(max-width:640px){.agency-row .agency-flex{flex-direction:column !important;gap:0.75rem !important;} .agency-row .agency-indent{margin-left:0 !important;}}</style>
        ${d.projects.map((p, i) => `
          <div class="agency-row" style="border-bottom:1px solid var(--border);padding:2rem 0;cursor:default;transition:padding-left 0.3s ease;" onmouseover="this.style.paddingLeft='1.5rem'" onmouseout="this.style.paddingLeft='0'">
            <div class="agency-flex" style="display:flex;align-items:baseline;justify-content:space-between;gap:2rem;">
              <div>
                <span style="font-family:monospace;font-size:0.75rem;color:var(--accent);margin-right:0.75rem;">0${i + 1}</span>
                <span style="font-family:var(--font-head);font-size:clamp(1.25rem,3vw,2rem);color:var(--fg);font-weight:600;">${p.name}</span>
              </div>
              <div style="display:flex;gap:1rem;flex-shrink:0;">${projectLinks(p)}</div>
            </div>
            <p class="agency-indent" style="color:var(--fg2);font-size:0.9rem;margin:0.75rem 0 0 2.25rem;line-height:1.6;max-width:600px;">${p.desc}</p>
            <div class="agency-indent" style="margin:0.75rem 0 0 2.25rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
          </div>
        `).join("")}
      </section>

      <footer style="padding:2rem 0 3rem;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
      </footer>
    </div>
  </div>`;
}
