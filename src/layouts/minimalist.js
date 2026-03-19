// Inspired by make-it-look-good: personal-hero/minimalist
// Ultra-clean, narrow column, font-light, border-based project list, no cards
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Minimalist";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;max-width:640px;margin:0 auto;padding:0 1.5rem;">
    <nav style="padding:2.5rem 0;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:0.75rem;font-weight:300;letter-spacing:0.15em;text-transform:uppercase;color:var(--fg2);">Portfolio</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()}</a>
    </nav>

    <section style="padding:clamp(3rem,10vw,6rem) 0;">
      <h1 style="${headingStyle(hs, 'font-size:clamp(2rem,5vw,3rem);margin:0;color:var(--fg);font-weight:300;line-height:1.15;letter-spacing:-0.01em;')}">${d.name}.<br>${d.role}.</h1>
      <p style="color:var(--fg2);font-size:0.95rem;margin:2rem 0 0;max-width:420px;line-height:1.7;font-weight:300;">${d.bio}</p>
      <p style="color:var(--fg2);font-size:0.85rem;margin:1.25rem 0 0;max-width:420px;line-height:1.7;font-weight:300;font-style:italic;opacity:0.75;">${d.take}</p>
      <div style="margin-top:3rem;">
        <a href="#work" style="font-size:0.9rem;color:var(--fg);border-bottom:1px solid var(--fg);padding-bottom:2px;text-decoration:none;transition:color 0.2s,border-color 0.2s;" onmouseover="this.style.color='var(--accent)';this.style.borderColor='var(--accent)'" onmouseout="this.style.color='var(--fg)';this.style.borderColor='var(--fg)'">Selected work &darr;</a>
      </div>
    </section>

    <section id="work" style="padding-bottom:clamp(3rem,8vw,5rem);">
      <div style="border-top:1px solid var(--border);">
        ${d.projects.map(p => `
          <div style="padding:1.5rem 0;border-bottom:1px solid var(--border);transition:padding-left 0.2s;" onmouseover="this.style.paddingLeft='0.5rem'" onmouseout="this.style.paddingLeft='0'">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;">
              <h3 style="font-family:var(--font-head);font-size:1rem;margin:0;color:var(--fg);font-weight:400;">${p.name}</h3>
              <div style="display:flex;gap:0.75rem;flex-shrink:0;">
                ${p.soon ? `<span style="font-size:0.75rem;color:var(--fg2);font-style:italic;">soon</span>` : `<a href="${p.url}" target="_blank" rel="noopener" style="font-size:0.75rem;color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">src</a>
                ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" style="font-size:0.75rem;color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">demo</a>` : ''}`}
              </div>
            </div>
            <p style="color:var(--fg2);font-size:0.8rem;margin:0.25rem 0 0;font-weight:300;line-height:1.5;">${p.desc}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section style="padding-bottom:clamp(3rem,8vw,5rem);">
      <h2 style="font-size:0.7rem;font-weight:300;letter-spacing:0.15em;text-transform:uppercase;color:var(--fg2);opacity:0.6;margin:0 0 1.25rem;">Stack</h2>
      <p style="color:var(--fg2);font-size:0.85rem;font-weight:300;line-height:2;">${d.tech.join(" · ")}</p>
    </section>

    <footer style="padding:1.5rem 0 3rem;border-top:1px solid var(--border);">
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:300;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${d.handle}</a>
    </footer>
  </div>`;
}
