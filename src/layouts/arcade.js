// Retro Arcade — 8-bit game UI, pixel borders, score table, health bars
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Arcade";

export function render(d, cs, ts, hs) {
  const uid = 'ar' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    .${uid}-root {
      min-height: 100vh; padding: 1.5rem;
      background: #111 !important; color: #eee !important;
      font-family: 'Press Start 2P', monospace !important; font-size: 10px;
      image-rendering: pixelated;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-box {
      border: 3px solid var(--accent); padding: 1.25rem; margin-bottom: 1.25rem;
      background: #0a0a0a; position: relative;
      box-shadow: 6px 6px 0 rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.5);
    }
    .${uid}-box::before {
      content: ''; position: absolute; inset: 3px;
      border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
      pointer-events: none;
    }
    .${uid}-header {
      text-align: center; padding: 1.5rem 1rem;
      border-bottom: 3px solid var(--accent); margin-bottom: 1.25rem;
      background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
    }
    .${uid}-blink { animation: ${uid}-blink 1s step-end infinite; }
    @keyframes ${uid}-blink { 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { .${uid}-blink { animation: none; } }
    @media (max-width: 640px) {
      .${uid}-root { font-size: 11px !important; padding: 1rem !important; }
      .${uid}-box { padding: 1rem; }
    }
    .${uid}-bar-bg {
      width: 100%; height: 14px; background: #222; border: 2px solid #444;
      position: relative; overflow: hidden;
    }
    .${uid}-bar-fill {
      height: 100%; transition: width 0.3s;
    }
    .${uid}-tag {
      display: inline-block; font-size: 8px; padding: 3px 6px; margin: 2px;
      border: 2px solid var(--accent); color: var(--accent); background: #0a0a0a;
    }
    .${uid}-link { color: var(--accent) !important; text-decoration: none; }
    .${uid}-link:hover { color: #fff !important; text-shadow: 0 0 8px var(--accent); }
    .${uid}-score { color: var(--accent); letter-spacing: 0.15em; }
    .${uid}-pixel-divider {
      height: 4px; margin: 1rem 0;
      background: repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 4px, transparent 4px, transparent 8px);
      opacity: 0.4;
    }
  </style>

  <div class="${uid}-root" style="max-width:700px;margin:0 auto;">
    <!-- Insert coin -->
    <div class="${uid}-header">
      <p class="${uid}-blink ${uid}-score" style="font-size:8px;margin:0 0 1rem;">INSERT COIN</p>
      <h1 style="font-size:clamp(14px,3vw,22px);margin:0;color:var(--accent);line-height:1.8;text-shadow:2px 2px 0 #000;">${d.name}</h1>
      <p style="font-size:8px;margin:0.75rem 0 0;color:#888;line-height:1.8;">${d.role}</p>
    </div>

    <!-- Player stats -->
    <div class="${uid}-box">
      <p class="${uid}-score" style="font-size:8px;margin:0 0 1rem;">PLAYER 1 STATS</p>
      <p style="font-size:9px;margin:0 0 1rem;line-height:2.2;color:#ccc;">${d.bio}</p>
      <div class="${uid}-pixel-divider"></div>
      <!-- Skill bars -->
      ${d.tech.slice(0, 6).map(t => {
        const pct = 60 + Math.floor(Math.random() * 35);
        return `
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
          <span style="font-size:7px;width:90px;flex-shrink:0;color:#aaa;">${t}</span>
          <div class="${uid}-bar-bg" style="flex:1;">
            <div class="${uid}-bar-fill" style="width:${pct}%;background:var(--accent);"></div>
          </div>
          <span style="font-size:7px;width:30px;text-align:right;" class="${uid}-score">${pct}%</span>
        </div>`;
      }).join('')}
      ${d.tech.length > 6 ? `<p style="font-size:7px;margin:0.5rem 0 0;color:#666;">+${d.tech.length - 6} MORE SKILLS UNLOCKED</p>` : ''}
    </div>

    <!-- High scores (projects) -->
    <div class="${uid}-box">
      <p class="${uid}-score" style="font-size:8px;margin:0 0 1rem;">HIGH SCORES</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:2px solid #333;">
          <th style="text-align:left;padding:0.5rem 0;font-size:7px;color:#666;">RNK</th>
          <th style="text-align:left;padding:0.5rem 0;font-size:7px;color:#666;">PROJECT</th>
          <th style="text-align:right;padding:0.5rem 0;font-size:7px;color:#666;">STATUS</th>
        </tr>
        ${d.projects.map((p, i) => `
          <tr style="border-bottom:1px solid #222;">
            <td style="padding:0.75rem 0;font-size:9px;" class="${uid}-score">${i + 1}ST</td>
            <td style="padding:0.75rem 0;">
              <p style="font-size:9px;margin:0;color:#eee;">${p.name}</p>
              <p style="font-size:7px;margin:0.35rem 0 0;color:#777;line-height:1.8;">${p.desc}</p>
              <div style="margin-top:0.35rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
            </td>
            <td style="padding:0.75rem 0;text-align:right;vertical-align:top;">
              ${p.soon
                ? `<span style="font-size:7px;color:#888;">LOCKED</span>`
                : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:7px;">SRC→</a>${p.demo ? ` <a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:7px;">PLAY→</a>` : ''}`}
            </td>
          </tr>
        `).join('')}
      </table>
    </div>

    <!-- Quest log (philosophy) -->
    <div class="${uid}-box">
      <p class="${uid}-score" style="font-size:8px;margin:0 0 0.75rem;">QUEST LOG</p>
      <p style="font-size:8px;margin:0;line-height:2.2;color:#ccc;">"${d.take}"</p>
    </div>

    <!-- Continue? -->
    <div style="text-align:center;padding:1.5rem;">
      <p style="font-size:8px;color:#888;margin:0 0 0.75rem;">${d.interests}</p>
      <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:9px;">
        ${githubIcon(14)} <span style="margin-left:0.35rem;">${d.handle}</span>
      </a>
      <p class="${uid}-blink" style="font-size:7px;margin:1.5rem 0 0;color:var(--accent);">PRESS START TO CONTINUE</p>
    </div>
  </div>`;
}
