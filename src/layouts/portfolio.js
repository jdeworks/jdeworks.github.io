// Inspired by make-it-look-good: agency-portfolio
// Giant hero name, horizontal marquee, staggered project grid, service-row hover
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Portfolio";

export function render(d, cs, ts, hs) {
  const uid = 'pf' + Math.random().toString(36).slice(2, 6);
  const marqueeText = d.tech.join(' · ');
  return `
  <style>
    @keyframes ${uid}-marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .${uid}-marquee-inner {
      display: flex; white-space: nowrap; width: max-content;
      animation: ${uid}-marquee 20s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) { .${uid}-marquee-inner { animation: none; } }
    .${uid}-project:hover { padding-left: 1rem; }
    .${uid}-project { transition: padding-left 0.3s ease; }
  </style>

  <div style="min-height:100vh;" id="${uid}-root">
    <!-- Nav -->
    <nav style="max-width:1200px;margin:0 auto;padding:2rem clamp(1.5rem,4vw,3rem);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-head);font-weight:700;font-size:1rem;color:var(--accent);">${d.handle}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon(18)} <span style="vertical-align:middle;margin-left:0.35rem;">GitHub</span></a>
    </nav>

    <!-- Giant Hero -->
    <section style="max-width:1200px;margin:0 auto;padding:clamp(4rem,12vw,10rem) clamp(1.5rem,4vw,3rem) clamp(2rem,6vw,4rem);">
      <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,12vw,9rem);margin:0;color:var(--fg);font-weight:700;line-height:0.9;letter-spacing:-0.04em;')}">${d.name}</h1>
      <p style="color:var(--accent);font-size:clamp(1rem,2vw,1.5rem);margin:1rem 0 0;font-family:var(--font-head);">${d.role}</p>
    </section>

    <!-- Marquee -->
    <section style="overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:1rem 0;">
      <div class="${uid}-marquee-inner" style="font-family:var(--font-head);font-size:0.85rem;color:var(--fg2);letter-spacing:0.05em;">
        <span style="padding:0 3rem;">${marqueeText} · ${marqueeText} · ${marqueeText} · ${marqueeText}</span>
        <span style="padding:0 3rem;">${marqueeText} · ${marqueeText} · ${marqueeText} · ${marqueeText}</span>
      </div>
    </section>

    <!-- About -->
    <section style="max-width:1200px;margin:0 auto;padding:clamp(3rem,8vw,5rem) clamp(1.5rem,4vw,3rem);">
      <div style="display:grid;grid-template-columns:1fr;gap:3rem;" class="${uid}-about-grid">
        <style>@media(min-width:768px){.${uid}-about-grid{grid-template-columns:2fr 3fr !important;}}</style>
        <div>
          <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">About</h2>
          <p style="color:var(--fg2);font-size:0.95rem;line-height:1.75;margin:0;">${d.about}</p>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:1.5rem 0 0;font-style:italic;">${d.interests}</p>
        </div>
        <div>
          <blockquote style="margin:0;padding:2rem;background:var(--bg2);border-radius:12px;border-left:4px solid var(--accent);font-family:var(--font-head);font-size:clamp(1rem,2vw,1.3rem);color:var(--fg);line-height:1.5;font-style:italic;">${d.take}</blockquote>
        </div>
      </div>
    </section>

    <!-- Projects — numbered list with hover-indent -->
    <section style="max-width:1200px;margin:0 auto;padding:0 clamp(1.5rem,4vw,3rem) clamp(3rem,8vw,5rem);">
      <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">Work</h2>
      ${d.projects.map((p, i) => `
        <div class="${uid}-project" style="border-top:1px solid var(--border);padding:2rem 0;cursor:default;">
          <div style="display:flex;align-items:baseline;gap:1.5rem;flex-wrap:wrap;">
            <span style="font-family:monospace;font-size:0.8rem;color:var(--accent);">0${i + 1}</span>
            <h3 style="font-family:var(--font-head);font-size:clamp(1.25rem,3vw,2rem);margin:0;color:var(--fg);font-weight:600;flex:1;">${p.name}</h3>
            <div style="flex-shrink:0;">${projectLinks(p)}</div>
          </div>
          <p style="color:var(--fg2);font-size:0.9rem;line-height:1.65;margin:0.75rem 0 0 2.5rem;max-width:650px;">${p.longDesc || p.desc}</p>
          <div style="margin:0.75rem 0 0 2.5rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
        </div>
      `).join("")}
      <div style="border-top:1px solid var(--border);"></div>
    </section>

    <!-- Timeline -->
    <section style="max-width:1200px;margin:0 auto;padding:clamp(2rem,6vw,4rem) clamp(1.5rem,4vw,3rem);">
      <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">Journey</h2>
      <style>@media(max-width:640px){.${uid}-tl{border-right:none !important;border-bottom:1px solid var(--border);flex-basis:100% !important;}}</style>
      <div style="display:flex;flex-wrap:wrap;gap:0;">
        ${d.timeline.map((t, i) => `
          <div style="flex:1;min-width:120px;padding:1.25rem;${i < d.timeline.length - 1 ? 'border-right:1px solid var(--border);' : ''}" class="${uid}-tl">
            <p style="font-family:var(--font-head);font-size:0.75rem;font-weight:600;color:var(--accent);margin:0 0 0.35rem;">${t.period}</p>
            <p style="color:var(--fg2);font-size:0.8rem;margin:0;line-height:1.45;">${t.label}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <footer style="border-top:1px solid var(--border);padding:2rem clamp(1.5rem,4vw,3rem);max-width:1200px;margin:0 auto;">
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
    </footer>
  </div>`;
}
