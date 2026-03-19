// Inspired by make-it-look-good: shell-marketing + product-launch
// Marketing landing page style — hero CTA, feature grid, social proof
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Landing";

export function render(d, cs, ts, hs) {
  const uid = 'ld' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-reveal {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
    }
    .${uid}-reveal.visible { opacity: 1; transform: translateY(0); }
  </style>

  <div style="min-height:100vh;" id="${uid}-root">
    <!-- Nav -->
    <nav style="max-width:1100px;margin:0 auto;padding:1.5rem clamp(1.5rem,4vw,3rem);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-head);font-weight:700;font-size:1.1rem;color:var(--fg);">${d.name}</span>
      <div style="display:flex;align-items:center;gap:1rem;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()}</a>
      </div>
    </nav>

    <!-- Hero -->
    <section style="max-width:1100px;margin:0 auto;padding:clamp(4rem,10vw,8rem) clamp(1.5rem,4vw,3rem);text-align:center;">
      <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 1rem;font-family:var(--font-head);">${d.role}</p>
      <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,6vw,4rem);margin:0;color:var(--fg);font-weight:700;line-height:1.1;letter-spacing:-0.02em;max-width:700px;margin-left:auto;margin-right:auto;')}">${d.bio}</h1>
      <p style="color:var(--fg2);font-size:1.05rem;margin:1.5rem auto 0;max-width:550px;line-height:1.7;">${d.about}</p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:2.5rem;">
        <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--accent);color:var(--bg);text-decoration:none;font-size:0.9rem;font-weight:600;padding:0.75rem 1.75rem;border-radius:10px;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">${githubIcon(16)} View Projects</a>
        ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;border:1px solid var(--border);color:var(--fg2);text-decoration:none;font-size:0.9rem;padding:0.75rem 1.75rem;border-radius:10px;transition:border-color 0.2s,color 0.2s;" onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--fg2)'">${l.label}</a>`).join("")}
      </div>
    </section>

    <!-- Tech bar -->
    <section style="border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:1.5rem 0;">
      <div style="max-width:1100px;margin:0 auto;padding:0 clamp(1.5rem,4vw,3rem);display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;">
        ${d.tech.map(t => tagHTML(t, ts)).join("")}
      </div>
    </section>

    <!-- Feature grid (projects as features) -->
    <section class="${uid}-reveal" data-reveal style="max-width:1100px;margin:0 auto;padding:clamp(3rem,8vw,5rem) clamp(1.5rem,4vw,3rem);">
      <h2 style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 0.75rem;color:var(--fg);text-align:center;')}">Projects</h2>
      <p style="color:var(--fg2);font-size:0.95rem;text-align:center;margin:0 0 3rem;max-width:500px;margin-left:auto;margin-right:auto;">${d.take}</p>
      <div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));">
        ${d.projects.map(p => `
          <div style="background:var(--card);border-radius:14px;padding:2rem;${cardCSS(cs)};transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <h3 style="font-family:var(--font-head);font-size:1.1rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.85rem;line-height:1.65;margin:0 0 1rem;">${p.longDesc || p.desc}</p>
            <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
            <div>${projectLinks(p)}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Timeline -->
    <section class="${uid}-reveal" data-reveal style="background:var(--bg2);padding:clamp(3rem,8vw,5rem) clamp(1.5rem,4vw,3rem);">
      <div style="max-width:1100px;margin:0 auto;">
        <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:0 0 2rem;color:var(--fg);text-align:center;')}">The Journey</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">
          ${d.timeline.map(t => `
            <div style="text-align:center;padding:1.25rem;">
              <p style="font-family:var(--font-head);font-size:0.8rem;font-weight:600;color:var(--accent);margin:0 0 0.5rem;">${t.period}</p>
              <p style="color:var(--fg2);font-size:0.85rem;margin:0;line-height:1.5;">${t.label}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="${uid}-reveal" data-reveal style="max-width:1100px;margin:0 auto;padding:2rem clamp(1.5rem,4vw,3rem);text-align:center;">
      <p style="color:var(--fg2);font-size:0.85rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
    </footer>
  </div>`;
}
