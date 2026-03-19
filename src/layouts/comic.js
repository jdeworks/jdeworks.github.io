// Comic Book — panels, speech bubbles, halftone dots, bold outlines, sound effects
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Comic Book";

export function render(d, cs, ts, hs) {
  const uid = 'cb' + Math.random().toString(36).slice(2, 6);
  const effects = ['POW!', 'ZAP!', 'BANG!', 'BOOM!', 'WHAM!'];

  return `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
    .${uid}-root {
      min-height: 100vh; padding: 1rem;
      background: #f5f0e1 !important; color: #1a1a1a !important;
      font-family: 'Comic Sans MS', 'Chalkboard SE', cursive !important;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-panel {
      border: 3px solid #1a1a1a; background: #fff; padding: 1.5rem;
      margin-bottom: 1rem; position: relative; overflow: hidden;
    }
    .${uid}-panel::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle, #00000008 1px, transparent 1px);
      background-size: 4px 4px;
    }
    .${uid}-bubble {
      background: #fff; border: 2px solid #1a1a1a; border-radius: 1.5rem;
      padding: 1rem 1.25rem; position: relative; margin-bottom: 1.5rem;
      box-shadow: 3px 3px 0 #1a1a1a;
    }
    .${uid}-bubble::after {
      content: ''; position: absolute; bottom: -12px; left: 2rem;
      width: 0; height: 0;
      border-left: 12px solid transparent; border-right: 12px solid transparent;
      border-top: 14px solid #1a1a1a;
    }
    .${uid}-bubble::before {
      content: ''; position: absolute; bottom: -9px; left: 2.1rem;
      width: 0; height: 0; z-index: 1;
      border-left: 10px solid transparent; border-right: 10px solid transparent;
      border-top: 12px solid #fff;
    }
    .${uid}-effect {
      font-family: 'Bangers', cursive; color: var(--accent);
      transform: rotate(-5deg); display: inline-block;
      text-shadow: 2px 2px 0 #1a1a1a, -1px -1px 0 #1a1a1a, 1px -1px 0 #1a1a1a, -1px 1px 0 #1a1a1a;
      -webkit-text-stroke: 1px #1a1a1a;
    }
    .${uid}-caption {
      background: #fffacd; border: 2px solid #1a1a1a; padding: 0.5rem 0.75rem;
      font-size: 0.8rem; font-style: italic; display: inline-block;
      box-shadow: 2px 2px 0 #1a1a1a;
    }
    .${uid}-tag {
      display: inline-block; font-size: 0.7rem; padding: 0.2rem 0.5rem;
      border: 2px solid #1a1a1a; background: var(--accent);
      color: #fff; font-weight: 700; margin: 2px;
      box-shadow: 2px 2px 0 #1a1a1a;
      font-family: 'Bangers', cursive; letter-spacing: 0.05em;
    }
    .${uid}-link { color: #1a1a1a !important; font-weight: 700; text-decoration: none; border-bottom: 2px solid var(--accent); }
    .${uid}-link:hover { color: var(--accent) !important; }
    .${uid}-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
    }
    @media (max-width: 640px) { .${uid}-grid { grid-template-columns: 1fr !important; } }
  </style>

  <div class="${uid}-root" style="max-width:900px;margin:0 auto;">
    <!-- Title panel -->
    <div class="${uid}-panel" style="text-align:center;background:linear-gradient(180deg,#fff 60%,#f0e8d0);">
      <h1 style="font-family:'Bangers',cursive;font-size:clamp(2.5rem,7vw,5rem);margin:0;color:var(--accent);text-shadow:3px 3px 0 #1a1a1a;-webkit-text-stroke:1px #1a1a1a;letter-spacing:0.05em;transform:rotate(-2deg);">
        ${d.name.toUpperCase()}
      </h1>
      <p style="font-size:0.9rem;margin:0.5rem 0 0;color:#555;">${d.role}</p>
      <span class="${uid}-effect" style="font-size:clamp(1rem,3vw,1.5rem);position:absolute;top:1rem;right:1.5rem;transform:rotate(12deg);">${effects[Math.floor(Math.random() * effects.length)]}</span>
    </div>

    <!-- Intro panels -->
    <div class="${uid}-grid">
      <div class="${uid}-panel">
        <div class="${uid}-bubble">
          <p style="font-size:0.85rem;margin:0;line-height:1.7;">${d.bio}</p>
        </div>
        <span class="${uid}-caption">Our hero speaks...</span>
      </div>
      <div class="${uid}-panel">
        <div class="${uid}-bubble">
          <p style="font-size:0.85rem;margin:0;line-height:1.7;font-style:italic;">"${d.take}"</p>
        </div>
        <span class="${uid}-caption">Meanwhile, a thought bubble...</span>
      </div>
    </div>

    <!-- Origin story -->
    <div class="${uid}-panel">
      <div style="display:flex;align-items:flex-start;gap:1rem;flex-wrap:wrap;">
        <span class="${uid}-caption" style="flex-shrink:0;">Origin Story</span>
        <p style="font-size:0.85rem;margin:0;line-height:1.8;flex:1;min-width:0;">${d.about}</p>
      </div>
    </div>

    <!-- Powers (tech) -->
    <div class="${uid}-panel" style="text-align:center;">
      <span class="${uid}-effect" style="font-size:1.5rem;margin-bottom:1rem;">SUPER POWERS!</span>
      <div style="margin-top:1rem;display:flex;flex-wrap:wrap;justify-content:center;gap:0.25rem;">
        ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
      </div>
    </div>

    <!-- Adventures (projects) -->
    <div class="${uid}-grid">
      ${d.projects.map((p, i) => `
        <div class="${uid}-panel">
          <span class="${uid}-effect" style="font-size:1.2rem;margin-bottom:0.5rem;display:inline-block;">${effects[(i + 1) % effects.length]}</span>
          <h3 style="font-family:'Bangers',cursive;font-size:1.3rem;margin:0.25rem 0 0.5rem;color:#1a1a1a;letter-spacing:0.03em;">${p.name}</h3>
          <p style="font-size:0.8rem;margin:0 0 0.75rem;line-height:1.7;color:#444;">${p.desc}</p>
          <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
          <div>${projectLinks(p)}</div>
        </div>
      `).join('')}
    </div>

    <!-- The end -->
    <div class="${uid}-panel" style="text-align:center;">
      <p style="font-size:0.8rem;margin:0 0 0.75rem;color:#555;font-style:italic;">${d.interests}</p>
      <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.9rem;">
        ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
      </a>
      <p style="font-family:'Bangers',cursive;font-size:1.5rem;margin:1rem 0 0;color:var(--accent);text-shadow:2px 2px 0 #1a1a1a;">TO BE CONTINUED...</p>
    </div>
  </div>`;
}
