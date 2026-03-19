// Rundown — heavily weathered, water damaged, abandoned building aesthetic
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Rundown";

export function render(d, cs, ts, hs) {
  const uid = 'rd' + Math.random().toString(36).slice(2, 6);
  const stains = Array.from({length: 12}, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 100 + Math.random() * 350, opacity: 0.04 + Math.random() * 0.08,
    color: Math.random() > 0.5 ? '#5a3e1b' : '#3b2d1a',
  }));
  const watermarks = Array.from({length: 4}, () => ({
    x: Math.random() * 80, y: Math.random() * 80,
    w: 150 + Math.random() * 250, h: 80 + Math.random() * 150,
    rot: -5 + Math.random() * 10, opacity: 0.03 + Math.random() * 0.04,
  }));

  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative;
      background: color-mix(in srgb, var(--bg) 70%, #6b5332);
      font-family: var(--font-body);
    }
    /* Heavy grain */
    .${uid}-root::before {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 2;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity: 0.12; mix-blend-mode: overlay;
    }
    /* Heavy vignette */
    .${uid}-root::after {
      content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 1;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%);
    }
    .${uid}-content { position: relative; z-index: 3; }
    .${uid}-panel {
      background: color-mix(in srgb, var(--card) 65%, #7a6040);
      border: 1px solid color-mix(in srgb, var(--border) 50%, #5a4530);
      padding: 1.5rem; margin-bottom: 1.5rem; position: relative;
      box-shadow: 3px 4px 12px rgba(0,0,0,0.25), inset 0 0 50px rgba(0,0,0,0.08);
    }
    /* Peeling/curled corners */
    .${uid}-peel::after {
      content: ''; position: absolute; bottom: 0; right: 0;
      width: 40px; height: 40px;
      background: linear-gradient(315deg, color-mix(in srgb, var(--bg) 70%, #6b5332) 50%, transparent 50%);
      box-shadow: -2px -2px 4px rgba(0,0,0,0.1);
    }
    .${uid}-torn {
      clip-path: polygon(
        0% 3%, 3% 0%, 5% 2.5%, 9% 0.5%, 12% 3.5%, 16% 0%, 20% 2%, 24% 0.5%,
        28% 3%, 33% 0%, 38% 2.5%, 42% 0.5%, 47% 2%, 52% 0%, 57% 3%, 62% 0.5%,
        67% 2.5%, 72% 0%, 77% 1.5%, 82% 3.5%, 87% 0.5%, 92% 2.5%, 96% 0%, 100% 2%,
        100% 97%, 97% 100%, 93% 97.5%, 89% 100%, 84% 97%, 80% 100%, 75% 98%,
        70% 100%, 65% 97%, 60% 100%, 55% 98%, 50% 100%, 45% 97%, 40% 100%,
        35% 98%, 30% 100%, 25% 97%, 20% 100%, 15% 98.5%, 10% 100%, 5% 97%,
        2% 100%, 0% 98%
      );
    }
    .${uid}-stain {
      position: absolute; border-radius: 40% 60% 55% 45%; pointer-events: none;
    }
    .${uid}-water {
      position: absolute; pointer-events: none; border-radius: 4px;
      border: 2px solid rgba(90,60,20,0.08);
      background: linear-gradient(135deg, rgba(90,60,20,0.03) 0%, transparent 60%);
    }
    .${uid}-stamp {
      display: inline-block; padding: 0.3rem 0.65rem; font-size: 0.65rem;
      border: 2px solid color-mix(in srgb, var(--accent) 40%, #5a3e1b);
      color: color-mix(in srgb, var(--accent) 55%, #5a3e1b);
      border-radius: 2px; margin: 0.15rem;
      font-family: var(--font-head); letter-spacing: 0.03em;
    }
    .${uid}-heading {
      color: color-mix(in srgb, var(--fg) 70%, #5a3e1b);
      font-family: var(--font-head);
    }
    .${uid}-text { color: color-mix(in srgb, var(--fg2) 65%, #6b5332); }
    .${uid}-accent { color: color-mix(in srgb, var(--accent) 55%, #6b5332); }
    .${uid}-link {
      color: color-mix(in srgb, var(--accent) 50%, #6b5332);
      text-decoration: underline; text-decoration-style: wavy;
      text-decoration-color: color-mix(in srgb, var(--accent) 20%, transparent);
      text-underline-offset: 3px;
    }
    .${uid}-link:hover { opacity: 0.7; }
    .${uid}-crack {
      height: 2px; margin: 1.5rem 0; position: relative;
      background: linear-gradient(90deg,
        transparent 0%,
        color-mix(in srgb, var(--border) 30%, #4a3520) 10%,
        color-mix(in srgb, var(--border) 50%, #4a3520) 25%,
        transparent 28%, transparent 35%,
        color-mix(in srgb, var(--border) 40%, #4a3520) 38%,
        transparent 42%, transparent 55%,
        color-mix(in srgb, var(--border) 60%, #4a3520) 58%,
        color-mix(in srgb, var(--border) 35%, #4a3520) 75%,
        transparent 78%, transparent 88%,
        color-mix(in srgb, var(--border) 25%, #4a3520) 92%,
        transparent 100%
      );
    }
    .${uid}-scratch {
      text-decoration: line-through;
      text-decoration-color: color-mix(in srgb, var(--fg) 30%, transparent);
      text-decoration-thickness: 2px;
      opacity: 0.35; font-size: 0.7rem;
    }
    .${uid}-tape {
      position: absolute; width: 60px; height: 18px;
      background: rgba(200,180,120,0.25); transform: rotate(-8deg);
      top: -9px; left: 30px; border-radius: 1px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .${uid}-tape2 {
      position: absolute; width: 50px; height: 16px;
      background: rgba(200,180,120,0.2); transform: rotate(5deg);
      top: -8px; right: 40px; border-radius: 1px;
    }
    .${uid}-burnt {
      background: radial-gradient(circle at 80% 90%, rgba(30,15,0,0.15) 0%, transparent 50%);
    }
  </style>

  <div class="${uid}-root">
    ${stains.map(s => `<div class="${uid}-stain" style="left:${s.x}%;top:${s.y}%;width:${s.size}px;height:${s.size}px;opacity:${s.opacity};background:radial-gradient(circle,${s.color} 0%,transparent 70%);"></div>`).join('')}
    ${watermarks.map(w => `<div class="${uid}-water" style="left:${w.x}%;top:${w.y}%;width:${w.w}px;height:${w.h}px;transform:rotate(${w.rot}deg);opacity:${w.opacity};"></div>`).join('')}

    <div class="${uid}-content" style="max-width:780px;margin:0 auto;padding:3rem 1.5rem;">
      <!-- Header — torn, taped -->
      <div class="${uid}-panel ${uid}-torn ${uid}-burnt" style="text-align:center;padding:2.5rem 1.5rem;margin-bottom:2rem;">
        <div class="${uid}-tape"></div>
        <div class="${uid}-tape2"></div>
        <p class="${uid}-accent" style="font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 0.75rem;opacity:0.5;">[ worn credentials ]</p>
        <h1 class="${uid}-heading" style="${headingStyle(hs, 'font-size:clamp(2rem,5vw,3rem);margin:0;font-weight:700;')}">${d.name}</h1>
        <p class="${uid}-text" style="font-size:0.95rem;margin:0.5rem 0 0;">${d.role}</p>
        <p class="${uid}-scratch" style="margin:0.75rem 0 0;">CLASSIFIED · DO NOT DISTRIBUTE · EYES ONLY</p>
      </div>

      <!-- Bio — peeling corner -->
      <div class="${uid}-panel ${uid}-peel">
        <p class="${uid}-text" style="font-size:0.9rem;line-height:1.8;margin:0;">${d.bio}</p>
      </div>

      <div class="${uid}-crack"></div>

      <!-- Philosophy — heavy staining -->
      <div class="${uid}-panel" style="position:relative;">
        <div class="${uid}-stain" style="right:-30px;top:-30px;width:180px;height:180px;opacity:0.08;background:radial-gradient(circle,#3b2d1a 0%,transparent 70%);"></div>
        <blockquote style="margin:0;padding:0 0 0 1rem;border-left:3px solid color-mix(in srgb, var(--accent) 30%, #5a3e1b);">
          <p class="${uid}-text" style="font-size:0.9rem;line-height:1.7;margin:0;font-style:italic;">"${d.take}"</p>
        </blockquote>
        <p class="${uid}-scratch" style="margin:1rem 0 0;">— source unknown, found in debris</p>
      </div>

      <div class="${uid}-crack"></div>

      <!-- Background — very faded -->
      <div class="${uid}-panel ${uid}-peel" style="opacity:0.6;">
        <p class="${uid}-accent" style="font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;opacity:0.4;">[ water-damaged records — partially legible ]</p>
        <p class="${uid}-text" style="font-size:0.85rem;line-height:1.7;margin:0;">${d.about}</p>
      </div>

      <div class="${uid}-crack"></div>

      <!-- Projects — each progressively more damaged -->
      <p class="${uid}-accent" style="font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 1.25rem;opacity:0.5;">[ salvaged files — ${d.projects.length} recovered ]</p>
      ${d.projects.map((p, i) => {
        const rot = -1.5 + Math.random() * 3;
        const fade = 1 - (i * 0.08);
        const hasTape = i < 2;
        const hasPeel = i >= 2;
        const hasBurn = i === d.projects.length - 1;
        return `
        <div class="${uid}-panel ${hasPeel ? uid + '-peel' : ''} ${hasBurn ? uid + '-burnt' : ''}" style="transform:rotate(${rot}deg);opacity:${fade};">
          ${hasTape ? `<div class="${uid}-tape" style="left:${20 + Math.random() * 40}px;transform:rotate(${-12 + Math.random() * 24}deg);"></div>` : ''}
          <h3 class="${uid}-heading" style="font-size:1rem;margin:0 0 0.5rem;font-weight:600;">${p.name}</h3>
          <p class="${uid}-text" style="font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
          <div style="margin-bottom:0.5rem;">${p.tags.map(t => `<span class="${uid}-stamp" style="transform:rotate(${-4 + Math.random() * 8}deg);opacity:${0.4 + Math.random() * 0.4};">${t}</span>`).join('')}</div>
          <div>${p.soon
            ? `<span class="${uid}-text" style="font-size:0.75rem;font-style:italic;opacity:0.4;">[ REDACTED — pending clearance ]</span>`
            : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">source</a>${p.demo ? ` <a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;margin-left:0.75rem;">demo</a>` : ''}`
          }</div>
        </div>`;
      }).join('')}

      <div class="${uid}-crack"></div>

      <!-- Tech — very faded stamps, scattered -->
      <div class="${uid}-panel" style="opacity:0.55;">
        <p class="${uid}-accent" style="font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;opacity:0.4;">[ tool marks — mostly illegible ]</p>
        <div style="display:flex;flex-wrap:wrap;gap:0.25rem;">
          ${d.tech.map(t => `<span class="${uid}-stamp" style="transform:rotate(${-5 + Math.random() * 10}deg);opacity:${0.3 + Math.random() * 0.5};">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Footer -->
      <footer style="text-align:center;padding:2rem 0 1rem;">
        <p class="${uid}-text" style="font-size:0.8rem;margin:0 0 1rem;font-style:italic;opacity:0.45;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
        <p class="${uid}-scratch" style="margin:1.5rem 0 0;">PAGE ${Math.floor(Math.random() * 90) + 10} OF [ILLEGIBLE] · RECOVERED ${Math.floor(Math.random() * 30) + 1}/0${Math.floor(Math.random() * 9) + 1}/${new Date().getFullYear() - Math.floor(Math.random() * 20)}</p>
      </footer>
    </div>
  </div>`;
}
