// Starfield — animated star parallax background, content floats in space
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Starfield";

export function render(d, cs, ts, hs) {
  const uid = 'sf' + Math.random().toString(36).slice(2, 6);
  // Generate star layers
  const stars = (count, size, opacity, dur) =>
    Array.from({length: count}, () =>
      `${Math.random()*100}% ${Math.random()*100}%`
    ).join(', ');

  return `
  <style>
    .${uid}-root { min-height: 100vh; background: var(--bg); position: relative; overflow: hidden; }
    .${uid}-stars {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
    }
    .${uid}-layer {
      position: absolute; inset: 0;
      background-repeat: repeat;
    }
    .${uid}-s1 {
      background-image: radial-gradient(1px 1px at ${stars(80)}, color-mix(in srgb, var(--fg) 80%, transparent) 50%, transparent 100%);
      background-size: 200px 200px;
      animation: ${uid}-drift 60s linear infinite;
    }
    .${uid}-s2 {
      background-image: radial-gradient(1.5px 1.5px at ${stars(40)}, color-mix(in srgb, var(--accent) 60%, transparent) 50%, transparent 100%);
      background-size: 300px 300px;
      animation: ${uid}-drift 90s linear infinite reverse;
    }
    .${uid}-s3 {
      background-image: radial-gradient(2px 2px at ${stars(20)}, var(--accent) 50%, transparent 100%);
      background-size: 400px 400px;
      animation: ${uid}-drift 120s linear infinite;
    }
    @keyframes ${uid}-drift {
      0% { transform: translateY(0); }
      100% { transform: translateY(-200px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-s1, .${uid}-s2, .${uid}-s3 { animation: none; }
    }
    .${uid}-content { position: relative; z-index: 1; }
    .${uid}-panel {
      background: color-mix(in srgb, var(--bg) 75%, transparent);
      backdrop-filter: blur(8px); border: 1px solid color-mix(in srgb, var(--accent) 15%, transparent);
      border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem;
    }
    .${uid}-tag {
      font-size: 0.75rem; padding: 0.25rem 0.65rem; display: inline-block; margin: 0.15rem;
      background: color-mix(in srgb, var(--accent) 15%, transparent);
      color: var(--accent); border-radius: 9999px;
    }
    .${uid}-orbit {
      display: inline-block; animation: ${uid}-float 6s ease-in-out infinite;
    }
    @keyframes ${uid}-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-stars">
      <div class="${uid}-layer ${uid}-s1"></div>
      <div class="${uid}-layer ${uid}-s2"></div>
      <div class="${uid}-layer ${uid}-s3"></div>
    </div>

    <div class="${uid}-content" style="max-width:800px;margin:0 auto;padding:4rem 1.5rem;">
      <div class="${uid}-panel" style="text-align:center;">
        <p style="color:var(--accent);font-size:2rem;margin:0;" class="${uid}-orbit">&#9790;</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(2rem,6vw,3.5rem);margin:0.5rem 0;color:var(--fg);font-weight:700;')}">${d.name}</h1>
        <p style="color:var(--accent);font-size:1rem;margin:0 0 1rem;font-family:var(--font-head);">${d.role}</p>
        <p style="color:var(--fg2);font-size:0.95rem;line-height:1.7;max-width:500px;margin:0 auto;">${d.bio}</p>
      </div>

      <div class="${uid}-panel">
        <blockquote style="margin:0;padding:0 0 0 1.25rem;border-left:3px solid var(--accent);font-size:0.95rem;color:var(--fg);line-height:1.6;font-style:italic;">${d.take}</blockquote>
      </div>

      <div class="${uid}-panel">
        <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1rem;')}">Coordinates</h2>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
          ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
        </div>
      </div>

      <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:2rem 0 1.25rem;color:var(--fg);text-align:center;')}">Missions</h2>
      ${d.projects.map(p => `
        <div class="${uid}-panel">
          <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
          <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
          <div>${projectLinks(p)}</div>
        </div>
      `).join('')}

      <footer class="${uid}-panel" style="text-align:center;">
        <p style="color:var(--fg2);font-size:0.85rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:0.9rem;">${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span></a>
      </footer>
    </div>
  </div>`;
}
