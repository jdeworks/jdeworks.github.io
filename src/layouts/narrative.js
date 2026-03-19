// Inspired by make-it-look-good: scroll-story
// Long single-column narrative — tells the story, projects woven in
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Narrative";

export function render(d, cs, ts, hs) {
  const uid = 'nr' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-reveal {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
    }
    .${uid}-reveal.visible { opacity: 1; transform: translateY(0); }
  </style>

  <div style="min-height:100vh;max-width:640px;margin:0 auto;padding:0 1.5rem;" id="${uid}-root">
    <!-- Sparse header -->
    <nav style="padding:3rem 0 2rem;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-family:var(--font-head);font-weight:700;color:var(--fg);">${d.name}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()}</a>
    </nav>

    <!-- Opening -->
    <section class="${uid}-reveal" data-reveal style="padding:clamp(2rem,8vw,5rem) 0;">
      <h1 style="${headingStyle(hs, 'font-size:clamp(1.75rem,4vw,2.5rem);margin:0;color:var(--fg);font-weight:700;line-height:1.25;')}">${d.bio}</h1>
    </section>

    <!-- The journey -->
    <section class="${uid}-reveal" data-reveal style="padding-bottom:3rem;">
      <p style="color:var(--fg2);font-size:0.95rem;line-height:1.8;margin:0;">${d.about}</p>
    </section>

    <!-- Philosophy pull-quote -->
    <section class="${uid}-reveal" data-reveal style="padding:2.5rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:3rem;">
      <blockquote style="margin:0;font-family:var(--font-head);font-size:clamp(1.1rem,2.5vw,1.4rem);color:var(--fg);line-height:1.5;font-style:italic;">&ldquo;${d.take}&rdquo;</blockquote>
    </section>

    <!-- Timeline as narrative -->
    <section class="${uid}-reveal" data-reveal style="padding-bottom:3rem;">
      <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">The path so far</h2>
      <div style="display:flex;flex-direction:column;gap:0;">
        ${d.timeline.map((t, i) => `
          <div style="display:flex;gap:1.25rem;padding:1rem 0;${i < d.timeline.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
            <span style="font-size:0.8rem;font-weight:600;color:var(--accent);white-space:nowrap;min-width:90px;font-family:var(--font-head);">${t.period}</span>
            <span style="color:var(--fg2);font-size:0.9rem;line-height:1.5;">${t.label}</span>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Projects -->
    <section style="padding-bottom:3rem;">
      <h2 class="${uid}-reveal" data-reveal style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1.5rem;')}">What I've built</h2>
      ${d.projects.map((p, i) => `
        <div class="${uid}-reveal" data-reveal style="margin-bottom:2rem;">
          <h3 style="font-family:var(--font-head);font-size:1.2rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0 0 0.75rem;">${p.longDesc || p.desc}</p>
          <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
          <div>${projectLinks(p)}</div>
        </div>
      `).join("")}
    </section>

    <!-- Tech -->
    <section class="${uid}-reveal" data-reveal style="padding-bottom:3rem;">
      <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 1rem;')}">Stack</h2>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
        ${d.tech.map(t => tagHTML(t, ts)).join("")}
      </div>
    </section>

    <!-- Closing -->
    <footer class="${uid}-reveal" data-reveal style="padding:2rem 0 3rem;border-top:1px solid var(--border);">
      <p style="color:var(--fg2);font-size:0.85rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
      <div style="display:flex;align-items:center;gap:1.5rem;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
        ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${l.label}</a>`).join("")}
      </div>
    </footer>
  </div>`;
}
