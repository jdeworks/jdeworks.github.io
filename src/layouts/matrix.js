// Matrix (1999) — falling code rain, green-on-black, glitch text
import { tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Matrix";

export function render(d, cs, ts, hs) {
  const uid = 'mx' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; position: relative; overflow: hidden;
      background: #000 !important; color: #00ff41 !important;
      font-family: 'Courier New', monospace !important;
    }
    .${uid}-root * { color: inherit; font-family: inherit; }
    .${uid}-rain {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 0;
      pointer-events: none; overflow: hidden;
    }
    .${uid}-col {
      position: absolute; top: -100%; font-size: 14px; line-height: 1.1;
      color: #00ff41; opacity: 0.35; writing-mode: vertical-rl;
      animation: ${uid}-fall linear infinite;
      text-shadow: 0 0 8px #00ff41;
    }
    @keyframes ${uid}-fall {
      0% { transform: translateY(-100vh); }
      100% { transform: translateY(200vh); }
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-col { animation: none; opacity: 0.1; transform: translateY(50vh); }
    }
    .${uid}-content { position: relative; z-index: 1; }
    .${uid}-glow { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #008f11; }
    .${uid}-dim { color: #008f11 !important; }
    .${uid}-link { color: #00ff41 !important; text-decoration: none; transition: text-shadow 0.2s; }
    .${uid}-link:hover { text-shadow: 0 0 12px #00ff41, 0 0 24px #00ff41; }
    .${uid}-tag {
      font-size: 0.75rem; padding: 0.2rem 0.5rem; display: inline-block; margin: 0.15rem;
      border: 1px solid #00ff4133; color: #00ff41; border-radius: 2px;
    }
    .${uid}-card {
      border: 1px solid #00ff4122; padding: 1.5rem; margin-bottom: 1rem;
      background: rgba(0,255,65,0.03); transition: background 0.3s, border-color 0.3s;
    }
    .${uid}-card:hover { background: rgba(0,255,65,0.06); border-color: #00ff4144; }
  </style>

  <div class="${uid}-root">
    <!-- Rain -->
    <div class="${uid}-rain">
      ${Array.from({length: 25}, (_, i) => {
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
        const col = Array.from({length: 30}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const left = (i * 4.2) + Math.random() * 2;
        const dur = 8 + Math.random() * 12;
        const delay = Math.random() * -20;
        return `<span class="${uid}-col" style="left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;font-size:${12 + Math.random() * 6}px;">${col}</span>`;
      }).join('')}
    </div>

    <!-- Content -->
    <div class="${uid}-content" style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;">
      <div style="margin-bottom:3rem;">
        <p class="${uid}-dim" style="font-size:0.8rem;margin:0 0 0.5rem;">wake up, neo...</p>
        <h1 class="${uid}-glow" style="font-size:clamp(2rem,5vw,3rem);margin:0;font-weight:400;">
          &gt; ${d.name}_
        </h1>
        <p class="${uid}-dim" style="font-size:0.9rem;margin:1rem 0 0;line-height:1.8;">${d.role}</p>
        <p style="font-size:0.9rem;margin:1rem 0 0;line-height:1.8;opacity:0.8;">${d.bio}</p>
      </div>

      <div style="margin-bottom:3rem;padding:1.5rem;border-left:2px solid #00ff41;background:rgba(0,255,65,0.03);">
        <p style="font-size:0.85rem;margin:0;line-height:1.7;font-style:italic;opacity:0.9;">"${d.take}"</p>
      </div>

      <div style="margin-bottom:2rem;">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 1rem;">[SYSTEM] loading repositories...</p>
        ${d.projects.map(p => `
          <div class="${uid}-card">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
              <h3 style="font-size:1rem;margin:0;font-weight:400;">&gt; ${p.name}</h3>
              ${p.soon
                ? `<span class="${uid}-dim" style="font-size:0.75rem;">[CLASSIFIED]</span>`
                : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.8rem;">access &rarr;</a>`}
            </div>
            <p class="${uid}-dim" style="font-size:0.8rem;margin:0.5rem 0 0.75rem;line-height:1.6;">${p.desc}</p>
            <div>${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.8rem;display:inline-block;margin-top:0.5rem;">demo &rarr;</a>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom:2rem;">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 0.75rem;">[SYSTEM] skills.dat</p>
        <div>${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
      </div>

      <div style="margin-bottom:2rem;">
        <p class="${uid}-dim" style="font-size:0.75rem;margin:0 0 0.75rem;">[LOG] history</p>
        ${d.timeline.map(t => `<p style="font-size:0.8rem;margin:0 0 0.35rem;"><span style="opacity:0.5;">${t.period}</span> <span class="${uid}-dim">→</span> ${t.label}</p>`).join('')}
      </div>

      <footer style="border-top:1px solid #00ff4122;padding-top:1.5rem;margin-top:2rem;">
        <p class="${uid}-dim" style="font-size:0.8rem;margin:0 0 0.75rem;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link" style="font-size:0.85rem;">
          ${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span>
        </a>
        <p class="${uid}-dim" style="font-size:0.7rem;margin:1rem 0 0;">follow the white rabbit...</p>
      </footer>
    </div>
  </div>`;
}
