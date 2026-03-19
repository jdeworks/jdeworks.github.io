// Glassmorphism — frosted glass panels over colorful gradient background
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Glass";

export function render(d, cs, ts, hs) {
  const uid = 'gl' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; overflow: hidden;
      background: linear-gradient(135deg,
        var(--bg) 0%,
        color-mix(in srgb, var(--accent) 15%, var(--bg)) 30%,
        color-mix(in srgb, var(--accent2) 12%, var(--bg)) 60%,
        var(--bg) 100%
      );
      background-attachment: fixed;
    }
    .${uid}-orb {
      position: fixed; border-radius: 50%; pointer-events: none;
      animation: ${uid}-drift 25s ease-in-out infinite;
    }
    @keyframes ${uid}-drift {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(40px, -30px); }
      50% { transform: translate(-20px, 40px); }
      75% { transform: translate(30px, 20px); }
    }
    @media (prefers-reduced-motion: reduce) { .${uid}-orb { animation: none; } }
    .${uid}-content { position: relative; z-index: 1; }
    .${uid}-card {
      background: color-mix(in srgb, var(--card) 50%, transparent);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      border: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
      border-radius: 20px; padding: 1.75rem; margin-bottom: 1.25rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 color-mix(in srgb, var(--fg) 8%, transparent);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .${uid}-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
    .${uid}-tag {
      font-size: 0.75rem; padding: 0.25rem 0.65rem; display: inline-block; margin: 0.15rem;
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      backdrop-filter: blur(6px); color: var(--accent); border-radius: 9999px;
      border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
    }
    .${uid}-glow {
      position: fixed; width: 50vw; height: 50vw; max-width: 500px; max-height: 500px;
      border-radius: 50%; pointer-events: none; z-index: 0;
      background: radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%);
    }
  </style>

  <div class="${uid}-root">
    <!-- Ambient color orbs (lightweight — no blur filter, just radial gradients) -->
    <div class="${uid}-glow" style="top:-10%;left:-10%;"></div>
    <div class="${uid}-glow" style="bottom:-15%;right:-10%;background:radial-gradient(circle, color-mix(in srgb, var(--accent2) 18%, transparent) 0%, transparent 70%);"></div>
    <div class="${uid}-orb" style="width:200px;height:200px;top:20%;right:5%;background:radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent) 0%, transparent 70%);animation-delay:-8s;"></div>
    <div class="${uid}-orb" style="width:150px;height:150px;bottom:30%;left:5%;background:radial-gradient(circle, color-mix(in srgb, var(--accent2) 20%, transparent) 0%, transparent 70%);animation-delay:-16s;"></div>

    <div class="${uid}-content" style="max-width:800px;margin:0 auto;padding:3rem 1.5rem;">
      <div class="${uid}-card" style="text-align:center;padding:3rem 2rem;">
        <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.1em;margin:0 0 0.75rem;font-family:var(--font-head);">${d.role}</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,6vw,4rem);margin:0;color:var(--fg);font-weight:700;')}">${d.name}</h1>
        <p style="color:var(--fg2);font-size:1rem;margin:1.25rem 0 0;line-height:1.7;max-width:500px;margin-left:auto;margin-right:auto;">${d.bio}</p>
      </div>

      <div class="${uid}-card">
        <blockquote style="margin:0;padding:0 0 0 1.25rem;border-left:3px solid var(--accent);font-size:0.95rem;color:var(--fg);line-height:1.6;font-style:italic;">${d.take}</blockquote>
      </div>

      <div class="${uid}-card">
        <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">Stack</h2>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
          ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
        </div>
      </div>

      <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:2rem 0 1.25rem;color:var(--fg);')}">Projects</h2>
      <div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));">
        ${d.projects.map(p => `
          <div class="${uid}-card">
            <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
            <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
            <div>${projectLinks(p)}</div>
          </div>
        `).join('')}
      </div>

      <footer class="${uid}-card" style="text-align:center;margin-top:2rem;">
        <p style="color:var(--fg2);font-size:0.85rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:0.9rem;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span></a>
      </footer>
    </div>
  </div>`;
}
