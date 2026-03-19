// Old newspaper / broadsheet — multi-column, serif, ruled lines, dateline
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Newspaper";

export function render(d, cs, ts, hs) {
  const uid = 'np' + Math.random().toString(36).slice(2, 6);
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem;
      font-family: 'Georgia', 'Times New Roman', serif !important;
      color: var(--fg); background: var(--bg);
    }
    .${uid}-root h1, .${uid}-root h2, .${uid}-root h3 { font-family: 'Georgia', 'Times New Roman', serif; }
    .${uid}-rule { border: none; border-top: 1px solid var(--fg); margin: 0; opacity: 0.3; }
    .${uid}-rule-thick { border: none; border-top: 3px double var(--fg); margin: 0; opacity: 0.4; }
    .${uid}-cols {
      column-count: 2; column-gap: 2.5rem; column-rule: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
    }
    @media (max-width: 640px) { .${uid}-cols { column-count: 1 !important; } }
    .${uid}-dropcap::first-letter {
      float: left; font-size: 3.5rem; line-height: 0.8; padding: 0.1rem 0.5rem 0 0;
      font-weight: 700; color: var(--accent);
    }
    .${uid}-byline { font-style: italic; font-size: 0.85rem; color: var(--fg2); }
  </style>

  <div class="${uid}-root">
    <!-- Masthead -->
    <header style="text-align:center;margin-bottom:0.5rem;">
      <hr class="${uid}-rule-thick">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;">
        <span style="font-size:0.7rem;color:var(--fg2);">${date}</span>
        <span style="font-size:0.7rem;color:var(--fg2);">Est. early days</span>
      </div>
      <h1 style="font-size:clamp(2.5rem,7vw,4.5rem);margin:0;font-weight:700;letter-spacing:0.02em;line-height:1;color:var(--fg);font-family:inherit;text-transform:uppercase;">${d.name}</h1>
      <p style="font-size:0.8rem;color:var(--fg2);margin:0.35rem 0 0.5rem;letter-spacing:0.15em;text-transform:uppercase;">${d.role} · Open Source · AI Tooling</p>
      <hr class="${uid}-rule-thick">
    </header>

    <!-- Lead story -->
    <section style="margin-bottom:1.5rem;">
      <h2 style="font-size:clamp(1.5rem,4vw,2.25rem);margin:0.75rem 0 0.5rem;font-weight:700;line-height:1.15;color:var(--fg);font-family:inherit;">${d.bio}</h2>
      <p class="${uid}-byline">By ${d.handle} · Developer & Builder</p>
      <hr class="${uid}-rule" style="margin:0.75rem 0;">
      <div class="${uid}-cols">
        <p class="${uid}-dropcap" style="font-size:0.95rem;line-height:1.75;margin:0 0 1rem;color:var(--fg2);">${d.about}</p>
        <p style="font-size:0.95rem;line-height:1.75;margin:0 0 1rem;color:var(--fg2);">${d.take}</p>
        <p style="font-size:0.95rem;line-height:1.75;margin:0;color:var(--fg2);font-style:italic;">${d.interests}</p>
      </div>
    </section>

    <hr class="${uid}-rule-thick">

    <!-- Projects as articles -->
    <section style="margin-top:1rem;">
      <div class="${uid}-cols">
        ${d.projects.map(p => `
          <div style="break-inside:avoid;margin-bottom:1.5rem;">
            <h3 style="font-size:1.2rem;margin:0 0 0.25rem;font-weight:700;color:var(--fg);font-family:inherit;">${p.name}</h3>
            <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span style="font-size:0.65rem;font-style:italic;color:var(--accent);margin-right:0.5rem;">${t}</span>`).join('')}</div>
            <p style="font-size:0.9rem;line-height:1.7;margin:0 0 0.5rem;color:var(--fg2);">${p.longDesc || p.desc}</p>
            <div>${projectLinks(p)}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <hr class="${uid}-rule">

    <!-- Timeline as brief items -->
    <section style="margin-top:1rem;margin-bottom:1.5rem;">
      <h3 style="font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 0.75rem;font-family:inherit;">Career Briefs</h3>
      <div style="display:flex;flex-wrap:wrap;gap:0.25rem 1.5rem;">
        ${d.timeline.map(t => `<p style="font-size:0.8rem;margin:0;color:var(--fg2);"><strong style="color:var(--accent);">${t.period}:</strong> ${t.label}</p>`).join('')}
      </div>
    </section>

    <hr class="${uid}-rule">

    <!-- Footer -->
    <footer style="padding:0.75rem 0;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:0.75rem;color:var(--fg2);font-style:italic;">Technology · ${d.tech.slice(0, 5).join(' · ')}</span>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon(16)} <span style="vertical-align:middle;margin-left:0.25rem;font-size:0.8rem;">${d.handle}</span></a>
    </footer>
  </div>`;
}
