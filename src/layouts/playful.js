// Inspired by make-it-look-good: personal-hero/playful
// Gradient background, glassmorphic cards, rounded shapes, bouncy hover effects
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Playful";

export function render(d, cs, ts, hs) {
  return `
  <style>
    .playful-card { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease; }
    .playful-card:hover { transform: translateY(-6px) rotate(-0.5deg); }
    .playful-avatar { animation: playful-float 4s ease-in-out infinite; }
    @keyframes playful-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @media (prefers-reduced-motion: reduce) { .playful-avatar { animation: none; } }
  </style>
  <div style="min-height:100vh;padding:2rem clamp(1rem,4vw,3rem);">
    <div style="max-width:960px;margin:0 auto;">
      <nav style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem;">
        <span style="font-family:var(--font-head);font-weight:800;font-size:1.25rem;color:var(--accent);">${d.name[0]}${d.name[1]}</span>
        <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:color-mix(in srgb, var(--accent) 15%, transparent);color:var(--accent);text-decoration:none;font-size:0.85rem;font-weight:700;padding:0.5rem 1.25rem;border-radius:9999px;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">${githubIcon(16)} GitHub</a>
      </nav>

      <section style="display:grid;grid-template-columns:1fr;gap:2rem;align-items:center;margin-bottom:4rem;" class="playful-hero">
        <style>@media(min-width:768px){.playful-hero{grid-template-columns:1fr auto !important;}}</style>
        <div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.25rem;">
            <div style="display:inline-flex;align-items:center;gap:0.5rem;background:color-mix(in srgb, var(--card) 70%, transparent);backdrop-filter:blur(8px);border-radius:9999px;padding:0.4rem 1rem;border:1px solid var(--border);">
              <span style="width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
              <span style="font-size:0.75rem;font-weight:700;color:var(--fg2);">Building cool stuff</span>
            </div>
            <div style="display:inline-flex;align-items:center;gap:0.5rem;background:color-mix(in srgb, var(--card) 70%, transparent);backdrop-filter:blur(8px);border-radius:9999px;padding:0.4rem 1rem;border:1px solid var(--border);">
              <span style="font-size:0.75rem;color:var(--fg2);">${d.interests}</span>
            </div>
          </div>
          <h1 style="${headingStyle(hs, 'font-size:clamp(2.25rem,5vw,3.5rem);margin:0;color:var(--fg);font-weight:800;line-height:1.1;')}">Hey, I'm <span style="color:var(--accent);">${d.name}</span>!</h1>
          <p style="color:var(--fg2);font-size:1.1rem;margin:0.75rem 0 0;line-height:1.6;max-width:500px;">${d.bio}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1.5rem;">
            ${d.tech.map(t => tagHTML(t, ts)).join("")}
          </div>
        </div>
        <div style="display:flex;justify-content:center;">
          <div class="playful-avatar" style="width:180px;height:180px;border-radius:2rem;background:linear-gradient(135deg, var(--accent), var(--accent2));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px color-mix(in srgb, var(--accent) 30%, transparent);">
            <span style="font-size:4rem;font-family:var(--font-head);font-weight:800;color:var(--bg);">${d.name[0]}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 style="${headingStyle(hs, 'font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--fg2);margin:0 0 1.5rem;')}">Projects</h2>
        <div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));">
          ${d.projects.map(p => `
            <div class="playful-card" style="background:color-mix(in srgb, var(--card) 70%, transparent);backdrop-filter:blur(12px);border-radius:1.5rem;padding:1.75rem;border:1px solid color-mix(in srgb, var(--border) 50%, transparent);box-shadow:0 4px 20px rgba(0,0,0,0.06);">
              <h3 style="font-family:var(--font-head);font-size:1.1rem;margin:0 0 0.5rem;color:var(--fg);font-weight:700;">${p.name}</h3>
              <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 1rem;">${p.desc}</p>
              <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
              <div>${projectLinks(p)}</div>
            </div>
          `).join("")}
        </div>
      </section>

      <section style="margin-top:2.5rem;padding:2rem;background:color-mix(in srgb, var(--card) 70%, transparent);backdrop-filter:blur(12px);border-radius:1.5rem;border:1px solid color-mix(in srgb, var(--border) 50%, transparent);">
        <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0;">${d.about}</p>
      </section>

      <footer style="margin-top:4rem;padding-top:1.5rem;border-top:1px solid var(--border);text-align:center;">
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
      </footer>
    </div>
  </div>`;
}
