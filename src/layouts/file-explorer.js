// Code Editor — VS Code style sidebar tree + syntax-highlighted code.
// This layout is the site's second easter egg: a fully interactive fake editor.
// Interactivity is wired by activateCodeEditor() in index.html (inline <script>
// tags injected via innerHTML never execute). The layout only emits markup +
// data attributes + a <code-editor data-uid> marker the hook latches onto.
//
// ── Sidebar node model ──────────────────────────────────────────────
// Every clickable sidebar row carries a small dataset so behavior is data-driven
// and future-proof. Node kinds:
//   data-node-kind = 'folder'  → collapsible (project or src). Toggles children.
//   data-node-kind = 'source'  → opens a pre-rendered .ts/.md tab (HTML in a
//                                hidden [data-file-content] container).
//   data-node-kind = 'readme'  → opens a project README tab; hook fetches the
//                                raw README at runtime (public/archived) and
//                                renders markdown.
//   data-node-kind = 'summary' → opens a private project's summary as markdown
//                                (no fetch — raw 404s for private repos).
//   data-node-kind = 'nav'     → not a file; opens the repo on GitHub in a new tab.
// Extension point: adding a new node type (e.g. 'download' for a downloadable
// artifact, or 'beta' for gated content) is just a new kind + a branch in the
// hook's openFile()/click handler — no structural rework of the tree.
//
// Shared dataset on file-opening rows: data-file-id (unique tab key),
// data-file-name (label shown in tab + sidebar), data-repo (GitHub slug),
// data-desc (fallback text on fetch failure).

import { githubIcon } from '../helpers.js';

export const name = "Code Editor";

// HTML-escape for safe interpolation into attributes / text.
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function render(d, cs, ts, hs) {
  const uid = 'fe' + Math.random().toString(36).slice(2, 6);

  // ── Syntax-highlight helpers for .ts source rendering ──────────────
  const L = (n, c) => `<div class="${uid}-ln"><span class="${uid}-line-num">${n}</span><span class="${uid}-lc">${c}</span></div>`;
  const kw = s => `<span class="${uid}-keyword">${s}</span>`;
  const fn = s => `<span class="${uid}-fn">${s}</span>`;
  const str = s => `<span class="${uid}-string">"${esc(s)}"</span>`;
  const cmt = s => `<span class="${uid}-comment">${s}</span>`;
  const lnk = (url, s) => `<a href="${esc(url)}" target="_blank" rel="noopener" style="color:var(--accent2);">${str(s)}</a>`;

  // ── Pre-rendered file contents (HTML stored in hidden containers) ──

  // about.ts — bio / about / philosophy / tech / projects / interests
  const aboutTs = (() => {
    let n = 1, out = '';
    out += L(n++, cmt(`// ${esc(d.handle)} — ${esc(d.role)}`));
    out += L(n++, '');
    out += L(n++, `${kw('export const')} ${fn('bio')} = ${str(d.bio)};`);
    out += L(n++, '');
    out += L(n++, `${kw('export const')} ${fn('about')} = ${str(d.about)};`);
    out += L(n++, '');
    out += L(n++, `${kw('export const')} ${fn('tech')} = [${d.tech.map(t => str(t)).join(', ')}];`);
    out += L(n++, '');
    out += L(n++, cmt(`// ${esc(d.interests)}`));
    out += L(n++, '');
    out += L(n++, cmt(`// ${githubIcon(12)} <a href="${esc(d.github)}" target="_blank" rel="noopener" style="color:var(--fg2);opacity:0.6;">${esc(d.handle)}</a>`));
    return out;
  })();

  // philosophy.ts — the "take"
  const philosophyTs = (() => {
    let n = 1, out = '';
    out += L(n++, cmt(`// philosophy.ts — how I think about building`));
    out += L(n++, '');
    out += L(n++, `${kw('export const')} ${fn('philosophy')} = ${str(d.take)};`);
    out += L(n++, '');
    out += L(n++, `${kw('export default')} ${fn('philosophy')};`);
    return out;
  })();

  // projects.ts — full project list
  const projectsTs = (() => {
    let n = 1, out = '';
    out += L(n++, cmt(`// projects.ts — ${d.projects.length} entries`));
    out += L(n++, '');
    out += L(n++, `${kw('export const')} ${fn('projects')} = [`);
    d.projects.forEach(p => {
      out += L(n++, `&nbsp;&nbsp;{`);
      out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${fn('name')}: ${str(p.name)},`);
      out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${fn('desc')}: ${str(p.desc)},`);
      const statusVal = p.soon ? 'coming-soon' : (p.status || 'active');
      out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${fn('status')}: ${str(statusVal)},`);
      const linksPart = (p.links || []).map(l => `${fn(l.label)}: ${lnk(l.url, l.url)}`).join(', ');
      out += L(n++, `&nbsp;&nbsp;&nbsp;&nbsp;${linksPart || `${fn('repo')}: ${str('jdeworks/' + p.repo + ' (private)')}`},`);
      out += L(n++, `&nbsp;&nbsp;},`);
    });
    out += L(n++, `];`);
    return out;
  })();

  // timeline.md — rendered as code-editor markdown-ish source
  const timelineMd = (() => {
    let n = 1, out = '';
    out += L(n++, cmt(`# Timeline`));
    out += L(n++, '');
    d.timeline.forEach(t => {
      out += L(n++, `${cmt(`## ${esc(t.period)}`)}`);
      out += L(n++, `${esc(t.label)}`);
      out += L(n++, '');
    });
    return out;
  })();

  // Pre-rendered source files: id → { name, html }
  const sourceFiles = [
    { id: 'about-ts', name: 'about.ts', html: aboutTs },
    { id: 'philosophy-ts', name: 'philosophy.ts', html: philosophyTs },
    { id: 'projects-ts', name: 'projects.ts', html: projectsTs },
    { id: 'timeline-md', name: 'timeline.md', html: timelineMd },
  ];

  // Project status → folder icon. Distinct glyphs:
  //  active public = 📁 (open folder), private = 🔒, archived = 📦
  const folderIcon = p =>
    p.status === 'private' ? '&#128274;' :          // 🔒
    p.status === 'archived' ? '&#128230;' :         // 📦
    '&#128193;';                                    // 📁

  // README node kind per project: private → summary (no fetch), else readme (fetch).
  const readmeKind = p => p.status === 'private' ? 'summary' : 'readme';

  // ── Sidebar markup ─────────────────────────────────────────────────
  const fileRow = (indent, icon, ext) => icon; // (kept inline below)

  const projectFolders = d.projects.map((p, i) => {
    const fid = `proj-${i}`;
    const kind = readmeKind(p);
    // README leaf: data-desc is fallback text; summary text stored for private.
    const summaryAttr = p.status === 'private'
      ? ` data-summary="${esc(p.summary || p.desc)}"`
      : '';
    return `
      <div class="${uid}-item ${uid}-indent1" data-node-kind="folder" data-folder="${fid}" role="button" tabindex="0">
        <span class="${uid}-chevron">&#9654;</span>
        <span class="${uid}-icon">${folderIcon(p)}</span> ${esc(p.name)}
      </div>
      <div class="${uid}-children" data-children="${fid}" hidden>
        <div class="${uid}-item ${uid}-indent3"
             data-node-kind="${kind}"
             data-file-id="readme-${i}"
             data-file-name="README.md"
             data-repo="${esc(p.repo)}"
             data-desc="${esc(p.desc)}"${summaryAttr}
             role="button" tabindex="0">
          <span class="${uid}-icon">&#128196;</span> README.md
        </div>
        <div class="${uid}-item ${uid}-indent3 ${uid}-nav"
             data-node-kind="nav"
             data-repo="${esc(p.repo)}"
             role="button" tabindex="0"
             title="Open jdeworks/${esc(p.repo)} on GitHub">
          <span class="${uid}-icon">&#8599;</span> <span class="${uid}-nav-label">...</span>
        </div>
      </div>`;
  }).join('');

  // src/ source file rows (about / philosophy / projects)
  const srcRows = sourceFiles.filter(f => f.id !== 'timeline-md').map(f => `
        <div class="${uid}-item ${uid}-indent2"
             data-node-kind="source"
             data-file-id="${f.id}"
             data-file-name="${esc(f.name)}"
             role="button" tabindex="0">
          <span class="${uid}-icon">&#128196;</span> ${esc(f.name)}
        </div>`).join('');

  // Hidden pre-rendered content containers (one per source file).
  const hiddenContent = sourceFiles.map(f =>
    `<div data-file-content="${f.id}" data-uid="${uid}" hidden>${f.html}</div>`
  ).join('');

  // Root README (jdeworks.github.io repo) — fetched markdown.
  const rootReadmeAttrs = `data-node-kind="readme" data-file-id="root-readme" data-file-name="README.md" data-repo="jdeworks.github.io" data-desc="${esc(d.bio)}"`;

  return `
  <style>
    .${uid}-root { min-height: 100vh; background: var(--bg); font-family: var(--font-body); }
    /* Cap the whole editor to one screen; let each pane scroll on its own.
       grid-template-rows: minmax(0,1fr) pins the single row to the viewport so a
       tall README scrolls INSIDE the editor instead of stretching/clipping the page.
       minmax(0,1fr) column lets the main pane shrink so its overflow works too. */
    #${uid}-root {
      display: grid; grid-template-columns: 240px minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr); height: 100vh; overflow: hidden;
    }
    /* This layout is full-height — drop the global trailing spacer so the page itself doesn't scroll. */
    #app::after { content: none !important; display: none !important; height: 0 !important; }
    .${uid}-sidebar {
      background: var(--bg2); border-right: 1px solid var(--border);
      padding: 0.75rem 0; font-size: 0.8rem; overflow-y: auto; min-height: 0;
    }
    .${uid}-main {
      min-width: 0; min-height: 0; display: flex; flex-direction: column; overflow: hidden;
    }
    .${uid}-item {
      padding: 0.35rem 0.75rem 0.35rem 1.25rem; cursor: pointer;
      display: flex; align-items: center; gap: 0.5rem; color: var(--fg2);
      transition: background 0.15s, color 0.15s; user-select: none;
    }
    .${uid}-item:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--fg); }
    .${uid}-item.active { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); }
    .${uid}-item:focus-visible { outline: 1px solid var(--accent); outline-offset: -1px; }
    .${uid}-indent1 { padding-left: 2rem; }
    .${uid}-indent2 { padding-left: 3rem; }
    .${uid}-indent3 { padding-left: 3.75rem; }
    .${uid}-nav { opacity: 0.55; font-style: italic; }
    .${uid}-nav:hover { opacity: 0.9; }
    .${uid}-nav-label { letter-spacing: 0.1em; }
    .${uid}-chevron { font-size: 0.6rem; width: 12px; text-align: center; transition: transform 0.15s; flex-shrink: 0; }
    .${uid}-chevron.open { transform: rotate(90deg); }
    .${uid}-icon { font-size: 0.85rem; flex-shrink: 0; }
    .${uid}-tab-bar {
      background: var(--bg2); border-bottom: 1px solid var(--border);
      display: flex; overflow-x: auto; font-size: 0.75rem; min-height: 36px; flex-shrink: 0;
    }
    .${uid}-tab {
      padding: 0.5rem 0.6rem 0.5rem 1rem; color: var(--fg2); border-right: 1px solid var(--border);
      white-space: nowrap; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
      transition: background 0.15s;
    }
    .${uid}-tab.active { background: var(--bg); color: var(--fg); border-bottom: 2px solid var(--accent); }
    .${uid}-tab-close {
      display: inline-flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; border-radius: 4px; font-size: 0.9rem; line-height: 1;
      color: var(--fg2); opacity: 0.6;
    }
    .${uid}-tab-close:hover { background: color-mix(in srgb, var(--fg) 20%, transparent); opacity: 1; }
    .${uid}-editor-head {
      display: flex; align-items: center; justify-content: flex-end;
      padding: 0.35rem 1rem; min-height: 20px; border-bottom: 1px solid var(--border);
      background: var(--bg); flex-shrink: 0;
    }
    .${uid}-md-toggle {
      font-family: var(--font-body); font-size: 0.7rem; cursor: pointer;
      background: transparent; color: var(--fg2); border: 1px solid var(--border);
      border-radius: 6px; padding: 0.2rem 0.6rem; transition: all 0.15s;
    }
    .${uid}-md-toggle:hover { color: var(--accent); border-color: var(--accent); }
    .${uid}-editor { padding: 1.5rem; font-size: 0.85rem; line-height: 1.8; color: var(--fg); flex: 1 1 auto; min-height: 0; overflow: auto; }
    .${uid}-empty {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 0.5rem; min-height: 50vh; color: var(--fg2); text-align: center; padding: 2rem;
    }
    .${uid}-empty-glyph { font-size: 2.5rem; opacity: 0.5; }
    .${uid}-ln { display: flex; gap: 0; margin: 0; }
    .${uid}-line-num { color: var(--fg2); opacity: 0.4; user-select: none; min-width: 28px; flex-shrink: 0; text-align: right; font-size: 0.75rem; padding-right: 1.25rem; }
    .${uid}-lc { flex: 1; min-width: 0; word-wrap: break-word; }
    .${uid}-keyword { color: var(--accent); }
    .${uid}-string { color: var(--accent2); }
    .${uid}-comment { color: var(--fg2); opacity: 0.6; font-style: italic; }
    .${uid}-fn { color: var(--fg); font-weight: 600; }
    /* Rendered-markdown styling (palette-driven, compact) */
    .${uid}-md { line-height: 1.7; font-size: 0.9rem; color: var(--fg); max-width: 760px; }
    .${uid}-md h1, .${uid}-md h2, .${uid}-md h3, .${uid}-md h4 {
      font-family: var(--font-head); color: var(--fg); line-height: 1.25;
      margin: 1.4em 0 0.5em; }
    .${uid}-md h1 { font-size: 1.6rem; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
    .${uid}-md h2 { font-size: 1.3rem; border-bottom: 1px solid var(--border); padding-bottom: 0.25em; }
    .${uid}-md h3 { font-size: 1.1rem; }
    .${uid}-md p { margin: 0.7em 0; }
    .${uid}-md a { color: var(--accent); text-decoration: none; }
    .${uid}-md a:hover { text-decoration: underline; }
    .${uid}-md ul, .${uid}-md ol { padding-left: 1.4em; margin: 0.7em 0; }
    .${uid}-md li { margin: 0.25em 0; }
    .${uid}-md code {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85em;
      background: var(--bg2); border: 1px solid var(--border); border-radius: 4px;
      padding: 0.1em 0.35em; }
    .${uid}-md pre {
      background: var(--bg2); border: 1px solid var(--border); border-radius: 8px;
      padding: 0.9em 1em; overflow-x: auto; }
    .${uid}-md pre code { background: none; border: none; padding: 0; }
    .${uid}-md blockquote {
      border-left: 3px solid var(--accent); margin: 0.8em 0; padding: 0.2em 0 0.2em 1em;
      color: var(--fg2); }
    .${uid}-md img { max-width: 100%; height: auto; }
    .${uid}-md table { border-collapse: collapse; margin: 0.8em 0; }
    .${uid}-md th, .${uid}-md td { border: 1px solid var(--border); padding: 0.4em 0.7em; }
    .${uid}-md hr { border: none; border-top: 1px solid var(--border); margin: 1.2em 0; }
    .${uid}-md-status { color: var(--fg2); font-style: italic; padding: 1rem 0; }
    .${uid}-md-source {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.8rem;
      line-height: 1.7; color: var(--fg); white-space: pre-wrap; word-wrap: break-word;
      margin: 0; }
    @media (max-width: 640px) {
      .${uid}-sidebar { display: none; }
      .${uid}-layout { grid-template-columns: 1fr !important; }
    }
  </style>

  <div class="${uid}-root" style="max-width:1200px;margin:0 auto;">
    <div class="${uid}-layout" id="${uid}-root">
      <!-- Sidebar -->
      <div class="${uid}-sidebar">
        <div class="${uid}-item" style="padding-left:0.75rem;font-weight:600;font-size:0.7rem;letter-spacing:0.05em;text-transform:uppercase;color:var(--fg2);opacity:0.6;cursor:default;">
          Explorer
        </div>

        <!-- root folder: jdeworks (always expanded, not collapsible) -->
        <div class="${uid}-item" style="cursor:default;">
          <span class="${uid}-chevron open">&#9654;</span>
          <span class="${uid}-icon">&#128194;</span> ${esc(d.handle)}
        </div>

        <!-- src/ folder (collapsible) -->
        <div class="${uid}-item ${uid}-indent1" data-node-kind="folder" data-folder="src" role="button" tabindex="0">
          <span class="${uid}-chevron open">&#9654;</span>
          <span class="${uid}-icon">&#128194;</span> src
        </div>
        <div class="${uid}-children" data-children="src">
          ${srcRows}
        </div>

        <!-- project folders -->
        ${projectFolders}

        <!-- timeline.md + root README.md -->
        <div class="${uid}-item ${uid}-indent1"
             data-node-kind="source" data-file-id="timeline-md" data-file-name="timeline.md"
             role="button" tabindex="0">
          <span class="${uid}-icon">&#128196;</span> timeline.md
        </div>
        <div class="${uid}-item ${uid}-indent1" ${rootReadmeAttrs} role="button" tabindex="0">
          <span class="${uid}-icon">&#128196;</span> README.md
        </div>
      </div>

      <!-- Main area -->
      <div class="${uid}-main">
        <div class="${uid}-tab-bar" id="${uid}-tabs"></div>
        <div class="${uid}-editor-head" id="${uid}-editor-head"></div>
        <div class="${uid}-editor" id="${uid}-editor"></div>
      </div>
    </div>

    <!-- Hidden pre-rendered .ts / .md source content -->
    <div hidden>${hiddenContent}</div>
  </div>

  <code-editor data-uid="${uid}"></code-editor>`;
}

// Post-render interactivity is handled by the activateCodeEditor hook in index.html.
