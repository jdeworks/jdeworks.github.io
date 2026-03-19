// Neon/Cyberpunk — glowing borders, scanlines, pulsing accents
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Neon";

export function render(d, cs, ts, hs) {
  const uid = 'ne' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative;
      font-family: var(--font-body);
      background:
        radial-gradient(ellipse at 20% 30%, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 70%, color-mix(in srgb, var(--accent2) 8%, transparent) 0%, transparent 50%),
        var(--bg);
    }
    .${uid}-root::after {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 1;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px);
    }
    .${uid}-content { position: relative; z-index: 2; }
    .${uid}-glow-box {
      border: 1px solid var(--accent); padding: 1.5rem; margin-bottom: 1.5rem;
      border-radius: 4px; position: relative;
      box-shadow: 0 0 10px var(--accent), 0 0 40px color-mix(in srgb, var(--accent) 30%, transparent),
                  inset 0 0 20px color-mix(in srgb, var(--accent) 10%, transparent);
      background: color-mix(in srgb, var(--bg) 90%, transparent);
      animation: ${uid}-box-pulse 6s cubic-bezier(0.37, 0, 0.63, 1) infinite;
    }
    .${uid}-glow-box:hover {
      box-shadow: 0 0 20px var(--accent), 0 0 80px color-mix(in srgb, var(--accent) 50%, transparent),
                  inset 0 0 40px color-mix(in srgb, var(--accent) 18%, transparent);
    }
    @keyframes ${uid}-box-pulse {
      0%, 100% {
        box-shadow: 0 0 10px var(--accent), 0 0 40px color-mix(in srgb, var(--accent) 30%, transparent), inset 0 0 20px color-mix(in srgb, var(--accent) 10%, transparent);
        border-color: var(--accent);
      }
      50% {
        box-shadow: 0 0 4px color-mix(in srgb, var(--accent) 60%, transparent), 0 0 15px color-mix(in srgb, var(--accent) 12%, transparent), inset 0 0 8px color-mix(in srgb, var(--accent) 4%, transparent);
        border-color: color-mix(in srgb, var(--accent) 50%, transparent);
      }
    }
    .${uid}-glow-text {
      text-shadow: 0 0 7px var(--accent), 0 0 20px var(--accent), 0 0 60px color-mix(in srgb, var(--accent) 50%, transparent);
    }
    .${uid}-pulse {
      animation: ${uid}-pulse 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
    }
    @keyframes ${uid}-pulse {
      0%, 100% { opacity: 1; text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent); }
      50% { opacity: 0.3; text-shadow: 0 0 2px color-mix(in srgb, var(--accent) 40%, transparent); }
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-pulse { animation: none; }
      .${uid}-glow-box { animation: none; }
    }
    .${uid}-divider {
      height: 1px; margin: 2rem 0;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      box-shadow: 0 0 15px var(--accent), 0 0 30px color-mix(in srgb, var(--accent) 40%, transparent);
    }
    .${uid}-tag {
      font-size: 0.75rem; padding: 0.25rem 0.6rem; display: inline-block; margin: 0.15rem;
      border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
      color: var(--accent); border-radius: 2px;
      text-shadow: 0 0 8px var(--accent);
    }
    .${uid}-link { color: var(--accent); text-decoration: none; transition: text-shadow 0.2s; }
    .${uid}-link:hover { text-shadow: 0 0 12px var(--accent); }
    .${uid}-corner { position: absolute; width: 12px; height: 12px; }
    .${uid}-corner::before, .${uid}-corner::after { content: ''; position: absolute; background: var(--accent); }
    .${uid}-tl { top: -1px; left: -1px; } .${uid}-tl::before { width: 12px; height: 1px; top: 0; left: 0; } .${uid}-tl::after { width: 1px; height: 12px; top: 0; left: 0; }
    .${uid}-tr { top: -1px; right: -1px; } .${uid}-tr::before { width: 12px; height: 1px; top: 0; right: 0; } .${uid}-tr::after { width: 1px; height: 12px; top: 0; right: 0; }
    .${uid}-bl { bottom: -1px; left: -1px; } .${uid}-bl::before { width: 12px; height: 1px; bottom: 0; left: 0; } .${uid}-bl::after { width: 1px; height: 12px; bottom: 0; left: 0; }
    .${uid}-br { bottom: -1px; right: -1px; } .${uid}-br::before { width: 12px; height: 1px; bottom: 0; right: 0; } .${uid}-br::after { width: 1px; height: 12px; bottom: 0; right: 0; }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-content" style="max-width:820px;margin:0 auto;padding:3rem 1.5rem;">
      <div class="${uid}-glow-box" style="text-align:center;padding:3rem 2rem;">
        <span class="${uid}-corner ${uid}-tl"></span><span class="${uid}-corner ${uid}-tr"></span>
        <span class="${uid}-corner ${uid}-bl"></span><span class="${uid}-corner ${uid}-br"></span>
        <p class="${uid}-pulse" style="font-size:0.7rem;letter-spacing:0.2em;color:var(--accent);margin:0 0 1rem;text-transform:uppercase;">&#9632; ONLINE</p>
        <h1 class="${uid}-glow-text" style="${headingStyle(hs, 'font-size:clamp(2rem,6vw,3.5rem);margin:0;color:var(--accent);font-weight:700;')}">${d.name}</h1>
        <p style="color:var(--fg2);font-size:1rem;margin:0.75rem 0 0;">${d.role}</p>
      </div>

      <div class="${uid}-glow-box">
        <p style="color:var(--fg);font-size:0.95rem;line-height:1.7;margin:0;">${d.bio}</p>
      </div>

      <div class="${uid}-divider"></div>

      <div class="${uid}-glow-box" style="border-left:3px solid var(--accent);">
        <p style="color:var(--fg);font-size:0.9rem;line-height:1.7;margin:0;font-style:italic;">"${d.take}"</p>
      </div>

      <div class="${uid}-divider"></div>

      <h2 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);margin:0 0 1.5rem;')}" class="${uid}-glow-text">Projects</h2>
      ${d.projects.map(p => `
        <div class="${uid}-glow-box">
          <span class="${uid}-corner ${uid}-tl"></span><span class="${uid}-corner ${uid}-tr"></span>
          <span class="${uid}-corner ${uid}-bl"></span><span class="${uid}-corner ${uid}-br"></span>
          <h3 class="${uid}-glow-text" style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;color:var(--accent);">${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
          <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
          <div>${projectLinks(p)}</div>
        </div>
      `).join('')}

      <div class="${uid}-divider"></div>

      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:2rem;">
        ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
      </div>

      <footer style="text-align:center;padding:1rem 0;">
        <p style="color:var(--fg2);font-size:0.8rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
      </footer>
    </div>
  </div>`;
}
