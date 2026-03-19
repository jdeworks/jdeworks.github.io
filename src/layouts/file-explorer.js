// Code Editor — VS Code style sidebar tree + syntax-highlighted code
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Code Editor";

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
    .${uid}-ln { display: flex; gap: 0; margin: 0; }
    .${uid}-line-num { color: var(--fg2); opacity: 0.4; user-select: none; min-width: 28px; flex-shrink: 0; text-align: right; font-size: 0.75rem; padding-right: 1.25rem; }
    .${uid}-lc { flex: 1; min-width: 0; word-wrap: break-word; }
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
          ${(() => {
            const L = (n, c) => `<div class="${uid}-ln"><span class="${uid}-line-num">${n}</span><span class="${uid}-lc">${c}</span></div>`;
            const kw = s => `<span class="${uid}-keyword">${s}</span>`;
            const fn = s => `<span class="${uid}-fn">${s}</span>`;
            const str = s => `<span class="${uid}-string">"${s}"</span>`;
            const cmt = s => `<span class="${uid}-comment">${s}</span>`;
            const lnk = (url, s) => `<a href="${url}" target="_blank" rel="noopener" style="color:var(--accent2);">${str(s)}</a>`;
            let n = 1;
            let out = '';
            out += L(n++, cmt(`// ${d.handle} — ${d.role}`));
            out += L(n++, '');
            out += L(n++, `${kw('export const')} ${fn('bio')} = ${str(d.bio)};`);
            out += L(n++, '');
            out += L(n++, `${kw('export const')} ${fn('about')} = ${str(d.about)};`);
            out += L(n++, '');
            out += L(n++, `${kw('export const')} ${fn('philosophy')} = ${str(d.take)};`);
            out += L(n++, '');
            out += L(n++, `${kw('export const')} ${fn('tech')} = [${d.tech.map(t => str(t)).join(', ')}];`);
            out += L(n++, '');
            out += L(n++, `${kw('export const')} ${fn('projects')} = [`);
            d.projects.forEach(p => {
              out += L(n++, `&nbsp;&nbsp;{`);
              out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${fn('name')}: ${str(p.name)},`);
              out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${fn('desc')}: ${str(p.desc)},`);
              const urlPart = p.url ? `${fn('url')}: ${lnk(p.url, p.url)}` : `${fn('url')}: ${kw('null')}`;
              const demoPart = p.demo ? `, ${fn('demo')}: ${lnk(p.demo, p.demo)}` : '';
              out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${urlPart}${demoPart},`);
              out += L(n++, `&nbsp;&nbsp;},`);
            });
            out += L(n++, `];`);
            out += L(n++, '');
            out += L(n++, cmt(`// ${d.interests}`));
            out += L(n++, '');
            out += L(n++, cmt(`// ${githubIcon(12)} <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);opacity:0.5;">${d.handle}</a>`));
            return out;
          })()}
        </div>
      </div>
    </div>
  </div>`;
}
