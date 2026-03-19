// Inspired by make-it-look-good: app-showcase
// Stacking feature cards, warm accent, scroll-reveal, bold sections
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Showcase";

export function render(d, cs, ts, hs) {
  const uid = 'sc' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-reveal {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .${uid}-reveal.visible { opacity: 1; transform: translateY(0); }
    .${uid}-feature { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .${uid}-feature:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
  </style>

  <div style="min-height:100vh;" id="${uid}-root">
    <!-- Nav -->
    <nav style="max-width:1100px;margin:0 auto;padding:1.5rem clamp(1.5rem,4vw,3rem);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-head);font-weight:700;font-size:1.25rem;color:var(--fg);">${d.name}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon(16)} ${d.handle}</a>
    </nav>

    <!-- Hero — large type, split -->
    <section style="max-width:1100px;margin:0 auto;padding:clamp(4rem,10vw,7rem) clamp(1.5rem,4vw,3rem);">
      <div style="display:grid;grid-template-columns:1fr;gap:3rem;align-items:end;" class="${uid}-hero">
        <style>@media(min-width:768px){.${uid}-hero{grid-template-columns:3fr 2fr !important;}}</style>
        <div>
          <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,6vw,4.5rem);margin:0;color:var(--fg);font-weight:700;line-height:1.05;letter-spacing:-0.02em;')}">Building the tools<br>that make <span style="color:var(--accent);">vibe coding</span> work.</h1>
        </div>
        <div>
          <p style="color:var(--fg2);font-size:1rem;line-height:1.7;margin:0;">${d.bio}</p>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <section style="border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div style="max-width:1100px;margin:0 auto;padding:2rem clamp(1.5rem,4vw,3rem);display:flex;flex-wrap:wrap;gap:1.5rem 3rem;">
        <div>
          <span style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--fg);">${d.projects.length}</span>
          <span style="color:var(--fg2);font-size:0.85rem;margin-left:0.5rem;">Projects</span>
        </div>
        <div>
          <span style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--fg);">${d.tech.length}</span>
          <span style="color:var(--fg2);font-size:0.85rem;margin-left:0.5rem;">Technologies</span>
        </div>
        <div>
          <span style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--fg);">${d.timeline.length}</span>
          <span style="color:var(--fg2);font-size:0.85rem;margin-left:0.5rem;">Career chapters</span>
        </div>
        <div style="margin-left:auto;display:flex;flex-wrap:wrap;gap:0.4rem;align-items:center;">
          ${d.tech.slice(0, 5).map(t => tagHTML(t, ts)).join("")}
        </div>
      </div>
    </section>

    <!-- About + Take -->
    <section style="max-width:1100px;margin:0 auto;padding:clamp(3rem,8vw,5rem) clamp(1.5rem,4vw,3rem);">
      <div class="${uid}-reveal" data-reveal style="display:grid;grid-template-columns:1fr;gap:3rem;" class="${uid}-about">
        <style>@media(min-width:768px){.${uid}-about{grid-template-columns:1fr 1fr !important;}}</style>
        <div>
          <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">Background</h2>
          <p style="color:var(--fg2);font-size:0.95rem;line-height:1.75;margin:0;">${d.about}</p>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:1rem 0 0;font-style:italic;">${d.interests}</p>
        </div>
        <div>
          <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">Perspective</h2>
          <blockquote style="margin:0;padding:0 0 0 1.5rem;border-left:4px solid var(--accent);font-size:1.05rem;color:var(--fg);line-height:1.6;font-style:italic;">${d.take}</blockquote>
        </div>
      </div>
    </section>

    <!-- Projects — large stacking cards -->
    <section style="max-width:1100px;margin:0 auto;padding:0 clamp(1.5rem,4vw,3rem) clamp(3rem,8vw,5rem);">
      <h2 class="${uid}-reveal" data-reveal style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 2rem;color:var(--fg);')}">Projects</h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        ${d.projects.map((p, i) => `
          <div class="${uid}-reveal ${uid}-feature" data-reveal style="background:var(--card);border-radius:16px;padding:2rem;${cardCSS(cs)};display:grid;grid-template-columns:1fr;gap:1.5rem;transition-delay:${i * 80}ms;" class="${uid}-pcard">
            <style>@media(min-width:640px){.${uid}-pcard{grid-template-columns:1fr 2fr !important;}}</style>
            <div>
              <h3 style="font-family:var(--font-head);font-size:1.25rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
              <div>${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
              <div style="margin-top:1rem;">${projectLinks(p)}</div>
            </div>
            <div>
              <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0;">${p.longDesc || p.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <footer class="${uid}-reveal" data-reveal style="border-top:1px solid var(--border);padding:2rem clamp(1.5rem,4vw,3rem);max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:0.85rem;color:var(--fg2);">${d.name} · ${d.role}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
    </footer>
  </div>

`;
}
