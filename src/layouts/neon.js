// Neon Sign — classic neon tube aesthetic, bright glow, random flicker, complementary color
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Neon";

export function render(d, cs, ts, hs) {
  const uid = 'ne' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; font-family: var(--font-body);
      background: var(--bg);
    }
    /* Brick wall texture feel */
    .${uid}-root::before {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background:
        radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 50%);
    }
    .${uid}-content { position: relative; z-index: 1; }

    /* Primary neon glow */
    .${uid}-neon {
      color: var(--accent);
      text-shadow:
        0 0 7px var(--accent),
        0 0 20px var(--accent),
        0 0 42px var(--accent),
        0 0 82px var(--accent),
        0 0 92px var(--accent);
      animation: ${uid}-flicker1 8s linear infinite;
    }
    /* Complementary neon — hue-rotate gives us the opposite color automatically */
    .${uid}-neon2 {
      color: var(--accent);
      filter: hue-rotate(180deg);
      text-shadow:
        0 0 7px var(--accent),
        0 0 20px var(--accent),
        0 0 42px var(--accent),
        0 0 82px var(--accent);
      animation: ${uid}-flicker2 6s linear infinite;
    }
    .${uid}-glow-border {
      border: 1px solid var(--accent); border-radius: 4px; position: relative;
      box-shadow:
        0 0 6px var(--accent),
        0 0 30px color-mix(in srgb, var(--accent) 25%, transparent),
        inset 0 0 12px color-mix(in srgb, var(--accent) 8%, transparent);
      background: color-mix(in srgb, var(--bg) 92%, transparent);
    }
    .${uid}-glow-border2 {
      border-color: var(--accent); border-radius: 4px; position: relative;
      filter: hue-rotate(180deg);
      box-shadow:
        0 0 6px var(--accent),
        0 0 30px color-mix(in srgb, var(--accent) 25%, transparent),
        inset 0 0 12px color-mix(in srgb, var(--accent) 8%, transparent);
      background: color-mix(in srgb, var(--bg) 92%, transparent);
    }

    /* Irregular flicker — simulates bad electrical connection */
    @keyframes ${uid}-flicker1 {
      0%, 100% { opacity: 1; }
      3% { opacity: 0.4; }
      4% { opacity: 1; }
      7% { opacity: 0.7; }
      8% { opacity: 1; }
      42% { opacity: 1; }
      43% { opacity: 0.3; }
      44% { opacity: 0.8; }
      45% { opacity: 0.3; }
      46% { opacity: 1; }
      78% { opacity: 1; }
      79% { opacity: 0.5; }
      80% { opacity: 1; }
      91% { opacity: 1; }
      92% { opacity: 0.6; }
      93% { opacity: 1; }
    }
    @keyframes ${uid}-flicker2 {
      0%, 100% { opacity: 1; }
      12% { opacity: 1; }
      13% { opacity: 0.3; }
      14% { opacity: 0.7; }
      15% { opacity: 1; }
      56% { opacity: 1; }
      57% { opacity: 0.4; }
      58% { opacity: 1; }
      85% { opacity: 1; }
      86% { opacity: 0.2; }
      87% { opacity: 0.6; }
      88% { opacity: 0.2; }
      89% { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-neon, .${uid}-neon2 { animation: none; }
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
      text-shadow: 0 0 6px var(--accent);
    }
    .${uid}-link { color: var(--accent); text-decoration: none; text-shadow: 0 0 6px var(--accent); transition: text-shadow 0.2s; }
    .${uid}-link:hover { text-shadow: 0 0 12px var(--accent), 0 0 30px var(--accent); }
    .${uid}-corner { position: absolute; width: 14px; height: 14px; }
    .${uid}-corner::before, .${uid}-corner::after { content: ''; position: absolute; background: var(--accent); box-shadow: 0 0 6px var(--accent); }
    .${uid}-tl { top: -1px; left: -1px; } .${uid}-tl::before { width: 14px; height: 1px; } .${uid}-tl::after { width: 1px; height: 14px; }
    .${uid}-tr { top: -1px; right: -1px; } .${uid}-tr::before { width: 14px; height: 1px; right: 0; } .${uid}-tr::after { width: 1px; height: 14px; right: 0; }
    .${uid}-bl { bottom: -1px; left: -1px; } .${uid}-bl::before { width: 14px; height: 1px; bottom: 0; } .${uid}-bl::after { width: 1px; height: 14px; bottom: 0; }
    .${uid}-br { bottom: -1px; right: -1px; } .${uid}-br::before { width: 14px; height: 1px; bottom: 0; right: 0; } .${uid}-br::after { width: 1px; height: 14px; bottom: 0; right: 0; }
  </style>

  <div class="${uid}-root">
    <div class="${uid}-content" style="max-width:820px;margin:0 auto;padding:3rem 1.5rem;">

      <!-- Sign -->
      <div class="${uid}-glow-border" style="text-align:center;padding:3rem 2rem;margin-bottom:1.5rem;">
        <span class="${uid}-corner ${uid}-tl"></span><span class="${uid}-corner ${uid}-tr"></span>
        <span class="${uid}-corner ${uid}-bl"></span><span class="${uid}-corner ${uid}-br"></span>
        <h1 class="${uid}-neon" style="${headingStyle(hs, 'font-size:clamp(2rem,6vw,3.5rem);margin:0;font-weight:700;')}">${d.name}</h1>
        <p class="${uid}-neon2" style="font-size:1rem;margin:0.75rem 0 0;font-family:var(--font-head);">${d.role}</p>
      </div>

      <!-- Bio -->
      <div class="${uid}-glow-border" style="padding:1.5rem;margin-bottom:1.5rem;">
        <p style="color:var(--fg);font-size:0.95rem;line-height:1.7;margin:0;">${d.bio}</p>
      </div>

      <div class="${uid}-divider"></div>

      <!-- Quote in complementary neon -->
      <div class="${uid}-glow-border2" style="padding:1.5rem;margin-bottom:1.5rem;border:1px solid var(--accent);">
        <p style="color:var(--fg);font-size:0.9rem;line-height:1.7;margin:0;font-style:italic;">"${d.take}"</p>
      </div>

      <div class="${uid}-divider"></div>

      <!-- Projects -->
      <h2 class="${uid}-neon" style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 1.5rem;')}">Projects</h2>
      ${d.projects.map((p, i) => `
        <div class="${uid}-glow-border${i % 2 === 1 ? '2' : ''}" style="padding:1.5rem;margin-bottom:1.5rem;${i % 2 === 1 ? 'border:1px solid var(--accent);' : ''}">
          <span class="${uid}-corner ${uid}-tl"></span><span class="${uid}-corner ${uid}-tr"></span>
          <span class="${uid}-corner ${uid}-bl"></span><span class="${uid}-corner ${uid}-br"></span>
          <h3 class="${uid}-neon${i % 2 === 1 ? '2' : ''}" style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;">${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;${i % 2 === 1 ? 'filter:hue-rotate(180deg);' : ''}">${p.desc}</p>
          <div style="margin-bottom:0.5rem;${i % 2 === 1 ? 'filter:hue-rotate(180deg);' : ''}">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
          <div style="${i % 2 === 1 ? 'filter:hue-rotate(180deg);' : ''}">${projectLinks(p)}</div>
        </div>
      `).join('')}

      <div class="${uid}-divider"></div>

      <!-- Tech -->
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:2rem;">
        ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
      </div>

      <!-- Footer -->
      <footer style="text-align:center;padding:1rem 0;">
        <p style="color:var(--fg2);font-size:0.8rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
      </footer>
    </div>
  </div>`;
}
