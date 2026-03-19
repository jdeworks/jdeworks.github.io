// Timeline-focused resume/CV layout
// Career journey is the hero, compact two-column structure
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Resume";

export function render(d, cs, ts, hs) {
  return `
  <div style="min-height:100vh;max-width:900px;margin:0 auto;padding:clamp(2rem,6vw,4rem) 1.5rem;">
    <!-- Header -->
    <header style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:3rem;padding-bottom:2rem;border-bottom:2px solid var(--accent);">
      <div>
        <h1 style="${headingStyle(hs, 'font-size:clamp(2rem,5vw,3rem);margin:0;color:var(--fg);font-weight:700;')}">${d.name}</h1>
        <p style="color:var(--accent);font-size:1rem;margin:0.25rem 0 0;font-family:var(--font-head);">${d.role}</p>
      </div>
      <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon(16)} ${d.handle}</a>
    </header>

    <!-- Two column -->
    <div style="display:grid;grid-template-columns:1fr;gap:3rem;" class="resume-grid">
      <style>@media(min-width:640px){.resume-grid{grid-template-columns:1fr 280px !important;}}</style>

      <!-- Main column -->
      <div>
        <section style="margin-bottom:2.5rem;">
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">About</h2>
          <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0;">${d.bio}</p>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.7;margin:1rem 0 0;">${d.about}</p>
        </section>

        <section style="margin-bottom:2.5rem;">
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1.25rem;')}">Experience</h2>
          ${d.timeline.map((t, i) => `
            <div style="display:flex;gap:1rem;margin-bottom:1.25rem;${i < d.timeline.length - 1 ? 'padding-bottom:1.25rem;border-bottom:1px solid var(--border);' : ''}">
              <div style="width:100px;flex-shrink:0;">
                <span style="font-size:0.75rem;font-weight:600;color:var(--accent);font-family:var(--font-head);">${t.period}</span>
              </div>
              <p style="color:var(--fg2);font-size:0.85rem;margin:0;line-height:1.5;">${t.label}</p>
            </div>
          `).join("")}
        </section>

        <section>
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1.25rem;')}">Projects</h2>
          ${d.projects.map((p, i) => `
            <div style="margin-bottom:1.5rem;${i < d.projects.length - 1 ? 'padding-bottom:1.5rem;border-bottom:1px solid var(--border);' : ''}">
              <div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
                <h3 style="font-family:var(--font-head);font-size:1rem;margin:0;color:var(--fg);font-weight:600;">${p.name}</h3>
                <div>${projectLinks(p)}</div>
              </div>
              <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0.35rem 0 0.5rem;">${p.desc}</p>
              <div>${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
            </div>
          `).join("")}
        </section>
      </div>

      <!-- Sidebar column -->
      <aside>
        <section style="margin-bottom:2.5rem;">
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">Tech</h2>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
            ${d.tech.map(t => tagHTML(t, ts)).join("")}
          </div>
        </section>

        <section style="margin-bottom:2.5rem;">
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">Philosophy</h2>
          <blockquote style="margin:0;padding:0 0 0 1rem;border-left:3px solid var(--accent);font-size:0.85rem;color:var(--fg2);line-height:1.6;font-style:italic;">${d.take}</blockquote>
        </section>

        <section style="margin-bottom:2.5rem;">
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">Beyond Code</h2>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0;">${d.interests}</p>
        </section>

        <section>
          <h2 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">Links</h2>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon(16)} GitHub</a>
            ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${l.label}</a>`).join("")}
          </div>
        </section>
      </aside>
    </div>
  </div>`;
}
