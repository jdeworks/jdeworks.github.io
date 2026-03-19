// Inspired by make-it-look-good: devtool-landing
// Gradient mesh background, glow cards, monospace accents, code-block style sections
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "DevTool";

export function render(d, cs, ts, hs) {
  return `
  <style>
    .glow-card { transition: box-shadow 0.3s ease, border-color 0.3s ease; }
    .glow-card:hover { box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 15%, transparent), 0 0 60px color-mix(in srgb, var(--accent) 5%, transparent); border-color: color-mix(in srgb, var(--accent) 40%, transparent) !important; }
  </style>
  <div style="min-height:100vh;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--accent2) 8%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 50%);"></div>
    <div style="position:relative;max-width:900px;margin:0 auto;padding:2rem 1.5rem;">
      <nav style="display:flex;align-items:center;justify-content:space-between;padding:1rem 0 3rem;">
        <span style="font-family:monospace;font-weight:700;font-size:1.1rem;color:var(--accent);">&gt; ${d.handle}</span>
        <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;color:var(--fg2);text-decoration:none;font-size:0.85rem;font-family:monospace;padding:0.5rem 1rem;border:1px solid var(--border);border-radius:8px;transition:border-color 0.2s,color 0.2s;" onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--fg2)'">${githubIcon(16)} GitHub</a>
      </nav>

      <section style="padding-bottom:4rem;">
        <p style="font-family:monospace;color:var(--accent);font-size:0.85rem;margin:0 0 1rem;">Hi, my name is</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,6vw,4rem);margin:0;color:var(--fg);font-weight:700;letter-spacing:-0.02em;')}">${d.name}</h1>
        <h2 style="font-family:monospace;color:var(--accent);font-size:clamp(1rem,2.5vw,1.5rem);margin:0.5rem 0 0;font-weight:500;">${d.role}</h2>
        <p style="color:var(--fg2);font-size:1rem;margin:1.5rem 0 0;max-width:540px;line-height:1.7;">${d.bio}</p>

        <div style="margin-top:2rem;background:var(--bg2);border:1px solid var(--border);border-radius:8px;overflow:hidden;max-width:460px;">
          <div style="padding:0.4rem 0.75rem;background:color-mix(in srgb, var(--border) 50%, transparent);display:flex;gap:0.4rem;align-items:center;">
            <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;opacity:0.7;"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#eab308;opacity:0.7;"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#22c55e;opacity:0.7;"></span>
          </div>
          <div style="padding:1rem;font-family:monospace;font-size:0.8rem;line-height:1.8;color:var(--fg2);">
            <span style="color:var(--accent);">$</span> echo $STACK<br>
            <span style="color:var(--fg);">${d.tech.join(" · ")}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:0 0 1.5rem;color:var(--fg);')}"><span style="font-family:monospace;color:var(--accent);font-weight:400;font-size:0.9rem;">02.</span> Projects</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;">
          ${d.projects.map(p => `
            <div class="glow-card" style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;">
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
                <svg style="width:18px;height:18px;color:var(--accent);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                <h3 style="font-family:monospace;font-size:0.95rem;margin:0;color:var(--fg);">${p.name}</h3>
              </div>
              <p style="color:var(--fg2);font-size:0.8rem;line-height:1.6;margin:0 0 1rem;">${p.desc}</p>
              <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
              <div>${projectLinks(p)}</div>
            </div>
          `).join("")}
        </div>
      </section>

      <footer style="margin-top:4rem;padding:1.5rem 0 2rem;border-top:1px solid var(--border);text-align:center;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-family:monospace;font-size:0.8rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
      </footer>
    </div>
  </div>`;
}
