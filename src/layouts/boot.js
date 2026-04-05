// Boot Sequence — simulates a terminal booting up, loading modules
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Boot Sequence";

export function render(d, cs, ts, hs) {
  const uid = 'bt' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; background: var(--bg); font-family: 'Courier New', monospace;
      padding: 2rem 1.5rem; font-size: 0.85rem; line-height: 1.8; color: var(--fg);
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-line {
      opacity: 0; animation: ${uid}-appear 0.05s forwards;
    }
    @keyframes ${uid}-appear { to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) { .${uid}-line { opacity: 1; animation: none; } }
    .${uid}-ok { color: var(--accent); font-weight: 700; }
    .${uid}-warn { color: var(--accent2); }
    .${uid}-dim { color: var(--fg2); opacity: 0.6; }
    .${uid}-bright { color: var(--fg); font-weight: 700; }
    .${uid}-accent { color: var(--accent); }
    .${uid}-link { color: var(--accent); text-decoration: none; }
    .${uid}-link:hover { text-decoration: underline; }
    .${uid}-block {
      margin: 1.5rem 0; padding: 1rem; border: 1px solid var(--border);
      background: color-mix(in srgb, var(--bg2) 50%, transparent);
      border-radius: 4px;
    }
    .${uid}-cursor {
      display: inline-block; width: 8px; height: 14px;
      background: var(--accent); vertical-align: middle;
      animation: ${uid}-blink 1s step-end infinite;
    }
    @keyframes ${uid}-blink { 50% { opacity: 0; } }
  </style>

  <div class="${uid}-root" style="max-width:800px;margin:0 auto;">
    ${[
      `<span class="${uid}-dim">BIOS v2.0 — ${d.handle} Personal System</span>`,
      `<span class="${uid}-dim">Checking hardware...</span>`,
      `CPU: <span class="${uid}-bright">${d.role}</span> <span class="${uid}-ok">[OK]</span>`,
      `RAM: <span class="${uid}-bright">${d.tech.length} modules loaded</span> <span class="${uid}-ok">[OK]</span>`,
      `Storage: <span class="${uid}-bright">${d.projects.length} repos found</span> <span class="${uid}-ok">[OK]</span>`,
      ``,
      `<span class="${uid}-accent">Loading kernel...</span>`,
      `kernel: identity = <span class="${uid}-bright">${d.name}</span>`,
      `kernel: role = <span class="${uid}-bright">${d.role}</span>`,
      `kernel: status = <span class="${uid}-ok">ONLINE</span>`,
      ``,
      `<span class="${uid}-accent">Loading /etc/bio.conf...</span>`,
    ].map((line, i) => `<p class="${uid}-line" style="margin:0;animation-delay:${i * 60}ms;">${line || '&nbsp;'}</p>`).join('')}

    <div class="${uid}-block ${uid}-line" style="animation-delay:${13 * 60}ms;">
      <p style="margin:0;">${d.bio}</p>
    </div>

    ${[
      `<span class="${uid}-accent">Loading /etc/philosophy.conf...</span>`,
    ].map((line, i) => `<p class="${uid}-line" style="margin:0;animation-delay:${(14 + i) * 60}ms;">${line}</p>`).join('')}

    <div class="${uid}-block ${uid}-line" style="animation-delay:${15 * 60}ms;">
      <p style="margin:0;font-style:italic;">"${d.take}"</p>
    </div>

    <p class="${uid}-line" style="margin:0;animation-delay:${16 * 60}ms;"><span class="${uid}-accent">Loading modules...</span></p>
    ${d.tech.map((t, i) => `
      <p class="${uid}-line" style="margin:0;animation-delay:${(17 + i) * 60}ms;">  module <span class="${uid}-bright">${t}</span> <span class="${uid}-ok">[LOADED]</span></p>
    `).join('')}

    <p class="${uid}-line" style="margin:1rem 0 0;animation-delay:${(17 + d.tech.length) * 60}ms;"><span class="${uid}-accent">Mounting /srv/projects...</span></p>
    ${d.projects.map((p, i) => {
      const delay = (18 + d.tech.length + i * 2) * 60;
      return `
      <div class="${uid}-block ${uid}-line" style="animation-delay:${delay}ms;">
        <p style="margin:0;"><span class="${uid}-bright">${p.name}</span> ${p.soon ? `<span class="${uid}-warn">[STAGING]</span>` : `<span class="${uid}-ok">[MOUNTED]</span>`}</p>
        <p style="margin:0;color:var(--fg2);">${p.desc}</p>
        ${!p.soon && p.links ? `<p style="margin:0.25rem 0 0;">${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="${uid}-link"${l.tip ? ` title="${l.tip}"` : ''}>${l.label.toLowerCase()}</a>`).join(' ')}</p>` : ''}
      </div>`;
    }).join('')}

    <p class="${uid}-line" style="margin:1rem 0 0;animation-delay:${(18 + d.tech.length + d.projects.length * 2) * 60}ms;">
      <span class="${uid}-accent">Loading /var/log/history...</span>
    </p>
    ${d.timeline.map((t, i) => `
      <p class="${uid}-line" style="margin:0;animation-delay:${(19 + d.tech.length + d.projects.length * 2 + i) * 60}ms;">
        <span class="${uid}-dim">[${String(i).padStart(2, '0')}]</span> <span class="${uid}-accent">${t.period}</span> → ${t.label}
      </p>
    `).join('')}

    ${(() => {
      const finalDelay = (20 + d.tech.length + d.projects.length * 2 + d.timeline.length) * 60;
      return `
      <p class="${uid}-line" style="margin:1.5rem 0 0;animation-delay:${finalDelay}ms;">
        <span class="${uid}-dim">${d.interests}</span>
      </p>
      <p class="${uid}-line" style="margin:1rem 0 0;animation-delay:${finalDelay + 100}ms;">
        <span class="${uid}-ok">System ready.</span> <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-link">${githubIcon(12)} ${d.handle}</a>
      </p>
      <p class="${uid}-line" style="margin:0.5rem 0 0;animation-delay:${finalDelay + 200}ms;">
        <span class="${uid}-dim">$</span> <span class="${uid}-cursor"></span>
      </p>`;
    })()}
  </div>`;
}
