// File Explorer — VS Code / Finder tree view with expandable folders
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "File Explorer";

export function render(d, cs, ts, hs) {
  const uid = 'fe' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root { min-height: 100vh; background: var(--bg); font-family: var(--font-body); }
    .${uid}-sidebar {
      background: var(--bg2); border-right: 1px solid var(--border);
      padding: 0.75rem 0; font-size: 0.8rem;
    }
    .${uid}-item {
      padding: 0.35rem 0.75rem 0.35rem 1.25rem; cursor: pointer;
      display: flex; align-items: center; gap: 0.5rem; color: var(--fg2);
      transition: background 0.15s, color 0.15s; user-select: none;
    }
    .${uid}-item:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--fg); }
    .${uid}-item.active { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); }
    .${uid}-indent1 { padding-left: 2rem; }
    .${uid}-indent2 { padding-left: 3rem; }
    .${uid}-chevron { font-size: 0.6rem; width: 12px; text-align: center; transition: transform 0.15s; }
    .${uid}-chevron.open { transform: rotate(90deg); }
    .${uid}-icon { font-size: 0.85rem; }
    .${uid}-tab-bar {
      background: var(--bg2); border-bottom: 1px solid var(--border);
      display: flex; overflow-x: auto; font-size: 0.75rem;
    }
    .${uid}-tab {
      padding: 0.5rem 1rem; color: var(--fg2); border-right: 1px solid var(--border);
      white-space: nowrap; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
      transition: background 0.15s;
    }
    .${uid}-tab.active { background: var(--bg); color: var(--fg); border-bottom: 2px solid var(--accent); }
    .${uid}-editor { padding: 1.5rem; font-size: 0.85rem; line-height: 1.8; color: var(--fg); }
    .${uid}-line-num { color: var(--fg2); opacity: 0.4; margin-right: 1.5rem; user-select: none; min-width: 20px; display: inline-block; text-align: right; font-size: 0.75rem; }
    .${uid}-keyword { color: var(--accent); }
    .${uid}-string { color: var(--accent2); }
    .${uid}-comment { color: var(--fg2); opacity: 0.5; font-style: italic; }
    .${uid}-fn { color: var(--fg); font-weight: 600; }
    @media (max-width: 640px) {
      .${uid}-sidebar { display: none; }
      .${uid}-layout { grid-template-columns: 1fr !important; }
    }
  </style>

  <div class="${uid}-root">
    <div style="display:grid;grid-template-columns:220px 1fr;min-height:100vh;" class="${uid}-layout">
      <!-- Sidebar -->
      <div class="${uid}-sidebar">
        <div class="${uid}-item" style="padding-left:0.75rem;font-weight:600;font-size:0.7rem;letter-spacing:0.05em;text-transform:uppercase;color:var(--fg2);opacity:0.6;">
          Explorer
        </div>
        <div class="${uid}-item active">
          <span class="${uid}-chevron open">&#9654;</span>
          <span class="${uid}-icon">&#128193;</span> ${d.handle}
        </div>
        <div class="${uid}-item ${uid}-indent1">
          <span class="${uid}-chevron open">&#9654;</span>
          <span class="${uid}-icon">&#128193;</span> src
        </div>
        <div class="${uid}-item ${uid}-indent2 active">
          <span class="${uid}-icon">&#128196;</span> about.ts
        </div>
        <div class="${uid}-item ${uid}-indent2">
          <span class="${uid}-icon">&#128196;</span> philosophy.ts
        </div>
        ${d.projects.map(p => `
          <div class="${uid}-item ${uid}-indent1">
            <span class="${uid}-chevron">&#9654;</span>
            <span class="${uid}-icon">${p.soon ? '&#128274;' : '&#128193;'}</span> ${p.name}
          </div>
        `).join('')}
        <div class="${uid}-item ${uid}-indent1">
          <span class="${uid}-icon">&#128196;</span> timeline.md
        </div>
        <div class="${uid}-item ${uid}-indent1">
          <span class="${uid}-icon">&#128196;</span> README.md
        </div>
      </div>

      <!-- Main area -->
      <div>
        <div class="${uid}-tab-bar">
          <div class="${uid}-tab active"><span>&#128196;</span> about.ts</div>
          <div class="${uid}-tab"><span>&#128196;</span> projects.ts</div>
        </div>

        <div class="${uid}-editor">
          <p style="margin:0;"><span class="${uid}-line-num">1</span><span class="${uid}-comment">// ${d.handle} — ${d.role}</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">2</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">3</span><span class="${uid}-keyword">export const</span> <span class="${uid}-fn">bio</span> = <span class="${uid}-string">"${d.bio}"</span>;</p>
          <p style="margin:0;"><span class="${uid}-line-num">4</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">5</span><span class="${uid}-keyword">export const</span> <span class="${uid}-fn">about</span> = <span class="${uid}-string">"${d.about}"</span>;</p>
          <p style="margin:0;"><span class="${uid}-line-num">6</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">7</span><span class="${uid}-keyword">export const</span> <span class="${uid}-fn">philosophy</span> = <span class="${uid}-string">"${d.take}"</span>;</p>
          <p style="margin:0;"><span class="${uid}-line-num">8</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">9</span><span class="${uid}-keyword">export const</span> <span class="${uid}-fn">tech</span> = [${d.tech.map(t => `<span class="${uid}-string">"${t}"</span>`).join(', ')}];</p>
          <p style="margin:0;"><span class="${uid}-line-num">10</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">11</span><span class="${uid}-keyword">export const</span> <span class="${uid}-fn">projects</span> = [</p>
          ${d.projects.map((p, i) => `
            <p style="margin:0;"><span class="${uid}-line-num">${12 + i * 4}</span>  {</p>
            <p style="margin:0;"><span class="${uid}-line-num">${13 + i * 4}</span>    <span class="${uid}-fn">name</span>: <span class="${uid}-string">"${p.name}"</span>,</p>
            <p style="margin:0;"><span class="${uid}-line-num">${14 + i * 4}</span>    <span class="${uid}-fn">desc</span>: <span class="${uid}-string">"${p.desc}"</span>,</p>
            <p style="margin:0;"><span class="${uid}-line-num">${15 + i * 4}</span>    <span class="${uid}-fn">url</span>: ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener" style="color:var(--accent2);"><span class="${uid}-string">"${p.url}"</span></a>` : `<span class="${uid}-keyword">null</span>`},${p.demo ? ` <span class="${uid}-fn">demo</span>: <a href="${p.demo}" target="_blank" rel="noopener" style="color:var(--accent2);"><span class="${uid}-string">"${p.demo}"</span></a>,` : ''}</p>
            <p style="margin:0;"><span class="${uid}-line-num">${15 + i * 4 + 1}</span>  },</p>
          `).join('')}
          <p style="margin:0;"><span class="${uid}-line-num">${12 + d.projects.length * 4 + 1}</span>];</p>
          <p style="margin:0;"><span class="${uid}-line-num">${12 + d.projects.length * 4 + 2}</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">${12 + d.projects.length * 4 + 3}</span><span class="${uid}-comment">// ${d.interests}</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">${12 + d.projects.length * 4 + 4}</span></p>
          <p style="margin:0;"><span class="${uid}-line-num">${12 + d.projects.length * 4 + 5}</span><span class="${uid}-comment">// ${githubIcon(12)} <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);opacity:0.5;">${d.handle}</a></span></p>
        </div>
      </div>
    </div>
  </div>`;
}
